# Sabi: Product Blueprint

*Working title · v0.2 · University-to-Work Gap hackathon · 3 November 2026*

## 1. The concept

Sabi (Pidgin for “to know, to be skilled”) turns practice, projects and real tasks into proof of capability that employers can trust and that is hard to fake with AI. It follows the hackathon’s own chain, University Education → Practical Capability → Workplace Readiness → First Job, as a ladder of verified evidence, built for cheap Android phones, patchy data and power cuts. Its artifact engine, Day One, tests the real work product: it shocks the file, audits it with code, and questions the student on what the code found.

**The insight.** The degree no longer separates candidates, and AI-polished CVs make text signals worse. A Nigeria-focused analysis reports that employers rank soft skills (communication, teamwork, adaptability) above technical ones and that graduates tend to overrate their readiness, and it urges hiring on demonstrated skills rather than credentials alone. The bottleneck is a cheap, trustworthy signal of capability. Sabi builds it.

**One-line pitch.** Show you sabi: verified proof of what a graduate can actually do.

**Who gets what**

- Students (free): a personalised path, phone-based practice, and a shareable Evidence Brief.
- Employers and sponsors (pay): evidence-based screening for high-volume entry-level roles, and a way to post real problems.
- Departments: a live map of where the curriculum meets and misses the market, and final-year projects turned into real work.
- Mentors: 10-minute reviews that open doors for the next cohort.

## 2. How the ideas combine

Everything feeds or consumes one object, the **Evidence Brief**: a verified, employer-readable record of one skill claim, the work behind it, and how it was checked.

- **Radar (direction)**, from Gap Radar: what Nigerian employers actually ask for at entry level, mapped against a department’s course outlines.
- **Planner (path)**, from the ₦/MB planner: a constraint-optimised plan that closes each student’s gaps within their real hours, data, device and power.
- **Arena (practice)**, from Catch the Bot: role scenarios with planted errors, mid-task twists and behaviour scoring, in chat mode on any phone and in artifact mode through Day One.
- **Verify (trust)**, from Proof that survives AI: explain-back, calibration, trust tiers and signed briefs.
- **Real-Work Rails (experience)**, from Capstone Rewire and SME voice-note briefs: sponsored final-year projects and SME micro-projects share one brief format and produce higher-trust evidence.

**Day One (artifact engine)**, from the DayOne concept: the artifact mode of Arena and a stronger Verify layer. It shocks a real work file, audits it with code and questions the student on the findings (section 5).

**The Capability Ladder** (one-to-one with the hackathon chain)

- Taught (University Education): the curriculum covers the skill, measured by Radar’s curriculum map.
- Practiced (Practical Capability), Tier A: Arena scenarios completed, auto-verified.
- Reviewed (Workplace Readiness), Tier B: a mentor confirmed the work, or an SME micro-project was delivered with the owner’s reference.
- Proven (First Job), Tier C: a capstone, internship or paid job attested by a sponsor. Outcome: hired.

**The flywheel.** Radar sets targets → Planner picks the path → Arena and Rails produce work → Verify turns it into evidence → employers use it → hiring outcomes and feedback refine Radar’s weights and the scenarios.

**Design principle: code decides, the LLM narrates.** Truth comes from code: the dataset generator and answer key, the optimiser, the scoring functions and the signed evidence. The LLM handles language only: persona chat, transcripts, brief writing, explanations, and classification against a closed label set. That keeps it cheap, auditable and resistant to hallucinated grading, and it is the clearest contrast with an LLM wrapper.

## 3. The student journey

1. Join through a Telegram link (WhatsApp next). Consent screen first.
2. Pick a target role (start with Junior Data Analyst). A 10-minute diagnostic scenario sets the baseline.
3. Planner returns a six-week plan under their constraints: hours per week, MB per week, device, power.
4. Run a scenario: predict → manager brief → clarify → work → submit → review the AI colleague’s draft → mid-task twist → explain-back.
5. See the calibration reveal (predicted vs actual), privately first, then get a Tier A Evidence Brief with a link and QR code.
6. Climb: claim an SME micro-project or capstone brief for Tier B or C evidence, then share briefs with employers or take their screening links.

