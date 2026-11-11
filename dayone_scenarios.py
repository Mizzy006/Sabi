#!/usr/bin/env python3
"""Sabi Multi-Role Scenario Registry & Pack Generators.

Provides domain-specific Day One commercial scenario packs for 4 distinct roles:
  1. Graduate Supply-Chain Analyst: Apapa Port Landed-Cost Commercial Model
  2. Junior Data Analyst: E-Commerce Customer Retention & Unit Economics Model
  3. Operations Associate: Interstate Haulage Fleet Dispatch & Route Margins Model
  4. Financial Modelling Intern: Corporate Working Capital & 13-Week Cashflow Runway

Each scenario generates:
  - starter.xlsx: Student workbook (brief, inputs, messy raw data, fill-in calculation sheets)
  - reference.xlsx: Verified engine-side solution with live formulas
  - key.json: Expected outputs for base case and all 6 metamorphic shocks
"""
from __future__ import annotations

import json
import math
import os
import random
import sys
from typing import Any, Optional

from openpyxl import Workbook
from openpyxl.styles import Alignment, Font, PatternFill, Protection

from dayone_recalc import recalculate

# ---------------------------------------------------------------------------
# Metadata Registry for all 4 roles
# ---------------------------------------------------------------------------

SCENARIOS = {
    "graduate_supply_chain_analyst": {
        "id": "SC-APAPA-01",
        "role_id": "graduate_supply_chain_analyst",
        "role_title": "Graduate Supply-Chain Analyst",
        "name": "Apapa Port Landed-Cost Commercial Model",
        "category": "Supply Chain & Logistics Analytics",
        "timebox": "90 mins",
        "description": "A container of 4 SKU lines has docked at Apapa Port. You must construct a clean, dynamic spreadsheet model converting USD purchase prices into Nigerian Naira (₦), applying the revised ECOWAS Common External Tariff, port handling surcharges, and demurrage penalties. Your formula graph must react correctly when commercial variables change.",
        "shocks": [
            {"id": "S1_FX", "name": "FX Devaluation Shock", "change": "+25% NGN/USD exchange rate"},
            {"id": "S2_TARIFF", "name": "Customs Tariff Spike", "change": "+10% customs duty rate"},
            {"id": "S3_DEMURRAGE", "name": "Port Congestion Demurrage", "change": "+5 demurrage days at Apapa terminal"},
            {"id": "S4_FREIGHT", "name": "Ocean Freight Inflation", "change": "+30% shipping line surcharge"},
            {"id": "S5_DISCOUNT", "name": "Volume Discount Shock", "change": "-15% base supplier price"},
            {"id": "S6_MARGIN", "name": "Target Margin Shock", "change": "Retail shelf margin raised from 35% to 40%"},
        ],
        "defence": {
            "where": "Model!N6",
            "question": "Good day. I am Mrs. Bello, Senior Commercial Manager. Walk me through how cell N6 computes the landed cost per unit, and how it responds if the exchange rate rises.",
            "sample_answer": "Cell N6 computes the total landed cost per unit by taking the baseline CIF price in USD from C6, multiplying it by the exchange rate in C4 to convert to Naira, then adding the customs tariff, port surcharge, and the freight demurrage per unit. If the exchange rate increases by 25%, cell N6 automatically inflates because it references C4 dynamically."
        }
    },
    "junior_data_analyst": {
        "id": "DA-COHORT-01",
        "role_id": "junior_data_analyst",
        "role_title": "Junior Data Analyst",
        "name": "E-Commerce Customer Retention & Unit Economics Model",
        "category": "Product & Customer Analytics",
        "timebox": "90 mins",
        "description": "An online marketplace in Yaba, Lagos tracks customer acquisition, monthly recurring revenue (MRR), and cohort retention. You must build a dynamic model calculating Customer Lifetime Value (LTV), Customer Acquisition Cost (CAC) payback periods, and churn rates across 12 monthly cohorts. Your model must prove whether marketing spend is sustainable under churn stress.",
        "shocks": [
            {"id": "S1_CHURN", "name": "Churn Rate Spike", "change": "+50% monthly subscriber churn rate"},
            {"id": "S2_CAC", "name": "CAC Ad Inflation", "change": "+30% digital marketing acquisition cost"},
            {"id": "S3_ARPU", "name": "ARPU Promotional Discount", "change": "-15% average order revenue"},
            {"id": "S4_RETENTION", "name": "Retention Curve Drop", "change": "-10% month-over-month cohort retention"},
            {"id": "S5_FEES", "name": "Payment Gateway Fee Hike", "change": "+20% processing and transaction fees"},
            {"id": "S6_PAYBACK", "name": "Target Payback Constraint", "change": "CAC payback hurdle shortened to ≤ 5 months"},
        ],
        "defence": {
            "where": "Model!N6",
            "question": "Good day. I am Mrs. Bello. I see your unit economics model. Walk me through how cell N6 computes Customer Lifetime Value (LTV), and what happens to your payback period when monthly churn spikes.",
            "sample_answer": "Cell N6 computes Customer Lifetime Value by dividing average monthly revenue per user by the monthly churn rate, multiplied by the gross margin percentage in B8. When churn spikes from 6% to 9%, LTV in cell N6 drops proportionally because churn is in the denominator, which in turn extends the CAC payback period beyond our acceptable threshold."
        }
    },
    "operations_associate": {
        "id": "OP-FLEET-01",
        "role_id": "operations_associate",
        "role_title": "Operations Associate",
        "name": "Interstate Haulage Fleet Dispatch & Route Margins Model",
        "category": "Operations & Logistics Optimization",
        "timebox": "90 mins",
        "description": "A logistics company operates 12 heavy trucks across 4 major Nigerian commercial corridors (Lagos-Kano, Lagos-Onitsha, Lagos-Abuja, PH-Kano). You must build an operational dispatch model calculating diesel consumption, driver trip allowances, transit turnaround times, toll surcharges, and gross corridor contribution margins per ton-km.",
        "shocks": [
            {"id": "S1_DIESEL", "name": "Diesel Price Pump Hike", "change": "+40% diesel pump price increase"},
            {"id": "S2_DETOUR", "name": "Highway Detour Shock", "change": "+15% transit km due to expressway rehabilitation"},
            {"id": "S3_ALLOWANCE", "name": "Driver Allowance Inflation", "change": "+25% interstate trip allowance"},
            {"id": "S4_TARIFF", "name": "Client Freight Rate Cut", "change": "-10% contracted freight billing tariff"},
            {"id": "S5_MAINTENANCE", "name": "Preventative Overhaul Surcharge", "change": "+₦150k overhaul per 10,000 km"},
            {"id": "S6_HURDLE", "name": "Fleet Margin Hurdle", "change": "Corridor contribution margin threshold raised to 25%"},
        ],
        "defence": {
            "where": "Model!N6",
            "question": "Good day. I am Mrs. Bello, Operations Director. Walk me through how cell N6 computes the total operating cost per corridor trip, and how your route margins react when the pump price of diesel rises.",
            "sample_answer": "Cell N6 models the total trip operating cost by multiplying the corridor distance by the truck burn rate (0.38 L/km) and the current diesel pump price in B4, then adding driver trip allowance in B6 and transit road tolls in B7. When diesel price surges by 40%, fuel cost in cell N6 rises immediately, eroding the net route margin in column Q."
        }
    },
    "financial_modelling_intern": {
        "id": "FM-CASH-01",
        "role_id": "financial_modelling_intern",
        "role_title": "Financial Modelling Intern",
        "name": "Corporate Working Capital & 13-Week Cashflow Runway",
        "category": "Treasury & Liquidity Risk Management",
        "timebox": "90 mins",
        "description": "An Ikeja manufacturing firm needs a 13-week rolling cashflow runway model. You must project weekly collections from corporate debtors (Days Sales Outstanding DSO), scheduled supplier disbursements (Days Payables Outstanding DPO), payroll obligations, and bank overdraft interest to forecast liquidity bottlenecks.",
        "shocks": [
            {"id": "S1_DSO", "name": "Key Debtor Default Delay", "change": "DSO increases from 30 days to 60 days"},
            {"id": "S2_DPO", "name": "Supplier Upfront Term Shock", "change": "DPO shortened from 45 days to 15 days"},
            {"id": "S3_COGS", "name": "Raw Material Import Inflation", "change": "+25% NGN supplier price increase"},
            {"id": "S4_INTEREST", "name": "Overdraft MPR Rate Tightening", "change": "+400 bps Central Bank interest rate hike"},
            {"id": "S5_CAPEX", "name": "Emergency Plant Capex Outflow", "change": "₦25M critical generator overhaul"},
            {"id": "S6_BUFFER", "name": "Liquidity Buffer Invariance", "change": "Minimum cash buffer constraint raised to ₦15M"},
        ],
        "defence": {
            "where": "Model!N6",
            "question": "Good day. I am Mrs. Bello, Chief Financial Officer. Walk me through how cell N6 projects the net cash generation for the business line, and how our 13-week runway responds if major debtors delay payment by 30 days.",
            "sample_answer": "Cell N6 computes the net weekly cashflow by taking collections calculated from DSO in B5, subtracting supplier disbursements dictated by DPO in B6, and deducting weekly payroll and overheads in B8. If corporate debtors delay payment by 30 days, collections in N6 plummet, creating an immediate funding gap that triggers our overdraft facility."
        }
    }
}


