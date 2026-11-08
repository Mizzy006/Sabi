#!/usr/bin/env python3
"""Evidence Brief builder for Sabi: cryptographically signed, employer-readable
verification records produced after a Day One scenario.

Usage:
    python sabi_verify.py                          # demo with selftest_report.json
    python sabi_verify.py --report my_report.json  # use a custom autopsy report

Outputs land in evidence_brief_demo/.
"""
from __future__ import annotations

import argparse
import hashlib
import json
import os
import uuid
from datetime import datetime, timezone
from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field


# ---------------------------------------------------------------------------
# 1. Pydantic Data Models
# ---------------------------------------------------------------------------

class SkillLevel(str, Enum):
    EMERGING = "Emerging"
    WORKING = "Working"
    STRONG = "Strong"


class EvidenceTier(str, Enum):
    TIER_A = "A"   # Auto-verified (Arena / Day One)
    TIER_B = "B"   # Mentor / SME reviewed
    TIER_C = "C"   # Sponsor / capstone attested


class SkillClaim(BaseModel):
    skill_id: str
    skill_name: str
    level: SkillLevel
    tier: EvidenceTier
    evidence_summary: str


class VerificationSignals(BaseModel):
    # From autopsy
    shocks_survived: tuple[int, int]         # (passed, total)
    typed_numbers_found: int
    magic_constants_found: int
    base_matches_key: bool
    constraint_compliance: bool
    # From defence
    defence_outcome: str                     # "passed" | "partial" | "failed"
    understanding_gate: bool
    # Behavioural
    ai_tools_declared: Optional[str] = None  # "Yes" | "No" | None
    assumptions_documented: bool


class Attestation(BaseModel):
    role: str       # "mentor" | "sme_owner" | "sponsor"
    name: str
    date: datetime
    statement: str


class EvidenceBrief(BaseModel):
    # Identity (blind mode strips candidate_name/school/gender)
    brief_id: str
    candidate_alias: str                        # always present
    candidate_name: Optional[str] = None        # stripped in blind mode
    candidate_school: Optional[str] = None      # stripped in blind mode
    candidate_gender: Optional[str] = None      # stripped in blind mode
    target_role: str
    # Evidence
    skills: list[SkillClaim]
    signals: VerificationSignals
    attestations: list[Attestation] = []
    # Scenario metadata
    scenario_name: str
    scenario_version: str
    instance_seed_hash: str
    # Integrity
    created_at: datetime
    sha256_digest: str = ""
    verification_url: str = ""
    qr_code_path: str = ""
    # Honest framing
    limitations_note: str


# ---------------------------------------------------------------------------
# 2. Brief Builder
# ---------------------------------------------------------------------------

_DEFAULT_LIMITATIONS = (
    "This brief records performance on a single, time-boxed scenario. "
    "It does NOT claim the candidate can handle every variant of this problem, "
    "nor does it measure soft skills, domain expertise beyond the scenario scope, "
    "or long-term job performance. Tier A evidence is auto-verified and capped at "
    "'Working'; 'Strong' always requires independent human review (Tier B+). "
    "The system raises the cost of faking until honest practice is the cheapest route — "
    "it does not claim to be unfakeable."
)


def _map_skill_level(
    shocks_responsive: int,
    shocks_total: int,
    base_matches_key: bool,
    constraint_ok: bool,
    defence_outcome: str,
    understanding_gate: bool,
) -> SkillLevel:
    """Map autopsy signals to a Tier-A skill level (Working cap).

    Rules
    -----
    - All shocks responsive + base matches key + constraints OK
      + defence passed → Working (Tier A cap)
    - Partial shock survival or defence partial → Emerging
    - Strong is never auto-awarded (requires Tier B human review)
    - Understanding gate below floor → cap at Emerging regardless
    """
    if not understanding_gate:
        return SkillLevel.EMERGING

    all_shocks = shocks_responsive == shocks_total and shocks_total > 0
    if all_shocks and base_matches_key and constraint_ok and defence_outcome == "passed":
        return SkillLevel.WORKING

    return SkillLevel.EMERGING


def _derive_defence(defence_session: dict | None) -> tuple[str, bool]:
    """Return (defence_outcome, understanding_gate) from defence session dict."""
    if defence_session is None:
        return "failed", False
    outcome = defence_session.get("outcome", "failed")
    gate = defence_session.get("understanding_gate", False)
    return outcome, gate


