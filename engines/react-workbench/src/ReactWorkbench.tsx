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

type KpiTone = 'neutral' | 'positive' | 'warning' | 'danger';

interface KpiMetric {
  label: string;
  value: string;
  caption: string;
  tone: KpiTone;
}

function statusClass(status: WorkbenchStatus): string {
  const classMap: Record<WorkbenchStatus, string> = {
    Active: 'status-active',
    Pending: 'status-pending',
    Warning: 'status-warning',
    Error: 'status-error',
    'In Review': 'status-in-review'
  };

  return `badge ${classMap[status]}`;
}

function priorityClass(priority: WorkbenchPriority): string {
  const classMap: Record<WorkbenchPriority, string> = {
    Low: 'priority-low',
    Medium: 'priority-medium',
    High: 'priority-high',
    Critical: 'priority-critical'
  };

  return `badge ${classMap[priority]}`;
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
  const waiting = items.filter((item) => item.status === 'Pending' || item.status === 'In Review').length;
  const needsAttention = items.filter((item) => item.status === 'Warning' || item.status === 'Error').length;

  return [
    { label: 'Demo Modules', value: items.length.toLocaleString(), caption: 'Local mock rows', tone: 'neutral' },
    { label: 'Active Rows', value: active.toLocaleString(), caption: 'Derived from mock data', tone: 'positive' },
    { label: 'Waiting Rows', value: waiting.toLocaleString(), caption: 'Pending or in review', tone: 'warning' },
    {
      label: 'Needs Attention',
      value: needsAttention.toLocaleString(),
      caption: 'Warning or error rows',
      tone: 'danger'
    }
  ];
}

export function ReactWorkbench() {
  const [items, setItems] = useState<WorkbenchItem[]>(() => createWorkbenchItems());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('All Status');
  const [sortBy, setSortBy] = useState<SortOption>('Newest');
  const [selectedItemId, setSelectedItemId] = useState(items[0]?.id ?? 0);
  const [lastSimulated, setLastSimulated] = useState('Not simulated yet');

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
    <section className="engine-shell" aria-label="React data workbench">
      <p className="engine-status">
        <span className="engine-dot" aria-hidden="true" />
        React engine active
      </p>

      <div className="kpi-grid">
        {kpiMetrics.map((metric) => (
          <article className="kpi-card" key={metric.label}>
            <p className="kpi-label">{metric.label}</p>
            <p className="kpi-value">{metric.value}</p>
            <p className="kpi-caption">{metric.caption}</p>
          </article>
        ))}
      </div>

      <div className="toolbar">
        <div className="controls">
          <label className="control">
            <span className="sr-only">Search modules</span>
            <input
              aria-label="Search modules"
              type="search"
              placeholder="Search modules..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </label>

          <label className="control">
            <span className="sr-only">Filter by status</span>
            <select
              aria-label="Filter by status"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
            >
              {STATUS_FILTERS.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>

          <label className="control">
            <span className="sr-only">Sort rows</span>
            <select aria-label="Sort rows" value={sortBy} onChange={(event) => setSortBy(event.target.value as SortOption)}>
              {SORT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  Sort: {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button className="simulate-button" type="button" onClick={simulateUpdate}>
          Simulate update
          <span className="simulate-meta">{lastSimulated}</span>
        </button>
      </div>

      <div className="engine-grid">
        <div>
          <div className="mobile-list">
            {filteredItems.length === 0 ? <div className="empty-state">No modules match the current filters.</div> : null}
            {filteredItems.map((item) => (
              <button
                aria-pressed={item.id === selectedItem?.id}
                className={`mobile-row ${item.id === selectedItem?.id ? 'selected' : ''}`}
                key={item.id}
                onClick={() => selectItem(item)}
                type="button"
              >
                <span className="mobile-topline">
                  <span>
                    <span className="module-name">{item.name}</span>
                    <span className="module-id">#{item.id}</span>
                  </span>
                  <span className={statusClass(item.status)}>{item.status}</span>
                </span>
                <span className="mobile-meta">
                  <span>Priority: {item.priority}</span>
                  <span>Updated: {item.updatedAt}</span>
                </span>
                <span className="description">{item.description}</span>
                <span className="tag-list">
                  {item.techTags.map((tag) => (
                    <span className="tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </span>
              </button>
            ))}
          </div>

          <div className="table-shell">
            <table>
              <thead>
                <tr>
                  <th style={{ width: '74px' }}>ID</th>
                  <th style={{ width: '190px' }}>Name</th>
                  <th style={{ width: '112px' }}>Status</th>
                  <th style={{ width: '110px' }}>Priority</th>
                  <th style={{ width: '110px' }}>Updated</th>
                  <th style={{ width: '310px' }}>Description</th>
                  <th style={{ width: '214px' }}>Tech tags</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length === 0 ? (
                  <tr>
                    <td className="empty-state-cell" colSpan={7}>
                      No modules match the current filters.
                    </td>
                  </tr>
                ) : null}
                {filteredItems.map((item) => (
                  <tr
                    className={`table-row ${item.id === selectedItem?.id ? 'selected' : ''}`}
                    key={item.id}
                    onClick={() => selectItem(item)}
                  >
                    <td className="mono">#{item.id}</td>
                    <td>
                      <button
                        aria-label={`Select module ${item.name}`}
                        aria-pressed={item.id === selectedItem?.id}
                        className="name-button"
                        onClick={(event) => {
                          event.stopPropagation();
                          selectItem(item);
                        }}
                        type="button"
                      >
                        {item.name}
                      </button>
                    </td>
                    <td>
                      <span className={statusClass(item.status)}>{item.status}</span>
                    </td>
                    <td>
                      <span className={priorityClass(item.priority)}>{item.priority}</span>
                    </td>
                    <td>{item.updatedAt}</td>
                    <td>{item.description}</td>
                    <td>
                      <span className="tag-list">
                        {item.techTags.map((tag) => (
                          <span className="tag" key={tag}>
                            {tag}
                          </span>
                        ))}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {selectedItem ? (
          <article className="detail-card">
            <div className="detail-header">
              <div>
                <h3 className="detail-title">{selectedItem.name}</h3>
                <span className="module-id">ID: #{selectedItem.id}</span>
              </div>
              <span className={statusClass(selectedItem.status)}>{selectedItem.status}</span>
            </div>
            <p className="description">{selectedItem.description}</p>
            <div className="tag-list">
              {selectedItem.techTags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            <p className="description">Last update: {selectedItem.updatedAt}</p>
          </article>
        ) : null}
      </div>
    </section>
  );
}
