export type NavSectionId =
  | 'overview'
  | 'workbench'
  | 'tech-profile'
  | 'architecture'
  | 'case-studies'
  | 'systems'
  | 'about'
  | 'contact';

export type NavIcon =
  | 'overview'
  | 'workbench'
  | 'tech'
  | 'architecture'
  | 'case-studies'
  | 'systems'
  | 'about'
  | 'contact';

export interface NavItem {
  id: NavSectionId;
  label: string;
  icon: NavIcon;
}

export type FrameworkEngine = 'Angular' | 'React' | 'Svelte';

export interface FrameworkEngineOption {
  name: FrameworkEngine;
  available: boolean;
  note: string;
}

export type WorkbenchStatus = 'Active' | 'Pending' | 'Warning' | 'Error' | 'In Review';

export type WorkbenchPriority = 'Low' | 'Medium' | 'High' | 'Critical';

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

export type StatusFilter = 'All Status' | WorkbenchStatus;

export type SortOption = 'Newest' | 'Oldest' | 'Priority';

export type KpiTone = 'neutral' | 'positive' | 'warning' | 'danger' | 'focus';

export interface KpiMetric {
  label: string;
  value: string;
  caption: string;
  tone: KpiTone;
}

export interface PrincipleCard {
  title: string;
  description: string;
  icon: 'code' | 'performance' | 'dx' | 'solver' | 'architecture' | 'delivery';
}

export interface TechProfileGroup {
  title: string;
  items: string[];
}

export interface ArchitectureLayer {
  title: string;
  description: string;
  accent: 'emerald' | 'cyan' | 'purple';
}

export type ProgressStatus = 'Building' | 'Planned';

export interface SystemProgressItem {
  title: string;
  status: ProgressStatus;
  businessProblem: string;
  plannedDirection: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  framing: string;
  problem: string;
  role: string;
  tech: string[];
  challenge: string;
  solution: string;
  outcome: string;
  sourceLabel: string;
  sourceUrl: string;
}

export interface SourceLinks {
  angularWorkbench: string;
  reactEngine: string;
  svelteEngine: string;
  dataModels: string;
  caseStudies: string;
}

export interface SystemStatusInfo {
  live: string;
  lastUpdated: string;
  version: string;
}

export interface ProfileIdentity {
  name: string;
  title: string;
  subtitle: string;
  summary: string;
  roleLine: string;
  focus: string;
  location: string;
  availability: string;
}

export interface QuickLink {
  label: string;
  url: string;
  icon: 'github' | 'linkedin' | 'cv' | 'email';
  ariaLabel: string;
}

export type ContextTab = 'Source Code' | 'State' | 'Architecture' | 'Trade-offs';

export interface ContextNote {
  heading: string;
  points: string[];
}

export interface CodeSample {
  label: string;
  filename: string;
  lines: string[];
  plain: string;
}

export interface EngineComparisonNote {
  framework: FrameworkEngine;
  note: string;
}

export interface EngineContext {
  source: CodeSample;
  stateNotes: ContextNote[];
  architectureNotes: ContextNote[];
  strengths: string[];
  tradeoffs: string[];
  comparedFrameworkNotes: EngineComparisonNote[];
}
