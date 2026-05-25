<svelte:options customElement={{ tag: 'svelte-data-workbench', shadow: 'none' }} />

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
    tone: 'neutral' | 'positive' | 'warning' | 'focus' | 'danger';
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
      { label: 'Demo Modules', value: currentItems.length.toLocaleString(), caption: 'Computed from local demo data', tone: 'neutral' },
      { label: 'Active', value: active.toLocaleString(), caption: 'Status is Active', tone: 'positive' },
      { label: 'Needs Attention', value: needsAttention.toLocaleString(), caption: 'Not currently Active', tone: 'warning' },
      { label: 'High Priority', value: highPriority.toLocaleString(), caption: 'Priority High or Critical', tone: 'focus' },
      { label: 'Errors', value: errors.toLocaleString(), caption: 'Status is Error', tone: 'danger' }
    ];
  }

  function simulateUpdate(): void {
    const refreshed = items.map((item) => {
      const minuteShift = Math.floor(Math.random() * 10) + 1;
      const nextMinutesAgo = Math.max(1, item.updatedMinutesAgo - minuteShift);

      return {
        ...item,
        status: nextStatus(item.status),
        updatedMinutesAgo: nextMinutesAgo,
        updatedAt: relativeTime(nextMinutesAgo)
      };
    });

    items = refreshed;

    const simulatedAt = new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit'
    }).format(new Date());

    lastSimulated = `Simulated ${simulatedAt}`;
  }

  function selectItem(item: WorkbenchItem): void {
    selectedItemId = item.id;
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('workbench-select', {
          detail: { engine: 'Svelte', id: item.id, name: item.name }
        })
      );
    }
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
</script>

