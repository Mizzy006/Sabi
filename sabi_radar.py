#!/usr/bin/env python3
"""Sabi Radar: employer demand vs curriculum mapping for entry-level roles.

Builds a skills taxonomy, maps job postings and course outlines to skill IDs,
and outputs a curriculum-to-demand gap heatmap and cohort funnel.

Usage:
    python sabi_radar.py                      # generate sample data + heatmap
    python sabi_radar.py --json radar.json    # export gap analysis as JSON

Design note: extraction accuracy should be hand-verified on 50 postings.
LLM-assisted mapping uses closed label sets (skill IDs) at temperature 0.
"""
import argparse
import json
import os
import random
from collections import defaultdict
from dataclasses import dataclass, field, asdict
from datetime import date, timedelta
from typing import Optional

# ---------------------------------------------------------------------------
# Skills taxonomy (shared with sabi_planner.py — import from there in prod)
# ---------------------------------------------------------------------------

SKILLS_TAXONOMY = {
    # Technical — data
    "EXCEL_BASIC":       {"name": "Excel fundamentals",          "category": "Technical",     "subcategory": "Spreadsheets"},
    "EXCEL_FORMULAS":    {"name": "Excel formulas & functions",  "category": "Technical",     "subcategory": "Spreadsheets"},
    "EXCEL_PIVOT":       {"name": "Pivot tables & charts",       "category": "Technical",     "subcategory": "Spreadsheets"},
    "EXCEL_MODELLING":   {"name": "Financial modelling in Excel","category": "Technical",     "subcategory": "Spreadsheets"},
    "DATA_CLEANING":     {"name": "Data cleaning & wrangling",   "category": "Technical",     "subcategory": "Data"},
    "SQL_BASIC":         {"name": "SQL fundamentals",            "category": "Technical",     "subcategory": "Databases"},
    "SQL_JOINS":         {"name": "SQL joins & subqueries",      "category": "Technical",     "subcategory": "Databases"},
    "SQL_AGGREGATION":   {"name": "SQL aggregation & window fn", "category": "Technical",     "subcategory": "Databases"},
    "PYTHON_BASIC":      {"name": "Python fundamentals",         "category": "Technical",     "subcategory": "Programming"},
    "PANDAS_BASIC":      {"name": "Pandas for data analysis",    "category": "Technical",     "subcategory": "Programming"},
    "VIZ_BASIC":         {"name": "Data visualisation basics",   "category": "Technical",     "subcategory": "Visualisation"},
    "STATS_DESCRIPTIVE": {"name": "Descriptive statistics",      "category": "Technical",     "subcategory": "Statistics"},
    "STATS_INFERENCE":   {"name": "Inferential statistics",      "category": "Technical",     "subcategory": "Statistics"},
    "POWERBI":           {"name": "Power BI / Tableau basics",   "category": "Technical",     "subcategory": "Visualisation"},
    "GOOGLE_SHEETS":     {"name": "Google Sheets / Apps Script", "category": "Technical",     "subcategory": "Spreadsheets"},
    # Analytical
    "PROBLEM_FRAMING":   {"name": "Problem framing & scoping",   "category": "Analytical",    "subcategory": "Thinking"},
    "ASSUMPTION_MGMT":   {"name": "Assumption management",       "category": "Analytical",    "subcategory": "Thinking"},
    "ERROR_DETECTION":   {"name": "Error detection in data",     "category": "Analytical",    "subcategory": "Quality"},
    "CAUSAL_REASONING":  {"name": "Causal vs correlational",     "category": "Analytical",    "subcategory": "Thinking"},
    "AI_VERIFICATION":   {"name": "AI output verification",      "category": "Analytical",    "subcategory": "Quality"},
    "CRITICAL_THINKING": {"name": "Critical thinking",           "category": "Analytical",    "subcategory": "Thinking"},
    # Communication & soft
    "STAKEHOLDER_COMM":  {"name": "Stakeholder communication",   "category": "Communication", "subcategory": "Verbal"},
    "REPORT_WRITING":    {"name": "Report & memo writing",       "category": "Communication", "subcategory": "Written"},
    "PRESENTATION":      {"name": "Presenting findings",         "category": "Communication", "subcategory": "Verbal"},
    "TIME_MANAGEMENT":   {"name": "Time & priority management",  "category": "Soft",          "subcategory": "Self-management"},
    "TEAMWORK":          {"name": "Teamwork & collaboration",    "category": "Soft",          "subcategory": "Interpersonal"},
    "ADAPTABILITY":      {"name": "Adaptability under pressure", "category": "Soft",          "subcategory": "Self-management"},
    "ATTENTION_DETAIL":  {"name": "Attention to detail",         "category": "Soft",          "subcategory": "Self-management"},
    "INITIATIVE":        {"name": "Initiative & self-direction",  "category": "Soft",          "subcategory": "Self-management"},
}


