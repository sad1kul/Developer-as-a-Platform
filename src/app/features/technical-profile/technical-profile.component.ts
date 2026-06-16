import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { PrincipleCard, TechProfileGroup } from '../../core/models/portfolio.model';
import { SectionCardComponent } from '../../shared/components/section-card/section-card.component';
import { principleIconPath } from '../../shared/utils/icon.utils';

@Component({
  selector: 'app-technical-profile',
  standalone: true,
  imports: [CommonModule, SectionCardComponent],
  templateUrl: './technical-profile.component.html',
  styleUrl: './technical-profile.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TechnicalProfileComponent {
  @Input({ required: true }) principles: PrincipleCard[] = [];
  @Input({ required: true }) groups: TechProfileGroup[] = [];

  readonly principlePath = principleIconPath;
}
