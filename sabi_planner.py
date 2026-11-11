#!/usr/bin/env python3
"""Sabi Planner: constraint-optimised learning path under ₦, MB and time budgets.

Maximises demand-weighted skill gain for a student, subject to:
  - weekly study hours
  - weekly mobile data (MB)
  - device and offline constraints
  - prerequisite ordering (skill DAG)
  - at most K new skills per week
  - one Arena scenario every two weeks

Uses PuLP (COIN-OR CBC) for integer linear programming.

Usage:
    python sabi_planner.py                          # default demo
    python sabi_planner.py --hours 8 --mb 300       # custom constraints
    python sabi_planner.py --hours 8 --mb 300 --replan-mb 150  # show replan

Design note: gain estimates are priors that update with Arena results. Say so openly.
"""
import argparse
import json
import os
import sys
from dataclasses import dataclass, field, asdict
from typing import Optional

import pulp
from pulp import COIN_CMD, LpMaximize, LpProblem, LpStatus, lpSum, value


def _cbc_solver():
    """Prefer the compact HiGHS runtime, with CBC as a compatibility fallback."""
    highs_solver = getattr(pulp, "HiGHS", None)
    if highs_solver is not None:
        try:
            solver = highs_solver(msg=False, timeLimit=30)
            if solver.available():
                return solver
        except Exception:
            pass
    legacy_solver = getattr(pulp, "PULP_CBC_CMD", None)
    bundled_path = getattr(legacy_solver, "pulp_cbc_path", None)
    path = bundled_path if bundled_path and os.path.isfile(bundled_path) else None
    return COIN_CMD(path=path, msg=0, timeLimit=30)

# ---------------------------------------------------------------------------
# Skills taxonomy (starter: ~30 skills for Junior Data Analyst)
# ---------------------------------------------------------------------------

SKILLS = {
    # Technical — data
    "EXCEL_BASIC":       {"name": "Excel fundamentals",          "category": "Technical", "prereqs": []},
    "EXCEL_FORMULAS":    {"name": "Excel formulas & functions",  "category": "Technical", "prereqs": ["EXCEL_BASIC"]},
    "EXCEL_PIVOT":       {"name": "Pivot tables & charts",       "category": "Technical", "prereqs": ["EXCEL_FORMULAS"]},
    "EXCEL_MODELLING":   {"name": "Financial modelling in Excel","category": "Technical", "prereqs": ["EXCEL_FORMULAS"]},
    "DATA_CLEANING":     {"name": "Data cleaning & wrangling",   "category": "Technical", "prereqs": ["EXCEL_BASIC"]},
    "SQL_BASIC":         {"name": "SQL fundamentals",            "category": "Technical", "prereqs": []},
    "SQL_JOINS":         {"name": "SQL joins & subqueries",      "category": "Technical", "prereqs": ["SQL_BASIC"]},
    "SQL_AGGREGATION":   {"name": "SQL aggregation & window fn", "category": "Technical", "prereqs": ["SQL_JOINS"]},
    "PYTHON_BASIC":      {"name": "Python fundamentals",         "category": "Technical", "prereqs": []},
    "PANDAS_BASIC":      {"name": "Pandas for data analysis",    "category": "Technical", "prereqs": ["PYTHON_BASIC"]},
    "VIZ_BASIC":         {"name": "Data visualisation basics",   "category": "Technical", "prereqs": ["EXCEL_BASIC"]},
    "STATS_DESCRIPTIVE": {"name": "Descriptive statistics",      "category": "Technical", "prereqs": []},
    "STATS_INFERENCE":   {"name": "Inferential statistics",      "category": "Technical", "prereqs": ["STATS_DESCRIPTIVE"]},
    # Analytical
    "PROBLEM_FRAMING":   {"name": "Problem framing & scoping",   "category": "Analytical", "prereqs": []},
    "ASSUMPTION_MGMT":   {"name": "Assumption management",       "category": "Analytical", "prereqs": ["PROBLEM_FRAMING"]},
    "ERROR_DETECTION":   {"name": "Error detection in data",     "category": "Analytical", "prereqs": ["DATA_CLEANING"]},
    "CAUSAL_REASONING":  {"name": "Causal vs correlational",     "category": "Analytical", "prereqs": ["STATS_DESCRIPTIVE"]},
    "AI_VERIFICATION":   {"name": "AI output verification",      "category": "Analytical", "prereqs": []},
    # Communication & soft
    "STAKEHOLDER_COMM":  {"name": "Stakeholder communication",   "category": "Communication", "prereqs": []},
    "REPORT_WRITING":    {"name": "Report & memo writing",       "category": "Communication", "prereqs": ["STAKEHOLDER_COMM"]},
    "PRESENTATION":      {"name": "Presenting findings",         "category": "Communication", "prereqs": ["VIZ_BASIC", "STAKEHOLDER_COMM"]},
    "TIME_MANAGEMENT":   {"name": "Time & priority management",  "category": "Soft", "prereqs": []},
    "TEAMWORK":          {"name": "Teamwork & collaboration",    "category": "Soft", "prereqs": []},
    "ADAPTABILITY":      {"name": "Adaptability under pressure", "category": "Soft", "prereqs": []},
}