# ---------------------------------------------------------------------------
# Sample job posting data (illustrative — real version scrapes permitted sources)
# ---------------------------------------------------------------------------

@dataclass
class JobPosting:
    id: str
    title: str
    company: str
    location: str
    date: str
    url: str
    skills_required: list[str]    # mapped to taxonomy skill IDs
    skills_preferred: list[str]
    experience_years: int = 0


def generate_sample_postings(n=50, seed=42) -> list[JobPosting]:
    """Generate illustrative entry-level data analyst postings for Lagos/Abuja."""
    rnd = random.Random(seed)
    companies = [
        "Kuda Bank", "Paystack", "Flutterwave", "Andela", "Access Bank",
        "MTN Nigeria", "Dangote Industries", "Sterling Bank", "Interswitch",
        "PwC Nigeria", "Deloitte Nigeria", "KPMG Nigeria", "GT Bank",
        "Korapay", "Carbon", "Piggyvest", "Cowrywise", "Patricia",
        "Zenith Bank", "First Bank of Nigeria",
    ]
    titles = [
        "Junior Data Analyst", "Data Analyst Intern", "Graduate Data Analyst",
        "Entry-Level Business Analyst", "BI Analyst (Entry Level)",
        "Financial Analyst (Graduate)", "Operations Analyst (Junior)",
        "Research Analyst (Entry)", "Junior Reporting Analyst",
    ]
    locations = ["Lagos", "Abuja", "Lagos (Remote)", "Abuja (Hybrid)", "Lagos (Hybrid)"]

    # Skill frequency distributions (based on Nigerian market research insight)
    required_pools = [
        (["EXCEL_FORMULAS", "DATA_CLEANING", "STAKEHOLDER_COMM"], 0.85),
        (["SQL_BASIC"], 0.70),
        (["VIZ_BASIC"], 0.60),
        (["EXCEL_PIVOT"], 0.55),
        (["PYTHON_BASIC"], 0.40),
        (["ATTENTION_DETAIL"], 0.75),
        (["TEAMWORK"], 0.70),
        (["TIME_MANAGEMENT"], 0.65),
        (["REPORT_WRITING"], 0.55),
        (["ADAPTABILITY"], 0.60),
        (["PROBLEM_FRAMING"], 0.50),
        (["CRITICAL_THINKING"], 0.50),
        (["STATS_DESCRIPTIVE"], 0.40),
    ]
    preferred_pools = [
        (["POWERBI"], 0.45),
        (["SQL_JOINS", "SQL_AGGREGATION"], 0.35),
        (["PANDAS_BASIC"], 0.30),
        (["EXCEL_MODELLING"], 0.25),
        (["STATS_INFERENCE"], 0.20),
        (["GOOGLE_SHEETS"], 0.20),
        (["CAUSAL_REASONING"], 0.15),
        (["AI_VERIFICATION"], 0.10),
        (["INITIATIVE"], 0.40),
        (["PRESENTATION"], 0.35),
        (["ASSUMPTION_MGMT"], 0.15),
    ]

    postings = []
    base_date = date(2026, 8, 1)
    for i in range(n):
        req = []
        for skills, prob in required_pools:
            if rnd.random() < prob:
                req.extend(skills)
        pref = []
        for skills, prob in preferred_pools:
            if rnd.random() < prob:
                pref.extend(skills)
        postings.append(JobPosting(
            id=f"JP-{i+1:03d}",
            title=rnd.choice(titles),
            company=rnd.choice(companies),
            location=rnd.choice(locations),
            date=(base_date + timedelta(days=rnd.randint(0, 90))).isoformat(),
            url=f"https://example.com/jobs/{i+1}",
            skills_required=sorted(set(req)),
            skills_preferred=sorted(set(pref)),
        ))
    return postings


