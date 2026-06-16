import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SystemProgressItem } from '../../core/models/portfolio.model';
import { SectionCardComponent } from '../../shared/components/section-card/section-card.component';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-systems-in-progress',
  standalone: true,
  imports: [CommonModule, SectionCardComponent, StatusBadgeComponent],
  templateUrl: './systems-in-progress.component.html',
  styleUrl: './systems-in-progress.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SystemsInProgressComponent {
  @Input({ required: true }) systems: SystemProgressItem[] = [];

  statusClass(status: SystemProgressItem['status']): string {
    return status === 'Building'
      ? 'border-emerald/40 bg-emerald/15 text-emerald'
      : 'border-cyan/40 bg-cyan/15 text-cyan';
  }
}