# ---------------------------------------------------------------------------
# Role demand weights (from Radar — starter priors for Junior Data Analyst)
# ---------------------------------------------------------------------------

ROLE_WEIGHTS = {
    "junior_data_analyst": {
        "EXCEL_BASIC": 0.6, "EXCEL_FORMULAS": 0.9, "EXCEL_PIVOT": 0.8, "EXCEL_MODELLING": 0.5,
        "DATA_CLEANING": 1.0, "SQL_BASIC": 0.7, "SQL_JOINS": 0.8, "SQL_AGGREGATION": 0.6,
        "PYTHON_BASIC": 0.4, "PANDAS_BASIC": 0.5, "VIZ_BASIC": 0.7,
        "STATS_DESCRIPTIVE": 0.6, "STATS_INFERENCE": 0.3,
        "PROBLEM_FRAMING": 0.8, "ASSUMPTION_MGMT": 0.7, "ERROR_DETECTION": 0.9,
        "CAUSAL_REASONING": 0.5, "AI_VERIFICATION": 0.8,
        "STAKEHOLDER_COMM": 0.9, "REPORT_WRITING": 0.6, "PRESENTATION": 0.5,
        "TIME_MANAGEMENT": 0.7, "TEAMWORK": 0.6, "ADAPTABILITY": 0.8,
    },
    "graduate_supply_chain_analyst": {
        "EXCEL_BASIC": 0.7, "EXCEL_FORMULAS": 1.0, "EXCEL_PIVOT": 0.9, "EXCEL_MODELLING": 0.9,
        "DATA_CLEANING": 0.9, "SQL_BASIC": 0.5, "SQL_JOINS": 0.4, "SQL_AGGREGATION": 0.3,
        "PYTHON_BASIC": 0.2, "PANDAS_BASIC": 0.3, "VIZ_BASIC": 0.6,
        "STATS_DESCRIPTIVE": 0.7, "STATS_INFERENCE": 0.4,
        "PROBLEM_FRAMING": 0.9, "ASSUMPTION_MGMT": 0.9, "ERROR_DETECTION": 1.0,
        "CAUSAL_REASONING": 0.6, "AI_VERIFICATION": 0.7,
        "STAKEHOLDER_COMM": 0.8, "REPORT_WRITING": 0.7, "PRESENTATION": 0.6,
        "TIME_MANAGEMENT": 0.8, "TEAMWORK": 0.7, "ADAPTABILITY": 0.9,
    },
    "operations_associate": {
        "EXCEL_BASIC": 0.8, "EXCEL_FORMULAS": 0.9, "EXCEL_PIVOT": 0.9, "EXCEL_MODELLING": 0.7,
        "DATA_CLEANING": 0.8, "SQL_BASIC": 0.5, "SQL_JOINS": 0.5, "SQL_AGGREGATION": 0.4,
        "PYTHON_BASIC": 0.2, "PANDAS_BASIC": 0.2, "VIZ_BASIC": 0.7,
        "STATS_DESCRIPTIVE": 0.6, "STATS_INFERENCE": 0.3,
        "PROBLEM_FRAMING": 0.9, "ASSUMPTION_MGMT": 0.8, "ERROR_DETECTION": 0.9,
        "CAUSAL_REASONING": 0.5, "AI_VERIFICATION": 0.6,
        "STAKEHOLDER_COMM": 1.0, "REPORT_WRITING": 0.8, "PRESENTATION": 0.7,
        "TIME_MANAGEMENT": 0.9, "TEAMWORK": 0.9, "ADAPTABILITY": 1.0,
    },
    "financial_modelling_intern": {
        "EXCEL_BASIC": 0.7, "EXCEL_FORMULAS": 1.0, "EXCEL_PIVOT": 0.8, "EXCEL_MODELLING": 1.0,
        "DATA_CLEANING": 0.8, "SQL_BASIC": 0.4, "SQL_JOINS": 0.4, "SQL_AGGREGATION": 0.3,
        "PYTHON_BASIC": 0.3, "PANDAS_BASIC": 0.4, "VIZ_BASIC": 0.7,
        "STATS_DESCRIPTIVE": 0.8, "STATS_INFERENCE": 0.6,
        "PROBLEM_FRAMING": 0.9, "ASSUMPTION_MGMT": 1.0, "ERROR_DETECTION": 1.0,
        "CAUSAL_REASONING": 0.7, "AI_VERIFICATION": 0.8,
        "STAKEHOLDER_COMM": 0.8, "REPORT_WRITING": 0.8, "PRESENTATION": 0.6,
        "TIME_MANAGEMENT": 0.8, "TEAMWORK": 0.6, "ADAPTABILITY": 0.8,
    },
}

