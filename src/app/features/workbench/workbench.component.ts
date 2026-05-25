import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';

import { FRAMEWORK_ENGINES, WORKBENCH_DISCLAIMER } from '../../core/data/portfolio.data';
import { FrameworkEngine } from '../../core/models/portfolio.model';
import { EngineService } from '../../core/services/engine.service';
import { WorkbenchStateService } from '../../core/services/workbench-state.service';
import { SectionCardComponent } from '../../shared/components/section-card/section-card.component';
import { StatusBadgeComponent } from '../../shared/components/status-badge/status-badge.component';

@Component({
  selector: 'app-workbench',
  standalone: true,
  imports: [CommonModule, SectionCardComponent, StatusBadgeComponent],
  templateUrl: './workbench.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkbenchComponent implements OnDestroy {
  @ViewChild('externalEngineHost')
  set externalEngineHost(host: ElementRef<HTMLElement> | undefined) {
    this.engineService.registerExternalEngineHost(host?.nativeElement ?? null);
  }

  readonly engineService = inject(EngineService);
  readonly workbenchState = inject(WorkbenchStateService);

  readonly engines = FRAMEWORK_ENGINES;
  readonly disclaimer = WORKBENCH_DISCLAIMER;

  ngOnDestroy(): void {
    this.engineService.registerExternalEngineHost(null);
  }

  setFramework(engine: FrameworkEngine): void {
    this.engineService.setFramework(engine);
  }

  engineButtonClasses(engineName: string): Record<string, boolean> {
    const isActive = engineName === this.engineService.activeFramework();
    if (!isActive) {
      return {
        'border-border-soft': true,
        'bg-bg-soft': true,
        'text-text-muted': true,
        'hover:border-border-active': true,
        'hover:text-text-main': true
      };
    }
    switch (engineName) {
      case 'Angular': return { 'border-emerald/60': true, 'bg-emerald/15': true, 'text-emerald': true };
      case 'React':   return { 'border-cyan/60': true,    'bg-cyan/15': true,    'text-cyan': true    };
      case 'Svelte':  return { 'border-svelte/60': true,  'bg-svelte/15': true,  'text-svelte': true  };
      default:        return { 'border-emerald/60': true, 'bg-emerald/15': true, 'text-emerald': true };
    }
  }

  get activeEngineHex(): string {
    switch (this.engineService.activeFramework()) {
      case 'Angular': return '#10B981';
      case 'React':   return '#0EA5E9';
      case 'Svelte':  return '#FF3E00';
      default:        return '#10B981';
    }
  }

  selectedRowStyle(itemId: number): object {
    if (itemId !== this.workbenchState.selectedItem().id) return {};
    const hex = this.activeEngineHex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return {
      'box-shadow': `inset 2px 0 0 0 rgba(${r}, ${g}, ${b}, 0.85)`,
      'background-color': `rgba(${r}, ${g}, ${b}, 0.08)`
    };
  }
}
