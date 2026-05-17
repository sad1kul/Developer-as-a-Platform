import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SectionCardComponent } from '../../shared/components/section-card/section-card.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, SectionCardComponent],
  templateUrl: './about.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent {
  @Input({ required: true }) paragraphs: string[] = [];
}
