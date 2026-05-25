import { useMemo, useState } from 'react';

import {
  createWorkbenchItems,
  nextStatus,
  priorityRank,
  relativeTime,
  SORT_OPTIONS,
  STATUS_FILTERS,
  SortOption,
  StatusFilter,
  WorkbenchItem,
  WorkbenchPriority,
  WorkbenchStatus
} from '../../shared/workbench-data';

interface KpiMetric {
  label: string;
  value: string;
  caption: string;
  tone: 'neutral' | 'positive' | 'warning' | 'focus' | 'danger';
}

function statusClasses(status: WorkbenchStatus): string {
  const classMap: Record<WorkbenchStatus, string> = {
    Active: 'border-emerald/40 bg-emerald/15 text-emerald',
    Pending: 'border-warning/40 bg-warning/15 text-warning',
    Warning: 'border-warning/40 bg-warning/15 text-warning',
    Error: 'border-danger/40 bg-danger/15 text-danger',
    'In Review': 'border-cyan/40 bg-cyan/15 text-cyan'
  };

  return classMap[status];
}

function priorityClasses(priority: WorkbenchPriority): string {
  const classMap: Record<WorkbenchPriority, string> = {
    Low: 'border-cyan/35 bg-cyan/10 text-cyan',
    Medium: 'border-warning/35 bg-warning/10 text-warning',
    High: 'border-danger/35 bg-danger/10 text-danger',
    Critical: 'border-danger/55 bg-danger/20 text-danger'
  };

  return classMap[priority];
}

function metricCaptionClass(tone: KpiMetric['tone']): string {
  const classMap: Record<KpiMetric['tone'], string> = {
    neutral: 'text-cyan',
    positive: 'text-emerald',
    warning: 'text-warning',
    focus: 'text-purple',
    danger: 'text-danger'
  };

  return classMap[tone];
}

