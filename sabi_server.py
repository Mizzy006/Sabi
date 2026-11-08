#!/usr/bin/env python3
"""Sabi unified API server (FastAPI).

Ties together: Day One pack generation, autopsy, targeted defence,
evidence brief signing/verification, planner solver, and radar analytics.

Run:
    python sabi_server.py                     # default: http://localhost:8000
    uvicorn sabi_server:app --reload --port 8000

Endpoints:
    POST /api/dayone/pack/generate     — generate a new starter pack
    POST /api/dayone/submit            — upload .xlsx, run autopsy
    POST /api/dayone/defence/start     — start a defence session
    POST /api/dayone/defence/answer    — submit a defence answer
    GET  /verify/{brief_id}            — public verification page
    POST /api/planner/solve            — run constraint-optimised plan
    GET  /api/radar/heatmap            — curriculum gap analysis
    GET  /                             — landing page
"""
from __future__ import annotations

import json
import os
import shutil
import tempfile
import uuid
from datetime import datetime, timezone
from typing import Optional

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.responses import HTMLResponse, JSONResponse
from pydantic import BaseModel, Field

# Local imports
from sabi_verify import (
    EvidenceBrief, build_brief, apply_blind_mode, sign_brief, verify_brief,
    render_brief_html, generate_qr,
)
from sabi_planner import StudentProfile, solve, format_plan, compare_plans, SKILLS, ROLE_WEIGHTS
from sabi_radar import (
    generate_sample_postings, SAMPLE_COURSES, analyse_gaps,
    compute_funnel, SKILLS_TAXONOMY, format_heatmap,
)

# ---------------------------------------------------------------------------
# App setup
# ---------------------------------------------------------------------------

