import React, { useEffect, useState } from 'react';

function savedUser() {
  try { return JSON.parse(localStorage.getItem('sabi-user') || 'null') || { name: 'Ada Okafor', email: 'ada@unilag.edu.ng' }; }
  catch { return { name: 'Ada Okafor', email: 'ada@unilag.edu.ng' }; }
}

export default function StudentLearning() {
  const [user, setUser] = useState(savedUser);
  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [requestError, setRequestError] = useState('');
  const [responding, setResponding] = useState('');

  const loadRequests = async (signal) => {
    if (!user?.email || !user?.name) return;
    setLoadingRequests(true);
    try {
      const params = new URLSearchParams({ email: user.email, name: user.name });
      const response = await fetch(`/api/student/contact-requests?${params}`, { signal });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'Could not load introduction requests.');
      setRequests(Array.isArray(data.requests) ? data.requests : []);
      setRequestError('');
    } catch (error) {
      if (error.name !== 'AbortError') setRequestError(error.message || 'Could not load introduction requests.');
    } finally {
      setLoadingRequests(false);
    }
  };

  useEffect(() => {
    const onSession = (event) => setUser(event.detail?.user || savedUser());
    window.addEventListener('sabi:session', onSession);
    return () => window.removeEventListener('sabi:session', onSession);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadRequests(controller.signal);
    return () => controller.abort();
  }, [user?.email, user?.name]);

  const respond = async (request, decision) => {
    setResponding(request.request_id);
    setRequestError('');
    try {
      const response = await fetch('/api/student/contact-requests/decision', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ request_id: request.request_id, candidate_name: request.candidate_name, candidate_email: user.email, decision })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || 'Could not update this request.');
      await loadRequests();
    } catch (error) {
      setRequestError(error.message || 'Could not update this request.');
    } finally {
      setResponding('');
    }
  };

  return (
    <div className="react-learning-page">
      <section className="react-learning-hero">
        <div className="react-learning-hero-copy">
          <span className="react-eyebrow">YOUR LEARNING PLAN</span>
          <h1>Get ready for the work you want to do.</h1>
          <p>Choose a role, set a study pace that works for you, and practice with a realistic task.</p>
          <div className="react-learning-promise"><span>01</span> Choose a role <i>→</i><span>02</span> Follow your plan <i>→</i><span>03</span> Try a real task</div>
        </div>
        <div className="react-learning-hero-art" aria-hidden="true"><div className="react-learning-orbit orbit-one"/><div className="react-learning-orbit orbit-two"/><div className="react-learning-orbit orbit-three"/><div className="react-learning-core"><span>SKILL</span><strong>→</strong><span>PROOF</span></div><b className="learning-float float-one">✳</b><b className="learning-float float-two">✓</b></div>
      </section>
      <div className="react-learning-intro"><div><span className="react-eyebrow">START HERE</span><h2>Your role shapes your study plan and practice task.</h2></div><p>Choose the kind of job you want. We’ll suggest what to study and give you a task to try.</p></div>
      {(requests.length > 0 || loadingRequests || requestError) && <section className="panel space-y-4" aria-labelledby="intro-requests-title">
        <div><span className="react-eyebrow">YOUR CHOICE</span><h2 id="intro-requests-title" className="text-xl font-semibold text-slate-900">Employer introduction requests</h2><p className="mt-1 text-sm text-slate-600">Review a message before deciding whether to share your email address.</p></div>
        {loadingRequests && <p className="text-sm text-slate-500">Checking for requests…</p>}
        {requestError && <p className="text-sm text-rose-700" role="alert">{requestError}</p>}
        {requests.map((request) => <article key={request.request_id} className="rounded-xl border border-slate-200 p-4">
          <div className="flex flex-wrap items-start justify-between gap-3"><div><h3 className="font-semibold text-slate-900">{request.employer_organization || request.employer_name}</h3><p className="text-xs text-slate-500">About your {request.brief_id ? 'verified result' : 'profile'}</p></div><span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium capitalize text-slate-700">{request.status}</span></div>
          <p className="mt-3 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">{request.message}</p>
          {request.status === 'pending' && <div className="mt-3 flex justify-end gap-2"><button type="button" className="btn btn-quiet btn-sm" disabled={responding === request.request_id} onClick={() => respond(request, 'declined')}>Decline</button><button type="button" className="btn btn-primary btn-sm" disabled={responding === request.request_id} onClick={() => respond(request, 'accepted')}>{responding === request.request_id ? 'Saving…' : 'Accept and share my email'}</button></div>}
        </article>)}
        {!loadingRequests && requests.length === 0 && !requestError && <p className="text-sm text-slate-500">You don’t have any introduction requests yet.</p>}
      </section>}
    </div>
  );
}
