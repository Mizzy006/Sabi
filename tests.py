#!/usr/bin/env python3
"""Sabi test suite — validates every component end to end.

Run:  python -m pytest tests.py -v
"""
import hashlib
import json
import os
import sys

import pytest

BASE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, BASE)


# ─── dayone_generator ───────────────────────────────────────────────────────

class TestGenerator:
    def test_make_pack_seed1(self):
        from dayone_generator import make_pack
        pack = make_pack(1)
        assert pack["seed"] == 1
        assert len(pack["clean"]) == 12
        assert len(pack["raw"]) == 13  # 12 + 1 duplicate
        assert pack["base"]["summary"]["skus_included"] == 12

    def test_make_pack_deterministic(self):
        from dayone_generator import make_pack
        a = make_pack(1)
        b = make_pack(1)
        assert a["inputs"] == b["inputs"]
        assert a["base"] == b["base"]

    def test_make_pack_different_seeds(self):
        from dayone_generator import make_pack
        a = make_pack(1)
        b = make_pack(2)
        assert a["inputs"]["FX_USD_NGN"] != b["inputs"]["FX_USD_NGN"]

    def test_shocks_produce_expected_effects(self):
        from dayone_generator import make_pack
        pack = make_pack(1)
        fx_shock = next(s for s in pack["shocks"] if s["id"] == "S1_FX")
        assert fx_shock["expected"]["summary"]["within_budget_planned"] == "No"

        budget_shock = next(s for s in pack["shocks"] if s["id"] == "S4_BUDGET")
        assert budget_shock["expected"]["summary"]["skus_included"] < 12

    def test_flaws_present(self):
        from dayone_generator import make_pack
        pack = make_pack(1)
        assert len(pack["flaws"]["cny"]) == 3
        assert len(pack["flaws"]["grams"]) == 3
        assert len(pack["flaws"]["text_price"]) == 5
        assert pack["flaws"]["duplicate_sku"] in [c["sku"] for c in pack["clean"]]

    def test_unit_costs_currency_conversion(self):
        from dayone_generator import unit_costs
        inp = {"FX_USD_NGN": 1500, "FX_CNY_PER_USD": 7.0, "FREIGHT_USD_PER_KG": 3.0,
               "CLEARING_PCT": 0.05, "HAULAGE_NGN_PER_UNIT": 400, "TARGET_MARGIN": 0.30}
        duty = {"Electronics": 0.10}
        clean = [{"sku": "T1", "cat": "Electronics", "currency": "CNY",
                  "price_quoted": 70.0, "weight_kg": 1.0}]
        out = unit_costs(inp, duty, clean)
        # CNY 70 / 7 = USD 10, FOB = 10 * 1500 = 15000, freight = 1.0 * 3.0 * 1500 = 4500
        # CIF = 15000 + 4500 = 19500, duty = 19500 * 0.10 = 1950, clearing = 19500 * 0.05 = 975
        # landed = 19500 + 1950 + 975 + 400 = 22825
        assert abs(out["T1"]["landed"] - 22825) < 0.01


# ─── dayone_autopsy ─────────────────────────────────────────────────────────

class TestAutopsy:
    def test_static_checks_on_reference(self):
        ref_path = os.path.join(BASE, "pack_seed_1", "reference.xlsx")
        if not os.path.exists(ref_path):
            pytest.skip("pack_seed_1 not generated")
        from dayone_autopsy import static_checks
        findings, stats = static_checks(ref_path)
        assert stats["typed_numbers"] == 0
        assert stats["magic_constants"] == 0
        assert stats["unused_inputs"] == 0

    def test_selftest_report_exists(self):
        path = os.path.join(BASE, "selftest_report.json")
        if not os.path.exists(path):
            pytest.skip("selftest not run yet")
        data = json.load(open(path))
        assert "A_reference" in data
        ref = data["A_reference"]["scores"]
        assert ref["base_matches_key"] is True
        assert ref["shocks_responsive"] == 6

    def test_variant_b_caught(self):
        path = os.path.join(BASE, "selftest_report.json")
        if not os.path.exists(path):
            pytest.skip("selftest not run yet")
        data = json.load(open(path))
        b = data["B_pasted_values"]["scores"]
        assert b["typed_numbers"] > 0
        assert b["shocks_responsive"] == 0

    def test_variant_c_caught(self):
        path = os.path.join(BASE, "selftest_report.json")
        if not os.path.exists(path):
            pytest.skip("selftest not run yet")
        data = json.load(open(path))
        c = data["C_magic_constants"]["scores"]
        assert c["magic_constants"] > 0
        assert c["unused_inputs"] > 0


