import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { CodeSample } from '../../../core/models/portfolio.model';

@Component({
  selector: 'app-code-block',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './code-block.component.html',
  styleUrl: './code-block.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeBlockComponent {
  @Input({ required: true }) sample!: CodeSample;
  @Input() copyState: 'ready' | 'copied' = 'ready';

  @Output() copyRequested = new EventEmitter<void>();
}
