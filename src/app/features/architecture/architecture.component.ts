import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ArchitectureLayer } from '../../core/models/portfolio.model';
import { SectionCardComponent } from '../../shared/components/section-card/section-card.component';

@Component({
  selector: 'app-architecture',
  standalone: true,
  imports: [CommonModule, SectionCardComponent],
  templateUrl: './architecture.component.html',
  styleUrl: './architecture.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArchitectureComponent {
  @Input({ required: true }) summary!: string;
  @Input({ required: true }) layers: ArchitectureLayer[] = [];

  accentClass(accent: ArchitectureLayer['accent']): string {
    const map: Record<ArchitectureLayer['accent'], string> = {
      emerald: 'text-emerald',
      cyan: 'text-cyan',
      purple: 'text-purple'
    };

    return map[accent];
  }
}
