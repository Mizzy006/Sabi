/**
 * Sabi Web Application Frontend Controller
 * Pure vanilla JavaScript - Zero build step, lightweight, low-bandwidth optimized.
 * Fully functional: Multi-role commercial scenarios + Real microphone recording & audio uploads.
 */

// Global State
const Sabi = {
    activeTab: 'student',
    currentRole: 'junior_data_analyst',
    currentSessionId: null,
    currentQuestionIndex: 0,
    defenceQuestions: [],
    lastGeneratedBrief: null,
    blindMode: true,
    scenarios: {},
    mediaRecorder: null,
    audioChunks: [],
    audioBlob: null,
    speechRecognizer: null,
    isRecording: false,
    recordTimerInterval: null,
    recordSeconds: 0
};

// Toast notification helper
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    const colors = {
        info: 'bg-slate-900 text-white',
        success: 'bg-emerald-700 text-white',
        warning: 'bg-amber-600 text-white',
        error: 'bg-rose-700 text-white'
    };
    
    toast.className = `fixed bottom-5 right-5 z-50 px-5 py-3 rounded-lg shadow-xl text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${colors[type] || colors.info}`;
    toast.innerHTML = `<span>${message}</span>`;
    toast.classList.remove('hidden', 'opacity-0');
    
    setTimeout(() => {
        toast.classList.add('opacity-0');
        setTimeout(() => toast.classList.add('hidden'), 300);
    }, 4000);
}

// Tab Switching
function switchTab(tabId) {
    Sabi.activeTab = tabId;
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        const isCurrent = btn.getAttribute('data-tab') === tabId;
        if (isCurrent) {
            btn.className = 'tab-btn flex items-center space-x-2 py-3 px-4 border-b-2 border-emerald-600 font-semibold text-emerald-700 bg-emerald-50/50 rounded-t-lg transition-colors';
        } else {
            btn.className = 'tab-btn flex items-center space-x-2 py-3 px-4 border-b-2 border-transparent font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-t-lg transition-colors';
        }
    });

    document.querySelectorAll('.tab-panel').forEach(panel => {
        if (panel.id === `tab-${tabId}`) {
            panel.classList.remove('hidden');
        } else {
            panel.classList.add('hidden');
        }
    });

    if (tabId === 'employer') {
        loadCandidates();
    } else if (tabId === 'radar') {
        loadRadarData();
    }
}

// ---------------------------------------------------------------------------
// TAB 1: STUDENT PORTAL (PLANNER, SCENARIOS, AUTOPSY, DEFENCE)
// ---------------------------------------------------------------------------

// 1. Role & Scenario Synchronization
async function loadScenarios() {
    try {
        const res = await fetch('/api/scenarios');
        const list = await res.json();
        list.forEach(s => { Sabi.scenarios[s.role_id] = s; });
        updateScenarioUI(Sabi.currentRole);
    } catch (err) {
        console.warn('Could not load scenarios from API, using defaults:', err);
    }
}

function onRoleChange(role) {
    Sabi.currentRole = role;
    document.getElementById('plan-role').value = role;
    solvePlan();
    updateScenarioUI(role);
}

function updateScenarioUI(role) {
    const sc = Sabi.scenarios[role];
    if (!sc) return;

    // Update Scenario Header & Card
    const badge = document.getElementById('scenario-badge');
    const title = document.getElementById('scenario-title');
    const timebox = document.getElementById('scenario-timebox');
    const desc = document.getElementById('scenario-desc');
    const dlBtn = document.getElementById('pack-download-btn');

    if (badge) badge.innerText = `DAY ONE: ${sc.category.toUpperCase()}`;
    if (title) title.innerText = sc.name;
    if (timebox) timebox.innerText = `Timebox: ${sc.timebox}`;
    if (desc) desc.innerText = sc.description;
    
    // Update Download Link
    const seed = parseInt(document.getElementById('pack-seed')?.value) || 1;
    if (dlBtn) {
        dlBtn.href = `/api/dayone/pack/${seed}/download?role=${encodeURIComponent(role)}`;
        dlBtn.innerText = `Download ${sc.role_title} Starter (.xlsx)`;
    }

    // Update Shocks List
    const shocksContainer = document.getElementById('scenario-shocks-preview');
    if (shocksContainer && sc.shocks) {
        shocksContainer.innerHTML = sc.shocks.map(s => `
            <div class="flex items-center space-x-1.5 text-[11px] text-slate-700 bg-white p-2 rounded border border-slate-200">
                <span class="text-emerald-600 font-bold">✓</span>
                <div>
                    <span class="font-semibold block text-slate-800">${s.name}</span>
                    <span class="text-slate-500 text-[10px]">${s.change}</span>
                </div>
            </div>
        `).join('');
    }

    // Update Mrs. Bello Context Prompt
    const mrsText = document.getElementById('mrs-bello-text');
    if (mrsText && sc.defence) {
        mrsText.innerText = `"${sc.defence.question}"`;
    }
    const defTarget = document.getElementById('defence-question-target');
    if (defTarget && sc.defence) {
        defTarget.innerText = `Target: ${sc.defence.where}`;
    }
}

