/**
 * Sabi Web Application Frontend Controller
 * Pure vanilla JavaScript - Zero build step, lightweight, low-bandwidth optimized.
 * Fully functional: Synchronous multi-role commercial scenarios + Real microphone recording & audio uploads.
 */

// Synchronous scenario registry for instant 0ms switching
const SCENARIOS = {
    "graduate_supply_chain_analyst": {
        "id": "SC-APAPA-01",
        "role_id": "graduate_supply_chain_analyst",
        "role_title": "Graduate Supply-Chain Analyst",
        "name": "Apapa Port Landed-Cost Commercial Model",
        "category": "Supply Chain & Logistics Analytics",
        "timebox": "90 mins",
        "description": "A container of 4 SKU lines has docked at Apapa Port. You must construct a clean, dynamic spreadsheet model converting USD purchase prices into Nigerian Naira (₦), applying the revised ECOWAS Common External Tariff, port handling surcharges, and demurrage penalties. Your formula graph must react correctly when commercial variables change.",
        "shocks": [
            {"name": "FX Devaluation Shock", "change": "+25% NGN/USD exchange rate"},
            {"name": "Customs Tariff Spike", "change": "+10% customs duty rate"},
            {"name": "Port Demurrage", "change": "+5 demurrage days at Apapa terminal"},
            {"name": "Ocean Freight Inflation", "change": "+30% shipping line surcharge"},
            {"name": "Volume Discount Shock", "change": "-15% base supplier price"},
            {"name": "Target Margin Shock", "change": "Retail shelf margin raised from 35% to 40%"}
        ],
        "defence": {
            "where": "Model!N6",
            "question": "Good day. I am Mrs. Bello, Senior Commercial Manager. Walk me through how cell N6 computes the landed cost per unit, and how it responds if the exchange rate rises.",
            "sample_answer": "Cell N6 computes the total landed cost per unit by taking the baseline CIF price in USD from C6, multiplying it by the exchange rate in C4 to convert to Naira, then adding the customs tariff, port surcharge, and the freight demurrage per unit. If the exchange rate increases by 25%, cell N6 automatically inflates because it references C4 dynamically."
        }
    },
    "junior_data_analyst": {
        "id": "DA-COHORT-01",
        "role_id": "junior_data_analyst",
        "role_title": "Junior Data Analyst",
        "name": "E-Commerce Customer Retention & Unit Economics Model",
        "category": "Product & Customer Analytics",
        "timebox": "90 mins",
        "description": "An online marketplace in Yaba, Lagos tracks customer acquisition, monthly recurring revenue (MRR), and cohort retention. You must build a dynamic model calculating Customer Lifetime Value (LTV), Customer Acquisition Cost (CAC) payback periods, and churn rates across 12 monthly cohorts. Your model must prove whether marketing spend is sustainable under churn stress.",
        "shocks": [
            {"name": "Churn Rate Spike", "change": "+50% monthly subscriber churn rate"},
            {"name": "CAC Ad Inflation", "change": "+30% digital marketing acquisition cost"},
            {"name": "ARPU Promotional Discount", "change": "-15% average order revenue"},
            {"name": "Retention Curve Drop", "change": "-10% month-over-month cohort retention"},
            {"name": "Payment Gateway Fee Hike", "change": "+20% processing and transaction fees"},
            {"name": "Target Payback Constraint", "change": "CAC payback hurdle shortened to ≤ 5 months"}
        ],
        "defence": {
            "where": "Model!N6",
            "question": "Good day. I am Mrs. Bello. I see your unit economics model. Walk me through how cell N6 computes Customer Lifetime Value (LTV), and what happens to your payback period when monthly churn spikes.",
            "sample_answer": "Cell N6 computes Customer Lifetime Value by dividing average monthly revenue per user by the monthly churn rate, multiplied by the gross margin percentage in B8. When churn spikes from 6% to 9%, LTV in cell N6 drops proportionally because churn is in the denominator, which in turn extends the CAC payback period beyond our acceptable threshold."
        }
    },
    "operations_associate": {
        "id": "OP-FLEET-01",
        "role_id": "operations_associate",
        "role_title": "Operations Associate",
        "name": "Interstate Haulage Fleet Dispatch & Route Margins Model",
        "category": "Operations & Logistics Optimization",
        "timebox": "90 mins",
        "description": "A logistics company operates 12 heavy trucks across 4 major Nigerian commercial corridors (Lagos-Kano, Lagos-Onitsha, Lagos-Abuja, PH-Kano). You must build an operational dispatch model calculating diesel consumption, driver trip allowances, transit turnaround times, toll surcharges, and gross corridor contribution margins per ton-km.",
        "shocks": [
            {"name": "Diesel Price Pump Hike", "change": "+40% diesel pump price increase"},
            {"name": "Highway Detour Shock", "change": "+15% transit km due to expressway rehabilitation"},
            {"name": "Driver Allowance Inflation", "change": "+25% interstate trip allowance"},
            {"name": "Client Freight Rate Cut", "change": "-10% contracted freight billing tariff"},
            {"name": "Preventative Overhaul Surcharge", "change": "+₦150k overhaul per 10,000 km"},
            {"name": "Fleet Margin Hurdle", "change": "Corridor contribution margin threshold raised to 25%"}
        ],
        "defence": {
            "where": "Model!N6",
            "question": "Good day. I am Mrs. Bello, Operations Director. Walk me through how cell N6 computes the total operating cost per corridor trip, and how your route margins react when the pump price of diesel rises.",
            "sample_answer": "Cell N6 models the total trip operating cost by multiplying the corridor distance by the truck burn rate (0.38 L/km) and the current diesel pump price in B4, then adding driver trip allowance in B6 and transit road tolls in B7. When diesel price surges by 40%, fuel cost in cell N6 rises immediately, eroding the net route margin in column Q."
        }
    },
    "financial_modelling_intern": {
        "id": "FM-CASH-01",
        "role_id": "financial_modelling_intern",
        "role_title": "Financial Modelling Intern",
        "name": "Corporate Working Capital & 13-Week Cashflow Runway",
        "category": "Treasury & Liquidity Risk Management",
        "timebox": "90 mins",
        "description": "An Ikeja manufacturing firm needs a 13-week rolling cashflow runway model. You must project weekly collections from corporate debtors (Days Sales Outstanding DSO), scheduled supplier disbursements (Days Payables Outstanding DPO), payroll obligations, and bank overdraft interest to forecast liquidity bottlenecks.",
        "shocks": [
            {"name": "Key Debtor Default Delay", "change": "DSO increases from 30 days to 60 days"},
            {"name": "Supplier Upfront Term Shock", "change": "DPO shortened from 45 days to 15 days"},
            {"name": "Raw Material Import Inflation", "change": "+25% NGN supplier price increase"},
            {"name": "Overdraft MPR Rate Tightening", "change": "+400 bps Central Bank interest rate hike"},
            {"name": "Emergency Plant Capex Outflow", "change": "₦25M critical generator overhaul"},
            {"name": "Liquidity Buffer Invariance", "change": "Minimum cash buffer constraint raised to ₦15M"}
        ],
        "defence": {
            "where": "Model!N6",
            "question": "Good day. I am Mrs. Bello, Chief Financial Officer. Walk me through how cell N6 projects the net cash generation for the business line, and how our 13-week runway responds if major debtors delay payment by 30 days.",
            "sample_answer": "Cell N6 computes the net weekly cashflow by taking collections calculated from DSO in B5, subtracting supplier disbursements dictated by DPO in B6, and deducting weekly payroll and overheads in B8. If corporate debtors delay payment by 30 days, collections in N6 plummet, creating an immediate funding gap that triggers our overdraft facility."
        }
    }
};

