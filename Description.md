# Sabi: Practical Skills, Shown Through Real Work

## What Sabi does

Sabi helps students and recent graduates practise job-related work and show evidence of what they can do. It connects career preparation to a practical task, an explanation of the work, and a record that an employer can review. “Sabi” means “to know” or “to be skilled” in Nigerian Pidgin.

The product addresses a common gap in entry-level hiring: a degree or CV may describe what someone studied, but can be less useful for judging how they would approach a real work problem. Sabi gives students opportunities to apply their skills and gives employers a structured way to review work samples and the candidate’s explanation.

## The student experience

### 1. Choose a role and plan learning

Students choose a target role and set their available study hours, mobile-data budget, and timeframe. Sabi’s planner uses these limits to arrange a role-focused learning path. The current role paths are junior data analyst, graduate supply-chain analyst, operations associate, and financial-modelling intern.

Students can also share course information for a coursework comparison. Sabi identifies skills that appear covered or missing for the selected role and suggests a relevant practice task. This comparison uses the curriculum and skill data available in the prototype; it is not a live feed of employer job listings.

### 2. Practise on a realistic task

Students can browse tasks posted by employers or try a role-based practice scenario. Tasks describe a business need and the work product expected, such as a spreadsheet model or analysis. The student can review the brief, complete the work, and submit it through Sabi.

### 3. Complete a Day One spreadsheet challenge

Day One is Sabi’s spreadsheet-based practice and review workflow:

1. The student downloads a role-specific workbook and task brief.
2. They complete the workbook, including responding to a changed business condition such as a movement in the exchange rate or a tighter budget.
3. They upload the `.xlsx` file for review.
4. Sabi checks the file against the task’s answer key and expected behavior. Depending on the scenario, checks include formula structure, hard-coded values, constraints, and whether outputs respond as expected to changed inputs.
5. Mrs. Bello asks questions based on findings in the workbook. When the student makes a verifiable claim about a formula or cell dependency, Sabi checks it against the workbook’s formula graph.
6. Sabi produces an Evidence Brief summarizing the task results and verification signals.

The workbook can be downloaded and edited offline, but submitting it and receiving results requires an internet connection. The Data Saver interface reduces the amount of UI content loaded; it does not make the full application offline.

## The employer and business-owner experience

Employers can describe a project, review the generated task brief, and publish the task for students. They can review completed submissions and candidate results in a blind-first view. If they want to contact a candidate, they can request an introduction. The candidate can accept or decline, and their email address is shared only after acceptance.

Small business owners can provide a written description, transcript, or audio recording of a business problem. When Groq is configured, Sabi can transcribe uploaded audio and organise the description into a structured brief with deliverables, skills, and other project details. The owner can review the brief before publishing it. Sabi attempts to identify and mask common personal information before AI extraction, but automated masking can miss details.

The employer skills-insights view compares role demand, curriculum coverage, and practice signals. It currently uses sample demonstration data rather than live job listings or a production applicant database. Preloaded candidate profiles, employer tasks, and company names are examples for demonstration and do not indicate partnerships or endorsements.

## AI and evidence checks

Sabi uses AI to interpret language and code to check workbook details that can be verified directly.

- Groq’s `openai/gpt-oss-120b` model supports Mrs. Bello’s question phrasing, claim extraction and response classification, SME brief extraction, and semantic curriculum-skill matching.
- Groq’s `whisper-large-v3-turbo` model can transcribe uploaded audio.
- If Groq is not configured or a request fails, Sabi uses local mock or rule-based fallbacks. Real audio transcription requires Groq.
- Workbook structure, formula dependencies, answer-key comparisons, and scenario-change checks are evaluated by code. The language model does not calculate or validate spreadsheet formulas.

An Evidence Brief includes a SHA-256 digest of its contents. Recomputing the digest can help reveal whether the brief has changed since it was created. The digest is not a digital signature, does not establish who created the brief, and does not prove that every claim is true.

Automated results apply to the specific task completed. They do not prove authorship, general job readiness, or future workplace performance. Automated Tier A evidence is capped at **Working**; a **Strong** rating requires human review. Sabi is not designed to detect whether AI tools were used to create a submission.

## Privacy and access

Candidate results are presented in a blind-first view to reduce reliance on identity details during initial review. Candidate contact information is not shared with an employer unless the candidate accepts an introduction request. SME task descriptions are checked for common personal-information patterns before AI brief extraction, and the business owner is expected to review the resulting brief before publication.

The current sign-in is for demonstration and is not production-grade authentication. Use sample information and do not submit confidential personal or business data. When Groq is enabled, relevant text and audio are processed through the Groq API. Sabi’s preloaded scenarios, workbooks, curricula, employer tasks, candidate profiles, and skills insights are generated or bundled demonstration data, not a live employment dataset.
