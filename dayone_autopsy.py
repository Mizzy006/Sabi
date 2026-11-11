#!/usr/bin/env python3
"""Day One autopsy v0 (Excel track): static checks, shock tests, defence questions.

  python dayone_autopsy.py --pack pack_seed_1 --student submission.xlsx [--json report.json]
  python dayone_autopsy.py --pack pack_seed_1 --selftest

What it does, in order (no LLM anywhere in this file):
  1. Static checks on the file: typed numbers, magic constants, constant-only formulas, unused inputs,
     macros, external links, hidden sheets, missing AI-use declaration.
  2. Shock tests: copy the file, change cells exactly as pack/key.json says, recalculate with LibreOffice,
     read the fixed Outputs layout, and compare with (a) the Python key and (b) metamorphic properties
     (direction, proportion bound, locality, budget compliance, rank-prefix rule).
  3. Findings -> up to three defence questions, each quoting a cell or number the code found.

Needs: openpyxl and LibreOffice (see dayone_generator.recalculate).
"""
import argparse
import json
import os
import re
import shutil
import tempfile
import zipfile

from openpyxl import load_workbook
from openpyxl.formula import Tokenizer
from openpyxl.formula.tokenizer import Token
from openpyxl.utils.cell import range_boundaries, get_column_letter

from dayone_generator import (INPUT_CELLS, DUTY_FIRST_ROW, OUT_SUMMARY, OUT_TABLE_FIRST, BRIEF_AI_CELL,
                              BRIEF_NOTES_CELL, MODEL_FIRST, MODEL_LAST, recalculate)

DATA_SHEETS = {"Brief", "Inputs", "Supplier_Prices", "Order_Plan"}   # everything else is the calculation zone
ALLOWED_NUMBERS = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 100, 1000}   # small ints, 100, 1000 (g->kg)
SEVERITY = {"EMPTY_OUTPUTS": 0, "CONSTRAINT": 1, "NO_RESPONSE": 2, "TYPED_NUMBER": 3, "MAGIC_CONSTANT": 4, "LOCALITY": 5,
            "OUTCOME_MISMATCH": 6, "SHOCK_OUTCOME_MISMATCH": 7, "INPUT_UNUSED": 8, "CONSTANT_FORMULA": 4,
            "PACKAGE": 0, "DECLARATION": 9}


# ------------------------------------------------------------------------------------------------
# 1. Static checks
# ------------------------------------------------------------------------------------------------

def _expand(rng):
    min_col, min_row, max_col, max_row = range_boundaries(rng.replace("$", ""))
    return {f"{get_column_letter(c)}{r}" for c in range(min_col, max_col + 1) for r in range(min_row, max_row + 1)}


def _names(wb):
    out = {}
    for name, dn in wb.defined_names.items():
        ref = dn.attr_text or ""
        if "!" in ref:
            sheet, rng = ref.rsplit("!", 1)
            out[name.upper()] = (sheet.strip("'"), _expand(rng))
    return out


