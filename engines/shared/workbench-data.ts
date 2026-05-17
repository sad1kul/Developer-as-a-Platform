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
  category: string;
  description: string;
  techTags: string[];
}

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
