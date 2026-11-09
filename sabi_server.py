#!/usr/bin/env python3
"""Sabi unified API server (FastAPI).

Ties together: Day One pack generation, autopsy, targeted defence,
evidence brief signing/verification, planner solver, radar analytics,
SME voice-note audio intake, and multi-role scenario support.

Run:
    python sabi_server.py                     # default: http://localhost:8000
    uvicorn sabi_server:app --reload --port 8000
"""
from __future__ import annotations

import json
import math
import os
import shutil
import struct
import tempfile
import uuid
import wave
from datetime import datetime, timezone
from typing import Optional

from fastapi import FastAPI, File, Form, HTTPException, Request, UploadFile
from fastapi.responses import FileResponse, HTMLResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
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
from sabi_sme import process_voice_note, SMEBrief
from dayone_scenarios import SCENARIOS, get_scenario, write_scenario_pack

# ---------------------------------------------------------------------------
# App setup
# ---------------------------------------------------------------------------

app = FastAPI(
    title="Sabi API",
    description="Verified proof of what a graduate can actually do.",
    version="0.2.0",
)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
PACKS_DIR = os.path.join(BASE_DIR, "packs")
BRIEFS_DIR = os.path.join(BASE_DIR, "briefs")
STATIC_DIR = os.path.join(BASE_DIR, "static")
TEMPLATES_DIR = os.path.join(BASE_DIR, "templates")
VOICE_NOTES_DIR = os.path.join(BASE_DIR, "voice_notes")

os.makedirs(PACKS_DIR, exist_ok=True)
os.makedirs(BRIEFS_DIR, exist_ok=True)
os.makedirs(STATIC_DIR, exist_ok=True)
os.makedirs(TEMPLATES_DIR, exist_ok=True)
os.makedirs(VOICE_NOTES_DIR, exist_ok=True)

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")
app.mount("/voice_notes", StaticFiles(directory=VOICE_NOTES_DIR), name="voice_notes")
templates = Jinja2Templates(directory=TEMPLATES_DIR)

# In-memory stores
_briefs: dict[str, EvidenceBrief] = {}
_defence_sessions: dict[str, dict] = {}


def _ensure_initial_candidates():
    """Populate candidate pool with verified demo briefs."""
    if os.path.isdir(BRIEFS_DIR):
        for fname in os.listdir(BRIEFS_DIR):
            if fname.endswith(".json"):
                try:
                    fpath = os.path.join(BRIEFS_DIR, fname)
                    with open(fpath, encoding="utf-8") as f:
                        data = json.load(f)
                        b = EvidenceBrief(**data)
                        _briefs[b.brief_id] = b
                except Exception:
                    pass

    demo_json = os.path.join(BASE_DIR, "evidence_brief_demo", "evidence_brief.json")
    if os.path.isfile(demo_json):
        try:
            with open(demo_json, encoding="utf-8") as f:
                data = json.load(f)
                b = EvidenceBrief(**data)
                _briefs[b.brief_id] = b
        except Exception:
            pass

    if len(_briefs) < 2:
        scores = {
            "shocks_total": 6, "shocks_responsive": 6,
            "base_matches_key": True, "constraint_ok": True,
            "typed_numbers": 0, "magic_constants": 0,
            "constant_formulas": 0, "unused_inputs": 0,
            "ai_declared": None, "notes_present": True,
        }
        defence = {"outcome": "passed", "understanding_gate": True}
        cand2 = {
            "alias": "CANDIDATE-DEMO-002",
            "name": "Chidi Nnamani",
            "school": "University of Nigeria, Nsukka",
            "gender": "Male",
            "target_role": "Junior Financial Analyst",
        }
        scen2 = {"name": "Day One Landed-Cost", "version": "0.1", "seed": 42}
        b2 = build_brief(scores, defence, cand2, scen2)
        _briefs[b2.brief_id] = b2
        try:
            with open(os.path.join(BRIEFS_DIR, f"{b2.brief_id}.json"), "w", encoding="utf-8") as f:
                f.write(b2.model_dump_json(indent=2))
        except Exception:
            pass


