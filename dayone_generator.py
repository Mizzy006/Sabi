#!/usr/bin/env python3
"""Day One pack generator: landed cost under a budget cap (Excel track, v0.1).

One seed builds one student's pack:
  starter.xlsx    what the student downloads (brief, inputs, messy raw data, fill-in outputs)
  reference.xlsx  engine-side solution with live formulas (recalculated by LibreOffice)
  key.json        inputs, cleaned data and the expected outputs for the base case and every shock

The key is computed in Python (compute()), independently of the workbook formulas.
dayone_autopsy.py --selftest checks that the recalculated reference matches the key.

Usage:  python dayone_generator.py --seed 1 --out pack_seed_1

Recalculation: uses the xlsx skill's recalc.py when present (set DAYONE_RECALC to override),
otherwise plain `soffice --headless` (that fallback is untested outside the sandbox).
All names, prices, rates and the retailer are fictional and illustrative.
"""
import argparse
import json
import math
import os
import random
import shutil
import subprocess
import sys
import tempfile

from openpyxl import Workbook
from openpyxl.styles import Alignment, Font, PatternFill, Protection
from openpyxl.workbook.defined_name import DefinedName
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.worksheet.properties import PageSetupProperties

# --------------------------------------------------------------------------------------
# Fixed layout (the autopsy reads these addresses; do not move them)
# --------------------------------------------------------------------------------------
INPUT_CELLS = {
    "FX_USD_NGN": "B4",
    "FX_CNY_PER_USD": "B5",
    "FREIGHT_USD_PER_KG": "B6",
    "CLEARING_PCT": "B7",
    "HAULAGE_NGN_PER_UNIT": "B8",
    "TARGET_MARGIN": "B9",
    "MIN_MARGIN_FLAG": "B10",
    "BUDGET_CAP_NGN": "B11",
}
CATEGORIES = ["Electronics", "Home", "Apparel", "Beauty"]
DUTY_FIRST_ROW = 14                       # Inputs!A14:B17 = category, duty rate
RAW_FIRST, RAW_LAST = 5, 17               # Supplier_Prices rows (13 = 12 SKUs + 1 duplicate)
PLAN_FIRST, PLAN_LAST = 5, 16             # Order_Plan rows
MODEL_FIRST, MODEL_LAST = 6, 17           # Model rows (one per SKU)
OUT_SUMMARY = {
    "total_planned_cost": "B4",
    "within_budget_planned": "B5",
    "skus_included": "B6",
    "ordered_cost": "B7",
    "headroom": "B8",
    "blended_margin": "B9",
    "lowest_margin_sku": "B10",
    "flagged_count": "B11",
    "duplicate_rows": "B12",
}
OUT_TABLE_FIRST = 16                      # Outputs rows 16..27: SKU | landed | margin | ordered qty
BRIEF_AI_CELL, BRIEF_NOTES_CELL = "B11", "B12"

CATALOG = [  # sku, description, category, illustrative FOB US$ per unit, unit weight kg
    ("ELE-101", "Rechargeable standing fan", "Electronics", 22.0, 3.2),
    ("ELE-102", "Solar lantern", "Electronics", 5.5, 0.45),
    ("ELE-103", "Power bank 10,000 mAh", "Electronics", 7.8, 0.28),
    ("HOM-201", "Electric kettle 1.8 L", "Home", 6.2, 0.95),
    ("HOM-202", "Blender 500 W", "Home", 14.0, 2.1),
    ("HOM-203", "Non-stick pan set", "Home", 17.5, 3.4),
    ("APP-301", "Men's polo shirt (3-pack)", "Apparel", 9.0, 0.55),
    ("APP-302", "School backpack", "Apparel", 8.5, 0.7),
    ("APP-303", "Ladies handbag", "Apparel", 12.0, 0.8),
    ("BTY-401", "Hair dryer 1800 W", "Beauty", 8.0, 0.75),
    ("BTY-402", "Face cream 50 ml (6-pack)", "Beauty", 10.5, 0.9),
    ("BTY-403", "Hair clipper set", "Beauty", 9.5, 0.6),
]

# --------------------------------------------------------------------------------------
# The Python model (this is the answer key; it mirrors reference.xlsx formula by formula)
# --------------------------------------------------------------------------------------