In artifact mode (Day One), step 4 becomes: download the pack, build the file, absorb the shock, upload, then face the defence (section 5).

## 4. Arena, chat mode (works on any phone)

Arena has two modes. This section covers chat mode; Day One (section 5) covers artifact mode and is the deep track to build first.

**A scenario template defines:** role and skill tags (Radar IDs); a time box (about 40 minutes); personas with communication styles and knowledge boundaries; a dataset spec; planted data flaws; deliberate ambiguities; timed or event-based injects; the AI colleague’s draft as numbered claims; explain-back items; and a scoring rubric.

**Per-student instances.** Each student gets a unique instance from a random seed: different numbers, names, dates and error positions, with the answer key computed from that seed. Sharing answers in a WhatsApp group then fails by design.

**Planted-error taxonomy (start here, extend with mentors):** duplicate or double-synced records inflating totals; unit or currency mismatch (kobo vs naira, ₦ vs $); date-window or time-zone off-by-one; wrong denominator or an average of averages; returns treated as sales; unsupported causal claims; selection or survivorship bias; a number in the draft that is not in the data; personal data pasted into a report.

**Scoring (starting weights, tune after the pilot)**

- Error detection, 30%: precision and recall of flagged claims against the planted set, plus whether the stated reason matches the true error class (closed-label classification).
- Deliverable accuracy, 30%: submitted figures vs the computed key within tolerance, and whether flagged data issues were handled.
- Behaviour, 20%, from the event log: asked a clarifying question before submitting, aimed at a planted ambiguity; stated assumptions; raised a risk or blocker; handled the conflicting inject by asking for priorities. Score clarity, never accent or grammar, so Nigerian English and Pidgin are not penalised.
- Explain-back, 20%: three questions, 60 to 90 seconds each, by voice note or text. At least one is a counterfactual with a computed answer, such as whether a store’s total goes up or down, and roughly by how much, if its duplicate invoices are removed.
- Understanding gate: below a floor on explain-back, nothing above Emerging is awarded.
- Calibration: the student predicts how many errors they will catch; track the gap to actual across scenarios.
- Levels, not raw scores: Emerging, Working, Strong. Auto-verified evidence caps at Working; Strong needs human verification (Tier B or above).

**First scenario: Month-End Sales (data analyst)**

- A fictional Nigerian retail chain, a few thousand POS rows across five stores. Planted flaws: duplicate transaction IDs from a double-synced POS, mixed date formats, one store reporting in kobo, returns recorded as positive sales, inconsistent state spellings, a keying-error outlier.
- The manager’s voice note asks for net revenue by store and the top five products by 4pm; “net” is left ambiguous on purpose.
- The AI colleague’s draft has ten numbered claims and four or five planted errors, including an unsupported “the promo drove growth”.
- Mid-task inject: the deadline moves up and a split by payment method is added.
- Skills evidenced: data cleaning, aggregation accuracy, assumption management, stakeholder communication, AI-output verification.

## 5. Day One: the artifact engine

Day One is the artifact mode of Arena, and the deep track to build first. The student builds a real work file; the engine shocks it, audits it with code, then questions the student on what the code found.

It is the DayOne concept folded into Sabi. Day One is the engine; Sabi supplies the pathway: Radar, Planner, Real-Work Rails, the employer view and the Evidence Brief.

**How it runs**

1. **Chaos Sprint.** The student downloads a small offline pack (target about 2 MB) built from their own seed: a messy dataset or template workbook plus a manager brief. At a set time a shock arrives as a small patch file or message: an FX move, a supplier delay, a 25% budget cut or a corrupted column. The student adapts the file and resubmits.
2. **Deterministic autopsy.** Code inspects the uploaded file before any LLM sees it and scores structure, shock survival, constraint compliance and outcome against a computed key.
3. **Targeted defence.** A domain persona asks three questions generated from the autopsy findings. The student answers in about three minutes by voice note or text, and code checks any claim about the file against its formula graph.

**Tracks**

