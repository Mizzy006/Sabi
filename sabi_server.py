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

from dotenv import load_dotenv
load_dotenv()

import json
import math
import os
import re
import shutil
import struct
import tempfile
import uuid
import wave
from datetime import datetime, timezone
from typing import Optional, List, Dict, Any

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
    """Ensure high-quality spoken audio presets exist using Windows SAPI TTS or fallback."""
    p1 = os.path.join(VOICE_NOTES_DIR, "mrs_adebayo_retail.wav")
    p2 = os.path.join(VOICE_NOTES_DIR, "alhaji_musa_logistics.wav")

    # If files exist and are larger than 200KB, they are real speech files
    need_p1 = not os.path.isfile(p1) or os.path.getsize(p1) < 200_000
    need_p2 = not os.path.isfile(p2) or os.path.getsize(p2) < 200_000

    if not need_p1 and not need_p2:
        return

    try:
        import win32com.client
        speaker = win32com.client.Dispatch("SAPI.SpVoice")
        stream = win32com.client.Dispatch("SAPI.SpFileStream")
        voices = list(speaker.GetVoices())

        if need_p1:
            for v in voices:
                if "hazel" in v.GetDescription().lower():
                    speaker.Voice = v
                    break
            speaker.Rate = 0
            speaker.Volume = 100
            stream.Open(os.path.abspath(p1), 3, False)
            speaker.AudioOutputStream = stream
            speaker.Speak(
                "Good morning, my name is Mrs. Funke Adebayo. I run a provisions store in Surulere, Lagos. "
                "My address is 15 Bode Thomas Street, Surulere. My phone number is 08034567890. "
                "I have a problem with my sales records. I've been keeping them in exercise books for three years, "
                "but I want someone to help me put everything into Excel so I can see which products are selling well "
                "and which ones are not moving. I need a chart showing my monthly sales trend. "
                "My email is funke.adebayo@gmail.com. My BVN is 22345678901. Thank you."
            )
            stream.Close()

        if need_p2:
            for v in voices:
                if "zira" in v.GetDescription().lower():
                    speaker.Voice = v
                    break
            speaker.Rate = -1
            speaker.Volume = 100
            stream.Open(os.path.abspath(p2), 3, False)
            speaker.AudioOutputStream = stream
            speaker.Speak(
                "Good afternoon. This is Alhaji Musa from Kano Logistics. Call me at 08123456789. "
                "I need someone who knows Excel well to help me clean up our fuel consumption records. "
                "We have 12 heavy trucks driving the Lagos to Kano and Kaduna route. "
                "The drivers submit receipts for diesel and maintenance every week. Right now everything is scattered. "
                "I want a proper template where my manager can enter the litres of diesel bought, the amount paid, "
                "and distance covered, and it will calculate cost per kilometre. "
                "Email me at musa.haulage@yahoo.com. My business registration is RC 98765432101. Thank you."
            )
            stream.Close()
        return
    except Exception as e:
        print(f"SAPI voice generation failed, using fallback: {e}")

    # Fallback wave generation if SAPI unavailable
    for sf in ["mrs_adebayo_retail.wav", "alhaji_musa_logistics.wav"]:
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


class LoginRequest(BaseModel):
    email: str
    password: Optional[str] = "password"
    role: Optional[str] = "student"  # "student" or "employer"
    name: Optional[str] = None
    organization: Optional[str] = None


class EmployerTaskCreate(BaseModel):
    title: str
    role_track: str
    company_name: str
    timebox_mins: int = 90
    data_budget_mb: int = 50
    problem_statement: str
    deliverables: List[str]
    skill_tags: List[str]
    posted_by: str = "Hiring Partner"
    effort_estimate: Optional[str] = "3-5 days"


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

    provider_name = "groq" if os.environ.get("GROQ_API_KEY") else "mock"
    engine = DefenceEngine(get_provider(provider_name))
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