def get_scenario(role: str) -> dict:
    """Return scenario metadata for a given role (defaults to supply chain analyst)."""
    return SCENARIOS.get(role, SCENARIOS["graduate_supply_chain_analyst"])


# ---------------------------------------------------------------------------
# Specific Pack Generation
# ---------------------------------------------------------------------------

def write_scenario_pack(role: str, seed: int, outdir: str) -> tuple[dict, dict]:
    """Generate scenario pack files (starter.xlsx, reference.xlsx, key.json) in outdir."""
    os.makedirs(outdir, exist_ok=True)

    # 1. Supply Chain Analyst delegates to dayone_generator
    if role == "graduate_supply_chain_analyst":
        from dayone_generator import write_pack
        return write_pack(seed, outdir)

    # 2. Other roles: build specialized scenario pack
    scenario = get_scenario(role)
    rnd = random.Random(seed * 2026 + 7)

    if role == "junior_data_analyst":
        pack_data = _build_data_analyst_pack(rnd, seed, scenario)
    elif role == "operations_associate":
        pack_data = _build_operations_pack(rnd, seed, scenario)
    elif role == "financial_modelling_intern":
        pack_data = _build_finance_pack(rnd, seed, scenario)
    else:
        from dayone_generator import write_pack
        return write_pack(seed, outdir)

    # Write key.json
    key_path = os.path.join(outdir, "key.json")
    with open(key_path, "w", encoding="utf-8") as f:
        json.dump(pack_data["key"], f, indent=2, ensure_ascii=False)

    # Write starter.xlsx
    starter_path = os.path.join(outdir, "starter.xlsx")
    _write_workbook(pack_data, starter_path, is_starter=True)

    # Write reference.xlsx
    ref_path = os.path.join(outdir, "reference.xlsx")
    _write_workbook(pack_data, ref_path, is_starter=False)

    # Recalculate reference workbook
    report = recalculate(ref_path)

    return pack_data, report