# ─── dayone_defence ──────────────────────────────────────────────────────────

class TestDefence:
    def test_claim_checker_direct(self):
        ref = os.path.join(BASE, "pack_seed_1", "reference.xlsx")
        if not os.path.exists(ref):
            pytest.skip("pack_seed_1 not generated")
        from dayone_defence import check_claim
        result = check_claim(ref, "Model!N6", "FX_USD_NGN")
        assert result["verified"] is True
        assert result["dependency_type"] in ("named_range", "transitive")

    def test_claim_checker_negative(self):
        ref = os.path.join(BASE, "pack_seed_1", "reference.xlsx")
        if not os.path.exists(ref):
            pytest.skip("pack_seed_1 not generated")
        from dayone_defence import check_claim
        result = check_claim(ref, "Model!N6", "NONEXISTENT_RANGE")
        assert result["verified"] is False

    def test_dependency_tree(self):
        ref = os.path.join(BASE, "pack_seed_1", "reference.xlsx")
        if not os.path.exists(ref):
            pytest.skip("pack_seed_1 not generated")
        from dayone_defence import get_cell_dependencies
        deps = get_cell_dependencies(ref, "Model!N6")
        assert deps["formula"] is not None
        assert len(deps["all_deps"]) > 5  # N6 has many transitive deps

    def test_mock_provider(self):
        from dayone_defence import MockProvider
        provider = MockProvider()
        result = provider.generate([
            {"role": "system", "content": "You are Mrs. Bello, persona."},
            {"role": "user", "content": "Classify: I don't know"},
        ])
        assert result["classification"] == "could_not_explain"

    def test_valid_labels(self):
        from dayone_defence import VALID_LABELS
        assert "acknowledged_and_fixed" in VALID_LABELS
        assert "defended_with_valid_reasoning" in VALID_LABELS
        assert "rationalised" in VALID_LABELS
        assert "could_not_explain" in VALID_LABELS
        assert len(VALID_LABELS) == 4


# ─── sabi_verify ─────────────────────────────────────────────────────────────

class TestVerify:
    def _make_brief(self):
        from sabi_verify import build_brief
        scores = {
            "shocks_total": 6, "shocks_responsive": 6,
            "base_matches_key": True, "constraint_ok": True,
            "typed_numbers": 0, "magic_constants": 0,
            "constant_formulas": 0, "unused_inputs": 0,
            "ai_declared": "Yes", "notes_present": True,
        }
        defence = {"outcome": "passed", "understanding_gate": True}
        candidate = {"alias": "TEST-001", "name": "Test User", "school": "Test Uni",
                     "gender": "Male", "target_role": "Graduate Analyst"}
        scenario = {"name": "Landed-Cost", "version": "0.1", "seed": 1}
        return build_brief(scores, defence, candidate, scenario)

    def test_build_brief(self):
        brief = self._make_brief()
        assert brief.brief_id
        assert len(brief.skills) == 2
        assert brief.skills[0].level.value == "Working"

    def test_sign_and_verify(self):
        from sabi_verify import verify_brief
        brief = self._make_brief()
        assert verify_brief(brief) is True

    def test_tamper_detection(self):
        from sabi_verify import verify_brief
        brief = self._make_brief()
        brief.candidate_alias = "TAMPERED"
        assert verify_brief(brief) is False

    def test_blind_mode(self):
        from sabi_verify import apply_blind_mode
        brief = self._make_brief()
        blind = apply_blind_mode(brief)
        assert blind.candidate_name is None
        assert blind.candidate_school is None
        assert blind.candidate_gender is None
        assert blind.candidate_alias == "TEST-001"

    def test_understanding_gate_caps_at_emerging(self):
        from sabi_verify import build_brief
        scores = {
            "shocks_total": 6, "shocks_responsive": 6,
            "base_matches_key": True, "constraint_ok": True,
            "typed_numbers": 0, "magic_constants": 0,
            "constant_formulas": 0, "unused_inputs": 0,
        }
        defence = {"outcome": "passed", "understanding_gate": False}
        candidate = {"alias": "TEST", "target_role": "Analyst"}
        scenario = {"name": "Test", "version": "0.1", "seed": 1}
        brief = build_brief(scores, defence, candidate, scenario)
        assert brief.skills[0].level.value == "Emerging"

    def test_html_render(self):
        from sabi_verify import render_brief_html
        brief = self._make_brief()
        html = render_brief_html(brief, blind=True)
        assert "Evidence Brief" in html
        assert "TEST-001" in html
        assert "Test User" not in html  # blind mode


