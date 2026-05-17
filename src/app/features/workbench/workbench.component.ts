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
}