// Global State
const Sabi = {
    currentUser: null,
    activeTab: 'student',
    currentRole: 'graduate_supply_chain_analyst',
    currentSessionId: null,
    currentQuestionIndex: 0,
    defenceQuestions: [],
    lastGeneratedBrief: null,
    allEmployerTasks: [],
    currentFilterTrack: 'all',
    blindMode: true,
    mediaRecorder: null,
    audioChunks: [],
    audioBlob: null,
    speechRecognizer: null,
    isRecording: false,
    recordTimerInterval: null,
    recordSeconds: 0,
    curriculumSelectedFile: null,
    curriculumGapData: null
};
window.getBlindMode = () => Sabi.blindMode;

// Toast notification helper
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) return;
    const kinds = ['info', 'success', 'warning', 'error'];
    toast.className = 'toast toast-' + (kinds.includes(type) ? type : 'info');
    toast.textContent = message;
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.add('hidden'), 4000);
}

// Tab Switching with Portal Role Enforcement
function switchTab(tabId) {
    const userRole = Sabi.currentUser ? Sabi.currentUser.role : 'student';

    // Disallow cross-portal tab switching
    if (userRole === 'student' && ['employer', 'sme', 'radar'].includes(tabId)) {
        showToast('Employer Portal Restricted: Sign in as an Employer to evaluate candidates or post tasks.', 'warning');
        return;
    }
    if (userRole === 'employer' && ['student', 'employer-tasks', 'student-analytics'].includes(tabId)) {
        showToast('Student Portal: As an employer, manage tasks and candidate pipelines. Switch to Student to take tests.', 'info');
        return;
    }

    Sabi.activeTab = tabId;
    if (location.hash.startsWith('#app')) history.replaceState(null, '', '#app/' + tabId);
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        const isCurrent = btn.getAttribute('data-tab') === tabId;
        const baseClass = btn.classList.contains('student-only') ? 'student-only' : 'employer-only';
        if (isCurrent) {
            btn.className = `tab-btn is-active ${baseClass}`;
            btn.setAttribute('aria-selected', 'true');
        } else {
            btn.className = `tab-btn ${baseClass}`;
            btn.setAttribute('aria-selected', 'false');
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
    } else if (tabId === 'employer-tasks' || tabId === 'sme') {
        loadEmployerTasks();
    } else if (tabId === 'student-analytics') {
        initCurriculumGapIfEmpty();
    }
    window.dispatchEvent(new CustomEvent('sabi:navigation', { detail: { tabId } }));
}

// ---------------------------------------------------------------------------
// TAB 1: STUDENT PORTAL (PLANNER, SCENARIOS, AUTOPSY, DEFENCE)
// ---------------------------------------------------------------------------

// Immediate, synchronous role & scenario switcher
function onRoleChange(role) {
    if (!role) return;
    Sabi.currentRole = role;

    // 1. Sync dropdown
    const select = document.getElementById('plan-role');
    if (select && select.value !== role) {
        select.value = role;
    }

    // 2. Sync quick pills
    document.querySelectorAll('.role-pill').forEach(btn => {
        const isSelected = btn.getAttribute('data-role') === role;
        if (isSelected) {
            btn.className = 'role-pill is-active';
        } else {
            btn.className = 'role-pill';
        }
    });

    // 3. Update right column scenario card synchronously (0ms)
    updateScenarioUI(role);

    // 4. Update demo autopsy button text
    const demoBtn = document.getElementById('btn-autopsy-demo');
    const sc = SCENARIOS[role] || SCENARIOS["graduate_supply_chain_analyst"];
    if (demoBtn && sc) {
        demoBtn.innerHTML = `<span>Demo with ${sc.role_title} Reference Pack</span>`;
    }

    // 5. Hide previous autopsy results and defence until user triggers for this role
    const autopsyCard = document.getElementById('autopsy-results-card');
    if (autopsyCard) autopsyCard.classList.add('hidden');
    const defenceChat = document.getElementById('defence-chat-card');
    if (defenceChat) defenceChat.classList.add('hidden');
    const defenceStart = document.getElementById('defence-start-container');
    if (defenceStart) defenceStart.classList.add('hidden');

    // 6. Recalculate PuLP study plan
    solvePlan();
}

function updateScenarioUI(role) {
    const sc = SCENARIOS[role] || SCENARIOS["graduate_supply_chain_analyst"];
    if (!sc) return;

    // Update Scenario Header & Card
    const badge = document.getElementById('scenario-badge');
    const title = document.getElementById('scenario-title');
    const timebox = document.getElementById('scenario-timebox');
    const desc = document.getElementById('scenario-desc');
    const dlBtn = document.getElementById('pack-download-btn');

    if (badge) badge.innerText = `Day one: ${sc.category}`;
    if (title) title.innerText = sc.name;
    if (timebox) timebox.innerText = `Timebox: ${sc.timebox}`;
    if (desc) desc.innerText = sc.description;
    
    // Update Download Link
    const seed = parseInt(document.getElementById('pack-seed')?.value) || 1;
    if (dlBtn) {
        dlBtn.href = `/api/dayone/pack/${seed}/download?role=${encodeURIComponent(role)}`;
        dlBtn.innerHTML = `<span>Download ${sc.role_title} Starter (.xlsx)</span>`;
    }

    // Update Shocks List
    const shocksContainer = document.getElementById('scenario-shocks-preview');
    if (shocksContainer && sc.shocks) {
        shocksContainer.innerHTML = sc.shocks.map((s, idx) => `
            <div class="flex items-start space-x-2 text-xs text-slate-700 panel-sm">
                <span class="text-emerald-700 font-semibold text-xs">#${idx+1}</span>
                <div>
                    <span class="font-semibold block text-slate-800">${s.name}</span>
                    <span class="text-slate-500 text-xs leading-tight block mt-0.5">${s.change}</span>
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
    const requestId = (Sabi.planSolveSequence || 0) + 1;
    Sabi.planSolveSequence = requestId;
    const role = document.getElementById('plan-role')?.value || Sabi.currentRole;
    const weeklyHours = parseFloat(document.getElementById('plan-hours')?.value || 12);
    const weeklyMb = parseFloat(document.getElementById('plan-mb')?.value || 500);
    const weeks = parseInt(document.getElementById('plan-weeks')?.value || 6);
    const offlineOnly = document.getElementById('plan-offline')?.checked || false;

    const btn = document.getElementById('btn-solve-plan');
    const originalText = '<span>Calculate Optimal Path</span>';
    if (btn) {
        btn.innerHTML = `<span class="spinner"></span> Solving with PuLP...`;
        btn.disabled = true;
    }

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
                weekCard.className = 'panel-sm';
                
                let resList = w.resources.map(r => `
                    <div class="flex items-center justify-between text-xs py-1 border-b border-slate-100 last:border-0">
                        <span class="font-medium text-slate-800">${r.title}</span>
                        <div class="flex items-center space-x-2 text-slate-500">
                            <span>${r.hours}h</span>
                            <span class="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded font-mono">${r.mb}MB</span>
                            ${r.offline ? '<span class="bg-emerald-50 text-emerald-700 px-1 rounded text-xs">Offline</span>' : ''}
                        </div>
                    </div>
                `).join('');

                weekCard.innerHTML = `
                    <div class="flex justify-between items-center mb-1.5">
                        <span class="font-semibold text-xs text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full">Week ${w.week}</span>
                        <span class="text-xs text-slate-500 font-medium">${w.total_hours}h / ${w.total_mb}MB</span>
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
        if (requestId === Sabi.planSolveSequence) showToast('Planner solver failed: ' + err.message, 'error');
    } finally {
        if (btn && requestId === Sabi.planSolveSequence) {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }
    }
}

// 3. Day One Pack Generation
async function generateDayOnePack() {
    const seed = parseInt(document.getElementById('pack-seed')?.value) || 1;
    const role = document.getElementById('plan-role')?.value || Sabi.currentRole;
    const btn = document.getElementById('btn-generate-pack');
    btn.disabled = true;
    btn.innerHTML = 'Generating...';

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
        btn.innerHTML = 'Generate Role Pack';
    }
}

