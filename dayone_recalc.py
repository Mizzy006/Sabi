#!/usr/bin/env python3
"""Multi-backend Excel recalculation bridge for Day One.

Recalculates a .xlsx workbook in place and returns a JSON-serialisable report.

Backend priority:
  1. Microsoft Excel COM automation (Windows only, via pywin32) — full fidelity.
  2. Headless LibreOffice (`soffice --headless --calc`) — cross-platform fallback.
  3. External script pointed to by the DAYONE_RECALC environment variable.

Usage as a module:
    from dayone_recalc import recalculate
    report = recalculate("path/to/workbook.xlsx")

Usage from the command line:
    python dayone_recalc.py workbook.xlsx [--timeout 120] [--json report.json]
"""
import argparse
import json
import os
import platform
import shutil
import subprocess
import sys
import tempfile
import time


# ---------------------------------------------------------------------------
# Backend 1: Microsoft Excel COM (Windows)
# ---------------------------------------------------------------------------

def _recalc_excel_com(path, timeout=120):
    """Recalculate via Excel COM automation.  Requires pywin32."""
    import pythoncom
    import win32com.client

    abs_path = os.path.abspath(path).replace("/", "\\")
    pythoncom.CoInitialize()
    excel = None
    wb = None
    try:
        excel = win32com.client.DispatchEx("Excel.Application")
        excel.Visible = False
        excel.DisplayAlerts = False
        excel.AskToUpdateLinks = False
        excel.ScreenUpdating = False

        wb = excel.Workbooks.Open(abs_path, UpdateLinks=0, ReadOnly=False)

        # Force a full recalculation (equivalent to Ctrl+Shift+F9)
        excel.CalculateBeforeSave = True
        wb.Application.CalculateFull()

        # Gather stats
        total_formulas = 0
        total_errors = 0
        sheet_stats = {}
        for ws in wb.Worksheets:
            used = ws.UsedRange
            if used is None:
                sheet_stats[ws.Name] = {"formulas": 0, "errors": 0}
                continue
            f_count = 0
            e_count = 0
            try:
                cells_with_formulas = used.SpecialCells(
                    -4123  # xlCellTypeFormulas
                )
                f_count = cells_with_formulas.Count
            except Exception:
                pass  # No formulas on this sheet
            try:
                cells_with_errors = used.SpecialCells(
                    -4123,  # xlCellTypeFormulas
                    16,     # xlErrors
                )
                e_count = cells_with_errors.Count
            except Exception:
                pass
            sheet_stats[ws.Name] = {"formulas": f_count, "errors": e_count}
            total_formulas += f_count
            total_errors += e_count

        wb.Save()
        wb.Close(SaveChanges=False)
        wb = None
        return {
            "status": "success",
            "backend": "excel_com",
            "total_formulas": total_formulas,
            "total_errors": total_errors,
            "sheets": sheet_stats,
        }
    except Exception as exc:
        if wb is not None:
            try:
                wb.Close(SaveChanges=False)
            except Exception:
                pass
        raise RuntimeError(f"Excel COM recalculation failed: {exc}") from exc
    finally:
        if excel is not None:
            try:
                excel.Quit()
            except Exception:
                pass
        pythoncom.CoUninitialize()


def _excel_com_available():
    """Return True if pywin32 and Excel COM are usable."""
    if platform.system() != "Windows":
        return False
    try:
        import pythoncom        # noqa: F401
        import win32com.client  # noqa: F401
        return True
    except ImportError:
        return False


# ---------------------------------------------------------------------------
# Backend 2: Headless LibreOffice
# ---------------------------------------------------------------------------

def _find_soffice():
    """Return the soffice executable path or None."""
    if shutil.which("soffice"):
        return "soffice"
    candidates = [
        r"C:\Program Files\LibreOffice\program\soffice.exe",
        r"C:\Program Files (x86)\LibreOffice\program\soffice.exe",
        "/usr/bin/soffice",
        "/usr/local/bin/soffice",
        "/snap/bin/soffice",
    ]
    for c in candidates:
        if os.path.isfile(c):
            return c
    return None