function filterAndSortItems(
  items: WorkbenchItem[],
  searchQuery: string,
  statusFilter: StatusFilter,
  sortBy: SortOption
): WorkbenchItem[] {
  const term = searchQuery.trim().toLowerCase();

  const filtered = items.filter((item) => {
    const matchesSearch =
      term.length === 0 ||
      item.name.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term) ||
      item.techTags.some((tag) => tag.toLowerCase().includes(term)) ||
      item.id.toString().includes(term);

    const matchesStatus = statusFilter === 'All Status' || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return [...filtered].sort((a, b) => {
    if (sortBy === 'Newest') {
      return a.updatedMinutesAgo - b.updatedMinutesAgo;
    }

    if (sortBy === 'Oldest') {
      return b.updatedMinutesAgo - a.updatedMinutesAgo;
    }

    return priorityRank(a.priority) - priorityRank(b.priority);
  });
}

function itemKpis(items: WorkbenchItem[]): KpiMetric[] {
  const active = items.filter((item) => item.status === 'Active').length;
  const needsAttention = items.filter((item) => item.status !== 'Active').length;
  const highPriority = items.filter((item) => item.priority === 'High' || item.priority === 'Critical').length;
  const errors = items.filter((item) => item.status === 'Error').length;

  return [
    { label: 'Demo Modules', value: items.length.toLocaleString(), caption: 'Computed from local demo data', tone: 'neutral' },
    { label: 'Active', value: active.toLocaleString(), caption: 'Status is Active', tone: 'positive' },
    { label: 'Needs Attention', value: needsAttention.toLocaleString(), caption: 'Not currently Active', tone: 'warning' },
    { label: 'High Priority', value: highPriority.toLocaleString(), caption: 'Priority High or Critical', tone: 'focus' },
    { label: 'Errors', value: errors.toLocaleString(), caption: 'Status is Error', tone: 'danger' }
  ];
}

function StatusBadge({ label, classes }: { label: string; classes: string }) {
  return (
    <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${classes}`}>
      {label}
    </span>
  );
}

export function ReactWorkbench() {
  const [items, setItems] = useState<WorkbenchItem[]>(() => createWorkbenchItems());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All Status');
  const [sortBy, setSortBy] = useState<SortOption>('Newest');
  const [selectedItemId, setSelectedItemId] = useState(items[0]?.id ?? 0);
  const [lastSimulated, setLastSimulated] = useState('No simulation yet');

  const filteredItems = useMemo(
    () => filterAndSortItems(items, searchQuery, statusFilter, sortBy),
    [items, searchQuery, statusFilter, sortBy]
  );

  const selectedItem = useMemo(
    () => filteredItems.find((item) => item.id === selectedItemId) ?? filteredItems[0] ?? items[0],
    [filteredItems, items, selectedItemId]
  );

  const kpiMetrics = useMemo(() => itemKpis(items), [items]);

  function simulateUpdate(): void {
    setItems((currentItems) =>
      currentItems.map((item) => {
        const minuteShift = Math.floor(Math.random() * 10) + 1;
        const nextMinutesAgo = Math.max(1, item.updatedMinutesAgo - minuteShift);

        return {
          ...item,
          status: nextStatus(item.status),
          updatedMinutesAgo: nextMinutesAgo,
          updatedAt: relativeTime(nextMinutesAgo)
        };
      })
    );

    const simulatedAt = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    }).format(new Date());

    setLastSimulated(`Simulated ${simulatedAt}`);
  }

  function selectItem(item: WorkbenchItem): void {
    setSelectedItemId(item.id);

    window.dispatchEvent(
      new CustomEvent('workbench-select', {
        detail: { engine: 'React', id: item.id, name: item.name }
      })
    );
  }

  return (
    <>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        {kpiMetrics.map((metric) => (
          <article key={metric.label} className="rounded-xl border border-border-soft bg-bg-soft/70 p-3.5">
            <p className="text-xs uppercase tracking-[0.1em] text-text-muted">{metric.label}</p>
            <p className="mt-2 text-2xl font-semibold">{metric.value}</p>
            <p className={`mt-1 text-xs font-medium ${metricCaptionClass(metric.tone)}`}>{metric.caption}</p>
          </article>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-3 rounded-xl border border-border-soft bg-bg-soft/60 p-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="grid flex-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
          <label className="relative block">
            <span className="sr-only">Search modules</span>
            <input
              type="search"
              className="w-full rounded-lg border border-border-soft bg-bg-main/70 px-3 py-2 text-sm text-text-main placeholder:text-text-muted focus:border-cyan/60 focus:outline-none"
              placeholder="Search workflows, categories, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </label>

          <label className="block">
            <span className="sr-only">Filter by status</span>
            <select
              className="w-full rounded-lg border border-border-soft bg-bg-main/70 px-3 py-2 text-sm text-text-main focus:border-cyan/60 focus:outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            >
              {STATUS_FILTERS.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="sr-only">Sort rows</span>
            <select
              className="w-full rounded-lg border border-border-soft bg-bg-main/70 px-3 py-2 text-sm text-text-main focus:border-cyan/60 focus:outline-none"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option} value={option}>Sort: {option}</option>
              ))}
            </select>
          </label>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-border-soft bg-bg-main/70 px-3 py-2 text-sm text-text-main transition hover:border-cyan/50 hover:text-cyan focus:outline-none"
          onClick={simulateUpdate}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M20 12a8 8 0 1 1-2.343-5.657M20 4v5h-5"></path>
          </svg>
          Simulate update
          <span className="text-xs text-text-muted">{lastSimulated}</span>
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:h-[500px]">

        {/* Left: list/table */}
        <div className="flex flex-col min-w-0 flex-1 lg:h-full lg:overflow-hidden">

          {/* Mobile card list */}
          <div className="space-y-3 md:hidden">
            {filteredItems.length === 0 && (
              <div className="rounded-xl border border-border-soft bg-bg-soft/60 px-4 py-8 text-center text-sm text-text-muted">
                No workflows match the current filters.
              </div>
            )}
            {filteredItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`w-full rounded-xl border p-4 text-left transition ${
                  item.id === selectedItem.id
                    ? 'border-border-active bg-cyan/12 shadow-[inset_2px_0_0_0_rgba(14,165,233,0.85)]'
                    : 'border-border-soft bg-bg-soft/60 hover:border-cyan/40'
                }`}
                onClick={() => selectItem(item)}
              >
                <span className="flex items-start justify-between gap-3">
                  <span>
                    <span className="block font-medium text-text-main">{item.name}</span>
                    <span className="mt-1 block font-mono text-xs text-text-muted">#{item.id} · {item.category}</span>
                  </span>
                  <StatusBadge label={item.status} classes={statusClasses(item.status)} />
                </span>
                <span className="mt-3 grid gap-2 text-xs text-text-muted">
                  <span>Priority: {item.priority}</span>
                  <span>Updated: {item.updatedAt}</span>
                </span>
                <span className="mt-3 block text-sm leading-relaxed text-text-muted">{item.description}</span>
                <span className="mt-3 flex flex-wrap gap-2">
                  {item.techTags.map((tag) => (
                    <span key={tag} className="rounded-md border border-border-soft bg-bg-main/70 px-2 py-1 text-xs text-text-main">
                      {tag}
                    </span>
                  ))}
                </span>
              </button>
            ))}
          </div>

          {/* Desktop table - ID, Name, Status, Updated only */}
          <div className="hidden rounded-xl border border-border-soft bg-bg-soft/60 md:flex md:flex-col lg:flex-1 lg:overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[74px_1fr_120px_120px] gap-4 border-b border-border-soft/80 bg-bg-main/50 px-3 py-2.5 text-xs font-medium uppercase tracking-[0.08em] text-text-muted">
              <div>ID</div>
              <div>Name</div>
              <div>Status</div>
              <div className="text-right">Updated</div>
            </div>
            {/* Table body */}
            <div className="flex flex-col lg:flex-1 lg:overflow-y-auto">
              {filteredItems.length === 0 && (
                <div className="px-4 py-8 text-center text-sm text-text-muted">
                  No workflows match the current filters.
                </div>
              )}
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`grid grid-cols-[74px_1fr_120px_120px] cursor-pointer items-center gap-4 border-b border-border-soft/50 px-3 py-3 text-sm transition ${
                    item.id !== selectedItem.id ? 'hover:bg-bg-main/50' : ''
                  }`}
                  style={item.id === selectedItem.id ? {
                    boxShadow: 'inset 2px 0 0 0 rgba(14, 165, 233, 0.85)',
                    backgroundColor: 'rgba(14, 165, 233, 0.08)'
                  } : {}}
                  onClick={() => selectItem(item)}
                >
                  <div className="font-mono text-xs text-text-muted">#{item.id}</div>
                  <div className="min-w-0">
                    <span className="block font-medium text-text-main truncate">{item.name}</span>
                    <span className="block font-mono text-xs text-text-muted mt-0.5 truncate">{item.category}</span>
                  </div>
                  <div>
                    <StatusBadge label={item.status} classes={statusClasses(item.status)} />
                  </div>
                  <div className="text-right text-xs text-text-muted whitespace-nowrap">{item.updatedAt}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: detail panel (visible when a row is selected) */}
        {selectedItem && (
          <aside className="w-full overflow-hidden rounded-xl border border-border-soft bg-bg-soft/70 lg:w-72 lg:flex-shrink-0 lg:h-full lg:overflow-y-auto">
            <div className="h-0.5 w-full bg-[#0EA5E9]"></div>
            <div className="p-5">
              <h3 className="text-lg font-semibold text-text-main">{selectedItem.name}</h3>

              <div className="mt-2 flex items-center justify-between border-b border-border-soft pb-4 mb-5">
                <span className="font-mono text-xs text-text-muted">ID: #{selectedItem.id}</span>
                <StatusBadge label={selectedItem.status} classes={statusClasses(selectedItem.status)} />
              </div>

              <div className="space-y-5">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">Description</p>
                  <p className="text-sm leading-relaxed text-text-main">{selectedItem.description}</p>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">Tech</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.techTags.map((tag) => (
                      <span key={tag} className="rounded-md border border-border-soft bg-bg-main/70 px-2 py-1 text-xs text-text-main">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">Priority</p>
                  <StatusBadge label={selectedItem.priority} classes={priorityClasses(selectedItem.priority)} />
                </div>

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">Last Update</p>
                  <p className="text-sm text-text-main">{selectedItem.updatedAt}</p>
                </div>
              </div>
            </div>
          </aside>
        )}
      </div>
    </>
  );
}
