import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { NavItem, NavSectionId, QuickLink, SystemStatusInfo } from '../../core/models/portfolio.model';
import { CvDownloadButtonComponent } from '../../shared/components/cv-download-button/cv-download-button.component';
import { navIconPath } from '../../shared/utils/icon.utils';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, CvDownloadButtonComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  @Input({ required: true }) navItems: NavItem[] = [];
  @Input({ required: true }) activeSection!: NavSectionId;
  @Input({ required: true }) profileName!: string;
  @Input({ required: true }) profileTitle!: string;
  @Input({ required: true }) systemStatus!: SystemStatusInfo;
  @Input({ required: true }) quickLinks: QuickLink[] = [];
  @Input() cvDownloading = false;

  @Output() sectionSelected = new EventEmitter<NavSectionId>();
  @Output() cvDownloadStarted = new EventEmitter<void>();

  readonly navPath = navIconPath;
}