def unit_costs(inp, duty, clean):
    """Landed cost per unit for every cleaned SKU record."""
    out = {}
    for c in clean:
        price_usd = c["price_quoted"] / inp["FX_CNY_PER_USD"] if c["currency"] == "CNY" else c["price_quoted"]
        fob = price_usd * inp["FX_USD_NGN"]
        freight = c["weight_kg"] * inp["FREIGHT_USD_PER_KG"] * inp["FX_USD_NGN"]
        cif = fob + freight
        d = cif * duty[c["cat"]]
        clearing = cif * inp["CLEARING_PCT"]
        landed = cif + d + clearing + inp["HAULAGE_NGN_PER_UNIT"]
        out[c["sku"]] = {"cat": c["cat"], "landed": landed,
                         "target_price": landed / (1 - inp["TARGET_MARGIN"])}
    return out


def compute(inp, duty, clean, plan, dup_rows):
    """Outputs for one set of inputs. plan = {sku: [qty, shelf_price]}."""
    unit = unit_costs(inp, duty, clean)
    rows = []
    for c in clean:
        sku = c["sku"]
        qty, shelf = plan[sku]
        landed = unit[sku]["landed"]
        rows.append({"sku": sku, "landed": landed, "shelf": shelf, "qty": qty,
                     "margin": (shelf - landed) / shelf, "planned_cost": landed * qty})
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
    table = {r["sku"]: {"landed": r["landed"], "margin": r["margin"], "ordered_qty": r["ordered_qty"]}
             for r in rows}
    return {"summary": summary, "table": table}


# --------------------------------------------------------------------------------------
# Pack generation
# --------------------------------------------------------------------------------------

def _round_to(x, step):
    return round(x / step) * step