# ─── sabi_planner ────────────────────────────────────────────────────────────

class TestPlanner:
    def test_solve_default(self):
        from sabi_planner import StudentProfile, solve
        plan = solve(StudentProfile())
        assert plan.total_hours > 0
        assert plan.total_mb > 0
        assert len(plan.slots) > 0
        assert plan.demand_weighted_gain > 0

    def test_offline_filters(self):
        from sabi_planner import StudentProfile, solve, RESOURCE_LIBRARY
        plan = solve(StudentProfile(offline_only=True))
        for slot in plan.slots:
            assert slot.resource.offline is True

    def test_hours_constraint_respected(self):
        from sabi_planner import StudentProfile, solve
        plan = solve(StudentProfile(weekly_hours=5.0))
        for wb in plan.weekly_breakdown:
            assert wb["total_hours"] <= 5.0 + 0.01

    def test_different_constraints_different_plans(self):
        from sabi_planner import StudentProfile, solve
        a = solve(StudentProfile(weekly_hours=10, weekly_mb=500))
        b = solve(StudentProfile(weekly_hours=5, weekly_mb=100))
        assert a.total_hours >= b.total_hours


# ─── sabi_radar ──────────────────────────────────────────────────────────────

class TestRadar:
    def test_sample_postings(self):
        from sabi_radar import generate_sample_postings
        postings = generate_sample_postings(50, seed=42)
        assert len(postings) == 50
        assert all(p.skills_required for p in postings)

    def test_deterministic(self):
        from sabi_radar import generate_sample_postings
        a = generate_sample_postings(20, seed=42)
        b = generate_sample_postings(20, seed=42)
        assert [p.id for p in a] == [p.id for p in b]

    def test_gap_analysis(self):
        from sabi_radar import generate_sample_postings, SAMPLE_COURSES, analyse_gaps
        postings = generate_sample_postings(50)
        gaps = analyse_gaps(postings, SAMPLE_COURSES, department="Economics")
        assert len(gaps) > 0
        top = gaps[0]
        assert top.gap_score >= 0  # top gap should be positive

    def test_funnel(self):
        from sabi_radar import SAMPLE_COURSES, compute_funnel
        funnel = compute_funnel(SAMPLE_COURSES, "Economics")
        assert funnel.taught > 0
        assert 0 < funnel.taught_pct <= 1.0


# ─── sabi_sme ────────────────────────────────────────────────────────────────

