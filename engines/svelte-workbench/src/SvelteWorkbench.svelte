<svelte:options customElement={{ tag: 'svelte-data-workbench', shadow: 'open' }} />

<script lang="ts">
  import {
    createWorkbenchItems,
    nextStatus,
    priorityRank,
    relativeTime,
    SORT_OPTIONS,
    STATUS_FILTERS,
    type SortOption,
    type StatusFilter,
    type WorkbenchItem,
    type WorkbenchPriority,
    type WorkbenchStatus
  } from '../../shared/workbench-data';

  interface KpiMetric {
    label: string;
    value: string;
    caption: string;
  }

  let items = createWorkbenchItems();
  let searchQuery = '';
  let statusFilter: StatusFilter = 'All Status';
  let sortBy: SortOption = 'Newest';
  let selectedItemId = items[0]?.id ?? 0;
  let lastSimulated = 'No simulation yet';

  $: filteredItems = filterAndSortItems(items, searchQuery, statusFilter, sortBy);
  $: selectedItem = filteredItems.find((item) => item.id === selectedItemId) ?? filteredItems[0] ?? items[0];
  $: kpiMetrics = itemKpis(items);

  function filterAndSortItems(
    currentItems: WorkbenchItem[],
    currentSearch: string,
    currentStatus: StatusFilter,
    currentSort: SortOption
  ): WorkbenchItem[] {
    const term = currentSearch.trim().toLowerCase();

    const filtered = currentItems.filter((item) => {
      const matchesSearch =
        term.length === 0 ||
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        item.techTags.some((tag) => tag.toLowerCase().includes(term)) ||
        item.id.toString().includes(term);

      const matchesStatus = currentStatus === 'All Status' || item.status === currentStatus;

      return matchesSearch && matchesStatus;
    });

    return [...filtered].sort((a, b) => {
      if (currentSort === 'Newest') {
        return a.updatedMinutesAgo - b.updatedMinutesAgo;
      }

      if (currentSort === 'Oldest') {
        return b.updatedMinutesAgo - a.updatedMinutesAgo;
      }

      return priorityRank(a.priority) - priorityRank(b.priority);
    });
  }

  function itemKpis(currentItems: WorkbenchItem[]): KpiMetric[] {
    const active = currentItems.filter((item) => item.status === 'Active').length;
    const needsAttention = currentItems.filter((item) => item.status !== 'Active').length;
    const highPriority = currentItems.filter((item) => item.priority === 'High' || item.priority === 'Critical').length;
    const errors = currentItems.filter((item) => item.status === 'Error').length;

    return [
      { label: 'Demo Modules', value: currentItems.length.toLocaleString(), caption: 'Computed from local demo data' },
      { label: 'Active', value: active.toLocaleString(), caption: 'Status is Active' },
      { label: 'Needs Attention', value: needsAttention.toLocaleString(), caption: 'Not currently Active' },
      { label: 'High Priority', value: highPriority.toLocaleString(), caption: 'Priority High or Critical' },
      { label: 'Errors', value: errors.toLocaleString(), caption: 'Status is Error' }
    ];
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

  function simulateUpdate(): void {
    items = items.map((item) => {
      const minuteShift = Math.floor(Math.random() * 10) + 1;
      const nextMinutesAgo = Math.max(1, item.updatedMinutesAgo - minuteShift);

      return {
        ...item,
        status: nextStatus(item.status),
        updatedMinutesAgo: nextMinutesAgo,
        updatedAt: relativeTime(nextMinutesAgo)
      };
    });

    const simulatedAt = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    }).format(new Date());

    lastSimulated = `Simulated ${simulatedAt}`;
  }

  function selectItem(item: WorkbenchItem): void {
    selectedItemId = item.id;

    window.dispatchEvent(
      new CustomEvent('workbench-select', {
        detail: { engine: 'Svelte', id: item.id, name: item.name }
      })
    );
  }
</script>