# ---------------------------------------------------------------------------
# Resource library (curated for MVP: 30–60 items)
# ---------------------------------------------------------------------------

@dataclass
class Resource:
    id: str
    title: str
    skills: list[str]           # skill IDs this resource teaches
    level: str                  # "beginner" | "intermediate" | "advanced"
    hours: float                # estimated study hours
    mb: float                   # data cost in MB
    offline: bool               # can be used offline?
    cost_ngn: float             # ₦ cost (0 = free)
    gain: float = 0.3           # estimated skill gain (prior, updated with Arena)
    url: str = ""

RESOURCE_LIBRARY = [
    Resource("R01", "Excel Basics: Navigating & Formatting", ["EXCEL_BASIC"], "beginner", 2.0, 15, True, 0),
    Resource("R02", "Excel Formulas Crash Course", ["EXCEL_FORMULAS"], "beginner", 3.0, 25, True, 0),
    Resource("R03", "Pivot Tables Masterclass", ["EXCEL_PIVOT"], "intermediate", 2.5, 20, True, 0),
    Resource("R04", "Financial Modelling Fundamentals", ["EXCEL_MODELLING"], "intermediate", 4.0, 30, False, 0),
    Resource("R05", "Data Cleaning with Excel", ["DATA_CLEANING", "EXCEL_FORMULAS"], "beginner", 3.0, 20, True, 0),
    Resource("R06", "SQL for Beginners", ["SQL_BASIC"], "beginner", 3.0, 25, False, 0),
    Resource("R07", "SQL Joins Explained", ["SQL_JOINS"], "intermediate", 2.0, 15, False, 0),
    Resource("R08", "Advanced SQL: Window Functions", ["SQL_AGGREGATION"], "advanced", 3.0, 20, False, 0),
    Resource("R09", "Python for Everybody (Ch 1–5)", ["PYTHON_BASIC"], "beginner", 5.0, 40, True, 0),
    Resource("R10", "Pandas in 3 Hours", ["PANDAS_BASIC"], "intermediate", 3.0, 30, False, 0),
    Resource("R11", "Chart Design Principles", ["VIZ_BASIC"], "beginner", 1.5, 10, True, 0),
    Resource("R12", "Descriptive Stats with Excel", ["STATS_DESCRIPTIVE", "EXCEL_FORMULAS"], "beginner", 2.0, 15, True, 0),
    Resource("R13", "Hypothesis Testing Intro", ["STATS_INFERENCE"], "intermediate", 3.0, 25, False, 0),
    Resource("R14", "Problem Framing Workshop", ["PROBLEM_FRAMING"], "beginner", 1.5, 8, True, 0),
    Resource("R15", "Managing Assumptions in Analysis", ["ASSUMPTION_MGMT"], "intermediate", 1.0, 5, True, 0),
    Resource("R16", "Finding Errors in Datasets", ["ERROR_DETECTION", "DATA_CLEANING"], "intermediate", 2.5, 18, True, 0),
    Resource("R17", "Correlation ≠ Causation", ["CAUSAL_REASONING"], "beginner", 1.0, 8, True, 0),
    Resource("R18", "Verifying AI-Generated Analysis", ["AI_VERIFICATION"], "beginner", 1.5, 10, True, 0),
    Resource("R19", "Communicating with Non-Technical Stakeholders", ["STAKEHOLDER_COMM"], "beginner", 1.5, 10, True, 0),
    Resource("R20", "Writing a One-Page Memo", ["REPORT_WRITING"], "beginner", 1.0, 5, True, 0),
    Resource("R21", "Presenting Data to Decision Makers", ["PRESENTATION", "VIZ_BASIC"], "intermediate", 2.0, 15, False, 0),
    Resource("R22", "Time Management for Students", ["TIME_MANAGEMENT"], "beginner", 1.0, 5, True, 0),
    Resource("R23", "Teamwork in Remote Projects", ["TEAMWORK"], "beginner", 1.0, 8, True, 0),
    Resource("R24", "Adapting Under Pressure (Case Studies)", ["ADAPTABILITY"], "beginner", 1.5, 10, True, 0),
    Resource("R25", "Excel Data Validation & Conditional Formatting", ["EXCEL_FORMULAS", "DATA_CLEANING"], "intermediate", 2.0, 15, True, 0),
    Resource("R26", "Building Dashboards in Excel", ["VIZ_BASIC", "EXCEL_PIVOT"], "intermediate", 3.0, 22, True, 0),
    Resource("R27", "SQL Practice: 50 Exercises", ["SQL_BASIC", "SQL_JOINS"], "beginner", 4.0, 12, True, 0),
    Resource("R28", "Python Data Structures", ["PYTHON_BASIC"], "beginner", 2.5, 20, True, 0),
    Resource("R29", "Arena: Day One Landed Cost (practice)", ["EXCEL_MODELLING", "ERROR_DETECTION", "ASSUMPTION_MGMT", "AI_VERIFICATION"], "intermediate", 2.0, 2, True, 0),
    Resource("R30", "Arena: Month-End Sales (chat)", ["DATA_CLEANING", "ERROR_DETECTION", "STAKEHOLDER_COMM", "AI_VERIFICATION"], "intermediate", 1.5, 3, True, 0),
]


