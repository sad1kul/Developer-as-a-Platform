import {
  ContextNote,
  ContextTab,
  EngineContext,
  FrameworkEngine,
  NavItem,
  PrincipleCard,
  SystemProgressItem,
  TechProfileGroup,
  WorkbenchItem,
  WorkbenchStatus
} from '../models/portfolio.model';

export const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: 'overview' },
  { id: 'workbench', label: 'Workbench', icon: 'workbench' },
  { id: 'tech-profile', label: 'Tech Profile', icon: 'tech' },
  { id: 'architecture', label: 'Architecture', icon: 'architecture' },
  { id: 'systems', label: 'Systems (Soon)', icon: 'systems', soon: true },
  { id: 'about', label: 'About Me', icon: 'about' },
  { id: 'contact', label: 'Contact', icon: 'contact' }
];

export const FRAMEWORK_ENGINES: Array<{ name: FrameworkEngine; available: boolean; note: string }> = [
  { name: 'Angular', available: true, note: 'Primary engine implemented.' },
  { name: 'React', available: true, note: 'React custom element engine active.' },
  { name: 'Svelte', available: true, note: 'Svelte custom element engine active.' }
];

export const WORKBENCH_ITEMS: WorkbenchItem[] = [
  {
    id: 1250,
    name: 'Authentication Service',
    status: 'Active',
    priority: 'High',
    updatedAt: '2 min ago',
    updatedMinutesAgo: 2,
    description: 'Handles user authentication, JWT validation and session management.',
    techTags: ['Angular', 'TypeScript', 'RxJS']
  },
  {
    id: 1249,
    name: 'User Profile Module',
    status: 'Active',
    priority: 'Medium',
    updatedAt: '15 min ago',
    updatedMinutesAgo: 15,
    description: 'Maintains profile settings, account preferences and update flows.',
    techTags: ['Angular', 'Forms', 'REST']
  },
  {
    id: 1248,
    name: 'Payment Gateway Adapter',
    status: 'Pending',
    priority: 'High',
    updatedAt: '32 min ago',
    updatedMinutesAgo: 32,
    description: 'Abstract adapter layer for payment provider integrations and retries.',
    techTags: ['Node.js', 'API', 'Validation']
  },
  {
    id: 1247,
    name: 'Notification Service',
    status: 'In Review',
    priority: 'Low',
    updatedAt: '1 hour ago',
    updatedMinutesAgo: 60,
    description: 'Coordinates in-app and email notifications using queue-safe rules.',
    techTags: ['Queue', 'Node.js', 'Templates']
  },
  {
    id: 1246,
    name: 'Analytics Dashboard',
    status: 'Error',
    priority: 'Critical',
    updatedAt: '2 hours ago',
    updatedMinutesAgo: 120,
    description: 'Monitors product-level metrics and failure patterns for debugging.',
    techTags: ['Charts', 'Observability', 'Alerts']
  },
  {
    id: 1245,
    name: 'API Contract Monitor',
    status: 'Warning',
    priority: 'High',
    updatedAt: '3 hours ago',
    updatedMinutesAgo: 180,
    description: 'Tracks schema drift and breaks between client contracts and APIs.',
    techTags: ['OpenAPI', 'Testing', 'Automation']
  },
  {
    id: 1244,
    name: 'Error Tracking Service',
    status: 'Pending',
    priority: 'Medium',
    updatedAt: '5 hours ago',
    updatedMinutesAgo: 300,
    description: 'Groups production incidents with breadcrumbs and trace correlation.',
    techTags: ['Tracing', 'Sourcemaps', 'Incidents']
  },
  {
    id: 1243,
    name: 'Deployment Pipeline',
    status: 'Active',
    priority: 'Medium',
    updatedAt: '7 hours ago',
    updatedMinutesAgo: 420,
    description: 'Automates environment checks, deployment gates and rollback control.',
    techTags: ['CI/CD', 'GitHub', 'Quality Gates']
  }
];

export const STATUS_FILTERS: Array<'All Status' | WorkbenchStatus> = [
  'All Status',
  'Active',
  'Pending',
  'Warning',
  'Error',
  'In Review'
];

export const SORT_OPTIONS = ['Newest', 'Oldest', 'Priority'] as const;

