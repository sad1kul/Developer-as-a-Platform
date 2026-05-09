export type NavSectionId =
  | 'overview'
  | 'workbench'
  | 'tech-profile'
  | 'architecture'
  | 'systems'
  | 'about'
  | 'contact';

export type NavIcon =
  | 'overview'
  | 'workbench'
  | 'tech'
  | 'architecture'
  | 'systems'
  | 'about'
  | 'contact';

export interface NavItem {
  id: NavSectionId;
  label: string;
  icon: NavIcon;
  soon?: boolean;
}

export type FrameworkEngine = 'Angular' | 'React' | 'Svelte';

export type WorkbenchStatus = 'Active' | 'Pending' | 'Warning' | 'Error' | 'In Review';

export type WorkbenchPriority = 'Low' | 'Medium' | 'High' | 'Critical';

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

export interface PrincipleCard {
  title: string;
  description: string;
  icon: 'code' | 'performance' | 'dx' | 'solver' | 'architecture' | 'delivery';
}

export interface TechProfileGroup {
  title: string;
  items: string[];
}

export type ProgressStatus = 'Building' | 'Planned';

export interface SystemProgressItem {
  title: string;
  status: ProgressStatus;
  description: string;
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
