import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import CurriculumDiagnostic from './pages/CurriculumDiagnostic.jsx';
import OpenChallenges from './pages/OpenChallenges.jsx';
import StudentLearning from './pages/StudentLearning.jsx';
import TaskStudio from './pages/TaskStudio.jsx';
import TalentInsights from './pages/TalentInsights.jsx';
import './workspace.css';

const studentPages = [
  { id: 'student', title: 'My learning', label: 'LEARNING', number: '01', caption: 'Plan and prove your skills' },
  { id: 'student-analytics', title: 'Skills diagnostic', label: 'GROWTH', number: '02', caption: 'Find your curriculum gaps' },
  { id: 'employer-tasks', title: 'Open challenges', label: 'OPPORTUNITIES', number: '03', caption: 'Solve real business briefs' }
];

const employerPages = [
  { id: 'employer', title: 'Candidate pipeline', label: 'TALENT', number: '01', caption: 'Review verified candidates' },
  { id: 'sme', title: 'Tasks & SME studio', label: 'CHALLENGES', number: '02', caption: 'Publish practical work' },
  { id: 'radar', title: 'Talent insights', label: 'INTELLIGENCE', number: '03', caption: 'Explore capability gaps' }
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
            <span className="react-brand-caption">Capability, proven.</span>
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
          <span><b>Evidence you can stand behind</b><small>Code verifies. People explain.</small></span>
        </div>
      </nav>
    </div>
  );
}

function CandidateCard({ candidate, blind }) {
  const [survived, total] = candidate.signals?.shocks_survived || [0, 6];
  const name = blind ? candidate.candidate_alias : (candidate.candidate_name || candidate.candidate_alias);
  const school = blind ? 'Identity hidden in blind mode' : (candidate.candidate_school || 'School not provided');
  const proofUrl = `${candidate.verification_url || `/verify/${candidate.brief_id}`}?blind=${blind}`;

  return (
    <article className="react-candidate-card">
      <div className="react-candidate-card-top">
        <div className="react-candidate-avatar" aria-hidden="true">{String(name || 'C').slice(0, 1).toUpperCase()}</div>
        <span className="react-verified-pill"><i /> Tier A verified</span>
      </div>
      <div className="react-candidate-ident">
        <h3>{name}</h3>
        <p>{candidate.target_role}</p>
        <span>{school}</span>
      </div>
      <div className="react-candidate-proof">
        <div className="react-proof-head"><span>Scenario resilience</span><b>{survived}<small>/{total}</small></b></div>
        <div className="react-proof-track" role="progressbar" aria-label="Shock tests survived" aria-valuenow={survived} aria-valuemin="0" aria-valuemax={total}>
          <i style={{ width: `${total ? Math.min(100, (survived / total) * 100) : 0}%` }} />
        </div>
        <div className="react-proof-points">
          <span><i>✓</i> Defence passed</span>
          <span><i>✓</i> Model constraints held</span>
        </div>
      </div>
      <div className="react-candidate-skills">
        <div className="react-section-eyebrow">VERIFIED CAPABILITIES</div>
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
        <a href={proofUrl} target="_blank" rel="noopener" className="react-proof-link">Verify record <span aria-hidden="true">↗</span></a>
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
          <div className="react-section-eyebrow">TALENT, VERIFIED</div>
          <h2>Candidate pipeline</h2>
          <p>Start with what people can do. Every profile is backed by a signed, scenario-tested evidence record.</p>
        </div>
        <div className="react-pipeline-actions">
          <span className={`react-blind-status${blind ? ' is-on' : ''}`}><i /> {blind ? 'Blind review on' : 'Identity visible'}</span>
          <button id="btn-toggle-blind" type="button" onClick={() => window.toggleBlindMode()} className={`btn ${blind ? 'btn-primary' : 'btn-quiet'} btn-sm`}>
            {blind ? 'Reveal identity' : 'Hide identity'}
          </button>
          <button type="button" onClick={() => setRefreshKey((value) => value + 1)} className="btn btn-quiet btn-sm">Refresh</button>
        </div>
      </div>

      <div className="react-pipeline-stats" aria-label="Pipeline summary">
        <div><span>Verified candidates</span><b>{status === 'loading' ? '—' : candidates.length.toString().padStart(2, '0')}</b><small>in your current pool</small></div>
        <div><span>Full scenario passes</span><b>{status === 'loading' ? '—' : `${passed}/${candidates.length}`}</b><small>survived every stress test</small></div>
        <div><span>Evidence points</span><b>{status === 'loading' ? '—' : capabilityCount.toString().padStart(2, '0')}</b><small>verified capability records</small></div>
      </div>

      <div className="react-pipeline-toolbar">
        <div><h3>Verified talent</h3><p>Compare evidence across the role tracks you are hiring for.</p></div>
        <div className="react-pipeline-filters">
          <label className="react-search"><span aria-hidden="true">⌕</span><input aria-label="Search candidates" placeholder="Search name or capability" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
          <label className="react-role-filter"><span className="sr-only">Filter by target role</span><select value={filterRole} onChange={(event) => setFilterRole(event.target.value)}><option value="all">All roles</option>{roles.map((role) => <option key={role} value={role}>{role}</option>)}</select></label>
        </div>
      </div>

      {status === 'loading' && <div className="react-pipeline-message"><span className="spinner" /> Loading verified candidate records…</div>}
      {status === 'error' && <div className="react-pipeline-message is-error" role="alert">{error}<button className="btn btn-quiet btn-sm" onClick={() => setRefreshKey((value) => value + 1)}>Try again</button></div>}
      {status === 'ready' && visibleCandidates.length === 0 && <div className="react-pipeline-message">No candidates match those filters. Clear the search or choose another role.</div>}
      {status === 'ready' && visibleCandidates.length > 0 && (
        <div className="react-candidate-grid">{visibleCandidates.map((candidate) => <CandidateCard key={candidate.brief_id} candidate={candidate} blind={blind} />)}</div>
      )}
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