export const PRINCIPLE_CARDS: PrincipleCard[] = [
  {
    title: 'Clean Code',
    description: 'Readable, maintainable and scalable code.',
    icon: 'code'
  },
  {
    title: 'Performance',
    description: 'Optimized for speed and smooth user experience.',
    icon: 'performance'
  },
  {
    title: 'Developer Experience',
    description: 'Tools, automation and clear workflows.',
    icon: 'dx'
  },
  {
    title: 'Problem Solver',
    description: 'I enjoy solving real-world technical problems.',
    icon: 'solver'
  },
  {
    title: 'Architecture Mindset',
    description: 'I care about structure, data flow and maintainability.',
    icon: 'architecture'
  },
  {
    title: 'Practical Delivery',
    description: 'Useful working software over unnecessary complexity.',
    icon: 'delivery'
  }
];

export const TECH_PROFILE_GROUPS: TechProfileGroup[] = [
  {
    title: 'Frontend',
    items: ['Angular', 'TypeScript', 'RxJS', 'React', 'Svelte', 'HTML', 'SCSS']
  },
  {
    title: 'Backend',
    items: ['Node.js', 'Express', 'REST APIs', 'JWT', 'Zod', 'Middleware']
  },
  {
    title: 'Architecture',
    items: ['Component design', 'Routing', 'Service layers', 'State management', 'API contracts']
  },
  {
    title: 'Tooling',
    items: ['Git', 'GitHub', 'Postman', 'Browser DevTools', 'cPanel deployment']
  },
  {
    title: 'Quality',
    items: ['Debugging', 'Error handling', 'Testing basics', 'Clean code', 'Maintainable structure']
  },
  {
    title: 'Currently improving',
    items: ['Advanced testing', 'CI/CD', 'System design', 'Cloud deployment', 'Deeper backend architecture']
  }
];

export const SYSTEMS_IN_PROGRESS: SystemProgressItem[] = [
  {
    title: 'Developer-as-a-Platform',
    status: 'Building',
    description:
      'This portfolio itself, built as a developer portal-style profile to demonstrate frontend architecture and technical thinking.'
  },
  {
    title: 'Reactive Data Workbench',
    status: 'Building',
    description:
      'A cross-framework UI experiment comparing Angular, React and Svelte approaches to state, reactivity and component architecture.'
  },
  {
    title: 'TrustBridge',
    status: 'Planned',
    description:
      'Fintech complaint and dispute intelligence platform. A full case study will be added later.'
  },
  {
    title: 'SignalDesk',
    status: 'Planned',
    description:
      'Proactive user-friction and incident radar. A full case study will be added later.'
  },
  {
    title: 'AI Browser Debug Bridge',
    status: 'Planned',
    description:
      'Developer productivity tool connecting browser runtime context with coding assistants.'
  }
];

export const CONTEXT_TABS: ContextTab[] = ['Source Code', 'State', 'Architecture', 'Trade-offs'];

export const STATE_NOTES: ContextNote[] = [
  {
    heading: 'Local State',
    points: [
      'Signals manage search, filters, sorting, selected row and tab state.',
      'Workbench data starts from local typed mock data for MVP speed.'
    ]
  },
  {
    heading: 'Computed View',
    points: [
      'Filtered rows are derived using query + status + sort controls.',
      'Selected item detail remains in sync with current view.'
    ]
  },
  {
    heading: 'Engine Mode',
    points: [
      'Angular renders natively inside the shell when selected.',
      'React and Svelte mount as isolated custom elements when selected.'
    ]
  }
];

export const ARCHITECTURE_NOTES: ContextNote[] = [
  {
    heading: 'Angular Shell',
    points: [
      'App shell coordinates navigation, status context and section anchors.',
      'Standalone component architecture keeps this version simple and extensible.'
    ]
  },
  {
    heading: 'Workbench Core',
    points: [
      'The workbench is the first technical proof of the portfolio concept.',
      'Typed data + predictable UI state demonstrate maintainable engineering patterns.'
    ]
  },
  {
    heading: 'Future Engines',
    points: [
      'React and Svelte are integrated as lazy-loaded custom element workbench engines.',
      'Right context panel documents decisions, trade-offs and implementation notes.'
    ]
  }
];

export const ANGULAR_STRENGTHS: string[] = [
  'Strong structure and conventions',
  'TypeScript-first development model',
  'Scalable architecture for larger applications',
  'Robust ecosystem and tooling'
];

export const ANGULAR_TRADEOFFS: string[] = [
  'More boilerplate than smaller libraries',
  'Steeper learning curve',
  'Requires discipline in boundaries and organization'
];

export const COMPARED_FRAMEWORK_NOTES: Array<{ framework: 'React' | 'Svelte'; note: string }> = [
  { framework: 'React', note: 'Implemented as a lazy-loaded custom element using React state and memoized views.' },
  { framework: 'Svelte', note: 'Implemented as a lazy-loaded custom element using native Svelte reactivity.' }
];

