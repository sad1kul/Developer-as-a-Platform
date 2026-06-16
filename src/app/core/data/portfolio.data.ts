import {
  ArchitectureLayer,
  CaseStudy,
  ContextNote,
  ContextTab,
  EngineContext,
  FrameworkEngine,
  FrameworkEngineOption,
  NavItem,
  PrincipleCard,
  ProfileIdentity,
  QuickLink,
  SortOption,
  SourceLinks,
  StatusFilter,
  SystemProgressItem,
  SystemStatusInfo,
  TechProfileGroup,
  WorkbenchItem
} from '../models/portfolio.model';

export const GITHUB_REPO = 'https://github.com/sad1kul/Developer-as-a-Platform';
export const CV_ASSET_PATH = '/assets/Sadikul-Islam-CV.pdf';
export const CV_DOWNLOAD_FILENAME = 'Sadikul-Islam-CV.pdf';
export const CONTACT_EMAIL = 'sadik@sadikul.me';

export const PROFILE_IDENTITY: ProfileIdentity = {
  name: 'Sadikul Islam',
  title: 'Frontend Engineer',
  subtitle: 'Angular, TypeScript, CRM workflows, cross-framework architecture',
  roleLine: 'Software Developer',
  focus:
    'Angular Signals, typed models, custom-element engines, CRM workflow design, fintech support workflows, and practical developer tooling direction.',
  summary:
    'I build clear, maintainable frontend systems for business workflows. This portfolio highlights Angular and TypeScript work, cross-framework integration, and UI patterns shaped by CRM, travel, fintech, and support operations.',
  location: 'Bangladesh, with South Africa experience',
  availability: 'Open to remote, hybrid, and relocation-ready roles'
};

export const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: 'overview' },
  { id: 'workbench', label: 'Workbench', icon: 'workbench' },
  { id: 'tech-profile', label: 'Technical Profile', icon: 'tech' },
  { id: 'architecture', label: 'Architecture', icon: 'architecture' },
  { id: 'case-studies', label: 'Case Studies', icon: 'case-studies' },
  { id: 'systems', label: 'Product Roadmap', icon: 'systems' },
  { id: 'about', label: 'About', icon: 'about' },
  { id: 'contact', label: 'Contact', icon: 'contact' }
];

export const QUICK_LINKS: QuickLink[] = [
  {
    label: 'GitHub',
    url: 'https://github.com/sad1kul',
    icon: 'github',
    ariaLabel: 'Open GitHub profile'
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/sadikul-islam-553a2669/',
    icon: 'linkedin',
    ariaLabel: 'Open LinkedIn profile'
  },
  {
    label: 'CV',
    url: CV_ASSET_PATH,
    icon: 'cv',
    ariaLabel: 'Download Sadikul Islam CV'
  },
  {
    label: 'Email',
    url: `mailto:${CONTACT_EMAIL}`,
    icon: 'email',
    ariaLabel: 'Send email to Sadikul Islam'
  }
];

export const SOURCE_LINKS: SourceLinks = {
  angularWorkbench: `${GITHUB_REPO}/tree/main/src/app`,
  reactEngine: `${GITHUB_REPO}/blob/main/engines/react-workbench/src/ReactWorkbench.tsx`,
  svelteEngine: `${GITHUB_REPO}/blob/main/engines/svelte-workbench/src/SvelteWorkbench.svelte`,
  dataModels: `${GITHUB_REPO}/blob/main/src/app/core/models/portfolio.model.ts`,
  caseStudies: `${GITHUB_REPO}/blob/main/src/app/core/data/portfolio.data.ts`
};

export const SYSTEM_STATUS: SystemStatusInfo = {
  live: 'Live: sadikul.me',
  lastUpdated: 'Last updated: Jun 16, 2026, 02:35 PM GMT+6',
  version: 'Version: v1.0.0'
};