# ---------------------------------------------------------------------------
# Sample course outline data
# ---------------------------------------------------------------------------

@dataclass
class CourseOutline:
    code: str
    title: str
    department: str
    level: int           # 100, 200, 300, 400
    skills_taught: list[str]   # mapped to taxonomy skill IDs


SAMPLE_COURSES = [
    CourseOutline("ECO101", "Introduction to Economics", "Economics", 100,
                  ["STATS_DESCRIPTIVE", "CRITICAL_THINKING"]),
    CourseOutline("ECO201", "Quantitative Methods", "Economics", 200,
                  ["STATS_DESCRIPTIVE", "STATS_INFERENCE", "EXCEL_BASIC"]),
    CourseOutline("ECO301", "Econometrics I", "Economics", 300,
                  ["STATS_INFERENCE", "EXCEL_FORMULAS", "CAUSAL_REASONING"]),
    CourseOutline("ECO302", "Development Economics", "Economics", 300,
                  ["PROBLEM_FRAMING", "REPORT_WRITING", "CRITICAL_THINKING"]),
    CourseOutline("ECO401", "Research Project", "Economics", 400,
                  ["PROBLEM_FRAMING", "REPORT_WRITING", "PRESENTATION", "STATS_INFERENCE"]),
    CourseOutline("ACC101", "Principles of Accounting", "Accounting", 100,
                  ["EXCEL_BASIC", "ATTENTION_DETAIL"]),
    CourseOutline("ACC201", "Financial Accounting", "Accounting", 200,
                  ["EXCEL_FORMULAS", "ATTENTION_DETAIL", "REPORT_WRITING"]),
    CourseOutline("ACC301", "Management Accounting", "Accounting", 300,
                  ["EXCEL_FORMULAS", "EXCEL_MODELLING", "ASSUMPTION_MGMT"]),
    CourseOutline("ACC302", "Auditing", "Accounting", 300,
                  ["ERROR_DETECTION", "ATTENTION_DETAIL", "CRITICAL_THINKING"]),
    CourseOutline("CSC101", "Introduction to Programming", "Computer Science", 100,
                  ["PYTHON_BASIC"]),
    CourseOutline("CSC201", "Data Structures & Algorithms", "Computer Science", 200,
                  ["PYTHON_BASIC"]),
    CourseOutline("CSC301", "Database Systems", "Computer Science", 300,
                  ["SQL_BASIC", "SQL_JOINS", "SQL_AGGREGATION"]),
    CourseOutline("CSC302", "Software Engineering", "Computer Science", 300,
                  ["TEAMWORK", "TIME_MANAGEMENT", "PROBLEM_FRAMING"]),
    CourseOutline("BUS201", "Business Communication", "Business Admin", 200,
                  ["STAKEHOLDER_COMM", "REPORT_WRITING", "PRESENTATION"]),
    CourseOutline("BUS301", "Operations Management", "Business Admin", 300,
                  ["PROBLEM_FRAMING", "TIME_MANAGEMENT", "EXCEL_BASIC"]),
    CourseOutline("STA201", "Statistics for Business", "Statistics", 200,
                  ["STATS_DESCRIPTIVE", "STATS_INFERENCE", "EXCEL_FORMULAS"]),
    CourseOutline("STA301", "Applied Statistics", "Statistics", 300,
                  ["STATS_INFERENCE", "EXCEL_PIVOT", "VIZ_BASIC"]),
]


