#!/usr/bin/env python3
"""Sabi SME Voice-Note Brief Pipeline.

Turns a 2-minute voice note from a small-business owner into a structured,
sanitised micro-project brief that students can claim for Tier B evidence.

Pipeline:
  1. Transcribe voice note (speech-to-text with text fallback).
  2. Extract a structured brief: problem, deliverables, acceptance criteria,
     data needed, privacy risks, effort estimate, skill tags.
  3. Sanitise: mask Nigerian PII (phone numbers, emails, NIN/BVN-style IDs,
     names detected by pattern).
  4. Owner reviews the sanitised sample and gives consent.
  5. Student claims it, works for 5–10 days, mentor reviews, owner gives
     a short structured reference → Tier B Evidence Brief.

Usage:
    python sabi_sme.py --text "I need someone to help me..."
    python sabi_sme.py --file voice_note.txt
    python sabi_sme.py --demo

Design notes:
  - Nigerian PII patterns: 080/081/070/090/091 phone numbers, 11-digit NIN,
    email addresses, and common Nigerian name patterns.
  - LLM extracts the brief structure; code handles sanitisation.
  - Voice transcription is a later integration (text fallback for MVP).
"""
from __future__ import annotations

import argparse
import json
import os
import re
import uuid
from dataclasses import dataclass, field, asdict
from datetime import datetime, timezone
from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field


# ---------------------------------------------------------------------------
# PII detection and masking (Nigerian patterns)
# ---------------------------------------------------------------------------

# Nigerian phone: 080, 081, 070, 090, 091, +234, etc.
_PHONE_PATTERN = re.compile(
    r'(?:\+234|0)[\s\-]?[789][01]\d[\s\-]?\d{3}[\s\-]?\d{4}'
)

# Email
_EMAIL_PATTERN = re.compile(
    r'[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}'
)

# 11-digit ID-style numbers (NIN, BVN)
_ID_PATTERN = re.compile(r'\b\d{11}\b')

# Account numbers (10 digits, Nigerian bank standard)
_ACCT_PATTERN = re.compile(r'\b\d{10}\b')

# Common Nigerian full names (heuristic: two+ capitalised words together)
# This is deliberately conservative — real NER would be more precise
_NAME_PATTERN = re.compile(
    r'\b(?:Mr\.?|Mrs\.?|Ms\.?|Chief|Alhaji|Alhaja|Dr\.?|Engr\.?|Pastor|Oba)\s+'
    r'[A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3}\b'
)

# Address patterns (street numbers + common Lagos/Abuja markers)
_ADDRESS_PATTERN = re.compile(
    r'\b\d+[A-Za-z]?\s+(?:Street|Road|Avenue|Close|Crescent|Way|Drive|Lane|Boulevard)'
    r'(?:\s*,?\s*[A-Za-z\s]+){0,3}',
    re.IGNORECASE
)


@dataclass
class PIIMatch:
    """A detected PII instance."""
    category: str           # "phone" | "email" | "id_number" | "account" | "name" | "address"
    original: str           # the matched text
    start: int
    end: int
    replacement: str = ""   # the masked version


def detect_pii(text: str) -> list[PIIMatch]:
    """Scan text for Nigerian PII patterns and return all matches."""
    matches: list[PIIMatch] = []

    for m in _PHONE_PATTERN.finditer(text):
        matches.append(PIIMatch("phone", m.group(), m.start(), m.end(), "[PHONE_REDACTED]"))
    for m in _EMAIL_PATTERN.finditer(text):
        matches.append(PIIMatch("email", m.group(), m.start(), m.end(), "[EMAIL_REDACTED]"))
    for m in _ID_PATTERN.finditer(text):
        matches.append(PIIMatch("id_number", m.group(), m.start(), m.end(), "[ID_REDACTED]"))
    for m in _ACCT_PATTERN.finditer(text):
        # Skip if it looks like a year or a round number
        val = m.group()
        if val.startswith("20") and len(val) == 10:
            continue
        matches.append(PIIMatch("account", val, m.start(), m.end(), "[ACCT_REDACTED]"))
    for m in _NAME_PATTERN.finditer(text):
        matches.append(PIIMatch("name", m.group(), m.start(), m.end(), "[NAME_REDACTED]"))
    for m in _ADDRESS_PATTERN.finditer(text):
        matches.append(PIIMatch("address", m.group(), m.start(), m.end(), "[ADDRESS_REDACTED]"))

    # Sort by position (reverse for safe replacement)
    matches.sort(key=lambda p: p.start)
    return matches


