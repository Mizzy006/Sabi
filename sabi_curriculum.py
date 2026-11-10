"""Sabi Curriculum & Candidate Diagnostic Engine.

Performs TestGorilla-style skills diagnostic and dynamic curriculum-to-job
gap analysis for Nigerian graduates.
"""
from __future__ import annotations

import os
import re
import json
from typing import Optional, Dict, Any, List

from sabi_radar import SKILLS_TAXONOMY, SAMPLE_COURSES
from sabi_planner import ROLE_WEIGHTS

KEYWORD_MAPPINGS: Dict[str, List[str]] = {
    "EXCEL_BASIC": ["excel", "spreadsheet", "workbook", "cells", "sheets", "computer applications", "office tools"],
    "EXCEL_FORMULAS": ["vlookup", "xlookup", "index match", "nested if", "sumifs", "excel formula", "functions", "spreadsheet formulas"],
    "EXCEL_PIVOT": ["pivot table", "pivot chart", "slicer", "data summary table", "cross-tabulation"],
    "EXCEL_MODELLING": ["financial model", "landed cost", "cashflow model", "dcf", "valuation model", "dynamic spreadsheet", "sensitivity table", "pro forma"],
    "DATA_CLEANING": ["data cleaning", "data wrangling", "data preprocessing", "data preparation", "missing values", "outlier detection", "pandas cleaning"],
    "SQL_BASIC": ["sql", "select query", "relational database", "rdbms", "database management", "database systems", "sql queries"],
    "SQL_JOINS": ["inner join", "outer join", "left join", "subquery", "table relationship", "joins"],
    "SQL_AGGREGATION": ["group by", "window function", "having clause", "aggregation", "aggregate functions"],
    "PYTHON_BASIC": ["python", "scripts", "programming in python", "syntax", "python fundamentals", "intro to programming"],
    "PANDAS_BASIC": ["pandas", "dataframe", "series", "numpy", "python data analysis"],
    "VIZ_BASIC": ["data visualization", "charts", "matplotlib", "seaborn", "dashboard", "visualisation"],
    "STATS_DESCRIPTIVE": ["descriptive statistics", "mean", "median", "standard deviation", "variance", "summary statistics", "frequency distribution"],
    "STATS_INFERENCE": ["inferential statistics", "hypothesis testing", "p-value", "regression analysis", "econometrics", "t-test", "anova", "econometric"],
    "POWERBI": ["power bi", "tableau", "bi dashboard", "dax", "business intelligence"],
    "GOOGLE_SHEETS": ["google sheets", "apps script"],
    "PROBLEM_FRAMING": ["problem framing", "scoping", "business requirements", "problem solving", "case study", "business strategy"],
    "ASSUMPTION_MGMT": ["assumptions", "sensitivity analysis", "scenario planning", "risk management", "parameter tuning", "uncertainty"],
    "ERROR_DETECTION": ["error detection", "auditing", "model audit", "validation", "quality assurance", "internal control"],
    "CAUSAL_REASONING": ["causal inference", "econometric modelling", "causality", "correlation vs causation", "instrumental variables"],
    "AI_VERIFICATION": ["ai verification", "llm validation", "hallucination check", "model oversight", "prompt evaluation"],
    "CRITICAL_THINKING": ["critical thinking", "analytical reasoning", "economic theory", "critical analysis", "logic"],
    "STAKEHOLDER_COMM": ["stakeholder", "client communication", "presentation", "briefing", "business communication"],
    "REPORT_WRITING": ["report writing", "technical writing", "memo", "research paper", "documentation", "term paper", "thesis"],
    "PRESENTATION": ["presentation skills", "slide deck", "executive summary", "oral defence", "seminar presentation"],
    "TIME_MANAGEMENT": ["time management", "prioritization", "scheduling", "deadlines", "project planning"],
    "TEAMWORK": ["teamwork", "group project", "collaboration", "cross-functional", "group work"],
    "ADAPTABILITY": ["adaptability", "stress tolerance", "invariance", "change management", "resilience"],
    "ATTENTION_DETAIL": ["attention to detail", "reconciliation", "bookkeeping", "accuracy", "ledger"],
    "INITIATIVE": ["independent research", "initiative", "self-directed", "capstone project", "dissertation"]
}