| Track | Artifact | Deterministic checks | Persona | Status |
| --- | --- | --- | --- | --- |
| Finance and Economics | Multi-tab Excel cashflow or landed-cost model | Formula graph audit, typed numbers, magic constants, shock response | Skeptical company CFO | Deep track, build first |
| Operations and Engineering | Supply routing and inventory sheet | Constraint and bottleneck check after the shock, same formula audit | Regional operations director | Second template on the same engine |
| Data Science and CS | Seeded SQL database; notebooks get static checks only | Results vs key on main and perturbed data, join fan-out, NULL handling, hard-coded filters | Lead data scientist | Thin track if time allows |
| Marketing and Business | Cohort funnel and ad-spend sheet | Unit economics, CAC payback arithmetic, shock response | VP of Growth | Slide only |

**Excel autopsy (deep track).** The file is template-bound: the pack ships an Inputs sheet, a marked calculation zone and an Outputs sheet, so the engine knows which cells to change and where results live.

| Check | What it tests | Method |
| --- | --- | --- |
| Typed numbers | A number typed where the template expects a formula | Compare calculation-zone cells with the template’s formula map |
| Magic constants | A literal such as 1.075 inside a formula instead of a referenced input | Tokenise formulas with openpyxl |
| Shock response | Outputs move in the expected direction and proportion when an input changes | Perturb Inputs, recalculate, compare with the computed key |
| Constraint compliance | Budget or capacity limits still hold after the shock | Recalculate and test against the limits |
| Reference integrity | Broken links, error values, circular references | Walk the formula graph |

Shock tests are metamorphic tests: the engine does not need one right answer, only to know how outputs should respond. Briefs with several valid answers still score fairly.

**Engine constraints**

