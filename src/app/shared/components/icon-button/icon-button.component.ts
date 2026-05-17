import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-icon-button',
  standalone: true,
  template: `
    <a
      [attr.class]="buttonClass"
      [href]="href"
      [attr.target]="external ? '_blank' : null"
      [attr.rel]="external ? 'noopener' : null"
      [attr.aria-label]="ariaLabel"
    >
      <ng-content></ng-content>
    </a>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconButtonComponent {
  @Input({ required: true }) href!: string;
  @Input({ required: true }) ariaLabel!: string;
  @Input() external = true;
  @Input() buttonClass =
    'inline-flex items-center justify-center rounded-lg border border-border-soft bg-bg-soft px-2 py-2 text-text-muted hover:border-cyan/40 hover:text-cyan';
}