<div class="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
  {#each kpiMetrics as metric (metric.label)}
    <article class="rounded-xl border border-border-soft bg-bg-soft/70 p-3.5">
      <p class="text-xs uppercase tracking-[0.1em] text-text-muted">{metric.label}</p>
      <p class="mt-2 text-2xl font-semibold">{metric.value}</p>
      <p class="mt-1 text-xs font-medium {metricCaptionClass(metric.tone)}">{metric.caption}</p>
    </article>
  {/each}
</div>

<div class="mt-4 flex flex-col gap-3 rounded-xl border border-border-soft bg-bg-soft/60 p-3 lg:flex-row lg:items-center lg:justify-between">
  <div class="grid flex-1 gap-2 sm:grid-cols-2 xl:grid-cols-3">
    <label class="relative block">
      <span class="sr-only">Search modules</span>
      <input
        type="search"
        class="w-full rounded-lg border border-border-soft bg-bg-main/70 px-3 py-2 text-sm text-text-main placeholder:text-text-muted focus:border-cyan/60 focus:outline-none"
        placeholder="Search workflows, categories, or tags..."
        bind:value={searchQuery}
      />
    </label>

    <label class="block">
      <span class="sr-only">Filter by status</span>
      <select
        class="w-full rounded-lg border border-border-soft bg-bg-main/70 px-3 py-2 text-sm text-text-main focus:border-cyan/60 focus:outline-none"
        bind:value={statusFilter}
      >
        {#each STATUS_FILTERS as status}
          <option value={status}>{status}</option>
        {/each}
      </select>
    </label>

    <label class="block">
      <span class="sr-only">Sort rows</span>
      <select
        class="w-full rounded-lg border border-border-soft bg-bg-main/70 px-3 py-2 text-sm text-text-main focus:border-cyan/60 focus:outline-none"
        bind:value={sortBy}
      >
        {#each SORT_OPTIONS as option}
          <option value={option}>Sort: {option}</option>
        {/each}
      </select>
    </label>
  </div>

  <button
    type="button"
    class="inline-flex items-center justify-center gap-2 rounded-lg border border-border-soft bg-bg-main/70 px-3 py-2 text-sm text-text-main transition hover:border-cyan/50 hover:text-cyan focus:outline-none"
    on:click={simulateUpdate}
  >
    <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.8">
      <path d="M20 12a8 8 0 1 1-2.343-5.657M20 4v5h-5"></path>
    </svg>
    Simulate update
    <span class="text-xs text-text-muted">{lastSimulated}</span>
  </button>
</div>

<div class="mt-4 flex flex-col gap-4 lg:flex-row lg:items-start lg:h-[500px]">

  <!-- Left: list/table -->
  <div class="flex flex-col min-w-0 flex-1 lg:h-full lg:overflow-hidden">

    <!-- Mobile card list -->
    <div class="space-y-3 md:hidden">
      {#if filteredItems.length === 0}
        <div class="rounded-xl border border-border-soft bg-bg-soft/60 px-4 py-8 text-center text-sm text-text-muted">
          No workflows match the current filters.
        </div>
      {/if}
      {#each filteredItems as item (item.id)}
        <button
          type="button"
          class="w-full rounded-xl border p-4 text-left transition {item.id === selectedItem.id ? 'border-border-active bg-svelte/12 shadow-[inset_2px_0_0_0_rgba(255,62,0,0.85)]' : 'border-border-soft bg-bg-soft/60 hover:border-cyan/40'}"
          on:click={() => selectItem(item)}
        >
          <span class="flex items-start justify-between gap-3">
            <span>
              <span class="block font-medium text-text-main">{item.name}</span>
              <span class="mt-1 block font-mono text-xs text-text-muted">#{item.id} · {item.category}</span>
            </span>
            <span class="inline-flex rounded-full border px-2 py-0.5 text-xs font-medium {statusClasses(item.status)}">
              {item.status}
            </span>
          </span>
          <span class="mt-3 grid gap-2 text-xs text-text-muted">
            <span>Priority: {item.priority}</span>
            <span>Updated: {item.updatedAt}</span>
          </span>
          <span class="mt-3 block text-sm leading-relaxed text-text-muted">{item.description}</span>
          <span class="mt-3 flex flex-wrap gap-2">
            {#each item.techTags as tag}
              <span class="rounded-md border border-border-soft bg-bg-main/70 px-2 py-1 text-xs text-text-main">
                {tag}
              </span>
            {/each}
          </span>
        </button>
      {/each}
    </div>

    <!-- Desktop table - ID, Name, Status, Updated only -->
    <div class="hidden rounded-xl border border-border-soft bg-bg-soft/60 md:flex md:flex-col lg:flex-1 lg:overflow-hidden">
      <!-- Table header -->
      <div class="grid grid-cols-[74px_1fr_120px_120px] gap-4 border-b border-border-soft/80 bg-bg-main/50 px-3 py-2.5 text-xs font-medium uppercase tracking-[0.08em] text-text-muted">
        <div>ID</div>
        <div>Name</div>
        <div>Status</div>
        <div class="text-right">Updated</div>
      </div>
      <!-- Table body -->
      <div class="flex flex-col lg:flex-1 lg:overflow-y-auto">
        {#if filteredItems.length === 0}
          <div class="px-4 py-8 text-center text-sm text-text-muted">
            No workflows match the current filters.
          </div>
        {/if}
        {#each filteredItems as item (item.id)}
          <div
            role="button"
            tabindex="0"
            class="grid grid-cols-[74px_1fr_120px_120px] cursor-pointer items-center gap-4 border-b border-border-soft/50 px-3 py-3 text-sm transition {item.id !== selectedItem.id ? 'hover:bg-bg-main/50' : ''}"
            style={item.id === selectedItem.id ? "box-shadow: inset 2px 0 0 0 rgba(255, 62, 0, 0.85); background-color: rgba(255, 62, 0, 0.08);" : ""}
            on:click={() => selectItem(item)}
            on:keydown={(e) => { if(e.key === 'Enter') selectItem(item); }}
          >
            <div class="font-mono text-xs text-text-muted">#{item.id}</div>
            <div class="min-w-0">
              <span class="block font-medium text-text-main truncate">{item.name}</span>
              <span class="block font-mono text-xs text-text-muted mt-0.5 truncate">{item.category}</span>
            </div>
            <div>
              <span class="inline-flex rounded-full border px-2 py-0.5 text-xs font-medium {statusClasses(item.status)}">
                {item.status}
              </span>
            </div>
            <div class="text-right text-xs text-text-muted whitespace-nowrap">{item.updatedAt}</div>
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- Right: detail panel (visible when a row is selected) -->
  {#if selectedItem}
    <aside class="w-full overflow-hidden rounded-xl border border-border-soft bg-bg-soft/70 lg:w-72 lg:flex-shrink-0 lg:h-full lg:overflow-y-auto">
      <div class="h-0.5 w-full bg-[#FF3E00]"></div>
      <div class="p-5">
        <h3 class="text-lg font-semibold text-text-main">{selectedItem.name}</h3>

        <div class="mt-2 flex items-center justify-between border-b border-border-soft pb-4 mb-5">
          <span class="font-mono text-xs text-text-muted">ID: #{selectedItem.id}</span>
          <span class="inline-flex rounded-full border px-2 py-0.5 text-xs font-medium {statusClasses(selectedItem.status)}">
            {selectedItem.status}
          </span>
        </div>

        <div class="space-y-5">
          <div>
            <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">Description</p>
            <p class="text-sm leading-relaxed text-text-main">{selectedItem.description}</p>
          </div>

          <div>
            <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">Tech</p>
            <div class="flex flex-wrap gap-2">
              {#each selectedItem.techTags as tag}
                <span class="rounded-md border border-border-soft bg-bg-main/70 px-2 py-1 text-xs text-text-main">
                  {tag}
                </span>
              {/each}
            </div>
          </div>

          <div>
            <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">Priority</p>
            <span class="inline-flex rounded-full border px-2 py-0.5 text-xs font-medium {priorityClasses(selectedItem.priority)}">
              {selectedItem.priority}
            </span>
          </div>

          <div>
            <p class="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">Last Update</p>
            <p class="text-sm text-text-main">{selectedItem.updatedAt}</p>
          </div>
        </div>
      </div>
    </aside>
  {/if}
</div>
