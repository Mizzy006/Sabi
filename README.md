# Sabi

**Practical skills, shown through real work.**

Sabi helps graduates practise job-related tasks and show evidence of what they can do. Students can choose a career path, get a study plan, try a practical task, and submit their work for review. Employers can share tasks, review completed work, and request an introduction to a candidate.

“Sabi” means “to know” or “to be skilled” in Nigerian Pidgin. Sabi is a prototype built around one idea: a work sample and an explanation of it can tell an employer more than a CV alone.

> **Project status:** This is a working demonstration, not a production hiring or identity-verification service. This README describes what the current app supports; the longer-term concept is in [Description.md](Description.md).

## Try the live demo

Open [Sabi on Render](https://sabi-demo-2wav.onrender.com). The free service may sleep while idle, so the first page load can take about a minute. Use sample information for demonstrations; do not upload confidential personal or business data.

## What you can do with Sabi

### For students

- **Choose a target role.** The current demo includes junior data analyst, graduate supply-chain analyst, operations associate, and financial-modelling intern paths.
- **Plan what to learn.** Set weekly study-time and mobile-data limits to get a role-focused plan.
- **Compare coursework with role skills.** Share course information for a skills-gap summary and a suggested practice task.
- **Try employer tasks.** Browse open challenges and practise on a business-style problem.
- **Build and explain a spreadsheet.** Download a Day One workbook, work through a scenario, submit the file for formula and change checks, and answer questions about how it works.
- **Review employer introduction requests.** Decide whether to accept or decline before sharing your email address.

### For employers and business owners

- **Review candidate results.** Search by role or skill, view results in a blind-first format, and open the linked Evidence Brief to check its details.
- **Share a task.** Describe a business problem by text or voice note, review the extracted project brief, and publish it for candidates.
- **Review task submissions.** See who completed a task you posted.
- **Request an introduction.** Send a message to a candidate. Their email stays private unless they accept.
- **Explore skills insights.** Compare the skills represented in the demo with curriculum coverage and practice results.

### For SMEs

The task studio accepts a voice note, transcript, or written description and turns it into a structured project brief. With `GROQ_API_KEY` configured, uploaded audio can be transcribed with Whisper and supported language tasks use Groq. Without a key, Sabi uses a supplied transcript or demo fallback rather than transcribing real speech. It attempts to identify and mask common personal details before the brief is shared. Review the output before publishing; automated masking may miss information.

## How Day One checks spreadsheet work

Day One is Sabi’s spreadsheet practice and review flow:

1. Generate or download a role-specific workbook and task brief.
2. Complete the workbook and respond to a scenario change, such as an exchange-rate movement or a tighter budget.
3. Upload the `.xlsx` file. The autopsy checks the workbook against the task’s answer key, formula structure, hard-coded values, constraints, and expected changes after the scenario update.
4. Explain selected formulas to Mrs. Bello. When you make a verifiable claim about a cell or formula, Sabi checks it against the workbook’s formula dependencies.
5. View an Evidence Brief with the task outcome and a SHA-256 digest. The digest helps reveal whether the brief’s contents were changed after it was created.

The exact checks depend on the scenario and the submitted workbook. A result applies to that task; it does not prove general job readiness or long-term performance.

## How to interpret results

- Automated checks provide **Tier A** evidence and cap the level at **Working**. A **Strong** rating requires a separate human review.
- Sabi evaluates the submitted work and the candidate’s explanation. It does not determine who authored the file or detect whether AI tools were used.
- A SHA-256 digest can help identify later changes to an Evidence Brief. It does not independently prove that every claim in the brief is true.
- Skills insights are based on the project’s current demo data, not a live feed of job listings.

## User interface

The standard workspace is built with React. A **Data saver** option switches to a lighter HTML interface that loads fewer assets. Both modes use the same application and API.

## Technology

- **Python and FastAPI** power the API and application server.
- **React and Vite** build the standard workspace; the lighter HTML interface is served as a fallback.
- **openpyxl and LibreOffice** inspect and recalculate spreadsheet workbooks. The Render Docker image includes LibreOffice.
- **PuLP and HiGHS** power the constrained study planner.
- **Groq is optional** for language tasks. Without an API key, Sabi uses a local mock provider; those responses are for demonstration, not production language quality.
- **Vercel Blob is optional for local use** and used for durable records in the Render demo when `BLOB_READ_WRITE_TOKEN` is configured.

## Run locally

For detailed platform-specific setup and Render deployment instructions, see [INSTALLATION.md](INSTALLATION.md).

### Requirements

- Python 3.10 or newer
- Node.js 20 or newer to rebuild the React interface
- LibreOffice installed and available as `soffice` for spreadsheet recalculation. On Windows, the app can use Microsoft Excel through COM when the required Python COM package is installed.

Install the Python dependencies and build the frontend from the repository root:

```bash
python -m pip install -r requirements.txt
npm --prefix frontend ci
npm --prefix frontend run build
```

Start the app:

```bash
python sabi_server.py
```

Open [http://localhost:8000](http://localhost:8000) for the app or [http://localhost:8000/docs](http://localhost:8000/docs) for the interactive API reference.

Set `GROQ_API_KEY` only if you want to use Groq for supported language tasks. For durable storage with Vercel Blob, configure `BLOB_READ_WRITE_TOKEN` in the server environment; never commit secret values to the repository.

### Run the standalone demos

```bash
python dayone_defence.py
python sabi_verify.py
python sabi_planner.py --hours 10 --mb 500 --weeks 6 --replan-mb 200
python sabi_radar.py --department Economics
python sabi_sme.py --demo
```

### Run the tests

```bash
python -m pytest tests.py -v
```

## Deployment notes

The repository includes a Render Blueprint and Dockerfile for the complete Python app and spreadsheet workflow. The Docker image builds the React assets and installs LibreOffice. For durable records on Render, set `BLOB_READ_WRITE_TOKEN` in the Render service’s environment; the free service’s local filesystem is temporary and the service may sleep when idle.

The repository also has Vercel configuration. The current full spreadsheet workflow is intended to run on the Render Docker service because it needs LibreOffice. The deployed Vercel project is a separate deployment and may have access protection enabled.

## Project structure

| Path | Purpose |
| --- | --- |
| `sabi_server.py` | FastAPI app, portal APIs, task flows, and file/record storage |
| `dayone_generator.py` | Creates role-specific workbook packs, reference files, and answer keys |
| `dayone_recalc.py` | Recalculates workbooks with Excel COM or LibreOffice |
| `dayone_autopsy.py` | Checks submitted workbooks and generates defence questions |
| `dayone_defence.py` | Mrs. Bello question flow and formula-claim verification |
| `sabi_verify.py` | Creates and renders Evidence Briefs and verification pages |
| `sabi_planner.py` | Optimises study plans within time and data limits |
| `sabi_radar.py` | Produces skills and curriculum insights from the available data |
| `sabi_sme.py` | Processes SME voice notes and extracts task briefs |
| `frontend/` | React workspace components and Vite build configuration |
| `templates/` and `static/` | HTML interface, styles, scripts, and built React assets |
| `render.yaml` and `Dockerfile` | Render deployment configuration |

## API overview

The interactive API reference is at `/docs`. Main route groups include:

| Route | Purpose |
| --- | --- |
| `/api/scenarios` | List available role scenarios |
| `/api/planner/solve` and `/api/student/curriculum-gap` | Create a study plan or coursework comparison |
| `/api/dayone/*` | Generate packs, submit workbook work, and run a defence |
| `/api/employer/tasks` and `/api/employer/managed-tasks` | Browse tasks and review an employer’s tasks and submissions |
| `/api/candidates`, `/api/contact-requests`, `/api/student/contact-requests/*`, and `/api/employer/contact-requests` | Review candidate results and manage introduction requests |
| `/api/radar/heatmap` and `/api/sme/*` | Load skills insights and process SME task descriptions |
| `/verify/{brief_id}` | View an Evidence Brief verification page |

## Prototype and privacy note

Sabi is a demonstration project, not a production hiring or identity-verification service. The current sign-in flow is for demo use and is not production-grade authentication. Do not use it to protect sensitive accounts or submit confidential personal or business information. Review SME briefs before publishing and use sample data for demonstrations.

For the longer-term product concept and roadmap, see [Description.md](Description.md).