# ---------------------------------------------------------------------------
# Gap analysis
# ---------------------------------------------------------------------------

@dataclass
class SkillGap:
    skill_id: str
    skill_name: str
    category: str
    employer_demand: float        # fraction of postings requiring/preferring this
    required_demand: float        # fraction requiring (not just preferring)
    curriculum_coverage: float    # fraction of courses teaching this (within dept)
    gap_score: float              # demand - coverage (positive = gap)


def analyse_gaps(
    postings: list[JobPosting],
    courses: list[CourseOutline],
    department: Optional[str] = None,
) -> list[SkillGap]:
    """Compute the demand-coverage gap for each skill."""
    n = len(postings)
    if n == 0:
        return []

    # Employer demand
    req_count = defaultdict(int)
    pref_count = defaultdict(int)
    for p in postings:
        for s in p.skills_required:
            req_count[s] += 1
        for s in p.skills_preferred:
            pref_count[s] += 1

    # Curriculum coverage
    dept_courses = [c for c in courses if department is None or c.department == department]
    n_courses = max(len(dept_courses), 1)
    course_count = defaultdict(int)
    for c in dept_courses:
        for s in c.skills_taught:
            course_count[s] += 1

    gaps = []
    for sid, meta in SKILLS_TAXONOMY.items():
        req_d = req_count[sid] / n
        pref_d = pref_count[sid] / n
        total_d = min(1.0, req_d + 0.5 * pref_d)  # preferred counts half
        cov = min(1.0, course_count[sid] / n_courses)
        gaps.append(SkillGap(
            skill_id=sid,
            skill_name=meta["name"],
            category=meta["category"],
            employer_demand=round(total_d, 3),
            required_demand=round(req_d, 3),
            curriculum_coverage=round(cov, 3),
            gap_score=round(total_d - cov, 3),
        ))
    return sorted(gaps, key=lambda g: -g.gap_score)


# ---------------------------------------------------------------------------
# Cohort funnel
# ---------------------------------------------------------------------------

@dataclass
class CohortFunnel:
    department: str
    total_skills: int
    taught: int               # covered by at least one course
    practiced: int            # has an Arena/Day One scenario (placeholder)
    proven: int               # has a Tier C pathway (placeholder)
    taught_pct: float
    practiced_pct: float
    proven_pct: float


def compute_funnel(
    courses: list[CourseOutline],
    department: Optional[str] = None,
    practiced_skills: Optional[set] = None,
    proven_skills: Optional[set] = None,
) -> CohortFunnel:
    """Taught → Practiced → Proven funnel for a department."""
    dept_courses = [c for c in courses if department is None or c.department == department]
    taught_set = set()
    for c in dept_courses:
        taught_set.update(c.skills_taught)
    total = len(SKILLS_TAXONOMY)
    practiced = practiced_skills or set()
    proven = proven_skills or set()
    return CohortFunnel(
        department=department or "All",
        total_skills=total,
        taught=len(taught_set),
        practiced=len(practiced & taught_set),
        proven=len(proven & taught_set),
        taught_pct=round(len(taught_set) / total, 3),
        practiced_pct=round(len(practiced & taught_set) / total, 3) if practiced else 0.0,
        proven_pct=round(len(proven & taught_set) / total, 3) if proven else 0.0,
    )


# ---------------------------------------------------------------------------
# Display helpers
# ---------------------------------------------------------------------------