def mask_pii(text: str) -> tuple[str, list[PIIMatch]]:
    """Mask all detected PII in the text. Returns (masked_text, matches)."""
    matches = detect_pii(text)
    if not matches:
        return text, []

    # Replace from end to start to preserve positions
    result = text
    for m in reversed(matches):
        result = result[:m.start] + m.replacement + result[m.end:]

    return result, matches


# ---------------------------------------------------------------------------
# Structured brief extraction (LLM-assisted, with mock fallback)
# ---------------------------------------------------------------------------

class EffortLevel(str, Enum):
    SMALL = "small"       # 1–3 days
    MEDIUM = "medium"     # 4–7 days
    LARGE = "large"       # 8–10 days


class PrivacyRisk(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"


class SMEBrief(BaseModel):
    """A structured micro-project brief extracted from an SME voice note."""
    brief_id: str = Field(default_factory=lambda: uuid.uuid4().hex[:12])
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

    # Owner info
    owner_alias: str = ""
    business_type: str = ""
    consent_given: bool = False

    # Extracted structure
    problem_statement: str = ""
    deliverables: list[str] = Field(default_factory=list)
    acceptance_criteria: list[str] = Field(default_factory=list)
    data_needed: list[str] = Field(default_factory=list)
    privacy_risks: list[str] = Field(default_factory=list)
    privacy_risk_level: PrivacyRisk = PrivacyRisk.LOW
    effort_estimate: EffortLevel = EffortLevel.MEDIUM
    effort_days: int = 5
    skill_tags: list[str] = Field(default_factory=list)

    # Sanitisation
    pii_found: int = 0
    pii_categories: list[str] = Field(default_factory=list)
    sanitised_transcript: str = ""
    original_transcript: str = ""

    # Status
    status: str = "draft"  # "draft" | "owner_approved" | "claimed" | "submitted" | "reviewed"
    claimed_by: Optional[str] = None
    mentor_review: Optional[str] = None
    owner_reference: Optional[str] = None


def extract_brief_mock(transcript: str) -> dict:
    """Mock brief extraction (no LLM). Parses keywords heuristically."""

    text_lower = transcript.lower()

    # Heuristic problem detection
    problem_markers = ["need", "want", "help", "looking for", "problem", "issue", "challenge"]
    problem = transcript[:200]  # First 200 chars as problem statement fallback
    for marker in problem_markers:
        idx = text_lower.find(marker)
        if idx >= 0:
            # Take up to 250 chars from the marker
            end = min(len(transcript), idx + 250)
            # Find sentence end
            for sep in [". ", "! ", "? ", "\n"]:
                sep_idx = transcript.find(sep, idx + len(marker))
                if 0 < sep_idx < end:
                    end = sep_idx + 1
                    break
            problem = transcript[idx:end].strip()
            break

    # Deliverables
    deliverables = []
    deliv_markers = ["deliver", "need", "want", "produce", "create", "build", "report", "dashboard",
                     "analysis", "spreadsheet", "chart", "model"]
    for marker in deliv_markers:
        if marker in text_lower:
            # Find the sentence containing this marker
            idx = text_lower.find(marker)
            start = max(0, transcript.rfind(".", 0, idx) + 1)
            end = transcript.find(".", idx)
            if end < 0:
                end = len(transcript)
            sentence = transcript[start:end + 1].strip()
            if sentence and sentence not in deliverables:
                deliverables.append(sentence)
            if len(deliverables) >= 3:
                break
    if not deliverables:
        deliverables = ["Analysis or report as specified by the business owner"]

    # Skill tags (map keywords to taxonomy IDs)
    skill_map = {
        "excel": "EXCEL_FORMULAS", "spreadsheet": "EXCEL_FORMULAS",
        "data": "DATA_CLEANING", "clean": "DATA_CLEANING",
        "sql": "SQL_BASIC", "database": "SQL_BASIC",
        "chart": "VIZ_BASIC", "graph": "VIZ_BASIC", "visual": "VIZ_BASIC",
        "report": "REPORT_WRITING", "write": "REPORT_WRITING",
        "analysis": "PROBLEM_FRAMING", "analy": "PROBLEM_FRAMING",
        "sales": "DATA_CLEANING", "revenue": "EXCEL_FORMULAS",
        "inventory": "DATA_CLEANING", "stock": "DATA_CLEANING",
        "customer": "STAKEHOLDER_COMM", "communication": "STAKEHOLDER_COMM",
        "budget": "EXCEL_MODELLING", "forecast": "EXCEL_MODELLING",
        "cost": "EXCEL_MODELLING", "price": "EXCEL_FORMULAS",
    }
    skills = set()
    for keyword, skill_id in skill_map.items():
        if keyword in text_lower:
            skills.add(skill_id)
    if not skills:
        skills = {"DATA_CLEANING", "PROBLEM_FRAMING"}

    # Effort estimation
    word_count = len(transcript.split())
    if word_count < 50:
        effort = EffortLevel.SMALL
        days = 3
    elif word_count < 150:
        effort = EffortLevel.MEDIUM
        days = 5
    else:
        effort = EffortLevel.LARGE
        days = 8

    # Privacy risk assessment
    privacy_risks = []
    privacy_keywords = {
        "customer": "Contains customer data references",
        "name": "May contain personal names",
        "phone": "May contain phone numbers",
        "address": "May contain addresses",
        "salary": "Contains salary/financial personal data",
        "employee": "Contains employee data references",
        "patient": "Contains medical/patient data",
        "account": "Contains account information",
    }
    risk_level = PrivacyRisk.LOW
    for kw, desc in privacy_keywords.items():
        if kw in text_lower:
            privacy_risks.append(desc)
    if len(privacy_risks) >= 3:
        risk_level = PrivacyRisk.HIGH
    elif len(privacy_risks) >= 1:
        risk_level = PrivacyRisk.MEDIUM

    return {
        "problem_statement": problem,
        "deliverables": deliverables,
        "acceptance_criteria": [
            "Deliverables match the owner's specifications",
            "Data has been cleaned and validated",
            "Analysis is reproducible and documented",
        ],
        "data_needed": ["Business data as described by the owner (to be provided after claim)"],
        "privacy_risks": privacy_risks,
        "privacy_risk_level": risk_level.value,
        "effort_estimate": effort.value,
        "effort_days": days,
        "skill_tags": sorted(skills),
    }


def extract_brief_llm(transcript: str, groq_key: Optional[str] = None) -> dict:
    """Extract brief structure using Groq LLM (with heuristic fallback)."""
    key = groq_key or os.environ.get("GROQ_API_KEY")
    if not key:
        return extract_brief_mock(transcript)

    try:
        from groq import Groq
        client = Groq(api_key=key.strip())
        prompt = f"""
You are an expert commercial project manager analyzing a voice note from a Nigerian business owner.
Extract structured project requirements as a clean JSON object with exact keys:
problem_statement (string: concise summary of the core business problem),
deliverables (list of 2-4 strings: concrete, actionable deliverables),
acceptance_criteria (list of 2-3 strings: specific criteria to accept the work),
data_needed (list of strings: specific business records/files needed from owner),
privacy_risks (list of strings: privacy or data sensitivity risks),
privacy_risk_level ("low", "medium", or "high"),
effort_estimate ("small", "medium", or "large"),
effort_days (integer: 3, 5, or 8),
skill_tags (list of strings, e.g. EXCEL_MODELLING, DATA_CLEANING, VIZ_BASIC, REPORT_WRITING)

Voice note transcript:
\"\"\"{transcript}\"\"\"
"""
        resp = client.chat.completions.create(
            model="openai/gpt-oss-120b",
            messages=[{"role": "user", "content": prompt}],
            response_format={"type": "json_object"},
            temperature=0.0
        )
        data = json.loads(resp.choices[0].message.content)
        # Ensure required fields exist with valid defaults
        if not data.get("problem_statement"):
            data["problem_statement"] = transcript[:200]
        if not data.get("deliverables"):
            data["deliverables"] = ["Clean automated financial spreadsheet model"]
        if not data.get("privacy_risk_level") in ["low", "medium", "high"]:
            data["privacy_risk_level"] = "medium"
        if not data.get("effort_estimate") in ["small", "medium", "large"]:
            data["effort_estimate"] = "medium"
        if not isinstance(data.get("effort_days"), int):
            data["effort_days"] = 5
        if not data.get("skill_tags"):
            data["skill_tags"] = ["EXCEL_MODELLING", "DATA_CLEANING"]
        return data
    except Exception as e:
        print(f"Groq LLM extraction notice (fallback to heuristic): {e}")
        return extract_brief_mock(transcript)


def process_voice_note(
    transcript: str,
    owner_alias: str = "SME_OWNER",
    business_type: str = "Small business",
    groq_key: Optional[str] = None,
) -> SMEBrief:
    """Full pipeline: sanitise → extract → package as SMEBrief."""

    # Step 1: Sanitise PII
    sanitised, pii_matches = mask_pii(transcript)

    # Step 2: Extract structured brief (Groq LLM if key present, else deterministic mock)
    extracted = extract_brief_llm(sanitised, groq_key=groq_key)

    # Step 3: Build the brief
    brief = SMEBrief(
        owner_alias=owner_alias,
        business_type=business_type,
        problem_statement=extracted["problem_statement"],
        deliverables=extracted["deliverables"],
        acceptance_criteria=extracted["acceptance_criteria"],
        data_needed=extracted["data_needed"],
        privacy_risks=extracted["privacy_risks"],
        privacy_risk_level=PrivacyRisk(extracted["privacy_risk_level"]),
        effort_estimate=EffortLevel(extracted["effort_estimate"]),
        effort_days=extracted["effort_days"],
        skill_tags=extracted["skill_tags"],
        pii_found=len(pii_matches),
        pii_categories=sorted(set(m.category for m in pii_matches)),
        sanitised_transcript=sanitised,
        original_transcript=transcript,
        status="draft",
    )

    return brief


# ---------------------------------------------------------------------------
# Display
# ---------------------------------------------------------------------------

def format_brief(brief: SMEBrief) -> str:
    """Human-readable formatted output."""
    lines = [
        "═" * 60,
        "  SABI — SME Micro-Project Brief",
        "═" * 60,
        "",
        f"  Brief ID:        {brief.brief_id}",
        f"  Owner:           {brief.owner_alias} ({brief.business_type})",
        f"  Status:          {brief.status}",
        f"  Created:         {brief.created_at.strftime('%Y-%m-%d %H:%M UTC')}",
        "",
        "── Problem Statement ──",
        f"  {brief.problem_statement}",
        "",
        "── Deliverables ──",
    ]
    for i, d in enumerate(brief.deliverables, 1):
        lines.append(f"  {i}. {d}")

    lines.extend([
        "",
        "── Acceptance Criteria ──",
    ])
    for i, c in enumerate(brief.acceptance_criteria, 1):
        lines.append(f"  {i}. {c}")

    lines.extend([
        "",
        "── Data Needed ──",
    ])
    for d in brief.data_needed:
        lines.append(f"  • {d}")

    lines.extend([
        "",
        f"── Effort Estimate: {brief.effort_estimate.value} ({brief.effort_days} days) ──",
        f"── Skills: {', '.join(brief.skill_tags)} ──",
        "",
    ])

    if brief.privacy_risks:
        lines.append("── Privacy Risks ──")
        for r in brief.privacy_risks:
            lines.append(f"  ⚠ {r}")
        lines.append(f"  Risk level: {brief.privacy_risk_level.value.upper()}")
        lines.append("")

    if brief.pii_found > 0:
        lines.append(f"── PII Sanitisation ──")
        lines.append(f"  {brief.pii_found} PII items detected and masked: {', '.join(brief.pii_categories)}")
        lines.append("")

    lines.append("── Sanitised Transcript ──")
    lines.append(f"  {brief.sanitised_transcript[:500]}")
    if len(brief.sanitised_transcript) > 500:
        lines.append(f"  ... ({len(brief.sanitised_transcript)} chars total)")

    return "\n".join(lines)


# ---------------------------------------------------------------------------
# Demo data
# ---------------------------------------------------------------------------

DEMO_TRANSCRIPTS = [
    {
        "owner": "Mrs. Adebayo",
        "business": "Retail (provisions store)",
        "text": (
            "Good morning, my name is Mrs. Funke Adebayo. I run a provisions store "
            "in Surulere, Lagos. My address is 15 Bode Thomas Street, Surulere. "
            "My phone number is 08034567890. I have a problem with my sales records. "
            "I've been keeping them in exercise books for three years but I want "
            "someone to help me put everything into Excel so I can see which products "
            "are selling well and which ones are not moving. I need a chart showing "
            "my monthly sales trend and which category of goods makes the most money. "
            "I also want to know my best and worst customers. My email is "
            "funke.adebayo@gmail.com. The data is in five exercise books, maybe "
            "about 2000 entries. I can photograph the pages. I need this done in "
            "one week because my accountant Mr. Chukwuma Obi needs it for tax filing. "
            "My BVN is 22345678901. Thank you."
        ),
    },
    {
        "owner": "Alhaji Musa",
        "business": "Logistics (haulage company)",
        "text": (
            "This is Alhaji Ibrahim Musa, I own a haulage company based in Kano. "
            "We transport goods from Apapa port to the North, about 15 trucks. "
            "I need help with tracking my fuel costs and maintenance expenses. "
            "Everything is in my driver's reports and fuel receipts but nobody "
            "organises them. I want a spreadsheet that shows cost per trip, "
            "cost per kilometre, and which trucks are eating too much fuel or "
            "need maintenance. I also want to compare what we charge customers "
            "versus what each trip actually costs us. Some trips we are losing money "
            "and I don't know which ones. My phone is 09012345678, office line is "
            "08098765432. Contact my operations manager Chief Bala Abdullahi at "
            "07065432109 if I'm not available. We have records for the last 6 months."
        ),
    },
]


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main():
    ap = argparse.ArgumentParser(
        description=__doc__,
        formatter_class=argparse.RawDescriptionHelpFormatter,
    )
    ap.add_argument("--text", help="Direct transcript text")
    ap.add_argument("--file", help="Path to transcript text file")
    ap.add_argument("--demo", action="store_true", help="Run with demo transcripts")
    ap.add_argument("--json", dest="json_out", help="Write brief(s) to JSON file")
    a = ap.parse_args()

    briefs = []

    if a.demo or (not a.text and not a.file):
        for sample in DEMO_TRANSCRIPTS:
            brief = process_voice_note(
                sample["text"],
                owner_alias=sample["owner"],
                business_type=sample["business"],
            )
            briefs.append(brief)
            print(format_brief(brief))
            print()

    elif a.text:
        brief = process_voice_note(a.text)
        briefs.append(brief)
        print(format_brief(brief))

    elif a.file:
        with open(a.file, encoding="utf-8") as f:
            text = f.read()
        brief = process_voice_note(text)
        briefs.append(brief)
        print(format_brief(brief))

    if a.json_out:
        data = [b.model_dump(mode="json") for b in briefs]
        with open(a.json_out, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False, default=str)
        print(f"\nBrief(s) written to {a.json_out}")


if __name__ == "__main__":
    main()