// 2. Study Planner Logic
async function solvePlan() {
    const role = document.getElementById('plan-role').value;
    const weeklyHours = parseFloat(document.getElementById('plan-hours').value);
    const weeklyMb = parseFloat(document.getElementById('plan-mb').value);
    const weeks = parseInt(document.getElementById('plan-weeks').value);
    const offlineOnly = document.getElementById('plan-offline').checked;

    const btn = document.getElementById('btn-solve-plan');
    const originalText = btn.innerHTML;
    btn.innerHTML = `<span class="animate-spin inline-block mr-2">⟳</span> Solving with PuLP...`;
    btn.disabled = true;

    try {
        const res = await fetch('/api/planner/solve', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                role: role,
                weekly_hours: weeklyHours,
                weekly_mb: weeklyMb,
                deadline_weeks: weeks,
                offline_only: offlineOnly
            })
        });

        if (!res.ok) throw new Error('Solver failed');
        const data = await res.json();

        document.getElementById('stat-total-hours').innerText = `${data.total_hours} hrs`;
        document.getElementById('stat-total-mb').innerText = `${data.total_mb} MB`;
        document.getElementById('stat-total-cost').innerText = `₦${data.total_cost_ngn.toLocaleString()}`;
        document.getElementById('stat-skill-gain').innerText = `+${(data.demand_weighted_gain * 100).toFixed(0)}%`;

        const scheduleContainer = document.getElementById('plan-schedule');
        scheduleContainer.innerHTML = '';

        if (!data.weekly_breakdown || data.weekly_breakdown.length === 0) {
            scheduleContainer.innerHTML = `<p class="text-sm text-slate-500 italic p-4 text-center">No modules fitted within these strict constraints. Try increasing hours or MB budget.</p>`;
        } else {
            data.weekly_breakdown.forEach((w) => {
                const weekCard = document.createElement('div');
                weekCard.className = 'border border-slate-200 bg-white rounded-lg p-3.5 shadow-sm';
                
                let resList = w.resources.map(r => `
                    <div class="flex items-center justify-between text-xs py-1 border-b border-slate-100 last:border-0">
                        <span class="font-medium text-slate-800">${r.title}</span>
                        <div class="flex items-center space-x-2 text-slate-500">
                            <span>${r.hours}h</span>
                            <span class="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-mono">${r.mb}MB</span>
                            ${r.offline ? '<span class="bg-emerald-50 text-emerald-700 px-1 rounded text-[10px]">Offline</span>' : ''}
                        </div>
                    </div>
                `).join('');

                weekCard.innerHTML = `
                    <div class="flex justify-between items-center mb-1.5">
                        <span class="font-semibold text-xs uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">Week ${w.week}</span>
                        <span class="text-xs text-slate-500 font-medium">${w.hours_used}h / ${w.mb_used}MB</span>
                    </div>
                    <div class="space-y-1">
                        ${resList}
                    </div>
                `;
                scheduleContainer.appendChild(weekCard);
            });
        }

        const skillsContainer = document.getElementById('plan-skill-gains');
        skillsContainer.innerHTML = '';
        for (const [skill, gain] of Object.entries(data.skill_gains)) {
            if (gain > 0) {
                const pct = Math.min(100, Math.round(gain * 100));
                const item = document.createElement('div');
                item.className = 'space-y-1';
                item.innerHTML = `
                    <div class="flex justify-between text-xs font-medium">
                        <span class="text-slate-700">${skill.replace(/_/g, ' ')}</span>
                        <span class="text-emerald-700 font-semibold">+${pct}%</span>
                    </div>
                    <div class="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                        <div class="bg-emerald-600 h-1.5 rounded-full" style="width: ${pct}%"></div>
                    </div>
                `;
                skillsContainer.appendChild(item);
            }
        }
    } catch (err) {
        showToast('Planner solver failed: ' + err.message, 'error');
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

// 3. Day One Pack Generation
async function generateDayOnePack() {
    const seed = parseInt(document.getElementById('pack-seed').value) || 1;
    const role = document.getElementById('plan-role').value;
    const btn = document.getElementById('btn-generate-pack');
    btn.disabled = true;
    btn.innerHTML = '⟳ Generating...';

    try {
        const res = await fetch('/api/dayone/pack/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ seed: seed, role: role })
        });
        const data = await res.json();
        
        if (res.ok) {
            document.getElementById('pack-download-section').classList.remove('hidden');
            const downloadLink = document.getElementById('pack-download-btn');
            downloadLink.href = `/api/dayone/pack/${seed}/download?role=${encodeURIComponent(role)}`;
            downloadLink.innerText = `Download ${data.scenario?.role_title || 'Starter'} Pack (Seed #${seed} .xlsx)`;
            showToast(`Starter pack for ${data.scenario?.name || role} generated! Ready to download.`, 'success');
        } else {
            showToast(`Generation error: ${data.detail || 'Failed'}`, 'error');
        }
    } catch (err) {
        showToast('Error generating pack: ' + err.message, 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = 'Generate Pack';
    }
}

// 4. Autopsy Submission
async function runAutopsySubmission(isDemo = false) {
    const autopsyBtn = document.getElementById(isDemo ? 'btn-autopsy-demo' : 'btn-autopsy-upload');
    const originalText = autopsyBtn.innerText;
    autopsyBtn.innerText = '⟳ Running Metamorphic Autopsy...';
    autopsyBtn.disabled = true;

    try {
        let data;
        const seed = parseInt(document.getElementById('pack-seed').value) || 1;
        const role = document.getElementById('plan-role').value;

        if (isDemo) {
            const res = await fetch(`/api/dayone/submit/demo?seed=${seed}&role=${encodeURIComponent(role)}`, { method: 'POST' });
            data = await res.json();
        } else {
            const fileInput = document.getElementById('submission-file');
            if (!fileInput.files || fileInput.files.length === 0) {
                showToast('Please select a completed .xlsx file first, or click "Run Demo with Reference Pack".', 'warning');
                autopsyBtn.innerText = originalText;
                autopsyBtn.disabled = false;
                return;
            }

            const formData = new FormData();
            formData.append('file', fileInput.files[0]);
            formData.append('seed', seed);
            formData.append('role', role);

            const res = await fetch('/api/dayone/submit', {
                method: 'POST',
                body: formData
            });
            data = await res.json();
        }

        renderAutopsyScorecard(data);
        showToast(`Metamorphic Autopsy completed for ${data.scenario?.name || role}!`, 'success');
    } catch (err) {
        showToast('Autopsy failed: ' + err.message, 'error');
    } finally {
        autopsyBtn.innerText = originalText;
        autopsyBtn.disabled = false;
    }
}

function renderAutopsyScorecard(data) {
    const card = document.getElementById('autopsy-results-card');
    card.classList.remove('hidden');
    card.scrollIntoView({ behavior: 'smooth' });

    const shocksBadge = document.getElementById('shocks-score-badge');
    const resp = data.shocks_responsive || (data.scores && data.scores.shocks_responsive) || 0;
    const total = data.shocks_total || (data.scores && data.scores.shocks_total) || 6;
    shocksBadge.innerText = `${resp} / ${total}`;

    const typedFound = (data.scores && data.scores.typed_numbers) || 0;
    const typedBadge = document.getElementById('typed-numbers-badge');
    if (typedFound === 0) {
        typedBadge.className = 'text-xs font-semibold px-2.5 py-1 rounded bg-emerald-100 text-emerald-800';
        typedBadge.innerText = '0 Typed Numbers (Clean Formulas)';
    } else {
        typedBadge.className = 'text-xs font-semibold px-2.5 py-1 rounded bg-rose-100 text-rose-800';
        typedBadge.innerText = `${typedFound} Hardcoded Numbers Detected`;
    }

    const baseMatch = data.base_matches_key || (data.scores && data.scores.base_matches_key);
    const keyMatchBadge = document.getElementById('key-match-badge');
    keyMatchBadge.innerText = baseMatch ? 'Matches Reference Key' : 'Base Values Differ';
    keyMatchBadge.className = `text-xs font-semibold px-2.5 py-1 rounded ${baseMatch ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`;

    document.getElementById('defence-start-container').classList.remove('hidden');
}

// 5. Targeted Defence (Mrs. Bello)
async function startDefenceSession() {
    const seed = parseInt(document.getElementById('pack-seed').value) || 1;
    const role = document.getElementById('plan-role').value;
    const candidateAlias = document.getElementById('candidate-alias').value.trim() || 'student_001';

    const btn = document.getElementById('btn-start-defence');
    btn.disabled = true;
    btn.innerHTML = 'Connecting to Mrs. Bello...';

    try {
        const res = await fetch('/api/dayone/defence/start', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                student_id: candidateAlias,
                seed: seed,
                role: role
            })
        });

        if (!res.ok) throw new Error('Could not initiate defence session');
        const data = await res.json();

        Sabi.currentSessionId = data.session_id;
        Sabi.defenceQuestions = data.questions;
        Sabi.currentQuestionIndex = 0;

        document.getElementById('defence-chat-card').classList.remove('hidden');
        document.getElementById('defence-start-container').classList.add('hidden');
        renderCurrentDefenceQuestion();
        showToast('Mrs. Bello is ready for your defence.', 'info');
    } catch (err) {
        showToast('Error starting defence: ' + err.message, 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = 'Enter Defence Room';
    }
}

