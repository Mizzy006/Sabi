import React, { useCallback, useEffect, useMemo, useState } from 'react';

const departments = ['Accounting', 'Economics', 'Computer Science', 'Finance'];
const readable = (value = '') => value.replaceAll('_', ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());

function GapCard({ item }) {
  const demand = Math.max(0, Math.min(100, Math.round(item.demand * 100)));
  const coverage = Math.max(0, Math.min(100, Math.round(item.coverage * 100)));
  const gap = Math.round(item.gap * 100);
  const deficit = gap > 0;
  return (
    <article className="react-insight-gap">
      <div className="react-insight-gap-heading"><div><span>{readable(item.category || 'Skill area')}</span><h4>{readable(item.skill)}</h4></div><b className={deficit ? 'is-deficit' : 'is-covered'}>{deficit ? `${gap}% course gap` : `${Math.abs(gap)}% more course coverage`}</b></div>
      <div className="react-insight-bars">
        <div className="react-insight-bar-row"><span>Asked for in jobs</span><div><i className="demand" style={{ width: `${demand}%` }} /></div><b>{demand}%</b></div>
        <div className="react-insight-bar-row"><span>Covered in courses</span><div><i className="coverage" style={{ width: `${coverage}%` }} /></div><b>{coverage}%</b></div>
      </div>
    </article>
  );
}

function FunnelCard({ funnel }) {
  const steps = [
    ['Taught in curriculum', funnel.taught_pct, 'taught'],
    ['Practiced in hands-on work', funnel.practiced_pct, 'practiced'],
    ['Proven on Sabi', funnel.proven_pct, 'proven']
  ];
  return (
    <article className="react-insight-funnel">
      <div className="react-insight-funnel-head"><span className="react-insight-funnel-mark">{funnel.department?.slice(0, 1)}</span><div><span>COHORT PROGRESSION</span><h4>{funnel.department}</h4></div></div>
      <div className="react-insight-funnel-steps">{steps.map(([label, raw, style], index) => { const value = Math.max(0, Math.min(100, Number(raw) || 0)); return <div className="react-insight-step" key={style}><div className="react-insight-step-label"><span><i>{String(index + 1).padStart(2, '0')}</i>{label}</span><b>{value}%</b></div><div className="react-insight-step-track"><i className={style} style={{ width: `${value}%` }} /></div></div>; })}</div>
    </article>
  );
}

export default function TalentInsights() {
  const [department, setDepartment] = useState('');
  const [payload, setPayload] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState('');
  const [refresh, setRefresh] = useState(0);

  const fetchInsights = useCallback(async () => {
    setStatus('loading');
    setError('');
    try {
      const params = new URLSearchParams();
      if (department) params.set('department', department);
      const response = await fetch(`/api/radar/heatmap${params.size ? `?${params}` : ''}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'Unable to load talent insights.');
      setPayload(data);
      setStatus('ready');
    } catch (err) {
      setError(err.message || 'Unable to load talent insights.');
      setStatus('error');
    }
  }, [department]);

  useEffect(() => { fetchInsights(); }, [fetchInsights, refresh]);
  useEffect(() => {
    const refreshData = () => setRefresh((value) => value + 1);
    window.addEventListener('sabi:radar-refresh', refreshData);
    return () => window.removeEventListener('sabi:radar-refresh', refreshData);
  }, []);

  const metrics = useMemo(() => {
    const gaps = payload?.gaps || [];
    const deficit = gaps.filter((item) => item.gap > 0).length;
    const average = gaps.length ? Math.round(gaps.reduce((sum, item) => sum + item.coverage, 0) / gaps.length * 100) : 0;
    return { gapCount: deficit, average, postings: payload?.postings_count || 0 };
  }, [payload]);

  return (
    <div className="react-insights-page">
      <section className="react-insights-hero">
        <div className="react-insights-copy"><span className="react-eyebrow">SKILLS AND COURSE CONTENT</span><h2>Are graduates learning the skills employers need?</h2><p>Compare skills requested in job listings with what courses cover and what graduates have practiced.</p></div>
        <label className="react-insights-filter"><span>SHOW DEPARTMENT</span><select aria-label="Filter by department" value={department} onChange={(event) => setDepartment(event.target.value)}><option value="">All departments</option>{departments.map((item) => <option key={item} value={item}>{item}</option>)}</select></label>
      </section>

      <div className="react-insights-metrics">
        <div><span>Job listings reviewed</span><b>{status === 'ready' ? metrics.postings : '—'}</b><small>Sample listings in this view</small></div>
        <div><span>Skills with a course gap</span><b>{status === 'ready' ? metrics.gapCount : '—'}</b><small>Jobs ask for these more often</small></div>
        <div><span>Average course coverage</span><b>{status === 'ready' ? `${metrics.average}%` : '—'}</b><small>For the selected departments</small></div>
      </div>

      <section className="react-insights-section">
        <div className="react-insights-section-head"><div><span className="react-eyebrow">SKILLS COMPARISON</span><h3>What jobs ask for and courses teach</h3><p>Higher bars mean more job listings ask for a skill or more courses cover it.</p></div><div className="react-insights-legend"><span><i className="demand"/>Asked for in jobs</span><span><i className="coverage"/>Covered in courses</span></div></div>
        {status === 'loading' && <div className="react-pipeline-message"><span className="spinner"/> Analyzing the skills landscape…</div>}
        {status === 'error' && <div className="react-pipeline-message is-error" role="alert">{error}<button className="btn btn-quiet btn-sm" onClick={() => setRefresh((value) => value + 1)}>Try again</button></div>}
        {status === 'ready' && payload?.gaps?.length === 0 && <div className="react-pipeline-message">No skill data is available for this department yet. Choose another focus area.</div>}
        {status === 'ready' && payload?.gaps?.length > 0 && <div className="react-insights-gap-grid">{payload.gaps.slice(0, 10).map((item) => <GapCard key={item.skill} item={item}/>)}</div>}
      </section>

      <section className="react-insights-section react-insights-cohorts">
        <div className="react-insights-section-head"><div><span className="react-eyebrow">STUDENT PROGRESS</span><h3>From learning to showing your work</h3><p>See how many students have studied, practiced, and demonstrated these skills.</p></div></div>
        {status === 'ready' && payload?.funnels?.length > 0 && <div className="react-insights-funnel-grid">{payload.funnels.map((funnel) => <FunnelCard key={funnel.department} funnel={funnel}/>)}</div>}
      </section>
    </div>
  );
}
