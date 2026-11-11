import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import CurriculumDiagnostic from './pages/CurriculumDiagnostic.jsx';
import OpenChallenges from './pages/OpenChallenges.jsx';
import StudentLearning from './pages/StudentLearning.jsx';
import TaskStudio from './pages/TaskStudio.jsx';
import TalentInsights from './pages/TalentInsights.jsx';
import './workspace.css';

const studentPages = [
  { id: 'student', title: 'My learning', label: 'LEARNING', number: '01', caption: 'Plan your study and practice' },
  { id: 'student-analytics', title: 'Coursework check', label: 'GROWTH', number: '02', caption: 'See what to learn next' },
  { id: 'employer-tasks', title: 'Practice tasks', label: 'OPPORTUNITIES', number: '03', caption: 'Try tasks from employers' }
];

const employerPages = [
  { id: 'employer', title: 'Candidates', label: 'TALENT', number: '01', caption: 'Review work and results' },
  { id: 'sme', title: 'Share a task', label: 'CHALLENGES', number: '02', caption: 'Turn a work need into a project' },
  { id: 'radar', title: 'Skills insights', label: 'INSIGHTS', number: '03', caption: 'Compare skills and course content' }
];

function readSavedUser() {
  try {
    const saved = JSON.parse(localStorage.getItem('sabi-user') || 'null');
    if (saved?.role) return saved;
  } catch { /* storage may be unavailable */ }
  return { role: 'student', name: 'Ada Okafor', organization: 'University of Lagos' };
}