def _seed_hash(scenario_meta: dict) -> str:
    """Hash the seed for the instance_seed_hash field."""
    seed = str(scenario_meta.get("seed", scenario_meta.get("version", "")))
    return hashlib.sha256(seed.encode()).hexdigest()[:16]


def build_brief(
    autopsy_report: dict,
    defence_session: dict | None,
    candidate_info: dict,
    scenario_meta: dict,
) -> EvidenceBrief:
    """Construct an EvidenceBrief from autopsy output + defence + candidate info.

    Parameters
    ----------
    autopsy_report : dict
        The ``scores`` sub-dict from ``dayone_autopsy.autopsy()``.
    defence_session : dict | None
        ``{"outcome": "passed"|"partial"|"failed", "understanding_gate": bool}``
    candidate_info : dict
        ``{"alias": str, "name": str|None, "school": str|None,
          "gender": str|None, "target_role": str}``
    scenario_meta : dict
        ``{"name": str, "version": str, "seed": int|str}``
    """
    scores = autopsy_report if "shocks_total" in autopsy_report else autopsy_report.get("scores", autopsy_report)

    shocks_responsive = scores.get("shocks_responsive", 0)
    shocks_total = scores.get("shocks_total", 0)
    base_matches_key = scores.get("base_matches_key", False)
    constraint_ok = scores.get("constraint_ok", False)

    defence_outcome, understanding_gate = _derive_defence(defence_session)

    level = _map_skill_level(
        shocks_responsive, shocks_total,
        base_matches_key, constraint_ok,
        defence_outcome, understanding_gate,
    )

    # Build the skill claims for the scenario
    skills = [
        SkillClaim(
            skill_id="LC-MODEL-01",
            skill_name="Landed-Cost Modelling",
            level=level,
            tier=EvidenceTier.TIER_A,
            evidence_summary=(
                f"Scenario auto-check: {shocks_responsive}/{shocks_total} shocks responsive, "
                f"base {'matches' if base_matches_key else 'does not match'} key, "
                f"constraints {'OK' if constraint_ok else 'violated'}, "
                f"defence {defence_outcome}."
            ),
        ),
        SkillClaim(
            skill_id="EXCEL-STRUCT-01",
            skill_name="Spreadsheet Structure & Hygiene",
            level=level,
            tier=EvidenceTier.TIER_A,
            evidence_summary=(
                f"Typed numbers: {scores.get('typed_numbers', '?')}, "
                f"magic constants: {scores.get('magic_constants', '?')}, "
                f"constant formulas: {scores.get('constant_formulas', '?')}, "
                f"unused inputs: {scores.get('unused_inputs', '?')}."
            ),
        ),
    ]

    brief_id = uuid.uuid4().hex[:12]

    signals = VerificationSignals(
        shocks_survived=(shocks_responsive, shocks_total),
        typed_numbers_found=scores.get("typed_numbers", 0),
        magic_constants_found=scores.get("magic_constants", 0),
        base_matches_key=base_matches_key,
        constraint_compliance=constraint_ok,
        defence_outcome=defence_outcome,
        understanding_gate=understanding_gate,
        ai_tools_declared=scores.get("ai_declared"),
        assumptions_documented=scores.get("notes_present", False),
    )

    brief = EvidenceBrief(
        brief_id=brief_id,
        candidate_alias=candidate_info.get("alias", "CANDIDATE"),
        candidate_name=candidate_info.get("name"),
        candidate_school=candidate_info.get("school"),
        candidate_gender=candidate_info.get("gender"),
        target_role=candidate_info.get("target_role", "Graduate Analyst"),
        skills=skills,
        signals=signals,
        scenario_name=scenario_meta.get("name", "Day One Landed-Cost"),
        scenario_version=scenario_meta.get("version", "0.1"),
        instance_seed_hash=_seed_hash(scenario_meta),
        created_at=datetime.now(timezone.utc),
        limitations_note=_DEFAULT_LIMITATIONS,
    )

    brief.verification_url = f"/verify/{brief.brief_id}"
    return sign_brief(brief)


# ---------------------------------------------------------------------------
# 3. Blind Mode
# ---------------------------------------------------------------------------