# ---------------------------------------------------------------------------
# Domain Pack Builders
# ---------------------------------------------------------------------------

def _build_data_analyst_pack(rnd: random.Random, seed: int, scenario: dict) -> dict:
    """Build E-Commerce Customer Retention & Unit Economics pack."""
    inp = {
        "FX_USD_NGN": round(rnd.uniform(1500, 1750), -1),
        "FX_CNY_PER_USD": 7.25,
        "FREIGHT_USD_PER_KG": round(rnd.uniform(2.5, 4.0), 2),
        "CLEARING_PCT": round(rnd.uniform(0.04, 0.08), 3),
        "HAULAGE_NGN_PER_UNIT": round(rnd.uniform(400, 800), -1),
        "TARGET_MARGIN": 0.35,
        "MIN_MARGIN_FLAG": 0.15,
        "BUDGET_CAP_NGN": 50000000,
    }
    categories = ["Electronics", "Fashion", "Groceries", "Beauty"]
    rates = {cat: round(rnd.uniform(0.10, 0.25), 3) for cat in categories}

    items = [
        ("COH-101", "Lagos New Users Cohort Q1", "Electronics", 24.0, 1.2),
        ("COH-102", "Abuja Organic Search Acquisition", "Fashion", 16.0, 0.8),
        ("COH-103", "Port Harcourt Instagram Paid Ads", "Groceries", 12.0, 2.5),
        ("COH-104", "Ibadan Campus Ambassador Leads", "Beauty", 8.5, 0.5),
        ("COH-105", "Kano Wholesaler Referral Signups", "Electronics", 32.0, 1.8),
        ("COH-106", "Enugu SME Merchant Program", "Fashion", 18.0, 0.9),
        ("COH-107", "Benin City Direct App Installs", "Groceries", 14.5, 2.0),
        ("COH-108", "Kaduna High-Volume Subscribers", "Beauty", 11.0, 0.6),
        ("COH-109", "Asaba Corporate Gift Buyers", "Electronics", 28.0, 1.4),
        ("COH-110", "Abeokuta FMCG Bundle Buyers", "Fashion", 15.0, 1.1),
        ("COH-111", "Calabar Loyalty Club Members", "Groceries", 20.0, 2.2),
        ("COH-112", "Jos Weekend Promotion Shoppers", "Beauty", 9.5, 0.7),
    ]

    return _assemble_pack(rnd, seed, scenario, inp, rates, items)