const angularSourceLines = [
  '<span class="token-keyword">readonly</span> <span class="token-property">filteredItems</span> <span class="token-punc">=</span> <span class="token-function">computed</span><span class="token-punc">(() =&gt; {</span>',
  '  <span class="token-keyword">const</span> <span class="token-property">term</span> <span class="token-punc">=</span> <span class="token-keyword">this</span><span class="token-punc">.</span><span class="token-function">searchQuery</span><span class="token-punc">().</span><span class="token-function">trim</span><span class="token-punc">().</span><span class="token-function">toLowerCase</span><span class="token-punc">();</span>',
  '  <span class="token-keyword">return</span> <span class="token-function">sortItems</span><span class="token-punc">(</span><span class="token-function">filterItems</span><span class="token-punc">(</span><span class="token-keyword">this</span><span class="token-punc">.</span><span class="token-function">items</span><span class="token-punc">(),</span> <span class="token-property">term</span><span class="token-punc">));</span>',
  '<span class="token-punc">});</span>',
  '',
  '<span class="token-keyword">readonly</span> <span class="token-property">selectedItem</span> <span class="token-punc">=</span> <span class="token-function">computed</span><span class="token-punc">(() =&gt;</span>',
  '  <span class="token-keyword">this</span><span class="token-punc">.</span><span class="token-function">filteredItems</span><span class="token-punc">().</span><span class="token-function">find</span><span class="token-punc">((</span><span class="token-property">item</span><span class="token-punc">)</span> <span class="token-punc">=&gt;</span> <span class="token-property">item</span><span class="token-punc">.</span><span class="token-property">id</span> <span class="token-punc">===</span> <span class="token-keyword">this</span><span class="token-punc">.</span><span class="token-function">selectedItemId</span><span class="token-punc">())</span>',
  '  <span class="token-punc">??</span> <span class="token-keyword">this</span><span class="token-punc">.</span><span class="token-function">filteredItems</span><span class="token-punc">()[</span><span class="token-number">0</span><span class="token-punc">]</span>',
  '<span class="token-punc">);</span>'
];

const reactSourceLines = [
  '<span class="token-keyword">const</span> <span class="token-punc">[</span><span class="token-property">items</span><span class="token-punc">,</span> <span class="token-property">setItems</span><span class="token-punc">]</span> <span class="token-punc">=</span> <span class="token-function">useState</span><span class="token-punc">(</span><span class="token-property">createWorkbenchItems</span><span class="token-punc">);</span>',
  '<span class="token-keyword">const</span> <span class="token-punc">[</span><span class="token-property">selectedItemId</span><span class="token-punc">,</span> <span class="token-property">setSelectedItemId</span><span class="token-punc">]</span> <span class="token-punc">=</span> <span class="token-function">useState</span><span class="token-punc">(</span><span class="token-property">items</span><span class="token-punc">[</span><span class="token-number">0</span><span class="token-punc">]?.</span><span class="token-property">id</span> <span class="token-punc">??</span> <span class="token-number">0</span><span class="token-punc">);</span>',
  '',
  '<span class="token-keyword">const</span> <span class="token-property">filteredItems</span> <span class="token-punc">=</span> <span class="token-function">useMemo</span><span class="token-punc">(() =&gt;</span>',
  '  <span class="token-function">filterAndSortItems</span><span class="token-punc">(</span><span class="token-property">items</span><span class="token-punc">,</span> <span class="token-property">searchQuery</span><span class="token-punc">,</span> <span class="token-property">statusFilter</span><span class="token-punc">,</span> <span class="token-property">sortBy</span><span class="token-punc">),</span>',
  '  <span class="token-punc">[</span><span class="token-property">items</span><span class="token-punc">,</span> <span class="token-property">searchQuery</span><span class="token-punc">,</span> <span class="token-property">statusFilter</span><span class="token-punc">,</span> <span class="token-property">sortBy</span><span class="token-punc">]</span>',
  '<span class="token-punc">);</span>',
  '',
  '<span class="token-keyword">const</span> <span class="token-property">selectedItem</span> <span class="token-punc">=</span> <span class="token-function">useMemo</span><span class="token-punc">(() =&gt;</span>',
  '  <span class="token-property">filteredItems</span><span class="token-punc">.</span><span class="token-function">find</span><span class="token-punc">((</span><span class="token-property">item</span><span class="token-punc">)</span> <span class="token-punc">=&gt;</span> <span class="token-property">item</span><span class="token-punc">.</span><span class="token-property">id</span> <span class="token-punc">===</span> <span class="token-property">selectedItemId</span><span class="token-punc">)</span> <span class="token-punc">??</span> <span class="token-property">filteredItems</span><span class="token-punc">[</span><span class="token-number">0</span><span class="token-punc">],</span>',
  '  <span class="token-punc">[</span><span class="token-property">filteredItems</span><span class="token-punc">,</span> <span class="token-property">selectedItemId</span><span class="token-punc">]</span>',
  '<span class="token-punc">);</span>'
];