def _try_pack(rnd, seed):
    inp = {
        "FX_USD_NGN": _round_to(rnd.uniform(1350, 1750), 5),
        "FX_CNY_PER_USD": round(rnd.uniform(6.9, 7.4), 2),
        "FREIGHT_USD_PER_KG": round(rnd.uniform(2.5, 4.5), 2),
        "CLEARING_PCT": round(rnd.uniform(0.03, 0.06), 3),
        "HAULAGE_NGN_PER_UNIT": _round_to(rnd.uniform(250, 600), 10),
        "TARGET_MARGIN": rnd.choice([0.25, 0.30, 0.35]),
        "MIN_MARGIN_FLAG": 0.15,
        "BUDGET_CAP_NGN": 0,
    }
    duty = {"Electronics": round(rnd.uniform(0.05, 0.15), 3), "Home": round(rnd.uniform(0.10, 0.20), 3),
            "Apparel": round(rnd.uniform(0.15, 0.30), 3), "Beauty": round(rnd.uniform(0.10, 0.25), 3)}

    items = CATALOG[:]
    rnd.shuffle(items)
    n = len(items)
    idx = list(range(n))
    cny = set(rnd.sample(idx, 3))
    grams = set(rnd.sample(idx, 3))
    text_price = set(rnd.sample(idx, 5))
    cat_flaw = set(rnd.sample(idx, 5))

    clean, raw = [], []
    for i, (sku, desc, cat, usd, kg) in enumerate(items):
        price_usd = round(usd * rnd.uniform(0.85, 1.15), 2)
        weight = round(kg * rnd.uniform(0.9, 1.1), 2)
        currency = "CNY" if i in cny else "USD"
        quoted = round(price_usd * inp["FX_CNY_PER_USD"], 2) if currency == "CNY" else price_usd
        if i in grams:
            weight_raw, unit = int(round(weight * 1000)), "g"
            weight_kg = weight_raw / 1000
        else:
            weight_raw, unit, weight_kg = weight, "kg", weight
        price_raw = quoted
        if i in text_price:
            price_raw = rnd.choice(["", " ", "  "]) + f"{quoted:.2f}" + rnd.choice(["", " "])
        cat_raw = cat
        if i in cat_flaw:
            cat_raw = rnd.choice([cat + " ", " " + cat, cat.upper() + " ", cat.lower()])
        clean.append({"sku": sku, "cat": cat, "currency": currency, "price_quoted": quoted,
                      "weight_kg": weight_kg})
        raw.append({"sku": sku, "desc": desc, "cat_raw": cat_raw, "currency": currency,
                    "price_raw": price_raw, "weight_raw": weight_raw, "unit": unit})

    raw_order = idx[:]
    rnd.shuffle(raw_order)
    raw_rows = [raw[i] for i in raw_order]
    dup_sku = rnd.choice([r["sku"] for r in raw_rows])
    dup_row = dict(next(r for r in raw_rows if r["sku"] == dup_sku))
    raw_rows.insert(rnd.randint(2, len(raw_rows) - 1), dup_row)
    dup_rows = len(raw_rows) - len({r["sku"] for r in raw_rows})

    unit = unit_costs(inp, duty, clean)
    low = set(rnd.sample(idx, 2))
    plan = {}
    for i, c in enumerate(clean):
        qty = rnd.choice(range(60, 401, 10))
        factor = rnd.uniform(1.04, 1.14) if i in low else rnd.uniform(1.25, 1.85)
        plan[c["sku"]] = [qty, max(50, _round_to(unit[c["sku"]]["landed"] * factor, 50))]
    base_total = sum(unit[s]["landed"] * q for s, (q, _) in plan.items())
    inp["BUDGET_CAP_NGN"] = math.ceil(1.12 * base_total / 10000) * 10000

    base = compute(inp, duty, clean, plan, dup_rows)
    margins = sorted(v["margin"] for v in base["table"].values())
    if any(b - a < 1e-4 for a, b in zip(margins, margins[1:])):
        return None
    if base["summary"]["skus_included"] != n or base["summary"]["flagged_count"] != 2:
        return None

    # --- shocks -----------------------------------------------------------------------
    def change(target, name, cell, old, new):
        return {"target": target, "name": name, "cell": cell, "old": old, "new": new}

    fx_new = _round_to(inp["FX_USD_NGN"] * 1.20, 5)
    fr_new = round(inp["FREIGHT_USD_PER_KG"] * 1.25, 2)
    cap_new = max(10000, _round_to(inp["BUDGET_CAP_NGN"] * 0.75, 10000))
    share = {c: 0.0 for c in CATEGORIES}
    for c in clean:
        share[c["cat"]] += unit[c["sku"]]["landed"] * plan[c["sku"]][0]
    duty_cat = max(share, key=share.get)
    duty_cell = f"Inputs!B{DUTY_FIRST_ROW + CATEGORIES.index(duty_cat)}"
    by_rank = sorted(base["table"], key=lambda s: -base["table"][s]["margin"])
    shelf_sku = by_rank[1]
    shelf_row = PLAN_FIRST + [c["sku"] for c in clean].index(shelf_sku)
    shelf_new = max(50, _round_to(plan[shelf_sku][1] * 0.90, 50))

    ch_fx = change("input", "FX_USD_NGN", "Inputs!B4", inp["FX_USD_NGN"], fx_new)
    ch_fr = change("input", "FREIGHT_USD_PER_KG", "Inputs!B6", inp["FREIGHT_USD_PER_KG"], fr_new)
    ch_cap = change("input", "BUDGET_CAP_NGN", "Inputs!B11", inp["BUDGET_CAP_NGN"], cap_new)
    ch_duty = change("duty", duty_cat, duty_cell, duty[duty_cat], round(duty[duty_cat] + 0.05, 3))
    ch_shelf = change("shelf", shelf_sku, f"Order_Plan!C{shelf_row}", plan[shelf_sku][1], shelf_new)
    shocks = [
        {"id": "S1_FX", "label": "FX moves against the naira", "visible": False, "changes": [ch_fx]},
        {"id": "S2_FREIGHT", "label": "Freight rate surcharge", "visible": False, "changes": [ch_fr]},
        {"id": "S3_DUTY", "label": f"Duty rate rises on {duty_cat}", "visible": False, "changes": [ch_duty]},
        {"id": "S4_BUDGET", "label": "Budget cap cut", "visible": False, "changes": [ch_cap]},
        {"id": "S5_SHELF", "label": f"Competitor cuts the shelf price of {shelf_sku}", "visible": False,
         "changes": [ch_shelf]},
        {"id": "S6_VISIBLE", "label": "Mid-sprint update: FX move plus budget cut", "visible": True,
         "changes": [ch_fx, ch_cap],
         "message": (f"Update from Mrs. Bello: the naira has weakened, so use FX_USD_NGN = {fx_new:,.0f}. "
                     f"Finance has also cut the budget cap to {cap_new:,.0f} naira. Update the Inputs sheet, "
                     f"check what changes in your model and outputs, and resubmit.")},
    ]
    for s in shocks:
        i2, d2 = dict(inp), dict(duty)
        p2 = {k: list(v) for k, v in plan.items()}
        for ch in s["changes"]:
            if ch["target"] == "input":
                i2[ch["name"]] = ch["new"]
            elif ch["target"] == "duty":
                d2[ch["name"]] = ch["new"]
            else:
                p2[ch["name"]][1] = ch["new"]
        s["expected"] = compute(i2, d2, clean, p2, dup_rows)
    by_id = {s["id"]: s for s in shocks}
    if not (by_id["S4_BUDGET"]["expected"]["summary"]["skus_included"] < n
            and 1 <= by_id["S6_VISIBLE"]["expected"]["summary"]["skus_included"] < n
            and by_id["S1_FX"]["expected"]["summary"]["within_budget_planned"] == "No"):
        return None

    return {"seed": seed, "version": "dayone-landed-cost-0.1", "inputs": inp, "duty": duty,
            "sku_order": [c["sku"] for c in clean], "clean": clean, "plan": plan, "raw": raw_rows,
            "descriptions": {sku: desc for sku, desc, _, _, _ in CATALOG},
            "base": base, "shocks": shocks,
            "flaws": {"cny": [items[i][0] for i in sorted(cny)], "grams": [items[i][0] for i in sorted(grams)],
                      "text_price": [items[i][0] for i in sorted(text_price)],
                      "category_whitespace_or_case": [items[i][0] for i in sorted(cat_flaw)],
                      "duplicate_sku": dup_sku},
            "layout": {"input_cells": INPUT_CELLS, "out_summary": OUT_SUMMARY, "out_table_first": OUT_TABLE_FIRST}}