export const FRAMEWORK_ENGINES: FrameworkEngineOption[] = [
  { name: 'Angular', available: true, note: 'Primary shell and native workbench implementation.' },
  { name: 'React', available: true, note: 'Custom element engine with shadow DOM isolation.' },
  { name: 'Svelte', available: true, note: 'Custom element engine with compiled reactivity.' }
];

export const WORKBENCH_DISCLAIMER =
  'A portfolio workbench using local demo data to demonstrate filtering, sorting, state handling, typed models, and framework integration.';

export const WORKBENCH_ITEMS: WorkbenchItem[] = [
  {
    id: 8601,
    name: 'Travel Booking Workflow',
    status: 'Active',
    priority: 'High',
    updatedAt: '4 min ago',
    updatedMinutesAgo: 4,
    category: 'CRM Operations',
    description:
      'Coordinates search, booking, and reservation steps inside a CRM-style workflow used for travel support operations.',
    techTags: ['Angular', 'TypeScript', 'Angular Signals']
  },
  {
    id: 8602,
    name: 'Customer Profile Lookup',
    status: 'Active',
    priority: 'Medium',
    updatedAt: '18 min ago',
    updatedMinutesAgo: 18,
    category: 'Support Workflow',
    description:
      'Represents a support workflow for finding customer details, linked service records, and recent booking context.',
    techTags: ['Typed Models', 'Search UX', 'State Mapping']
  },
  {
    id: 8603,
    name: 'Transaction Dispute Queue',
    status: 'Pending',
    priority: 'High',
    updatedAt: '37 min ago',
    updatedMinutesAgo: 37,
    category: 'Fintech Support',
    description:
      'Tracks disputed transactions that require support review, evidence collection, and escalation routing.',
    techTags: ['Angular', 'Workflow Rules', 'Queue Logic']
  },
  {
    id: 8604,
    name: 'Proof-of-Payment Request',
    status: 'In Review',
    priority: 'Medium',
    updatedAt: '58 min ago',
    updatedMinutesAgo: 58,
    category: 'Fintech Operations',
    description:
      'Models a support action for requesting or generating transaction confirmation artifacts for customers and agents.',
    techTags: ['Forms', 'Template UX', 'Service Patterns']
  },
  {
    id: 8605,
    name: 'AI Debug Session Monitor',
    status: 'Warning',
    priority: 'Critical',
    updatedAt: '1 hour ago',
    updatedMinutesAgo: 96,
    category: 'Developer Tooling',
    description:
      'Represents a developer-tooling workflow for tracking runtime issues while pairing with AI-assisted debugging tools.',
    techTags: ['Console Tracing', 'Runtime Signals', 'DevTools']
  },
  {
    id: 8606,
    name: 'API Contract Drift Checker',
    status: 'Error',
    priority: 'High',
    updatedAt: '2 hours ago',
    updatedMinutesAgo: 125,
    category: 'Integration Quality',
    description:
      'Highlights frontend/backend contract mismatch risks between expected and actual API response payloads.',
    techTags: ['TypeScript', 'Schema Contracts', 'Error Handling']
  },
  {
    id: 8607,
    name: 'Support Ticket Escalation Flow',
    status: 'Pending',
    priority: 'High',
    updatedAt: '2 hours ago',
    updatedMinutesAgo: 162,
    category: 'Support Operations',
    description:
      'Models how support cases move from first-line review to technical escalation with clear ownership hand-off.',
    techTags: ['Case Routing', 'Status Modeling', 'Audit Trail']
  },
  {
    id: 8608,
    name: 'CRM Reservation Flow',
    status: 'Active',
    priority: 'Medium',
    updatedAt: '4 hours ago',
    updatedMinutesAgo: 240,
    category: 'CRM Workflow',
    description:
      'Represents reservation state changes across create, modify, and cancellation actions in an internal CRM dashboard.',
    techTags: ['Angular Components', 'State Transitions', 'UI Architecture']
  }
];