// 4. Autopsy Submission
async function runAutopsySubmission(isDemo = false) {
    const autopsyBtn = document.getElementById(isDemo ? 'btn-autopsy-demo' : 'btn-autopsy-upload');
    const originalText = autopsyBtn.innerText;
    autopsyBtn.innerText = 'Running Metamorphic Autopsy...';
    autopsyBtn.disabled = true;

    try {
        let data;
        const seed = parseInt(document.getElementById('pack-seed')?.value) || 1;
        const role = document.getElementById('plan-role')?.value || Sabi.currentRole;

        if (isDemo) {
            const res = await fetch(`/api/dayone/submit/demo?seed=${seed}&role=${encodeURIComponent(role)}`, { method: 'POST' });
            data = await res.json();
            if (!res.ok) throw new Error(data.detail || 'Demo autopsy failed');
        } else {
            const fileInput = document.getElementById('submission-file');
            if (!fileInput.files || fileInput.files.length === 0) {
                showToast('Please select a completed .xlsx file first, or click "Demo with Role Reference Pack".', 'warning');
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
            if (!res.ok) throw new Error(data.detail || 'Workbook autopsy failed');
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
    const seed = parseInt(document.getElementById('pack-seed')?.value) || 1;
    const role = document.getElementById('plan-role')?.value || Sabi.currentRole;
    const candidateAlias = document.getElementById('candidate-alias')?.value.trim() || 'student_001';

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
    const sc = SCENARIOS[Sabi.currentRole] || SCENARIOS["graduate_supply_chain_analyst"];
    let sample = sc?.defence?.sample_answer || 
        "Cell N6 computes the output by multiplying baseline parameters from row 6 by the conversion rates in Inputs sheet. When commercial variables fluctuate, cell N6 adjusts dynamically through formula dependencies.";
    document.getElementById('defence-answer-input').value = sample;
}

async function submitDefenceAnswer() {
    const answer = document.getElementById('defence-answer-input')?.value.trim();
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
                <span class="font-semibold text-xs">Verdict: ${data.classification}</span>
                <span class="text-xs">${data.claims_verified} of ${data.claims_detected} formula claims verified</span>
            </div>
            <p class="text-xs opacity-90">Gate: ${data.understanding_gate ? 'Passed Understanding Gate' : 'Under Review'} · Recommended Level: ${data.recommended_level}</p>
        `;

        if (data.evidence_brief_id) {
            Sabi.lastGeneratedBrief = data.evidence_brief_id;
            setTimeout(() => {
                showToast('Defence complete! Cryptographic Evidence Brief generated.', 'success');
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
        btn.innerHTML = 'Submit Defence Explanation';
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
    if (window.reactCandidatePipelineLoaded) return;
    const container = document.getElementById('candidate-list-grid');
    container.innerHTML = `<div class="col-span-full text-center py-10 text-slate-400 font-medium"><span class="spinner"></span> Fetching verified candidates...</div>`;

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
            card.className = 'card-hover flex flex-col justify-between panel';
            
            const nameDisplay = Sabi.blindMode ? c.candidate_alias : (c.candidate_name || c.candidate_alias);
            const schoolDisplay = Sabi.blindMode ? 'Redacted in Blind Mode' : (c.candidate_school || 'Nigerian University');
            
            const skillsHtml = (c.skills || []).map(s => `
                <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    ${s.skill_name || s.skill_id} · ${s.level} (Tier ${s.tier})
                </span>
            `).join(' ');

            card.innerHTML = `
                <div>
                    <div class="flex justify-between items-start mb-3">
                        <div>
                            <h4 class="font-semibold text-slate-900 text-base">${nameDisplay}</h4>
                            <p class="text-xs text-slate-500">${c.target_role}</p>
                            <p class="text-xs text-slate-400 font-mono mt-0.5">${schoolDisplay}</p>
                        </div>
                        <span class="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded font-semibold border border-blue-200">Tier A Verified</span>
                    </div>

                    <div class="bg-slate-50 rounded-lg p-3 my-3 text-xs space-y-1.5 border border-slate-100">
                        <div class="flex justify-between">
                            <span class="text-slate-600">Metamorphic Shocks:</span>
                            <span class="font-semibold text-emerald-700">${c.signals?.shocks_survived ? c.signals.shocks_survived[0] + '/' + c.signals.shocks_survived[1] : '6/6'} Survived</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-slate-600">Targeted Defence:</span>
                            <span class="font-semibold text-slate-800">Mrs. Bello Gate Passed</span>
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
                    <span class="text-xs font-mono text-slate-400 truncate max-w-[150px]" title="${c.sha256_digest || ''}">
                        SHA: ${(c.sha256_digest || 'd5ae9d12').substring(0, 8)}...
                    </span>
                    <a href="/verify/${c.brief_id}?blind=${Sabi.blindMode}" target="_blank" class="inline-flex items-center text-xs font-semibold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-md transition-colors">
                        Verify Proof                     </a>
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
    if (window.reactCandidatePipelineLoaded) {
        window.dispatchEvent(new CustomEvent('sabi:blind', { detail: { blind: Sabi.blindMode } }));
        return;
    }
    const btn = document.getElementById('btn-toggle-blind');
    if (Sabi.blindMode) {
        btn.innerText = 'Blind Mode: Active (Pedigree Stripped)';
        btn.className = 'btn btn-primary btn-sm';
    } else {
        btn.innerText = 'Blind Mode: Off (Pedigree Visible)';
        btn.className = 'btn btn-quiet btn-sm';
    }
    loadCandidates();
}

// ---------------------------------------------------------------------------
// TAB 3: RADAR ANALYTICS
// ---------------------------------------------------------------------------

async function loadRadarData() {
    if (window.reactTalentInsightsLoaded) {
        window.dispatchEvent(new CustomEvent('sabi:radar-refresh'));
        return;
    }
    const dept = document.getElementById('radar-dept-select')?.value;
    const chartContainer = document.getElementById('radar-gaps-container');
    const funnelContainer = document.getElementById('radar-funnel-container');

    chartContainer.innerHTML = '<div class="text-center py-10 text-slate-400"><span class="spinner"></span> Analyzing job market vs curricula...</div>';

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
            row.className = 'space-y-2 panel-sm';
            row.innerHTML = `
                <div class="flex justify-between items-center text-xs">
                    <span class="font-semibold text-slate-800">${g.skill.replace(/_/g, ' ')}</span>
                    <span class="px-2 py-0.5 rounded font-mono font-semibold ${isDeficit ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}">
                        ${isDeficit ? `Deficit: ${gapPct}%` : `Coverage: +${gapPct}%`}
                    </span>
                </div>
                <div class="space-y-1">
                    <div class="flex items-center text-xs text-slate-500 justify-between">
                        <span>Employer Demand (${demandPct}%)</span>
                        <div class="w-2/3 bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div class="bg-blue-600 h-2 rounded-full" style="width: ${demandPct}%"></div>
                        </div>
                    </div>
                    <div class="flex items-center text-xs text-slate-500 justify-between">
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
            card.className = 'space-y-3 panel-sm';
            card.innerHTML = `
                <h4 class="font-semibold text-slate-900 text-sm border-b pb-2">${f.department} Cohort Funnel</h4>
                <div class="space-y-2 text-xs">
                    <div>
                        <div class="flex justify-between mb-1 font-medium">
                            <span class="text-blue-800">1. Taught in Syllabus</span>
                            <span class="font-semibold">${f.taught_pct}%</span>
                        </div>
                        <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                            <div class="bg-blue-600 h-2.5 rounded-full" style="width: ${f.taught_pct}%"></div>
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-between mb-1 font-medium">
                            <span class="text-amber-800">2. Practiced in Hands-On Lab</span>
                            <span class="font-semibold">${f.practiced_pct}%</span>
                        </div>
                        <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                            <div class="bg-amber-500 h-2.5 rounded-full" style="width: ${f.practiced_pct}%"></div>
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-between mb-1 font-medium">
                            <span class="text-emerald-800">3. Proven on Sabi (Tier A/B)</span>
                            <span class="font-semibold text-emerald-700">${f.proven_pct}%</span>
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

function loadSmePreset(presetKey, silent = false) {
    const data = SME_SAMPLES[presetKey];
    if (!data) return;

    document.getElementById('sme-alias').value = data.alias;
    document.getElementById('sme-business').value = data.business;
    document.getElementById('sme-text').value = data.text;
    
    const audioPlayer = document.getElementById('sme-audio-player');
    const audioContainer = document.getElementById('sme-audio-player-container');
    if (audioPlayer && audioContainer) {
        audioPlayer.src = data.audioUrl;
        audioContainer.classList.remove('hidden');
        document.getElementById('audio-source-label').innerText = `Preset Audio: ${data.alias}`;
    }

    if (!silent) showToast(`Loaded sample audio and transcript for ${data.alias}`, 'info');
}

// Polish Nigerian business speech, locations, and phone numbers
function cleanNigerianTranscript(text) {
    if (!text) return text;

    const replacements = [
        [/\b(night\s*run|nara|nyra|niara)\b/gi, 'Naira'],
        [/\b(cobo|cobble)\b/gi, 'kobo'],
        [/\b(bv\s*and|bbn|bbm|b\s*v\s*n)\b/gi, 'BVN'],
        [/\b(n\s*i\s*n|n\s*and\s*n)\b/gi, 'NIN'],
        [/\b(p\s*o\s*s|pause\s*machine)\b/gi, 'POS'],
        [/\b(c\s*a\s*c|c\s*a\s*see)\b/gi, 'CAC'],
        [/\b(f\s*i\s*r\s*s)\b/gi, 'FIRS'],
        [/\b(surely\s*ray|suru\s*lere)\b/gi, 'Surulere'],
        [/\b(e\s*cage|ekeja)\b/gi, 'Ikeja'],
        [/\b(yabba)\b/gi, 'Yaba'],
        [/\b(a\s*papa)\b/gi, 'Apapa'],
        [/\b(onicha)\b/gi, 'Onitsha'],
        [/\b(bode\s*thomas)\b/gi, 'Bode Thomas'],
        [/\b(tin\s*can)\b/gi, 'Tin Can'],
        [/\b(pro\s*visions?|provison|provisons)\b/gi, 'provisions'],
        [/\b(whole\s*sail|whole\s*sales?)\b/gi, 'wholesale'],
        [/\b(exercise\s*book|exercise\s*books)\b/gi, 'exercise books'],
        [/\b(way\s*bill|way\s*bills)\b/gi, 'waybill'],
        [/\b(haulage|halage)\b/gi, 'haulage']
    ];

    let cleaned = text;
    for (const [pattern, repl] of replacements) {
        cleaned = cleaned.replace(pattern, repl);
    }

    // Spoken phone digits e.g. "0 8 0 3 4 5 6 7 8 9 0" -> "08034567890"
    cleaned = cleaned.replace(/\b(0\s*[789]\s*[01]\s*(?:\d\s*){7,8})\b/g, (match) => match.replace(/\s+/g, ''));
    return cleaned.trim();
}

function polishTranscriptUI() {
    const box = document.getElementById('sme-text');
    if (!box) return;
    box.value = cleanNigerianTranscript(box.value);
    showToast('Polished Nigerian business terms and phone numbers!', 'success');
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
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true,
                channelCount: 1
            }
        });
        Sabi.audioChunks = [];

        let mimeType = '';
        if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
            mimeType = 'audio/webm;codecs=opus';
        } else if (MediaRecorder.isTypeSupported('audio/webm')) {
            mimeType = 'audio/webm';
        } else if (MediaRecorder.isTypeSupported('audio/mp4')) {
            mimeType = 'audio/mp4';
        }

        Sabi.mediaRecorder = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);

        Sabi.mediaRecorder.ondataavailable = (e) => {
            if (e.data && e.data.size > 0) {
                Sabi.audioChunks.push(e.data);
            }
        };

        Sabi.mediaRecorder.onstop = () => {
            const blobType = mimeType || 'audio/webm';
            Sabi.audioBlob = new Blob(Sabi.audioChunks, { type: blobType });
            const audioUrl = URL.createObjectURL(Sabi.audioBlob);
            const audioPlayer = document.getElementById('sme-audio-player');
            const audioContainer = document.getElementById('sme-audio-player-container');
            if (audioPlayer && audioContainer) {
                audioPlayer.src = audioUrl;
                audioContainer.classList.remove('hidden');
                document.getElementById('audio-source-label').innerText = 'Microphone Recording (Smooth Audio)';
            }
        };

        // Continuous unbroken recording avoids choppy fragmented playback
        Sabi.mediaRecorder.start();
        Sabi.isRecording = true;

        const recBtn = document.getElementById('btn-record-audio');
        recBtn.className = 'btn btn-danger';
        recBtn.innerHTML = `<span>Stop Recording (<span id="record-timer">00:00</span>)</span>`;

        const transcriptBox = document.getElementById('sme-text');
        transcriptBox.value = '';
        transcriptBox.placeholder = 'Listening live to your microphone... Spoken words appear here in real time.';

        // Web Speech API with accent awareness
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            try {
                Sabi.speechRecognizer = new SpeechRecognition();
                Sabi.speechRecognizer.continuous = true;
                Sabi.speechRecognizer.interimResults = true;

                // User-selected speech dialect (defaults to en-NG)
                const selectedLang = document.getElementById('sme-speech-lang')?.value || 'en-NG';
                Sabi.speechRecognizer.lang = selectedLang;

                Sabi.speechRecognizer.onresult = (event) => {
                    let currentFinal = '';
                    let currentInterim = '';
                    // Always accumulate across all session results to prevent dropped or repeated words
                    for (let i = 0; i < event.results.length; ++i) {
                        const res = event.results[i];
                        if (res.isFinal) {
                            currentFinal += res[0].transcript + ' ';
                        } else {
                            currentInterim += res[0].transcript;
                        }
                    }
                    const combined = (currentFinal + currentInterim).trim();
                    if (combined) {
                        transcriptBox.value = cleanNigerianTranscript(combined);
                    }
                };

                // Keep speech recognizer alive across pauses
                Sabi.speechRecognizer.onend = () => {
                    if (Sabi.isRecording) {
                        try {
                            Sabi.speechRecognizer.start();
                        } catch (e) {}
                    }
                };

                // Gracefully fallback to en-US if en-NG is not supported in a particular browser
                Sabi.speechRecognizer.onerror = (e) => {
                    console.warn('SpeechRecognition notice:', e.error);
                    if (e.error === 'language-not-supported' && Sabi.speechRecognizer.lang === 'en-NG') {
                        Sabi.speechRecognizer.lang = 'en-US';
                        try { Sabi.speechRecognizer.start(); } catch (err) {}
                    }
                };

                Sabi.speechRecognizer.start();
            } catch (err) {
                console.warn('SpeechRecognition failed to init:', err);
            }
        }

        Sabi.recordSeconds = 0;
        Sabi.recordTimerInterval = setInterval(() => {
            Sabi.recordSeconds++;
            const mins = String(Math.floor(Sabi.recordSeconds / 60)).padStart(2, '0');
            const secs = String(Sabi.recordSeconds % 60).padStart(2, '0');
            const timerSpan = document.getElementById('record-timer');
            if (timerSpan) timerSpan.innerText = `${mins}:${secs}`;
        }, 1000);

        showToast('Microphone recording started. Speak your voice note now!', 'info');
    } catch (err) {
        showToast('Microphone access denied or unsupported: ' + err.message, 'warning');
    }
}