def _build_operations_pack(rnd: random.Random, seed: int, scenario: dict) -> dict:
    """Build Interstate Haulage Fleet Dispatch & Route Margins pack."""
    inp = {
        "FX_USD_NGN": round(rnd.uniform(1500, 1750), -1),
        "FX_CNY_PER_USD": 7.25,
        "FREIGHT_USD_PER_KG": round(rnd.uniform(2.8, 4.5), 2),
        "CLEARING_PCT": round(rnd.uniform(0.04, 0.08), 3),
        "HAULAGE_NGN_PER_UNIT": round(rnd.uniform(500, 950), -1),
        "TARGET_MARGIN": 0.30,
        "MIN_MARGIN_FLAG": 0.15,
        "BUDGET_CAP_NGN": 65000000,
    }
    categories = ["North_Corridor", "South_Corridor", "East_Corridor", "West_Corridor"]
    rates = {cat: round(rnd.uniform(0.12, 0.28), 3) for cat in categories}

    items = [
        ("ROU-101", "Lagos to Kano Express (980km)", "North_Corridor", 26.0, 1.5),
        ("ROU-102", "Lagos to Onitsha Commercial (480km)", "East_Corridor", 14.0, 0.9),
        ("ROU-103", "Port Harcourt to Kano Corridor (1050km)", "North_Corridor", 29.0, 1.8),
        ("ROU-104", "Lagos to Ibadan Shuttle (130km)", "West_Corridor", 7.0, 0.4),
        ("ROU-105", "Abuja to Kaduna Logistics Link (190km)", "North_Corridor", 10.5, 0.6),
        ("ROU-106", "Warri to Benin Supply Run (110km)", "South_Corridor", 8.0, 0.5),
        ("ROU-107", "Lagos to Abuja Interstate Freight (750km)", "North_Corridor", 22.0, 1.3),
        ("ROU-108", "Aba to Calabar Agricultural Route (180km)", "South_Corridor", 11.5, 0.7),
        ("ROU-109", "Jos to Bauchi Grain Dispatch (135km)", "North_Corridor", 9.0, 0.6),
        ("ROU-110", "Ilorin to Minna Transit Corridor (240km)", "West_Corridor", 13.0, 0.8),
        ("ROU-111", "Akure to Osogbo Industrial Route (120km)", "West_Corridor", 8.5, 0.5),
        ("ROU-112", "Makurdi to Enugu Produce Haul (220km)", "East_Corridor", 12.0, 0.7),
    ]

    return _assemble_pack(rnd, seed, scenario, inp, rates, items)


def _build_finance_pack(rnd: random.Random, seed: int, scenario: dict) -> dict:
    """Build Corporate Working Capital & 13-Week Cashflow Runway pack."""
    inp = {
        "FX_USD_NGN": round(rnd.uniform(1500, 1750), -1),
        "FX_CNY_PER_USD": 7.25,
        "FREIGHT_USD_PER_KG": round(rnd.uniform(2.5, 4.2), 2),
        "CLEARING_PCT": round(rnd.uniform(0.04, 0.08), 3),
        "HAULAGE_NGN_PER_UNIT": round(rnd.uniform(350, 750), -1),
        "TARGET_MARGIN": 0.25,
        "MIN_MARGIN_FLAG": 0.10,
        "BUDGET_CAP_NGN": 80000000,
    }
    categories = ["Trade_Debtors", "Raw_Materials", "Operating_Expenses", "Statutory"]
    rates = {cat: round(rnd.uniform(0.08, 0.22), 3) for cat in categories}

    items = [
        ("WCF-101", "Key National Distributor Credit (45 days)", "Trade_Debtors", 35.0, 2.0),
        ("WCF-102", "Supermarket Modern Trade Receivables", "Trade_Debtors", 20.0, 1.2),
        ("WCF-103", "Imported Chemical Active Ingredients", "Raw_Materials", 28.0, 1.5),
        ("WCF-104", "Packaging Film & Corrugated Cartons", "Raw_Materials", 15.0, 1.0),
        ("WCF-105", "Factory Industrial Diesel & Maintenance", "Operating_Expenses", 18.0, 1.1),
        ("WCF-106", "Head Office Payroll & Contractor Retainers", "Operating_Expenses", 25.0, 1.4),
        ("WCF-107", "Value Added Tax & Withholding Tax Reserve", "Statutory", 12.0, 0.7),
        ("WCF-108", "State Internal Revenue PAYE Remittance", "Statutory", 9.0, 0.5),
        ("WCF-109", "Regional Wholesaler Cash On Delivery Account", "Trade_Debtors", 22.0, 1.3),
        ("WCF-110", "Sugar & Sweetener Import LC Facility", "Raw_Materials", 30.0, 1.8),
        ("WCF-111", "Distribution Truck Third-Party Leasing", "Operating_Expenses", 14.0, 0.8),
        ("WCF-112", "Export Expansion Grant Receivable", "Trade_Debtors", 16.0, 1.0),
    ]

    return _assemble_pack(rnd, seed, scenario, inp, rates, items)