function WorkspaceHeader() {
  const [user, setUser] = useState(readSavedUser);
  const [activeTab, setActiveTab] = useState(location.hash.split('/')[1] || (user.role === 'employer' ? 'employer' : 'student'));
  const [dataSaver, setDataSaver] = useState(document.documentElement.dataset.mode === 'lite');
  const pages = user.role === 'employer' ? employerPages : studentPages;

  useEffect(() => {
    const onNavigation = (event) => setActiveTab(event.detail?.tabId || location.hash.split('/')[1]);
    const onSession = (event) => setUser(event.detail?.user || readSavedUser());
    const onMode = (event) => setDataSaver(event.detail?.mode === 'lite');
    window.addEventListener('sabi:navigation', onNavigation);
    window.addEventListener('sabi:session', onSession);
    window.addEventListener('sabi:mode', onMode);
    return () => {
      window.removeEventListener('sabi:navigation', onNavigation);
      window.removeEventListener('sabi:session', onSession);
      window.removeEventListener('sabi:mode', onMode);
    };
  }, []);

  const setPage = (id) => {
    window.switchTab(id);
    setActiveTab(id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 react-shell-inner">
      <div className="flex items-center justify-between h-16 react-shell-top">
        <a href="#" className="flex items-center gap-3 react-brand" aria-label="Sabi home">
          <span className="brand-mark" aria-hidden="true">S</span>
          <span className="react-brand-copy">
            <span className="react-brand-name">Sabi</span>
            <span className="react-brand-caption">Practical skills, shown through real work.</span>
          </span>
        </a>

        <div className="flex items-center gap-4 text-sm text-slate-600 react-account">
          <div id="auth-user-badge" className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full border border-slate-200 text-xs shadow-sm react-identity">
            <span id="auth-user-dot" className="w-2 h-2 rounded-full bg-emerald-500 status-dot" />
            <span id="auth-user-name" className="font-semibold text-slate-800">{user.name || 'User'}</span>
            <span id="auth-user-role-badge" className={user.role === 'student' ? 'badge-student' : 'badge-employer'}>
              {user.role === 'student' ? 'Student' : `Employer · ${user.organization || user.company || 'Partner'}`}
            </span>
          </div>
          <button type="button" onClick={() => window.logout()} className="btn btn-quiet btn-sm react-portal-switch">Switch Portal</button>
          <button
            type="button"
            className="mode-switch"
            role="switch"
            aria-checked={String(dataSaver)}
            aria-label="Data saver"
            title="Data saver loads fewer files and uses less data"
            onClick={() => window.toggleMode()}
          >
            <span className="mode-track"><i /></span><span className="mode-label">Data saver</span>
          </button>
        </div>
      </div>

      <nav className="tabs react-page-nav" role="tablist" aria-label="Workspace pages">
        <p className="react-nav-eyebrow">{user.role === 'student' ? 'STUDENT WORKSPACE' : 'EMPLOYER WORKSPACE'}</p>
        {pages.map((page) => (
          <button
            key={page.id}
            id={`nav-tab-${page.id}`}
            type="button"
            role="tab"
            aria-selected={activeTab === page.id}
            className={`tab-btn ${user.role === 'student' ? 'student-only' : 'employer-only'}${activeTab === page.id ? ' is-active' : ''}`}
            data-tab={page.id}
            onClick={() => setPage(page.id)}
          >
            <span className="react-nav-number">{page.number}</span>
            <span className="react-nav-copy"><span>{page.title}</span><small>{page.caption}</small></span>
            <span className="react-nav-arrow" aria-hidden="true">↗</span>
          </button>
        ))}
        <div className="react-shell-foot">
          <span className="react-shell-foot-mark">✓</span>
          <span><b>Results you can share</b><small>See what was checked and how.</small></span>
        </div>
      </nav>
    </div>
  );
}

function CandidateCard({ candidate, blind, onContact, contactStatus }) {
  const [survived, total] = candidate.signals?.shocks_survived || [0, 6];
  const name = blind ? candidate.candidate_alias : (candidate.candidate_name || candidate.candidate_alias);
  const school = blind ? 'Identity hidden' : (candidate.candidate_school || 'School not provided');
  const proofUrl = `${candidate.verification_url || `/verify/${candidate.brief_id}`}?blind=${blind}`;

  return (
    <article className="react-candidate-card">
      <div className="react-candidate-card-top">
        <div className="react-candidate-avatar" aria-hidden="true">{String(name || 'C').slice(0, 1).toUpperCase()}</div>
        <span className="react-verified-pill"><i /> Sabi checked</span>
      </div>
      <div className="react-candidate-ident">
        <h3>{name}</h3>
        <p>{candidate.target_role}</p>
        <span>{school}</span>
      </div>
      <div className="react-candidate-proof">
        <div className="react-proof-head"><span>Changes handled</span><b>{survived}<small>/{total}</small></b></div>
        <div className="react-proof-track" role="progressbar" aria-label="Shock tests survived" aria-valuenow={survived} aria-valuemin="0" aria-valuemax={total}>
          <i style={{ width: `${total ? Math.min(100, (survived / total) * 100) : 0}%` }} />
        </div>
        <div className="react-proof-points">
          <span><i>✓</i> Explained their work</span>
          <span><i>✓</i> Task checks passed</span>
        </div>
      </div>
      <div className="react-candidate-skills">
        <div className="react-section-eyebrow">SKILLS SHOWN IN THIS TASK</div>
        <div className="react-skill-list">
          {(candidate.skills || []).map((skill) => (
            <span className="react-skill-chip" key={skill.skill_id || skill.skill_name}>
              <b>{skill.skill_name || skill.skill_id}</b><small>{skill.level} · Tier {skill.tier}</small>
            </span>
          ))}
        </div>
      </div>
      <div className="react-candidate-card-footer">
        <span className="react-hash" title={candidate.sha256_digest || ''}>SHA · {(candidate.sha256_digest || '').slice(0, 8)}</span>
        <div className="flex flex-wrap justify-end gap-2">
          <a href={proofUrl} target="_blank" rel="noopener" className="react-proof-link">View signed result <span aria-hidden="true">↗</span></a>
          <button type="button" className="btn btn-primary btn-sm" onClick={() => onContact(candidate)} disabled={Boolean(contactStatus)}>
            {contactStatus === 'pending' ? 'Request sent' : contactStatus === 'accepted' ? 'Contact shared' : contactStatus === 'declined' ? 'Request declined' : 'Request introduction'}
          </button>
        </div>
      </div>
    </article>
  );
}

function CandidatePipeline() {
  const [user, setUser] = useState(readSavedUser);
  const [blind, setBlind] = useState(() => window.getBlindMode ? window.getBlindMode() : true);
  const [activeTab, setActiveTab] = useState(location.hash.split('/')[1] || 'student');
  const [candidates, setCandidates] = useState([]);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [query, setQuery] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);
  const [contactCandidate, setContactCandidate] = useState(null);
  const [contactMessage, setContactMessage] = useState('');
  const [contactSending, setContactSending] = useState(false);
  const [contactError, setContactError] = useState('');
  const [contactRequests, setContactRequests] = useState([]);

  useEffect(() => {
    const onSession = (event) => setUser(event.detail?.user || readSavedUser());
    const onNavigation = (event) => setActiveTab(event.detail?.tabId || location.hash.split('/')[1]);
    const onBlind = (event) => setBlind(Boolean(event.detail?.blind));
    window.addEventListener('sabi:session', onSession);
    window.addEventListener('sabi:navigation', onNavigation);
    window.addEventListener('sabi:blind', onBlind);
    return () => {
      window.removeEventListener('sabi:session', onSession);
      window.removeEventListener('sabi:navigation', onNavigation);
      window.removeEventListener('sabi:blind', onBlind);
    };
  }, []);

  const active = user.role === 'employer' && activeTab === 'employer';
  useEffect(() => {
    if (!active) return undefined;
    const controller = new AbortController();
    setStatus('loading');
    setError('');
    fetch(`/api/candidates?blind=${blind}`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error('Candidate pool could not be loaded.');
        return response.json();
      })
      .then((data) => {
        setCandidates(Array.isArray(data) ? data : []);
        setStatus('ready');
      })
      .catch((reason) => {
        if (reason.name === 'AbortError') return;
        setError(reason.message || 'Something went wrong while loading the pool.');
        setStatus('error');
      });
    return () => controller.abort();
  }, [active, blind, refreshKey]);

  useEffect(() => {
    if (!active || !user?.email) return undefined;
    const controller = new AbortController();
    fetch(`/api/employer/contact-requests?email=${encodeURIComponent(user.email)}`, { signal: controller.signal })
      .then((response) => response.ok ? response.json() : { requests: [] })
      .then((data) => setContactRequests(Array.isArray(data.requests) ? data.requests : []))
      .catch((reason) => { if (reason.name !== 'AbortError') setContactRequests([]); });
    return () => controller.abort();
  }, [active, user?.email, refreshKey]);

  const openContactRequest = (candidate) => {
    setContactCandidate(candidate);
    setContactMessage(`Hello, I reviewed your ${candidate.target_role || 'task'} result and would like to discuss an opportunity with you.`);
    setContactError('');
  };

  const sendContactRequest = async (event) => {
    event.preventDefault();
    if (!user?.email) {
      setContactError('Please sign in with an employer account that has an email address.');
      return;
    }
    setContactSending(true);
    setContactError('');
    try {
      const response = await fetch('/api/contact-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brief_id: contactCandidate.brief_id,
          employer_name: user.name || 'Hiring team',
          employer_email: user.email,
          employer_organization: user.organization || user.company || '',
          message: contactMessage
        })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'The introduction request could not be sent.');
      setContactCandidate(null);
      setRefreshKey((value) => value + 1);
    } catch (error) {
      setContactError(error.message || 'The introduction request could not be sent.');
    } finally {
      setContactSending(false);
    }
  };

  const roles = [...new Set(candidates.map((candidate) => candidate.target_role).filter(Boolean))].sort();
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const visibleCandidates = candidates.filter((candidate) => {
    const roleMatch = filterRole === 'all' || candidate.target_role === filterRole;
    const haystack = [candidate.candidate_alias, candidate.candidate_name, candidate.target_role, ...(candidate.skills || []).map((skill) => skill.skill_name)].join(' ').toLocaleLowerCase();
    return roleMatch && (!normalizedQuery || haystack.includes(normalizedQuery));
  });
  const passed = candidates.filter((candidate) => {
    const [survived, total] = candidate.signals?.shocks_survived || [0, 6];
    return survived === total;
  }).length;
  const capabilityCount = candidates.reduce((count, candidate) => count + (candidate.skills?.length || 0), 0);

  return (
    <div className="react-pipeline space-y-6">
      <div className="react-pipeline-hero">
        <div>
          <div className="react-section-eyebrow">REVIEW CANDIDATES</div>
          <h2>See what candidates can do.</h2>
          <p>Review practical task results before deciding who to interview. Each result links to a signed record you can verify.</p>
        </div>
        <div className="react-pipeline-actions">
          <span className={`react-blind-status${blind ? ' is-on' : ''}`}><i /> {blind ? 'Names hidden' : 'Names shown'}</span>
          <button id="btn-toggle-blind" type="button" onClick={() => window.toggleBlindMode()} className={`btn ${blind ? 'btn-primary' : 'btn-quiet'} btn-sm`}>
            {blind ? 'Show names' : 'Hide names'}
          </button>
          <button type="button" onClick={() => setRefreshKey((value) => value + 1)} className="btn btn-quiet btn-sm">Refresh</button>
        </div>
      </div>

      <div className="react-pipeline-stats" aria-label="Pipeline summary">
        <div><span>Verified candidates</span><b>{status === 'loading' ? '—' : candidates.length.toString().padStart(2, '0')}</b><small>in your current pool</small></div>
        <div><span>All task checks passed</span><b>{status === 'loading' ? '—' : `${passed}/${candidates.length}`}</b><small>passed every change test</small></div>
        <div><span>Skills shown</span><b>{status === 'loading' ? '—' : capabilityCount.toString().padStart(2, '0')}</b><small>across candidate results</small></div>
      </div>

      {contactRequests.length > 0 && <section className="panel space-y-3">
        <div><h3 className="font-semibold text-slate-900">Introduction requests</h3><p className="text-xs text-slate-500">Candidates choose whether to share their contact details.</p></div>
        <div className="grid gap-2">{contactRequests.map((request) => <div key={request.request_id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 p-3 text-sm">
          <div><b>{request.candidate_alias}</b><span className="ml-2 text-xs text-slate-500">{request.employer_organization || request.employer_name}</span><p className="mt-1 text-xs text-slate-600">{request.message}</p></div>
          {request.status === 'accepted' && request.candidate_email ? <a className="btn btn-primary btn-sm" href={`mailto:${encodeURIComponent(request.candidate_email)}`}>Email candidate</a> : <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800">{request.status === 'declined' ? 'Declined' : 'Waiting for candidate'}</span>}
        </div>)}</div>
      </section>}

      <div className="react-pipeline-toolbar">
          <div><h3>Candidate results</h3><p>Filter by role or search for a skill.</p></div>
        <div className="react-pipeline-filters">
          <label className="react-search"><span aria-hidden="true">⌕</span><input aria-label="Search candidates" placeholder="Search name, role or skill" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
          <label className="react-role-filter"><span className="sr-only">Filter by target role</span><select value={filterRole} onChange={(event) => setFilterRole(event.target.value)}><option value="all">All roles</option>{roles.map((role) => <option key={role} value={role}>{role}</option>)}</select></label>
        </div>
      </div>

      {status === 'loading' && <div className="react-pipeline-message"><span className="spinner" /> Loading candidate results…</div>}
      {status === 'error' && <div className="react-pipeline-message is-error" role="alert">{error}<button className="btn btn-quiet btn-sm" onClick={() => setRefreshKey((value) => value + 1)}>Try again</button></div>}
      {status === 'ready' && visibleCandidates.length === 0 && <div className="react-pipeline-message">No candidates match your filters. Clear the search or choose another role.</div>}
      {status === 'ready' && visibleCandidates.length > 0 && (
        <div className="react-candidate-grid">{visibleCandidates.map((candidate) => <CandidateCard key={candidate.brief_id} candidate={candidate} blind={blind} onContact={openContactRequest} contactStatus={contactRequests.find((request) => request.brief_id === candidate.brief_id)?.status || ''} />)}</div>
      )}

      {contactCandidate && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setContactCandidate(null); }}>
        <form className="w-full max-w-lg space-y-4 rounded-2xl bg-white p-6 shadow-2xl" onSubmit={sendContactRequest} role="dialog" aria-modal="true" aria-labelledby="contact-request-title">
          <div><p className="react-eyebrow">CANDIDATE INTRODUCTION</p><h3 id="contact-request-title" className="text-xl font-semibold text-slate-900">Request an introduction</h3><p className="mt-1 text-sm text-slate-600">Your message will be shared with {contactCandidate.candidate_alias}. Their contact details stay private unless they accept.</p></div>
          <label className="block text-sm font-medium text-slate-700">Your message<textarea className="field mt-1 w-full" rows="5" minLength="10" maxLength="1000" value={contactMessage} onChange={(event) => setContactMessage(event.target.value)} required /></label>
          {contactError && <p className="text-sm text-rose-700" role="alert">{contactError}</p>}
          <div className="flex justify-end gap-2"><button type="button" className="btn btn-quiet" onClick={() => setContactCandidate(null)}>Cancel</button><button type="submit" className="btn btn-primary" disabled={contactSending}>{contactSending ? 'Sending…' : 'Send request'}</button></div>
        </form>
      </div>}
    </div>
  );
}