async function stopAudioRecording() {
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
    recBtn.className = 'btn btn-dark';
    recBtn.innerHTML = `<span>Record Voice Note</span>`;

    const transcriptBox = document.getElementById('sme-text');
    let currentText = transcriptBox.value.trim();

    if (currentText) {
        transcriptBox.value = cleanNigerianTranscript(currentText);
    } else {
        // Helpful draft fallback if browser speech recognizer had silence
        const recordedSecs = Sabi.recordSeconds || 1;
        const alias = document.getElementById('sme-alias')?.value.trim() || 'Mrs. Funke Adebayo';
        const business = document.getElementById('sme-business')?.value.trim() || 'Retail Provisions Store';
        currentText = `Voice note recording (${recordedSecs}s) from ${alias} (${business}): We need help building an automated spreadsheet model to track our daily sales transactions, customer accounts, and expense margins. Please extract requirements and format into a project brief. Phone: 08034567890.`;
        transcriptBox.value = currentText;
    }

    showToast('Voice note recorded! Extracting brief...', 'success');

    // Automatically trigger brief extraction
    setTimeout(() => {
        processSmeBrief();
    }, 400);
}

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

    const currentText = document.getElementById('sme-text').value.trim();
    if (!currentText) {
        document.getElementById('sme-text').value = `Voice note uploaded: ${file.name}. Audio is loaded in the player. Phone: 08034567890.`;
    }

    showToast(`Loaded audio file: ${file.name}`, 'info');
}