def static_checks(path):
    findings, stats = [], {}
    with zipfile.ZipFile(path) as z:
        names = z.namelist()
    if any(n.endswith("vbaProject.bin") for n in names):
        findings.append({"code": "PACKAGE", "where": "file", "detail": "macros present (rejected)"})
    if any(n.startswith("xl/externalLinks/") for n in names):
        findings.append({"code": "PACKAGE", "where": "file", "detail": "external links present (rejected)"})

    wb = load_workbook(path)
    for ws in wb.worksheets:
        if ws.sheet_state != "visible":
            findings.append({"code": "PACKAGE", "where": ws.title, "detail": "hidden sheet"})
    names_map = _names(wb)
    typed, magic, const_formulas, referenced = [], [], [], set()
    for ws in wb.worksheets:
        if ws.title in DATA_SHEETS:
            continue
        for row in ws.iter_rows():
            for c in row:
                if c.value is None:
                    continue
                where = f"{ws.title}!{c.coordinate}"
                if c.data_type == "n":
                    typed.append((where, round(c.value, 2) if isinstance(c.value, float) else c.value))
                    continue
                if c.data_type != "f":
                    continue
                items = Tokenizer(c.value).items
                if not any(t.type == Token.OPERAND and t.subtype == Token.RANGE for t in items):
                    const_formulas.append((where, c.value))
                for i, t in enumerate(items):
                    if t.type == Token.OPERAND and t.subtype == Token.NUMBER:
                        v = float(t.value)
                        nxt = items[i + 1] if i + 1 < len(items) else None
                        if nxt is not None and nxt.type == Token.OP_POST and nxt.value == "%":
                            v /= 100
                        if v not in ALLOWED_NUMBERS:
                            magic.append((where, t.value + ("%" if v != float(t.value) else "")))
                    elif t.type == Token.OPERAND and t.subtype == Token.RANGE:
                        val = t.value
                        if val.upper() in names_map:
                            sheet, cells = names_map[val.upper()]
                            if sheet == "Inputs":
                                referenced |= cells
                        elif "!" in val:
                            sheet, rng = val.rsplit("!", 1)
                            if sheet.strip("'") == "Inputs":
                                try:
                                    referenced |= _expand(rng)
                                except Exception:
                                    pass
    for where, v in typed:
        findings.append({"code": "TYPED_NUMBER", "where": where, "detail": v})
    for where, v in magic:
        findings.append({"code": "MAGIC_CONSTANT", "where": where, "detail": v})
    for where, f in const_formulas:
        findings.append({"code": "CONSTANT_FORMULA", "where": where, "detail": f})
    for name, cell in INPUT_CELLS.items():
        if cell not in referenced:
            findings.append({"code": "INPUT_UNUSED", "where": f"Inputs!{cell}", "detail": name})
    duty_cells = {f"B{DUTY_FIRST_ROW + k}" for k in range(4)}
    if not (duty_cells & referenced):
        findings.append({"code": "INPUT_UNUSED", "where": f"Inputs!B{DUTY_FIRST_ROW}:B{DUTY_FIRST_ROW + 3}",
                         "detail": "duty rates"})
    brief = wb["Brief"] if "Brief" in wb.sheetnames else None
    ai = brief[BRIEF_AI_CELL].value if brief else None
    notes = brief[BRIEF_NOTES_CELL].value if brief else None
    if ai not in ("Yes", "No"):
        findings.append({"code": "DECLARATION", "where": f"Brief!{BRIEF_AI_CELL}", "detail": "AI-use declaration missing"})
    if not notes:
        findings.append({"code": "DECLARATION", "where": f"Brief!{BRIEF_NOTES_CELL}", "detail": "assumptions note empty"})
    stats = {"typed_numbers": len(typed), "magic_constants": len(magic), "constant_formulas": len(const_formulas),
             "unused_inputs": sum(1 for f in findings if f["code"] == "INPUT_UNUSED"),
             "ai_declared": ai, "notes_present": bool(notes)}
    return findings, stats


# ------------------------------------------------------------------------------------------------
# 2. Shock tests
# ------------------------------------------------------------------------------------------------

def read_outputs(path):
    wb = load_workbook(path, data_only=True)
    if "Outputs" not in wb.sheetnames:
        return {"summary": {k: None for k in OUT_SUMMARY}, "table": {}, "errors": ["Outputs sheet missing"]}
    ws = wb["Outputs"]
    summary = {k: ws[addr].value for k, addr in OUT_SUMMARY.items()}
    table = {}
    r = OUT_TABLE_FIRST
    while ws.cell(row=r, column=1).value:
        table[ws.cell(row=r, column=1).value] = {"landed": ws.cell(row=r, column=2).value,
                                                 "margin": ws.cell(row=r, column=3).value,
                                                 "ordered_qty": ws.cell(row=r, column=4).value}
        r += 1
    errors = [f"{s.title}!{c.coordinate}" for s in wb.worksheets for row in s.iter_rows() for c in row
              if isinstance(c.value, str) and c.value.startswith("#")]
    return {"summary": summary, "table": table, "errors": errors}


def run_variant(path, changes, workdir):
    tmp = os.path.join(workdir, "variant.xlsx")
    wb = load_workbook(path)
    for ch in changes:
        sheet, cell = ch["cell"].split("!")
        wb[sheet][cell].value = ch["new"]
    wb.save(tmp)
    recalculate(tmp)
    return read_outputs(tmp)


def _num(x):
    return isinstance(x, (int, float)) and not isinstance(x, bool)


def _close(field, a, e):
    if _num(a) and _num(e):
        if "margin" in field:
            return abs(a - e) <= 1e-6
        if field in ("skus_included", "flagged_count", "duplicate_rows", "ordered_qty"):
            return abs(a - e) < 0.5
        return abs(a - e) <= max(0.01, 1e-9 * abs(e))
    return a == e