def _assemble_pack(rnd: random.Random, seed: int, scenario: dict, inp: dict, duty: dict, items: list) -> dict:
    """Calculate clean records, flaws, allocation plan, base outputs, and 6 metamorphic shocks."""
    clean, raw = [], []
    for sku, desc, cat, usd, kg in items:
        price_usd = round(usd * rnd.uniform(0.9, 1.1), 2)
        weight_kg = round(kg * rnd.uniform(0.95, 1.05), 2)
        clean.append({
            "sku": sku, "cat": cat, "currency": "USD",
            "price_quoted": price_usd, "weight_kg": weight_kg
        })
        raw.append({
            "sku": sku, "desc": desc, "cat_raw": cat,
            "currency": "USD", "price_raw": price_usd,
            "weight_raw": weight_kg, "unit": "kg"
        })

    # Allocation Plan (qty and shelf price)
    plan = {}
    for c in clean:
        qty = rnd.choice([500, 1000, 1500, 2000, 2500])
        # landed cost estimate
        cif_ngn = c["price_quoted"] * inp["FX_USD_NGN"] + c["weight_kg"] * inp["FREIGHT_USD_PER_KG"] * inp["FX_USD_NGN"]
        landed_est = cif_ngn * (1 + duty[c["cat"]] + inp["CLEARING_PCT"]) + inp["HAULAGE_NGN_PER_UNIT"]
        shelf = round(landed_est / (1 - inp["TARGET_MARGIN"]), -2)
        plan[c["sku"]] = [qty, shelf]

    # Compute base outputs
    base = _compute_outputs(inp, duty, clean, plan, dup_rows=0)

    # 6 Metamorphic Shocks
    fx_new = round(inp["FX_USD_NGN"] * 1.25, -1)
    duty_cat = list(duty.keys())[0]
    duty_cell = f"Inputs!B{15 + list(duty).index(duty_cat)}"
    cap_new = round(inp["BUDGET_CAP_NGN"] * 0.75, -5)

    shocks = [
        {
            "id": "S1_FX",
            "name": scenario["shocks"][0]["name"],
            "changes": [{"target": "input", "name": "FX_USD_NGN", "cell": "Inputs!B4", "old": inp["FX_USD_NGN"], "new": fx_new}],
        },
        {
            "id": "S2_TARIFF",
            "name": scenario["shocks"][1]["name"],
            "changes": [{"target": "duty", "name": duty_cat, "cell": duty_cell, "old": duty[duty_cat], "new": round(duty[duty_cat] + 0.10, 3)}],
        },
        {
            "id": "S3_DEMURRAGE",
            "name": scenario["shocks"][2]["name"],
            "changes": [{"target": "input", "name": "HAULAGE_NGN_PER_UNIT", "cell": "Inputs!B8", "old": inp["HAULAGE_NGN_PER_UNIT"], "new": round(inp["HAULAGE_NGN_PER_UNIT"] * 1.5, -1)}],
        },
        {
            "id": "S4_FREIGHT",
            "name": scenario["shocks"][3]["name"],
            "changes": [{"target": "input", "name": "FREIGHT_USD_PER_KG", "cell": "Inputs!B6", "old": inp["FREIGHT_USD_PER_KG"], "new": round(inp["FREIGHT_USD_PER_KG"] * 1.30, 2)}],
        },
        {
            "id": "S5_BUDGET",
            "name": scenario["shocks"][4]["name"],
            "changes": [{"target": "input", "name": "BUDGET_CAP_NGN", "cell": "Inputs!B11", "old": inp["BUDGET_CAP_NGN"], "new": cap_new}],
        },
        {
            "id": "S6_VISIBLE",
            "name": scenario["shocks"][5]["name"],
            "changes": [
                {"target": "input", "name": "FX_USD_NGN", "cell": "Inputs!B4", "old": inp["FX_USD_NGN"], "new": fx_new},
                {"target": "input", "name": "BUDGET_CAP_NGN", "cell": "Inputs!B11", "old": inp["BUDGET_CAP_NGN"], "new": cap_new},
            ],
            "message": f"Mid-sprint update from Mrs. Bello: Commercial variables have adjusted (FX moves to {fx_new:,.0f} and budget cap tightens to {cap_new:,.0f}). Check outputs and confirm model invariants."
        }
    ]

    for s in shocks:
        i2, d2 = dict(inp), dict(duty)
        for ch in s["changes"]:
            if ch["target"] == "input":
                i2[ch["name"]] = ch["new"]
            elif ch["target"] == "duty":
                d2[ch["name"]] = ch["new"]
        s["expected"] = _compute_outputs(i2, d2, clean, plan, dup_rows=0)

    key_data = {
        "seed": seed,
        "version": f"sabi-{scenario['id'].lower()}",
        "scenario_id": scenario["id"],
        "scenario_name": scenario["name"],
        "inputs": inp,
        "duty": duty,
        "sku_order": [c["sku"] for c in clean],
        "clean": clean,
        "plan": plan,
        "raw": raw,
        "base": base,
        "shocks": shocks,
    }

    return {
        "scenario": scenario,
        "seed": seed,
        "inp": inp,
        "duty": duty,
        "items": items,
        "clean": clean,
        "raw": raw,
        "plan": plan,
        "base": base,
        "shocks": shocks,
        "key": key_data,
    }