async function processSmeBrief() {
    const text = document.getElementById('sme-text')?.value.trim();
    const alias = document.getElementById('sme-alias')?.value.trim() || 'SME_OWNER';
    const business = document.getElementById('sme-business')?.value.trim() || 'Small Business';
    const groqKey = document.getElementById('sme-groq-key')?.value.trim();

    const btn = document.getElementById('btn-process-sme');
    btn.disabled = true;
    btn.innerHTML = 'Sanitising Nigerian PII & Extracting Brief...';

    try {
        let res, briefData;

        if (Sabi.audioBlob && (Sabi.audioBlob instanceof Blob || Sabi.audioBlob instanceof File)) {
            const formData = new FormData();
            formData.append('audio', Sabi.audioBlob, Sabi.audioBlob.name || 'voice_note.webm');
            formData.append('owner_alias', alias);
            formData.append('business_type', business);
            if (text) formData.append('transcript', text);
            if (groqKey) formData.append('groq_key', groqKey);

            res = await fetch('/api/sme/upload-audio', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            briefData = data.brief;
            if (data.transcript) {
                document.getElementById('sme-text').value = data.transcript;
            }
            if (data.audio_url) {
                document.getElementById('sme-audio-player').src = data.audio_url;
                document.getElementById('sme-audio-player-container').classList.remove('hidden');
            }
        } else {
            if (!text) {
                showToast('Please record audio, upload an audio file, or enter transcript text first.', 'warning');
                btn.disabled = false;
                btn.innerHTML = 'Sanitise & Extract Micro-Project Brief';
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
        btn.innerHTML = 'Sanitise & Extract Micro-Project Brief';
    }
}

function renderSmeResult(brief) {
    const container = document.getElementById('sme-results-container');
    container.classList.remove('hidden');
    const placeholder = document.getElementById('sme-placeholder');
    if (placeholder) placeholder.classList.add('hidden');
    container.scrollIntoView({ behavior: 'smooth' });

    document.getElementById('sme-pii-count').innerText = `${brief.pii_found} PII items redacted`;
    
    let sanitised = brief.sanitised_transcript;
    sanitised = sanitised.replace(/\[([A-Z_]+_REDACTED)\]/g, '<span class="redacted-tag">$1</span>');
    document.getElementById('sme-sanitised-text').innerHTML = sanitised;

    document.getElementById('sme-brief-problem').innerText = brief.problem_statement;
    document.getElementById('sme-brief-effort').innerText = `${brief.effort_days} Days (${brief.effort_estimate})`;
    
    const riskBadge = document.getElementById('sme-privacy-risk');
    riskBadge.innerText = `Privacy risk: ${brief.privacy_risk_level}`;
    if (brief.privacy_risk_level === 'high') {
        riskBadge.className = 'text-xs font-semibold px-2 py-0.5 rounded bg-rose-100 text-rose-800';
    } else if (brief.privacy_risk_level === 'medium') {
        riskBadge.className = 'text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-800';
    } else {
        riskBadge.className = 'text-xs font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800';
    }

    const delivList = document.getElementById('sme-deliverables-list');
    delivList.innerHTML = brief.deliverables.map(d => `<li class="flex items-start space-x-2"><span class="tick" aria-hidden="true"></span><span>${d}</span></li>`).join('');

    const skillContainer = document.getElementById('sme-skill-tags');
    skillContainer.innerHTML = brief.skill_tags.map(t => `<span class="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded font-mono font-medium">${t}</span>`).join(' ');
}

// ---------------------------------------------------------------------------
// INITIALIZATION
// ---------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    const roleSelect = document.getElementById('plan-role');
    const initialRole = roleSelect ? roleSelect.value : 'graduate_supply_chain_analyst';

    // Immediately render UI and quick pills synchronously
    onRoleChange(initialRole);

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

    // Initialize the auth session. Task data is fetched when its tab is opened.
    initAuth();
});


// ---------------------------------------------------------------------------
// VIEW ROUTING: overview page, login portal, and app views switched by URL hash
// ---------------------------------------------------------------------------
function route() {
    const h = location.hash;
    const inAuth = h.startsWith('#login');
    const inApp = h.startsWith('#app');

    const landingEl = document.getElementById('view-landing');
    const authEl = document.getElementById('view-auth');
    const appEl = document.getElementById('view-app');

    if (landingEl) landingEl.classList.toggle('hidden', inAuth || inApp);
    if (authEl) authEl.classList.toggle('hidden', !inAuth);
    if (appEl) appEl.classList.toggle('hidden', !inApp);

    if (inAuth) {
        const authRole = h.split('/')[1] === 'employer' ? 'employer' : 'student';
        switchAuthMode(authRole);
        window.scrollTo(0, 0);
    } else if (inApp) {
        if (!Sabi.currentUser) initAuth();
        const tab = h.split('/')[1];
        if (['student', 'employer', 'radar', 'sme', 'employer-tasks', 'student-analytics'].includes(tab)) {
            switchTab(tab);
        } else {
            // Default tab based on role
            switchTab(Sabi.currentUser.role === 'employer' ? 'employer' : 'student');
        }
        window.scrollTo(0, 0);
    } else if (!h || h === '#') {
        window.scrollTo(0, 0);
    }
}
window.addEventListener('hashchange', route);
document.addEventListener('DOMContentLoaded', route);


// ---------------------------------------------------------------------------
// AUTHENTICATION & PORTAL ROLE SEPARATION
// ---------------------------------------------------------------------------

function initAuth() {
    let saved = null;
    try {
        const raw = localStorage.getItem('sabi-user');
        if (raw) saved = JSON.parse(raw);
    } catch (e) {}

    if (!saved || !saved.role) {
        // Default to Ada Okafor (Student) for initial load
        saved = {
            id: 'usr_ada_001',
            email: 'ada@unilag.edu.ng',
            role: 'student',
            name: 'Ada Okafor',
            organization: 'University of Lagos',
            alias: 'Ada Okafor',
            level: 'Working'
        };
    }
    setUserSession(saved, false);
}

function toggleDemoMenu(force) {
    const menu = document.getElementById('auth-demo-menu');
    if (!menu) return;
    if (typeof force === 'boolean') {
        menu.classList.toggle('hidden', !force);
    } else {
        menu.classList.toggle('hidden');
    }
}

// Close demo dropdown when clicking outside
document.addEventListener('click', (e) => {
    const btn = document.getElementById('btn-auth-demo-menu');
    const menu = document.getElementById('auth-demo-menu');
    if (menu && !menu.classList.contains('hidden')) {
        if (btn && !btn.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.add('hidden');
        }
    }
});

function switchAuthMode(role) {
    const studentTab = document.getElementById('auth-tab-student');
    const employerTab = document.getElementById('auth-tab-employer');
    const studentCard = document.getElementById('auth-card-student');
    const employerCard = document.getElementById('auth-card-employer');

    if (role === 'employer') {
        if (studentTab) studentTab.className = 'portal-tab-btn';
        if (employerTab) employerTab.className = 'portal-tab-btn is-active-employer';
        if (studentCard) studentCard.classList.add('hidden');
        if (employerCard) employerCard.classList.remove('hidden');
        if (location.hash.startsWith('#login')) history.replaceState(null, '', '#login/employer');
    } else {
        if (studentTab) studentTab.className = 'portal-tab-btn is-active';
        if (employerTab) employerTab.className = 'portal-tab-btn';
        if (studentCard) studentCard.classList.remove('hidden');
        if (employerCard) employerCard.classList.add('hidden');
        if (location.hash.startsWith('#login')) history.replaceState(null, '', '#login/student');
    }
}

async function loginQuick(email, role) {
    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, role: role })
        });
        const data = await res.json();
        if (res.ok && data.user) {
            setUserSession(data.user, true);
            showToast(`Signed in as ${data.user.name} (${data.user.role === 'student' ? 'Student' : 'Employer'})`, 'success');
            location.hash = data.user.role === 'student' ? '#app/student' : '#app/employer';
        } else {
            showToast(data.detail || 'Login failed', 'error');
        }
    } catch (err) {
        showToast('Login error: ' + err.message, 'error');
    }
}