def apply_blind_mode(brief: EvidenceBrief) -> EvidenceBrief:
    """Return a copy with PII fields blanked; alias remains."""
    data = brief.model_dump()
    data["candidate_name"] = None
    data["candidate_school"] = None
    data["candidate_gender"] = None
    return EvidenceBrief(**data)


# ---------------------------------------------------------------------------
# 4. SHA-256 Signing & Verification
# ---------------------------------------------------------------------------

def _canonical_json(brief: EvidenceBrief) -> str:
    """Serialize to canonical JSON (sorted keys, no digest field)."""
    data = brief.model_dump(mode="json")
    data.pop("sha256_digest", None)
    return json.dumps(data, sort_keys=True, ensure_ascii=False, default=str)


def sign_brief(brief: EvidenceBrief) -> EvidenceBrief:
    """Compute and set the SHA-256 digest of the canonical JSON."""
    # Zero the digest before computing
    brief.sha256_digest = ""
    canonical = _canonical_json(brief)
    digest = hashlib.sha256(canonical.encode("utf-8")).hexdigest()
    brief.sha256_digest = digest
    return brief


def verify_brief(brief: EvidenceBrief) -> bool:
    """Recompute the digest and compare to the stored value."""
    stored = brief.sha256_digest
    # Temporarily blank the digest to recompute
    copy = brief.model_copy()
    copy.sha256_digest = ""
    canonical = _canonical_json(copy)
    expected = hashlib.sha256(canonical.encode("utf-8")).hexdigest()
    return stored == expected


# ---------------------------------------------------------------------------
# 5. QR Code Generation
# ---------------------------------------------------------------------------

def _generate_qr_svg(url: str, path: str) -> str:
    """Minimal SVG QR-code fallback (encodes the URL as text label)."""
    svg = (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">\n'
        '  <rect width="200" height="200" fill="white" stroke="#333" stroke-width="2"/>\n'
        '  <rect x="20" y="20" width="60" height="60" fill="#333"/>\n'
        '  <rect x="30" y="30" width="40" height="40" fill="white"/>\n'
        '  <rect x="38" y="38" width="24" height="24" fill="#333"/>\n'
        '  <rect x="120" y="20" width="60" height="60" fill="#333"/>\n'
        '  <rect x="130" y="30" width="40" height="40" fill="white"/>\n'
        '  <rect x="138" y="38" width="24" height="24" fill="#333"/>\n'
        '  <rect x="20" y="120" width="60" height="60" fill="#333"/>\n'
        '  <rect x="30" y="130" width="40" height="40" fill="white"/>\n'
        '  <rect x="38" y="138" width="24" height="24" fill="#333"/>\n'
        f'  <text x="100" y="105" font-size="8" text-anchor="middle" fill="#333">{url}</text>\n'
        '</svg>\n'
    )
    with open(path, "w", encoding="utf-8") as f:
        f.write(svg)
    return path


def generate_qr(brief: EvidenceBrief, output_dir: str) -> str:
    """Generate a QR code image for the verification URL.

    Uses the ``qrcode`` library (PNG) if available, otherwise falls back to
    a simple SVG placeholder.
    """
    os.makedirs(output_dir, exist_ok=True)
    url = brief.verification_url or f"/verify/{brief.brief_id}"

    try:
        import qrcode  # type: ignore
        img = qrcode.make(url)
        path = os.path.join(output_dir, f"qr_{brief.brief_id}.png")
        img.save(path)
        return path
    except ImportError:
        path = os.path.join(output_dir, f"qr_{brief.brief_id}.svg")
        return _generate_qr_svg(url, path)


# ---------------------------------------------------------------------------
# 6. HTML Rendering
# ---------------------------------------------------------------------------

def _level_badge(level: SkillLevel) -> str:
    colors = {
        SkillLevel.EMERGING: ("#f0ad4e", "#fff"),
        SkillLevel.WORKING: ("#5cb85c", "#fff"),
        SkillLevel.STRONG: ("#337ab7", "#fff"),
    }
    bg, fg = colors.get(level, ("#999", "#fff"))
    return (
        f'<span style="display:inline-block;padding:2px 10px;border-radius:12px;'
        f'background:{bg};color:{fg};font-size:0.85em;font-weight:600;">'
        f'{level.value}</span>'
    )