# ---------------------------------------------------------------------------
# Student profile
# ---------------------------------------------------------------------------

@dataclass
class StudentProfile:
    target_role: str = "junior_data_analyst"
    weekly_hours: float = 10.0
    weekly_mb: float = 500.0
    device: str = "android_phone"          # "android_phone" | "laptop" | "both"
    offline_only: bool = False
    deadline_weeks: int = 6
    language: str = "en"
    max_new_skills_per_week: int = 3
    arena_interval_weeks: int = 2           # one Arena scenario every N weeks
    # Baseline skill levels (0.0 = no knowledge, 1.0 = fully competent)
    baseline: dict = field(default_factory=dict)


# ---------------------------------------------------------------------------
# Planner (ILP with PuLP)
# ---------------------------------------------------------------------------

@dataclass
class PlanSlot:
    week: int
    resource: Resource
    skills_advanced: list[str]

@dataclass
class Plan:
    slots: list[PlanSlot]
    total_hours: float
    total_mb: float
    total_cost_ngn: float
    skill_gains: dict          # skill_id -> estimated post-plan level
    demand_weighted_gain: float
    weeks: int
    weekly_breakdown: list[dict]


def solve(profile: StudentProfile) -> Plan:
    """Solve the optimal learning plan for a student profile.

    Returns a Plan with the schedule and projected gains.
    """
    role = profile.target_role
    weights = ROLE_WEIGHTS.get(role, {})
    W = profile.deadline_weeks
    # Keep each roadmap focused on skills that matter to the selected role.
    # Previously every role assigned non-zero demand to almost every skill,
    # so a generous time budget selected the whole library and role changes
    # only shuffled the same resources between weeks.
    role_relevance_threshold = 0.7
    resources = [
        r for r in RESOURCE_LIBRARY
        if any(weights.get(skill, 0) >= role_relevance_threshold for skill in r.skills)
    ]

    # Filter by device/offline constraints
    if profile.offline_only:
        resources = [r for r in resources if r.offline]

    prob = LpProblem("sabi_planner", LpMaximize)
    constraint_specs = []
    arena_constraint_names = set()

    def add_constraint(constraint, name):
        prob.addConstraint(constraint, name)
        constraint_specs.append((constraint, name))

    # Decision variables: x[r,w] = 1 if resource r is assigned to week w
    x = {}
    for r in resources:
        for w in range(1, W + 1):
            x[r.id, w] = prob.add_variable(f"x_{r.id}_w{w}", cat="Binary")

    # Each resource is used at most once
    for r in resources:
        add_constraint(lpSum(x[r.id, w] for w in range(1, W + 1)) <= 1, f"once_{r.id}")

    # Weekly hours constraint
    for w in range(1, W + 1):
        add_constraint(
            lpSum(r.hours * x[r.id, w] for r in resources) <= profile.weekly_hours,
            f"hours_w{w}",
        )

    # Weekly MB constraint
    for w in range(1, W + 1):
        add_constraint(
            lpSum(r.mb * x[r.id, w] for r in resources) <= profile.weekly_mb,
            f"mb_w{w}",
        )

    # Max new skills per week (approximate: count resources as proxy)
    for w in range(1, W + 1):
        add_constraint(
            lpSum(x[r.id, w] for r in resources) <= profile.max_new_skills_per_week + 2,
            f"new_skills_w{w}",
        )

    # Prerequisite ordering: resource teaching skill S can only be scheduled
    # in week w if ALL prerequisites of S have a resource scheduled in week < w
    # (or the student already has that skill at baseline)
    skill_to_resources = {}
    for r in resources:
        for s in r.skills:
            skill_to_resources.setdefault(s, []).append(r)

    for r in resources:
        for s in r.skills:
            prereqs = SKILLS.get(s, {}).get("prereqs", [])
            for p in prereqs:
                if profile.baseline.get(p, 0) >= 0.5:
                    continue  # student already has this prereq
                p_resources = skill_to_resources.get(p, [])
                if not p_resources:
                    continue
                for w in range(1, W + 1):
                    # If r is in week w, at least one p_resource must be in a week < w
                    add_constraint(
                        x[r.id, w] <= lpSum(
                            x[pr.id, pw] for pr in p_resources for pw in range(1, w)
                        ) + (1 if profile.baseline.get(p, 0) >= 0.5 else 0),
                        f"prereq_{r.id}_{s}_{p}_w{w}",
                    )

    # Arena scenario cadence: at least one arena resource every arena_interval weeks
    arena_resources = [r for r in resources if r.id.startswith("R29") or r.id.startswith("R30")]
    if arena_resources and W >= profile.arena_interval_weeks:
        for block_start in range(1, W + 1, profile.arena_interval_weeks):
            block_end = min(block_start + profile.arena_interval_weeks - 1, W)
            name = f"arena_block_{block_start}"
            add_constraint(
                lpSum(x[r.id, w] for r in arena_resources for w in range(block_start, block_end + 1)) >= 1,
                name,
            )
            arena_constraint_names.add(name)

    # Objective: maximise demand-weighted skill gain
    # Gain for a skill = sum of gains from all assigned resources × demand weight
    objective = lpSum(
        weights.get(s, 0) * r.gain * x[r.id, w]
        for r in resources
        for s in r.skills
        for w in range(1, W + 1)
    )
    prob += objective, "total_demand_weighted_gain"

    # Solve
    solver = _cbc_solver()
    prob.solve(solver)

    if LpStatus[prob.status] != "Optimal":
        # Try relaxed: drop arena constraint
        relaxed_prob = LpProblem("sabi_planner_relaxed", LpMaximize)
        for constraint, name in constraint_specs:
            if name not in arena_constraint_names:
                relaxed_prob += (constraint, name)
        relaxed_prob += objective, "total_demand_weighted_gain"
        relaxed_prob.solve(solver)
        prob = relaxed_prob

    # Extract solution
    slots = []
    for w in range(1, W + 1):
        for r in resources:
            if value(x[r.id, w]) and value(x[r.id, w]) > 0.5:
                skills_advanced = [s for s in r.skills if weights.get(s, 0) > 0]
                slots.append(PlanSlot(week=w, resource=r, skills_advanced=skills_advanced))

    # Compute projected gains
    skill_gains = dict(profile.baseline)
    for slot in slots:
        for s in slot.resource.skills:
            current = skill_gains.get(s, 0)
            skill_gains[s] = min(1.0, current + slot.resource.gain)

    total_hours = sum(s.resource.hours for s in slots)
    total_mb = sum(s.resource.mb for s in slots)
    total_cost = sum(s.resource.cost_ngn for s in slots)
    dwg = sum(weights.get(s, 0) * skill_gains.get(s, 0) for s in SKILLS)

    # Weekly breakdown
    weekly = []
    for w in range(1, W + 1):
        week_slots = [s for s in slots if s.week == w]
        weekly.append({
            "week": w,
            "resources": [{"id": s.resource.id, "title": s.resource.title, "hours": s.resource.hours,
                           "mb": s.resource.mb, "offline": s.resource.offline} for s in week_slots],
            "total_hours": sum(s.resource.hours for s in week_slots),
            "total_mb": sum(s.resource.mb for s in week_slots),
        })

    return Plan(
        slots=slots, total_hours=total_hours, total_mb=total_mb,
        total_cost_ngn=total_cost, skill_gains=skill_gains,
        demand_weighted_gain=dwg, weeks=W, weekly_breakdown=weekly,
    )


