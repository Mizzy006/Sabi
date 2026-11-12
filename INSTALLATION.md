# Sabi: Installation and Setup

This guide covers running Sabi locally and using the hosted demo. You do not need to install anything to try the live demo.

## Try the hosted demo

Open [Sabi on Render](https://sabi-demo-2wav.onrender.com). The free service may sleep while idle; allow about a minute for the first page load after it wakes.

- Live demo: [https://sabi-demo-2wav.onrender.com/](https://sabi-demo-2wav.onrender.com/)
- API documentation: [https://sabi-demo-2wav.onrender.com/docs](https://sabi-demo-2wav.onrender.com/docs)

## Run Sabi locally

### Requirements

- Python 3.10 or newer
- Node.js 20 or newer (to build the React interface)
- LibreOffice installed and available as `soffice` (needed for spreadsheet recalculation)
- Git

On Windows, the app can also use Microsoft Excel through COM if the required Python COM package is installed. LibreOffice is the simpler cross-platform option.

### 1. Clone the repository

```bash
git clone https://github.com/Mizzy006/Sabi.git
cd Sabi
```

### 2. Create and activate a Python virtual environment

```bash
python -m venv .venv
```

Activate it using the command for your shell:

```powershell
# Windows PowerShell
.\.venv\Scripts\Activate.ps1
```

```bash
# macOS or Linux
source .venv/bin/activate
```

### 3. Install Python dependencies and build the frontend

Run these commands from the repository root:

```bash
python -m pip install -r requirements.txt
npm --prefix frontend ci
npm --prefix frontend run build
```

Rebuild the frontend after changing React components or styles.

### 4. Configure optional services

Sabi can run without API keys, using local mock or rule-based fallbacks. To enable Groq language and audio features, set `GROQ_API_KEY` in the environment before starting the app.

```powershell
# Windows PowerShell
$env:GROQ_API_KEY = "your-key"
```

```bash
# macOS or Linux
export GROQ_API_KEY="your-key"
```

For durable storage through Vercel Blob, also set `BLOB_READ_WRITE_TOKEN`. Keep both values private: do not add them to source code, commit them to Git, or share them in screenshots or chat.

### 5. Start the application

```bash
python sabi_server.py
```

Open:

- App: [http://localhost:8000](http://localhost:8000)
- Interactive API reference: [http://localhost:8000/docs](http://localhost:8000/docs)

## Run the tests

```bash
python -m pytest tests.py -v
```

## Deploy a copy to Render

The repository includes a `render.yaml` Blueprint and Dockerfile. In Render, choose **New → Blueprint**, connect the `Mizzy006/Sabi` repository, and deploy the Blueprint. Set `BLOB_READ_WRITE_TOKEN` in Render when prompted to keep records in Vercel Blob across free-service restarts. To enable Groq features, add `GROQ_API_KEY` in the service’s **Environment** settings and redeploy. Never put secret values in `render.yaml` or GitHub.

The free Render instance can sleep while idle, and its local filesystem is temporary. Use sample data for demonstrations and avoid entering confidential personal or business information; the demo sign-in is not production-grade authentication.
