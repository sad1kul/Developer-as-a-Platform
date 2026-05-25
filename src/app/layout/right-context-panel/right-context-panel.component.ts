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

  /** Returns the accent color hex for the currently active engine */
  get activeEngineHex(): string {
    switch (this.engineService.activeFramework()) {
      case 'Angular': return '#10B981';
      case 'React':   return '#0EA5E9';
      case 'Svelte':  return '#FF3E00';
      default:        return '#10B981';
    }
  }

  /** Returns tab classes using per-engine active color */
  tabClasses(tab: ContextTab): Record<string, boolean> {
    const isActive = tab === this.engineService.activeContextTab();
    if (!isActive) {
      return { 'border-border-soft': true, 'bg-bg-soft': true, 'text-text-muted': true, 'hover:border-cyan/50': true, 'hover:text-cyan': true };
    }
    switch (this.engineService.activeFramework()) {
      case 'Angular': return { 'border-emerald/60': true, 'bg-emerald/15': true, 'text-emerald': true };
      case 'React':   return { 'border-cyan/60': true,    'bg-cyan/15': true,    'text-cyan': true    };
      case 'Svelte':  return { 'border-svelte/60': true,  'bg-svelte/15': true,  'text-svelte': true  };
      default:        return { 'border-emerald/60': true, 'bg-emerald/15': true, 'text-emerald': true };
    }
  }
}