# Role target competencies
ROLE_PROFILES: Dict[str, Dict[str, Any]] = {
    "graduate_supply_chain_analyst": {
        "title": "Graduate Supply-Chain Analyst",
        "description": "Landed-cost modelling, ECOWAS tariff calculation, port demurrage mitigation, and FX sensitivity analysis.",
        "primary_scenario": "Apapa Port Landed-Cost Commercial Model",
        "required": ["EXCEL_FORMULAS", "EXCEL_PIVOT", "EXCEL_MODELLING", "DATA_CLEANING", "ERROR_DETECTION", "ASSUMPTION_MGMT", "PROBLEM_FRAMING", "ADAPTABILITY"],
        "recommended": ["EXCEL_BASIC", "STATS_DESCRIPTIVE", "STAKEHOLDER_COMM", "REPORT_WRITING", "AI_VERIFICATION", "TIME_MANAGEMENT"]
    },
    "junior_data_analyst": {
        "title": "Junior Data Analyst",
        "description": "Customer cohort retention analysis, unit economics (LTV/CAC), and data pipeline cleaning.",
        "primary_scenario": "E-Commerce Customer Retention & Unit Economics Model",
        "required": ["DATA_CLEANING", "EXCEL_FORMULAS", "EXCEL_PIVOT", "SQL_BASIC", "SQL_JOINS", "ERROR_DETECTION", "STAKEHOLDER_COMM", "PROBLEM_FRAMING"],
        "recommended": ["SQL_AGGREGATION", "PYTHON_BASIC", "PANDAS_BASIC", "VIZ_BASIC", "STATS_DESCRIPTIVE", "AI_VERIFICATION"]
    },
    "operations_associate": {
        "title": "Operations Associate",
        "description": "Fleet dispatch haulage margins, liquidity balancing, and turnaround optimization.",
        "primary_scenario": "Interstate Haulage Fleet Dispatch & Route Margins Model",
        "required": ["EXCEL_FORMULAS", "EXCEL_MODELLING", "PROBLEM_FRAMING", "TIME_MANAGEMENT", "ADAPTABILITY", "STAKEHOLDER_COMM", "ERROR_DETECTION"],
        "recommended": ["EXCEL_PIVOT", "DATA_CLEANING", "TEAMWORK", "REPORT_WRITING", "ASSUMPTION_MGMT"]
    },
    "financial_modelling_intern": {
        "title": "Financial Modelling Intern",
        "description": "13-week cashflow runway forecasting, working capital optimization, and credit risk stress-testing.",
        "primary_scenario": "Corporate Working Capital & 13-Week Cashflow Runway",
        "required": ["EXCEL_MODELLING", "EXCEL_FORMULAS", "EXCEL_PIVOT", "ASSUMPTION_MGMT", "STATS_INFERENCE", "ERROR_DETECTION", "REPORT_WRITING"],
        "recommended": ["EXCEL_BASIC", "STATS_DESCRIPTIVE", "PROBLEM_FRAMING", "PRESENTATION", "ATTENTION_DETAIL"]
    }
}


def extract_text_from_file_bytes(content: bytes, filename: str) -> str:
    """Extract text from uploaded syllabus file (PDF, TXT, JSON, MD)."""
    ext = os.path.splitext(filename)[1].lower()
    if ext == ".pdf":
        try:
            import fitz
            doc = fitz.open(stream=content, filetype="pdf")
            pages_text = [page.get_text() for page in doc]
            return "\n".join(pages_text)
        except Exception as e:
            return f"PDF parse fallback: {e}"
    else:
        try:
            return content.decode("utf-8")
        except UnicodeDecodeError:
            return content.decode("latin-1", errors="replace")


def extract_skills_from_curriculum(text: str, groq_key: Optional[str] = None) -> List[str]:
    """Detect covered skills using keyword matching and course code dictionary."""
    text_lower = text.lower()
    detected = set()

    # 1. Match against course codes in sample courses
    for course in SAMPLE_COURSES:
        if course.code.lower() in text_lower or course.title.lower() in text_lower:
            detected.update(course.skills_taught)

    # 2. Match against keyword mappings
    for skill_id, keywords in KEYWORD_MAPPINGS.items():
        for kw in keywords:
            # Word boundary matching for short terms
            pattern = rf"\b{re.escape(kw)}\b" if len(kw) <= 5 else re.escape(kw)
            if re.search(pattern, text_lower):
                detected.add(skill_id)
                break

    # 3. If Groq LLM key is available, use semantic extraction for deeper coverage
    active_groq_key = groq_key or os.environ.get("GROQ_API_KEY")
    if active_groq_key and len(text.strip()) > 30:
        try:
            from groq import Groq
            client = Groq(api_key=active_groq_key.strip())
            prompt = (
                f"You are an academic curriculum analyst. Given this university course outline or syllabus excerpt:\n\n"
                f"\"\"\"\n{text[:2500]}\n\"\"\"\n\n"
                f"Which of the following standardized skill IDs are taught or practiced in this curriculum?\n"
                f"Choose strictly from this list:\n"
                f"{list(SKILLS_TAXONOMY.keys())}\n\n"
                f"Return ONLY a JSON object with key 'skills' containing the list of matching skill ID strings, e.g. {{\"skills\": [\"EXCEL_BASIC\", \"STATS_INFERENCE\"]}}."
            )
            chat_completion = client.chat.completions.create(
                messages=[{"role": "user", "content": prompt}],
                model="openai/gpt-oss-120b",
                temperature=0.0,
                response_format={"type": "json_object"}
            )
            content = chat_completion.choices[0].message.content or "{}"
            parsed = json.loads(content)
            skills_found = parsed.get("skills") or parsed.get("skill_ids") or (parsed if isinstance(parsed, list) else [])
            for s in skills_found:
                if s in SKILLS_TAXONOMY:
                    detected.add(s)
        except Exception as e:
            print(f"Groq curriculum extract note: {e}")

    return sorted(list(detected))


