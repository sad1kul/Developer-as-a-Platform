import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { CV_DOWNLOAD_FILENAME } from '../../../core/data/portfolio.data';
import { QuickLink } from '../../../core/models/portfolio.model';
import { quickLinkIconPath } from '../../utils/icon.utils';

export type CvDownloadButtonVariant = 'hero' | 'contact' | 'sidebar';

@Component({
  selector: 'app-cv-download-button',
  standalone: true,
  templateUrl: './cv-download-button.component.html',
  styleUrl: './cv-download-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CvDownloadButtonComponent {
  @Input({ required: true }) link!: QuickLink;
  @Input() variant: CvDownloadButtonVariant = 'hero';
  @Input() cvDownloading = false;

  @Output() cvDownloadStarted = new EventEmitter<void>();

  readonly cvDownloadFilename = CV_DOWNLOAD_FILENAME;
  readonly quickIconPath = quickLinkIconPath;

  get isCvLink(): boolean {
    return this.link.icon === 'cv';
  }

  get isDownloading(): boolean {
    return this.isCvLink && this.cvDownloading;
  }

  get isExternalLink(): boolean {
    return this.link.url.startsWith('http') && !this.isCvLink;
  }

  get downloadName(): string | null {
    return this.isCvLink ? this.cvDownloadFilename : null;
  }

  get label(): string {
    if (this.isDownloading) {
      return 'Downloading...';
    }

    return this.isCvLink ? 'Download CV' : this.link.label;
  }

  get iconFill(): 'currentColor' | 'none' {
    return this.link.icon === 'github' || this.link.icon === 'linkedin' ? 'currentColor' : 'none';
  }

  handleClick(): void {
    if (this.isCvLink) {
      this.cvDownloadStarted.emit();
    }
  }
}
