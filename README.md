# 🎓 Sabi

**Show you sabi: verified proof of what a graduate can actually do.**

Sabi (Pidgin for "to know, to be skilled") turns practice, projects and real tasks into proof of capability that employers can trust and that is hard to fake with AI. Built for cheap Android phones, patchy data and power cuts.

> **Design principle: Code decides, the LLM narrates.** Truth comes from deterministic code — dataset generators, answer keys, formula-graph auditors, constraint solvers and cryptographic signatures. The LLM handles language only: persona chat, transcripts, brief writing, and classification against a closed label set at temperature 0.

---

## Architecture

```
Radar (direction) → Planner (path) → Arena & Day One (practice)
       ↓                                       ↓
  Curriculum Gap                      Deterministic Autopsy
   Heatmap                           + Targeted Defence
       ↓                                       ↓
  Department View                     Evidence Brief (signed)
                                              ↓
                                      Employer View (blind)
                                      + QR Verification
```

### The Capability Ladder

| Stage | Tier | Mechanism | Cap |
|:------|:-----|:----------|:----|
| University Education | **Taught** | Radar curriculum mapping | Baseline |
| Practical Capability | **Tier A** | Day One autopsy + defence | Working (auto-verified) |
| Workplace Readiness | **Tier B** | Mentor/SME review | Strong |
| First Job | **Tier C** | Sponsor attestation | Hired |

---

## Components

| File | Purpose | Lines |
|:-----|:--------|------:|
| `dayone_generator.py` | Seeded pack generator: starter workbook, reference solution, answer key | 610 |
| `dayone_recalc.py` | Multi-backend recalculation bridge (Excel COM / LibreOffice, subprocess isolation) | 240 |
| `dayone_autopsy.py` | Deterministic autopsy: static checks, shock tests, defence questions | 431 |
| `dayone_defence.py` | Targeted defence engine: formula-graph claim checker, LLM persona | 1120 |
| `sabi_verify.py` | Evidence Brief: SHA-256 signing, blind mode, QR codes, HTML rendering | 710 |
| `sabi_planner.py` | Constraint-optimised learning path (PuLP ILP solver) | 350 |
| `sabi_radar.py` | Employer demand vs curriculum gap analysis & cohort funnel | 340 |
| `sabi_sme.py` | SME voice-note pipeline: PII detection, masking, brief extraction | 480 |
| `sabi_server.py` | Unified FastAPI server & SPA backend delivering 4 stakeholder portals | 410 |
| `templates/index.html` | Modern, responsive, low-bandwidth multi-portal SPA dashboard | 370 |
| `static/sabi.js` | Client-side reactive interaction controller (zero build steps) | 390 |
| `static/sabi.css` | Nigerian styling accents, pulse indicators & low-data styles | 75 |
| `tests.py` | Comprehensive test suite (43/43 passing) | 415 |

---

## Quick Start

### Prerequisites

- Python 3.10+
- Microsoft Excel (Windows) **or** LibreOffice (Linux/Mac) for workbook recalculation

### Install

```bash
pip install openpyxl pywin32 pydantic fastapi uvicorn pulp qrcode[pil] groq
```

### Frontend workspace

The standard workspace shell, candidate pipeline, skills diagnostic, open challenges, My Learning, Tasks & SME Studio, and Talent Insights use React. The data-saver mode keeps the lightweight HTML fallback, uses a compact system-font layout, and does not request the React bundle or full-mode fonts. Employer task data loads when its tab opens, and sample voice audio waits for an explicit play action. Switching modes reloads the current route so each mode gets the correct UI and assets. Rebuild the local production assets after changing React components or styles:

```bash
cd frontend
npm ci
npm run build
```

The build writes the self-hosted bundle to `static/react/`. Node is needed for frontend development; the running FastAPI app serves the built assets directly.

### Generate a Pack & Run the Self-Test

```bash
# Generate a seed-1 scenario pack (starter + reference + key)
python dayone_generator.py --seed 1 --out pack_seed_1

# Run the autopsy self-test (reference vs 3 deliberate defect variants)
python dayone_autopsy.py --pack pack_seed_1 --selftest --json selftest_report.json
```

### Run Individual Components

```bash
# Defence engine demo (mock LLM, no API key needed)
python dayone_defence.py

# Evidence Brief generation
python sabi_verify.py

# Planner: 6-week learning path under constraints
python sabi_planner.py --hours 10 --mb 500 --weeks 6 --replan-mb 200

# Radar: curriculum gap analysis
python sabi_radar.py --department Economics

# SME voice-note pipeline
python sabi_sme.py --demo
```