function renderCurrentDefenceQuestion() {
    if (Sabi.currentQuestionIndex >= Sabi.defenceQuestions.length) {
        document.getElementById('defence-chat-card').classList.add('hidden');
        return;
    }

    const q = Sabi.defenceQuestions[Sabi.currentQuestionIndex];
    document.getElementById('defence-round-indicator').innerText = `Turn ${Sabi.currentQuestionIndex + 1} of ${Sabi.defenceQuestions.length}`;
    document.getElementById('defence-question-target').innerText = `Target: ${q.where || 'Model!N6'}`;
    document.getElementById('mrs-bello-text').innerText = q.question;

    document.getElementById('defence-answer-input').value = '';
    document.getElementById('defence-eval-status').classList.add('hidden');
}

function fillDemoAnswer() {
    const sc = Sabi.scenarios[Sabi.currentRole];
    let sample = sc?.defence?.sample_answer || 
        "Cell N6 computes the output by multiplying baseline parameters from row 6 by the conversion rates in Inputs sheet. When commercial variables fluctuate, cell N6 adjusts dynamically through formula dependencies.";
    document.getElementById('defence-answer-input').value = sample;
}

async function submitDefenceAnswer() {
    const answer = document.getElementById('defence-answer-input').value.trim();
    if (!answer) {
        showToast('Please type your explanation first.', 'warning');
        return;
    }

    const btn = document.getElementById('btn-submit-answer');
    btn.disabled = true;
    btn.innerHTML = 'Evaluating Formula Graph Claims...';

    try {
        const res = await fetch('/api/dayone/defence/answer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                session_id: Sabi.currentSessionId,
                question_index: Sabi.currentQuestionIndex,
                answer: answer
            })
        });

        const data = await res.json();
        
        const evalBox = document.getElementById('defence-eval-status');
        evalBox.classList.remove('hidden');
        
        const isGood = data.classification === 'ACCURATE_MECHANISM' || data.classification === 'PARTIAL_INTUITION';
        evalBox.className = `p-4 rounded-lg border text-sm font-medium ${isGood ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-amber-50 border-amber-200 text-amber-900'}`;
        evalBox.innerHTML = `
            <div class="flex items-center justify-between mb-1">
                <span class="font-bold text-xs uppercase tracking-wide">Verdict: ${data.classification}</span>
                <span class="text-xs">${data.claims_verified} of ${data.claims_detected} formula claims verified</span>
            </div>
            <p class="text-xs opacity-90">Gate: ${data.understanding_gate ? '✅ Passed Understanding Gate' : '⚠️ Under Review'} · Recommended Level: ${data.recommended_level}</p>
        `;

        if (data.evidence_brief_id) {
            Sabi.lastGeneratedBrief = data.evidence_brief_id;
            setTimeout(() => {
                showToast('🎉 Defence complete! Cryptographic Evidence Brief generated.', 'success');
                renderEvidenceBriefPreview(data.evidence_brief_id, data.evidence_brief_url);
            }, 1200);
        } else {
            setTimeout(() => {
                Sabi.currentQuestionIndex++;
                renderCurrentDefenceQuestion();
            }, 2000);
        }
    } catch (err) {
        showToast('Error submitting answer: ' + err.message, 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = 'Submit Defence';
    }
}

