import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-card',
  standalone: true,
  template: `
    <section [id]="sectionId" class="section-card">
      <ng-content></ng-content>
    </section>
  `,
  styleUrl: './section-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionCardComponent {
  @Input() sectionId = '';
}
