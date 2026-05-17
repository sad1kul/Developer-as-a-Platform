import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-card',
  standalone: true,
  template: `
    <section
      [id]="sectionId"
      class="scroll-mt-24 rounded-2xl border border-border-soft/90 bg-bg-surface/85 p-4 shadow-soft backdrop-blur sm:p-6"
    >
      <ng-content></ng-content>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionCardComponent {
  @Input() sectionId = '';
}