def _recalc_libreoffice(path, timeout=120):
    """Recalculate via headless LibreOffice."""
    soffice = _find_soffice()
    if soffice is None:
        raise RuntimeError("LibreOffice (soffice) not found on this system")
    abs_path = os.path.abspath(path)
    outdir = tempfile.mkdtemp()
    try:
        subprocess.run(
            [soffice, "--headless", "--calc", "--convert-to", "xlsx", "--outdir", outdir, abs_path],
            check=True,
            timeout=timeout,
            capture_output=True,
        )
        converted = os.path.join(outdir, os.path.basename(abs_path))
        if not os.path.isfile(converted):
            raise RuntimeError("LibreOffice did not produce an output file")
        shutil.move(converted, abs_path)
        return {"status": "success", "backend": "libreoffice"}
    finally:
        shutil.rmtree(outdir, ignore_errors=True)


# ---------------------------------------------------------------------------
# Backend 3: External script (DAYONE_RECALC env var)
# ---------------------------------------------------------------------------

def _recalc_external(path, timeout=120):
    script = os.environ.get("DAYONE_RECALC", "")
    if not script or not os.path.isfile(script):
        raise RuntimeError(f"External recalc script not found: {script!r}")
    r = subprocess.run(
        [sys.executable, script, path, str(timeout)],
        capture_output=True,
        text=True,
        timeout=timeout + 30,
    )
    try:
        out = json.loads(r.stdout)
    except json.JSONDecodeError:
        raise RuntimeError(f"External recalc failed: stdout={r.stdout[-300:]} stderr={r.stderr[-300:]}")
    if "error" in out:
        raise RuntimeError(out["error"])
    out.setdefault("backend", "external_script")
    return out


# ---------------------------------------------------------------------------
# Public API
# ---------------------------------------------------------------------------

def recalculate(path, timeout=120):
    """Recalculate the workbook at *path* in place and return a report dict.

    Uses an isolated worker process for Windows COM apartment safety and thread-isolation.
    """
    # If already running inside worker subprocess, execute COM directly
    if os.environ.get("_DAYONE_RECALC_WORKER") == "1":
        if _excel_com_available():
            return _recalc_excel_com(path, timeout)
        ext = os.environ.get("DAYONE_RECALC", "")
        if ext and os.path.isfile(ext):
            return _recalc_external(path, timeout)
        return _recalc_libreoffice(path, timeout)

    # Spawn dedicated process for COM apartment isolation
    this_script = os.path.abspath(__file__)
    cmd = [sys.executable, this_script, os.path.abspath(path), "--timeout", str(timeout)]
    env = os.environ.copy()
    env["_DAYONE_RECALC_WORKER"] = "1"
    try:
        proc = subprocess.run(
            cmd,
            capture_output=True,
            text=True,
            timeout=timeout + 30,
            env=env,
        )
        if proc.returncode == 0:
            out_str = proc.stdout.strip()
            # Extract JSON from output
            brace_start = out_str.find("{")
            brace_end = out_str.rfind("}")
            if brace_start != -1 and brace_end != -1:
                return json.loads(out_str[brace_start:brace_end + 1])
    except Exception:
        pass

    # Direct fallback if subprocess spawning fails
    if _excel_com_available():
        return _recalc_excel_com(path, timeout)
    ext = os.environ.get("DAYONE_RECALC", "")
    if ext and os.path.isfile(ext):
        return _recalc_external(path, timeout)
    return _recalc_libreoffice(path, timeout)


# ---------------------------------------------------------------------------
# CLI
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("path", help="Path to .xlsx file to recalculate")
    ap.add_argument("--timeout", type=int, default=120)
    ap.add_argument("--json", dest="json_out", help="Write report to this file")
    a = ap.parse_args()

    report = recalculate(a.path, a.timeout)
    text = json.dumps(report, indent=2, ensure_ascii=False)
    if a.json_out:
        with open(a.json_out, "w", encoding="utf-8") as fh:
            fh.write(text)
    print(text)