const svelteSourceLines = [
  '<span class="token-keyword">let</span> <span class="token-property">items</span> <span class="token-punc">=</span> <span class="token-function">createWorkbenchItems</span><span class="token-punc">();</span>',
  '<span class="token-keyword">let</span> <span class="token-property">selectedItemId</span> <span class="token-punc">=</span> <span class="token-property">items</span><span class="token-punc">[</span><span class="token-number">0</span><span class="token-punc">]?.</span><span class="token-property">id</span> <span class="token-punc">??</span> <span class="token-number">0</span><span class="token-punc">;</span>',
  '',
  '<span class="token-property">$</span><span class="token-punc">:</span> <span class="token-property">filteredItems</span> <span class="token-punc">=</span> <span class="token-function">filterAndSortItems</span><span class="token-punc">(</span>',
  '  <span class="token-property">items</span><span class="token-punc">,</span> <span class="token-property">searchQuery</span><span class="token-punc">,</span> <span class="token-property">statusFilter</span><span class="token-punc">,</span> <span class="token-property">sortBy</span>',
  '<span class="token-punc">);</span>',
  '',
  '<span class="token-property">$</span><span class="token-punc">:</span> <span class="token-property">selectedItem</span> <span class="token-punc">=</span>',
  '  <span class="token-property">filteredItems</span><span class="token-punc">.</span><span class="token-function">find</span><span class="token-punc">((</span><span class="token-property">item</span><span class="token-punc">)</span> <span class="token-punc">=&gt;</span> <span class="token-property">item</span><span class="token-punc">.</span><span class="token-property">id</span> <span class="token-punc">===</span> <span class="token-property">selectedItemId</span><span class="token-punc">)</span>',
  '  <span class="token-punc">??</span> <span class="token-property">filteredItems</span><span class="token-punc">[</span><span class="token-number">0</span><span class="token-punc">]</span> <span class="token-punc">??</span> <span class="token-property">items</span><span class="token-punc">[</span><span class="token-number">0</span><span class="token-punc">];</span>'
];

