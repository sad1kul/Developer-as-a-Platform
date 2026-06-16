import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <a
      class="icon-button"
      [ngClass]="buttonClass"
      [href]="href"
      [attr.target]="external ? '_blank' : null"
      [attr.rel]="external ? 'noopener' : null"
      [attr.download]="download"
      [attr.aria-label]="ariaLabel"
      (click)="buttonClicked.emit($event)"
    >
      <ng-content></ng-content>
    </a>
  `,
  styleUrl: './icon-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconButtonComponent {
  @Input({ required: true }) href!: string;
  @Input({ required: true }) ariaLabel!: string;
  @Input() external = true;
  @Input() download: string | null = null;
  @Input() buttonClass: string | string[] | Record<string, boolean> = '';

  @Output() buttonClicked = new EventEmitter<MouseEvent>();
}
