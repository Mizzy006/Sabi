import React, { useEffect, useRef, useState } from 'react';

const roles = [
  { id: 'graduate_supply_chain_analyst', title: 'Graduate Supply-Chain Analyst', scenario: 'Import costs and port fees', description: 'Calculate the full cost of imported goods, including duty, port fees and exchange-rate changes.' },
  { id: 'junior_data_analyst', title: 'Junior Data Analyst', scenario: 'Customer trends and sales data', description: 'Find customer trends, check sales data and explain what the numbers mean.' },
  { id: 'operations_associate', title: 'Operations Associate', scenario: 'Transport costs and delivery times', description: 'Compare delivery costs, fuel use and travel times across routes.' },
  { id: 'financial_modelling_intern', title: 'Financial Modelling Intern', scenario: 'Cash flow and business costs', description: 'Forecast cash coming in and going out, and see how the business handles changes.' }
];

const presets = {
  unilag_econ: {
    role: 'graduate_supply_chain_analyst', degree: 'UNILAG B.Sc. Economics', badge: 'Ada Okafor · UNILAG Economics',
    text: `University of Lagos - Department of Economics
Undergraduate Degree Course Curriculum:
ECO 101: Principles of Economics I (Microeconomics, consumer choice, elasticity, supply and demand functions)
ECO 102: Principles of Economics II (Macroeconomics, national income accounting, inflation, unemployment)
ECO 201: Quantitative Methods in Economics (Calculus for economists, linear algebra, matrix operations)
ECO 202: Economic Statistics & Data (Descriptive statistics, probability distributions, sampling techniques, index numbers)
ECO 301: Econometrics I (Classical linear regression model, OLS estimation, hypothesis testing, t-tests, F-tests, multicollinearity)
ECO 302: Econometrics II (Heteroskedasticity, autocorrelation, dummy variables, simultaneous equation models)
ECO 401: Advanced Economic Theory (General equilibrium, welfare economics)
ECO 499: Research Project / Undergraduate Dissertation (Empirical economic investigation, statistical analysis, academic report writing)`
  },
  ui_compsci: {
    role: 'junior_data_analyst', degree: 'UI B.Sc. Computer Science', badge: 'Emeka Obi · UI Computer Science',
    text: `University of Ibadan - Department of Computer Science
B.Sc. Degree Course Curriculum:
CSC 101: Introduction to Computer Science & Problem Solving (Algorithms, flowcharts, pseudo-code)
CSC 201: Computer Programming I (Python fundamentals, data types, control structures, functions)
CSC 202: Computer Programming II (Object-oriented programming, data structures, linked lists, binary trees)
CSC 301: Database Design & Management Systems (Relational databases, SQL queries, DDL/DML, normalization, table joins, aggregation)
CSC 302: Data Structures & Algorithms (Sorting, searching, algorithmic complexity, Big-O notation)
CSC 305: Operating Systems & System Programming
CSC 401: Artificial Intelligence & Machine Learning (Supervised learning, classification, pandas preprocessing)
CSC 499: Final Year Software Engineering Capstone (System implementation, technical documentation, oral defense)`
  },
  abu_accounting: {
    role: 'financial_modelling_intern', degree: 'ABU B.Sc. Accounting', badge: 'Zainab Bello · ABU Accounting',
    text: `Ahmadu Bello University - Department of Accounting
B.Sc. Accounting Syllabus:
ACC 101: Introduction to Financial Accounting I (Double-entry bookkeeping, trial balance, ledger accounts)
ACC 201: Financial Accounting II (Company accounts, partnership accounts, preparation of balance sheets and income statements)
ACC 202: Cost Accounting (Cost classifications, absorption costing, marginal costing, break-even analysis)
ACC 301: Management Accounting (Budgeting, budgetary control, standard costing, variance analysis)
ACC 302: Auditing & Investigation (Audit standards, internal control systems, vouching, verification of assets)
ACC 401: Advanced Financial Accounting (Group accounts, consolidated financial statements, IFRS compliance)
ACC 402: Taxation & Tax Management (Company income tax, VAT, PAYE calculation)
ACC 499: Research Project (Financial performance analysis, empirical accounting thesis)`
  }
};

