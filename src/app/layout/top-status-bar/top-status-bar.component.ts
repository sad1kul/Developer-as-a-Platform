import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { NavItem, NavSectionId } from '../../core/models/portfolio.model';
import { navIconPath } from '../../shared/utils/icon.utils';

@Component({
  selector: 'app-top-status-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-status-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopStatusBarComponent {
  @Input({ required: true }) navItems: NavItem[] = [];
  @Input({ required: true }) activeSection!: NavSectionId;
  @Input({ required: true }) mobileMenuOpen!: boolean;
  @Input({ required: true }) profileName!: string;
  @Input({ required: true }) profileTitle!: string;

  @Output() menuToggled = new EventEmitter<void>();
  @Output() sectionSelected = new EventEmitter<NavSectionId>();

  navPath(icon: NavItem['icon']): string {
    return navIconPath(icon);
  }
}