def make_pack(seed):
    for attempt in range(200):
        pack = _try_pack(random.Random(seed * 1000 + attempt), seed)
        if pack:
            return pack
    raise RuntimeError("could not build a valid pack for this seed")


# --------------------------------------------------------------------------------------
# Workbook builders
# --------------------------------------------------------------------------------------
F = "Arial"
F_BASE = Font(name=F, size=10)
F_BOLD = Font(name=F, size=10, bold=True)
F_TITLE = Font(name=F, size=14, bold=True)
F_NOTE = Font(name=F, size=9, italic=True, color="666666")
F_BLUE = Font(name=F, size=10, color="0000FF")
F_GREEN = Font(name=F, size=10, color="008000")
FILL_HEAD = PatternFill("solid", start_color="D9E1F2", end_color="D9E1F2")
FILL_YELLOW = PatternFill("solid", start_color="FFFF00", end_color="FFFF00")
WRAP = Alignment(wrap_text=True, vertical="top")
UNLOCKED = Protection(locked=False)

MODEL_HEADERS = [
    "SKU", "Category (clean)", "Quote currency", "Quoted unit price", "Unit price (US$)", "Unit weight (kg)",
    "FOB per unit (₦)", "Freight per unit (₦)", "CIF per unit (₦)", "Duty rate", "Duty per unit (₦)",
    "Clearing per unit (₦)", "Haulage per unit (₦)", "Landed cost per unit (₦)", "Price at target margin (₦)",
    "Competitor shelf price (₦)", "Margin at shelf price", "Margin flag", "Planned quantity (units)",
    "Planned landed cost (₦)", "Margin rank (1 = highest)", "Cumulative planned cost to this rank (₦)",
    "In order? (1 = yes)", "Ordered quantity (units)", "Ordered landed cost (₦)",
]


def _head(ws, row, labels, start_col=1):
    for j, text in enumerate(labels):
        c = ws.cell(row=row, column=start_col + j, value=text)
        c.font, c.fill, c.alignment = F_BOLD, FILL_HEAD, Alignment(wrap_text=True, vertical="center")


def _fmt(ws, rng, number_format=None, font=None, fill=None):
    for row in ws[rng]:
        for c in row:
            if number_format:
                c.number_format = number_format
            if font:
                c.font = font
            if fill:
                c.fill = fill


def _name(wb, name, ref):
    dn = DefinedName(name, attr_text=ref)
    wb.defined_names[name] = dn


