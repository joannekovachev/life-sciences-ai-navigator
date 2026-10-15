(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wideMQ = window.matchMedia('(min-width: 1100px)');

  /* ------------------------------------------------------------------ */
  /* Data                                                               */
  /* ------------------------------------------------------------------ */

  const LEARN = 'https://learn.microsoft.com/en-us/';
  const TECH_LINKS = {
    'Microsoft 365 Copilot': LEARN + 'microsoft-365/copilot/microsoft-365-copilot-overview',
    'Copilot Cowork': LEARN + 'microsoft-365/copilot/cowork/',
    'Microsoft Autopilot': 'https://blogs.microsoft.com/blog/2026/09/25/introducing-the-new-copilot-with-home-code-and-autopilot/',
    'Researcher and Analyst agents': LEARN + 'microsoft-365/copilot/researcher-agent',
    'Work IQ': LEARN + 'microsoft-iq/',
    'Microsoft IQ': LEARN + 'microsoft-iq/',
    'Microsoft Graph': LEARN + 'graph/overview',
    'Copilot Studio': LEARN + 'microsoft-copilot-studio/',
    'Multi-agent orchestration': LEARN + 'microsoft-copilot-studio/authoring-add-other-agents',
    'Microsoft Foundry': LEARN + 'azure/foundry/',
    'Power Automate': LEARN + 'power-automate/',
    'Dataverse': LEARN + 'power-apps/maker/data-platform/data-platform-intro',
    'Microsoft Entra': LEARN + 'entra/',
    'Microsoft Purview': LEARN + 'purview/',
    'Microsoft Defender': LEARN + 'defender-xdr/',
    'Agent governance and identity': LEARN + 'microsoft-agent-365/overview',
    'Dynamics 365': LEARN + 'dynamics365/',
    'Power Apps': LEARN + 'power-apps/',
    'Power BI': LEARN + 'power-bi/',
    'AI Builder': LEARN + 'ai-builder/overview',
    'GitHub Copilot': 'https://docs.github.com/en/copilot',
    'VS Code': 'https://code.visualstudio.com/docs',
    'Azure MCP Server': LEARN + 'azure/developer/azure-mcp-server/overview',
    'Azure AI Search': LEARN + 'azure/search/',
    'Foundry Models': LEARN + 'azure/foundry/foundry-models/concepts/models-sold-directly-by-azure',
    'Semantic Kernel': LEARN + 'semantic-kernel/overview/',
    'Agent Framework': LEARN + 'agent-framework/overview/',
    'AI Toolkit': LEARN + 'windows/ai/toolkit/',
    'Content Safety': LEARN + 'azure/ai-services/content-safety/overview'
  };
  const techChip = (t) => TECH_LINKS[t]
    ? `<a class="chip chip-link" href="${TECH_LINKS[t]}" target="_blank" rel="noopener noreferrer">${t}<span class="sr-only"> (opens in a new tab)</span></a>`
    : `<span class="chip">${t}</span>`;
  const STAGES = [
    {
      short: 'Assistants',
      name: 'Humans Working with AI Assistants',
      anchor: 'Microsoft 365 Copilot',
      tag: 'Humans perform the work. AI helps.',
      desc: 'The user remains the primary worker. AI supports each task on request, and the person reviews and decides.',
      assists: ['Drafting', 'Summarization', 'Analysis', 'Information retrieval', 'Content generation'],
      what: 'An AI assistant that works alongside a person across everyday tasks: drafting, summarizing, analyzing, and finding information.',
      owner: 'The human performs and owns every task. AI proposes; the person reviews and decides.',
      participates: 'On request, grounded in the user\u2019s own work context such as email, meetings, files, and chats, respecting existing permissions.',
      uses: [
        'Summarizing long Teams threads and study-team or launch-team meetings',
        'Drafting SOP updates, scientific summaries and internal communications for review',
        'Analyzing enrollment, batch, or sales trends in Excel',
        'Summarizing protocols, regulatory guidance and literature with citations',
        'Triaging and replying to a heavy Outlook inbox',
        'Drafting procedures, board materials, and presentations'
      ],
      tech: ['Microsoft 365 Copilot', 'Outlook', 'Teams', 'Word', 'Excel', 'PowerPoint'],
      value: 'Broad individual productivity, less time spent drafting and searching, and lower cognitive load. Value depends on adoption and skills.',
      role: 'Practitioner with an assistant',
      aiRole: 'Assistant, on request',
      humans: 'The task itself, with judgment and decisions staying with the person.',
      aiTakes: 'Drafting, summarizing, searching and first-pass analysis around the task.'
    },
    {
      short: 'Delegation',
      name: 'Humans Delegating to AI Teammates',
      anchor: 'Copilot Cowork, Microsoft Autopilot',
      tag: 'Humans own outcomes. AI completes assigned work.',
      desc: 'People delegate complete projects and outcomes to AI, then review, refine, and approve the result.',
      assists: ['Research', 'Analysis', 'Document creation', 'Information gathering', 'Project execution'],
      what: 'A person defines an outcome and hands a multi-step piece of work to AI, which plans, gathers information, produces the deliverable, and checks in.',
      owner: 'The human owns the outcome and its quality. AI owns the execution of the assigned work.',
      participates: 'Planning, research across work and web sources, analysis, drafting full deliverables, and iterating on feedback.',
      uses: [
        'Executive briefing preparation before a board, investor or health authority meeting',
        'Target, market and competitor research for a portfolio or brand strategy',
        'Strategic analysis of pipeline, quality, supply, or margin trends',
        'Inspection and audit evidence packages',
        'Project status and decision packages',
        'An always-on agent that tracks follow-ups, deadlines and recurring issues, and tells the owner what needs attention'
      ],
      tech: ['Copilot Cowork', 'Microsoft Autopilot', 'Researcher and Analyst agents', 'Microsoft 365 Copilot', 'Work IQ', 'Microsoft IQ', 'Microsoft Graph'],
      value: 'The unit of value moves from minutes saved to hours or days of finished work returned, so leaders review more and draft less.',
      role: 'Manager of AI contributors',
      aiRole: 'Contributor owning assigned work',
      humans: 'Setting the outcome, reviewing the result and deciding what happens next.',
      aiTakes: 'The multi-step legwork: research, gathering, analysis and the first full deliverable.'
    },
    {
      short: 'Agentic teams',
      name: 'Agentic Teams Executing Business Processes',
      anchor: 'Copilot Studio',
      tag: 'Agent teams execute business processes while humans govern.',
      desc: 'Multiple agents coordinate work autonomously. Humans define goals, policies, approvals, and governance.',
      assists: ['Orchestration', 'Tool use across systems', 'Exception handling', 'Continuous monitoring'],
      what: 'Specialized agents, coordinated by an orchestrator, run a business process end to end inside policy guardrails, and hand off to people for exceptions and approvals.',
      owner: 'Agents execute the steps. Humans own goals, policies, exceptions, and accountability.',
      participates: 'Orchestration, actions across systems, decisions within defined thresholds, escalation to people, and continuous monitoring.',
      uses: [
        'Clinical trial operations: site start-up, enrollment tracking and trial master file completeness, with study team oversight',
        'Quality and regulatory operations: deviations, CAPA, submissions and commitments',
        'Safety and complaint intake, triage and routing, with trained staff deciding',
        'HR service and onboarding agents',
        'Finance operations: reconciliations and close support',
        'Legal assist and compliance triage'
      ],
      tech: ['Copilot Studio', 'Multi-agent orchestration', 'Microsoft Foundry', 'Power Automate', 'Dataverse', 'Microsoft Entra', 'Microsoft Purview', 'Microsoft Defender', 'Agent governance and identity'],
      value: 'Process-level redesign: shorter cycle times, higher service levels, extended coverage, and people redeployed to higher-value work. Requires governance maturity.',
      role: 'Governor of agent teams',
      aiRole: 'Agent team running the process',
      humans: 'Goals, policy, approvals and the exceptions that need real expertise.',
      aiTakes: 'Routine coordination across systems: intake, routing, status chasing and handoffs.'
    },
    {
      short: 'In the app',
      name: 'AI Inside Business Applications',
      anchor: 'Dynamics 365, Power Platform',
      tag: 'AI helps users inside the systems they already use.',
      desc: 'Users interact with business applications. AI enhances workflows, recommendations, insights, and automation directly inside the application experience.',
      assists: ['Recommendations', 'Insights', 'Automation', 'Predictions'],
      what: 'AI capabilities built directly into line-of-business and life sciences applications, so intelligence appears on the screen where the work already happens.',
      owner: 'The application user and the process owner. The application defines the workflow.',
      participates: 'Inside the application: suggestions, predictions, auto-completion, anomaly flags, and automated steps.',
      uses: [
        'Case summaries and suggested replies in Dynamics 365 Customer Service',
        'Predictive work orders and scheduling in Field Service',
        'Natural-language insight in Power BI',
        'Low-code apps with AI actions in Power Apps',
        'Exception handling in ERP and finance workflows'
      ],
      tech: ['Dynamics 365', 'Power Apps', 'Power BI', 'Power Automate', 'AI Builder'],
      value: 'Fast time to value with limited change management, because people stay in familiar tools. Better consistency, fewer clicks, and cleaner data.',
      role: 'Application user',
      aiRole: 'Intelligence inside the app',
      humans: 'The work on screen, with scientific, quality and business judgment at the decision.',
      aiTakes: 'Data entry, summaries, suggestions and clean-up inside the application.'
    },
    {
      short: 'Custom build',
      name: 'Custom AI Built by Professional Developers',
      anchor: 'GitHub Copilot, Microsoft Foundry, Visual Studio Code',
      filterName: 'GitHub Copilot, Microsoft Foundry',
      tag: 'Developers build what off-the-shelf products do not cover.',
      desc: 'Professional developers use code-first Microsoft tools to build custom AI applications and agents, and to modernize the software behind them.',
      assists: ['Coding', 'Debugging', 'Testing', 'Modernization', 'Retrieval and grounding', 'Safety controls'],
      what: 'AI solutions engineered in code: GitHub Copilot speeds the build, and Microsoft Foundry, search, MCP and safety services run the solution.',
      owner: 'The engineering team owns design, testing, security and operations. Business owners set requirements and accept the result.',
      participates: 'In the developer\u2019s workflow, writing and testing code, and inside the finished solution as models, agents and retrieval.',
      uses: [
        'Modernizing older lab, manufacturing and interface code',
        'SOP, guideline and regulatory assistants with cited answers',
        'Multi-agent apps across clinical, quality, supply and commercial systems, with approval gates',
        'Controlled agent access to Azure resources through MCP',
        'Safety checks on patient-facing and customer-facing AI apps',
        'Model evaluation and validation on de-identified or synthetic samples'
      ],
      tech: ['GitHub Copilot', 'Microsoft Foundry', 'VS Code', 'Azure MCP Server', 'Azure AI Search', 'Foundry Models', 'Semantic Kernel', 'Agent Framework', 'AI Toolkit', 'Content Safety'],
      value: 'Fit and control over experience, logic, data and IP, at enterprise scale. The trade-off is engineering effort and long-term ownership.',
      role: 'Builder and owner of the solution',
      aiRole: 'Developer assistant, and the engine inside the custom solution',
      humans: 'Architecture, security, testing, release, and accountability for the running solution.',
      aiTakes: 'Code generation, tests, refactoring, retrieval, and the model and agent work inside the finished application.'
    }
  ];

  /* Lines of business come from lobs.js (window.HAIN_LOBS). */
  const LOBS = window.HAIN_LOBS;

  /* ------------------------------------------------------------------ */
  /* Metaphor graphics                                                  */
  /* ------------------------------------------------------------------ */

  const METAPHORS = [
    `<svg class="mt" viewBox="0 0 200 130" aria-hidden="true">
      <circle class="m-ring" cx="100" cy="65" r="48"/>
      <g class="orbit">
        <circle class="m-soft" cx="148" cy="65" r="8"/><circle class="m-soft" cx="100" cy="113" r="8"/>
        <circle class="m-soft" cx="52" cy="65" r="8"/><circle class="m-soft" cx="100" cy="17" r="8"/>
        <circle class="m-body" cx="148" cy="65" r="2.6"/><circle class="m-body" cx="100" cy="113" r="2.6"/>
        <circle class="m-body" cx="52" cy="65" r="2.6"/><circle class="m-body" cx="100" cy="17" r="2.6"/>
      </g>
      <circle class="m-body" cx="100" cy="55" r="12"/>
      <path class="m-body" d="M76 96 Q100 64 124 96 Z"/>
    </svg>`,
    `<svg class="mt" viewBox="0 0 200 130" aria-hidden="true">
      <circle class="m-body" cx="100" cy="22" r="10"/>
      <path class="m-body" d="M82 52 Q100 26 118 52 Z"/>
      <path class="m-flow" d="M100 54 L100 74 M100 74 L44 84 M100 74 L156 84 M100 74 L100 84"/>
      <rect class="m-soft" x="22" y="84" width="44" height="30" rx="8"/>
      <rect class="m-soft" x="78" y="84" width="44" height="30" rx="8"/>
      <rect class="m-soft" x="134" y="84" width="44" height="30" rx="8"/>
      <path class="m-line" d="M32 94 H56 M32 101 H50 M88 94 H112 M88 101 H106 M144 94 H168 M144 101 H162"/>
      <circle class="m-node" cx="62" cy="88" r="3"/><circle class="m-node" cx="118" cy="88" r="3"/><circle class="m-node" cx="174" cy="88" r="3"/>
    </svg>`,
    `<svg class="mt" viewBox="0 0 200 130" aria-hidden="true">
      <circle class="m-ring" cx="100" cy="65" r="58"/>
      <g class="orbit slow">
        <path class="m-flow" d="M100 65 L144 65 M100 65 L122 103 M100 65 L78 103 M100 65 L56 65 M100 65 L78 27 M100 65 L122 27"/>
        <circle class="m-soft" cx="144" cy="65" r="8"/><circle class="m-soft" cx="122" cy="103" r="8"/><circle class="m-soft" cx="78" cy="103" r="8"/>
        <circle class="m-soft" cx="56" cy="65" r="8"/><circle class="m-soft" cx="78" cy="27" r="8"/><circle class="m-soft" cx="122" cy="27" r="8"/>
      </g>
      <polygon class="m-body" points="100,46 116,55.5 116,74.5 100,84 84,74.5 84,55.5"/>
      <circle cx="100" cy="65" r="5" fill="var(--bg)"/>
    </svg>`,
    `<svg class="mt" viewBox="0 0 200 130" aria-hidden="true">
      <rect class="m-frame" x="12" y="10" width="176" height="110" rx="14"/>
      <circle class="m-dot" cx="27" cy="23" r="3"/><circle class="m-dot" cx="38" cy="23" r="3"/><circle class="m-dot" cx="49" cy="23" r="3"/>
      <line class="m-line" x1="12" y1="35" x2="188" y2="35" opacity=".35"/>
      <path class="m-flow" d="M48 72 L100 56 L152 78 L128 102 L76 100 Z"/>
      <path class="m-line" d="M48 72 L76 100 M100 56 L128 102 M152 78 L76 100" opacity=".4"/>
      <circle class="m-node" cx="48" cy="72" r="5"/><circle class="m-node" cx="100" cy="56" r="7"/>
      <circle class="m-node" cx="152" cy="78" r="5"/><circle class="m-node" cx="128" cy="102" r="5"/><circle class="m-node" cx="76" cy="100" r="5"/>
    </svg>`,
    `<svg class="mt" viewBox="0 0 200 130" aria-hidden="true">
      <rect class="m-frame" x="12" y="10" width="176" height="110" rx="14"/>
      <circle class="m-dot" cx="27" cy="23" r="3"/><circle class="m-dot" cx="38" cy="23" r="3"/><circle class="m-dot" cx="49" cy="23" r="3"/>
      <line class="m-line" x1="12" y1="35" x2="188" y2="35" opacity=".35"/>
      <path class="m-flow" d="M72 52 L52 68 L72 84 M128 52 L148 68 L128 84 M110 50 L90 86"/>
      <rect class="m-soft" x="28" y="96" width="36" height="14" rx="5"/><rect class="m-soft" x="82" y="96" width="36" height="14" rx="5"/><rect class="m-soft" x="136" y="96" width="36" height="14" rx="5"/>
      <circle class="m-node" cx="46" cy="103" r="3.2"/><circle class="m-node" cx="100" cy="103" r="3.2"/><circle class="m-node" cx="154" cy="103" r="3.2"/>
    </svg>`
  ];

  /* ------------------------------------------------------------------ */
  /* Helpers                                                            */
  /* ------------------------------------------------------------------ */

  /* ------------------------------------------------------------------ */
  /* Theme                                                              */
  /* ------------------------------------------------------------------ */

  const root = document.documentElement;
  const themeBtn = $('#themeToggle');
  function applyThemeUI() {
    const dark = root.getAttribute('data-theme') === 'dark';
    themeBtn.setAttribute('aria-pressed', String(dark));
    themeBtn.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    $('#themeLabel').textContent = dark ? 'Light' : 'Dark';
    const tc = document.querySelector('meta[name="theme-color"]');
    if (tc) tc.setAttribute('content', dark ? '#070b16' : '#f2f5fc');
  }
  themeBtn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('hain-theme', next); } catch (e) {}
    applyThemeUI();
  });
  applyThemeUI();

  /* ------------------------------------------------------------------ */
  /* Journey (stages)                                                   */
  /* ------------------------------------------------------------------ */

  const stagesEl = $('#stages');
  const railNodesEl = $('#railNodes');
  let activeStage = 0;

  function buildStages() {
    stagesEl.innerHTML = STAGES.map((s, i) => `
      <article class="stage s${i + 1}" data-i="${i}">
        <div class="stage-top">
          <span class="stage-num">Pattern ${i + 1}</span>
        </div>
        <h3 class="stage-title"><button type="button" aria-expanded="false" aria-controls="stage-more-${i}">${s.name}</button></h3>
        <p class="anchor">${s.anchor}</p>
        <p class="tagline">${s.tag}</p>
        <div class="metaphor">${METAPHORS[i]}</div>
        <div class="stage-more" id="stage-more-${i}" role="region" aria-label="${s.name} details">
          <div class="stage-more-in">
            <p class="desc">${s.desc}</p>
            <div class="shift-strip" aria-label="How the work shifts">
              <p class="ss-h"><span>People focus on</span>${s.humans}</p>
              <p class="ss-a"><span>AI takes on</span>${s.aiTakes}</p>
            </div>
            <ul class="assists" aria-label="AI helps with">${s.assists.map(a => `<li>${a}</li>`).join('')}</ul>
            <div class="details">
              <section class="detail"><h4>What it is</h4><p>${s.what}</p></section>
              <section class="detail"><h4>Who owns the work</h4><p>${s.owner}</p></section>
              <section class="detail"><h4>Where AI participates</h4><p>${s.participates}</p></section>
              <section class="detail"><h4>Expected business value</h4><p>${s.value}</p></section>
              <section class="detail uses"><h4>Typical life sciences use cases</h4><ul>${s.uses.map(u => `<li>${u}</li>`).join('')}</ul></section>
              <section class="detail tech"><h4>Technologies involved</h4><div class="chips">${s.tech.map(techChip).join('')}</div></section>
            </div>
          </div>
        </div>
        <p class="hint" aria-hidden="true"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg><span>Explore this pattern</span></p>
      </article>`).join('');

    railNodesEl.innerHTML = STAGES.map((s, i) => `
      <button type="button" class="rail-node s${i + 1}" style="left:${(i / (STAGES.length - 1)) * 100}%" data-i="${i}" aria-label="Pattern ${i + 1}: ${s.short}">${i + 1}<small>${s.short}</small></button>`).join('');
  }

  function setActive(i) {
    activeStage = i;
    $$('.stage', stagesEl).forEach((el, idx) => {
      const on = idx === i;
      el.classList.toggle('active', on);
      $('.stage-title button', el).setAttribute('aria-expanded', String(on));
    });
    $$('.rail-node', railNodesEl).forEach((el, idx) => {
      if (idx === i) el.setAttribute('aria-current', 'true'); else el.removeAttribute('aria-current');
    });
    $('#railFill').style.clipPath = `inset(0 ${100 - (i / (STAGES.length - 1)) * 100}% 0 0)`;
  }

  function wireStages() {
    let hoverTimer;
    $$('.stage', stagesEl).forEach((el) => {
      const i = Number(el.dataset.i);
      el.addEventListener('pointerenter', (e) => {
        if (e.pointerType !== 'mouse' || !wideMQ.matches) return;
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(() => setActive(i), 90);
      });
      el.addEventListener('pointerleave', () => clearTimeout(hoverTimer));
      $('.stage-title button', el).addEventListener('click', () => {
        setActive(i);
        if (!wideMQ.matches) setTimeout(() => el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' }), 80);
      });
      $('.stage-title button', el).addEventListener('focus', () => setActive(i));
    });
    $$('.rail-node', railNodesEl).forEach((btn) => {
      btn.addEventListener('click', () => setActive(Number(btn.dataset.i)));
    });
    $('#rail').addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      const next = Math.max(0, Math.min(STAGES.length - 1, activeStage + (e.key === 'ArrowRight' ? 1 : -1)));
      setActive(next);
      $$('.rail-node', railNodesEl)[next].focus();
    });
  }

  /* ------------------------------------------------------------------ */
  /* Use case explorer                                                  */
  /* ------------------------------------------------------------------ */

  const PAGE_SIZE = 30;
  const AUD_LABEL = { all: 'All audiences', pharma: 'Biopharma', medtech: 'MedTech' };
  const TRACK_LABEL = { pharma: 'Biopharma', medtech: 'MedTech', both: 'Biopharma and MedTech' };
  const GROUPS = [
    { key: 'b', label: 'Shared across life sciences' },
    { key: 'p', label: 'Biopharma' },
    { key: 'y', label: 'MedTech' }
  ];
  const PRODUCT_TERMS = ['Microsoft 365 Copilot', 'Copilot Cowork', 'Dragon Copilot', 'Dynamics 365', 'Power BI', 'Power Apps', 'Power Automate', 'Power Platform', 'Copilot Studio', 'Field Service', 'Customer Service', 'Contact Center', 'Customer Insights', 'Dataverse'];

  const esc = (t) => String(t == null ? '' : t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const lobOrder = new Map(LOBS.map((l, i) => [l.id, i]));
  const lobById = new Map(LOBS.map((l) => [l.id, l]));
  const lobTrack = (l) => (l.t === 'p' ? 'pharma' : l.t === 'y' ? 'medtech' : 'both');

  const COWORK_LOB = {
    LS: { EXE: 'exec', FIN: 'finance', HR: 'hr', LEG: 'legal', IT: 'it', SCM: 'supply', GRO: 'growth', PMO: 'pmo', MFG: 'mfg', FAC: 'facilities', PER: 'personal' },
    BIO: { RD: 'rd', CLD: 'clindev', RWE: 'rwe', REG: 'reg', PV: 'pv', MED: 'medaff', ACC: 'access' },
    MED: { DEV: 'mtdev', REG: 'mtreg', PMS: 'postmkt', SVC: 'fieldsvc', HOS: 'hospcust' }
  };
  const COWORK_TRACK = { LS: 'both', BIO: 'pharma', MED: 'medtech' };

  function buildUseCases() {
    const list = [];
    const cowork = window.HAIN_COWORK || [];
    const haveCowork = new Set();

    cowork.forEach((c) => {
      const [track, code] = c[0].split('-');
      const lob = COWORK_LOB[track] && COWORK_LOB[track][code];
      if (!lob) return;
      const tr = COWORK_TRACK[track];
      (tr === 'both' ? ['pharma', 'medtech'] : [tr]).forEach((t) => haveCowork.add(lob + '|' + t));
      list.push({
        id: c[0], p: 1, lob, lobs: [lob].concat((c[8] || []).filter((id) => lobById.has(id) && id !== lob)), track: tr, kind: 'cowork',
        title: c[2], sub: c[3], desc: c[4], output: c[5], review: c[6],
        tools: ['Copilot Cowork'], src: c[7] || 'Cowork library \u00B7 ' + c[0], guideIm: c[9] || null
      });
    });

    (window.HAIN_CATALOG || []).forEach((c) => {
      const lobs = c[6].filter((id) => lobById.has(id));
      if (!lobs.length) return;
      const tracks = new Set(lobs.map((id) => lobTrack(lobById.get(id))));
      const tr = tracks.has('both') || (tracks.has('pharma') && tracks.has('medtech')) ? 'both' : [...tracks][0];
      list.push({
        id: c[0], p: c[7] == null ? 3 : c[7], lob: lobs[0], lobs, track: tr, kind: 'catalog',
        title: c[4], sub: c[1] + ' \u00B7 ' + c[2] + (c[3] ? ' \u00B7 ' + c[3] : ''), desc: c[5],
        status: c[3], tools: [c[1]].concat(c[8] || []), src: c[9] || 'Business Apps catalog', guideIm: c[10] || null
      });
    });

    LOBS.forEach((l) => {
      const tr = lobTrack(l);
      const tracks = tr === 'both' ? ['pharma', 'medtech'] : [tr];
      const sharedNote = 'Illustrative overview';

      list.push({
        id: l.id + '-p1', p: 0, lob: l.id, track: tr, kind: 'overview',
        title: l.name, sub: 'Humans working with AI assistants', desc: l.l[0],
        tools: ['Microsoft 365 Copilot'], src: sharedNote
      });

      tracks.forEach((t) => {
        if (haveCowork.has(l.id + '|' + t)) return;
        list.push({
          id: l.id + '-p2-' + t, p: 1, lob: l.id, track: t, kind: 'overview',
          title: l.name, sub: 'Humans delegating to AI teammates', desc: l.l[1],
          tools: ['Copilot Cowork'], src: sharedNote
        });
      });

      list.push({
        id: l.id + '-p3', p: 2, lob: l.id, track: tr, kind: 'overview',
        title: l.name, sub: 'Agentic teams executing business processes', desc: l.l[2],
        agents: l.ag, tools: ['Copilot Studio'], src: sharedNote
      });

      const apps = PRODUCT_TERMS.filter((t) => l.l[3].indexOf(t) !== -1);
      list.push({
        id: l.id + '-p4', p: 3, lob: l.id, track: tr, kind: 'overview',
        title: l.name, sub: 'AI inside business applications', desc: l.l[3],
        tools: apps.length ? apps : ['Dynamics 365', 'Power Platform'], src: sharedNote
      });
    });

    list.forEach((u) => { if (!u.lobs) u.lobs = [u.lob]; });
    return list.map((u, i) => Object.assign(u, { seq: i }))
      .sort((a, b) => a.p - b.p || lobOrder.get(a.lob) - lobOrder.get(b.lob) || a.seq - b.seq);
  }


  const IMPACTS = [
    { k: 'capture', label: 'Capture revenue', icon: '\uD83D\uDCC8', def: 'Revenue captured or protected, including faster launches and time to market.', haven: '' },
    { k: 'cash', label: 'Accelerate cash', icon: '\uD83D\uDCB5', def: 'Faster collections, lower working capital, fewer rebate and chargeback leaks.', haven: '' },
    { k: 'cost', label: 'Reduce cost', icon: '\u2702\uFE0F', def: 'Labor and non-labor savings.', haven: '' },
    { k: 'risk', label: 'Reduce risk', icon: '\uD83D\uDEE1\uFE0F', def: 'Audit, patient safety, product quality, and compliance.', haven: '' },
    { k: 'experience', label: 'Improve experience', icon: '\uD83D\uDE4C', def: 'Patient, customer, and staff experience.', haven: '' },
    { k: 'capacity', label: 'Improve capacity', icon: '\u26A1', def: 'Throughput, cycle time, and capacity.', haven: '' }
  ];
  const IMPACT_BY_KEY = new Map(IMPACTS.map((i) => [i.k, i]));

  const LOB_IMPACT = {
    exec: ['capacity', 'cost'], finance: ['cost', 'cash'], hr: ['cost', 'experience'], legal: ['risk', 'cost'], it: ['cost', 'risk'],
    supply: ['cost', 'risk'], growth: ['capture', 'experience'], pmo: ['capacity', 'cost'], mfg: ['risk', 'capacity'], facilities: ['cost', 'risk'],
    personal: ['capacity'], rd: ['capacity', 'capture'], clindev: ['capacity', 'capture'], rwe: ['capacity', 'capture'], reg: ['risk', 'capacity'],
    pv: ['risk', 'capacity'], medaff: ['capacity', 'experience'], access: ['experience', 'capture'], mtdev: ['risk', 'capacity'],
    mtreg: ['risk', 'capacity'], postmkt: ['risk', 'capacity'], fieldsvc: ['cost', 'experience'], hospcust: ['capture', 'experience']
  };

  const IMPACT_RULES = {
    capture: /revenue|launch|time to market|reimburs|access|growth|contract|pricing|sales|renewal|tender|enrol|acquisition|market|leakage|capture|conversion|retain|opportunit|prescrib|account plan|pipeline/gi,
    cash: /collection|a\/r|receivable|cash|payment|remit|rebate|chargeback|gross-to-net|invoice|reconcil|overpay|recover|accrual/gi,
    cost: /cost|spend|procure|vendor|supply|inventory|accounts payable|schedul|staffing|labor|overtime|agency|contact center|intake|fax|manual|handle time|self-service|maintenance|license|savings|efficien|consolidat/gi,
    risk: /compliance|audit|inspection|gxp|safety|policy|regulat|risk|legal|privacy|hipaa|gdpr|fraud|credential|incident|quality|capa|deviation|complaint|recall|security|governance|surveillance|monitor|adverse|validation|excursion/gi,
    experience: /experience|wellbeing|well-being|engagement|satisfaction|coach|front door|support program|navigation|empath|plain.language|self-service|customer/gi,
    capacity: /throughput|capacity|cycle time|start-up|enrollment|turnaround|backlog|queue|triage|scheduling|handoff|wait time|documentation burden|status|tracking|drafting/gi
  };

  const AGENT_IMPACT = {
    'pre-call planning & account briefing agent': ['capture'], 'launch readiness tracker agent': ['capture'], 'tender & contract response agent': ['capture'],
    'gross-to-net & rebate reconciliation agent': ['cash'], 'clinical trial cost & accrual agent': ['cost'], 'supply shortage & allocation agent': ['risk', 'cost'],
    'cold chain excursion triage agent': ['risk'], 'adverse event intake & triage agent': ['risk'], 'complaint intake & reportability triage agent': ['risk'],
    'deviation intake & investigation support agent': ['risk'], 'capa tracking & effectiveness agent': ['risk'], 'batch record review assistant': ['capacity'],
    'trial master file completeness agent': ['risk'], 'study start-up tracking agent': ['capacity'], 'site feasibility & selection agent': ['capacity'],
    'service dispatch & scheduling agent': ['cost', 'experience'], 'patient support hub virtual agent': ['experience'], 'payer policy monitoring agent': ['capture']
  };

  function tagImpacts(u) {
    if (u.guideIm && u.guideIm.length) {
      u.im = IMPACTS.map((i) => i.k).filter((k) => u.guideIm.indexOf(k) !== -1);
      u.imNamed = true;
      return;
    }
    const text = [u.title, u.sub, u.desc, u.output].join(' ');
    const prior = [].concat(...u.lobs.map((id) => LOB_IMPACT[id] || ['capacity']));
    const score = {};
    IMPACTS.forEach((i) => {
      const m = text.match(IMPACT_RULES[i.k]);
      score[i.k] = (m ? m.length : 0) * 2;
    });
    prior.forEach((k, idx) => { score[k] += idx === 0 ? 3 : 1; });
    const named = new Set();
    (u.agents || []).forEach((a) => (AGENT_IMPACT[a.n.toLowerCase()] || []).forEach((k) => named.add(k)));
    const ranked = IMPACTS.map((i) => i.k).filter((k) => score[k] > 0).sort((a, b) => score[b] - score[a]);
    const out = new Set(named);
    ranked.slice(0, 2).forEach((k, idx) => { if (idx === 0 || score[k] >= 3) out.add(k); });
    u.im = IMPACTS.map((i) => i.k).filter((k) => out.has(k));
    u.imNamed = named.size > 0;
  }

  const USE_CASES = buildUseCases();
  const PRODUCT_PATTERN = { 'Microsoft 365 Copilot': 0, 'Dragon Copilot': 0, 'Copilot Cowork': 1, 'Microsoft Autopilot': 1, 'Copilot Studio': 2, 'GitHub Copilot': 4, 'Microsoft developer tools': 4, 'Microsoft Foundry': 4, 'Visual Studio Code': 4, 'Azure MCP Server': 4, 'Azure AI Search': 4, 'Azure OpenAI and Foundry Models': 4, 'Semantic Kernel': 4, 'Microsoft Agent Framework': 4, 'AI Toolkit for VS Code': 4, 'Azure AI Content Safety': 4 };
  const SUPPORTING_PRODUCTS = ['Power Automate', 'Dataverse'];
  const patternOfProduct = (name) => (name in PRODUCT_PATTERN ? PRODUCT_PATTERN[name] : SUPPORTING_PRODUCTS.indexOf(name) !== -1 ? -1 : 3);
  USE_CASES.forEach((u) => {
    const text = [u.desc, u.output, (u.agents || []).map((a) => a.n + ' ' + (a.d || '')).join(' ')].join(' ');
    const products = u.tools.slice();
    PRODUCT_TERMS.filter((term) => term !== 'Contact Center' && term !== 'Customer Service').forEach((term) => { if (text.indexOf(term) !== -1 && !products.some((p) => p.indexOf(term) !== -1)) products.push(term); });
    u.tools = products;
    u.ps = [u.p].concat(products.map(patternOfProduct).filter((n) => n !== u.p && n >= 0)).filter((n, i, a) => a.indexOf(n) === i).sort((a, b) => a - b);
    tagImpacts(u);
    u.hay = [u.title, u.sub, u.desc, u.output, u.review, u.lobs.map((id) => lobById.get(id).name).join(' '), (u.agents || []).map((a) => a.n).join(' '), u.im.map((k) => IMPACT_BY_KEY.get(k).label).join(' ')].join(' ').toLowerCase();
  });

  const ex = { aud: 'all', pats: new Set(), ims: new Set(), lob: 'all', q: '', shown: PAGE_SIZE };
  const imEl = $('#impactFilter');
  const lobListEl = $('#domainTabs');
  const lobSelectEl = $('#lobSelect');
  const audEl = $('#trackFilter');
  const patEl = $('#patFilter');
  const gridEl = $('#ucGrid');
  const scrollEl = $('#ucScroll');
  const moreBtn = $('#moreBtn');
  const searchEl = $('#ucSearch');

  const audOk = (u) => ex.aud === 'all' || u.track === 'both' || u.track === ex.aud;
  const patOk = (u) => ex.pats.size === 0 || u.ps.some((n) => ex.pats.has(n));
  const dispPat = (u) => (ex.pats.size === 0 || ex.pats.has(u.p) ? u.p : u.ps.find((n) => ex.pats.has(n)));
  const qOk = (u) => !ex.q || ex.q.split(/\s+/).every((w) => u.hay.indexOf(w) !== -1);
  const lobOk = (u) => ex.lob === 'all' || u.lobs.indexOf(ex.lob) !== -1;
  const imOk = (u) => ex.ims.size === 0 || u.im.some((k) => ex.ims.has(k));

  function agentsFor(u) {
    return (u.agents || []).filter((a) => a.t === 'both' || ex.aud === 'all' || a.t === ex.aud);
  }

  function renderPatternChips() {
    const base = USE_CASES.filter((u) => audOk(u) && lobOk(u) && qOk(u) && imOk(u));
    patEl.innerHTML = STAGES.map((s, i) => {
      const n = base.filter((u) => u.ps.indexOf(i) !== -1).length;
      return `<button type="button" class="pat-chip s${i + 1}" data-p="${i}" aria-pressed="${ex.pats.has(i)}" aria-label="Pattern ${i + 1}: ${esc(s.filterName || s.anchor)}. ${n} use cases">
        <span class="pc-top"><b>Pattern ${i + 1}</b><em>${n}</em></span>
        <strong>${esc(s.filterName || s.anchor)}</strong>
        <i class="pc-check" aria-hidden="true"></i>
      </button>`;
    }).join('');
  }

  function renderImpactChips() {
    const base = USE_CASES.filter((u) => audOk(u) && patOk(u) && lobOk(u) && qOk(u));
    imEl.innerHTML = IMPACTS.map((i) => {
      const n = base.filter((u) => u.im.indexOf(i.k) !== -1).length;
      const tip = i.def + (i.haven ? ' ' + i.haven + '.' : '');
      return `<button type="button" class="im-chip" data-k="${i.k}" aria-pressed="${ex.ims.has(i.k)}" title="${esc(tip)}" aria-label="${esc(i.label)}. ${esc(tip)} ${n} use cases">
        <span class="im-ico" aria-hidden="true">${i.icon}</span><span class="im-nm">${esc(i.label)}</span><em>${n}</em>
      </button>`;
    }).join('');
  }

  function renderLobs() {
    const base = USE_CASES.filter((u) => audOk(u) && patOk(u) && qOk(u) && imOk(u));
    const counts = new Map();
    base.forEach((u) => u.lobs.forEach((id) => counts.set(id, (counts.get(id) || 0) + 1)));
    const visible = LOBS.filter((l) => counts.get(l.id) || l.id === ex.lob);
    const row = (id, icon, name, n) => `
      <button type="button" class="domain-tab" role="radio" data-id="${id}" aria-checked="${ex.lob === id}" tabindex="${ex.lob === id ? 0 : -1}">
        <span class="ico" aria-hidden="true">${icon}</span><span class="nm">${esc(name)}</span><span class="n">${n}</span>
      </button>`;
    let html = row('all', '\u2728', 'All lines of business', base.length);
    GROUPS.forEach((g) => {
      const items = visible.filter((l) => l.t === g.key);
      if (!items.length) return;
      html += `<p class="dg-label" role="presentation">${g.label}</p>` + items.map((l) => row(l.id, l.icon, l.name, counts.get(l.id) || 0)).join('');
    });
    lobListEl.innerHTML = html;
    lobSelectEl.innerHTML = `<option value="all">All lines of business (${base.length})</option>` + GROUPS.map((g) => {
      const items = visible.filter((l) => l.t === g.key);
      return items.length ? `<optgroup label="${g.label}">${items.map((l) => `<option value="${l.id}">${esc(l.name)} (${counts.get(l.id) || 0})</option>`).join('')}</optgroup>` : '';
    }).join('');
    lobSelectEl.value = ex.lob;
    $('#domainCount').textContent = `${visible.length} shown`;
  }

  function cardHTML(u) {
    const lobNames = u.lobs.map((id) => lobById.get(id).name);
    const lobLabel = lobNames.length > 2 ? lobNames.slice(0, 2).join(', ') + ' +' + (lobNames.length - 2) : lobNames.join(', ');
    const agents = agentsFor(u);
    const d = dispPat(u);
    const extra = u.ps.filter((n) => n !== d);
    const trackTag = ex.aud === 'all' ? `<span class="uc-track tr-${u.track}">${TRACK_LABEL[u.track]}</span>` : '';
    return `
      <article class="uc s${d + 1}">
        <div class="uc-top"><span class="uc-pat">Pattern ${d + 1} \u00B7 ${esc(STAGES[d].short)}</span>${trackTag}</div>
        ${extra.length ? `<p class="uc-also">Also fits ${extra.map((n) => `<b class="s${n + 1}">Pattern ${n + 1}</b>`).join(' ')}</p>` : ''}
        <h4>${esc(u.title)}</h4>
        <p class="uc-sub">${esc(u.sub)}${ex.lob === 'all' && u.kind !== 'overview' ? ` <span class="uc-lob">\u00B7 ${esc(lobLabel)}</span>` : ''}</p>
        <p class="uc-desc">${esc(u.desc)}</p>
        ${agents.length ? `<div class="uc-agents"><em>Example agent ideas</em><ul>${agents.map((a) => `<li><strong>${esc(a.n)}</strong>${a.d ? `<span>${esc(a.d)}</span>` : ''}</li>`).join('')}</ul></div>` : ''}
        ${u.output ? `<details class="uc-more"><summary>Output and human review</summary><p><b>Output.</b> ${esc(u.output)}</p><p><b>Human review.</b> ${esc(u.review)}</p></details>` : ''}
        <div class="uc-impact"><em>Impact</em>${u.im.map((k) => { const i = IMPACT_BY_KEY.get(k); return `<b class="${ex.ims.has(k) ? 'on' : ''}" title="${esc(i.def)}"><span aria-hidden="true">${i.icon}</span>${esc(i.label)}</b>`; }).join('')}</div>
        <div class="uc-foot"><span class="uc-tools"><em>Products</em>${u.tools.map((t) => `<i>${esc(t)}</i>`).join('')}</span><span class="uc-src${u.kind !== 'overview' ? ' sourced' : ''}">${esc(u.src)}</span></div>
      </article>`;
  }

  function summaryText(n) {
    const bits = [AUD_LABEL[ex.aud]];
    bits.push(ex.lob === 'all' ? 'All lines of business' : lobById.get(ex.lob).name);
    bits.push(ex.pats.size ? 'Pattern ' + [...ex.pats].sort().map((i) => i + 1).join(', ') : 'All patterns');
    if (ex.ims.size) bits.push(IMPACTS.filter((i) => ex.ims.has(i.k)).map((i) => i.label).join(' or '));
    if (ex.q) bits.push('\u201C' + ex.q + '\u201D');
    return bits.join(' \u00B7 ');
  }

  function renderResults(resetScroll) {
    const rows = USE_CASES.filter((u) => audOk(u) && patOk(u) && lobOk(u) && qOk(u) && imOk(u))
      .sort((a, b) => dispPat(a) - dispPat(b) || lobOrder.get(a.lob) - lobOrder.get(b.lob) || a.seq - b.seq);
    const shown = rows.slice(0, ex.shown);
    const patCounts = STAGES.map(() => 0);
    rows.forEach((u) => { patCounts[dispPat(u)] += 1; });
    const multi = patCounts.filter(Boolean).length > 1;
    let html = '';
    let prev = -1;
    shown.forEach((u) => {
      const d = dispPat(u);
      if (multi && d !== prev) {
        html += `<h3 class="uc-group s${d + 1}"><b>Pattern ${d + 1}</b><span>${esc(STAGES[d].name)}</span><em>${patCounts[d]} use case${patCounts[d] === 1 ? '' : 's'}</em></h3>`;
        prev = d;
      }
      html += cardHTML(u);
    });
    gridEl.innerHTML = rows.length ? html : `<div class="uc-empty"><p><strong>No use cases match these filters.</strong></p><p>Try a different line of business, or clear the search.</p><button type="button" class="btn small ghost" data-act="reset">Reset filters</button></div>`;
    moreBtn.hidden = shown.length >= rows.length;
    moreBtn.textContent = `Show ${Math.min(PAGE_SIZE, rows.length - shown.length)} more (${rows.length - shown.length} remaining)`;
    $('#resultCount').innerHTML = `<strong>${rows.length}</strong> use case${rows.length === 1 ? '' : 's'}`;
    $('#resultSummary').textContent = summaryText(rows.length);
    const dirty = ex.aud !== 'all' || ex.pats.size || ex.ims.size || ex.lob !== 'all' || ex.q;
    $('#clearFilters').hidden = !dirty;
    if (resetScroll) scrollEl.scrollTop = 0;
  }

  function refresh(opts = {}) {
    const keep = document.activeElement && document.activeElement.closest ? document.activeElement.closest('.domain-list') : null;
    const focusId = keep ? document.activeElement.dataset.id : null;
    renderPatternChips();
    renderImpactChips();
    renderLobs();
    renderResults(opts.resetScroll !== false);
    if (focusId) { const el = $('.domain-tab[data-id="' + focusId + '"]', lobListEl); if (el) el.focus(); }
    const active = $('.domain-tab[aria-checked="true"]', lobListEl);
    if (active && opts.reveal) active.scrollIntoView({ block: 'nearest' });
  }

  function resetFilters() {
    ex.aud = 'all'; ex.pats.clear(); ex.ims.clear(); ex.lob = 'all'; ex.q = ''; ex.shown = PAGE_SIZE;
    searchEl.value = '';
    $$('button', audEl).forEach((b) => b.setAttribute('aria-checked', String(b.dataset.track === 'all')));
    refresh();
  }

  function setAudience(next) {
    ex.aud = next; ex.shown = PAGE_SIZE;
    $$('button', audEl).forEach((b) => b.setAttribute('aria-checked', String(b.dataset.track === next)));
    const l = lobById.get(ex.lob);
    if (l && next !== 'all' && lobTrack(l) !== 'both' && lobTrack(l) !== next) ex.lob = 'all';
    refresh();
  }

  function buildExplorer() {
    audEl.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (b) setAudience(b.dataset.track);
    });
    patEl.addEventListener('click', (e) => {
      const b = e.target.closest('.pat-chip');
      if (!b) return;
      const p = Number(b.dataset.p);
      if (ex.pats.has(p)) ex.pats.delete(p); else ex.pats.add(p);
      ex.shown = PAGE_SIZE;
      refresh();
    });
    imEl.addEventListener('click', (e) => {
      const b = e.target.closest('.im-chip');
      if (!b) return;
      const k = b.dataset.k;
      if (ex.ims.has(k)) ex.ims.delete(k); else ex.ims.add(k);
      ex.shown = PAGE_SIZE;
      refresh();
    });
    lobListEl.addEventListener('click', (e) => {
      const b = e.target.closest('.domain-tab');
      if (!b) return;
      ex.lob = b.dataset.id; ex.shown = PAGE_SIZE;
      refresh();
    });
    lobListEl.addEventListener('keydown', (e) => {
      const keys = ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End'];
      if (!keys.includes(e.key)) return;
      e.preventDefault();
      const ids = $$('.domain-tab', lobListEl).map((t) => t.dataset.id);
      const idx = Math.max(0, ids.indexOf(ex.lob));
      let n = idx;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = Math.min(ids.length - 1, idx + 1);
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = Math.max(0, idx - 1);
      if (e.key === 'Home') n = 0;
      if (e.key === 'End') n = ids.length - 1;
      ex.lob = ids[n]; ex.shown = PAGE_SIZE;
      refresh();
      const el = $('.domain-tab[data-id="' + ids[n] + '"]', lobListEl);
      if (el) { el.focus(); el.scrollIntoView({ block: 'nearest' }); }
    });
    lobSelectEl.addEventListener('change', () => { ex.lob = lobSelectEl.value; ex.shown = PAGE_SIZE; refresh(); });
    let timer;
    searchEl.addEventListener('input', () => {
      clearTimeout(timer);
      timer = setTimeout(() => { ex.q = searchEl.value.trim().toLowerCase(); ex.shown = PAGE_SIZE; refresh(); }, 160);
    });
    moreBtn.addEventListener('click', () => { ex.shown += PAGE_SIZE; renderResults(false); });
    $('#clearFilters').addEventListener('click', resetFilters);
    $('#jumpFilters').addEventListener('click', () => {
      const f = $('.ex-filters');
      if (f) f.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      const q = $('#ucSearch');
      if (q) setTimeout(() => q.focus({ preventScroll: true }), reduceMotion ? 0 : 450);
    });
    gridEl.addEventListener('click', (e) => { if (e.target.closest('[data-act="reset"]')) resetFilters(); });
    refresh();
  }

  /* ------------------------------------------------------------------ */
  /* Takeaway ladder                                                    */
  /* ------------------------------------------------------------------ */


  /* ------------------------------------------------------------------ */
  /* Agentic teams                                                       */
  /* ------------------------------------------------------------------ */

  function buildTeams() {
    const listEl = $('#tmList');
    const selEl = $('#tmSelect');
    const panel = $('#tmPanel');
    const dlg = $('#tmDialog');
    if (!listEl || !panel) return;
    const TEAMS = window.HAIN_TEAMS || {};
    let current = TEAMS.clindev ? 'clindev' : LOBS[0].id;
    let variant = 0;
    const hasTeam = (id) => Object.prototype.hasOwnProperty.call(TEAMS, id);
    const teamsFor = (id) => (hasTeam(id) ? [].concat(TEAMS[id]) : []);
    const chips = (items) => `<div class="tm-chips">${items.map((x) => `<span>${esc(x)}</span>`).join('')}</div>`;

    function renderList() {
      const row = (l) => `
        <button type="button" class="domain-tab" role="radio" data-id="${l.id}" aria-checked="${l.id === current}" tabindex="${l.id === current ? 0 : -1}">
          <span class="ico" aria-hidden="true">${l.icon}</span><span class="nm">${esc(l.name)}</span>${hasTeam(l.id) ? '<span class="tm-badge" title="Agent team architecture available">Team</span>' : ''}
        </button>`;
      listEl.innerHTML = GROUPS.map((g) => {
        const items = LOBS.filter((l) => l.t === g.key);
        return items.length ? `<p class="dg-label" role="presentation">${g.label}</p>` + items.map(row).join('') : '';
      }).join('');
      selEl.innerHTML = GROUPS.map((g) => {
        const items = LOBS.filter((l) => l.t === g.key);
        return items.length ? `<optgroup label="${g.label}">${items.map((l) => `<option value="${l.id}">${esc(l.name)}${hasTeam(l.id) ? ' (team)' : ''}</option>`).join('')}</optgroup>` : '';
      }).join('');
      selEl.value = current;
      $('#tmCount').textContent = `${LOBS.length} lines`;
    }

    function howCards(lob, team) {
      const name = team ? team.assist.name : lob.name + ' Assist';
      const assistBody = team
        ? `<p>${esc(team.assist.line)}.</p><ol class="tm-steps">${team.assist.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol>
           <details class="tm-more"><summary>Intake and discovery before routing</summary><ul>${team.assist.intake.map((s) => `<li>${esc(s)}</li>`).join('')}</ul></details>`
        : `<p>People work with one assist agent. It understands the request, checks policy, routes the work to the right specialist agent, orchestrates the steps and returns a single answer.</p>`;
      const specBody = team
        ? team.agents.map((a) => `<details class="tm-agent"><summary>${esc(a[0])}</summary><ul>${a[1].map((s) => `<li>${esc(s)}</li>`).join('')}</ul></details>`).join('')
        : (lob.ag.length
          ? `<p>Example agents for this line of business. Each agent owns a domain task and works autonomously.</p>${chips(lob.ag.map((a) => a.n))}`
          : '<p>Specialist agents each own a domain task and work autonomously. The Explorer shows the use cases that could become agents.</p>');
      const sysBody = team
        ? `<p>Specialist agents work with the business operation systems your teams already use.</p>${chips(team.systems)}`
        : '<p>Specialist agents work inside the business operation systems your teams already use, through governed integrations, with every action logged.</p>';
      const humanBody = team
        ? `<p>Agents handle the routine coordination. People spend their time on approvals, exceptions and judgment calls that need real expertise, and the assist agent hands off with a case summary.</p>${chips(team.humans)}<h5>Governance control plane</h5>${chips(team.governance)}`
        : `<p>${esc(lob.name)} professionals approve actions, resolve exceptions and own outcomes. Agents hand off with a case summary when expertise or authority is needed.</p>`;
      return `
        <div class="tm-cards">
          <section class="tm-card s1"><span class="tm-num">1</span><h4>${esc(name)}</h4><p class="tm-role">Orchestrator agent</p>${assistBody}</section>
          <section class="tm-card s2"><span class="tm-num">2</span><h4>Specialist agents</h4><p class="tm-role">Autonomous domain agents</p>${specBody}</section>
          <section class="tm-card s3"><span class="tm-num">3</span><h4>Business systems</h4><p class="tm-role">Where the work happens</p>${sysBody}</section>
          <section class="tm-card s4"><span class="tm-num">4</span><h4>Humans in the loop</h4><p class="tm-role">Where expertise is concentrated</p>${humanBody}</section>
        </div>`;
    }

    function renderPanel() {
      const lob = LOBS.find((l) => l.id === current);
      const variants = teamsFor(current);
      const team = variants.length ? variants[Math.min(variant, variants.length - 1)] : null;
      let html;
      if (team) {
        const switcher = variants.length > 1
          ? `<div class="tm-variants" role="radiogroup" aria-label="Agent teams for ${esc(lob.name)}">${variants.map((v, i) => `<button type="button" role="radio" data-act="variant" data-i="${i}" aria-checked="${i === variant}">${esc(v.title)}</button>`).join('')}</div>`
          : '';
        html = `
          <header class="tm-ph"><p class="eyebrow">${esc(lob.name)}</p><h3>${esc(team.title)}</h3><p class="tm-sub">${esc(team.subtitle)}</p></header>
          ${switcher}
          ${team.image ? `<figure class="tm-fig">
            <button type="button" class="tm-zoom" data-act="zoom" aria-label="Enlarge the ${esc(team.title)} architecture diagram">
              <img src="${esc(team.image)}" alt="${esc(team.alt)}" width="${team.width}" height="${team.height}" loading="lazy" decoding="async">
              <span class="tm-zoom-hint" aria-hidden="true">${window.matchMedia('(pointer: coarse)').matches ? 'Tap' : 'Click'} to enlarge</span>
            </button>
          </figure>` : ''}
          ${howCards(lob, team)}
          <div class="tm-outcomes glass"><h4>Outcomes that matter</h4>${chips(team.outcomes)}</div>`;
      } else {
        html = `
          <header class="tm-ph"><p class="eyebrow">${esc(lob.name)}</p><h3>${esc(lob.name)} agentic team</h3></header>
          <div class="tm-empty glass"><p>The agentic team for this line of business is coming soon.</p></div>`;
      }
      panel.innerHTML = html;
      panel.scrollTop = 0;
    }

    function select(id, focus) {
      current = id;
      variant = 0;
      renderList();
      renderPanel();
      if (focus) { const el = $('.domain-tab[data-id="' + id + '"]', listEl); if (el) el.focus(); }
    }

    listEl.addEventListener('click', (e) => {
      const b = e.target.closest('.domain-tab');
      if (b) select(b.dataset.id);
    });
    listEl.addEventListener('keydown', (e) => {
      const keys = ['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft', 'Home', 'End'];
      if (!keys.includes(e.key)) return;
      e.preventDefault();
      const ids = $$('.domain-tab', listEl).map((t) => t.dataset.id);
      const idx = Math.max(0, ids.indexOf(current));
      let n = idx;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = Math.min(ids.length - 1, idx + 1);
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = Math.max(0, idx - 1);
      if (e.key === 'Home') n = 0;
      if (e.key === 'End') n = ids.length - 1;
      select(ids[n], true);
    });
    selEl.addEventListener('change', () => select(selEl.value));

    panel.addEventListener('click', (e) => {
      const vb = e.target.closest('[data-act="variant"]');
      if (vb) {
        variant = Number(vb.dataset.i);
        renderPanel();
        const k = panel.querySelector('.tm-variants button[aria-checked="true"]');
        if (k) k.focus();
        return;
      }
      const z = e.target.closest('[data-act="zoom"]');
      if (!z || !dlg || !dlg.showModal) return;
      const img = z.querySelector('img');
      const big = $('#tmDialogImg');
      big.src = img.src; big.alt = img.alt;
      dlg.showModal();
    });
    if (dlg) {
      $('#tmDialogClose').addEventListener('click', () => dlg.close());
      dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
    }

    renderList();
    renderPanel();
  }

  function buildLadder() {
    $('#tkChain').innerHTML = STAGES.map((s, i) => `<li class="s${i + 1}"><span class="dot" aria-hidden="true">${i + 1}</span>${s.short}</li>`).join('');
  }

  const RS_ICONS = {
    book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 21.5V5.5M8 7h8M8 11h6"/>',
    badge: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14.5L7 21l5-3 5 3-1.5-6.5M9.5 9l2 2 3-3.5"/>',
    spark: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
    cap: '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5M22 9v6"/>',
    hand: '<path d="M8 13V5.5a1.5 1.5 0 0 1 3 0V11M11 10V4a1.5 1.5 0 0 1 3 0v6M14 10V5.5a1.5 1.5 0 0 1 3 0V12M17 9.5a1.5 1.5 0 0 1 3 0V15a7 7 0 0 1-7 7h-1a7 7 0 0 1-5.6-2.8L3 14.5a1.6 1.6 0 0 1 2.5-2L8 15"/>',
    flask: '<path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2.2h12.4a1.5 1.5 0 0 0 1.3-2.2L14 9V3M7.5 15h9"/>',
    path: '<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5"/>',
    play: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10.5 9.5v5l4.2-2.5z"/>',
    rocket: '<path d="M5 15c-1.5 1.3-2 5-2 5s3.7-.5 5-2M14 4c3-1.5 6-1.5 6-1.5s0 3-1.5 6l-6 6-5-5z"/><circle cx="15" cy="9" r="1.4"/>'
  };

  function buildResources() {
    const data = window.HAIN_RESOURCES || [];
    const grid = $('#rsGrid');
    const input = $('#rsSearch');
    const count = $('#rsCount');
    const hay = data.map((r) => [r.title, r.kind, r.desc, r.inside.join(' '), r.kw].join(' ').toLowerCase());

    function render() {
      const q = input.value.trim().toLowerCase();
      const words = q ? q.split(/\s+/) : [];
      const list = data.filter((r, i) => words.every((w) => hay[i].indexOf(w) !== -1));
      count.textContent = list.length === data.length && !q ? data.length + ' resources' : list.length + ' of ' + data.length + ' resources';
      if (!list.length) {
        grid.innerHTML = '<div class="uc-empty"><b>No resources match your search.</b><span>Try a different word, or clear the search to see everything.</span><button type="button" class="btn ghost small" id="rsClear">Clear search</button></div>';
        $('#rsClear').addEventListener('click', () => { input.value = ''; render(); input.focus(); });
        return;
      }
      grid.innerHTML = list.map((r) => `
        <a class="rs-card" href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">
          <span class="rs-ico" aria-hidden="true"><svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${RS_ICONS[r.icon] || RS_ICONS.book}</svg></span>
          <span class="rs-body">
            <span class="rs-kind">${esc(r.kind)}</span>
            <b class="rs-title">${esc(r.title)}</b>
            <span class="rs-desc">${esc(r.desc)}</span>
          </span>
          <span class="rs-go">Open resource<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg><span class="sr-only"> (opens in a new tab)</span></span>
        </a>`).join('');
    }

    let timer;
    input.addEventListener('input', () => { clearTimeout(timer); timer = setTimeout(render, 120); });
    render();
  }

  /* ------------------------------------------------------------------ */
  /* Horizontal slides                                                  */
  /* ------------------------------------------------------------------ */

  function initSlides() {
    const main = $('#slides');
    const slides = $$('.screen', main);
    const ids = slides.map((el) => el.id);
    const navLinks = $$('.nav a');
    const dock = $('#dock');
    const prevBtn = $('#prevSlide');
    const nextBtn = $('#nextSlide');
    const bar = $('#progressBar');
    const status = $('#slideStatus');
    const last = slides.length - 1;
    /* Keep in sync with the "flow" media query in styles.css. */
    const flowMQ = window.matchMedia('(max-width: 760px), (pointer: coarse) and (max-width: 1099px), (pointer: coarse) and (max-height: 520px)');
    let flow = flowMQ.matches;
    let index = 0;
    let settle = 0;
    let lastWheelAt = 0;
    let wheelLock = 0;

    $('#dockDots').innerHTML = slides.map((el, i) => `
      <li><button type="button" class="dock-dot s${(i % 4) + 1}" data-i="${i}" title="${el.dataset.label}" aria-label="Go to slide ${i + 1} of ${slides.length}: ${el.dataset.label}">
        <i aria-hidden="true"></i><span class="dock-label">${el.dataset.label}</span>
      </button></li>`).join('');
    const dots = $$('.dock-dot', dock);

    const width = () => main.clientWidth || 1;
    const clamp = (i) => Math.max(0, Math.min(last, i));

    function reveal(el) {
      if (!el) return;
      $$('.reveal:not(.in)', el).forEach((node, k) => {
        node.style.transitionDelay = Math.min(k * 70, 350) + 'ms';
        node.classList.add('in');
      });
    }

    function setCurrent(i) {
      const changed = i !== index;
      index = i;
      slides.forEach((el, k) => { if (flow || k === i) el.removeAttribute('inert'); else el.setAttribute('inert', ''); });
      dots.forEach((d, k) => { if (k === i) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current'); });
      navLinks.forEach((a) => { if (a.getAttribute('href') === '#' + ids[i]) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
      const activeLink = navLinks.find((a) => a.getAttribute('aria-current') === 'true');
      const navBox = activeLink && activeLink.parentElement;
      if (navBox && navBox.scrollWidth > navBox.clientWidth) { const nb = navBox.getBoundingClientRect(); const ab = activeLink.getBoundingClientRect(); navBox.scrollTo({ left: navBox.scrollLeft + (ab.left - nb.left) - (nb.width - ab.width) / 2, behavior: reduceMotion ? 'auto' : 'smooth' }); }
      prevBtn.disabled = i === 0;
      nextBtn.disabled = i === last;
      dock.dataset.index = String(i);
      reveal(slides[i]);
      if (changed) {
        status.textContent = `Slide ${i + 1} of ${slides.length}: ${slides[i].dataset.label}`;
        try { history.replaceState(null, '', i === 0 ? location.pathname + location.search : '#' + ids[i]); } catch (e) {}
      }
    }

    function goTo(i, instant) {
      i = clamp(i);
      slides[i].removeAttribute('inert');
      setCurrent(i);
      if (flow) {
        window.scrollTo({ top: Math.max(0, slides[i].getBoundingClientRect().top + window.scrollY - (i === 0 ? 0 : $('.topbar').offsetHeight)), behavior: instant || reduceMotion ? 'auto' : 'smooth' });
        return;
      }
      main.scrollTo({ left: i * width(), behavior: instant || reduceMotion ? 'auto' : 'smooth' });
    }

    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const pos = main.scrollLeft / width();
        bar.style.width = (last > 0 ? Math.max(0, Math.min(1, pos / last)) * 100 : 0) + '%';
        reveal(slides[Math.floor(pos)]);
        reveal(slides[Math.ceil(pos)]);
        clearTimeout(settle);
        settle = setTimeout(() => setCurrent(clamp(Math.round(main.scrollLeft / width()))), 120);
      });
    }
    main.addEventListener('scroll', onScroll, { passive: true });

    let flowTicking = false;
    function onFlowScroll() {
      if (!flow || flowTicking) return;
      flowTicking = true;
      requestAnimationFrame(() => {
        flowTicking = false;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.width = (max > 0 ? Math.max(0, Math.min(1, window.scrollY / max)) * 100 : 0) + '%';
        const probe = window.innerHeight * 0.35;
        let cur = 0;
        slides.forEach((el, k) => { if (el.getBoundingClientRect().top <= probe) cur = k; });
        if (cur !== index) setCurrent(cur);
        const tt = $('#toTop');
        if (tt) tt.hidden = window.scrollY < window.innerHeight * 1.5;
      });
    }
    window.addEventListener('scroll', onFlowScroll, { passive: true });
    $('#toTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' }));

    function applyMode() {
      const was = flow;
      flow = flowMQ.matches;
      if (flow === was) return;
      if (flow) {
        slides.forEach((el) => { el.removeAttribute('inert'); reveal(el); });
        main.scrollLeft = 0;
        onFlowScroll();
      } else {
        window.scrollTo(0, 0);
        $('#toTop').hidden = true;
        setCurrent(index);
        main.scrollTo({ left: index * width(), behavior: 'auto' });
      }
    }
    if (flowMQ.addEventListener) flowMQ.addEventListener('change', applyMode); else if (flowMQ.addListener) flowMQ.addListener(applyMode);

    prevBtn.addEventListener('click', () => goTo(index - 1));
    nextBtn.addEventListener('click', () => goTo(index + 1));
    dots.forEach((d) => d.addEventListener('click', () => goTo(Number(d.dataset.i))));

    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href').slice(1);
      if (id === 'slides') { e.preventDefault(); slides[index].focus({ preventScroll: true }); return; }
      const target = id && document.getElementById(id);
      const slide = target && target.closest('.screen');
      if (!slide) return;
      e.preventDefault();
      goTo(slides.indexOf(slide));
    });

    document.addEventListener('keydown', (e) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (flow || document.querySelector('dialog[open]')) return;
      const t = e.target;
      if (t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable)) return;
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(index + 1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(index - 1); }
    });

    const isScrollableY = (el) => {
      const oy = getComputedStyle(el).overflowY;
      return (oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight + 1;
    };
    main.addEventListener('wheel', (e) => {
      if (flow) return;
      const now = performance.now();
      const freshGesture = now - lastWheelAt > 150;
      lastWheelAt = now;
      if (e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY) || Math.abs(e.deltaY) < 8) return;
      for (let el = e.target; el && el !== main; el = el.parentElement) { if (isScrollableY(el)) return; }
      if (!freshGesture || now < wheelLock) return;
      wheelLock = now + 800;
      e.preventDefault();
      goTo(index + (e.deltaY > 0 ? 1 : -1));
    }, { passive: false });

    window.addEventListener('resize', () => { if (!flow) main.scrollTo({ left: index * width(), behavior: 'auto' }); });
    window.addEventListener('hashchange', () => { const i = ids.indexOf(location.hash.slice(1)); if (i >= 0) goTo(i); });

    const start = ids.indexOf(location.hash.slice(1));
    if (start > 0) goTo(start, true); else { setCurrent(0); onFlowScroll(); }
    reveal(slides[0]);
    if (flow) slides.forEach(reveal);
  }

  /* ------------------------------------------------------------------ */
  /* Init                                                               */
  /* ------------------------------------------------------------------ */

  buildStages();
  wireStages();
  setActive(0);
  buildExplorer();
  buildLadder();
  buildTeams();
  buildResources();
  initSlides();
})();