# ---------------------------------------------------------------------------
# Display helpers
# ---------------------------------------------------------------------------

def format_plan(plan: Plan, profile: StudentProfile) -> str:
    """Human-readable plan summary."""
    lines = [
        f"═══ Sabi Learning Plan: {profile.target_role.replace('_', ' ').title()} ═══",
        f"Duration: {plan.weeks} weeks | Budget: {profile.weekly_hours}h/week, {profile.weekly_mb} MB/week",
        f"Total: {plan.total_hours:.1f}h study, {plan.total_mb:.0f} MB data, ₦{plan.total_cost_ngn:,.0f}",
        f"Demand-weighted skill gain: {plan.demand_weighted_gain:.2f}",
        "",
    ]
    for wb in plan.weekly_breakdown:
        w = wb["week"]
        lines.append(f"── Week {w} ({wb['total_hours']:.1f}h, {wb['total_mb']:.0f} MB) ──")
        if not wb["resources"]:
            lines.append("   (no resources scheduled)")
        for r in wb["resources"]:
            lines.append(f"   [{r['id']}] {r['title']}  ({r['hours']}h, {r['mb']} MB)")
        lines.append("")

    lines.append("── Projected Skill Levels ──")
    weights = ROLE_WEIGHTS.get(profile.target_role, {})
    for sid in sorted(plan.skill_gains, key=lambda s: -weights.get(s, 0)):
        g = plan.skill_gains[sid]
        w = weights.get(sid, 0)
        bar = "█" * int(g * 10) + "░" * (10 - int(g * 10))
        name = SKILLS.get(sid, {}).get("name", sid)
        lines.append(f"   {name:40s} {bar} {g:.0%}  (demand: {w:.1f})")

    # Signature metric
    gap_skills = [s for s in SKILLS if plan.skill_gains.get(s, 0) < 0.5 and weights.get(s, 0) > 0.5]
    if gap_skills:
        lines.append("")
        lines.append(f"── Remaining Gaps ({len(gap_skills)} skills below 50%) ──")
        for s in sorted(gap_skills, key=lambda s: -weights.get(s, 0)):
            name = SKILLS.get(s, {}).get("name", s)
            lines.append(f"   {name}: {plan.skill_gains.get(s, 0):.0%}")

    lines.append("")
    lines.append("Note: gain estimates are priors that update with Arena results.")
    return "\n".join(lines)


