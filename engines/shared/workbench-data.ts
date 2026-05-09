export type WorkbenchStatus = 'Active' | 'Pending' | 'Warning' | 'Error' | 'In Review';
export type WorkbenchPriority = 'Low' | 'Medium' | 'High' | 'Critical';
export type StatusFilter = 'All Status' | WorkbenchStatus;
export type SortOption = 'Newest' | 'Oldest' | 'Priority';

export interface WorkbenchItem {
  id: number;
  name: string;
  status: WorkbenchStatus;
  priority: WorkbenchPriority;
  updatedAt: string;
  updatedMinutesAgo: number;
  description: string;
  techTags: string[];
}

// Kept in lockstep with the Angular workbench data. Extract to a package-level
// shared data module later if the engine surface grows beyond this MVP.
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

export const STATUS_FILTERS: StatusFilter[] = ['All Status', 'Active', 'Pending', 'Warning', 'Error', 'In Review'];
export const SORT_OPTIONS: SortOption[] = ['Newest', 'Oldest', 'Priority'];

export function createWorkbenchItems(): WorkbenchItem[] {
  return WORKBENCH_ITEMS.map((item) => ({ ...item, techTags: [...item.techTags] }));
}

export function priorityRank(priority: WorkbenchPriority): number {
  const rank: Record<WorkbenchPriority, number> = {
    Critical: 0,
    High: 1,
    Medium: 2,
    Low: 3
  };

  return rank[priority];
}

export function relativeTime(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min ago`;
  }

  const hours = Math.floor(minutes / 60);
  return `${hours} hour${hours > 1 ? 's' : ''} ago`;
}

export function nextStatus(status: WorkbenchStatus, chance = Math.random()): WorkbenchStatus {
  if (status === 'Pending' && chance > 0.78) {
    return 'In Review';
  }

  if (status === 'In Review' && chance > 0.8) {
    return 'Active';
  }

  if (status === 'Warning' && chance > 0.88) {
    return 'Active';
  }

  if (status === 'Error' && chance > 0.9) {
    return 'Warning';
  }

  return status;
}
