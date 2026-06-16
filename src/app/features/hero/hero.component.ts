import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, signal } from '@angular/core';

import { NavSectionId, ProfileIdentity, QuickLink } from '../../core/models/portfolio.model';
import { CvDownloadButtonComponent } from '../../shared/components/cv-download-button/cv-download-button.component';
import { SectionCardComponent } from '../../shared/components/section-card/section-card.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, SectionCardComponent, CvDownloadButtonComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent implements OnInit, OnDestroy {
  @Input({ required: true }) profile!: ProfileIdentity;
  @Input({ required: true }) quickLinks: QuickLink[] = [];
  @Input() cvDownloading = false;

  @Output() sectionRequested = new EventEmitter<NavSectionId>();
  @Output() cvDownloadStarted = new EventEmitter<void>();

  socialLinks(): QuickLink[] {
    return this.quickLinks.filter((item) => item.icon === 'github' || item.icon === 'linkedin' || item.icon === 'cv');
  }

  readonly isFlipped = signal(true);
  private timeoutId?: ReturnType<typeof setTimeout>;

  ngOnInit(): void {
    this.timeoutId = setTimeout(() => this.isFlipped.set(false), 2000);
  }

  ngOnDestroy(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = undefined;
    }
  }

  toggleFlip(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }

    this.isFlipped.update((value) => !value);

    if (this.isFlipped()) {
      this.timeoutId = setTimeout(() => this.isFlipped.set(false), 3000);
    }
  }
}