export const STATUS_FILTERS: StatusFilter[] = ['All Status', 'Active', 'Pending', 'Warning', 'Error', 'In Review'];
export const SORT_OPTIONS: SortOption[] = ['Newest', 'Oldest', 'Priority'];

export const PRINCIPLE_CARDS: PrincipleCard[] = [
  {
    title: 'Cross-framework Architecture',
    description: 'Angular shell with React and Svelte engines mounted as isolated custom elements.',
    icon: 'architecture'
  },
  {
    title: 'Typed by Default',
    description: 'Typed models and explicit interfaces to keep data contracts readable and predictable.',
    icon: 'code'
  },
  {
    title: 'Signals-first UI State',
    description: 'Angular Signals and computed state power search, sorting, selection, and KPI views.',
    icon: 'performance'
  },
  {
    title: 'Business Workflow Thinking',
    description: 'Modules are modeled around CRM, travel, fintech, and support operations.',
    icon: 'solver'
  },
  {
    title: 'Practical Architecture',
    description: 'Data, state services, feature components, and layout concerns are intentionally separated.',
    icon: 'delivery'
  },
  {
    title: 'Developer Tooling Mindset',
    description: 'Case studies include debugging and API-contract concepts for faster developer feedback.',
    icon: 'dx'
  }
];

export const TECH_PROFILE_GROUPS: TechProfileGroup[] = [
  {
    title: 'Angular Frontend',
    items: ['Angular', 'TypeScript', 'Angular Signals', 'Standalone Components', 'Tailwind CSS']
  },
  {
    title: 'Cross-framework Engines',
    items: ['React Custom Elements', 'Svelte Custom Elements', 'Shadow DOM Isolation', 'Vite Builds']
  },
  {
    title: 'Architecture & Models',
    items: ['Typed Models', 'Service Boundaries', 'State Derivation', 'Component Separation']
  },
  {
    title: 'Business Workflows',
    items: ['CRM Reservation Flow', 'Travel Booking Flow', 'Support Escalation', 'Case-driven UI']
  },
  {
    title: 'Fintech Support Context',
    items: ['Transaction Disputes', 'Proof-of-Payment Flows', 'Status-driven Queues', 'Escalation Paths']
  },
  {
    title: 'Developer Direction',
    items: ['Runtime Debugging', 'API Contract Drift Detection', 'DevTools-first Diagnosis']
  }
];

export const ARCHITECTURE_SUMMARY =
  'Angular acts as the shell and orchestration layer, while the workbench demonstrates the same workflow surface across Angular, React, and Svelte engines using consistent typed demo data.';

