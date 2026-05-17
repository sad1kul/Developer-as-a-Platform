import { Injectable, computed, signal } from '@angular/core';

import { SORT_OPTIONS, STATUS_FILTERS, WORKBENCH_ITEMS } from '../data/portfolio.data';
import {
  KpiMetric,
  SortOption,
  StatusFilter,
  WorkbenchItem,
  WorkbenchPriority,
  WorkbenchStatus
} from '../models/portfolio.model';

@Injectable({ providedIn: 'root' })
export class WorkbenchStateService {
  readonly statusFilters = STATUS_FILTERS;
  readonly sortOptions = SORT_OPTIONS;

  readonly items = signal<WorkbenchItem[]>(
    WORKBENCH_ITEMS.map((item) => ({ ...item, techTags: [...item.techTags] }))
  );
  readonly searchQuery = signal('');
  readonly statusFilter = signal<StatusFilter>('All Status');
  readonly sortBy = signal<SortOption>('Newest');
  readonly selectedItemId = signal<number>(WORKBENCH_ITEMS[0]?.id ?? 0);
  readonly lastRefreshed = signal('No simulation yet');

  readonly filteredItems = computed(() => {
    const term = this.searchQuery().trim().toLowerCase();
    const status = this.statusFilter();
    const sort = this.sortBy();

    const filtered = this.items().filter((item) => {
      const matchesSearch =
        term.length === 0 ||
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        item.techTags.some((tag) => tag.toLowerCase().includes(term)) ||
        item.id.toString().includes(term);

      const matchesStatus = status === 'All Status' || item.status === status;

      return matchesSearch && matchesStatus;
    });

    return [...filtered].sort((a, b) => {
      if (sort === 'Newest') {
        return a.updatedMinutesAgo - b.updatedMinutesAgo;
      }

      if (sort === 'Oldest') {
        return b.updatedMinutesAgo - a.updatedMinutesAgo;
      }

      return this.priorityRank(a.priority) - this.priorityRank(b.priority);
    });
  });

  readonly selectedItem = computed(() => {
    const rows = this.filteredItems();
    return rows.find((item) => item.id === this.selectedItemId()) ?? rows[0] ?? this.items()[0];
  });

  readonly kpiMetrics = computed<KpiMetric[]>(() => {
    const rows = this.items();
    const active = rows.filter((item) => item.status === 'Active').length;
    const needsAttention = rows.filter((item) => item.status !== 'Active').length;
    const highPriority = rows.filter((item) => item.priority === 'High' || item.priority === 'Critical').length;
    const errors = rows.filter((item) => item.status === 'Error').length;

    return [
      {
        label: 'Demo Modules',
        value: rows.length.toLocaleString(),
        caption: 'Computed from local demo data',
        tone: 'neutral'
      },
      {
        label: 'Active',
        value: active.toLocaleString(),
        caption: 'Status is Active',
        tone: 'positive'
      },
      {
        label: 'Needs Attention',
        value: needsAttention.toLocaleString(),
        caption: 'Not currently Active',
        tone: 'warning'
      },
      {
        label: 'High Priority',
        value: highPriority.toLocaleString(),
        caption: 'Priority High or Critical',
        tone: 'focus'
      },
      {
        label: 'Errors',
        value: errors.toLocaleString(),
        caption: 'Status is Error',
        tone: 'danger'
      }
    ];
  });

  setSearchQuery(value: string): void {
    this.searchQuery.set(value);
    this.ensureVisibleSelection();
  }

  setStatusFilter(value: string): void {
    this.statusFilter.set(value as StatusFilter);
    this.ensureVisibleSelection();
  }

  setSort(value: string): void {
    this.sortBy.set(value as SortOption);
    this.ensureVisibleSelection();
  }

  selectItem(id: number): void {
    this.selectedItemId.set(id);
  }

  refreshWorkbench(): void {
    const refreshed = this.items().map((item) => {
      const minuteShift = Math.floor(Math.random() * 10) + 1;
      const nextMinutesAgo = Math.max(1, item.updatedMinutesAgo - minuteShift);

      return {
        ...item,
        status: this.nextStatus(item.status),
        updatedMinutesAgo: nextMinutesAgo,
        updatedAt: this.relativeTime(nextMinutesAgo)
      };
    });

    this.items.set(refreshed);

    const simulatedAt = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    }).format(new Date());

    this.lastRefreshed.set(`Simulated ${simulatedAt}`);
    this.ensureVisibleSelection();
  }

  statusClasses(status: WorkbenchStatus): string {
    const classMap: Record<WorkbenchStatus, string> = {
      Active: 'border-emerald/40 bg-emerald/15 text-emerald',
      Pending: 'border-warning/40 bg-warning/15 text-warning',
      Warning: 'border-warning/40 bg-warning/15 text-warning',
      Error: 'border-danger/40 bg-danger/15 text-danger',
      'In Review': 'border-cyan/40 bg-cyan/15 text-cyan'
    };

    return classMap[status];
  }

  priorityClasses(priority: WorkbenchPriority): string {
    const classMap: Record<WorkbenchPriority, string> = {
      Low: 'border-cyan/35 bg-cyan/10 text-cyan',
      Medium: 'border-warning/35 bg-warning/10 text-warning',
      High: 'border-danger/35 bg-danger/10 text-danger',
      Critical: 'border-danger/55 bg-danger/20 text-danger'
    };

    return classMap[priority];
  }

  metricCaptionClass(tone: KpiMetric['tone']): string {
    const classMap: Record<KpiMetric['tone'], string> = {
      neutral: 'text-cyan',
      positive: 'text-emerald',
      warning: 'text-warning',
      focus: 'text-purple',
      danger: 'text-danger'
    };

    return classMap[tone];
  }

  private ensureVisibleSelection(): void {
    const selectedId = this.selectedItemId();
    const rows = this.filteredItems();
    const selectedExists = rows.some((item) => item.id === selectedId);

    if (!selectedExists && rows.length > 0) {
      this.selectedItemId.set(rows[0].id);
    }
  }

  private priorityRank(priority: WorkbenchPriority): number {
    const rank: Record<WorkbenchPriority, number> = {
      Critical: 0,
      High: 1,
      Medium: 2,
      Low: 3
    };

    return rank[priority];
  }

  private relativeTime(minutes: number): string {
    if (minutes < 60) {
      return `${minutes} min ago`;
    }

    const hours = Math.floor(minutes / 60);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  }

  private nextStatus(status: WorkbenchStatus): WorkbenchStatus {
    const chance = Math.random();

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
}