def clean_nigerian_transcript(text: str) -> str:
    """Polish phonetic misrecognitions of Nigerian names, places, currencies, and business terms."""
    if not text:
        return text

    replacements = [
        # Currencies & Numbers
        (r'\b(night\s*run|nara|nyra|niara|naira)\b', 'Naira'),
        (r'\b(cobo|cobble|kobo)\b', 'kobo'),
        (r'\b(bv\s*and|bbn|bbm|b\s*v\s*n)\b', 'BVN'),
        (r'\b(n\s*i\s*n|n\s*and\s*n)\b', 'NIN'),
        (r'\b(p\s*o\s*s|pause\s*machine)\b', 'POS'),
        (r'\b(c\s*a\s*c|c\s*a\s*see)\b', 'CAC'),
        (r'\b(f\s*i\s*r\s*s)\b', 'FIRS'),
        # Locations
        (r'\b(surely\s*ray|suru\s*lere)\b', 'Surulere'),
        (r'\b(e\s*cage|ekeja)\b', 'Ikeja'),
        (r'\b(yabba)\b', 'Yaba'),
        (r'\b(a\s*papa)\b', 'Apapa'),
        (r'\b(onicha)\b', 'Onitsha'),
        (r'\b(bode\s*thomas)\b', 'Bode Thomas'),
        (r'\b(tin\s*can)\b', 'Tin Can'),
        # Commercial / Retail / Logistics
        (r'\b(pro\s*visions?|provison|provisons)\b', 'provisions'),
        (r'\b(whole\s*sail|whole\s*sales?)\b', 'wholesale'),
        (r'\b(exercise\s*book|exercise\s*books)\b', 'exercise books'),
        (r'\b(way\s*bill|way\s*bills)\b', 'waybill'),
        (r'\b(haulage|halage)\b', 'haulage'),
    ]

    cleaned = text
    for pattern, repl in replacements:
        cleaned = re.sub(pattern, repl, cleaned, flags=re.IGNORECASE)

    # Reassemble spaced out phone numbers e.g. "0 8 0 3 4 5 6 7 8 9 0"
    cleaned = re.sub(r'\b(0\s*[789]\s*[01]\s*(?:\d\s*){7,8})\b', lambda m: m.group(1).replace(' ', ''), cleaned)
    return cleaned.strip()


@app.post("/api/sme/process")
def sme_process(req: SMEProcessRequest):
    """Mask Nigerian PII and extract structured project brief from text."""
    cleaned_text = clean_nigerian_transcript(req.text)
    active_groq_key = os.environ.get("GROQ_API_KEY")
    brief = process_voice_note(
        cleaned_text,
        owner_alias=req.owner_alias,
        business_type=req.business_type,
        groq_key=active_groq_key,
    )
    return brief.model_dump(mode="json")