export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    title: 'Shell Layer',
    description: 'Angular layout, navigation, status bar, and section routing behavior.',
    accent: 'emerald'
  },
  {
    title: 'Workbench Layer',
    description: 'Interactive module table with filtering, sorting, selection, and detail context.',
    accent: 'cyan'
  },
  {
    title: 'Engine Layer',
    description: 'React and Svelte engines loaded as custom elements with safe mount/unmount control.',
    accent: 'purple'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'cross-framework-workbench',
    title: 'Cross-Framework Workbench',
    framing: 'Frontend Architecture',
    problem: 'Static portfolio pages rarely show how a developer handles state, boundaries, and production-style UI structure.',
    role: 'Architect & Developer',
    tech: ['Angular', 'React', 'Svelte', 'Custom Elements', 'Signals'],
    challenge: 'Isolating multiple frameworks on one page without CSS bleeding or state conflicts.',
    solution: 'Used Angular as the orchestration shell, mounting React and Svelte as isolated Web Components.',
    outcome: 'Built an interactive proof of frontend architecture skills that recruiters and engineers can inspect directly.',
    sourceLabel: 'View architecture source',
    sourceUrl: SOURCE_LINKS.caseStudies
  },
  {
    id: 'travel-crm-booking-workflow',
    title: 'CRM Booking Workflow',
    framing: 'Business Logic UI',
    problem: 'Travel agents lose context when switching between search, booking, and reservation screens.',
    role: 'Frontend Lead',
    tech: ['Angular', 'TypeScript', 'State Services'],
    challenge: 'Managing complex, interconnected state across multiple sequential workflow steps.',
    solution: 'Built a unified dashboard shell where search and booking steps share a single reactive state model.',
    outcome: 'Demonstrates how a shared state model can reduce context switching and make support workflows easier to follow.',
    sourceLabel: 'View module direction',
    sourceUrl: SOURCE_LINKS.angularWorkbench
  },
  {
    id: 'fintech-transaction-support-workflow',
    title: 'Fintech Support Queue',
    framing: 'Support Operations',
    problem: 'Manual transaction dispute reviews are slow, repetitive, and error-prone for support teams.',
    role: 'UI/UX Developer',
    tech: ['Angular', 'Forms', 'Status Models'],
    challenge: 'Simplifying complex financial data into actionable, skimmable support tickets.',
    solution: 'Modeled a status-driven queue with rapid filtering and guided dispute resolution actions.',
    outcome: 'Shows a practical queue model for triage, ownership, and escalation in regulated support contexts.',
    sourceLabel: 'View data model',
    sourceUrl: SOURCE_LINKS.dataModels
  },
  {
    id: 'ai-browser-debug-bridge',
    title: 'Runtime Debug Bridge',
    framing: 'Developer Tooling',
    problem: 'Coding assistants often lack live browser context such as DOM state, console errors, and network activity.',
    role: 'Concept Designer',
    tech: ['WebSockets', 'Browser Extensions', 'Agent Tooling'],
    challenge: 'Securely capturing and streaming runtime browser signals to local AI agents.',
    solution: 'Designed a browser-to-editor concept for sharing runtime signals with local development tools.',
    outcome: 'Defines a credible roadmap for faster diagnosis across frontend debugging and API integration issues.',
    sourceLabel: 'View technical notes',
    sourceUrl: SOURCE_LINKS.caseStudies
  }
];

export const SYSTEMS_IN_PROGRESS: SystemProgressItem[] = [
  {
    title: 'Developer-as-a-Platform',
    status: 'Building',
    businessProblem:
      'Recruiters and hiring teams need more than screenshots to evaluate frontend engineering judgment.',
    plannedDirection:
      'Continue expanding case studies, architecture notes, and inspectable source links for faster technical evaluation.'
  },
  {
    title: 'TrustBridge',
    status: 'Planned',
    businessProblem:
      'Failed digital transactions often create confusion between users, support agents, and developers.',
    plannedDirection:
      'Design a workflow-first support system that aligns customer actions, evidence collection, and engineering escalation paths.'
  },
  {
    title: 'SignalDesk',
    status: 'Planned',
    businessProblem:
      'Teams often discover user friction too late, after support tickets increase.',
    plannedDirection:
      'Prototype an internal signal board that combines product behavior indicators with support trends for earlier intervention.'
  },
  {
    title: 'AI Browser Debug Bridge',
    status: 'Planned',
    businessProblem:
      'Coding assistants often lack browser runtime context during debugging.',
    plannedDirection:
      'Explore browser-side data collection and local bridging patterns that can provide runtime context to coding assistants.'
  }
];

export const ABOUT_PARAGRAPHS: string[] = [
  'I am a frontend-focused software developer who builds business workflow interfaces with Angular, TypeScript, and clear component architecture. My background also includes operational support context, which helps me design tools that are practical for agents, customers, and internal teams.',
  'I use this portfolio to show how I think through state, data contracts, framework boundaries, and recruiter-visible delivery quality. The workbench is intentionally interactive so hiring teams can evaluate more than visual polish.'
];

