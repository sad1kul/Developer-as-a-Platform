import { Injectable, computed, signal } from '@angular/core';

import { CONTEXT_TABS, ENGINE_CONTEXTS } from '../data/portfolio.data';
import { ContextTab, EngineContext, FrameworkEngine } from '../models/portfolio.model';

type ExternalWorkbenchEngine = Exclude<FrameworkEngine, 'Angular'>;
type EngineLoadState = 'idle' | 'loading' | 'ready' | 'error';

@Injectable({ providedIn: 'root' })
export class EngineService {
  readonly contextTabs = CONTEXT_TABS;

  readonly activeFramework = signal<FrameworkEngine>('Angular');
  readonly activeContextTab = signal<ContextTab>('Source Code');
  readonly copyState = signal<'ready' | 'copied'>('ready');
  readonly engineLoadState = signal<EngineLoadState>('idle');
  readonly engineError = signal('');

  readonly activeEngineContext = computed<EngineContext>(() => ENGINE_CONTEXTS[this.activeFramework()]);

  private hostElement?: HTMLElement;

  private readonly engineScriptConfig = {
    React: { src: '/engines/react-workbench.js', tagName: 'react-data-workbench' },
    Svelte: { src: '/engines/svelte-workbench.js', tagName: 'svelte-data-workbench' }
  } satisfies Record<ExternalWorkbenchEngine, { src: string; tagName: string }>;

  private readonly engineScriptPromises = new Map<ExternalWorkbenchEngine, Promise<void>>();

  registerExternalEngineHost(host: HTMLElement | null): void {
    this.hostElement = host ?? undefined;

    const currentEngine = this.activeFramework();

    if (currentEngine !== 'Angular' && host) {
      this.mountExternalEngineSoon(currentEngine);
    }
  }

  setFramework(engine: FrameworkEngine): void {
    this.activeFramework.set(engine);
    this.activeContextTab.set('Source Code');
    this.copyState.set('ready');

    if (engine === 'Angular') {
      this.engineLoadState.set('idle');
      this.engineError.set('');
      this.clearExternalEngineHost();
      return;
    }

    this.mountExternalEngineSoon(engine);
  }

  setContextTab(tab: ContextTab): void {
    this.activeContextTab.set(tab);
  }

  async copySourceCode(): Promise<void> {
    if (typeof navigator === 'undefined' || !navigator.clipboard?.writeText) {
      return;
    }

    await navigator.clipboard.writeText(this.activeEngineContext().source.plain);
    this.copyState.set('copied');

    setTimeout(() => this.copyState.set('ready'), 1800);
  }

  private mountExternalEngineSoon(engine: ExternalWorkbenchEngine): void {
    this.engineLoadState.set('loading');
    this.engineError.set('');

    setTimeout(() => void this.mountExternalEngine(engine));
  }

  private async mountExternalEngine(engine: ExternalWorkbenchEngine): Promise<void> {
    if (typeof document === 'undefined') {
      return;
    }

    const host = this.hostElement;

    if (!host) {
      return;
    }

    this.clearExternalEngineHost();

    try {
      await this.ensureEngineScript(engine);

      if (this.activeFramework() !== engine) {
        return;
      }

      const config = this.engineScriptConfig[engine];

      if (!customElements.get(config.tagName)) {
        throw new Error(`${engine} workbench custom element was not registered.`);
      }

      const element = document.createElement(config.tagName);
      element.setAttribute('data-active-engine', engine.toLowerCase());
      host.appendChild(element);
      this.engineLoadState.set('ready');
    } catch (error) {
      if (this.activeFramework() !== engine) {
        return;
      }

      const message = error instanceof Error ? error.message : `${engine} engine failed to load.`;
      this.engineError.set(message);
      this.engineLoadState.set('error');
    }
  }

  private ensureEngineScript(engine: ExternalWorkbenchEngine): Promise<void> {
    const config = this.engineScriptConfig[engine];

    if (customElements.get(config.tagName)) {
      return Promise.resolve();
    }

    const existingPromise = this.engineScriptPromises.get(engine);

    if (existingPromise) {
      return existingPromise;
    }

    const promise = new Promise<void>((resolve, reject) => {
      const script = document.createElement('script');
      script.src = config.src;
      script.async = true;
      script.dataset['workbenchEngine'] = engine;

      script.onload = () => {
        if (customElements.get(config.tagName)) {
          resolve();
          return;
        }

        reject(new Error(`${engine} engine script loaded but ${config.tagName} was not registered.`));
      };

      script.onerror = () => reject(new Error(`${engine} engine script could not be loaded from ${config.src}.`));

      document.head.appendChild(script);
    });

    const retryablePromise = promise.catch((error) => {
      this.engineScriptPromises.delete(engine);
      throw error;
    });

    this.engineScriptPromises.set(engine, retryablePromise);

    return retryablePromise;
  }

  private clearExternalEngineHost(): void {
    this.hostElement?.replaceChildren();
  }
}