app = FastAPI(
    title="Sabi API",
    description="Verified proof of what a graduate can actually do.",
    version="0.1.0",
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PACKS_DIR = os.path.join(BASE_DIR, "packs")
BRIEFS_DIR = os.path.join(BASE_DIR, "briefs")
os.makedirs(PACKS_DIR, exist_ok=True)
os.makedirs(BRIEFS_DIR, exist_ok=True)

# In-memory stores (SQLite/Postgres in production)
_briefs: dict[str, EvidenceBrief] = {}
_defence_sessions: dict[str, dict] = {}


# ---------------------------------------------------------------------------
# Request/Response models
# ---------------------------------------------------------------------------

class PackGenerateRequest(BaseModel):
    seed: int = 1

class PackGenerateResponse(BaseModel):
    seed: int
    pack_dir: str
    starter_path: str
    status: str

class AutopsyResponse(BaseModel):
    scores: dict
    findings_count: int
    defence_questions: list[dict]
    shocks_responsive: int
    shocks_total: int
    base_matches_key: bool

class DefenceStartRequest(BaseModel):
    student_id: str = "student_001"
    seed: int = 1
    workbook_path: Optional[str] = None

class DefenceAnswerRequest(BaseModel):
    session_id: str
    question_index: int
    answer: str

class PlannerRequest(BaseModel):
    role: str = "junior_data_analyst"
    weekly_hours: float = 10.0
    weekly_mb: float = 500.0
    deadline_weeks: int = 6
    offline_only: bool = False

class RadarRequest(BaseModel):
    department: Optional[str] = None
    n_postings: int = 50
    seed: int = 42


# ---------------------------------------------------------------------------
# 1. Day One Pack Generation
# ---------------------------------------------------------------------------

@app.post("/api/dayone/pack/generate", response_model=PackGenerateResponse)
def generate_pack(req: PackGenerateRequest):
    """Generate a Day One starter pack for the given seed."""
    from dayone_generator import write_pack

    pack_dir = os.path.join(PACKS_DIR, f"pack_seed_{req.seed}")
    try:
        pack, report = write_pack(req.seed, pack_dir)
        return PackGenerateResponse(
            seed=req.seed,
            pack_dir=pack_dir,
            starter_path=os.path.join(pack_dir, "starter.xlsx"),
            status=report.get("status", "success"),
        )
    except Exception as e:
        raise HTTPException(500, detail=f"Pack generation failed: {e}")


# ---------------------------------------------------------------------------
# 2. Day One Autopsy (submission)
# ---------------------------------------------------------------------------

@app.post("/api/dayone/submit")
async def submit_workbook(
    file: UploadFile = File(...),
    seed: int = Form(1),
):
    """Upload a student .xlsx and run the full autopsy."""
    if not file.filename or not file.filename.endswith(".xlsx"):
        raise HTTPException(400, detail="Only .xlsx files are accepted (no macros).")

    pack_dir = os.path.join(PACKS_DIR, f"pack_seed_{seed}")
    key_path = os.path.join(pack_dir, "key.json")
    if not os.path.isfile(key_path):
        raise HTTPException(404, detail=f"Pack for seed {seed} not found. Generate it first.")

    # Save upload to temp
    tmp = tempfile.NamedTemporaryFile(suffix=".xlsx", delete=False)
    try:
        content = await file.read()
        tmp.write(content)
        tmp.close()

        from dayone_autopsy import autopsy
        report = autopsy(tmp.name, pack_dir)

        scores = report["scores"]
        return JSONResponse({
            "status": "success",
            "scores": scores,
            "findings_count": len(report["findings"]),
            "defence_questions": report["defence_questions"],
            "shocks_responsive": scores["shocks_responsive"],
            "shocks_total": scores["shocks_total"],
            "base_matches_key": scores["base_matches_key"],
        })
    except Exception as e:
        raise HTTPException(500, detail=f"Autopsy failed: {e}")
    finally:
        os.unlink(tmp.name)


# ---------------------------------------------------------------------------
# 3. Targeted Defence
# ---------------------------------------------------------------------------

@app.post("/api/dayone/defence/start")
def defence_start(req: DefenceStartRequest):
    """Start a defence session for a student."""
    from dayone_defence import DefenceEngine, get_provider, run_demo_session

    pack_dir = os.path.join(PACKS_DIR, f"pack_seed_{req.seed}")
    key_path = os.path.join(pack_dir, "key.json")
    wb_path = req.workbook_path or os.path.join(pack_dir, "reference.xlsx")

    if not os.path.isfile(key_path):
        raise HTTPException(404, detail=f"Pack for seed {req.seed} not found.")
    if not os.path.isfile(wb_path):
        raise HTTPException(404, detail=f"Workbook not found: {wb_path}")

    key = json.load(open(key_path, encoding="utf-8"))

    from dayone_autopsy import static_checks, defence_questions
    static_f, stats = static_checks(wb_path)
    qs = defence_questions(static_f, key, limit=3)

    if not qs:
        qs = [{"finding": "DEMO", "where": "Model!N6",
               "question": "Walk me through how cell N6 computes the landed cost."}]

    engine = DefenceEngine(get_provider("mock"))
    session = engine.build_session(req.student_id, req.seed, wb_path, qs)

    session_id = uuid.uuid4().hex[:12]
    _defence_sessions[session_id] = {
        "engine": engine,
        "session": session,
    }

    return {
        "session_id": session_id,
        "questions": [q.model_dump() for q in session.questions],
    }


@app.post("/api/dayone/defence/answer")
def defence_answer(req: DefenceAnswerRequest):
    """Submit a student's answer for a defence question."""
    entry = _defence_sessions.get(req.session_id)
    if not entry:
        raise HTTPException(404, detail="Session not found.")

    engine = entry["engine"]
    session = entry["session"]

    response = engine.process_answer(session, req.question_index, req.answer)

    result = {
        "question_index": response.question_index,
        "classification": response.classification,
        "claims_detected": response.claims_detected,
        "claims_verified": response.claims_verified,
        "session_status": session.overall_outcome,
        "understanding_gate": session.understanding_gate_passed,
        "recommended_level": session.recommended_level,
    }

    # If session is complete, generate evidence brief
    if len(session.responses) == len(session.questions):
        scores = {
            "shocks_total": 6, "shocks_responsive": 6,
            "base_matches_key": True, "constraint_ok": True,
            "typed_numbers": 0, "magic_constants": 0,
            "constant_formulas": 0, "unused_inputs": 0,
            "ai_declared": None, "notes_present": False,
        }
        defence = {
            "outcome": session.overall_outcome,
            "understanding_gate": session.understanding_gate_passed,
        }
        candidate = {
            "alias": f"CANDIDATE-{session.student_id[:8].upper()}",
            "target_role": "Graduate Analyst",
        }
        scenario = {"name": "Day One Landed-Cost", "version": "0.1", "seed": session.scenario_seed}

        brief = build_brief(scores, defence, candidate, scenario)
        _briefs[brief.brief_id] = brief
        result["evidence_brief_id"] = brief.brief_id
        result["evidence_brief_url"] = f"/verify/{brief.brief_id}"

    return result


# ---------------------------------------------------------------------------
# 4. Verification page
# ---------------------------------------------------------------------------

@app.get("/verify/{brief_id}", response_class=HTMLResponse)
def verify_page(brief_id: str, blind: bool = True):
    """Public, tamper-evident verification page for an Evidence Brief."""
    brief = _briefs.get(brief_id)
    if not brief:
        # Try loading from disk
        json_path = os.path.join(BRIEFS_DIR, f"{brief_id}.json")
        if os.path.isfile(json_path):
            data = json.load(open(json_path, encoding="utf-8"))
            brief = EvidenceBrief(**data)
        else:
            raise HTTPException(404, detail="Brief not found.")

    is_valid = verify_brief(brief)
    html = render_brief_html(brief, blind=blind)

    if not is_valid:
        warning = (
            '<div style="background:#ffebee;border:2px solid #c62828;padding:16px;'
            'border-radius:8px;margin:16px;text-align:center;color:#c62828;font-weight:700;">'
            '⚠️ WARNING: This brief failed integrity verification. '
            'The digest does not match. This brief may have been tampered with.</div>'
        )
        html = html.replace('<div class="container">', f'<div class="container">{warning}', 1)

    return HTMLResponse(html)


# ---------------------------------------------------------------------------
# 5. Planner
# ---------------------------------------------------------------------------

@app.post("/api/planner/solve")
def planner_solve(req: PlannerRequest):
    """Solve an optimal learning plan under the student's constraints."""
    profile = StudentProfile(
        target_role=req.role,
        weekly_hours=req.weekly_hours,
        weekly_mb=req.weekly_mb,
        deadline_weeks=req.deadline_weeks,
        offline_only=req.offline_only,
    )
    plan = solve(profile)
    return {
        "status": "optimal",
        "total_hours": plan.total_hours,
        "total_mb": plan.total_mb,
        "total_cost_ngn": plan.total_cost_ngn,
        "demand_weighted_gain": round(plan.demand_weighted_gain, 3),
        "weeks": plan.weeks,
        "weekly_breakdown": plan.weekly_breakdown,
        "skill_gains": {k: round(v, 3) for k, v in plan.skill_gains.items()},
        "text_summary": format_plan(plan, profile),
    }


# ---------------------------------------------------------------------------
# 6. Radar
# ---------------------------------------------------------------------------

@app.get("/api/radar/heatmap")
def radar_heatmap(department: Optional[str] = None, n_postings: int = 50, seed: int = 42):
    """Return curriculum gap analysis and cohort funnel."""
    postings = generate_sample_postings(n_postings, seed)
    gaps = analyse_gaps(postings, SAMPLE_COURSES, department=department)

    departments = sorted(set(c.department for c in SAMPLE_COURSES))
    practiced = {"EXCEL_FORMULAS", "DATA_CLEANING", "ERROR_DETECTION", "STAKEHOLDER_COMM",
                 "AI_VERIFICATION", "ASSUMPTION_MGMT", "EXCEL_MODELLING"}
    proven = {"EXCEL_MODELLING", "ERROR_DETECTION"}

    funnels = []
    for d in (departments if not department else [department]):
        f = compute_funnel(SAMPLE_COURSES, d, practiced, proven)
        funnels.append({
            "department": f.department,
            "taught_pct": f.taught_pct,
            "practiced_pct": f.practiced_pct,
            "proven_pct": f.proven_pct,
        })

    return {
        "postings_count": len(postings),
        "department_filter": department,
        "gaps": [{"skill": g.skill_name, "demand": g.employer_demand,
                  "coverage": g.curriculum_coverage, "gap": g.gap_score,
                  "category": g.category} for g in gaps[:20]],
        "funnels": funnels,
        "text_heatmap": format_heatmap(gaps, top_n=15),
    }


# ---------------------------------------------------------------------------
# 7. Landing page
# ---------------------------------------------------------------------------

@app.get("/", response_class=HTMLResponse)
def landing():
    return HTMLResponse("""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Sabi — Show You Sabi</title>
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    background: linear-gradient(135deg, #1a237e 0%, #283593 100%);
    color: #fff; min-height: 100vh; display: flex; align-items: center;
    justify-content: center;
  }
  .hero { text-align: center; padding: 40px 20px; max-width: 600px; }
  h1 { font-size: 3em; margin-bottom: 8px; }
  .tagline { font-size: 1.2em; opacity: 0.9; margin-bottom: 32px; }
  .endpoints {
    background: rgba(255,255,255,0.1); border-radius: 12px; padding: 24px;
    text-align: left; margin-top: 24px;
  }
  .endpoints h3 { margin-bottom: 12px; font-size: 1em; opacity: 0.8; }
  .ep {
    display: flex; gap: 8px; margin-bottom: 8px; font-size: 0.9em;
    align-items: baseline;
  }
  .method {
    background: rgba(255,255,255,0.2); border-radius: 4px; padding: 2px 8px;
    font-family: monospace; font-size: 0.85em; min-width: 45px; text-align: center;
  }
  code { font-family: monospace; opacity: 0.9; }
  .footer { margin-top: 32px; font-size: 0.8em; opacity: 0.6; }
</style>
</head>
<body>
<div class="hero">
  <h1>🎓 Sabi</h1>
  <p class="tagline">Show you sabi: verified proof of what a graduate can actually do.</p>
  <p style="font-size:0.95em;opacity:0.85;margin-bottom:16px;">
    Taught → Practiced → Proven. Code decides, the LLM narrates.
  </p>
  <div class="endpoints">
    <h3>API Endpoints</h3>
    <div class="ep"><span class="method">POST</span> <code>/api/dayone/pack/generate</code> — Generate a scenario pack</div>
    <div class="ep"><span class="method">POST</span> <code>/api/dayone/submit</code> — Upload & autopsy a workbook</div>
    <div class="ep"><span class="method">POST</span> <code>/api/dayone/defence/start</code> — Start defence session</div>
    <div class="ep"><span class="method">POST</span> <code>/api/dayone/defence/answer</code> — Answer a defence question</div>
    <div class="ep"><span class="method">GET</span> <code>/verify/{brief_id}</code> — Verify an Evidence Brief</div>
    <div class="ep"><span class="method">POST</span> <code>/api/planner/solve</code> — Optimise a learning plan</div>
    <div class="ep"><span class="method">GET</span> <code>/api/radar/heatmap</code> — Curriculum gap analysis</div>
    <div class="ep"><span class="method">GET</span> <code>/docs</code> — Interactive API documentation</div>
  </div>
  <p class="footer">Sabi v0.1 · University-to-Work Gap Hackathon · November 2026</p>
</div>
</body>
</html>""")


# ---------------------------------------------------------------------------
# Run
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    import uvicorn
    print("Starting Sabi API server...")
    print("Docs: http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000)