def format_heatmap(gaps: list[SkillGap], top_n: int = 30) -> str:
    """ASCII heatmap of demand vs coverage."""
    lines = ["═══ Sabi Radar: Employer Demand vs Curriculum Coverage ═══", ""]
    lines.append(f"{'Skill':<42s} {'Demand':>8s} {'Coverage':>9s} {'Gap':>6s}  {'Visual'}")
    lines.append("─" * 90)

    for g in gaps[:top_n]:
        d_bar = "█" * int(g.employer_demand * 20)
        c_bar = "░" * int(g.curriculum_coverage * 20)
        gap_indicator = "🔴" if g.gap_score > 0.3 else "🟡" if g.gap_score > 0.1 else "🟢"
        lines.append(
            f"  {g.skill_name:<40s} {g.employer_demand:>7.0%} {g.curriculum_coverage:>8.0%} "
            f"{g.gap_score:>+5.0%}  {gap_indicator} {d_bar}{c_bar}"
        )

    # Category summary
    lines.append("")
    lines.append("── Gap by Category ──")
    cats = defaultdict(list)
    for g in gaps:
        cats[g.category].append(g.gap_score)
    for cat in sorted(cats, key=lambda c: -sum(cats[c]) / len(cats[c])):
        avg = sum(cats[cat]) / len(cats[cat])
        lines.append(f"  {cat:<20s}  avg gap: {avg:>+.0%}")

    return "\n".join(lines)


def format_funnel(funnel: CohortFunnel) -> str:
    """ASCII funnel diagram."""
    lines = [f"── Cohort Funnel: {funnel.department} ──"]
    w = 50
    stages = [
        ("Taught", funnel.taught_pct),
        ("Practiced", funnel.practiced_pct),
        ("Proven", funnel.proven_pct),
    ]
    for label, pct in stages:
        bar_w = max(1, int(pct * w))
        padding = (w - bar_w) // 2
        lines.append(f"  {label:<12s} {pct:>5.0%}  {' ' * padding}{'█' * bar_w}")
    lines.append(f"  Total skills in taxonomy: {funnel.total_skills}")
    return "\n".join(lines)


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--department", default=None, help="Filter courses by department")
    ap.add_argument("--postings", type=int, default=50, help="Number of sample postings")
    ap.add_argument("--seed", type=int, default=42, help="Random seed for sample data")
    ap.add_argument("--json", dest="json_out", help="Export gap analysis as JSON")
    a = ap.parse_args()

    postings = generate_sample_postings(a.postings, a.seed)
    print(f"Generated {len(postings)} sample job postings.\n")

    departments = sorted(set(c.department for c in SAMPLE_COURSES))
    dept = a.department

    gaps = analyse_gaps(postings, SAMPLE_COURSES, department=dept)
    print(format_heatmap(gaps))

    # Funnel for each department
    # Placeholder practiced/proven sets (would come from pilot data)
    practiced = {"EXCEL_FORMULAS", "DATA_CLEANING", "ERROR_DETECTION", "STAKEHOLDER_COMM",
                 "AI_VERIFICATION", "ASSUMPTION_MGMT", "EXCEL_MODELLING"}
    proven = {"EXCEL_MODELLING", "ERROR_DETECTION"}

    print()
    if dept:
        funnel = compute_funnel(SAMPLE_COURSES, dept, practiced, proven)
        print(format_funnel(funnel))
    else:
        for d in departments:
            funnel = compute_funnel(SAMPLE_COURSES, d, practiced, proven)
            print(format_funnel(funnel))
            print()

    if a.json_out:
        out = {
            "taxonomy_size": len(SKILLS_TAXONOMY),
            "postings_count": len(postings),
            "department": dept,
            "gaps": [asdict(g) for g in gaps],
            "funnels": [asdict(compute_funnel(SAMPLE_COURSES, d, practiced, proven))
                        for d in (departments if not dept else [dept])],
        }
        with open(a.json_out, "w", encoding="utf-8") as fh:
            json.dump(out, fh, indent=2, ensure_ascii=False)
        print(f"\nRadar data written to {a.json_out}")


if __name__ == "__main__":
    main()