def build_workbook(pack, filled):
    """filled=False -> student starter; filled=True -> engine-side reference solution."""
    inp, duty, order = pack["inputs"], pack["duty"], pack["sku_order"]
    wb = Workbook()

    # ---- Brief ------------------------------------------------------------------------
    ws = wb.active
    ws.title = "Brief"
    ws.column_dimensions["A"].width = 22
    ws.column_dimensions["B"].width = 110
    ws["A1"], ws["A1"].font = "Day One: landed cost for a Lagos retailer (fictional case)", F_TITLE
    ws["A2"] = (f"Pack {pack['seed']} · Time box: 75 minutes to build, then 20 minutes after the update arrives · "
                "All names, prices and rates are fictional.")
    ws["A2"].font = F_NOTE
    rows = [
        ("Message", "From Mrs. Bello, Head of Buying, Olumide Stores: We are importing a festive-season batch of 12 "
                    "products. Supplier quotes came from three suppliers, so expect untidy data. I need your workbook "
                    "before the buying meeting."),
        ("What the MD wants", "1. Landed cost per unit in naira for each SKU.\n"
                              "2. The price needed for our target margin, and the margin we would earn at the competitors' shelf prices.\n"
                              "3. Whether the planned order fits the budget cap.\n"
                              "4. If it does not fit, which SKUs to leave out."),
        ("Rules", "Landed cost per unit = CIF + duty + clearing + local haulage.\n"
                  "CIF = FOB (unit price converted to naira) + freight (unit weight × freight rate × FX). Insurance is inside the freight quote.\n"
                  "Duty = the category's duty rate × CIF. Clearing = clearing % × CIF. Haulage = a fixed naira amount per unit.\n"
                  "Target margin is a margin on selling price (price = cost ÷ (1 − margin)), not a markup on cost.\n"
                  "Order rule: rank SKUs by margin at shelf price, highest first. Include SKUs in that order while the cumulative planned landed cost stays within the budget cap. A SKU is included in full or not at all.\n"
                  "If the raw list repeats an identical quote row, count it once.\n"
                  "Do not type numbers into Model or Outputs: every number there must be a formula that reads the data sheets or Inputs."),
        ("Submit", "Save as .xlsx (no macros). Keep the sheet names and the Outputs layout. Fill the yellow cells on Outputs. "
                   "Partway through you will get an update from Mrs. Bello: apply it by editing the Inputs sheet, then resubmit."),
        ("Legend", "Blue text = an assumption you may edit (Inputs sheet only). Yellow = cells you fill in. Everything else is data or your working."),
        ("Example format", "Example only (not your data): SKU XXX-000 | Landed cost per unit (₦) 12,345.67 | Margin at shelf price 18.4% | Ordered quantity 120"),
    ]
    for i, (label, text) in enumerate(rows, start=4):
        ws.cell(row=i, column=1, value=label).font = F_BOLD
        c = ws.cell(row=i, column=2, value=text)
        c.font, c.alignment = F_BASE, WRAP
        ws.cell(row=i, column=1).alignment = WRAP
    ws["A11"], ws["A11"].font = "AI tools used? (Yes/No)", F_BOLD
    ws["A12"], ws["A12"].font = "Assumptions and notes", F_BOLD
    if filled:
        ws[BRIEF_AI_CELL] = "No"
        ws[BRIEF_NOTES_CELL] = "Reference formulas are linked to the source data and editable assumptions."
    for addr in (BRIEF_AI_CELL, BRIEF_NOTES_CELL):
        ws[addr].fill, ws[addr].protection, ws[addr].font, ws[addr].alignment = FILL_YELLOW, UNLOCKED, F_BASE, WRAP
    dv = DataValidation(type="list", formula1='"Yes,No"', allow_blank=True)
    ws.add_data_validation(dv)
    dv.add(BRIEF_AI_CELL)
    for r, h in ((4, 60), (5, 70), (6, 150), (7, 45), (8, 30), (9, 30), (12, 60)):
        ws.row_dimensions[r].height = h
    ws.protection.sheet = True

    # ---- Inputs -----------------------------------------------------------------------
    ws = wb.create_sheet("Inputs")
    ws["A1"], ws["A1"].font = "Inputs (blue = editable assumptions)", F_TITLE
    ws["A2"], ws["A2"].font = "Illustrative values for this case. The shock update tells you which of these change.", F_NOTE
    _head(ws, 3, ["Assumption", "Value", "Unit", "Note"])
    spec = [
        ("FX_USD_NGN", "Exchange rate", "₦ per US$", "Used for every US$ cost", "#,##0.00"),
        ("FX_CNY_PER_USD", "Exchange rate", "CNY per US$", "Converts CNY-quoted prices to US$", "0.00"),
        ("FREIGHT_USD_PER_KG", "Freight rate", "US$ per kg", "Forwarder rate, quoted in US$", "0.00"),
        ("CLEARING_PCT", "Clearing and port charges", "% of CIF", "", "0.0%"),
        ("HAULAGE_NGN_PER_UNIT", "Local haulage", "₦ per unit", "Fixed in naira", "#,##0"),
        ("TARGET_MARGIN", "Target gross margin", "% of selling price", "Margin, not markup", "0.0%"),
        ("MIN_MARGIN_FLAG", "Minimum acceptable margin", "% of selling price", "Flag SKUs below this at shelf price", "0.0%"),
        ("BUDGET_CAP_NGN", "Budget cap for the order", "₦", "Maximum landed cost of the order", "#,##0"),
    ]
    for (name, label, unit, note, nf), r in zip(spec, range(4, 12)):
        ws.cell(row=r, column=1, value=f"{label} ({name})").font = F_BASE
        c = ws.cell(row=r, column=2, value=inp[name])
        c.font, c.number_format, c.protection = F_BLUE, nf, UNLOCKED
        ws.cell(row=r, column=3, value=unit).font = F_BASE
        ws.cell(row=r, column=4, value=note).font = F_NOTE
        _name(wb, name, f"Inputs!$B${r}")
    ws["A13"], ws["A13"].font = "Category", F_BOLD
    ws["B13"], ws["B13"].font = "Duty rate (% of CIF)", F_BOLD
    ws["A13"].fill = ws["B13"].fill = FILL_HEAD
    for k, cat in enumerate(CATEGORIES):
        r = DUTY_FIRST_ROW + k
        ws.cell(row=r, column=1, value=cat).font = F_BASE
        c = ws.cell(row=r, column=2, value=duty[cat])
        c.font, c.number_format, c.protection = F_BLUE, "0.0%", UNLOCKED
    _name(wb, "DUTY_TABLE", f"Inputs!$A${DUTY_FIRST_ROW}:$B${DUTY_FIRST_ROW + 3}")
    ws["A19"], ws["A19"].font = "Duty rates are illustrative, not official tariff rates.", F_NOTE
    for col, w in zip("ABCD", (42, 16, 20, 40)):
        ws.column_dimensions[col].width = w
    ws.protection.sheet = True

    # ---- Supplier_Prices (raw, untidy) -------------------------------------------------
    ws = wb.create_sheet("Supplier_Prices")
    ws["A1"], ws["A1"].font = "Supplier price list (raw quotes: do not edit, clean in your model)", F_TITLE
    ws["A2"], ws["A2"].font = "Three suppliers, three habits. Source: supplier quotes (fictional).", F_NOTE
    _head(ws, 4, ["SKU", "Description", "Category", "Currency", "Unit price", "Unit weight", "Weight unit"])
    for k, r in enumerate(pack["raw"]):
        row = RAW_FIRST + k
        vals = [r["sku"], r["desc"], r["cat_raw"], r["currency"], r["price_raw"], r["weight_raw"], r["unit"]]
        for j, v in enumerate(vals, start=1):
            c = ws.cell(row=row, column=j, value=v)
            c.font = F_BASE
            if j == 5 and isinstance(v, str):
                c.number_format = "@"
    for col, w in zip("ABCDEFG", (11, 30, 14, 10, 12, 12, 12)):
        ws.column_dimensions[col].width = w
    ws.protection.sheet = True

    # ---- Order_Plan (clean) -------------------------------------------------------------
    ws = wb.create_sheet("Order_Plan")
    ws["A1"], ws["A1"].font = "Order plan and competitor shelf prices", F_TITLE
    ws["A2"], ws["A2"].font = "Planned quantities from Buying; shelf prices from a store visit (fictional).", F_NOTE
    _head(ws, 4, ["SKU", "Planned quantity (units)", "Competitor shelf price (₦ per unit)"])
    for k, sku in enumerate(order):
        r = PLAN_FIRST + k
        ws.cell(row=r, column=1, value=sku).font = F_BASE
        c = ws.cell(row=r, column=2, value=pack["plan"][sku][0])
        c.font, c.number_format = F_BASE, "#,##0"
        c = ws.cell(row=r, column=3, value=pack["plan"][sku][1])
        c.font, c.number_format = F_BASE, "#,##0"
    for col, w in zip("ABC", (11, 24, 32)):
        ws.column_dimensions[col].width = w
    ws.protection.sheet = True

    # ---- Model (calculation zone) ---------------------------------------------------------
    ws = wb.create_sheet("Model")
    ws["A1"], ws["A1"].font = "Model (your working)", F_TITLE
    if filled:
        ws["A2"], ws["A2"].font = "Reference solution. Every number is a formula; inputs come from the Inputs sheet.", F_NOTE
    else:
        ws["A2"] = ("Build your model here. Suggested columns are in grey; rename, reorder or add helper columns. "
                    "No typed numbers: every number must be a formula.")
        ws["A2"].font = F_NOTE
    _head(ws, 5, MODEL_HEADERS)
    if not filled:
        for j in range(2, len(MODEL_HEADERS) + 1):
            ws.cell(row=5, column=j).font = Font(name=F, size=10, italic=True, color="808080")
    raw_sku = f"Supplier_Prices!$A${RAW_FIRST}:$A${RAW_LAST}"
    plan_sku = f"Order_Plan!$A${PLAN_FIRST}:$A${PLAN_LAST}"

    def raw_col(col):
        return f"INDEX(Supplier_Prices!${col}${RAW_FIRST}:${col}${RAW_LAST},MATCH($A{{r}},{raw_sku},0))"

    def plan_col(col):
        return f"INDEX(Order_Plan!${col}${PLAN_FIRST}:${col}${PLAN_LAST},MATCH($A{{r}},{plan_sku},0))"

    last = MODEL_LAST
    formulas = {  # column letter -> (formula template, number format, link-to-other-sheet?)
        "B": (f"=TRIM({raw_col('C')})", "@", True),
        "C": (f"={raw_col('D')}", "General", True),
        "D": (f"=VALUE(TRIM({raw_col('E')}))", "#,##0.00", True),
        "E": ("=IF(C{r}=\"CNY\",D{r}/FX_CNY_PER_USD,D{r})", "#,##0.00", False),
        "F": (f"={raw_col('F')}/IF({raw_col('G')}=\"g\",1000,1)", "0.000", True),
        "G": ("=E{r}*FX_USD_NGN", "#,##0.00", False),
        "H": ("=F{r}*FREIGHT_USD_PER_KG*FX_USD_NGN", "#,##0.00", False),
        "I": ("=G{r}+H{r}", "#,##0.00", False),
        "J": ("=VLOOKUP(B{r},DUTY_TABLE,2,FALSE)", "0.0%", True),
        "K": ("=I{r}*J{r}", "#,##0.00", False),
        "L": ("=I{r}*CLEARING_PCT", "#,##0.00", False),
        "M": ("=HAULAGE_NGN_PER_UNIT", "#,##0.00", False),
        "N": ("=I{r}+K{r}+L{r}+M{r}", "#,##0.00", False),
        "O": ("=N{r}/(1-TARGET_MARGIN)", "#,##0.00", False),
        "P": (f"={plan_col('C')}", "#,##0", True),
        "Q": ("=(P{r}-N{r})/P{r}", "0.0%", False),
        "R": ("=IF(Q{r}<MIN_MARGIN_FLAG,\"Review\",\"OK\")", "General", False),
        "S": (f"={plan_col('B')}", "#,##0", True),
        "T": ("=N{r}*S{r}", "#,##0", False),
        "U": (f"=RANK(Q{{r}},$Q${MODEL_FIRST}:$Q${last},0)", "0", False),
        "V": (f"=SUMIFS($T${MODEL_FIRST}:$T${last},$U${MODEL_FIRST}:$U${last},\"<=\"&U{{r}})", "#,##0", False),
        "W": ("=IF(V{r}<=BUDGET_CAP_NGN,1,0)", "0", False),
        "X": ("=S{r}*W{r}", "#,##0", False),
        "Y": ("=N{r}*X{r}", "#,##0", False),
    }
    for k, sku in enumerate(order):
        r = MODEL_FIRST + k
        ws.cell(row=r, column=1, value=sku).font = F_BASE
        if filled:
            for col, (tpl, nf, link) in formulas.items():
                c = ws[f"{col}{r}"]
                c.value = tpl.replace("{r}", str(r))
                c.number_format = nf
                c.font = F_GREEN if link else F_BASE
    ws.column_dimensions["A"].width = 11
    for j in range(2, len(MODEL_HEADERS) + 1):
        ws.column_dimensions[ws.cell(row=5, column=j).column_letter].width = 16
    ws.row_dimensions[5].height = 42
    ws.freeze_panes = "B6"

    # ---- Outputs (fixed addresses: the autopsy reads these) ---------------------------------
    ws = wb.create_sheet("Outputs")
    ws["A1"], ws["A1"].font = "Outputs (link these to your model; yellow = fill in)", F_TITLE
    ws["A2"], ws["A2"].font = "Keep this layout. Every number here must be a formula.", F_NOTE
    _head(ws, 3, ["Summary", "Value", "Unit"])
    mrow = lambda col: f"Model!{col}{MODEL_FIRST}:{col}{MODEL_LAST}"
    summary_rows = [
        ("Total planned landed cost", f"=SUM({mrow('T')})", "₦", "#,##0"),
        ("Planned order within budget cap? (Yes/No)", '=IF(B4<=BUDGET_CAP_NGN,"Yes","No")', "", "General"),
        ("SKUs included in the order", f"=SUM({mrow('W')})", "count", "0"),
        ("Ordered landed cost", f"=SUM({mrow('Y')})", "₦", "#,##0"),
        ("Budget headroom after the order", "=BUDGET_CAP_NGN-B7", "₦", "#,##0"),
        ("Blended margin of the ordered basket at shelf prices",
         f"=IFERROR(SUMPRODUCT({mrow('P')}-{mrow('N')},{mrow('X')})/SUMPRODUCT({mrow('P')},{mrow('X')}),0)", "%", "0.0%"),
        ("Lowest-margin SKU at shelf price",
         f"=INDEX({mrow('A')},MATCH(MIN({mrow('Q')}),{mrow('Q')},0))", "SKU", "General"),
        ("SKUs flagged below the minimum margin", f'=COUNTIF({mrow("R")},"Review")', "count", "0"),
        ("Duplicate quote rows found in the raw list",
         f"=ROWS(Supplier_Prices!A{RAW_FIRST}:A{RAW_LAST})-ROUND(SUMPRODUCT(1/COUNTIF(Supplier_Prices!A{RAW_FIRST}:A{RAW_LAST},Supplier_Prices!A{RAW_FIRST}:A{RAW_LAST})),0)",
         "count", "0"),
    ]
    for k, (label, formula, unit, nf) in enumerate(summary_rows):
        r = 4 + k
        ws.cell(row=r, column=1, value=label).font = F_BASE
        c = ws.cell(row=r, column=2)
        c.number_format, c.protection, c.font = nf, UNLOCKED, F_BASE
        if filled:
            c.value = formula
        else:
            c.fill = FILL_YELLOW
        ws.cell(row=r, column=3, value=unit).font = F_BASE
    _head(ws, OUT_TABLE_FIRST - 1, ["SKU", "Landed cost per unit (₦)", "Margin at shelf price", "Ordered quantity (units)"])
    for k, sku in enumerate(order):
        r = OUT_TABLE_FIRST + k
        ws.cell(row=r, column=1, value=sku).font = F_BASE
        for j, (mcol, nf) in enumerate((("N", "#,##0.00"), ("Q", "0.0%"), ("X", "#,##0")), start=2):
            c = ws.cell(row=r, column=j)
            c.number_format, c.protection, c.font = nf, UNLOCKED, F_BASE
            if filled:
                c.value = f"=INDEX(Model!${mcol}${MODEL_FIRST}:${mcol}${MODEL_LAST},MATCH($A{r},Model!$A${MODEL_FIRST}:$A${MODEL_LAST},0))"
                c.font = F_GREEN
            else:
                c.fill = FILL_YELLOW
    for col, w in zip("ABCD", (52, 22, 22, 24)):
        ws.column_dimensions[col].width = w
    ws.protection.sheet = True
    for sheet in wb.worksheets:            # print-friendly: landscape, one page wide
        sheet.page_setup.orientation = "landscape"
        sheet.page_setup.fitToWidth = 1
        sheet.page_setup.fitToHeight = 0
        sheet.sheet_properties.pageSetUpPr = PageSetupProperties(fitToPage=True)
    return wb


def recalculate(path, timeout=120):
    """Recalculate a workbook in place and return the report.

    Delegates to dayone_recalc which tries Excel COM (Windows),
    an external script (DAYONE_RECALC env var), or headless LibreOffice.
    """
    from dayone_recalc import recalculate as _recalc
    return _recalc(path, timeout)


def write_pack(seed, out_dir):
    pack = make_pack(seed)
    os.makedirs(out_dir, exist_ok=True)
    build_workbook(pack, filled=False).save(os.path.join(out_dir, "starter.xlsx"))
    ref = os.path.join(out_dir, "reference.xlsx")
    build_workbook(pack, filled=True).save(ref)
    report = recalculate(ref)
    with open(os.path.join(out_dir, "key.json"), "w", encoding="utf-8") as fh:
        json.dump(pack, fh, indent=2, ensure_ascii=False)
    return pack, report


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--seed", type=int, default=1)
    ap.add_argument("--out", default=None)
    a = ap.parse_args()
    out = a.out or f"pack_seed_{a.seed}"
    pack, report = write_pack(a.seed, out)
    print(json.dumps({"out": out, "seed": a.seed, "recalc": report.get("status"),
                      "formulas": report.get("total_formulas"), "errors": report.get("total_errors")}))