const root = document.getElementById('workspace-header-root');
if (root && document.documentElement.dataset.mode === 'full') {
  createRoot(root).render(<WorkspaceHeader />);
}
const studentRoot = document.getElementById('react-student-learning');
if (studentRoot && document.documentElement.dataset.mode === 'full') {
  createRoot(studentRoot).render(<StudentLearning />);
}
const studioRoot = document.getElementById('react-task-studio');
if (studioRoot && document.documentElement.dataset.mode === 'full') {
  createRoot(studioRoot).render(<TaskStudio />);
}
const insightsRoot = document.getElementById('react-talent-insights');
if (insightsRoot && document.documentElement.dataset.mode === 'full') {
  window.reactTalentInsightsLoaded = true;
  createRoot(insightsRoot).render(<TalentInsights />);
}
const candidateRoot = document.getElementById('react-candidate-pipeline');
if (candidateRoot && document.documentElement.dataset.mode === 'full') {
  window.reactCandidatePipelineLoaded = true;
  createRoot(candidateRoot).render(<CandidatePipeline />);
}
const curriculumRoot = document.getElementById('react-curriculum-root');
if (curriculumRoot && document.documentElement.dataset.mode === 'full') {
  window.reactCurriculumLoaded = true;
  createRoot(curriculumRoot).render(<CurriculumDiagnostic />);
}
const challengesRoot = document.getElementById('react-open-challenges');
if (challengesRoot && document.documentElement.dataset.mode === 'full') {
  window.reactOpenChallengesLoaded = true;
  createRoot(challengesRoot).render(<OpenChallenges />);
}