def compare(actual, expected):
    bad = []
    for k, e in expected["summary"].items():
        if not _close(k, actual["summary"].get(k), e):
            bad.append({"field": k, "got": actual["summary"].get(k), "expected": e})
    for sku, row in expected["table"].items():
        a = actual["table"].get(sku)
        for f, e in row.items():
            if a is None or not _close(f, a.get(f), e):
                bad.append({"field": f"{sku}.{f}", "got": None if a is None else a.get(f), "expected": e})
    return bad


def _ratio(a, b):
    return a / b if _num(a) and _num(b) and b else None


def properties(shock, base, got, key):
    """Metamorphic checks that need no answer key: direction, proportion, locality, budget, rank prefix."""
    sid, res = shock["id"], []
    cat_of = {c["sku"]: c["cat"] for c in key["clean"]}
    key_base_landed = {s: base["table"].get(s, {}).get("landed") for s in cat_of}
    landed_ratio = {s: _ratio(got["table"].get(s, {}).get("landed"), key_base_landed.get(s))
                    for s in key_base_landed}
    ratios = [r for r in landed_ratio.values() if r is not None]
    n_changed = sum(1 for r in ratios if abs(r - 1) > 1e-9)

    def add(name, ok, detail):
        res.append({"property": name, "ok": bool(ok), "detail": detail})

    for ch in shock["changes"]:
        if ch["name"] == "FX_USD_NGN":
            bound = ch["new"] / ch["old"]
            add("fx_landed_up_within_bound", ratios and n_changed > 0 and all(1 - 1e-9 <= r <= bound + 1e-9 for r in ratios),
                f"{n_changed} of {len(ratios)} landed costs moved; allowed ratio 1 to {bound:.3f}")
        elif ch["name"] == "FREIGHT_USD_PER_KG":
            add("freight_landed_up", ratios and n_changed > 0 and all(r >= 1 - 1e-9 for r in ratios),
                f"{n_changed} of {len(ratios)} landed costs moved")
        elif ch["target"] == "duty":
            inside = [s for s in landed_ratio if cat_of[s] == ch["name"]]
            outside = [s for s in landed_ratio if cat_of[s] != ch["name"]]
            moved_in = [s for s in inside if landed_ratio[s] and landed_ratio[s] > 1 + 1e-9]
            moved_out = [s for s in outside if landed_ratio[s] and abs(landed_ratio[s] - 1) > 1e-9]
            add("duty_hits_only_its_category", len(moved_in) == len(inside) and not moved_out,
                f"{len(moved_in)} of {len(inside)} {ch['name']} SKUs rose; {len(moved_out)} other SKUs moved")
        elif ch["name"] == "BUDGET_CAP_NGN":
            cap = ch["new"]
            oc, hr = got["summary"]["ordered_cost"], got["summary"]["headroom"]
            ok_cap = _num(oc) and oc <= cap + 0.01 and _num(hr) and hr >= -0.01
            add("budget_respected", ok_cap,
                f"ordered cost {oc:,.0f} against cap {cap:,.0f}" if _num(oc) else f"ordered cost {oc} against cap {cap:,.0f}")
            inc = got["summary"]["skus_included"]
            add("fewer_skus_when_cap_cut", _num(inc) and inc <= base["summary"]["skus_included"],
                f"{inc} included now vs {base['summary']['skus_included']} before")
            inc_m = [v["margin"] for v in got["table"].values() if _num(v["ordered_qty"]) and v["ordered_qty"] > 0]
            exc_m = [v["margin"] for v in got["table"].values() if not (_num(v["ordered_qty"]) and v["ordered_qty"] > 0)]
            add("included_set_is_margin_prefix", (not inc_m or not exc_m or min(inc_m) >= max(exc_m)),
                "included SKUs are the highest-margin ones")
        elif ch["target"] == "shelf":
            s = ch["name"]
            m0, m1 = base["table"].get(s, {}).get("margin"), got["table"].get(s, {}).get("margin")
            others = [x for x in cat_of if x != s and abs((got["table"].get(x, {}).get("margin") or 0)
                                                           - (base["table"].get(x, {}).get("margin") or 0)) > 1e-9]
            add("shelf_cut_lowers_only_its_margin", _num(m0) and _num(m1) and m1 < m0 and not others,
                (f"{s} margin {m0:.4f} -> {m1:.4f}; {len(others)} other margins moved")
                if _num(m0) and _num(m1) else f"{s} margin missing or not numeric")
    return res


