import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, signal } from '@angular/core';

import {
  ABOUT_PARAGRAPHS,
  ARCHITECTURE_LAYERS,
  ARCHITECTURE_SUMMARY,
  CASE_STUDIES,
  CONTACT_OPPORTUNITY_TEXT,
  NAV_ITEMS,
  PRINCIPLE_CARDS,
  PROFILE_IDENTITY,
  QUICK_LINKS,
  SYSTEM_STATUS,
  SYSTEMS_IN_PROGRESS,
  TECH_PROFILE_GROUPS
} from './core/data/portfolio.data';
import { NavSectionId } from './core/models/portfolio.model';
import { AboutComponent } from './features/about/about.component';
import { ArchitectureComponent } from './features/architecture/architecture.component';
import { CaseStudiesComponent } from './features/case-studies/case-studies.component';
import { ContactComponent } from './features/contact/contact.component';
import { HeroComponent } from './features/hero/hero.component';
import { SystemsInProgressComponent } from './features/systems-in-progress/systems-in-progress.component';
import { TechnicalProfileComponent } from './features/technical-profile/technical-profile.component';
import { WorkbenchComponent } from './features/workbench/workbench.component';
import { RightContextPanelComponent } from './layout/right-context-panel/right-context-panel.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { TopStatusBarComponent } from './layout/top-status-bar/top-status-bar.component';

type CvDownloadContext = 'hero' | 'sidebar' | 'contact';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    TopStatusBarComponent,
    SidebarComponent,
    RightContextPanelComponent,
    HeroComponent,
    WorkbenchComponent,
    TechnicalProfileComponent,
    ArchitectureComponent,
    CaseStudiesComponent,
    SystemsInProgressComponent,
    AboutComponent,
    ContactComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnDestroy {
  readonly profile = PROFILE_IDENTITY;
  readonly navItems = NAV_ITEMS;
  readonly quickLinks = QUICK_LINKS;
  readonly systemStatus = SYSTEM_STATUS;
  readonly principles = PRINCIPLE_CARDS;
  readonly techProfileGroups = TECH_PROFILE_GROUPS;
  readonly architectureSummary = ARCHITECTURE_SUMMARY;
  readonly architectureLayers = ARCHITECTURE_LAYERS;
  readonly caseStudies = CASE_STUDIES;
  readonly systemsInProgress = SYSTEMS_IN_PROGRESS;
  readonly aboutParagraphs = ABOUT_PARAGRAPHS;
  readonly contactOpportunityText = CONTACT_OPPORTUNITY_TEXT;

  readonly mobileMenuOpen = signal(false);
  readonly activeSection = signal<NavSectionId>('overview');
  readonly cvDownloadContext = signal<CvDownloadContext | null>(null);

  private cvDownloadFeedbackTimeout?: ReturnType<typeof setTimeout>;

  setActiveSection(section: NavSectionId): void {
    this.activeSection.set(section);
    this.mobileMenuOpen.set(false);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((value) => !value);
  }

  scrollToSection(section: NavSectionId): void {
    this.activeSection.set(section);
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  showCvDownloadFeedback(context: CvDownloadContext): void {
    this.cvDownloadContext.set(context);

    if (this.cvDownloadFeedbackTimeout) {
      clearTimeout(this.cvDownloadFeedbackTimeout);
    }

    this.cvDownloadFeedbackTimeout = setTimeout(() => {
      this.cvDownloadContext.set(null);
      this.cvDownloadFeedbackTimeout = undefined;
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.cvDownloadFeedbackTimeout) {
      clearTimeout(this.cvDownloadFeedbackTimeout);
    }
  }
}