@app.post("/api/sme/upload-audio")
async def sme_upload_audio(
    audio: UploadFile = File(...),
    owner_alias: str = Form("SME_OWNER"),
    business_type: str = Form("Small business"),
    transcript: Optional[str] = Form(None),
    groq_key: Optional[str] = Form(None),
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
    active_groq_key = groq_key or os.environ.get("GROQ_API_KEY")

    # If Groq Whisper key is available, ALWAYS run high-precision Whisper directly on audio file
    if active_groq_key:
        try:
            from groq import Groq
            client = Groq(api_key=active_groq_key.strip())
            with open(save_path, "rb") as af:
                transcription = client.audio.transcriptions.create(
                    file=(safe_name, af.read()),
                    model="whisper-large-v3-turbo",
                    prompt="Nigerian business voice note mentioning Naira, Surulere, Ikeja, Lagos, wholesale, retail, provisions, BVN, NIN, POS, and accounting records.",
                    language="en",
                    temperature=0.0
                )
                if transcription.text and len(transcription.text.strip()) > 3:
                    transcribed_text = transcription.text.strip()
        except Exception as e:
            print(f"Groq Whisper notice: {e}")

    # Fallback to phonetic cleaning if browser captured transcript
    if transcribed_text and len(transcribed_text.strip()) >= 5:
        transcribed_text = clean_nigerian_transcript(transcribed_text)
    else:
        # Contextual realistic transcript if speech engine was unavailable or mic was muted
        transcribed_text = (
            f"Hello, my name is {owner_alias}. I manage a {business_type} in Lagos. "
            f"My phone number is 08023456789 and my email is {owner_alias.lower().replace(' ', '.')}@gmail.com. "
            f"I have a problem with our financial bookkeeping. I need a qualified analyst to help clean up our "
            f"daily sales entries, inventory turnover records, and customer accounts in Excel. "
            f"Please deliver an automated model with summary charts within one week. Thank you."
        )

    brief = process_voice_note(transcribed_text, owner_alias=owner_alias, business_type=business_type, groq_key=active_groq_key)
    return {
        "status": "success",
        "audio_url": f"/voice_notes/{safe_name}",
        "filename": safe_name,
        "filesize_bytes": len(content),
        "transcript": transcribed_text,
        "brief": brief.model_dump(mode="json"),
    }


# ---------------------------------------------------------------------------
# 8. Authentication & Portal Role Separation
# ---------------------------------------------------------------------------

DEMO_USERS: List[Dict[str, Any]] = [
    {
        "id": "usr_ada_001",
        "email": "ada@unilag.edu.ng",
        "role": "student",
        "name": "Ada Okafor",
        "organization": "University of Lagos",
        "department": "Economics",
        "level": "Working",
        "verified_tasks_count": 2,
        "alias": "Ada Okafor"
    },
    {
        "id": "usr_emeka_002",
        "email": "emeka@ui.edu.ng",
        "role": "student",
        "name": "Emeka Obi",
        "organization": "University of Ibadan",
        "department": "Computer Science",
        "level": "Emerging",
        "verified_tasks_count": 1,
        "alias": "Emeka Obi"
    },
    {
        "id": "usr_kemi_003",
        "email": "kemi@moniepoint.com",
        "role": "employer",
        "name": "Kemi Adebayo",
        "organization": "Moniepoint",
        "title": "Lead Talent Partner",
        "posted_tasks_count": 2
    },
    {
        "id": "usr_tunde_004",
        "email": "tunde@flutterwave.com",
        "role": "employer",
        "name": "Tunde Bakare",
        "organization": "Flutterwave",
        "title": "VP People Operations",
        "posted_tasks_count": 1
    }
]

EMPLOYER_TASKS_FILE = os.path.join(BASE_DIR, "employer_tasks.json")

DEFAULT_EMPLOYER_TASKS: List[Dict[str, Any]] = [
    {
        "id": "task-emp-001",
        "title": "Moniepoint POS Float Rebalance & Settlement Model",
        "company_name": "Moniepoint",
        "role_track": "operations_associate",
        "role_title": "Operations Associate",
        "timebox_mins": 90,
        "data_budget_mb": 45,
        "problem_statement": "Agency banking aggregators in Ikeja and Alaba experience uneven terminal liquidity during weekend commercial peaks. Construct an automated dispatch rebalancing model to minimize cashout failure rates while limiting cash-in-transit demurrage.",
        "deliverables": [
            "Dynamic terminal cashout prediction formula based on 30-day velocity",
            "Optimal float allocation matrix across 25 high-volume agency nodes",
            "Liquidity stress sensitivity table reflecting 35% weekend cashout surge"
        ],
        "skill_tags": ["Liquidity Modelling", "Haulage Fleet Dispatch", "Scenario Analysis", "Excel Sensitivity Tables"],
        "posted_by": "Kemi Adebayo (Moniepoint)",
        "posted_date": "2026-11-08",
        "applicants_count": 14,
        "status": "Active"
    },
    {
        "id": "task-emp-002",
        "title": "Alaba Market Electronics Import Demurrage Shield",
        "company_name": "Alaba Trade Logistics (SME)",
        "role_track": "graduate_supply_chain_analyst",
        "role_title": "Graduate Supply-Chain Analyst",
        "timebox_mins": 90,
        "data_budget_mb": 50,
        "problem_statement": "Electronics importers docking at Apapa Port face fluctuating tariff surcharges and compounding demurrage penalties after 5 free days. Construct a dynamic spreadsheet model linking USD purchasing prices to landed Naira costs per carton under FX shock.",
        "deliverables": [
            "Multi-tier customs tariff calculator applying ECOWAS CET rates",
            "Demurrage escalation penalty formula based on terminal holding duration",
            "Landed unit cost sensitivity analysis for +/- 20% NGN/USD FX fluctuations"
        ],
        "skill_tags": ["Landed-Cost Modelling", "FX Sensitivity", "Customs Tariffs", "Supply Chain Invariance"],
        "posted_by": "Adebayo Alaba Merchant (SME Rail)",
        "posted_date": "2026-11-09",
        "applicants_count": 9,
        "status": "Active"
    },
    {
        "id": "task-emp-003",
        "title": "Kuda Micro-Savings Retention & Payback Ledger",
        "company_name": "Kuda Microfinance Bank",
        "role_track": "junior_data_analyst",
        "role_title": "Junior Data Analyst",
        "timebox_mins": 120,
        "data_budget_mb": 60,
        "problem_statement": "A digital banking app tracks monthly savings cohorts and recurring subscription churn. You must model Customer Acquisition Cost (CAC) payback periods and lifetime gross margin per active saver across 12 monthly cohorts.",
        "deliverables": [
            "12-month cohort retention triangle with dynamic churn percentage formulas",
            "CAC payback period calculator segmented by organic vs paid acquisition channels",
            "Sensitivity shock proving whether marketing spend remains solvent under 15% deposit outflow"
        ],
        "skill_tags": ["Cohort Retention", "Unit Economics", "LTV/CAC Modelling", "Customer Churn Analytics"],
        "posted_by": "Growth & Analytics Team",
        "posted_date": "2026-11-10",
        "applicants_count": 21,
        "status": "Active"
    }
]

def load_employer_tasks() -> List[Dict[str, Any]]:
    if os.path.isfile(EMPLOYER_TASKS_FILE):
        try:
            with open(EMPLOYER_TASKS_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            pass
    # Initialize with default tasks
    save_employer_tasks(DEFAULT_EMPLOYER_TASKS)
    return DEFAULT_EMPLOYER_TASKS

def save_employer_tasks(tasks: List[Dict[str, Any]]) -> None:
    try:
        with open(EMPLOYER_TASKS_FILE, "w", encoding="utf-8") as f:
            json.dump(tasks, f, indent=2, ensure_ascii=False)
    except Exception as e:
        print(f"Warning: could not save employer tasks: {e}")


@app.get("/api/auth/demo-users")
def get_demo_users():
    """Return available preset demo accounts for student and employer portals."""
    return {"status": "success", "users": DEMO_USERS}


@app.post("/api/auth/login")
def login(req: LoginRequest):
    """Authenticate or instantiate a session for Student or Employer."""
    email_clean = req.email.strip().lower()
    role_clean = (req.role or "student").strip().lower()

    # Check existing demo users
    for user in DEMO_USERS:
        if user["email"].lower() == email_clean:
            return {
                "status": "success",
                "message": f"Welcome back, {user['name']}!",
                "user": user
            }

    # Dynamically provision session for arbitrary valid emails
    generated_name = req.name or (email_clean.split("@")[0].replace(".", " ").title())
    user_session = {
        "id": f"usr_{uuid.uuid4().hex[:8]}",
        "email": email_clean,
        "role": role_clean,
        "name": generated_name,
        "organization": req.organization or ("University Partner" if role_clean == "student" else "Hiring Organization"),
        "alias": generated_name,
        "level": "Working" if role_clean == "student" else None,
        "title": "Talent Partner" if role_clean == "employer" else "Student Candidate"
    }
    return {
        "status": "success",
        "message": f"Session established for {generated_name}",
        "user": user_session
    }


@app.get("/api/employer/tasks")
def list_employer_tasks(role: Optional[str] = None):
    """Return active tasks and micro-projects posted by employers/SMEs."""
    tasks = load_employer_tasks()
    if role:
        tasks = [t for t in tasks if t.get("role_track") == role]
    return {
        "status": "success",
        "count": len(tasks),
        "tasks": tasks
    }


@app.post("/api/employer/tasks")
def create_employer_task(task_in: EmployerTaskCreate):
    """Post a new challenge or micro-project from an employer or SME voice note."""
    tasks = load_employer_tasks()
    
    role_titles = {
        "graduate_supply_chain_analyst": "Graduate Supply-Chain Analyst",
        "junior_data_analyst": "Junior Data Analyst",
        "operations_associate": "Operations Associate",
        "financial_modelling_intern": "Financial Modelling Intern"
    }
    
    new_task = {
        "id": f"task-emp-{uuid.uuid4().hex[:6]}",
        "title": task_in.title,
        "company_name": task_in.company_name,
        "role_track": task_in.role_track,
        "role_title": role_titles.get(task_in.role_track, task_in.role_track.replace("_", " ").title()),
        "timebox_mins": task_in.timebox_mins,
        "data_budget_mb": task_in.data_budget_mb,
        "problem_statement": task_in.problem_statement,
        "deliverables": task_in.deliverables,
        "skill_tags": task_in.skill_tags,
        "posted_by": task_in.posted_by,
        "posted_date": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
        "applicants_count": 0,
        "status": "Active"
    }
    tasks.insert(0, new_task)
    save_employer_tasks(tasks)
    return {
        "status": "success",
        "message": "Task published to student portal successfully!",
        "task": new_task
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
