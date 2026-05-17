import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { SOURCE_LINKS } from '../../core/data/portfolio.data';
import { ContextTab } from '../../core/models/portfolio.model';
import { EngineService } from '../../core/services/engine.service';
import { CodeBlockComponent } from '../../shared/components/code-block/code-block.component';

@Component({
  selector: 'app-right-context-panel',
  standalone: true,
  imports: [CommonModule, CodeBlockComponent],
  templateUrl: './right-context-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RightContextPanelComponent {
  readonly engineService = inject(EngineService);
  readonly sourceLinks = SOURCE_LINKS;

  contextTabId(tab: ContextTab): string {
    return `context-tab-${this.contextSlug(tab)}`;
  }

  contextPanelId(tab: ContextTab): string {
    return `context-panel-${this.contextSlug(tab)}`;
  }

  private contextSlug(tab: ContextTab): string {
    return tab.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }
}