### Launch the Full Web Application

```bash
python sabi_server.py
# → http://localhost:8000      (Full interactive SPA dashboard)
# → http://localhost:8000/docs (Swagger API interactive docs)
```

The web dashboard is a mobile-first, low-bandwidth (<150KB) single-page application serving 4 interactive stakeholder portals:
- 🎓 **Student Portal**: Constraint-based study path planner (PuLP solver), Day One starter pack generator & download, drag-and-drop workbook autopsy with 6 metamorphic shock invariant tests, live Mrs. Bello conversational defence chat, and tamper-evident Evidence Brief card.
- 💼 **Employer Portal**: Blind-first candidate pipeline (pedigree-stripped: hides name, school, and gender to eliminate hiring bias), verified capability tags, shock survival metrics, and 1-click links to cryptographic proofs.
- 📡 **Radar Analytics**: Department-level curriculum vs employer demand gap analysis matrix, top skill discrepancies, and leaky cohort capability funnels (Taught → Practiced → Proven).
- 🏢 **SME Rails**: Voice-note & chat transcript intake from Nigerian business owners, side-by-side Nigerian PII redaction shield (masks phones, BVNs, NINs, emails, addresses, names), and structured micro-project brief extraction.

### Run Tests

```bash
python -m pytest tests.py -v
```

---

## API Endpoints

| Method | Path | Description |
|:-------|:-----|:------------|
| `GET` | `/` | Interactive multi-portal dashboard SPA |
| `GET` | `/verify/{brief_id}` | Public tamper-evident verification page |
| `POST` | `/api/dayone/pack/generate` | Generate a starter workbook pack |
| `GET` | `/api/dayone/pack/{seed}/download` | One-click download starter pack (.xlsx) |
| `POST` | `/api/dayone/submit` | Upload .xlsx, run full metamorphic autopsy |
| `POST` | `/api/dayone/submit/demo` | Run autopsy directly on reference pack (1-click demo) |
| `POST` | `/api/dayone/defence/start` | Start targeted defence session with Mrs. Bello |
| `POST` | `/api/dayone/defence/answer` | Submit defence explanation (formula-graph verified) |
| `POST` | `/api/planner/solve` | Optimise a learning plan under hours/MB constraints |
| `GET` | `/api/radar/heatmap` | Curriculum gap analysis & cohort capability funnels |
| `POST` | `/api/sme/process` | Mask Nigerian PII & extract structured SME brief |
| `GET` | `/api/candidates` | Candidate pipeline pool (blind or unblinded view) |

---

## Day One: How It Works

1. **Chaos Sprint.** Student downloads a ~2 MB offline pack (messy dataset + brief). Mid-task, a shock arrives (FX devaluation, budget cut). The student adapts and resubmits.

2. **Deterministic Autopsy.** Code inspects the file before any LLM:
   - Typed numbers where formulas belong
   - Magic constants hardcoded inside formulas
   - Shock response: outputs must move when inputs change
   - Metamorphic invariants: direction, locality, constraint compliance

3. **Targeted Defence.** A skeptical CFO persona asks 3 questions generated from the autopsy findings. Claims like "N6 depends on FX_USD_NGN" are verified against the formula graph by code.

4. **Evidence Brief.** Signed with SHA-256, blind mode by default. Employers scan a QR code to verify.

---

## Honest Framing

- This is **not unfakeable**. It raises the cost of faking until honest practice is the cheapest route.
- Tier A (auto-verified) is **capped at "Working"**. "Strong" always requires a human (Tier B+).
- AI use is **allowed and disclosed**. The engine tests the artifact and the person, whoever built the file.
- **Automated Excel grading is not new** ([Frost et al. 2018](https://aisel.aisnet.org/siged2018/6)). What Day One adds: shocks the student must survive, a defence driven by the findings, and employer-facing evidence.

---

## Prior Art

- [Frost, Kenyo and Matta (2018)](https://aisel.aisnet.org/siged2018/6) — Automated grading in Excel
- [University of Pretoria case study](https://zenodo.org/records/11658240/files/paper_4883.pdf) — Limitations of publisher grading tools
- [Pearson MyLab IT NextGen](https://www.pearson.com/en-us/higher-education/products-services/mylab/it.html) — Per-student variation in live Office 365

---

## License

Hackathon project — all rights reserved. Contact for collaboration.

