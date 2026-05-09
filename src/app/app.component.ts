import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  CONTEXT_TABS,
  ENGINE_CONTEXTS,
  FRAMEWORK_ENGINES,
  NAV_ITEMS,
  PRINCIPLE_CARDS,
  SORT_OPTIONS,
  STATUS_FILTERS,
  SYSTEMS_IN_PROGRESS,
  TECH_PROFILE_GROUPS,
  WORKBENCH_ITEMS
} from './core/data/portfolio.data';
import {
  ContextTab,
  FrameworkEngine,
  NavIcon,
  NavSectionId,
  WorkbenchItem,
  WorkbenchPriority,
  WorkbenchStatus
} from './core/models/portfolio.model';

type SortOption = (typeof SORT_OPTIONS)[number];
type KpiTone = 'neutral' | 'positive' | 'warning' | 'danger';
type ExternalWorkbenchEngine = Exclude<FrameworkEngine, 'Angular'>;
type EngineLoadState = 'idle' | 'loading' | 'ready' | 'error';

interface KpiMetric {
  label: string;
  value: string;
  caption: string;
  tone: KpiTone;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {
  @ViewChild('externalEngineHost') private externalEngineHost?: ElementRef<HTMLElement>;

  readonly githubUrl = 'https://github.com/sad1kul';
  readonly linkedInUrl = 'https://www.linkedin.com/in/sadikul-islam-553a2669/';
  readonly cvUrl = '/assets/Sadikul-Islam-CV.pdf';
  readonly emailAddress = 'your-email@example.com';

  readonly navItems = NAV_ITEMS;
  readonly engines = FRAMEWORK_ENGINES;
  readonly statusFilters = STATUS_FILTERS;
  readonly sortOptions = SORT_OPTIONS;
  readonly principles = PRINCIPLE_CARDS;
  readonly techProfileGroups = TECH_PROFILE_GROUPS;
  readonly progressSystems = SYSTEMS_IN_PROGRESS;
  readonly contextTabs = CONTEXT_TABS;
  readonly engineContexts = ENGINE_CONTEXTS;

  readonly items = signal<WorkbenchItem[]>(WORKBENCH_ITEMS.map((item) => ({ ...item })));
  readonly mobileMenuOpen = signal(false);
  readonly activeSection = signal<NavSectionId>('overview');
  readonly activeFramework = signal<FrameworkEngine>('Angular');
  readonly searchQuery = signal('');
  readonly statusFilter = signal<'All Status' | WorkbenchStatus>('All Status');
  readonly sortBy = signal<SortOption>('Newest');
  readonly selectedItemId = signal<number>(WORKBENCH_ITEMS[0]?.id ?? 0);
  readonly activeContextTab = signal<ContextTab>('Source Code');
  readonly copyState = signal<'ready' | 'copied'>('ready');
  readonly lastRefreshed = signal('Not simulated yet');
  readonly engineLoadState = signal<EngineLoadState>('idle');
  readonly engineError = signal('');

  private readonly engineScriptConfig = {
    React: { src: '/engines/react-workbench.js', tagName: 'react-data-workbench' },
    Svelte: { src: '/engines/svelte-workbench.js', tagName: 'svelte-data-workbench' }
  } satisfies Record<ExternalWorkbenchEngine, { src: string; tagName: string }>;

  private readonly engineScriptPromises = new Map<ExternalWorkbenchEngine, Promise<void>>();

  readonly kpiMetrics = computed<KpiMetric[]>(() => {
    const currentItems = this.items();
    const active = currentItems.filter((item) => item.status === 'Active').length;
    const pending = currentItems.filter(
      (item) => item.status === 'Pending' || item.status === 'In Review'
    ).length;
    const errors = currentItems.filter(
      (item) => item.status === 'Error' || item.status === 'Warning'
    ).length;

    return [
      { label: 'Demo Modules', value: currentItems.length.toLocaleString(), caption: 'Local mock rows', tone: 'neutral' },
      { label: 'Active Rows', value: active.toLocaleString(), caption: 'Derived from mock data', tone: 'positive' },
      { label: 'Waiting Rows', value: pending.toLocaleString(), caption: 'Pending or in review', tone: 'warning' },
      { label: 'Needs Attention', value: errors.toLocaleString(), caption: 'Warning or error rows', tone: 'danger' }
    ];
  });

  readonly filteredItems = computed(() => {
    const term = this.searchQuery().trim().toLowerCase();
    const status = this.statusFilter();
    const sort = this.sortBy();

    let filtered = this.items().filter((item) => {
      const matchesSearch =
        term.length === 0 ||
        item.name.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.techTags.some((tag) => tag.toLowerCase().includes(term)) ||
        item.id.toString().includes(term);

      const matchesStatus = status === 'All Status' || item.status === status;

      return matchesSearch && matchesStatus;
    });

    filtered = [...filtered].sort((a, b) => {
      if (sort === 'Newest') {
        return a.updatedMinutesAgo - b.updatedMinutesAgo;
      }

      if (sort === 'Oldest') {
        return b.updatedMinutesAgo - a.updatedMinutesAgo;
      }

      return this.priorityRank(a.priority) - this.priorityRank(b.priority);
    });

    return filtered;
  });

  readonly selectedItem = computed(() => {
    const rows = this.filteredItems();

    return rows.find((item) => item.id === this.selectedItemId()) ?? rows[0] ?? this.items()[0];
  });

  readonly activeEngineContext = computed(() => this.engineContexts[this.activeFramework()]);
  readonly activeSourceSample = computed(() => this.activeEngineContext().source);
  readonly activeStateNotes = computed(() => this.activeEngineContext().stateNotes);
  readonly activeArchitectureNotes = computed(() => this.activeEngineContext().architectureNotes);
  readonly activeStrengths = computed(() => this.activeEngineContext().strengths);
  readonly activeTradeoffs = computed(() => this.activeEngineContext().tradeoffs);
  readonly activeComparedFrameworkNotes = computed(() => this.activeEngineContext().comparedFrameworkNotes);

  ngAfterViewInit(): void {
    const currentEngine = this.activeFramework();

    if (currentEngine !== 'Angular') {
      this.mountExternalEngineSoon(currentEngine);
    }
  }

  setActiveSection(section: NavSectionId): void {
    this.activeSection.set(section);
    this.mobileMenuOpen.set(false);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((value) => !value);
  }

  setFramework(engine: FrameworkEngine): void {
    this.activeFramework.set(engine);
    this.activeContextTab.set('Source Code');
    this.copyState.set('ready');

    if (engine === 'Angular') {
      this.engineLoadState.set('idle');
      this.engineError.set('');
      this.clearExternalEngineHost();
      return;
    }

    this.mountExternalEngineSoon(engine);
  }

  setSearchQuery(value: string): void {
    this.searchQuery.set(value);
    this.ensureVisibleSelection();
  }

  setStatusFilter(value: string): void {
    this.statusFilter.set(value as 'All Status' | WorkbenchStatus);
    this.ensureVisibleSelection();
  }

  setSort(value: string): void {
    this.sortBy.set(value as SortOption);
    this.ensureVisibleSelection();
  }

  selectItem(id: number): void {
    this.selectedItemId.set(id);
  }

  setContextTab(tab: ContextTab): void {
    this.activeContextTab.set(tab);
  }

  contextTabId(tab: ContextTab): string {
    return `context-tab-${this.contextSlug(tab)}`;
  }

  contextPanelId(tab: ContextTab): string {
    return `context-panel-${this.contextSlug(tab)}`;
  }

  scrollToSection(section: NavSectionId): void {
    this.activeSection.set(section);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async copySourceCode(): Promise<void> {
    if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
      return;
    }

    await navigator.clipboard.writeText(this.plainCodeSample());
    this.copyState.set('copied');

    setTimeout(() => this.copyState.set('ready'), 1800);
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

  navIconPath(icon: NavIcon): string {
    const iconMap: Record<NavIcon, string> = {
      overview: 'M3 10.4 12 3l9 7.4v9.6a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
      workbench:
        'M5 5h14M5 12h14M5 19h14M8 5v14M16 5v14M12 5v14M5 8h14M5 16h14',
      tech: 'M4 7h16M4 12h8M4 17h12M15 12h5M19 17h1',
      architecture: 'M12 3v6m0 0 5 3m-5-3-5 3m5 3v6m0-6 5-3m-5 3-5-3',
      systems: 'M4 12h5l2 6 3-12 2 6h4',
      about: 'M12 13a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-7 8a7 7 0 0 1 14 0',
      contact: 'M4 7h16v10H4zm0 0 8 6 8-6'
    };

    return iconMap[icon];
  }

  principleIconPath(
    icon: 'code' | 'performance' | 'dx' | 'solver' | 'architecture' | 'delivery'
  ): string {
    const iconMap = {
      code: 'M8 8 4 12l4 4M16 8l4 4-4 4M13 5l-2 14',
      performance: 'M12 3v6m0 0 4 4m-4-4-4 4M5 19h14',
      dx: 'M8 17h8M6 7h12M7 7l5 5-5 5',
      solver: 'M12 4 7 8v6l5 4 5-4V8zM9.5 11h5',
      architecture: 'M4 8h16M4 16h16M8 8v8M16 8v8',
      delivery: 'M3 12h14l4-6H7zm0 0 4 6h14'
    } as const;

    return iconMap[icon];
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

  metricCaptionClass(tone: KpiTone): string {
    const classMap = {
      neutral: 'text-cyan',
      positive: 'text-emerald',
      warning: 'text-warning',
      danger: 'text-danger'
    };

    return classMap[tone];
  }

  progressBadgeClass(status: 'Building' | 'Planned'): string {
    return status === 'Building'
      ? 'border-emerald/40 bg-emerald/15 text-emerald'
      : 'border-cyan/40 bg-cyan/15 text-cyan';
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

  private mountExternalEngineSoon(engine: ExternalWorkbenchEngine): void {
    this.engineLoadState.set('loading');
    this.engineError.set('');

    setTimeout(() => void this.mountExternalEngine(engine));
  }

  private async mountExternalEngine(engine: ExternalWorkbenchEngine): Promise<void> {
    if (typeof document === 'undefined') {
      return;
    }

    const host = this.externalEngineHost?.nativeElement;

    if (!host) {
      this.mountExternalEngineSoon(engine);
      return;
    }

    this.clearExternalEngineHost();

    try {
      await this.ensureEngineScript(engine);

      if (this.activeFramework() !== engine) {
        return;
      }

      const config = this.engineScriptConfig[engine];

      if (!customElements.get(config.tagName)) {
        throw new Error(`${engine} workbench custom element was not registered.`);
      }

      const element = document.createElement(config.tagName);
      element.setAttribute('data-active-engine', engine.toLowerCase());
      host.appendChild(element);
      this.engineLoadState.set('ready');
    } catch (error) {
      if (this.activeFramework() !== engine) {
        return;
      }

      const message = error instanceof Error ? error.message : `${engine} engine failed to load.`;
      this.engineError.set(message);
      this.engineLoadState.set('error');
    }
  }

  private ensureEngineScript(engine: ExternalWorkbenchEngine): Promise<void> {
    const config = this.engineScriptConfig[engine];

    if (customElements.get(config.tagName)) {
      return Promise.resolve();
    }

    const existingPromise = this.engineScriptPromises.get(engine);

    if (existingPromise) {
      return existingPromise;
    }

    const promise = new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = config.src;
      script.async = true;
      script.dataset['workbenchEngine'] = engine;

      script.onload = () => {
        if (customElements.get(config.tagName)) {
          resolve();
          return;
        }

        reject(new Error(`${engine} engine script loaded but ${config.tagName} was not registered.`));
      };

      script.onerror = () => reject(new Error(`${engine} engine script could not be loaded from ${config.src}.`));

      document.head.appendChild(script);
    });
    const retryablePromise = promise.catch((error) => {
      this.engineScriptPromises.delete(engine);
      throw error;
    });

    this.engineScriptPromises.set(engine, retryablePromise);

    return retryablePromise;
  }

  private clearExternalEngineHost(): void {
    this.externalEngineHost?.nativeElement.replaceChildren();
  }

  private contextSlug(tab: ContextTab): string {
    return tab.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  private plainCodeSample(): string {
    return this.activeSourceSample().plain;
  }
}
