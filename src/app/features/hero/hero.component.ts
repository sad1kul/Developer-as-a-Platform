import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, signal } from '@angular/core';

import { NavSectionId, ProfileIdentity, QuickLink } from '../../core/models/portfolio.model';
import { SectionCardComponent } from '../../shared/components/section-card/section-card.component';
import { quickLinkIconPath } from '../../shared/utils/icon.utils';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, SectionCardComponent],
  templateUrl: './hero.component.html',
  styles: `
    .perspective-1000 {
      perspective: 1000px;
    }

    .transform-style-3d {
      transform-style: preserve-3d;
    }

    .backface-hidden {
      backface-visibility: hidden;
    }

    .rotate-y-180 {
      transform: rotateY(180deg);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroComponent implements OnInit, OnDestroy {
  @Input({ required: true }) profile!: ProfileIdentity;
  @Input({ required: true }) quickLinks: QuickLink[] = [];

  @Output() sectionRequested = new EventEmitter<NavSectionId>();

  socialLinks(): QuickLink[] {
    return this.quickLinks.filter((item) => item.icon === 'github' || item.icon === 'linkedin' || item.icon === 'cv');
  }

  quickIconPath(icon: QuickLink['icon']): string {
    return quickLinkIconPath(icon);
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