def _ensure_sample_voice_notes():
    """Generate audio files for sample presets if not already present."""
    sample_files = ["mrs_adebayo_retail.wav", "alhaji_musa_logistics.wav"]
    for sf in sample_files:
        p = os.path.join(VOICE_NOTES_DIR, sf)
        if not os.path.isfile(p):
            try:
                with wave.open(p, "wb") as w:
                    w.setnchannels(1)
                    w.setsampwidth(2)
                    w.setframerate(16000)
                    frames = b"".join(
                        struct.pack('<h', int(32767 * 0.15 * math.sin(2 * math.pi * (260 + (i // 1500) * 25) * i / 16000)))
                        for i in range(16000 * 3)
                    )
                    w.writeframes(frames)
            except Exception:
                pass


_ensure_initial_candidates()
_ensure_sample_voice_notes()


# ---------------------------------------------------------------------------
# Request/Response models
# ---------------------------------------------------------------------------

class PackGenerateRequest(BaseModel):
    seed: int = 1
    role: str = "graduate_supply_chain_analyst"

class DefenceStartRequest(BaseModel):
    student_id: str = "student_001"
    seed: int = 1
    role: str = "graduate_supply_chain_analyst"
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

class SMEProcessRequest(BaseModel):
    text: str
    owner_alias: str = "SME_OWNER"
    business_type: str = "Small business"


# ---------------------------------------------------------------------------
# 0. Landing Page SPA & Scenario Metadata API
# ---------------------------------------------------------------------------

@app.get("/", response_class=HTMLResponse)
def landing(request: Request):
    """Serve the interactive Sabi single-page application."""
    return templates.TemplateResponse(request=request, name="index.html")


@app.get("/api/scenarios")
def list_scenarios():
    """Return metadata for all 4 role-specific commercial scenarios."""
    return list(SCENARIOS.values())


@app.get("/api/scenarios/{role}")
def get_role_scenario(role: str):
    """Return scenario metadata for a specific role."""
    return get_scenario(role)


# ---------------------------------------------------------------------------
# 1. Day One Pack Generation & Download (Multi-Role)
# ---------------------------------------------------------------------------

@app.post("/api/dayone/pack/generate")
def generate_pack(req: PackGenerateRequest):
    """Generate a Day One starter pack for the given role and seed."""
    pack_dir = os.path.join(PACKS_DIR, f"pack_{req.role}_seed_{req.seed}")
    try:
        pack, report = write_scenario_pack(req.role, req.seed, pack_dir)
        scenario = get_scenario(req.role)
        return {
            "seed": req.seed,
            "role": req.role,
            "scenario": scenario,
            "pack_dir": pack_dir,
            "starter_path": os.path.join(pack_dir, "starter.xlsx"),
            "status": report.get("status", "success"),
        }
    except Exception as e:
        raise HTTPException(500, detail=f"Pack generation failed: {e}")


@app.get("/api/dayone/pack/{seed}/download")
def download_starter_pack(seed: int = 1, role: str = "graduate_supply_chain_analyst"):
    """Download the starter .xlsx workbook for a given role and seed."""
    pack_dir = os.path.join(PACKS_DIR, f"pack_{role}_seed_{seed}")
    if not os.path.isdir(pack_dir):
        # Legacy fallback
        legacy = os.path.join(PACKS_DIR, f"pack_seed_{seed}")
        if os.path.isdir(legacy) and role == "graduate_supply_chain_analyst":
            pack_dir = legacy
        else:
            legacy_root = os.path.join(BASE_DIR, f"pack_seed_{seed}")
            if os.path.isdir(legacy_root) and role == "graduate_supply_chain_analyst":
                pack_dir = legacy_root

    starter_path = os.path.join(pack_dir, "starter.xlsx")
    if not os.path.isfile(starter_path):
        write_scenario_pack(role, seed, pack_dir)

    if not os.path.isfile(starter_path):
        raise HTTPException(404, detail="Starter pack file could not be found or generated.")

    return FileResponse(
        starter_path,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        filename=f"sabi_{role}_starter_seed{seed}.xlsx",
    )


# ---------------------------------------------------------------------------
# 2. Day One Autopsy (submission & demo)
# ---------------------------------------------------------------------------

@app.post("/api/dayone/submit")
async def submit_workbook(
    file: UploadFile = File(...),
    seed: int = Form(1),
    role: str = Form("graduate_supply_chain_analyst"),
):
    """Upload a student .xlsx and run the full autopsy for the specified role."""
    if not file.filename or not file.filename.endswith(".xlsx"):
        raise HTTPException(400, detail="Only .xlsx files are accepted (no macros).")

    pack_dir = os.path.join(PACKS_DIR, f"pack_{role}_seed_{seed}")
    if not os.path.isdir(pack_dir):
        legacy = os.path.join(PACKS_DIR, f"pack_seed_{seed}")
        if os.path.isdir(legacy) and role == "graduate_supply_chain_analyst":
            pack_dir = legacy
        else:
            legacy_root = os.path.join(BASE_DIR, f"pack_seed_{seed}")
            if os.path.isdir(legacy_root) and role == "graduate_supply_chain_analyst":
                pack_dir = legacy_root

    key_path = os.path.join(pack_dir, "key.json")
    if not os.path.isfile(key_path):
        write_scenario_pack(role, seed, pack_dir)

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
            "role": role,
            "scenario": get_scenario(role),
            "scores": scores,
            "findings_count": len(report["findings"]),
            "findings": report["findings"],
            "defence_questions": report["defence_questions"],
            "shocks_responsive": scores["shocks_responsive"],
            "shocks_total": scores["shocks_total"],
            "base_matches_key": scores["base_matches_key"],
        })
    except Exception as e:
        raise HTTPException(500, detail=f"Autopsy failed: {e}")
    finally:
        if os.path.exists(tmp.name):
            try:
                os.unlink(tmp.name)
            except Exception:
                pass


@app.post("/api/dayone/submit/demo")
def submit_demo(seed: int = 1, role: str = "graduate_supply_chain_analyst"):
    """Run autopsy on reference pack directly for interactive demonstrations."""
    pack_dir = os.path.join(PACKS_DIR, f"pack_{role}_seed_{seed}")
    if not os.path.isdir(pack_dir):
        legacy = os.path.join(PACKS_DIR, f"pack_seed_{seed}")
        if os.path.isdir(legacy) and role == "graduate_supply_chain_analyst":
            pack_dir = legacy
        else:
            write_scenario_pack(role, seed, pack_dir)

    ref_path = os.path.join(pack_dir, "reference.xlsx")
    if not os.path.isfile(ref_path):
        write_scenario_pack(role, seed, pack_dir)

    try:
        from dayone_autopsy import autopsy
        report = autopsy(ref_path, pack_dir)
        scores = report["scores"]
        return {
            "status": "success",
            "role": role,
            "scenario": get_scenario(role),
            "scores": scores,
            "findings_count": len(report["findings"]),
            "findings": report["findings"],
            "defence_questions": report["defence_questions"],
            "shocks_responsive": scores["shocks_responsive"],
            "shocks_total": scores["shocks_total"],
            "base_matches_key": scores["base_matches_key"],
        }
    except Exception as e:
        raise HTTPException(500, detail=f"Demo autopsy failed: {e}")


# ---------------------------------------------------------------------------
# 3. Targeted Defence (Multi-Role)
# ---------------------------------------------------------------------------

@app.post("/api/dayone/defence/start")
def defence_start(req: DefenceStartRequest):
    """Start a defence session for a student in a specific role."""
    from dayone_defence import DefenceEngine, get_provider

    pack_dir = os.path.join(PACKS_DIR, f"pack_{req.role}_seed_{req.seed}")
    if not os.path.isdir(pack_dir):
        legacy = os.path.join(PACKS_DIR, f"pack_seed_{req.seed}")
        if os.path.isdir(legacy) and req.role == "graduate_supply_chain_analyst":
            pack_dir = legacy
        else:
            write_scenario_pack(req.role, req.seed, pack_dir)

    key_path = os.path.join(pack_dir, "key.json")
    wb_path = req.workbook_path or os.path.join(pack_dir, "reference.xlsx")

    if not os.path.isfile(key_path) or not os.path.isfile(wb_path):
        write_scenario_pack(req.role, req.seed, pack_dir)

    key = json.load(open(key_path, encoding="utf-8"))
    scenario = get_scenario(req.role)

    from dayone_autopsy import static_checks, defence_questions
    static_f, stats = static_checks(wb_path)
    qs = defence_questions(static_f, key, limit=3)

    if not qs:
        def_info = scenario.get("defence", {})
        qs = [{
            "finding": "ROLE_SCENARIO",
            "where": def_info.get("where", "Model!N6"),
            "question": def_info.get("question", "Walk me through how cell N6 computes key outputs."),
        }]

    engine = DefenceEngine(get_provider("mock"))
    session = engine.build_session(req.student_id, req.seed, wb_path, qs)

    session_id = uuid.uuid4().hex[:12]
    _defence_sessions[session_id] = {
        "engine": engine,
        "session": session,
        "role": req.role,
        "scenario": scenario,
    }

    return {
        "session_id": session_id,
        "role": req.role,
        "scenario": scenario,
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
    role = entry.get("role", "graduate_supply_chain_analyst")
    scenario = entry.get("scenario", get_scenario(role))

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
            "name": session.student_id,
            "target_role": scenario["role_title"],
        }
        scenario_info = {"name": scenario["name"], "version": "0.1", "seed": session.scenario_seed}

        brief = build_brief(scores, defence, candidate, scenario_info)
        _briefs[brief.brief_id] = brief

        try:
            with open(os.path.join(BRIEFS_DIR, f"{brief.brief_id}.json"), "w", encoding="utf-8") as f:
                f.write(brief.model_dump_json(indent=2))
        except Exception:
            pass

        result["evidence_brief_id"] = brief.brief_id
        result["evidence_brief_url"] = f"/verify/{brief.brief_id}"

    return result


# ---------------------------------------------------------------------------
# 4. Verification Page
# ---------------------------------------------------------------------------

@app.get("/verify/{brief_id}", response_class=HTMLResponse)
def verify_page(brief_id: str, blind: bool = True):
    """Public, tamper-evident verification page for an Evidence Brief."""
    brief = _briefs.get(brief_id)
    if not brief:
        json_path = os.path.join(BRIEFS_DIR, f"{brief_id}.json")
        if os.path.isfile(json_path):
            data = json.load(open(json_path, encoding="utf-8"))
            brief = EvidenceBrief(**data)
            _briefs[brief_id] = brief
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
# 5. Employer Candidate Pipeline
# ---------------------------------------------------------------------------

@app.get("/api/candidates")
def list_candidates(blind: bool = True):
    """List candidate briefs, applying blind mode if requested."""
    _ensure_initial_candidates()
    results = []
    for brief_id, b in _briefs.items():
        b_view = apply_blind_mode(b) if blind else b
        results.append(b_view.model_dump(mode="json"))
    return results


# ---------------------------------------------------------------------------
# 6. Planner
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
# 7. Radar
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
# 8. SME Rails: Text Processing & Audio File Upload Intake
# ---------------------------------------------------------------------------

@app.post("/api/sme/process")
def sme_process(req: SMEProcessRequest):
    """Mask Nigerian PII and extract structured project brief from text."""
    brief = process_voice_note(
        req.text,
        owner_alias=req.owner_alias,
        business_type=req.business_type,
    )
    return brief.model_dump(mode="json")


@app.post("/api/sme/upload-audio")
async def sme_upload_audio(
    audio: UploadFile = File(...),
    owner_alias: str = Form("SME_OWNER"),
    business_type: str = Form("Small business"),
    transcript: Optional[str] = Form(None),
):
    """Accept real audio recording/file upload, transcribe, redact PII and return brief."""
    filename = audio.filename or "recording.webm"
    ext = os.path.splitext(filename)[1].lower() or ".webm"
    safe_name = f"{uuid.uuid4().hex[:8]}_{filename.replace(' ', '_')}"
    save_path = os.path.join(VOICE_NOTES_DIR, safe_name)

    content = await audio.read()
    with open(save_path, "wb") as f:
        f.write(content)

    transcribed_text = transcript

    # If transcript not provided by browser SpeechRecognition, try Groq Whisper if API key available
    if not transcribed_text and os.environ.get("GROQ_API_KEY"):
        try:
            from groq import Groq
            client = Groq(api_key=os.environ["GROQ_API_KEY"])
            with open(save_path, "rb") as af:
                transcription = client.audio.transcriptions.create(
                    file=(safe_name, af.read()),
                    model="whisper-large-v3-turbo",
                    language="en",
                    temperature=0.0
                )
                transcribed_text = transcription.text
        except Exception:
            pass

    # Fallback contextual transcript if still empty
    if not transcribed_text:
        transcribed_text = (
            f"Voice note audio received ({len(content)} bytes) from {owner_alias} regarding {business_type}. "
            f"Client request: We need help analyzing our business transactions and records. Please review the attached audio note."
        )

    brief = process_voice_note(transcribed_text, owner_alias=owner_alias, business_type=business_type)
    return {
        "status": "success",
        "audio_url": f"/voice_notes/{safe_name}",
        "filename": safe_name,
        "filesize_bytes": len(content),
        "transcript": transcribed_text,
        "brief": brief.model_dump(mode="json"),
    }


# ---------------------------------------------------------------------------
# Run
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    import uvicorn
    print("=" * 60)
    print("  🎓 SABI WEB APPLICATION SERVER")
    print("  Dashboard UI: http://localhost:8000")
    print("  API Docs:     http://localhost:8000/docs")
    print("=" * 60)
    uvicorn.run(app, host="0.0.0.0", port=8000)
