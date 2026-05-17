import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="inline-flex rounded-full border px-2 py-0.5 text-xs font-medium" [ngClass]="classes">
      {{ label }}
    </span>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatusBadgeComponent {
  @Input({ required: true }) label!: string;
  @Input() classes = 'border-border-soft bg-bg-soft text-text-main';
}
