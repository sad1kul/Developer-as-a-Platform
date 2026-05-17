import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { NavItem, NavSectionId, QuickLink, SystemStatusInfo } from '../../core/models/portfolio.model';
import { IconButtonComponent } from '../../shared/components/icon-button/icon-button.component';
import { navIconPath, quickLinkIconPath } from '../../shared/utils/icon.utils';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, IconButtonComponent],
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  @Input({ required: true }) navItems: NavItem[] = [];
  @Input({ required: true }) activeSection!: NavSectionId;
  @Input({ required: true }) profileName!: string;
  @Input({ required: true }) profileTitle!: string;
  @Input({ required: true }) systemStatus!: SystemStatusInfo;
  @Input({ required: true }) quickLinks: QuickLink[] = [];

  @Output() sectionSelected = new EventEmitter<NavSectionId>();

  navPath(icon: NavItem['icon']): string {
    return navIconPath(icon);
  }

  quickIconPath(icon: QuickLink['icon']): string {
    return quickLinkIconPath(icon);
  }

  isExternal(url: string): boolean {
    return url.startsWith('http');
  }
}