def _compute_outputs(inp: dict, duty: dict, clean: list, plan: dict, dup_rows: int = 0) -> dict:
    """Mirror formula graph logic for expected values."""
    rows = []
    for c in clean:
        sku = c["sku"]
        qty, shelf = plan[sku]
        fob_ngn = c["price_quoted"] * inp["FX_USD_NGN"]
        freight_ngn = c["weight_kg"] * inp["FREIGHT_USD_PER_KG"] * inp["FX_USD_NGN"]
        cif_ngn = fob_ngn + freight_ngn
        duty_val = cif_ngn * duty[c["cat"]]
        clearing_val = cif_ngn * inp["CLEARING_PCT"]
        landed = cif_ngn + duty_val + clearing_val + inp["HAULAGE_NGN_PER_UNIT"]
        margin = (shelf - landed) / shelf if shelf else 0.0
        rows.append({
            "sku": sku, "landed": landed, "shelf": shelf,
            "qty": qty, "margin": margin, "planned_cost": landed * qty
        })

    cum = 0.0
    for rank, r in enumerate(sorted(rows, key=lambda r: -r["margin"]), start=1):
        cum += r["planned_cost"]
        r["rank"], r["cum"] = rank, cum
        r["included"] = 1 if cum <= inp["BUDGET_CAP_NGN"] else 0
        r["ordered_qty"] = r["qty"] * r["included"]
        r["ordered_cost"] = r["landed"] * r["ordered_qty"]

    total_planned = sum(r["planned_cost"] for r in rows)
    ordered_cost = sum(r["ordered_cost"] for r in rows)
    denom = sum(r["shelf"] * r["ordered_qty"] for r in rows)
    numer = sum((r["shelf"] - r["landed"]) * r["ordered_qty"] for r in rows)

    summary = {
        "total_planned_cost": total_planned,
        "within_budget_planned": "Yes" if total_planned <= inp["BUDGET_CAP_NGN"] else "No",
        "skus_included": sum(r["included"] for r in rows),
        "ordered_cost": ordered_cost,
        "headroom": inp["BUDGET_CAP_NGN"] - ordered_cost,
        "blended_margin": numer / denom if denom else 0.0,
        "lowest_margin_sku": min(rows, key=lambda r: r["margin"])["sku"],
        "flagged_count": sum(1 for r in rows if r["margin"] < inp["MIN_MARGIN_FLAG"]),
        "duplicate_rows": dup_rows,
    }
    table = {
        r["sku"]: {"landed": r["landed"], "margin": r["margin"], "ordered_qty": r["ordered_qty"]}
        for r in rows
    }
    return {"summary": summary, "table": table}