class TestSME:
    def test_phone_detection(self):
        from sabi_sme import detect_pii
        matches = detect_pii("Call me on 08034567890 or +2349012345678")
        phones = [m for m in matches if m.category == "phone"]
        assert len(phones) >= 1

    def test_email_detection(self):
        from sabi_sme import detect_pii
        matches = detect_pii("Send to funke@gmail.com please")
        emails = [m for m in matches if m.category == "email"]
        assert len(emails) == 1

    def test_id_detection(self):
        from sabi_sme import detect_pii
        matches = detect_pii("My BVN is 22345678901")
        ids = [m for m in matches if m.category == "id_number"]
        assert len(ids) == 1

    def test_name_detection(self):
        from sabi_sme import detect_pii
        matches = detect_pii("Contact Mr. Chukwuma Obi for details")
        names = [m for m in matches if m.category == "name"]
        assert len(names) == 1

    def test_mask_pii(self):
        from sabi_sme import mask_pii
        text = "Call Mrs. Funke Adebayo at 08034567890 or funke@email.com"
        masked, matches = mask_pii(text)
        assert "[PHONE_REDACTED]" in masked
        assert "[EMAIL_REDACTED]" in masked
        assert "08034567890" not in masked
        assert "funke@email.com" not in masked

    def test_process_voice_note(self):
        from sabi_sme import process_voice_note
        brief = process_voice_note(
            "I need help with my sales data. Call me on 08012345678.",
            owner_alias="Test Owner",
        )
        assert brief.brief_id
        assert brief.pii_found >= 1
        assert "PHONE_REDACTED" in brief.sanitised_transcript
        assert len(brief.skill_tags) > 0

    def test_effort_scaling(self):
        from sabi_sme import process_voice_note
        short = process_voice_note("Help me with Excel.")
        long = process_voice_note("I need " + "very detailed analysis of " * 30 + "my business data.")
        assert short.effort_days <= long.effort_days


# ---------------------------------------------------------------------------
# Server Endpoints & Frontend Delivery Tests
# ---------------------------------------------------------------------------

class TestServer:
    @classmethod
    def setup_class(cls):
        from fastapi.testclient import TestClient
        from sabi_server import app
        cls.client = TestClient(app)

    def test_landing_page_spa(self):
        res = self.client.get("/")
        assert res.status_code == 200
        html = res.text
        assert "SABI" in html
        assert "Student Portal" in html
        assert "Employer Pipeline" in html
        assert "Radar Analytics" in html
        assert "SME Rails" in html

    def test_pack_download(self):
        res = self.client.get("/api/dayone/pack/1/download")
        assert res.status_code == 200
        assert "application/vnd.openxmlformats" in res.headers.get("content-type", "")

    def test_planner_solve(self):
        res = self.client.post("/api/planner/solve", json={
            "role": "junior_data_analyst",
            "weekly_hours": 10.0,
            "weekly_mb": 500.0,
            "deadline_weeks": 6,
            "offline_only": False
        })
        assert res.status_code == 200
        data = res.json()
        assert data["status"] == "optimal"
        assert data["total_hours"] <= 60.0
        assert len(data["weekly_breakdown"]) > 0

    def test_radar_heatmap(self):
        res = self.client.get("/api/radar/heatmap")
        assert res.status_code == 200
        data = res.json()
        assert len(data["gaps"]) > 0
        assert len(data["funnels"]) > 0

    def test_sme_process(self):
        res = self.client.post("/api/sme/process", json={
            "text": "Call Alhaji Musa on 08023456789 or musa@gmail.com. Need fuel consumption tracking.",
            "owner_alias": "Alhaji Musa",
            "business_type": "Logistics"
        })
        assert res.status_code == 200
        data = res.json()
        assert data["pii_found"] >= 2
        assert "[PHONE_REDACTED]" in data["sanitised_transcript"]
        assert len(data["deliverables"]) > 0

    def test_candidates_endpoint(self):
        res = self.client.get("/api/candidates?blind=true")
        assert res.status_code == 200
        candidates = res.json()
        assert len(candidates) >= 1
        # Blind mode ensures personal identifiers are stripped or None
        assert candidates[0].get("candidate_name") is None

    def test_autopsy_demo(self):
        res = self.client.post("/api/dayone/submit/demo?seed=1")
        assert res.status_code == 200
        data = res.json()
        assert data["status"] == "success"
        assert data["shocks_responsive"] == 6
        assert data["base_matches_key"] is True