export const CONTACT_OPPORTUNITY_TEXT =
  'Open to Frontend Engineer and Software Developer roles where Angular, TypeScript, business workflow UI, CRM/support tooling, or developer productivity are central.';

export const CONTEXT_TABS: ContextTab[] = ['Source Code', 'State', 'Architecture', 'Trade-offs'];

export const STATE_NOTES: ContextNote[] = [
  {
    heading: 'Signal-driven Shell State',
    points: [
      'Angular Signals track search, filters, sorting, selection, and panel context state.',
      'Computed values derive KPIs and visible rows from local demo data without inflated numbers.'
    ]
  },
  {
    heading: 'Service Boundaries',
    points: [
      'WorkbenchStateService owns row-level state and simulation updates.',
      'EngineService owns framework engine selection, script loading, and external element mounting.'
    ]
  },
  {
    heading: 'Cross-framework Isolation',
    points: [
      'Angular is the host shell while React and Svelte run in isolated custom-element boundaries.',
      'Engine switching clears host nodes to keep mount/unmount behavior predictable.'
    ]
  }
];

export const ARCHITECTURE_NOTES: ContextNote[] = [
  {
    heading: 'Angular Shell Orchestration',
    points: [
      'Navigation, section flow, and context panel stay in Angular for predictable shell behavior.',
      'Feature components render data and interactions while services coordinate shared state.'
    ]
  },
  {
    heading: 'Engine Contract',
    points: [
      'React and Svelte engines use the same module shape and interaction rules for fair comparison.',
      'Custom element registration checks prevent duplicate definition errors.'
    ]
  },
  {
    heading: 'Portfolio as Platform',
    points: [
      'Case studies and module naming are tied to CRM, fintech support, and developer-tooling patterns.',
      'The system is intentionally transparent about local demo data and planned roadmap areas.'
    ]
  }
];

const angularSourceLines = [
  '<span class="token-keyword">readonly</span> <span class="token-property">filteredItems</span> <span class="token-punc">=</span> <span class="token-function">computed</span><span class="token-punc">(() =&gt; {</span>',
  '  <span class="token-keyword">const</span> <span class="token-property">term</span> <span class="token-punc">=</span> <span class="token-keyword">this</span><span class="token-punc">.</span><span class="token-function">searchQuery</span><span class="token-punc">().</span><span class="token-function">trim</span><span class="token-punc">().</span><span class="token-function">toLowerCase</span><span class="token-punc">();</span>',
  '  <span class="token-keyword">return</span> <span class="token-function">filterAndSortItems</span><span class="token-punc">(</span><span class="token-keyword">this</span><span class="token-punc">.</span><span class="token-function">items</span><span class="token-punc">(),</span> <span class="token-property">term</span><span class="token-punc">,</span> <span class="token-keyword">this</span><span class="token-punc">.</span><span class="token-function">statusFilter</span><span class="token-punc">(),</span> <span class="token-keyword">this</span><span class="token-punc">.</span><span class="token-function">sortBy</span><span class="token-punc">());</span>',
  '<span class="token-punc">});</span>',
  '',
  '<span class="token-keyword">readonly</span> <span class="token-property">kpiMetrics</span> <span class="token-punc">=</span> <span class="token-function">computed</span><span class="token-punc">(() =&gt;</span>',
  '  <span class="token-function">buildKpiMetrics</span><span class="token-punc">(</span><span class="token-keyword">this</span><span class="token-punc">.</span><span class="token-function">items</span><span class="token-punc">())</span>',
  '<span class="token-punc">);</span>'
];