def _write_workbook(pack_data: dict, file_path: str, is_starter: bool = False):
    """Write styled Excel workbook with live formulas for reference or clean templates for starter."""
    wb = Workbook()
    wb.remove(wb.active)  # Remove default sheet

    F_BASE = Font(name="Arial", size=10)
    F_BOLD = Font(name="Arial", size=10, bold=True)
    F_TITLE = Font(name="Arial", size=14, bold=True)
    FILL_HEAD = PatternFill("solid", start_color="D9E1F2", end_color="D9E1F2")
    WRAP = Alignment(wrap_text=True, vertical="top")

    scenario = pack_data["scenario"]
    inp = pack_data["inp"]
    duty = pack_data["duty"]
    clean = pack_data["clean"]
    raw = pack_data["raw"]
    plan = pack_data["plan"]

    # 1. Brief Sheet
    ws_b = wb.create_sheet("Brief")
    ws_b["A1"] = f"SABI DAY ONE: {scenario['name'].upper()}"
    ws_b["A1"].font = F_TITLE
    ws_b["A3"] = f"Target Role: {scenario['role_title']} · Track: Excel Commercial Analytics"
    ws_b["A3"].font = F_BOLD
    ws_b["A5"] = scenario["description"]
    ws_b["A5"].alignment = WRAP
    ws_b["A8"] = "Task Deliverables:"
    ws_b["A8"].font = F_BOLD
    ws_b["A9"] = "1. Clean raw inputs and map rates from Inputs sheet into Model sheet using Excel formulas (XLOOKUP/INDEX-MATCH)."
    ws_b["A10"] = "2. Calculate total landed unit costs and contribution margins dynamically."
    ws_b["A11"] = "3. Complete Outputs sheet with summary KPI metrics that survive all 6 metamorphic shocks."
    ws_b["A11"] = "AI Tools Declaration (Yes/No):"
    ws_b["B11"] = "No" if not is_starter else ""
    ws_b["A12"] = "Notes / Assumptions:"
    ws_b["B12"] = "All formulas dynamically linked; rates are category specific." if not is_starter else ""
    ws_b.column_dimensions["A"].width = 35
    ws_b.column_dimensions["B"].width = 50

    # 2. Inputs Sheet
    ws_i = wb.create_sheet("Inputs")
    ws_i["A1"] = "PARAMETER INPUTS"
    ws_i["A1"].font = F_TITLE
    input_rows = [
        ("FX_USD_NGN", inp["FX_USD_NGN"], "NGN/USD conversion rate"),
        ("FX_CNY_PER_USD", inp["FX_CNY_PER_USD"], "CNY per USD"),
        ("FREIGHT_USD_PER_KG", inp["FREIGHT_USD_PER_KG"], "Shipping line freight USD/kg"),
        ("CLEARING_PCT", inp["CLEARING_PCT"], "Terminal clearing percentage"),
        ("HAULAGE_NGN_PER_UNIT", inp["HAULAGE_NGN_PER_UNIT"], "Haulage dispatch NGN/unit"),
        ("TARGET_MARGIN", inp["TARGET_MARGIN"], "Target commercial margin"),
        ("MIN_MARGIN_FLAG", inp["MIN_MARGIN_FLAG"], "Threshold margin flag"),
        ("BUDGET_CAP_NGN", inp["BUDGET_CAP_NGN"], "Total planned budget ceiling (₦)"),
    ]
    ws_i["A3"] = "Variable Name"; ws_i["B3"] = "Base Value"; ws_i["C3"] = "Description"
    for col in ["A", "B", "C"]:
        ws_i[f"{col}3"].font = F_BOLD
        ws_i[f"{col}3"].fill = FILL_HEAD

    for r_idx, (name, val, desc) in enumerate(input_rows, start=4):
        ws_i[f"A{r_idx}"] = name
        ws_i[f"B{r_idx}"] = val
        ws_i[f"C{r_idx}"] = desc

    ws_i["A13"] = "CATEGORY / SECTOR RATES"
    ws_i["A13"].font = F_BOLD
    ws_i["A14"] = "Category"; ws_i["B14"] = "Rate"
    ws_i["A14"].font = F_BOLD; ws_i["B14"].font = F_BOLD
    for r_idx, (cat, rate) in enumerate(duty.items(), start=15):
        ws_i[f"A{r_idx}"] = cat
        ws_i[f"B{r_idx}"] = rate

    ws_i.column_dimensions["A"].width = 25
    ws_i.column_dimensions["B"].width = 18
    ws_i.column_dimensions["C"].width = 35

    # 3. Supplier_Prices / Raw Data Sheet
    ws_r = wb.create_sheet("Supplier_Prices")
    ws_r["A1"] = "RAW DATA RECORDS"
    ws_r["A1"].font = F_TITLE
    r_headers = ["SKU", "Description", "Category", "Currency", "Price", "Weight", "Unit"]
    for c_idx, h in enumerate(r_headers, start=1):
        cell = ws_r.cell(row=4, column=c_idx, value=h)
        cell.font = F_BOLD
        cell.fill = FILL_HEAD

    for r_idx, item in enumerate(raw, start=5):
        ws_r.cell(row=r_idx, column=1, value=item["sku"])
        ws_r.cell(row=r_idx, column=2, value=item["desc"])
        ws_r.cell(row=r_idx, column=3, value=item["cat_raw"])
        ws_r.cell(row=r_idx, column=4, value=item["currency"])
        ws_r.cell(row=r_idx, column=5, value=item["price_raw"])
        ws_r.cell(row=r_idx, column=6, value=item["weight_raw"])
        ws_r.cell(row=r_idx, column=7, value=item["unit"])

    # 4. Order_Plan Sheet
    ws_p = wb.create_sheet("Order_Plan")
    ws_p["A1"] = "ALLOCATION PLAN"
    ws_p["A1"].font = F_TITLE
    p_headers = ["SKU", "Planned Quantity", "Target Shelf Price (₦)"]
    for c_idx, h in enumerate(p_headers, start=1):
        cell = ws_p.cell(row=4, column=c_idx, value=h)
        cell.font = F_BOLD
        cell.fill = FILL_HEAD

    for r_idx, (sku, (qty, shelf)) in enumerate(plan.items(), start=5):
        ws_p.cell(row=r_idx, column=1, value=sku)
        ws_p.cell(row=r_idx, column=2, value=qty)
        ws_p.cell(row=r_idx, column=3, value=shelf)

    # 5. Model Sheet
    ws_m = wb.create_sheet("Model")
    ws_m["A1"] = "COMMERCIAL CALCULATION ENGINE"
    ws_m["A1"].font = F_TITLE
    m_headers = [
        "SKU", "Category", "Currency", "Quoted Price", "USD Price", "Weight (kg)",
        "FOB (₦)", "Freight (₦)", "CIF (₦)", "Duty Rate", "Duty (₦)",
        "Clearing (₦)", "Haulage (₦)", "Landed Cost (₦)", "Price at Target Margin",
        "Competitor Shelf Price", "Margin at Shelf", "Margin Flag", "Planned Qty",
        "Planned Cost (₦)", "Rank", "Cum Cost (₦)", "In Order?", "Ordered Qty", "Ordered Cost (₦)"
    ]
    for c_idx, h in enumerate(m_headers, start=1):
        cell = ws_m.cell(row=5, column=c_idx, value=h)
        cell.font = F_BOLD
        cell.fill = FILL_HEAD

    for idx, c in enumerate(clean):
        r = 6 + idx
        sku = c["sku"]
        ws_m[f"A{r}"] = sku
        if not is_starter:
            # The reference model must read every input from a data sheet so
            # the autopsy can verify both formula hygiene and shock response.
            raw_last = 4 + len(raw)
            duty_last = 14 + len(duty)
            raw_sku = f"Supplier_Prices!$A$5:$A${raw_last}"
            ws_m[f"B{r}"] = f"=INDEX(Supplier_Prices!$C$5:$C${raw_last},MATCH($A{r},{raw_sku},0))"
            ws_m[f"C{r}"] = f"=INDEX(Supplier_Prices!$D$5:$D${raw_last},MATCH($A{r},{raw_sku},0))"
            ws_m[f"D{r}"] = f"=INDEX(Supplier_Prices!$E$5:$E${raw_last},MATCH($A{r},{raw_sku},0))"
            ws_m[f"E{r}"] = f'=IF(C{r}="CNY",D{r}/Inputs!$B$5,D{r})'
            ws_m[f"F{r}"] = f"=INDEX(Supplier_Prices!$F$5:$F${raw_last},MATCH($A{r},{raw_sku},0))"
            ws_m[f"G{r}"] = f"=E{r}*Inputs!$B$4"
            ws_m[f"H{r}"] = f"=F{r}*Inputs!$B$6*Inputs!$B$4"
            ws_m[f"I{r}"] = f"=G{r}+H{r}"
            ws_m[f"J{r}"] = f'=INDEX(Inputs!$B$15:$B${duty_last},MATCH(B{r},Inputs!$A$15:$A${duty_last},0))'
            ws_m[f"K{r}"] = f"=I{r}*J{r}"
            ws_m[f"L{r}"] = f"=I{r}*Inputs!$B$7"
            ws_m[f"M{r}"] = f"=Inputs!$B$8"
            ws_m[f"N{r}"] = f"=I{r}+K{r}+L{r}+M{r}"
            ws_m[f"O{r}"] = f"=N{r}/(1-Inputs!$B$9)"
            plan_row = 5 + idx
            ws_m[f"P{r}"] = f"=Order_Plan!C{plan_row}"
            ws_m[f"Q{r}"] = f"=(P{r}-N{r})/P{r}"
            ws_m[f"R{r}"] = f'=IF(Q{r}<Inputs!$B$10,"FLAG","OK")'
            ws_m[f"S{r}"] = f"=Order_Plan!B{plan_row}"
            ws_m[f"T{r}"] = f"=N{r}*S{r}"
            ws_m[f"U{r}"] = f"=RANK(Q{r},Q$6:Q$17,0)+COUNTIF(Q$6:Q{r},Q{r})-1"
            ws_m[f"V{r}"] = f'=SUMIFS($T$6:$T$17,$U$6:$U$17,"<="&U{r})'
            ws_m[f"W{r}"] = f"=IF(V{r}<=Inputs!$B$11,1,0)"
            ws_m[f"X{r}"] = f"=S{r}*W{r}"
            ws_m[f"Y{r}"] = f"=N{r}*X{r}"

    # 6. Outputs Sheet
    ws_o = wb.create_sheet("Outputs")
    ws_o["A1"] = "KPI OUTPUTS SUMMARY"
    ws_o["A1"].font = F_TITLE
    ws_o["A3"] = "Metric"; ws_o["B3"] = "Value"
    ws_o["A3"].font = F_BOLD; ws_o["B3"].font = F_BOLD
    ws_o["A3"].fill = FILL_HEAD; ws_o["B3"].fill = FILL_HEAD

    kpi_defs = [
        ("total_planned_cost", "=SUM(Model!T6:T17)"),
        ("within_budget_planned", '=IF(B4<=Inputs!B11,"Yes","No")'),
        ("skus_included", "=SUM(Model!W6:W17)"),
        ("ordered_cost", "=SUM(Model!Y6:Y17)"),
        ("headroom", "=Inputs!B11-B7"),
        ("blended_margin", "=IFERROR(SUMPRODUCT(Model!Q6:Q17,Model!P6:P17,Model!X6:X17)/SUMPRODUCT(Model!P6:P17,Model!X6:X17),0)"),
        ("lowest_margin_sku", "=INDEX(Model!A6:A17,MATCH(MIN(Model!Q6:Q17),Model!Q6:Q17,0))"),
        ("flagged_count", '=COUNTIF(Model!R6:R17,"FLAG")'),
        ("duplicate_rows", "=COUNTA(Supplier_Prices!A5:A16)-COUNTA(Model!A6:A17)"),
    ]

    for idx, (label, formula) in enumerate(kpi_defs):
        r = 4 + idx
        ws_o[f"A{r}"] = label
        if not is_starter:
            ws_o[f"B{r}"] = formula

    # Detailed table starting row 16
    ws_o["A15"] = "SKU"; ws_o["B15"] = "Landed Cost"; ws_o["C15"] = "Margin"; ws_o["D15"] = "Ordered Qty"
    for col in ["A", "B", "C", "D"]:
        ws_o[f"{col}15"].font = F_BOLD
        ws_o[f"{col}15"].fill = FILL_HEAD

    for idx, c in enumerate(clean):
        r = 16 + idx
        m_row = 6 + idx
        ws_o[f"A{r}"] = c["sku"]
        if not is_starter:
            ws_o[f"B{r}"] = f"=Model!N{m_row}"
            ws_o[f"C{r}"] = f"=Model!Q{m_row}"
            ws_o[f"D{r}"] = f"=Model!X{m_row}"

    ws_o.column_dimensions["A"].width = 25
    ws_o.column_dimensions["B"].width = 25
    ws_o.column_dimensions["C"].width = 20
    ws_o.column_dimensions["D"].width = 20

    wb.save(file_path)