function getUser() {
  try {
    const saved = JSON.parse(localStorage.getItem('sabi-user') || 'null');
    if (saved?.role) return saved;
  } catch { /* storage may be disabled */ }
  return { role: 'student', name: 'Ada Okafor', alias: 'Ada Okafor', university: 'University of Lagos' };
}

function CurriculumDiagnostic() {
  const [user, setUser] = useState(getUser);
  const [activeTab, setActiveTab] = useState(location.hash.split('/')[1] || 'student');
  const [targetRole, setTargetRole] = useState(presets.unilag_econ.role);
  const [curriculumText, setCurriculumText] = useState(presets.unilag_econ.text);
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const fileInput = useRef(null);
  const previousRole = useRef(targetRole);
  const autoRan = useRef(false);
  const skipRoleEffect = useRef(false);
  const active = activeTab === 'student-analytics';
  const currentRole = roles.find((role) => role.id === targetRole) || roles[0];

  useEffect(() => {
    const onNavigation = (event) => setActiveTab(event.detail?.tabId || location.hash.split('/')[1]);
    const onSession = (event) => setUser(event.detail?.user || getUser());
    window.addEventListener('sabi:navigation', onNavigation);
    window.addEventListener('sabi:session', onSession);
    return () => {
      window.removeEventListener('sabi:navigation', onNavigation);
      window.removeEventListener('sabi:session', onSession);
    };
  }, []);

  const runAnalysis = async (overrides = {}) => {
    const role = overrides.role || targetRole;
    const text = overrides.text ?? curriculumText;
    const file = Object.hasOwn(overrides, 'file') ? overrides.file : selectedFile;
    if (result?.target_role && result.target_role !== role) setResult(null);
    const form = new FormData();
    form.append('target_role', role);
    form.append('student_alias', user.alias || user.name || 'Ada Okafor');
    if (text.trim()) form.append('curriculum_text', text);
    if (file) form.append('file', file);
    setStatus('loading');
    setError('');
    try {
      const response = await fetch('/api/student/curriculum-gap', { method: 'POST', body: form });
      const data = await response.json();
      if (!response.ok || data.status !== 'success') throw new Error(data.detail || 'The diagnostic could not be calculated.');
      setResult(data);
      setStatus('ready');
      window.showToast?.(`Course comparison complete: ${data.match_percentage}% match for ${data.target_role_title}.`, 'success');
    } catch (reason) {
      setStatus('error');
      setError(reason.message || 'The diagnostic could not be calculated. Please try again.');
    }
  };

  useEffect(() => {
    if (!active) return;
    if (!autoRan.current) {
      autoRan.current = true;
      previousRole.current = targetRole;
      runAnalysis({ role: targetRole, text: curriculumText });
      return;
    }
    if (skipRoleEffect.current) {
      skipRoleEffect.current = false;
      previousRole.current = targetRole;
      return;
    }
    if (previousRole.current !== targetRole) {
      previousRole.current = targetRole;
      runAnalysis({ role: targetRole, text: curriculumText });
    }
  }, [active, targetRole]);

  const loadPreset = (key) => {
    const preset = presets[key];
    if (!preset) return;
    skipRoleEffect.current = preset.role !== targetRole;
    previousRole.current = preset.role;
    setTargetRole(preset.role);
    setCurriculumText(preset.text);
    setSelectedFile(null);
    if (fileInput.current) fileInput.current.value = '';
    runAnalysis({ role: preset.role, text: preset.text, file: null });
  };

  const selectFile = (file) => {
    if (!file) return;
    setSelectedFile(file);
    window.showToast?.(`Loaded “${file.name}”. Select Analyze to process it.`, 'info');
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (fileInput.current) fileInput.current.value = '';
  };

  const startBridge = () => window.startBridgeScenario?.(targetRole);
  const percentile = result ? Math.max(0, 100 - Number(result.cohort_percentile || 0)) : null;

  return (
    <div className="react-curriculum space-y-5">
      <header className="react-diagnostic-hero">
        <div>
          <div className="react-section-eyebrow">YOUR NEXT STEP, MADE CLEAR</div>
          <h2>Skills diagnostic</h2>
          <p>See how your courses line up with the skills employers want for the job you’re preparing for.</p>
        </div>
        <div className="react-diagnostic-profile">
          <div className="react-profile-avatar">{String(user.name || 'A').slice(0, 1).toUpperCase()}</div>
          <div><b>{user.name || 'Student'}</b><span>{user.university || user.organization || 'Student profile'}</span></div>
          <button className="btn btn-quiet btn-sm" type="button" disabled={status === 'loading'} onClick={() => runAnalysis()}>Update results</button>
        </div>
      </header>

      <section className="react-diagnostic-input panel" aria-labelledby="diagnostic-input-heading">
        <div className="react-diagnostic-section-title"><span>01</span><div><h3 id="diagnostic-input-heading">Add your course information</h3><p>Choose the kind of job you want, then paste your course list or upload a syllabus.</p></div></div>
        <div className="react-diagnostic-grid">
          <div className="react-diagnostic-form">
            <label className="react-form-label" htmlFor="react-curriculum-role">Job you’re preparing for</label>
            <select id="react-curriculum-role" className="field w-full" value={targetRole} onChange={(event) => setTargetRole(event.target.value)}>
              {roles.map((role) => <option key={role.id} value={role.id}>{role.title} · {role.scenario}</option>)}
            </select>
            <p className="react-role-description">{currentRole.description}</p>

            <div className="react-preset-heading"><span className="react-form-label">Use a sample course list</span><small>Choose one to see an example</small></div>
            <div className="react-preset-list">
              <button type="button" className="react-preset" onClick={() => loadPreset('unilag_econ')}><span><b>Economics</b><small>UNILAG · B.Sc.</small></span><i>↗</i></button>
              <button type="button" className="react-preset" onClick={() => loadPreset('ui_compsci')}><span><b>Computer Science</b><small>University of Ibadan · B.Sc.</small></span><i>↗</i></button>
              <button type="button" className="react-preset" onClick={() => loadPreset('abu_accounting')}><span><b>Accounting</b><small>ABU · B.Sc.</small></span><i>↗</i></button>
            </div>

            <div className="react-text-label"><label className="react-form-label" htmlFor="react-curriculum-text">Paste your course list</label><button type="button" onClick={() => setCurriculumText('')}>Clear</button></div>
            <textarea id="react-curriculum-text" className="field react-curriculum-text" value={curriculumText} onChange={(event) => setCurriculumText(event.target.value)} placeholder="Paste course codes, syllabus topics, or transcript modules…" />
          </div>

          <div className="react-diagnostic-upload-column">
            <span className="react-form-label">Upload a syllabus or transcript</span>
            <label
              className={`react-upload-zone${selectedFile ? ' has-file' : ''}`}
              htmlFor="react-curriculum-file"
              onDragOver={(event) => { event.preventDefault(); event.currentTarget.classList.add('is-dragging'); }}
              onDragLeave={(event) => event.currentTarget.classList.remove('is-dragging')}
              onDrop={(event) => { event.preventDefault(); event.currentTarget.classList.remove('is-dragging'); selectFile(event.dataTransfer.files?.[0]); }}
            >
              <input ref={fileInput} id="react-curriculum-file" className="sr-only" type="file" accept=".pdf,.txt,.md,.doc,.docx" onChange={(event) => selectFile(event.target.files?.[0])} />
              <span className="react-upload-icon">↑</span>
              <b>{selectedFile ? selectedFile.name : 'Choose a file or drop it here'}</b>
              <small>{selectedFile ? `${Math.max(1, Math.round(selectedFile.size / 1024))} KB · Ready to analyze` : 'PDF, Word, Markdown, or text · up to 10 MB'}</small>
              {selectedFile && <span className="react-file-clear" onClick={(event) => { event.preventDefault(); clearFile(); }}>Remove file</span>}
            </label>
            <div className="react-upload-note"><span>⌑</span><p>Your course information is used for this comparison and isn’t shown to employers.</p></div>
            <button type="button" className="btn btn-primary react-analyze-button" disabled={status === 'loading'} onClick={() => runAnalysis()}>
              {status === 'loading' ? <><span className="spinner" />Checking your courses…</> : <>Compare my courses with this job <span aria-hidden="true">→</span></>}
            </button>
            {status === 'error' && <p className="react-diagnostic-error" role="alert">{error}</p>}
          </div>
        </div>
      </section>

      <section className="react-diagnostic-results" aria-live="polite">
        <div className="react-results-heading"><div><div className="react-section-eyebrow">YOUR DIAGNOSTIC</div><h3>Where you stand today</h3></div><span>{result ? `Based on ${result.target_role_title}` : status === 'loading' ? `Assessing ${currentRole.title}` : currentRole.title}</span></div>
        <div className="react-result-metrics">
          <article className="react-result-card react-result-score"><span>Coursework match</span><div><b>{result ? result.match_percentage : '—'}</b><small>{result ? '%' : 'Awaiting analysis'}</small></div><div className="react-result-track"><i style={{ width: `${result ? Math.max(0, Math.min(100, result.match_percentage)) : 0}%` }} /></div><small>Coverage of role-relevant competencies</small></article>
          <article className="react-result-card"><span>Coursework match level</span><b className="react-result-value">{result?.readiness_tier || '—'}</b><small>Based on the course information you shared</small></article>
          <article className="react-result-card"><span>Compared with graduates</span><b className="react-result-value">{percentile === null ? '—' : `Top ${percentile}%`}</b><small>{result ? 'In this sample group' : 'A sample group comparison'}</small></article>
          <article className="react-result-card"><span>Suggested practice task</span><b className="react-result-bridge">{result?.recommended_bridge_scenario || '—'}</b><button type="button" onClick={startBridge} disabled={!result} className="react-bridge-link">Try this task <span>↗</span></button></article>
        </div>

        {result ? <div className="react-diagnostic-summary"><span className="react-summary-check">✓</span><p><b>What we found</b>{result.summary}</p></div> : <div className="react-diagnostic-summary is-empty"><span>i</span><p><b>Your results will appear here</b>We’ll compare the courses you share with the skills employers want for your chosen role.</p></div>}

        <div className="react-competency-grid">
          <article className="react-competency-panel">
              <div className="react-competency-heading"><span className="react-competency-dot is-strong"/><div><h4>Skills your courses cover</h4><p>Areas where your course list gives you a foundation</p></div><b>{result?.strong_areas?.length || 0}</b></div>
            <div className="react-competency-list">
              {!result && <p className="react-competency-empty">Compare your courses to see which job skills you’ve already studied.</p>}
              {result?.strong_areas?.map((item) => <div className="react-competency-item" key={item.name}><div><b>{item.name}</b><span>{item.category} · {item.rating}</span></div><strong>{item.score_pct}%</strong><small>{item.assessment}</small><i><em style={{ width: `${Math.max(0, Math.min(100, item.score_pct))}%` }} /></i></div>)}
            </div>
          </article>
          <article className="react-competency-panel">
              <div className="react-competency-heading"><span className="react-competency-dot is-gap"/><div><h4>Skills to practice next</h4><p>Job skills not clearly covered in your course list</p></div><b>{result?.areas_to_work_on?.length || 0}</b></div>
            <div className="react-competency-list">
              {!result && <p className="react-competency-empty">We’ll suggest useful skills to practice after reviewing your course list.</p>}
              {result?.areas_to_work_on?.map((item) => <div className="react-competency-item react-gap-item" key={item.name}><div><b>{item.name}</b><span>{item.category}</span></div><strong className={item.severity === 'Critical Deficit' ? 'is-critical' : ''}>{item.severity}</strong><small>{item.gap_description}</small><button type="button" onClick={() => window.startBridgeScenario?.(targetRole)}>Practice in {item.bridge_scenario || currentRole.title} <span>→</span></button></div>)}
            </div>
          </article>
        </div>

        {result && <div className="react-remediation-banner"><div><span>YOUR NEXT STEP</span><h4>Practice a skill you haven’t covered yet</h4><p>Try a realistic task for your chosen role and put what you’ve learned into practice.</p></div><button type="button" className="btn btn-primary" onClick={startBridge}>Try a practice task <span>→</span></button></div>}
      </section>
    </div>
  );
}

export default CurriculumDiagnostic;