const reactSourceLines = [
  '<span class="token-keyword">const</span> <span class="token-punc">[</span><span class="token-property">items</span><span class="token-punc">,</span> <span class="token-property">setItems</span><span class="token-punc">]</span> <span class="token-punc">=</span> <span class="token-function">useState</span><span class="token-punc">(</span><span class="token-property">createWorkbenchItems</span><span class="token-punc">);</span>',
  '<span class="token-keyword">const</span> <span class="token-property">filteredItems</span> <span class="token-punc">=</span> <span class="token-function">useMemo</span><span class="token-punc">(() =&gt;</span>',
  '  <span class="token-function">filterAndSortItems</span><span class="token-punc">(</span><span class="token-property">items</span><span class="token-punc">,</span> <span class="token-property">searchQuery</span><span class="token-punc">,</span> <span class="token-property">statusFilter</span><span class="token-punc">,</span> <span class="token-property">sortBy</span><span class="token-punc">),</span>',
  '  <span class="token-punc">[</span><span class="token-property">items</span><span class="token-punc">,</span> <span class="token-property">searchQuery</span><span class="token-punc">,</span> <span class="token-property">statusFilter</span><span class="token-punc">,</span> <span class="token-property">sortBy</span><span class="token-punc">]</span>',
  '<span class="token-punc">);</span>',
  '',
  '<span class="token-keyword">const</span> <span class="token-property">kpiMetrics</span> <span class="token-punc">=</span> <span class="token-function">useMemo</span><span class="token-punc">(() =&gt;</span>',
  '  <span class="token-function">itemKpis</span><span class="token-punc">(</span><span class="token-property">items</span><span class="token-punc">),</span>',
  '  <span class="token-punc">[</span><span class="token-property">items</span><span class="token-punc">]</span>',
  '<span class="token-punc">);</span>'
];

const svelteSourceLines = [
  '<span class="token-keyword">let</span> <span class="token-property">items</span> <span class="token-punc">=</span> <span class="token-function">createWorkbenchItems</span><span class="token-punc">();</span>',
  '',
  '<span class="token-property">$</span><span class="token-punc">:</span> <span class="token-property">filteredItems</span> <span class="token-punc">=</span> <span class="token-function">filterAndSortItems</span><span class="token-punc">(</span>',
  '  <span class="token-property">items</span><span class="token-punc">,</span> <span class="token-property">searchQuery</span><span class="token-punc">,</span> <span class="token-property">statusFilter</span><span class="token-punc">,</span> <span class="token-property">sortBy</span>',
  '<span class="token-punc">);</span>',
  '',
  '<span class="token-property">$</span><span class="token-punc">:</span> <span class="token-property">kpiMetrics</span> <span class="token-punc">=</span> <span class="token-function">itemKpis</span><span class="token-punc">(</span><span class="token-property">items</span><span class="token-punc">);</span>'
];