<section class="engine-shell" aria-label="Svelte data workbench">
  <p class="engine-status">
    <span class="engine-dot" aria-hidden="true"></span>
    Svelte engine active
  </p>

  <div class="kpi-grid">
    {#each kpiMetrics as metric (metric.label)}
      <article class="kpi-card">
        <p class="kpi-label">{metric.label}</p>
        <p class="kpi-value">{metric.value}</p>
        <p class="kpi-caption">{metric.caption}</p>
      </article>
    {/each}
  </div>

  <div class="toolbar">
    <div class="controls">
      <label class="control">
        <span class="sr-only">Search workflows</span>
        <input
          aria-label="Search workflows"
          type="search"
          placeholder="Search workflows, categories, or tags..."
          bind:value={searchQuery}
        />
      </label>

      <label class="control">
        <span class="sr-only">Filter by status</span>
        <select aria-label="Filter by status" bind:value={statusFilter}>
          {#each STATUS_FILTERS as status}
            <option value={status}>{status}</option>
          {/each}
        </select>
      </label>

      <label class="control">
        <span class="sr-only">Sort rows</span>
        <select aria-label="Sort rows" bind:value={sortBy}>
          {#each SORT_OPTIONS as option}
            <option value={option}>Sort: {option}</option>
          {/each}
        </select>
      </label>
    </div>

    <button class="simulate-button" type="button" onclick={simulateUpdate}>
      Simulate update
      <span class="simulate-meta">{lastSimulated}</span>
    </button>
  </div>

  <div class="engine-grid">
    <div>
      <div class="mobile-list">
        {#if filteredItems.length === 0}
          <div class="empty-state">No workflows match the current filters.</div>
        {/if}

        {#each filteredItems as item (item.id)}
          <button
            aria-pressed={item.id === selectedItem?.id}
            class:selected={item.id === selectedItem?.id}
            class="mobile-row"
            type="button"
            onclick={() => selectItem(item)}
          >
            <span class="mobile-topline">
              <span>
                <span class="module-name">{item.name}</span>
                <span class="module-id">#{item.id} · {item.category}</span>
              </span>
              <span class={statusClass(item.status)}>{item.status}</span>
            </span>
            <span class="mobile-meta">
              <span>Priority: {item.priority}</span>
              <span>Updated: {item.updatedAt}</span>
            </span>
            <span class="description">{item.description}</span>
            <span class="tag-list">
              {#each item.techTags as tag}
                <span class="tag">{tag}</span>
              {/each}
            </span>
          </button>
        {/each}
      </div>

      <div class="table-shell">
        <table>
          <thead>
            <tr>
              <th style="width: 74px">ID</th>
              <th style="width: 210px">Name</th>
              <th style="width: 132px">Category</th>
              <th style="width: 112px">Status</th>
              <th style="width: 110px">Priority</th>
              <th style="width: 110px">Updated</th>
              <th style="width: 300px">Description</th>
              <th style="width: 214px">Tech tags</th>
            </tr>
          </thead>
          <tbody>
            {#if filteredItems.length === 0}
              <tr>
                <td class="empty-state-cell" colspan="8">No workflows match the current filters.</td>
              </tr>
            {/if}

            {#each filteredItems as item (item.id)}
              <tr class:selected={item.id === selectedItem?.id} class="table-row" onclick={() => selectItem(item)}>
                <td class="mono">#{item.id}</td>
                <td>
                  <button
                    aria-label={`Select workflow ${item.name}`}
                    aria-pressed={item.id === selectedItem?.id}
                    class="name-button"
                    type="button"
                    onclick={(event) => {
                      event.stopPropagation();
                      selectItem(item);
                    }}
                  >
                    {item.name}
                  </button>
                </td>
                <td>{item.category}</td>
                <td><span class={statusClass(item.status)}>{item.status}</span></td>
                <td><span class={priorityClass(item.priority)}>{item.priority}</span></td>
                <td>{item.updatedAt}</td>
                <td>{item.description}</td>
                <td>
                  <span class="tag-list">
                    {#each item.techTags as tag}
                      <span class="tag">{tag}</span>
                    {/each}
                  </span>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>

    {#if selectedItem}
      <article class="detail-card">
        <div class="detail-header">
          <div>
            <h3 class="detail-title">{selectedItem.name}</h3>
            <span class="module-id">ID: #{selectedItem.id} · {selectedItem.category}</span>
          </div>
          <span class={statusClass(selectedItem.status)}>{selectedItem.status}</span>
        </div>
        <p class="description">{selectedItem.description}</p>
        <div class="tag-list">
          {#each selectedItem.techTags as tag}
            <span class="tag">{tag}</span>
          {/each}
        </div>
        <p class="description">Last update: {selectedItem.updatedAt}</p>
      </article>
    {/if}
  </div>
</section>

<style>
  :host {
    display: block;
  }

  * {
    box-sizing: border-box;
  }

  .engine-shell {
    display: grid;
    gap: 1rem;
    color: #e5edf6;
    font-family: 'Space Grotesk', system-ui, sans-serif;
  }

  .engine-status {
    display: inline-flex;
    width: fit-content;
    align-items: center;
    gap: 0.5rem;
    border: 1px solid rgba(33, 210, 138, 0.34);
    border-radius: 0.5rem;
    background: rgba(33, 210, 138, 0.1);
    padding: 0.35rem 0.5rem;
    color: #21d28a;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .engine-dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 999px;
    background: #21d28a;
  }

  .kpi-grid {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 0.75rem;
  }

  .kpi-card,
  .toolbar,
  .table-shell,
  .detail-card,
  .mobile-row {
    border: 1px solid #1c3149;
    border-radius: 0.75rem;
    background: rgba(15, 32, 54, 0.7);
  }

  .kpi-card,
  .detail-card {
    padding: 0.875rem;
  }

  .kpi-label {
    margin: 0;
    color: #91a5bf;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .kpi-value {
    margin: 0.45rem 0 0;
    font-size: 1.5rem;
    font-weight: 700;
  }

  .kpi-caption {
    margin: 0.2rem 0 0;
    color: #47bfd9;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .toolbar {
    display: grid;
    gap: 0.75rem;
    padding: 0.75rem;
  }

  .controls {
    display: grid;
    gap: 0.5rem;
  }

  .control {
    min-width: 0;
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  input,
  select,
  button {
    font: inherit;
  }

  input,
  select {
    width: 100%;
    border: 1px solid #1c3149;
    border-radius: 0.5rem;
    background: rgba(4, 10, 20, 0.72);
    color: #e5edf6;
    padding: 0.625rem 0.75rem;
    font-size: 0.875rem;
  }

  input::placeholder {
    color: #91a5bf;
  }

  button {
    cursor: pointer;
  }

  button:focus-visible,
  input:focus-visible,
  select:focus-visible {
    outline: 2px solid rgba(71, 191, 217, 0.85);
    outline-offset: 2px;
  }

  .simulate-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border: 1px solid #1c3149;
    border-radius: 0.5rem;
    background: rgba(4, 10, 20, 0.72);
    color: #e5edf6;
    padding: 0.625rem 0.75rem;
    font-size: 0.875rem;
    transition: border-color 160ms ease, color 160ms ease;
  }

  .simulate-button:hover {
    border-color: rgba(71, 191, 217, 0.5);
    color: #47bfd9;
  }

  .simulate-meta,
  .module-id,
  .mobile-meta,
  .description {
    color: #91a5bf;
  }

  .simulate-meta,
  .module-id,
  .mobile-meta {
    font-size: 0.75rem;
  }

  .engine-grid {
    display: grid;
    gap: 1rem;
  }

  .mobile-list {
    display: grid;
    gap: 0.75rem;
  }

  .mobile-row {
    width: 100%;
    padding: 1rem;
    color: inherit;
    text-align: left;
    transition: border-color 160ms ease, background 160ms ease;
  }

  .mobile-row:hover {
    border-color: rgba(71, 191, 217, 0.4);
  }

  .mobile-row.selected,
  .table-row.selected {
    background: rgba(33, 210, 138, 0.12);
    box-shadow: inset 2px 0 0 rgba(33, 210, 138, 0.85);
  }

  .mobile-topline,
  .detail-header {
    display: flex;
    justify-content: space-between;
    gap: 0.75rem;
  }

  .mobile-topline,
  .detail-header {
    align-items: flex-start;
  }

  .module-name {
    display: block;
    color: #e5edf6;
    font-weight: 600;
  }

  .module-id {
    display: block;
    margin-top: 0.25rem;
    font-family: 'IBM Plex Mono', SFMono-Regular, Menlo, monospace;
  }

  .mobile-meta {
    display: grid;
    gap: 0.4rem;
    margin-top: 0.75rem;
  }

  .description {
    display: block;
    margin: 0.75rem 0 0;
    font-size: 0.875rem;
    line-height: 1.55;
  }

  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.375rem;
    margin-top: 0.75rem;
  }

  .tag {
    border: 1px solid #1c3149;
    border-radius: 0.375rem;
    background: rgba(4, 10, 20, 0.7);
    color: #e5edf6;
    padding: 0.25rem 0.45rem;
    font-size: 0.75rem;
    white-space: nowrap;
  }

  .table-shell {
    display: none;
    min-width: 0;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  table {
    width: 100%;
    min-width: 1240px;
    border-collapse: collapse;
    table-layout: fixed;
  }

  thead {
    border-bottom: 1px solid rgba(28, 49, 73, 0.8);
    background: rgba(4, 10, 20, 0.5);
  }

  th {
    color: #91a5bf;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    line-height: 1.35;
    padding: 0.75rem;
    text-align: left;
    text-transform: uppercase;
    white-space: nowrap;
  }

  td {
    border-bottom: 1px solid rgba(28, 49, 73, 0.5);
    color: #91a5bf;
    line-height: 1.5;
    overflow-wrap: break-word;
    padding: 0.75rem;
    vertical-align: top;
  }

  td:nth-child(1),
  td:nth-child(3),
  td:nth-child(4),
  td:nth-child(5),
  td:nth-child(6) {
    white-space: nowrap;
  }

  td .tag-list {
    margin-top: 0;
  }

  .empty-state-cell {
    color: #91a5bf;
    padding: 2rem 1rem;
    text-align: center;
  }

  .table-row {
    transition: background 160ms ease;
  }

  .table-row:hover {
    background: rgba(4, 10, 20, 0.5);
  }

  .name-button {
    border: 0;
    background: transparent;
    color: #e5edf6;
    max-width: 100%;
    overflow-wrap: break-word;
    padding: 0;
    text-align: left;
    transition: color 160ms ease;
  }

  .name-button:hover {
    color: #47bfd9;
  }

  .mono {
    font-family: 'IBM Plex Mono', SFMono-Regular, Menlo, monospace;
    font-size: 0.75rem;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    white-space: nowrap;
    border: 1px solid;
    border-radius: 999px;
    padding: 0.125rem 0.5rem;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .status-active {
    border-color: rgba(33, 210, 138, 0.4);
    background: rgba(33, 210, 138, 0.15);
    color: #21d28a;
  }

  .status-pending,
  .status-warning,
  .priority-medium {
    border-color: rgba(231, 184, 90, 0.4);
    background: rgba(231, 184, 90, 0.15);
    color: #e7b85a;
  }

  .status-error,
  .priority-high,
  .priority-critical {
    border-color: rgba(244, 111, 111, 0.45);
    background: rgba(244, 111, 111, 0.15);
    color: #f46f6f;
  }

  .status-in-review,
  .priority-low {
    border-color: rgba(71, 191, 217, 0.4);
    background: rgba(71, 191, 217, 0.15);
    color: #47bfd9;
  }

  .priority-critical {
    background: rgba(244, 111, 111, 0.22);
  }

  .detail-card {
    min-width: 0;
  }

  .detail-title {
    margin: 0;
    color: #e5edf6;
    font-size: 1.125rem;
    overflow-wrap: break-word;
  }

  .empty-state {
    border: 1px solid #1c3149;
    border-radius: 0.75rem;
    background: rgba(15, 32, 54, 0.7);
    color: #91a5bf;
    padding: 2rem 1rem;
    text-align: center;
  }

  @media (min-width: 640px) {
    .kpi-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .controls {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (min-width: 768px) {
    .mobile-list {
      display: none;
    }

    .table-shell {
      display: block;
    }
  }

  @media (min-width: 1024px) {
    .toolbar {
      grid-template-columns: minmax(0, 1fr) auto;
      align-items: center;
    }

    .controls {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @media (min-width: 1280px) {
    .kpi-grid {
      grid-template-columns: repeat(5, minmax(0, 1fr));
    }
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      transition-duration: 0.001ms !important;
    }
  }
</style>