export const ENGINE_CONTEXTS: Record<FrameworkEngine, EngineContext> = {
  Angular: {
    source: {
      label: 'Angular (Signals)',
      filename: 'workbench.component.ts',
      lines: angularSourceLines,
      plain: [
        'readonly filteredItems = computed(() => {',
        '  const term = this.searchQuery().trim().toLowerCase();',
        '  return sortItems(filterItems(this.items(), term));',
        '});',
        '',
        'readonly selectedItem = computed(() =>',
        '  this.filteredItems().find((item) => item.id === this.selectedItemId())',
        '  ?? this.filteredItems()[0]',
        ');'
      ].join('\n')
    },
    stateNotes: STATE_NOTES,
    architectureNotes: ARCHITECTURE_NOTES,
    strengths: ANGULAR_STRENGTHS,
    tradeoffs: ANGULAR_TRADEOFFS,
    comparedFrameworkNotes: [
      { framework: 'React', note: 'Available as a lazy-loaded custom element mounted only inside the workbench area.' },
      { framework: 'Svelte', note: 'Available as a lazy-loaded custom element mounted only inside the workbench area.' }
    ]
  },
  React: {
    source: {
      label: 'React (TSX)',
      filename: 'ReactWorkbench.tsx',
      lines: reactSourceLines,
      plain: [
        'const [items, setItems] = useState(createWorkbenchItems);',
        'const [selectedItemId, setSelectedItemId] = useState(items[0]?.id ?? 0);',
        '',
        'const filteredItems = useMemo(() =>',
        '  filterAndSortItems(items, searchQuery, statusFilter, sortBy),',
        '  [items, searchQuery, statusFilter, sortBy]',
        ');',
        '',
        'const selectedItem = useMemo(() =>',
        '  filteredItems.find((item) => item.id === selectedItemId) ?? filteredItems[0],',
        '  [filteredItems, selectedItemId]',
        ');'
      ].join('\n')
    },
    stateNotes: [
      {
        heading: 'React Local State',
        points: [
          'useState owns rows, query, filter, sort, selected row and simulated refresh state.',
          'The engine lives inside <react-data-workbench> and does not replace the Angular shell.'
        ]
      },
      {
        heading: 'Memoized View',
        points: [
          'useMemo derives filtered rows from local state and mock data.',
          'Selected detail falls back to the first visible row when filters hide the previous selection.'
        ]
      },
      {
        heading: 'Engine Boundary',
        points: [
          'React is loaded from /engines/react-workbench.js only when selected.',
          'The custom element checks registration before defining itself to avoid duplicate registration errors.'
        ]
      }
    ],
    architectureNotes: [
      {
        heading: 'React Custom Element',
        points: [
          'React renders into a shadow-root custom element using react-dom/client createRoot.',
          'The element unmounts the React root in disconnectedCallback.'
        ]
      },
      {
        heading: 'Angular Host',
        points: [
          'Angular controls framework selection and script loading.',
          'The shell clears the engine host before mounting a different custom element.'
        ]
      },
      {
        heading: 'Shared Contract',
        points: [
          'The React workbench uses the same module rows, statuses, priorities and interactions as Angular.',
          'Mock data stays local and clearly labeled as demo data.'
        ]
      }
    ],
    strengths: [
      'Small isolated engine boundary',
      'Familiar hooks-based state model',
      'useMemo keeps derived row views predictable',
      'Easy to compare with Angular signal-based state'
    ],
    tradeoffs: [
      'Adds React runtime cost when this engine is selected',
      'Custom element styling must be maintained beside the Angular UI',
      'State is isolated from Angular unless explicit events are wired'
    ],
    comparedFrameworkNotes: [
      { framework: 'Angular', note: 'Primary shell remains Angular and owns layout, navigation and context.' },
      { framework: 'Svelte', note: 'Sibling custom element engine using compiler-driven reactivity.' }
    ]
  },
  Svelte: {
    source: {
      label: 'Svelte',
      filename: 'SvelteWorkbench.svelte',
      lines: svelteSourceLines,
      plain: [
        'let items = createWorkbenchItems();',
        'let selectedItemId = items[0]?.id ?? 0;',
        '',
        '$: filteredItems = filterAndSortItems(items, searchQuery, statusFilter, sortBy);',
        '',
        '$: selectedItem =',
        '  filteredItems.find((item) => item.id === selectedItemId)',
        '  ?? filteredItems[0] ?? items[0];'
      ].join('\n')
    },
    stateNotes: [
      {
        heading: 'Native Reactivity',
        points: [
          'Svelte variables hold rows, query, filter, sort and selected row state.',
          'Reactive statements derive filtered rows and selected detail without an external state library.'
        ]
      },
      {
        heading: 'Compiled Engine',
        points: [
          'The component compiles as <svelte-data-workbench> using Svelte custom element support.',
          'The engine bundle is loaded only when Svelte is selected.'
        ]
      },
      {
        heading: 'Local Demo Data',
        points: [
          'The same workbench rows are used for honest cross-framework comparison.',
          'Simulated updates stay local and are labeled as simulation.'
        ]
      }
    ],
    architectureNotes: [
      {
        heading: 'Svelte Custom Element',
        points: [
          'Svelte compiles the workbench into a browser custom element.',
          'Styles are scoped to the engine so it remains visually consistent without leaking into the shell.'
        ]
      },
      {
        heading: 'Angular Host',
        points: [
          'Angular lazy-loads /engines/svelte-workbench.js on selection.',
          'Switching engines removes the previous custom element before mounting the next one.'
        ]
      },
      {
        heading: 'Comparison Surface',
        points: [
          'The Svelte engine exposes the same KPIs, controls, rows and detail panel as Angular and React.',
          'The right panel documents the framework-specific state model.'
        ]
      }
    ],
    strengths: [
      'Minimal component state syntax',
      'Compiler-driven reactivity keeps derived values concise',
      'Small engine bundle compared with runtime-heavy approaches',
      'Clear contrast with Angular signals and React hooks'
    ],
    tradeoffs: [
      'Separate Svelte build pipeline must stay in sync with Angular deployment',
      'Custom element integration limits direct Angular template binding',
      'Team familiarity may be lower than Angular or React'
    ],
    comparedFrameworkNotes: [
      { framework: 'Angular', note: 'Primary shell remains Angular and owns layout, navigation and context.' },
      { framework: 'React', note: 'Sibling custom element engine using hooks and memoized derived state.' }
    ]
  }
};