def compare_plans(plan_a: Plan, plan_b: Plan, label_a: str = "Original", label_b: str = "Replanned") -> str:
    """Side-by-side comparison of two plans."""
    lines = [f"═══ Plan Comparison: {label_a} vs {label_b} ═══", ""]

    lines.append(f"{'Metric':<35s} {label_a:>12s} {label_b:>12s} {'Change':>12s}")
    lines.append("─" * 75)
    metrics = [
        ("Total hours", plan_a.total_hours, plan_b.total_hours, "h"),
        ("Total MB", plan_a.total_mb, plan_b.total_mb, " MB"),
        ("Resources scheduled", len(plan_a.slots), len(plan_b.slots), ""),
        ("Demand-weighted gain", plan_a.demand_weighted_gain, plan_b.demand_weighted_gain, ""),
    ]
    for name, va, vb, unit in metrics:
        delta = vb - va
        sign = "+" if delta > 0 else ""
        lines.append(f"  {name:<33s} {va:>10.1f}{unit} {vb:>10.1f}{unit} {sign}{delta:>9.1f}{unit}")

    # Skill-level changes
    all_skills = set(plan_a.skill_gains) | set(plan_b.skill_gains)
    changed = [(s, plan_a.skill_gains.get(s, 0), plan_b.skill_gains.get(s, 0))
               for s in all_skills if abs(plan_a.skill_gains.get(s, 0) - plan_b.skill_gains.get(s, 0)) > 0.01]
    if changed:
        lines.append("")
        lines.append("Skills that changed:")
        for s, ga, gb in sorted(changed, key=lambda t: t[2] - t[1]):
            name = SKILLS.get(s, {}).get("name", s)
            delta = gb - ga
            sign = "+" if delta > 0 else ""
            lines.append(f"  {name:40s}  {ga:.0%} → {gb:.0%}  ({sign}{delta:.0%})")

    return "\n".join(lines)


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--role", default="junior_data_analyst")
    ap.add_argument("--hours", type=float, default=10.0, help="Weekly study hours")
    ap.add_argument("--mb", type=float, default=500.0, help="Weekly data budget (MB)")
    ap.add_argument("--weeks", type=int, default=6, help="Deadline in weeks")
    ap.add_argument("--offline", action="store_true", help="Offline-only resources")
    ap.add_argument("--replan-hours", type=float, help="Replan with new weekly hours")
    ap.add_argument("--replan-mb", type=float, help="Replan with new weekly MB")
    ap.add_argument("--json", dest="json_out", help="Write plan JSON to file")
    a = ap.parse_args()

    profile = StudentProfile(
        target_role=a.role,
        weekly_hours=a.hours,
        weekly_mb=a.mb,
        deadline_weeks=a.weeks,
        offline_only=a.offline,
    )

    print(f"Solving plan for {profile.target_role} ({profile.weekly_hours}h/wk, {profile.weekly_mb} MB/wk, "
          f"{profile.deadline_weeks} weeks)...\n")
    plan = solve(profile)
    print(format_plan(plan, profile))

    # Replan demo
    if a.replan_hours or a.replan_mb:
        profile2 = StudentProfile(
            target_role=profile.target_role,
            weekly_hours=a.replan_hours or profile.weekly_hours,
            weekly_mb=a.replan_mb or profile.weekly_mb,
            deadline_weeks=profile.deadline_weeks,
            offline_only=profile.offline_only,
        )
        print(f"\n{'═' * 75}")
        print(f"Replanning with {profile2.weekly_hours}h/wk, {profile2.weekly_mb} MB/wk...\n")
        plan2 = solve(profile2)
        print(format_plan(plan2, profile2))
        print()
        print(compare_plans(plan, plan2, "Original", "Constrained"))

    if a.json_out:
        out = {
            "profile": asdict(profile),
            "plan": {
                "total_hours": plan.total_hours,
                "total_mb": plan.total_mb,
                "total_cost_ngn": plan.total_cost_ngn,
                "demand_weighted_gain": plan.demand_weighted_gain,
                "weeks": plan.weeks,
                "weekly_breakdown": plan.weekly_breakdown,
                "skill_gains": plan.skill_gains,
            },
        }
        with open(a.json_out, "w", encoding="utf-8") as fh:
            json.dump(out, fh, indent=2, ensure_ascii=False)
        print(f"\nPlan written to {a.json_out}")


if __name__ == "__main__":
    main()