- openpyxl never evaluates formulas, so the shock test needs a recalculation engine: headless LibreOffice, or a Python evaluator such as PyCel ([openpyxl maintainer](https://groups.google.com/g/openpyxl-users/c/GbBOnOa8g7Y)). Expect seconds per file and limited function coverage, so test the template’s functions before locking the scenario.
- Never open macros. Reject .xlsm, strip external links, and run recalculation and SQL in a sandbox with no network and time and memory limits.
- Notebooks get static checks only (execution order, unrun cells, obvious leakage such as scaling before the split), because running student code is the riskiest step.
- The offline pack carries no shock, so the patch arrives at a set time. Every pack comes from a per-student seed.

**Defence design.** The persona is skeptical but fair, and every question comes from a finding.

- Typical questions: “D14 is a typed 0.18. Why not a referenced input?” and “After the FX move, landed cost did not change. What did you link?”
- Claim check: when the student says a cell depends on an input, or that a total includes freight, code checks the formula graph and flags contradictions.
- Scoring: four outcome classes (acknowledged and fixed, defended with valid reasoning, rationalised, could not explain), classified against a closed label set, with mentor spot-checks and the same understanding gate as Arena.
- Fairness: three minutes, voice or text; score reasoning, never accent or grammar.

**First scenario: landed cost for a Lagos retailer.** The manager asks for a landed-cost and margin model for imported products under a budget cap. The template has an Inputs sheet (FX rate, freight, duty, margin target, budget cap), a calculation zone and an Outputs sheet. The supplier price list is messy: mixed currencies, duplicate SKUs, numbers stored as text.

Shock 1 moves the FX rate by a set percentage. Shock 2 cuts the budget cap by 25% or slips a shipment by a month. The checks run after each shock, then the persona asks three questions.

**Two modes, one Evidence Brief.** Chat mode (section 4) works on any phone. Artifact mode needs a laptop, a lab or a café session, so keep both. Artifact signals strengthen Tier A evidence, and chat mode keeps the path open for students without a laptop.

**Prior art, and claims to avoid**

- Automated Excel grading is not new. [Frost, Kenyo and Matta (2018)](https://aisel.aisnet.org/siged2018/6) say so and name open-ended tasks with several valid answers as a hurdle. A [University of Pretoria case study](https://zenodo.org/records/11658240/files/paper_4883.pdf) lists publisher tools such as SAM, SIMnet and Pearson’s MyAccountingLab, reports that buying them was prohibitive, and notes that complex formulas still needed manual marking.
- Per-student variation is not new either. Pearson’s [MyLab IT NextGen](https://www.pearson.com/en-us/higher-education/products-services/mylab/it.html) runs Grader projects live in Microsoft 365 with different starting values per student, alongside Credly badges and Forage simulations.
- What Day One adds: shocks the student must survive, a defence driven by the findings, employer-facing evidence, and offline, low-cost, local delivery. Say this, and name the prior art in the pitch.
- Do not claim “100% deterministic.” Say deterministic wherever the truth is computable, with a bounded LLM for language.
- Do not claim to detect AI use. A typed number shows sloppy modelling, not authorship, and AI tools now write live formulas. Say the engine tests the artifact and the person, whoever built the file.
- Do not claim to cover every faculty. Claim artifact-based entry-level roles in data, finance, operations and marketing, on a plug-in engine with two tracks working.

Template, generator and shock spec for the first track: Landed-cost spec

## 6. Verify: trust tiers and integrity

**Evidence Brief contents:** alias and target role (blind mode hides name, school and gender indicators); skill claims with level and tier; artifact references; verification signals (errors caught vs flagged, deliverable accuracy, behaviour checklist, explain-back result, process summary, integrity flags); attestations from a mentor, SME owner or sponsor; scenario version and instance-seed hash; a SHA-256 hash and signature; a public verification URL and QR code; and a short note on what the brief does not claim.

**Integrity measures:** per-student instances and a time box; voice-first explain-back with a computed counterfactual; process traces and cross-student similarity checks; AI use allowed but disclosed, because understanding is what gets verified; random mentor spot-checks and a 10-minute live check for Tier B.

**Honest framing:** this is not unfakeable. It raises the cost of faking until honest practice is the cheapest route, and the tiers make sure the highest-trust evidence always involves a human.

**Added with Day One.** Artifact-mode briefs also carry shocks survived (for example 2 of 2), typed numbers found in the calculation zone, constraint compliance after the shock, and the defence outcome with claim-check results. Shock tests do not depend on who built the file, and defence claims are checked against the formula graph. Validate the autopsy against blind mentor ratings before trusting its flags (section 13).

## 7. Radar and Planner

**Radar**

- Collect 200 to 300 entry-level postings for one or two role families (data analyst first). Check each source’s terms, sample by hand or use permitted exports, and store only URL, date, location and requirement text.
- Hold 5 to 10 short employer interviews for what postings leave out: why juniors get rejected, what the best junior did in their first 30 days, what proof they would trust.
- Build a skills taxonomy of about 100 skills, extract skills from postings with LLM-assisted mapping, and hand-label 50 postings to report extraction accuracy.
- Map a department’s course outlines to the same skill IDs. Outputs: a skills-by-courses heatmap, gaps ranked by employer demand, and the Taught → Practiced → Proven funnel for the pilot cohort.

**Planner**

- Inputs: target role and skill weights from Radar, diagnostic baseline, weekly hours, weekly MB, device, offline-only flag, deadline in weeks, language.
- A curated resource library (30 to 60 items for the MVP) tagged with skills, level, hours, MB, offline availability, language and cost in ₦.
- Solver: integer programming (OR-Tools CP-SAT or PuLP) maximising demand-weighted skill gain, subject to hours, MB, prerequisites, a cap on new skills per week, and an Arena scenario every two weeks.
- The LLM explains the plan and re-triggers the solver when constraints change (“I only have 200 MB this week”).
- Signature metric: the cost to close a skill gap in ₦ and MB. Gain estimates are priors that update with Arena results; say so openly.

## 8. Real-Work Rails

**SME voice-note briefs**

1. The owner sends a two-minute voice note: the problem, the data they have, what “done” looks like.
2. Transcribe, then extract a structured brief: problem statement, deliverables, testable acceptance criteria, data needed, privacy risks, effort estimate, skill tags.
3. Sanitise: scan and mask personal data (names, phone numbers, emails, 11-digit ID-style numbers), get the owner’s approval of the sample, and capture consent.
4. A student with the right level claims it; limit work in progress and time-box to 5 to 10 days.
5. A mentor reviews against the acceptance criteria, the owner gives a short structured reference, and the student does an explain-back on key choices.
6. Output: a Tier B Evidence Brief with the owner’s attestation.

**Capstone Rewire**

- The same brief format, posted by employers, NGOs and SMEs and approved by the department’s capstone coordinator.
- Standard deliverables: one-page problem framing, method note, prototype or analysis, impact metrics, demo and Evidence Brief, with three milestones tracked on a supervisor dashboard.
- Completion needs sponsor attestation, which makes it Tier C evidence.
- Adoption cost is near zero: it plugs into the project every final-year student already has to do.

**Views for the other users**

- Employer: role templates, an assessment link for applicants, ranked results with explanations, blind mode, side-by-side comparison, a live-check request, and a voice-note problem post. Free pilot; later pay per verified shortlist.
- Mentor: a queue of 10-minute reviews with an AI-prepared summary; confirm or dispute auto-scores; reviews count as verified hours.
- Department: curriculum heatmap, funnel, capstone pipeline and milestone tracker.

## 9. Low-resource rules

- Chat-first for students; light web pages for employers, mentors and departments.
- Publish a data budget (target: a few MB per full scenario), measure it and show it on screen.
- Pre-generate and cache scenario packs; queue messages; autosave every action and resume after a power or network cut.
- Voice or text for every input; no video or heavy images; compressed CSVs.
- Plain language with Nigerian English and Pidgin cues; dialect-tolerant scoring.
- Log MB, cost and latency per session from day one.

* Day One packs target about 2 MB and work offline. The shock arrives as a small patch file or message at a set time, and uploads are single .xlsx files.
* Artifact mode needs a laptop, a lab or a café session; chat mode keeps the path open for phone-only students.

## 10. Tech and data model

**Stack (Python-first)**

- FastAPI and Postgres (Supabase, or SQLite for week one).
- Telegram bot (python-telegram-bot or aiogram); WhatsApp Cloud API or Twilio sandbox as a stretch.
- Generator and scoring in pandas and numpy with seeded randomness and unit tests; schemas in pydantic.
- A provider-agnostic LLM wrapper with structured JSON output, temperature 0 for classification, caching, and token and cost logging.
- Speech-to-text with a text fallback; test Nigerian-accented English and Pidgin early, as accuracy there is a known weak spot.
- OR-Tools CP-SAT or PuLP for the planner.
- Dashboards in tools you already know (Streamlit, Tableau or Power BI) for Radar, department and employer prototypes; a tiny server-rendered page for public verification.
- Evidence signing with SHA-256 and a signature, a QR code, and a small PDF or image card for sharing.

**Core tables:** users (student, mentor, employer, department admin); skills, roles, role\_skill\_weights; job\_postings, extracted\_skills, courses, course\_skills; scenario\_templates, scenario\_instances, events; submissions, explain\_back\_items, calibrations; evidence, reviews; projects (SME or capstone); artifacts, shocks, autopsy\_findings, defence\_items; resources, plans.

**Day One engine:** openpyxl to read and tokenise formulas; headless LibreOffice for recalculation, with PyCel as a limited fallback; DuckDB or SQLite for the SQL track; sandboxed workers with no network and time and memory limits; macro-enabled files rejected.

## 11. MVP slice vs slides

**Build and demo live**

- Day One, Finance and Economics (Excel), end to end: pack through Telegram → sprint → shock patch → upload → autopsy → defence → Evidence Brief → employer view with blind mode and a public verification page.
- Radar as a real dashboard from collected postings and one department’s course outlines.
- Planner as a working solver with a small library, showing the plan change when constraints change.

**Show as working-lite or slides:** SME voice-note intake (record, transcribe, structured brief, sanitised sample); the capstone sponsor flow and supervisor dashboard (mock screens plus one real brief if you can get one); a simple mentor queue page; the chat-mode Month-End Sales scenario as a short clip of the phone path; the SQL track if time allows.

## 12. Build plan

**First 72 hours**

- Hours 0 to 6: lock the deep track (Excel, Finance and Economics) and the scenario; check the template’s Excel functions against the recalculation engine; create the repo; draft the skills taxonomy; book 5 employer and 5 student conversations; open a pilot-recruit group.
- Day 1: template workbook (Inputs sheet, calculation zone, Outputs) and a seeded pack generator with answer key; autopsy v0 for typed numbers and magic constants; Telegram state-machine skeleton.
- Day 2: headless recalculation and the shock test with expected-direction and constraint checks; defence question generator with claim checks against the formula graph; Telegram flow for pack, shock patch and upload; start collecting postings (aim for 150 by the end of day 3).
- Day 3: Evidence Brief with artifact signals and employer view v0; end-to-end run with three testers, including a ChatGPT-built workbook that survives and one that does not; record a first demo clip; recruit 10 to 20 pilot students.

**Then (default two-week plan)**

- End of week 1: the vertical slice complete, Radar v0, employer experiment prepared.
- Week 2: pilot, employer experiment, Planner v0, SME intake demo, chat-mode clip, pitch deck, rehearsal, and a recorded fallback demo.
- Under a week: cut Planner, SME and chat mode to slides; keep the Day One slice, Evidence Brief and employer view.

**Lanes for a team of three to five:** data and engine (generator, autopsy and shock tests, Radar, Planner); bot and backend; dashboards and Evidence Brief; research, pilot and pitch; scenario realism with a practising analyst. If solo: Day One slice first, then Evidence Brief, employer view, a static Radar, and everything else as slides.

## 13. Validation and metrics

- **Mini experiment (48 hours).** Show 3 to 5 hiring managers or HR people candidate packets in two formats, CV-only or Evidence Brief, split across reviewers. Record time to decision, confidence (1 to 5) and agreement between reviewers. The sample will be tiny, so report it as an early signal.
- **Pilot.** 10 to 20 final-year students from one department. Track, without promising: completion rate, time to first Evidence Brief, change in error detection and calibration across three scenarios, and the mentor overturn rate on auto-scores.
- **Low-resource proof.** MB and cost per session, drop-off after connectivity loss, resume success after a simulated power cut.
- **Cohort funnel.** Taught → Practiced → Proven percentages from Radar and pilot data.

* **Autopsy validity.** Have a mentor rate 10 to 15 pilot workbooks blind, then compare with the autopsy. Report agreement and the false-flag rate before trusting any flag.
* **Shock survival.** Track the share of pilot workbooks that pass each shock, and how it changes between a student’s first and third scenario.

## 14. Pitch kit

**Story arc**

1. A real student from the pilot, with permission: strong grades, many applications, few replies.
2. The insight: the degree stopped being a signal, AI made CVs noisier, employers want demonstrated skills, graduates overrate their readiness.
3. The solution: Taught → Practiced → Proven, and the Evidence Brief.
4. A three-minute live demo of the Day One money shot: a ChatGPT-built workbook passes the static check, the FX shock hits, no output moves, the CFO persona asks about a flagged cell, and a second student’s live model survives. Part of it runs in airplane mode.
5. Proof: pilot numbers and the employer experiment.
6. Model: employers pay per verified shortlist, departments license dashboards, sponsors fund capstones, students stay free.
7. Why now and why us: the AI era, low-resource design, code decides and the LLM narrates.
8. The ask: pilot employers, partner departments, mentors.

**Hard questions, short answers**

- Students will just use ChatGPT. Allowed and disclosed; we verify understanding with per-student instances, planted errors, computed counterfactuals, time boxes, tiers and mentor spot-checks. It raises the cost of faking; it is not unfakeable.
- Why would employers trust it? Scenarios are co-written with practitioners, higher tiers need humans, every brief has a verification link, and we test it against real reviewers.
- Simulators already exist. Yes, including LearnFlourish and TURNVE. Check exactly what each one verifies before the pitch. Our position: experience alone is a weak signal when AI can produce the output, so Sabi centres independent verification of understanding, real-work rails and routing to employers, and can ingest evidence from other programmes. Never claim nobody does this.
- Cold start? One department, a few employers, capstones that already exist, and SME briefs seeded from known businesses.
- Who pays? Employers (screening), departments (dashboards), sponsors (capstones). Never students.
- Fairness? Blind mode, dialect-tolerant scoring, score-gap monitoring by school and gender, and a human appeal route.
- No smartphone or data? Offline packs and campus Wi-Fi sync; SMS notifications as a stretch.

* Is this just an Excel autograder? Autograders exist and we say so. Day One adds shocks the student must survive, a defence driven by the findings, and employer-facing evidence, offline and low-cost.
* Can’t a student just use AI to build a live model? Yes, allowed and disclosed. The model then has to survive the shock, and the defence checks whether the student understands it.
* Does this cover every faculty? No. It covers artifact-based entry-level roles in data, finance, operations and marketing, on a plug-in engine, with two tracks working.

## 15. Risks and mitigations

- Scope creep: freeze the MVP slice; cut Planner and SME to slides first.
- Speech recognition on Pidgin: text fallback, test early.
- Inconsistent LLM grading: closed-label classification, temperature 0, computed keys wherever possible, mentor spot-checks.
- WhatsApp approval delays: Telegram first.
- Data-collection terms: sample by hand or use permitted sources, and document the method.
- Pilot recruitment: department groups, with a certificate and an employer-facing brief as the incentive.
- Employer participation: start with warm contacts from internships and alumni.
- Demo failure: a recorded fallback and an offline path.

* Recalculation coverage: the engine handles only some Excel functions, so test the template’s functions before locking the scenario.
* Untrusted files: reject macros, strip external links, and sandbox every recalculation and query.
* False flags: tune autopsy rules against blind mentor ratings, and show students the evidence behind each flag.
* Laptop access: keep chat mode, and offer lab or café sessions.
* Shock delivery and leaks: send the shock as a patch at a set time, and generate every pack from a per-student seed.

## 16. Privacy, ethics, fairness

- Nigeria Data Protection Act: explicit consent, purpose limitation, data minimisation and retention limits. Delete voice notes after transcription unless consent says otherwise.
- Sharing a brief with an employer is opt-in per brief; blind mode is on by default.
- Calibration data stays private to the student unless they choose to share a trend.
- Humans stay in the loop for high-stakes claims; scoring is documented and appealable.
- SME data is sanitised and approved by the owner before any student sees it.

* Uploaded files are scanned in a sandbox, macro-enabled files are rejected, and files are deleted after scoring unless the student chooses to keep them.

## 17. Open decisions

- Team size and build window, which decide what is demoed live and what stays a slide.
- Whether a real SME or employer can supply the first brief.
- Telegram or WhatsApp for the demo.
- The name: run a quick clash check on “Sabi”; alternates to consider are ShowAm and Receipts.
- A practising analyst or mentor to co-write the first scenario.

* Which faculty track is the deep track (default: Excel, Finance and Economics).
* Which Excel functions the first template needs, checked against the recalculation engine before the scenario is locked.
* How students without a laptop take part: chat mode, a lab, or a café session.
* Day One as the scenario-series name: it is also a well-known journaling app, so check for a clash before using it publicly.

## Sources

- From degree to decent work: Rethinking youth employability in Nigeria (Adeoti and Akintunde), Guardian Nigeria: https://guardian.ng/?p=2804323
- Full text of the same analysis, Brunel University London repository: https://bura.brunel.ac.uk/bitstream/2438/33025/1/FullText.pdf
- LearnFlourish, ThisDay, 7 January 2026: https://www.thisdaylive.com/2026/01/07/as-graduate-unemployment-persists-learnflourish-a-nigerian-edtech-startup-pushes-practical-learning-model
- TURNVE venture profile on VC4A: https://vc4a.com/ventures/turnve/

* [Automated grading, analysis, and feedback in Excel assignments (Frost, Kenyo and Matta, 2018)](https://aisel.aisnet.org/siged2018/6)
* [Investigating automated grading techniques in teaching advanced Excel (Mennega and Prinsloo, University of Pretoria)](https://zenodo.org/records/11658240/files/paper_4883.pdf)
* [Pearson MyLab IT NextGen](https://www.pearson.com/en-us/higher-education/products-services/mylab/it.html)
* [openpyxl users group: formula results and cached values](https://groups.google.com/g/openpyxl-users/c/GbBOnOa8g7Y)