export const ENGINE_CONTEXTS: Record<FrameworkEngine, EngineContext> = {
  Angular: {
    source: {
      label: 'Angular (Signals + Services)',
      filename: 'workbench-state.service.ts',
      lines: angularSourceLines,
      plain: [
        'readonly filteredItems = computed(() => {',
        '  const term = this.searchQuery().trim().toLowerCase();',
        '  return filterAndSortItems(this.items(), term, this.statusFilter(), this.sortBy());',
        '});',
        '',
        'readonly kpiMetrics = computed(() =>',
        '  buildKpiMetrics(this.items())',
        ');'
      ].join('\n')
    },
    stateNotes: STATE_NOTES,
    architectureNotes: ARCHITECTURE_NOTES,
    strengths: [
      'Strong app-shell conventions for long-lived systems',
      'Signals keep derived state explicit and testable',
      'Typed service boundaries reduce component-level logic weight',
      'Works well for business workflow-heavy interfaces'
    ],
    tradeoffs: [
      'More structural upfront setup than smaller libraries',
      'Service boundaries require consistent architecture discipline',
      'Cross-framework integration still needs careful shared contracts'
    ],
    comparedFrameworkNotes: [
      { framework: 'React', note: 'React engine runs as isolated custom element under Angular orchestration.' },
      { framework: 'Svelte', note: 'Svelte engine is mounted using the same host lifecycle and data assumptions.' }
    ]
  },
  React: {
    source: {
      label: 'React (Custom Element Engine)',
      filename: 'engines/react-workbench/src/ReactWorkbench.tsx',
      lines: reactSourceLines,
      plain: [
        'const [items, setItems] = useState(createWorkbenchItems);',
        'const filteredItems = useMemo(() =>',
        '  filterAndSortItems(items, searchQuery, statusFilter, sortBy),',
        '  [items, searchQuery, statusFilter, sortBy]',
        ');',
        '',
        'const kpiMetrics = useMemo(() => itemKpis(items), [items]);'
      ].join('\n')
    },
    stateNotes: [
      {
        heading: 'Hooks State',
        points: [
          'React engine uses local hook state for rows, filters, sorting, selection, and simulation metadata.',
          'Derived lists and KPI values are memoized for predictable UI updates.'
        ]
      },
      {
        heading: 'Custom Element Boundary',
        points: [
          'React is wrapped inside <react-data-workbench> and rendered into a shadow root.',
          'Unmount logic runs in disconnectedCallback to avoid stale subscriptions and memory leaks.'
        ]
      },
      {
        heading: 'Host Coordination',
        points: [
          'Angular controls when the script is loaded and when the custom element is mounted.',
          'Duplicate custom-element registration is prevented before define() calls.'
        ]
      }
    ],
    architectureNotes: ARCHITECTURE_NOTES,
    strengths: [
      'Familiar hook-based local state model',
      'Engine isolation is explicit and easy to reason about',
      'Useful comparison baseline against Angular Signals'
    ],
    tradeoffs: [
      'Adds React runtime only when selected',
      'Visual styling must be maintained in a separate engine stylesheet',
      'No direct Angular template bindings across the custom-element boundary'
    ],
    comparedFrameworkNotes: [
      { framework: 'Angular', note: 'Angular remains the shell and state context owner for the full page.' },
      { framework: 'Svelte', note: 'Svelte engine offers the same feature surface with different reactivity semantics.' }
    ]
  },
  Svelte: {
    source: {
      label: 'Svelte (Custom Element Engine)',
      filename: 'engines/svelte-workbench/src/SvelteWorkbench.svelte',
      lines: svelteSourceLines,
      plain: [
        'let items = createWorkbenchItems();',
        '$: filteredItems = filterAndSortItems(items, searchQuery, statusFilter, sortBy);',
        '$: kpiMetrics = itemKpis(items);'
      ].join('\n')
    },
    stateNotes: [
      {
        heading: 'Compiler Reactivity',
        points: [
          'Svelte uses reactive statements for filtered rows, selection fallback, and KPI derivation.',
          'State remains local to the element for predictable engine isolation.'
        ]
      },
      {
        heading: 'Custom Element Delivery',
        points: [
          'Svelte compiles directly to <svelte-data-workbench> with shadow DOM enabled.',
          'Angular mounts and unmounts the element based on framework selection.'
        ]
      },
      {
        heading: 'Shared Data Contract',
        points: [
          'Svelte engine uses the same module structure and KPI logic as Angular and React.',
          'This keeps framework comparisons focused on implementation style, not data differences.'
        ]
      }
    ],
    architectureNotes: ARCHITECTURE_NOTES,
    strengths: [
      'Concise reactive syntax',
      'Small compiled runtime footprint for this engine surface',
      'Clear state derivation with minimal ceremony'
    ],
    tradeoffs: [
      'Separate Svelte build pipeline must stay aligned with Angular deploys',
      'Cross-boundary events need explicit contracts',
      'Fewer teams have deep Svelte production experience than Angular/React'
    ],
    comparedFrameworkNotes: [
      { framework: 'Angular', note: 'Angular keeps routing, navigation, and overall page orchestration.' },
      { framework: 'React', note: 'React and Svelte both run as lazy-loaded custom-element engines.' }
    ]
  }
};