def shock_tests(path, key, workdir):
    base_got = run_variant(path, [], workdir)
    if all(v is None for v in base_got["summary"].values()):          # blank submission: skip the shocks
        return base_got, {"base": {"errors": base_got["errors"], "mismatches": [], "empty": True}, "shocks": {}}
    base_bad = compare(base_got, key["base"])
    results = {"base": {"errors": base_got["errors"], "mismatches": base_bad}, "shocks": {}}
    for s in key["shocks"]:
        got = run_variant(path, s["changes"], workdir)
        props = properties(s, base_got, got, key)
        bad = compare(got, s["expected"])
        results["shocks"][s["id"]] = {"label": s.get("label", s.get("name", s["id"])),
                                      "visible": s.get("visible", s["id"] == "S6_VISIBLE"), "properties": props,
                                      "mismatches": bad, "errors": got["errors"],
                                      "responsive": all(p["ok"] for p in props) and not got["errors"],
                                      "matches_key": not bad}
    return base_got, results


# ------------------------------------------------------------------------------------------------
# 3. Findings and defence questions
# ------------------------------------------------------------------------------------------------

def _worst_sku(mismatches):
    worst, rel = None, 0
    for m in mismatches:
        if m["field"].endswith(".landed") and _num(m["got"]) and _num(m["expected"]) and m["expected"]:
            d = abs(m["got"] - m["expected"]) / abs(m["expected"])
            if d > rel:
                worst, rel = m, d
    return worst


def collect_findings(static_f, results):
    out = list(static_f)
    if results["base"].get("empty"):
        out.append({"code": "EMPTY_OUTPUTS", "where": "Outputs", "detail": "no values in the Outputs summary"})
        return sorted(out, key=lambda f: SEVERITY.get(f["code"], 9))
    if results["base"]["errors"]:
        out.append({"code": "OUTCOME_MISMATCH", "where": "base", "detail": f"error cells: {results['base']['errors'][:3]}"})
    if results["base"]["mismatches"]:
        out.append({"code": "OUTCOME_MISMATCH", "where": "base", "detail": results["base"]["mismatches"]})
    for sid, r in results["shocks"].items():
        for p in r["properties"]:
            if not p["ok"]:
                code = ("CONSTRAINT" if p["property"] in ("budget_respected", "included_set_is_margin_prefix",
                                                          "fewer_skus_when_cap_cut")
                        else "LOCALITY" if "only" in p["property"] else "NO_RESPONSE")
                out.append({"code": code, "where": sid, "detail": p["detail"], "property": p["property"]})
        if r["properties"] and all(p["ok"] for p in r["properties"]) and not r["matches_key"]:
            out.append({"code": "SHOCK_OUTCOME_MISMATCH", "where": sid, "detail": r["mismatches"][:3]})
    return sorted(out, key=lambda f: SEVERITY.get(f["code"], 9))


def defence_questions(findings, key, limit=3):
    qs, seen = [], set()
    for f in findings:
        code = f["code"]
        if code in seen or code in ("PACKAGE", "DECLARATION"):
            continue
        if code == "EMPTY_OUTPUTS":
            q = "Your Outputs sheet is empty. What did you get done, and what stopped you finishing?"
        elif code == "CONSTRAINT":
            q = (f"After the shock '{f['where']}', your model breaks the budget rule ({f['detail']}). "
                 "Walk me through how your order rule decides which SKUs to leave out.")
        elif code == "NO_RESPONSE":
            q = (f"After the shock '{f['where']}', your outputs barely moved ({f['detail']}). "
                 "Which cells carry that input through your model?")
        elif code == "TYPED_NUMBER":
            q = (f"{f['where']} holds a typed number ({f['detail']}). What does it represent, "
                 "and why is it not a formula?")
        elif code == "MAGIC_CONSTANT":
            q = (f"The formula in {f['where']} contains the literal {f['detail']}. Where does it come from, "
                 "and what happens when that value changes?")
        elif code == "LOCALITY":
            q = f"In the shock '{f['where']}' the wrong SKUs moved ({f['detail']}). Why does your model link them?"
        elif code == "OUTCOME_MISMATCH":
            worst = _worst_sku(f["detail"]) if isinstance(f["detail"], list) else None
            if worst:
                sku = worst["field"].split(".")[0]
                q = (f"Your landed cost for {sku} is {worst['got']:,.0f} naira; the check gives "
                     f"{worst['expected']:,.0f}. Which cost components did you include, and in what order?")
            else:
                q = "Your base-case outputs differ from the check. Which assumption did you make that the brief did not state?"
        elif code == "INPUT_UNUSED":
            q = f"The input '{f['detail']}' feeds no formula. Is that deliberate?"
        else:
            continue
        seen.add(code)
        qs.append({"finding": code, "where": f["where"], "question": q})
        if len(qs) == limit:
            break
    return qs