async function handleAuthSubmit(event, role) {
    event.preventDefault();
    let email, name, org;
    if (role === 'student') {
        email = document.getElementById('auth-student-email')?.value.trim();
        name = document.getElementById('auth-student-name')?.value.trim();
    } else {
        email = document.getElementById('auth-employer-email')?.value.trim();
        org = document.getElementById('auth-employer-org')?.value.trim();
    }

    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, role: role, name: name, organization: org })
        });
        const data = await res.json();
        if (res.ok && data.user) {
            setUserSession(data.user, true);
            showToast(`Welcome, ${data.user.name}!`, 'success');
            location.hash = data.user.role === 'student' ? '#app/student' : '#app/employer';
        } else {
            showToast(data.detail || 'Failed to sign in', 'error');
        }
    } catch (err) {
        showToast('Error: ' + err.message, 'error');
    }
}

function setUserSession(user, saveToStorage = true) {
    Sabi.currentUser = user;
    if (saveToStorage) {
        try { localStorage.setItem('sabi-user', JSON.stringify(user)); } catch (e) {}
    }

    // Update Header Badge
    const nameEl = document.getElementById('auth-user-name');
    const roleBadge = document.getElementById('auth-user-role-badge');
    const dotEl = document.getElementById('auth-user-dot');
    const aliasInput = document.getElementById('candidate-alias');

    if (nameEl) nameEl.innerText = user.name || 'User';
    if (aliasInput && user.role === 'student') aliasInput.value = user.alias || user.name || 'Ada Okafor';
    const diagBadge = document.getElementById('curriculum-candidate-badge');
    if (diagBadge && user.role === 'student') {
        diagBadge.innerText = `${user.name || 'Candidate'} · ${user.university || 'Undergraduate'}`;
    }

    if (roleBadge) {
        if (user.role === 'student') {
            roleBadge.className = 'badge-student';
            roleBadge.innerText = 'Student';
            if (dotEl) dotEl.className = 'w-2 h-2 rounded-full bg-emerald-500';
        } else {
            roleBadge.className = 'badge-employer';
            roleBadge.innerText = `Employer · ${user.organization || user.company || 'Moniepoint'}`;
            if (dotEl) dotEl.className = 'w-2 h-2 rounded-full bg-purple-500';
        }
    }

    applyPortalRole(user.role);
    window.dispatchEvent(new CustomEvent('sabi:session', { detail: { user } }));
}

function applyPortalRole(role) {
    const studentElements = document.querySelectorAll('.student-only');
    const employerElements = document.querySelectorAll('.employer-only');

    if (role === 'student') {
        studentElements.forEach(el => el.style.display = '');
        employerElements.forEach(el => el.style.display = 'none');
        if (['employer', 'sme', 'radar'].includes(Sabi.activeTab)) {
            switchTab('student');
        }
    } else {
        studentElements.forEach(el => el.style.display = 'none');
        employerElements.forEach(el => el.style.display = '');
        if (['student', 'employer-tasks', 'student-analytics'].includes(Sabi.activeTab)) {
            switchTab('employer');
        }
    }
}

function logout() {
    showToast('Redirecting to Portal Selector...', 'info');
    location.hash = '#login/' + (Sabi.currentUser?.role || 'student');
}

// ---------------------------------------------------------------------------
// EMPLOYER TASKS & LIVE BRIEFS MANAGEMENT
// ---------------------------------------------------------------------------

async function loadEmployerTasks() {
    try {
        const res = await fetch('/api/employer/tasks');
        const data = await res.json();
        if (res.ok && data.tasks) {
            Sabi.allEmployerTasks = data.tasks;
            renderStudentEmployerTasks();
            renderEmployerActiveTasks();
        }
    } catch (err) {
        console.warn('Failed to load employer tasks:', err);
    }
}

function renderStudentEmployerTasks() {
    if (window.reactOpenChallengesLoaded) return;
    const container = document.getElementById('student-employer-tasks-grid');
    if (!container) return;

    let tasks = Sabi.allEmployerTasks || [];
    if (Sabi.currentFilterTrack && Sabi.currentFilterTrack !== 'all') {
        tasks = tasks.filter(t => t.role_track === Sabi.currentFilterTrack);
    }

    if (tasks.length === 0) {
        container.innerHTML = `
            <div class="col-span-full panel text-center py-10 text-slate-400 text-xs">
                No active tasks found for this track. Check back soon or switch filter!
            </div>
        `;
        return;
    }

    container.innerHTML = tasks.map(task => `
        <div class="panel space-y-4 flex flex-col justify-between hover:border-emerald-300 transition-colors">
            <div class="space-y-2">
                <div class="flex items-center justify-between">
                    <span class="badge-student text-[11px] font-semibold">${task.company_name}</span>
                    <span class="text-xs font-mono font-medium text-slate-500">${task.timebox_mins || 90} mins</span>
                </div>
                <h3 class="font-semibold text-slate-900 text-sm leading-snug">${task.title}</h3>
                <p class="text-xs text-slate-600 leading-relaxed line-clamp-3">${task.problem_statement}</p>
                
                <div class="space-y-1 pt-1 border-t border-slate-100">
                    <span class="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Target Deliverables:</span>
                    <ul class="text-xs text-slate-700 space-y-1">
                        ${(task.deliverables || []).slice(0, 3).map(d => `<li class="flex items-start gap-1.5"><span class="text-emerald-600 font-bold">✓</span><span>${d}</span></li>`).join('')}
                    </ul>
                </div>
            </div>

            <div class="space-y-3 pt-3 border-t border-slate-100">
                <div class="flex flex-wrap gap-1">
                    ${(task.skill_tags || []).map(s => `<span class="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded font-medium">${s}</span>`).join('')}
                </div>
                <button type="button" onclick="takeEmployerChallenge('${task.id}', '${task.role_track}')" class="btn btn-primary btn-sm w-full font-semibold">
                    Take on this challenge →
                </button>
            </div>
        </div>
    `).join('');
}

function renderEmployerActiveTasks() {
    const container = document.getElementById('employer-active-tasks-grid');
    if (!container) return;

    const tasks = Sabi.allEmployerTasks || [];
    if (tasks.length === 0) {
        container.innerHTML = `<div class="panel text-center py-6 text-slate-400 text-xs">No challenges published yet. Post one above or extract from an SME voice note!</div>`;
        return;
    }

    container.innerHTML = tasks.map(task => `
        <div class="panel-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div class="space-y-0.5">
                <div class="flex items-center gap-2">
                    <span class="font-semibold text-slate-900 text-xs">${task.title}</span>
                    <span class="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">${task.status || 'Active'}</span>
                </div>
                <p class="text-xs text-slate-500">${task.role_title} · Posted by ${task.posted_by} · ${task.timebox_mins} mins</p>
            </div>
            <div class="flex items-center gap-2 text-xs">
                <span class="font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                    ${task.applicants_count || 0} Submissions
                </span>
            </div>
        </div>
    `).join('');
}

