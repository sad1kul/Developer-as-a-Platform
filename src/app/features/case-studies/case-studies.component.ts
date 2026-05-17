import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { CaseStudy } from '../../core/models/portfolio.model';
import { SectionCardComponent } from '../../shared/components/section-card/section-card.component';

@Component({
  selector: 'app-case-studies',
  standalone: true,
  imports: [CommonModule, SectionCardComponent],
  templateUrl: './case-studies.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CaseStudiesComponent {
  @Input({ required: true }) caseStudies: CaseStudy[] = [];
}