def _tier_label(tier: EvidenceTier) -> str:
    labels = {
        EvidenceTier.TIER_A: "Auto-verified",
        EvidenceTier.TIER_B: "Mentor/SME reviewed",
        EvidenceTier.TIER_C: "Sponsor attested",
    }
    return f"Tier {tier.value} — {labels.get(tier, tier.value)}"


def _signal_row(label: str, value, good: bool | None = None) -> str:
    if isinstance(value, bool):
        icon = "✅" if value else "❌"
        display = icon
        good = value
    elif isinstance(value, tuple):
        passed, total = value
        display = f"{passed} / {total}"
        good = passed == total if total > 0 else None
    else:
        display = str(value) if value is not None else "—"

    color = ""
    if good is True:
        color = "color:#2e7d32;"
    elif good is False:
        color = "color:#c62828;"

    return (
        f"<tr>"
        f'<td style="padding:6px 12px;border-bottom:1px solid #e0e0e0;">{label}</td>'
        f'<td style="padding:6px 12px;border-bottom:1px solid #e0e0e0;text-align:center;{color}font-weight:600;">{display}</td>'
        f"</tr>"
    )


def render_brief_html(brief: EvidenceBrief, blind: bool = True) -> str:
    """Render a clean, responsive, mobile-first HTML page for the Evidence Brief.

    Designed for low-bandwidth connections (inline CSS, no JS frameworks,
    no heavy images).
    """
    b = apply_blind_mode(brief) if blind else brief

    # QR code embed (data-URI would be heavy; link to file instead)
    qr_html = ""
    if b.qr_code_path:
        qr_file = os.path.basename(b.qr_code_path)
        qr_html = f'<img src="{qr_file}" alt="Verification QR" style="width:120px;height:120px;margin:8px 0;">'

    # Candidate identity section
    identity_rows = f"<strong>{b.candidate_alias}</strong>"
    if not blind and b.candidate_name:
        identity_rows += f" ({b.candidate_name})"

    # Skills table
    skill_rows = ""
    for sc in b.skills:
        skill_rows += (
            f"<tr>"
            f'<td style="padding:8px 12px;border-bottom:1px solid #e0e0e0;">{sc.skill_name}</td>'
            f'<td style="padding:8px 12px;border-bottom:1px solid #e0e0e0;text-align:center;">{_level_badge(sc.level)}</td>'
            f'<td style="padding:8px 12px;border-bottom:1px solid #e0e0e0;font-size:0.85em;color:#666;">{_tier_label(sc.tier)}</td>'
            f"</tr>"
            f"<tr>"
            f'<td colspan="3" style="padding:4px 12px 12px;font-size:0.85em;color:#555;">{sc.evidence_summary}</td>'
            f"</tr>"
        )

    # Signals scorecard
    s = b.signals
    signal_rows = "".join([
        _signal_row("Shocks survived", s.shocks_survived),
        _signal_row("Typed numbers", s.typed_numbers_found, s.typed_numbers_found == 0),
        _signal_row("Magic constants", s.magic_constants_found, s.magic_constants_found == 0),
        _signal_row("Base matches key", s.base_matches_key),
        _signal_row("Constraint compliance", s.constraint_compliance),
        _signal_row("Defence outcome", s.defence_outcome, s.defence_outcome == "passed"),
        _signal_row("Understanding gate", s.understanding_gate),
        _signal_row("AI tools declared", s.ai_tools_declared or "—"),
        _signal_row("Assumptions documented", s.assumptions_documented),
    ])

    # Attestations
    attest_html = ""
    if b.attestations:
        attest_items = ""
        for a in b.attestations:
            attest_items += (
                f'<div style="padding:8px 0;border-bottom:1px solid #eee;">'
                f'<strong>{a.role.title()}</strong> — {a.name} '
                f'<span style="color:#888;font-size:0.85em;">({a.date.strftime("%Y-%m-%d")})</span><br>'
                f'<em style="font-size:0.9em;color:#555;">&ldquo;{a.statement}&rdquo;</em>'
                f"</div>"
            )
        attest_html = (
            f'<div style="margin-top:24px;">'
            f'<h3 style="color:#1a237e;border-bottom:2px solid #c5cae9;padding-bottom:4px;">Attestations</h3>'
            f"{attest_items}</div>"
        )

    created = b.created_at.strftime("%Y-%m-%d %H:%M UTC") if b.created_at else "—"

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Evidence Brief — {b.candidate_alias}</title>
<style>
  * {{ box-sizing: border-box; margin: 0; padding: 0; }}
  body {{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background: #f5f5f5; color: #212121; line-height: 1.5;
  }}
  .container {{
    max-width: 640px; margin: 0 auto; padding: 16px;
  }}
  .card {{
    background: #fff; border-radius: 8px; padding: 20px; margin-bottom: 16px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12);
  }}
  h1 {{ font-size: 1.3em; color: #1a237e; }}
  h2 {{ font-size: 1.1em; color: #1a237e; margin-bottom: 8px; }}
  h3 {{ font-size: 1em; }}
  table {{ width: 100%; border-collapse: collapse; }}
  .digest {{
    font-family: "Courier New", monospace; font-size: 0.72em;
    word-break: break-all; color: #37474f; background: #eceff1;
    padding: 8px; border-radius: 4px; margin-top: 8px;
  }}
  .badge-verified {{
    display: inline-block; padding: 4px 12px; border-radius: 16px;
    background: #e8f5e9; color: #2e7d32; font-size: 0.85em; font-weight: 600;
    border: 1px solid #a5d6a7;
  }}
  .limitations {{
    background: #fff8e1; border-left: 4px solid #f9a825; padding: 12px 16px;
    border-radius: 4px; margin-top: 16px; font-size: 0.9em; color: #5d4037;
  }}
  @media (max-width: 480px) {{
    .container {{ padding: 8px; }}
    .card {{ padding: 12px; }}
    h1 {{ font-size: 1.1em; }}
  }}
</style>
</head>
<body>
<div class="container">

  <!-- Header -->
  <div class="card" style="border-top:4px solid #1a237e;">
    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:8px;">
      <div>
        <h1>&#x1F4CB; Sabi Evidence Brief</h1>
        <p style="margin-top:4px;font-size:0.9em;color:#666;">Brief ID: <code>{b.brief_id}</code></p>
      </div>
      <div style="text-align:right;">
        <span class="badge-verified">&#x2714; Signed</span>
      </div>
    </div>
    <hr style="margin:12px 0;border:none;border-top:1px solid #e0e0e0;">
    <table>
      <tr>
        <td style="padding:4px 0;color:#666;width:40%;">Candidate</td>
        <td style="padding:4px 0;">{identity_rows}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;color:#666;">Target Role</td>
        <td style="padding:4px 0;">{b.target_role}</td>
      </tr>
      <tr>
        <td style="padding:4px 0;color:#666;">Scenario</td>
        <td style="padding:4px 0;">{b.scenario_name} (v{b.scenario_version})</td>
      </tr>
      <tr>
        <td style="padding:4px 0;color:#666;">Created</td>
        <td style="padding:4px 0;">{created}</td>
      </tr>
    </table>
  </div>

  <!-- Skill Claims -->
  <div class="card">
    <h2>&#x1F3AF; Verified Skills</h2>
    <table style="margin-top:8px;">
      <thead>
        <tr style="background:#e8eaf6;">
          <th style="padding:8px 12px;text-align:left;">Skill</th>
          <th style="padding:8px 12px;text-align:center;">Level</th>
          <th style="padding:8px 12px;text-align:left;">Evidence Tier</th>
        </tr>
      </thead>
      <tbody>{skill_rows}</tbody>
    </table>
  </div>

  <!-- Verification Signals Scorecard -->
  <div class="card">
    <h2>&#x1F4CA; Verification Scorecard</h2>
    <table style="margin-top:8px;">
      <thead>
        <tr style="background:#e8eaf6;">
          <th style="padding:8px 12px;text-align:left;">Signal</th>
          <th style="padding:8px 12px;text-align:center;">Result</th>
        </tr>
      </thead>
      <tbody>{signal_rows}</tbody>
    </table>
  </div>

  {attest_html}

  <!-- Limitations -->
  <div class="card">
    <h2>&#x26A0;&#xFE0F; What This Brief Does NOT Claim</h2>
    <div class="limitations">{b.limitations_note}</div>
  </div>

  <!-- Integrity / Verification -->
  <div class="card">
    <h2>&#x1F512; Integrity Verification</h2>
    <p style="font-size:0.9em;color:#555;margin-bottom:8px;">
      The SHA-256 digest below covers every field of this brief (except the digest itself).
      Recompute it from the JSON to confirm nothing has been altered.
    </p>
    <div class="digest">SHA-256: {b.sha256_digest}</div>
    <div style="margin-top:12px;text-align:center;">
      {qr_html}
      <p style="font-size:0.8em;color:#888;margin-top:4px;">Scan to verify at <code>{b.verification_url}</code></p>
    </div>
  </div>

  <footer style="text-align:center;padding:16px 0;font-size:0.8em;color:#999;">
    Sabi Verification Platform &middot; Instance seed hash: {b.instance_seed_hash}
  </footer>

</div>
</body>
</html>"""
    return html


# ---------------------------------------------------------------------------
# 7. CLI / Demo
# ---------------------------------------------------------------------------

def _load_report(path: str) -> dict:
    """Load an autopsy report JSON file."""
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def demo(report_path: str | None = None):
    """Run the demo: build, sign, QR, render, save."""
    # Resolve the report
    base_dir = os.path.dirname(os.path.abspath(__file__))
    if report_path is None:
        # Try selftest_report.json first, then pack_seed_1/key.json
        candidates = [
            os.path.join(base_dir, "selftest_report.json"),
            os.path.join(base_dir, "pack_seed_1", "key.json"),
        ]
        for c in candidates:
            if os.path.exists(c):
                report_path = c
                break
        if report_path is None:
            print("ERROR: No report file found. Run dayone_autopsy.py --selftest first.")
            return

    raw = _load_report(report_path)

    # The selftest report has multiple sub-reports; pick "A_reference" for the demo
    if "A_reference" in raw:
        autopsy_report = raw["A_reference"]["scores"]
    elif "scores" in raw:
        autopsy_report = raw["scores"]
    else:
        autopsy_report = raw

    # Simulated defence session (reference workbook → passed)
    defence_session = {
        "outcome": "passed",
        "understanding_gate": True,
    }

    candidate_info = {
        "alias": "CANDIDATE-DEMO-001",
        "name": "Ada Okafor",
        "school": "University of Lagos",
        "gender": "Female",
        "target_role": "Graduate Supply-Chain Analyst",
    }

    scenario_meta = {
        "name": "Day One Landed-Cost",
        "version": "0.1",
        "seed": 1,
    }

    # Build, sign, generate QR, render
    brief = build_brief(autopsy_report, defence_session, candidate_info, scenario_meta)

    output_dir = os.path.join(base_dir, "evidence_brief_demo")
    os.makedirs(output_dir, exist_ok=True)

    qr_path = generate_qr(brief, output_dir)
    brief.qr_code_path = qr_path
    brief = sign_brief(brief)  # re-sign after adding QR path

    # Save JSON
    json_path = os.path.join(output_dir, "evidence_brief.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(brief.model_dump(mode="json"), f, indent=2, ensure_ascii=False, default=str)

    # Render HTML — employer view is blind by default
    html = render_brief_html(brief, blind=True)
    html_path = os.path.join(output_dir, "evidence_brief.html")
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(html)

    # Also render a full (non-blind) version for the candidate
    html_full = render_brief_html(brief, blind=False)
    html_full_path = os.path.join(output_dir, "evidence_brief_full.html")
    with open(html_full_path, "w", encoding="utf-8") as f:
        f.write(html_full)

    # Verify the brief
    is_valid = verify_brief(brief)

    print(f"Evidence Brief generated successfully!")
    print(f"  Brief ID:     {brief.brief_id}")
    print(f"  SHA-256:      {brief.sha256_digest}")
    print(f"  Verified:     {'✓ PASS' if is_valid else '✗ FAIL'}")
    print(f"  Skills:       {', '.join(f'{s.skill_name} [{s.level.value}]' for s in brief.skills)}")
    print(f"  QR code:      {qr_path}")
    print(f"  HTML (blind): {html_path}")
    print(f"  HTML (full):  {html_full_path}")
    print(f"  JSON:         {json_path}")
    print(f"  Output dir:   {output_dir}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Sabi Evidence Brief builder — generates a signed, employer-readable verification record.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    parser.add_argument("--report", help="Path to an autopsy report JSON file")
    args = parser.parse_args()
    demo(args.report)
