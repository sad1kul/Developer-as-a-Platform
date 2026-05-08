import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ANGULAR_STRENGTHS,
  ANGULAR_TRADEOFFS,
  ARCHITECTURE_NOTES,
  COMPARED_FRAMEWORK_NOTES,
  CONTEXT_TABS,
  FRAMEWORK_ENGINES,
  NAV_ITEMS,
  PRINCIPLE_CARDS,
  SORT_OPTIONS,
  STATE_NOTES,
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

interface KpiMetric {
  label: string;
  value: string;
  delta: string;
  tone: KpiTone;
}

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
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
  readonly stateNotes = STATE_NOTES;
  readonly architectureNotes = ARCHITECTURE_NOTES;
  readonly angularStrengths = ANGULAR_STRENGTHS;
  readonly angularTradeoffs = ANGULAR_TRADEOFFS;
  readonly comparedFrameworkNotes = COMPARED_FRAMEWORK_NOTES;

  readonly codeLines: string[] = [
    '<span class="token-keyword">@Injectable</span><span class="token-punc">({</span> <span class="token-property">providedIn</span><span class="token-punc">:</span> <span class="token-string">\'root\'</span> <span class="token-punc">})</span>',
    '<span class="token-keyword">export class</span> <span class="token-type">AuthService</span> <span class="token-punc">{</span>',
    '  <span class="token-keyword">private</span> <span class="token-property">user</span> <span class="token-punc">=</span> <span class="token-function">signal</span><span class="token-punc">&lt;</span><span class="token-type">User</span> <span class="token-punc">|</span> <span class="token-type">null</span><span class="token-punc">&gt;(</span><span class="token-type">null</span><span class="token-punc">);</span>',
    '  <span class="token-keyword">private</span> <span class="token-property">loading</span> <span class="token-punc">=</span> <span class="token-function">signal</span><span class="token-punc">(</span><span class="token-keyword">false</span><span class="token-punc">);</span>',
    '',
    '  <span class="token-function">login</span><span class="token-punc">(</span><span class="token-property">credentials</span><span class="token-punc">:</span> <span class="token-type">LoginDto</span><span class="token-punc">)</span> <span class="token-punc">{</span>',
    '    <span class="token-keyword">this</span><span class="token-punc">.</span><span class="token-property">loading</span><span class="token-punc">.</span><span class="token-function">set</span><span class="token-punc">(</span><span class="token-keyword">true</span><span class="token-punc">);</span>',
    '    <span class="token-keyword">return</span> <span class="token-keyword">this</span><span class="token-punc">.</span><span class="token-property">http</span><span class="token-punc">.</span><span class="token-function">post</span><span class="token-punc">&lt;</span><span class="token-type">AuthResponse</span><span class="token-punc">&gt;(</span>',
    '      <span class="token-string">\'/api/auth/login\'</span><span class="token-punc">,</span> <span class="token-property">credentials</span>',
    '    <span class="token-punc">).</span><span class="token-function">pipe</span><span class="token-punc">(</span>',
    '      <span class="token-function">tap</span><span class="token-punc">((</span><span class="token-property">res</span><span class="token-punc">)</span> <span class="token-punc">=&gt;</span> <span class="token-punc">{</span>',
    '        <span class="token-keyword">this</span><span class="token-punc">.</span><span class="token-property">user</span><span class="token-punc">.</span><span class="token-function">set</span><span class="token-punc">(</span><span class="token-property">res</span><span class="token-punc">.</span><span class="token-property">user</span><span class="token-punc">);</span>',
    '        <span class="token-keyword">this</span><span class="token-punc">.</span><span class="token-property">loading</span><span class="token-punc">.</span><span class="token-function">set</span><span class="token-punc">(</span><span class="token-keyword">false</span><span class="token-punc">);</span>',
    '      <span class="token-punc">})</span>',
    '    <span class="token-punc">);</span>',
    '  <span class="token-punc">}</span>',
    '<span class="token-punc">}</span>'
  ];

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
  readonly lastRefreshed = signal('Just now');

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
      { label: 'Total Items', value: currentItems.length.toLocaleString(), delta: '+12.5%', tone: 'neutral' },
      { label: 'Active', value: active.toLocaleString(), delta: '+8.1%', tone: 'positive' },
      { label: 'Pending', value: pending.toLocaleString(), delta: '+3.4%', tone: 'warning' },
      { label: 'Errors', value: errors.toLocaleString(), delta: '-2.1%', tone: 'danger' }
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

  readonly activeEngineNote = computed(() => {
    const currentEngine = this.activeFramework();
    return this.engines.find((engine) => engine.name === currentEngine)?.note ?? '';
  });

  setActiveSection(section: NavSectionId): void {
    this.activeSection.set(section);
    this.mobileMenuOpen.set(false);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((value) => !value);
  }

  setFramework(engine: FrameworkEngine): void {
    this.activeFramework.set(engine);
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
    this.lastRefreshed.set(
      new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: '2-digit'
      }).format(new Date())
    );
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

  metricDeltaClass(tone: KpiTone): string {
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

  private plainCodeSample(): string {
    return [
      "@Injectable({ providedIn: 'root' })",
      'export class AuthService {',
      '  private user = signal<User | null>(null);',
      '  private loading = signal(false);',
      '',
      '  login(credentials: LoginDto) {',
      '    this.loading.set(true);',
      '    return this.http.post<AuthResponse>(\'/api/auth/login\', credentials).pipe(',
      '      tap((res) => {',
      '        this.user.set(res.user);',
      '        this.loading.set(false);',
      '      })',
      '    );',
      '  }',
      '}'
    ].join('\n');
  }
}
