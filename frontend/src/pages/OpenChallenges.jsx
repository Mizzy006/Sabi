import React, { useMemo, useState } from 'react';

const tracks = [
  ['all', 'All challenges'],
  ['operations_associate', 'Operations'],
  ['graduate_supply_chain_analyst', 'Supply chain'],
  ['junior_data_analyst', 'Data analyst'],
  ['financial_modelling_intern', 'Financial modelling']
];

export default function OpenChallenges() {
  const [tasks, setTasks] = useState([]);
  const [track, setTrack] = useState('all');
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(0);

  React.useEffect(() => {
    let active = true;
    setStatus('loading');
    fetch('/api/employer/tasks')
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok || !Array.isArray(data.tasks)) throw new Error(data.detail || 'Could not load challenges.');
        return data.tasks;
      })
      .then((items) => { if (active) { setTasks(items); setStatus('ready'); } })
      .catch((err) => { if (active) { setError(err.message || 'Could not load challenges.'); setStatus('error'); } });
    return () => { active = false; };
  }, [refresh]);

  const visible = useMemo(() => tasks.filter((task) => {
    const matchesTrack = track === 'all' || task.role_track === track;
    const text = `${task.title} ${task.company_name} ${task.problem_statement} ${(task.skill_tags || []).join(' ')}`.toLowerCase();
    return matchesTrack && text.includes(query.trim().toLowerCase());
  }), [tasks, track, query]);

  const takeChallenge = (task) => {
    window.takeEmployerChallenge(task.id, task.role_track);
  };

  return (
    <div className="react-challenges">
      <section className="react-challenges-hero">
        <div className="react-challenges-copy">
          <span className="react-eyebrow">PRACTICE WITH REAL WORK</span>
          <h2>Tasks from employers</h2>
          <p>Try practical tasks shared by employers and Nigerian businesses. Some strong submissions may lead to an interview.</p>
        </div>
        <div className="react-challenges-hero-stat"><span>Open tasks</span><strong>{status === 'ready' ? String(tasks.length).padStart(2, '0') : '—'}</strong><small>Across several career paths</small></div>
      </section>

      <div className="react-challenges-toolbar">
        <div className="react-challenge-tracks" role="group" aria-label="Filter challenges by role">
          {tracks.map(([value, label]) => <button key={value} type="button" className={track === value ? 'is-active' : ''} onClick={() => setTrack(value)}>{label}</button>)}
        </div>
        <div className="react-challenge-controls">
          <label className="react-search"><span aria-hidden="true">⌕</span><input aria-label="Search challenges" placeholder="Search tasks or skills" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
          <button className="btn btn-quiet btn-sm" onClick={() => setRefresh((value) => value + 1)}>Refresh</button>
        </div>
      </div>

      {status === 'loading' && <div className="react-pipeline-message"><span className="spinner" /> Loading tasks…</div>}
      {status === 'error' && <div className="react-pipeline-message is-error" role="alert">{error}<button className="btn btn-quiet btn-sm" onClick={() => setRefresh((value) => value + 1)}>Try again</button></div>}
      {status === 'ready' && visible.length === 0 && <div className="react-pipeline-message">No tasks match your filters. Try another role or search.</div>}
      {status === 'ready' && visible.length > 0 && <div className="react-challenge-grid">{visible.map((task) => (
        <article className="react-challenge-card" key={task.id}>
          <div className="react-challenge-card-top"><span className="react-challenge-company">{task.company_name || 'Business partner'}</span><span className="react-challenge-time">◷ About {task.timebox_mins || 90} minutes</span></div>
          <div className="react-challenge-role">{task.role_title || task.role_track?.replaceAll('_', ' ')}</div>
          <h3>{task.title}</h3>
          <p className="react-challenge-description">{task.problem_statement}</p>
          {!!task.deliverables?.length && <div className="react-challenge-deliverables"><span>WHAT YOU’LL MAKE</span><ul>{task.deliverables.slice(0, 3).map((item) => <li key={item}><i>✓</i>{item}</li>)}</ul></div>}
          <div className="react-challenge-footer"><div className="react-challenge-tags">{(task.skill_tags || []).slice(0, 4).map((tag) => <span key={tag}>{tag}</span>)}</div><button className="react-challenge-cta" onClick={() => takeChallenge(task)}>Try this task <span aria-hidden="true">↗</span></button></div>
        </article>
      ))}</div>}
    </div>
  );
}