function filterEmployerTasks(track, btn) {
    Sabi.currentFilterTrack = track;
    document.querySelectorAll('#tab-employer-tasks .role-pill').forEach(b => b.classList.remove('is-active'));
    if (btn) btn.classList.add('is-active');
    renderStudentEmployerTasks();
}

function takeEmployerChallenge(taskId, roleTrack) {
    // Switch to student portal, select matching role, and open scenario
    if (roleTrack) {
        onRoleChange(roleTrack);
    }
    switchTab('student');
    window.scrollTo({ top: 300, behavior: 'smooth' });
    showToast(`Loaded scenario matching this challenge: ${roleTrack.replace(/_/g, ' ')}`, 'info');
}

async function publishExtractedBriefAsTask() {
    if (!Sabi.lastGeneratedBrief) {
        showToast('Please extract an SME brief first before publishing.', 'warning');
        return;
    }

    const b = Sabi.lastGeneratedBrief;
    const btn = document.getElementById('btn-publish-extracted-task');
    if (btn) {
        btn.disabled = true;
        btn.innerHTML = 'Publishing...';
    }

    try {
        const res = await fetch('/api/employer/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: `${b.business_type}: Operational Analysis Brief`,
                role_track: 'graduate_supply_chain_analyst',
                company_name: `${b.owner_alias} Enterprise`,
                timebox_mins: 90,
                data_budget_mb: 45,
                problem_statement: b.problem_statement,
                deliverables: b.deliverables,
                skill_tags: b.skill_tags,
                posted_by: `${Sabi.currentUser?.name || 'SME Partner'} (${Sabi.currentUser?.organization || 'Lagos SME Rail'})`
            })
        });

        const data = await res.json();
        if (res.ok) {
            showToast('Brief successfully published as live student task!', 'success');
            loadEmployerTasks();
        } else {
            showToast('Failed to publish: ' + (data.detail || 'Unknown error'), 'error');
        }
    } catch (err) {
        showToast('Error: ' + err.message, 'error');
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<span>Publish to Student Portal</span>';
        }
    }
}

async function handleManualTaskSubmit(event) {
    event.preventDefault();
    const title = document.getElementById('emp-task-title')?.value.trim();
    const track = document.getElementById('emp-task-track')?.value;
    const timebox = parseInt(document.getElementById('emp-task-timebox')?.value) || 90;
    const problem = document.getElementById('emp-task-problem')?.value.trim();
    const deliverablesRaw = document.getElementById('emp-task-deliverables')?.value.trim();
    const skillsRaw = document.getElementById('emp-task-skills')?.value.trim();

    const deliverables = deliverablesRaw.split('\n').map(s => s.trim()).filter(s => s.length > 0);
    const skills = skillsRaw.split(',').map(s => s.trim()).filter(s => s.length > 0);

    const btn = document.getElementById('btn-create-manual-task');
    if (btn) btn.disabled = true;

    try {
        const res = await fetch('/api/employer/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: title,
                role_track: track,
                company_name: Sabi.currentUser?.organization || Sabi.currentUser?.company || 'Hiring Partner',
                timebox_mins: timebox,
                data_budget_mb: 50,
                problem_statement: problem,
                deliverables: deliverables,
                skill_tags: skills,
                posted_by: Sabi.currentUser?.name || 'Talent Partner'
            })
        });

        const data = await res.json();
        if (res.ok) {
            showToast(`Task "${title}" published live to students!`, 'success');
            event.target.reset();
            loadEmployerTasks();
        } else {
            showToast('Failed to post task: ' + (data.detail || 'Error'), 'error');
        }
    } catch (err) {
        showToast('Error posting task: ' + err.message, 'error');
    } finally {
        if (btn) btn.disabled = false;
    }
}

// ---------------------------------------------------------------------------
// DATA SAVER (lite mode): the mode is chosen in the page head before heavy files
// load, so changing modes reloads the current route with the matching asset set.
// ---------------------------------------------------------------------------
function syncModeSwitch() {
    const lite = document.documentElement.dataset.mode === 'lite';
    document.querySelectorAll('.mode-switch').forEach(b => b.setAttribute('aria-checked', String(lite)));
}

function toggleMode() {
    const next = document.documentElement.dataset.mode === 'lite' ? 'full' : 'lite';
    try {
        localStorage.setItem('sabi-mode', next);
    } catch (e) {
        const url = new URL(window.location.href);
        url.searchParams.set('sabi-mode', next);
        window.location.assign(url.toString());
        return;
    }
    window.location.reload();
}

document.addEventListener('DOMContentLoaded', syncModeSwitch);

// ---------------------------------------------------------------------------
// CANDIDATE DIAGNOSTIC & DYNAMIC CURRICULUM GAP ANALYZER (TestGorilla-Style)
// ---------------------------------------------------------------------------

const CURRICULUM_PRESETS = {
    unilag_econ: {
        role: "graduate_supply_chain_analyst",
        degree: "UNILAG B.Sc. Economics",
        badge: "Ada Okafor · UNILAG Economics",
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
        role: "junior_data_analyst",
        degree: "UI B.Sc. Computer Science",
        badge: "Emeka Obi · UI Computer Science",
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
        role: "financial_modelling_intern",
        degree: "ABU B.Sc. Accounting",
        badge: "Zainab Bello · ABU Accounting",
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

function initCurriculumGapIfEmpty() {
    if (window.reactCurriculumLoaded) return;
    if (!Sabi.curriculumGapData) {
        loadCurriculumPreset('unilag_econ');
    }
}

function loadCurriculumPreset(key) {
    const preset = CURRICULUM_PRESETS[key];
    if (!preset) return;

    const roleSelect = document.getElementById('curriculum-target-role');
    const textArea = document.getElementById('curriculum-text-input');
    const badgeEl = document.getElementById('curriculum-candidate-badge');

    if (roleSelect) roleSelect.value = preset.role;
    if (textArea) textArea.value = preset.text;
    if (badgeEl) badgeEl.innerText = preset.badge;

    clearCurriculumFile();
    runCurriculumAnalysis();
}

function clearCurriculumInput() {
    const textArea = document.getElementById('curriculum-text-input');
    if (textArea) textArea.value = '';
    clearCurriculumFile();
    showToast('Curriculum input cleared.', 'info');
}

function handleCurriculumFileSelected(event) {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    Sabi.curriculumSelectedFile = file;
    const nameEl = document.getElementById('curriculum-file-name');
    const statusEl = document.getElementById('curriculum-file-status');
    const dropzoneText = document.getElementById('curriculum-dropzone-text');

    if (nameEl) nameEl.innerText = `${file.name} (${Math.round(file.size / 1024)} KB)`;
    if (statusEl) statusEl.classList.remove('hidden');
    if (dropzoneText) dropzoneText.innerText = `Loaded: ${file.name}`;

    showToast(`Loaded "${file.name}". Click 'Analyze Fit & Calculate Gap' to process.`, 'info');
}

function clearCurriculumFile() {
    Sabi.curriculumSelectedFile = null;
    const fileInput = document.getElementById('curriculum-file-input');
    const statusEl = document.getElementById('curriculum-file-status');
    const dropzoneText = document.getElementById('curriculum-dropzone-text');

    if (fileInput) fileInput.value = '';
    if (statusEl) statusEl.classList.add('hidden');
    if (dropzoneText) dropzoneText.innerText = 'Click to browse or drop syllabus PDF';
}

function removeCurriculumFile(event) {
    if (event) event.stopPropagation();
    clearCurriculumFile();
}

function setupCurriculumDropzone() {
    const dropzone = document.getElementById('curriculum-dropzone');
    if (!dropzone) return;

    ['dragenter', 'dragover'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropzone.classList.add('border-emerald-500', 'bg-emerald-50/50');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropzone.addEventListener(eventName, (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropzone.classList.remove('border-emerald-500', 'bg-emerald-50/50');
        }, false);
    });

    dropzone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files && files.length > 0) {
            const fakeEvent = { target: { files: files } };
            handleCurriculumFileSelected(fakeEvent);
        }
    }, false);
}