def diagnose_curriculum_gap(
    curriculum_text: str,
    target_role: str = "graduate_supply_chain_analyst",
    student_alias: str = "Ada Okafor",
    groq_key: Optional[str] = None
) -> Dict[str, Any]:
    """Generate dynamic TestGorilla-style diagnostic report comparing syllabus to target job."""
    role_key = target_role if target_role in ROLE_PROFILES else "graduate_supply_chain_analyst"
    role_data = ROLE_PROFILES[role_key]

    detected_skills = extract_skills_from_curriculum(curriculum_text, groq_key=groq_key)
    required_skills = role_data["required"]
    recommended_skills = role_data["recommended"]

    covered_required = [s for s in required_skills if s in detected_skills]
    missing_required = [s for s in required_skills if s not in detected_skills]
    covered_rec = [s for s in recommended_skills if s in detected_skills]
    missing_rec = [s for s in recommended_skills if s not in detected_skills]

    # Weighted calculation
    total_weight = (len(required_skills) * 2) + len(recommended_skills)
    earned_weight = (len(covered_required) * 2) + len(covered_rec)
    match_pct = max(15, min(95, round((earned_weight / max(1, total_weight)) * 100)))

    # Readiness tier
    if match_pct >= 75:
        tier = "Job-Ready (Tier A)"
        cohort_percentile = 88
    elif match_pct >= 50:
        tier = "Working Capability (Tier B)"
        cohort_percentile = 72
    else:
        tier = "Emerging Capability (Tier C)"
        cohort_percentile = 48

    # Format Strong Areas (TestGorilla-style)
    strong_areas = []
    for sid in (covered_required + covered_rec):
        meta = SKILLS_TAXONOMY.get(sid, {"name": sid, "category": "Core"})
        strong_areas.append({
            "skill_id": sid,
            "name": meta["name"],
            "category": meta["category"],
            "rating": "Advanced" if sid in covered_required else "Proficient",
            "score_pct": 85 if sid in covered_required else 72,
            "assessment": "Taught & grounded in academic coursework"
        })

    # If no skills were detected in text, provide a fallback baseline from degree
    if not strong_areas:
        strong_areas = [
            {"skill_id": "CRITICAL_THINKING", "name": "Critical Thinking", "category": "Analytical", "rating": "Proficient", "score_pct": 75, "assessment": "Theoretical academic foundation"},
            {"skill_id": "REPORT_WRITING", "name": "Report & Memo Writing", "category": "Communication", "rating": "Proficient", "score_pct": 70, "assessment": "Term papers and academic research"}
        ]

    # Format Areas to Work On (Skill Deficits)
    deficits = []
    for sid in missing_required:
        meta = SKILLS_TAXONOMY.get(sid, {"name": sid, "category": "Core"})
        deficits.append({
            "skill_id": sid,
            "name": meta["name"],
            "category": meta["category"],
            "severity": "Critical Deficit",
            "gap_description": f"Demanded by {role_data['title']} postings but absent from submitted course outline.",
            "bridge_scenario": role_data["primary_scenario"]
        })
    for sid in missing_rec:
        meta = SKILLS_TAXONOMY.get(sid, {"name": sid, "category": "Core"})
        deficits.append({
            "skill_id": sid,
            "name": meta["name"],
            "category": meta["category"],
            "severity": "Secondary Growth Area",
            "gap_description": f"Recommended for competitive hiring; not covered in syllabus.",
            "bridge_scenario": "PuLP Constraint Study Plan"
        })

    return {
        "status": "success",
        "student_alias": student_alias,
        "target_role": role_key,
        "target_role_title": role_data["title"],
        "match_percentage": match_pct,
        "readiness_tier": tier,
        "cohort_percentile": cohort_percentile,
        "detected_skills_count": len(detected_skills),
        "strong_areas": strong_areas[:6],
        "areas_to_work_on": deficits[:6],
        "summary": (
            f"Your syllabus covers {len(covered_required)} of {len(required_skills)} core technical competencies "
            f"for {role_data['title']}. You are currently short on {len(missing_required)} key commercial skills."
        ),
        "recommended_bridge_scenario": role_data["primary_scenario"],
        "recommended_role_key": role_key
    }