def autopsy(student_path, pack_dir):
    key = json.load(open(os.path.join(pack_dir, "key.json"), encoding="utf-8"))
    static_f, stats = static_checks(student_path)
    workdir = tempfile.mkdtemp()
    try:
        base_got, results = shock_tests(student_path, key, workdir)
    finally:
        shutil.rmtree(workdir, ignore_errors=True)
    findings = collect_findings(static_f, results)
    shocks = results["shocks"]
    report = {
        "scores": {**stats,
                   "shocks_total": len(shocks),
                   "shocks_responsive": sum(1 for r in shocks.values() if r["responsive"]),
                   "shocks_matching_key": sum(1 for r in shocks.values() if r["matches_key"]),
                   "base_matches_key": (not results["base"].get("empty") and not results["base"]["mismatches"]
                                     and not results["base"]["errors"]),
                   "constraint_ok": not any(f["code"] == "CONSTRAINT" for f in findings)},
        "findings": findings, "base": results["base"], "shocks": shocks,
        "defence_questions": defence_questions(findings, key)}
    return report


# ------------------------------------------------------------------------------------------------
# Self-test: the reference must pass; four deliberately broken copies must be caught
# ------------------------------------------------------------------------------------------------

def make_variants(pack_dir, workdir):
    key = json.load(open(os.path.join(pack_dir, "key.json"), encoding="utf-8"))
    ref = os.path.join(pack_dir, "reference.xlsx")
    refv = load_workbook(ref, data_only=True)
    out = {}
    shutil.copy(ref, p := os.path.join(workdir, "A_reference.xlsx"))
    out["A_reference"] = p

    wb = load_workbook(ref)                       # B: pasted values (typed numbers everywhere)
    for r in range(MODEL_FIRST, MODEL_LAST + 1):
        wb["Model"][f"N{r}"].value = refv["Model"][f"N{r}"].value
    for addr in list(OUT_SUMMARY.values()):
        wb["Outputs"][addr].value = refv["Outputs"][addr].value
    for r in range(OUT_TABLE_FIRST, OUT_TABLE_FIRST + 12):
        for col in "BCD":
            wb["Outputs"][f"{col}{r}"].value = refv["Outputs"][f"{col}{r}"].value
    wb.save(p := os.path.join(workdir, "B_pasted_values.xlsx"))
    out["B_pasted_values"] = p

    wb = load_workbook(ref)                       # C: FX and margin typed inside formulas
    fx, tm = key["inputs"]["FX_USD_NGN"], key["inputs"]["TARGET_MARGIN"]
    for r in range(MODEL_FIRST, MODEL_LAST + 1):
        wb["Model"][f"G{r}"].value = f"=E{r}*{fx}"
        wb["Model"][f"H{r}"].value = f"=F{r}*FREIGHT_USD_PER_KG*{fx}"
        wb["Model"][f"O{r}"].value = f"=N{r}/(1-{tm})"
    wb.save(p := os.path.join(workdir, "C_magic_constants.xlsx"))
    out["C_magic_constants"] = p

    wb = load_workbook(ref)                       # D: order flags typed, everything else live
    for r in range(MODEL_FIRST, MODEL_LAST + 1):
        wb["Model"][f"W{r}"].value = refv["Model"][f"W{r}"].value
    wb.save(p := os.path.join(workdir, "D_typed_order_flags.xlsx"))
    out["D_typed_order_flags"] = p
    return out


def selftest(pack_dir):
    workdir = tempfile.mkdtemp()
    summary = {}
    for name, path in make_variants(pack_dir, workdir).items():
        rep = autopsy(path, pack_dir)
        summary[name] = {"scores": rep["scores"], "top_findings": [f"{f['code']} {f['where']}" for f in rep["findings"][:6]],
                         "defence_questions": rep["defence_questions"]}
    shutil.rmtree(workdir, ignore_errors=True)
    return summary


if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--pack", required=True)
    ap.add_argument("--student")
    ap.add_argument("--json")
    ap.add_argument("--selftest", action="store_true")
    a = ap.parse_args()
    result = selftest(a.pack) if a.selftest else autopsy(a.student, a.pack)
    text = json.dumps(result, indent=2, ensure_ascii=False, default=str)
    if a.json:
        open(a.json, "w", encoding="utf-8").write(text)
    print(text)