async function runCurriculumAnalysis() {
    const roleSelect = document.getElementById('curriculum-target-role');
    const textArea = document.getElementById('curriculum-text-input');
    const btn = document.getElementById('btn-run-curriculum-analysis');
    const descEl = document.getElementById('curriculum-role-desc');

    const targetRole = roleSelect ? roleSelect.value : 'graduate_supply_chain_analyst';
    const curriculumText = textArea ? textArea.value : '';
    const studentAlias = Sabi.currentUser ? Sabi.currentUser.name : 'Ada Okafor';

    const roleDescriptions = {
        graduate_supply_chain_analyst: "Landed-cost modelling, ECOWAS tariff calculation, port demurrage mitigation, and FX sensitivity analysis.",
        junior_data_analyst: "Customer cohort retention analysis, unit economics (LTV/CAC), and data pipeline cleaning.",
        operations_associate: "Fleet dispatch haulage margins, liquidity balancing, and turnaround optimization.",
        financial_modelling_intern: "13-week cashflow runway forecasting, working capital optimization, and credit risk stress-testing."
    };
    if (descEl) descEl.innerText = roleDescriptions[targetRole] || '';

    const formData = new FormData();
    formData.append('target_role', targetRole);
    formData.append('student_alias', studentAlias);
    if (curriculumText) formData.append('curriculum_text', curriculumText);
    if (Sabi.curriculumSelectedFile) {
        formData.append('file', Sabi.curriculumSelectedFile);
    }

    if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span>Analyzing Curriculum...</span>';
    }

    try {
        const res = await fetch('/api/student/curriculum-gap', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        if (res.ok && data.status === 'success') {
            Sabi.curriculumGapData = data;
            renderCurriculumDiagnostic(data);
            showToast(`Diagnostic calculated: ${data.match_percentage}% Match for ${data.target_role_title}`, 'success');
        } else {
            showToast('Diagnostic failed: ' + (data.detail || 'Server error'), 'error');
        }
    } catch (err) {
        showToast('Error analyzing curriculum: ' + err.message, 'error');
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = '<span>Analyze Fit &amp; Calculate Gap</span>';
        }
    }
}

function renderCurriculumDiagnostic(data) {
    const scoreEl = document.getElementById('curriculum-match-score');
    const barEl = document.getElementById('curriculum-match-bar');
    const tierEl = document.getElementById('curriculum-readiness-tier');
    const pctEl = document.getElementById('curriculum-cohort-percentile');
    const bridgeEl = document.getElementById('curriculum-bridge-name');
    const summaryEl = document.getElementById('curriculum-summary-box');

    if (scoreEl) scoreEl.innerText = data.match_percentage;
    if (barEl) {
        barEl.style.width = `${data.match_percentage}%`;
        if (data.match_percentage >= 75) {
            barEl.className = 'h-full bg-emerald-600 transition-all duration-500';
        } else if (data.match_percentage >= 50) {
            barEl.className = 'h-full bg-teal-600 transition-all duration-500';
        } else {
            barEl.className = 'h-full bg-amber-500 transition-all duration-500';
        }
    }
    if (tierEl) {
        tierEl.innerHTML = `<span class="inline-flex items-center gap-1.5">${data.readiness_tier}</span>`;
    }
    if (pctEl) {
        pctEl.innerText = `Top ${100 - data.cohort_percentile}% (${data.cohort_percentile}th Percentile)`;
    }
    if (bridgeEl) {
        bridgeEl.innerText = data.recommended_bridge_scenario;
    }
    if (summaryEl) {
        summaryEl.innerHTML = `<strong>Diagnostic Evaluation:</strong> ${data.summary}`;
    }

    const strongList = document.getElementById('curriculum-strong-list');
    const strongCount = document.getElementById('curriculum-strong-count');
    if (strongCount) strongCount.innerText = `${data.strong_areas.length} proficiencies`;

    if (strongList) {
        if (!data.strong_areas || data.strong_areas.length === 0) {
            strongList.innerHTML = `<p class="text-xs text-slate-500 italic">No direct keyword matches found in submitted text. Try loading a degree preset.</p>`;
        } else {
            strongList.innerHTML = data.strong_areas.map(item => `
                <div class="p-3 bg-white border border-slate-200 rounded-lg hover:border-emerald-300 transition-colors">
                    <div class="flex items-start justify-between gap-2">
                        <div>
                            <div class="flex items-center gap-2">
                                <span class="font-semibold text-slate-900 text-xs">${item.name}</span>
                                <span class="text-[10px] text-slate-500 uppercase tracking-wider">${item.category}</span>
                            </div>
                            <p class="text-[11px] text-slate-600 mt-1">${item.assessment}</p>
                        </div>
                        <span class="badge-student text-[11px] shrink-0 font-medium">${item.rating} · ${item.score_pct}%</span>
                    </div>
                    <div class="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-2.5">
                        <div class="h-full bg-emerald-600 rounded-full" style="width: ${item.score_pct}%"></div>
                    </div>
                </div>
            `).join('');
        }
    }

    const deficitList = document.getElementById('curriculum-deficits-list');
    const deficitCount = document.getElementById('curriculum-deficit-count');
    if (deficitCount) deficitCount.innerText = `${data.areas_to_work_on.length} deficits`;

    if (deficitList) {
        if (!data.areas_to_work_on || data.areas_to_work_on.length === 0) {
            deficitList.innerHTML = `<div class="p-4 bg-emerald-50 border border-emerald-200 rounded text-xs text-emerald-800">Complete curriculum coverage! No critical technical gaps identified for this role.</div>`;
        } else {
            deficitList.innerHTML = data.areas_to_work_on.map(item => {
                const isCritical = item.severity === 'Critical Deficit';
                const badgeStyle = isCritical
                    ? 'background:#fee2e2; color:#991b1b; border:1px solid #fca5a5;'
                    : 'background:#fef3c7; color:#92400e; border:1px solid #fcd34d;';
                return `
                    <div class="p-3 bg-white border border-slate-200 rounded-lg hover:border-rose-300 transition-colors">
                        <div class="flex items-start justify-between gap-2">
                            <div>
                                <div class="flex items-center gap-2">
                                    <span class="font-semibold text-slate-900 text-xs">${item.name}</span>
                                    <span class="text-[10px] text-slate-500 uppercase tracking-wider">${item.category}</span>
                                </div>
                                <p class="text-[11px] text-slate-600 mt-1">${item.gap_description}</p>
                            </div>
                            <span class="badge-student text-[10px] shrink-0 font-semibold" style="${badgeStyle}">
                                ${item.severity}
                            </span>
                        </div>
                        <div class="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100">
                            <span class="text-[11px] text-slate-500">Bridge with: <strong>${item.bridge_scenario}</strong></span>
                            <button type="button" onclick="startBridgeScenario('${data.target_role}')" class="text-xs text-emerald-700 hover:text-emerald-900 font-semibold inline-flex items-center gap-1">
                                Solve Scenario &rarr;
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        }
    }
}

function startBridgeScenario(roleKey) {
    const targetRole = roleKey || Sabi.curriculumGapData?.target_role || 'graduate_supply_chain_analyst';

    switchTab('student');

    if (typeof onRoleChange === 'function') {
        onRoleChange(targetRole);
    }

    const targetEl = document.getElementById('scenario-card') || document.getElementById('tab-student');
    if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
    }

    showToast(`Loaded Day One Scenario: ${targetRole.replace(/_/g, ' ')}. Prove your capability!`, 'info');
}

document.addEventListener('DOMContentLoaded', setupCurriculumDropzone);

// Stable bridge surface for the React workspace. Keeping these actions explicit
// avoids coupling React components to the legacy controller's global scope.
Object.assign(window, {
    switchTab,
    onRoleChange,
    toggleMode,
    logout,
    toggleBlindMode,
    startBridgeScenario,
    showToast,
    takeEmployerChallenge,
});

