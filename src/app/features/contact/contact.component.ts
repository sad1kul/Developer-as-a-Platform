import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { QuickLink } from '../../core/models/portfolio.model';
import { SectionCardComponent } from '../../shared/components/section-card/section-card.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, SectionCardComponent],
  templateUrl: './contact.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {
  @Input({ required: true }) opportunityText!: string;
  @Input({ required: true }) quickLinks: QuickLink[] = [];
}
