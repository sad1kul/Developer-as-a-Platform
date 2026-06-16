import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { QuickLink } from '../../core/models/portfolio.model';
import { CvDownloadButtonComponent } from '../../shared/components/cv-download-button/cv-download-button.component';
import { SectionCardComponent } from '../../shared/components/section-card/section-card.component';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, SectionCardComponent, CvDownloadButtonComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {
  @Input({ required: true }) opportunityText!: string;
  @Input({ required: true }) quickLinks: QuickLink[] = [];
  @Input() cvDownloading = false;

  @Output() cvDownloadStarted = new EventEmitter<void>();
}
