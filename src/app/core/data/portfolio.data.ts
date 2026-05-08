import {
  ContextNote,
  ContextTab,
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
  { name: 'React', available: false, note: 'Coming soon: hooks-based implementation.' },
  { name: 'Svelte', available: false, note: 'Coming soon: compiler-driven reactivity implementation.' }
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
      'Angular is active in this MVP implementation.',
      'React and Svelte modes are visible and intentionally marked as coming soon.'
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
      'React and Svelte can be integrated later as isolated workbench engines.',
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
  { framework: 'React', note: 'Coming soon: hooks-based implementation.' },
  { framework: 'Svelte', note: 'Coming soon: compiler-driven reactivity implementation.' }
];