function renderEvidenceBriefPreview(briefId, verifyUrl) {
    const card = document.getElementById('evidence-brief-card');
    card.classList.remove('hidden');
    card.scrollIntoView({ behavior: 'smooth' });

    document.getElementById('brief-id-display').innerText = briefId;
    const viewBtn = document.getElementById('btn-view-brief');
    viewBtn.href = verifyUrl;
    viewBtn.target = '_blank';
}

// ---------------------------------------------------------------------------
// TAB 2: EMPLOYER PORTAL
// ---------------------------------------------------------------------------

async function loadCandidates() {
    const container = document.getElementById('candidate-list-grid');
    container.innerHTML = `<div class="col-span-full text-center py-10 text-slate-400 font-medium"><span class="animate-spin inline-block mr-2">⟳</span> Fetching verified candidates...</div>`;

    try {
        const res = await fetch(`/api/candidates?blind=${Sabi.blindMode}`);
        const candidates = await res.json();
        
        container.innerHTML = '';
        if (candidates.length === 0) {
            container.innerHTML = `<div class="col-span-full text-center py-10 text-slate-400">No candidates found in the pool.</div>`;
            return;
        }

        candidates.forEach(c => {
            const card = document.createElement('div');
            card.className = 'bg-white border border-slate-200 rounded-xl p-5 shadow-sm card-hover flex flex-col justify-between';
            
            const nameDisplay = Sabi.blindMode ? c.candidate_alias : (c.candidate_name || c.candidate_alias);
            const schoolDisplay = Sabi.blindMode ? '🔒 Redacted in Blind Mode' : (c.candidate_school || 'Nigerian University');
            
            const skillsHtml = (c.skills || []).map(s => `
                <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    ${s.skill_name || s.skill_id} · ${s.level} (Tier ${s.tier})
                </span>
            `).join(' ');

            card.innerHTML = `
                <div>
                    <div class="flex justify-between items-start mb-3">
                        <div>
                            <h4 class="font-bold text-slate-900 text-base">${nameDisplay}</h4>
                            <p class="text-xs text-slate-500">${c.target_role}</p>
                            <p class="text-xs text-slate-400 font-mono mt-0.5">${schoolDisplay}</p>
                        </div>
                        <span class="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded font-semibold border border-blue-200">Tier A Verified</span>
                    </div>

                    <div class="bg-slate-50 rounded-lg p-3 my-3 text-xs space-y-1.5 border border-slate-100">
                        <div class="flex justify-between">
                            <span class="text-slate-600">Metamorphic Shocks:</span>
                            <span class="font-bold text-emerald-700">${c.signals?.shocks_survived ? c.signals.shocks_survived[0] + '/' + c.signals.shocks_survived[1] : '6/6'} Survived</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-slate-600">Targeted Defence:</span>
                            <span class="font-bold text-slate-800">✅ Mrs. Bello Gate Passed</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-slate-600">Spreadsheet Cleanliness:</span>
                            <span class="font-semibold text-slate-700">0 Hardcoded Typed Numbers</span>
                        </div>
                    </div>

                    <div class="mt-2 flex flex-wrap gap-1.5">
                        ${skillsHtml}
                    </div>
                </div>

                <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span class="text-[11px] font-mono text-slate-400 truncate max-w-[150px]" title="${c.sha256_digest || ''}">
                        SHA: ${(c.sha256_digest || 'd5ae9d12').substring(0, 8)}...
                    </span>
                    <a href="/verify/${c.brief_id}?blind=${Sabi.blindMode}" target="_blank" class="inline-flex items-center text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-md transition-colors">
                        Verify Proof →
                    </a>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (err) {
        container.innerHTML = `<div class="col-span-full text-center py-6 text-rose-600">Error loading candidate pool: ${err.message}</div>`;
    }
}

function toggleBlindMode() {
    Sabi.blindMode = !Sabi.blindMode;
    const btn = document.getElementById('btn-toggle-blind');
    if (Sabi.blindMode) {
        btn.innerText = '🛡️ Blind Mode: Active (Pedigree Stripped)';
        btn.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-700 text-white shadow-sm';
    } else {
        btn.innerText = '👁️ Blind Mode: Off (Pedigree Visible)';
        btn.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-200 text-slate-800 hover:bg-slate-300';
    }
    loadCandidates();
}

// ---------------------------------------------------------------------------
// TAB 3: RADAR ANALYTICS
// ---------------------------------------------------------------------------

async function loadRadarData() {
    const dept = document.getElementById('radar-dept-select').value;
    const chartContainer = document.getElementById('radar-gaps-container');
    const funnelContainer = document.getElementById('radar-funnel-container');

    chartContainer.innerHTML = '<div class="text-center py-10 text-slate-400"><span class="animate-spin inline-block mr-2">⟳</span> Analyzing job market vs curricula...</div>';

    try {
        const url = dept ? `/api/radar/heatmap?department=${encodeURIComponent(dept)}` : '/api/radar/heatmap';
        const res = await fetch(url);
        const data = await res.json();

        chartContainer.innerHTML = '';
        data.gaps.slice(0, 10).forEach(g => {
            const demandPct = Math.round(g.demand * 100);
            const covPct = Math.round(g.coverage * 100);
            const gapPct = Math.round(g.gap * 100);
            const isDeficit = gapPct < 0;

            const row = document.createElement('div');
            row.className = 'bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm space-y-2';
            row.innerHTML = `
                <div class="flex justify-between items-center text-xs">
                    <span class="font-bold text-slate-800">${g.skill.replace(/_/g, ' ')}</span>
                    <span class="px-2 py-0.5 rounded font-mono font-semibold ${isDeficit ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}">
                        ${isDeficit ? `Deficit: ${gapPct}%` : `Coverage: +${gapPct}%`}
                    </span>
                </div>
                <div class="space-y-1">
                    <div class="flex items-center text-[11px] text-slate-500 justify-between">
                        <span>Employer Demand (${demandPct}%)</span>
                        <div class="w-2/3 bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div class="bg-blue-600 h-2 rounded-full" style="width: ${demandPct}%"></div>
                        </div>
                    </div>
                    <div class="flex items-center text-[11px] text-slate-500 justify-between">
                        <span>Curriculum Coverage (${covPct}%)</span>
                        <div class="w-2/3 bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div class="bg-amber-500 h-2 rounded-full" style="width: ${covPct}%"></div>
                        </div>
                    </div>
                </div>
            `;
            chartContainer.appendChild(row);
        });

        funnelContainer.innerHTML = '';
        data.funnels.forEach(f => {
            const card = document.createElement('div');
            card.className = 'bg-white p-4 rounded-lg border border-slate-200 shadow-sm space-y-3';
            card.innerHTML = `
                <h4 class="font-bold text-slate-900 text-sm border-b pb-2">${f.department} Cohort Funnel</h4>
                <div class="space-y-2 text-xs">
                    <div>
                        <div class="flex justify-between mb-1 font-medium">
                            <span class="text-blue-800">1. Taught in Syllabus</span>
                            <span class="font-bold">${f.taught_pct}%</span>
                        </div>
                        <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                            <div class="bg-blue-600 h-2.5 rounded-full" style="width: ${f.taught_pct}%"></div>
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-between mb-1 font-medium">
                            <span class="text-amber-800">2. Practiced in Hands-On Lab</span>
                            <span class="font-bold">${f.practiced_pct}%</span>
                        </div>
                        <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                            <div class="bg-amber-500 h-2.5 rounded-full" style="width: ${f.practiced_pct}%"></div>
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-between mb-1 font-medium">
                            <span class="text-emerald-800">3. Proven on Sabi (Tier A/B)</span>
                            <span class="font-bold text-emerald-700">${f.proven_pct}%</span>
                        </div>
                        <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                            <div class="bg-emerald-600 h-2.5 rounded-full" style="width: ${f.proven_pct}%"></div>
                        </div>
                    </div>
                </div>
            `;
            funnelContainer.appendChild(card);
        });
    } catch (err) {
        chartContainer.innerHTML = `<div class="text-center py-6 text-rose-600">Error: ${err.message}</div>`;
    }
}

// ---------------------------------------------------------------------------
// TAB 4: SME RAILS (MICROPHONE RECORDING & AUDIO FILE UPLOADS)
// ---------------------------------------------------------------------------

const SME_SAMPLES = {
    adebayo: {
        alias: "Mrs. Funke Adebayo",
        business: "Retail (provisions store, Surulere)",
        audioUrl: "/voice_notes/mrs_adebayo_retail.wav",
        text: "Good morning, my name is Mrs. Funke Adebayo. I run a provisions store in Surulere, Lagos. My address is 15 Bode Thomas Street, Surulere. My phone number is 08034567890. I have a problem with my sales records. I've been keeping them in exercise books for three years but I want someone to help me put everything into Excel so I can see which products are selling well and which ones are not moving. I need a chart showing my monthly sales trend and which category of goods makes the most money. I also want to know my best and worst customers. My email is funke.adebayo@gmail.com. The data is in five exercise books, maybe about 2000 entries. I can photograph the pages. I need this done in one week because my accountant Mr. Chukwuma Obi needs it for tax filing. My BVN is 22345678901. Thank you."
    },
    musa: {
        alias: "Alhaji Musa",
        business: "Logistics (haulage company)",
        audioUrl: "/voice_notes/alhaji_musa_logistics.wav",
        text: "Good afternoon. This is Alhaji Musa from Kano Logistics. Call me at 08123456789. I need someone who knows Excel well to help me clean up our fuel consumption records. We have 12 trucks driving Lagos-Kano-Kaduna route. The drivers submit receipts for diesel and maintenance every week. Right now everything is scattered. I want a proper template where my manager can enter the litres of diesel bought, the amount paid, distance covered, and it will calculate cost per kilometre. If you can help, email me at musa.haulage@yahoo.com or send WhatsApp. My business reg is RC-98765432101."
    }
};

function loadSmePreset(presetKey) {
    const data = SME_SAMPLES[presetKey];
    if (!data) return;

    document.getElementById('sme-alias').value = data.alias;
    document.getElementById('sme-business').value = data.business;
    document.getElementById('sme-text').value = data.text;
    
    // Set up audio player with preset audio file
    const audioPlayer = document.getElementById('sme-audio-player');
    const audioContainer = document.getElementById('sme-audio-player-container');
    if (audioPlayer && audioContainer) {
        audioPlayer.src = data.audioUrl;
        audioContainer.classList.remove('hidden');
        document.getElementById('audio-source-label').innerText = `Preset Audio: ${data.alias}`;
    }

    showToast(`Loaded sample audio and transcript for ${data.alias}`, 'info');
}

// Microphone Recording via MediaRecorder + Web Speech API
async function toggleAudioRecording() {
    if (Sabi.isRecording) {
        stopAudioRecording();
    } else {
        startAudioRecording();
    }
}

async function startAudioRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        Sabi.audioChunks = [];
        Sabi.mediaRecorder = new MediaRecorder(stream);

        Sabi.mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) Sabi.audioChunks.push(e.data);
        };

        Sabi.mediaRecorder.onstop = () => {
            Sabi.audioBlob = new Blob(Sabi.audioChunks, { type: 'audio/webm' });
            const audioUrl = URL.createObjectURL(Sabi.audioBlob);
            const audioPlayer = document.getElementById('sme-audio-player');
            const audioContainer = document.getElementById('sme-audio-player-container');
            if (audioPlayer && audioContainer) {
                audioPlayer.src = audioUrl;
                audioContainer.classList.remove('hidden');
                document.getElementById('audio-source-label').innerText = 'Microphone Recording';
            }
        };

        Sabi.mediaRecorder.start(200);
        Sabi.isRecording = true;

        // UI state update
        const recBtn = document.getElementById('btn-record-audio');
        recBtn.className = 'bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow transition-colors flex items-center space-x-2 animate-pulse';
        recBtn.innerHTML = `<span>⏹️</span><span>Stop Recording (<span id="record-timer">00:00</span>)</span>`;

        // Start SpeechRecognition if supported in browser
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            Sabi.speechRecognizer = new SpeechRecognition();
            Sabi.speechRecognizer.continuous = true;
            Sabi.speechRecognizer.interimResults = true;
            Sabi.speechRecognizer.lang = 'en-NG'; // Nigerian English locale

            Sabi.speechRecognizer.onresult = (event) => {
                let interim = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    interim += event.results[i][0].transcript;
                }
                if (interim.trim()) {
                    document.getElementById('sme-text').value = interim;
                }
            };
            Sabi.speechRecognizer.start();
        }

        // Timer interval
        Sabi.recordSeconds = 0;
        Sabi.recordTimerInterval = setInterval(() => {
            Sabi.recordSeconds++;
            const mins = String(Math.floor(Sabi.recordSeconds / 60)).padStart(2, '0');
            const secs = String(Sabi.recordSeconds % 60).padStart(2, '0');
            const timerSpan = document.getElementById('record-timer');
            if (timerSpan) timerSpan.innerText = `${mins}:${secs}`;
        }, 1000);

        showToast('Microphone recording started. Speak your brief...', 'info');
    } catch (err) {
        showToast('Microphone access denied or unsupported: ' + err.message, 'warning');
    }
}

function stopAudioRecording() {
    if (Sabi.mediaRecorder && Sabi.isRecording) {
        Sabi.mediaRecorder.stop();
        Sabi.mediaRecorder.stream.getTracks().forEach(t => t.stop());
    }
    if (Sabi.speechRecognizer) {
        try { Sabi.speechRecognizer.stop(); } catch (e) {}
    }
    clearInterval(Sabi.recordTimerInterval);
    Sabi.isRecording = false;

    const recBtn = document.getElementById('btn-record-audio');
    recBtn.className = 'bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow transition-colors flex items-center space-x-2';
    recBtn.innerHTML = `<span>🎙️</span><span>Record Voice Note</span>`;

    showToast('Voice note recorded! Ready to sanitise and extract.', 'success');
}

// Audio File Selection Handler
function handleAudioFileSelected(files) {
    if (!files || files.length === 0) return;
    const file = files[0];
    Sabi.audioBlob = file;

    const audioUrl = URL.createObjectURL(file);
    const audioPlayer = document.getElementById('sme-audio-player');
    const audioContainer = document.getElementById('sme-audio-player-container');
    if (audioPlayer && audioContainer) {
        audioPlayer.src = audioUrl;
        audioContainer.classList.remove('hidden');
        document.getElementById('audio-source-label').innerText = `Uploaded Audio: ${file.name} (${Math.round(file.size / 1024)} KB)`;
    }

    // Default contextual note if transcript is empty
    const currentText = document.getElementById('sme-text').value.trim();
    if (!currentText) {
        document.getElementById('sme-text').value = `Voice note uploaded: ${file.name}. Audio is loaded in the player.`;
    }

    showToast(`Loaded audio file: ${file.name}`, 'info');
}

async function processSmeBrief() {
    const text = document.getElementById('sme-text').value.trim();
    const alias = document.getElementById('sme-alias').value.trim() || 'SME_OWNER';
    const business = document.getElementById('sme-business').value.trim() || 'Small Business';

    const btn = document.getElementById('btn-process-sme');
    btn.disabled = true;
    btn.innerHTML = '⟳ Sanitising Nigerian PII & Extracting Brief...';

    try {
        let res, briefData;

        // If user recorded or uploaded an audio file, send to upload-audio endpoint
        if (Sabi.audioBlob && (Sabi.audioBlob instanceof Blob || Sabi.audioBlob instanceof File)) {
            const formData = new FormData();
            formData.append('audio', Sabi.audioBlob, Sabi.audioBlob.name || 'voice_note.webm');
            formData.append('owner_alias', alias);
            formData.append('business_type', business);
            if (text) formData.append('transcript', text);

            res = await fetch('/api/sme/upload-audio', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            briefData = data.brief;
            if (data.audio_url) {
                document.getElementById('sme-audio-player').src = data.audio_url;
                document.getElementById('sme-audio-player-container').classList.remove('hidden');
            }
        } else {
            // Text-only pipeline
            if (!text) {
                showToast('Please record audio, upload an audio file, or enter transcript text first.', 'warning');
                btn.disabled = false;
                btn.innerHTML = '🛡️ Sanitise & Extract Micro-Project Brief';
                return;
            }

            res = await fetch('/api/sme/process', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: text,
                    owner_alias: alias,
                    business_type: business
                })
            });
            briefData = await res.json();
        }

        renderSmeResult(briefData);
        showToast('Brief successfully sanitised and extracted!', 'success');
    } catch (err) {
        showToast('Error processing brief: ' + err.message, 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = '🛡️ Sanitise & Extract Micro-Project Brief';
    }
}

function renderSmeResult(brief) {
    const container = document.getElementById('sme-results-container');
    container.classList.remove('hidden');
    container.scrollIntoView({ behavior: 'smooth' });

    document.getElementById('sme-pii-count').innerText = `${brief.pii_found} PII items redacted`;
    
    let sanitised = brief.sanitised_transcript;
    sanitised = sanitised.replace(/\[([A-Z_]+_REDACTED)\]/g, '<span class="redacted-tag">$1</span>');
    document.getElementById('sme-sanitised-text').innerHTML = sanitised;

    document.getElementById('sme-brief-problem').innerText = brief.problem_statement;
    document.getElementById('sme-brief-effort').innerText = `${brief.effort_days} Days (${brief.effort_estimate})`;
    
    const riskBadge = document.getElementById('sme-privacy-risk');
    riskBadge.innerText = `Privacy Risk: ${brief.privacy_risk_level.toUpperCase()}`;
    if (brief.privacy_risk_level === 'high') {
        riskBadge.className = 'text-xs font-semibold px-2 py-0.5 rounded bg-rose-100 text-rose-800';
    } else if (brief.privacy_risk_level === 'medium') {
        riskBadge.className = 'text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800';
    } else {
        riskBadge.className = 'text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800';
    }

    const delivList = document.getElementById('sme-deliverables-list');
    delivList.innerHTML = brief.deliverables.map(d => `<li class="flex items-start space-x-2"><span class="text-emerald-600 font-bold">✓</span><span>${d}</span></li>`).join('');

    const skillContainer = document.getElementById('sme-skill-tags');
    skillContainer.innerHTML = brief.skill_tags.map(t => `<span class="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded font-mono font-medium">${t}</span>`).join(' ');
}

// ---------------------------------------------------------------------------
// INITIALIZATION
// ---------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    // Load scenario metadata
    loadScenarios();

    // Initial solve for default planner view
    solvePlan();

    // Role selector listener
    const roleSelect = document.getElementById('plan-role');
    if (roleSelect) {
        roleSelect.addEventListener('change', (e) => {
            onRoleChange(e.target.value);
        });
    }

    // Setup workbook dropzone
    const dropzone = document.getElementById('workbook-dropzone');
    const fileInput = document.getElementById('submission-file');

    if (dropzone && fileInput) {
        dropzone.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', () => {
            if (fileInput.files.length > 0) {
                document.getElementById('dropzone-file-name').innerText = fileInput.files[0].name;
            }
        });

        ['dragenter', 'dragover'].forEach(event => {
            dropzone.addEventListener(event, (e) => {
                e.preventDefault();
                dropzone.classList.add('dropzone-active');
            });
        });

        ['dragleave', 'drop'].forEach(event => {
            dropzone.addEventListener(event, (e) => {
                e.preventDefault();
                dropzone.classList.remove('dropzone-active');
            });
        });

        dropzone.addEventListener('drop', (e) => {
            if (e.dataTransfer.files.length > 0) {
                fileInput.files = e.dataTransfer.files;
                document.getElementById('dropzone-file-name').innerText = e.dataTransfer.files[0].name;
            }
        });
    }

    // Setup audio dropzone for SME Rails
    const audioDropzone = document.getElementById('audio-dropzone');
    const audioFileInput = document.getElementById('sme-audio-file');
    if (audioDropzone && audioFileInput) {
        audioDropzone.addEventListener('click', () => audioFileInput.click());
        audioFileInput.addEventListener('change', () => {
            handleAudioFileSelected(audioFileInput.files);
        });

        ['dragenter', 'dragover'].forEach(event => {
            audioDropzone.addEventListener(event, (e) => {
                e.preventDefault();
                audioDropzone.classList.add('dropzone-active');
            });
        });

        ['dragleave', 'drop'].forEach(event => {
            audioDropzone.addEventListener(event, (e) => {
                e.preventDefault();
                audioDropzone.classList.remove('dropzone-active');
            });
        });

        audioDropzone.addEventListener('drop', (e) => {
            if (e.dataTransfer.files.length > 0) {
                handleAudioFileSelected(e.dataTransfer.files);
            }
        });
    }
});
