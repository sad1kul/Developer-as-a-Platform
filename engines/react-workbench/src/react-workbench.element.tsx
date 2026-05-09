import { createRoot, Root } from 'react-dom/client';

import { ReactWorkbench } from './ReactWorkbench';
import { workbenchStyles } from './styles';

const tagName = 'react-data-workbench';

class ReactDataWorkbenchElement extends HTMLElement {
  private root?: Root;
  private mountPoint?: HTMLDivElement;

  connectedCallback(): void {
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
    }

    this.shadowRoot?.replaceChildren();

    const style = document.createElement('style');
    style.textContent = workbenchStyles;

    this.mountPoint = document.createElement('div');
    this.shadowRoot?.append(style, this.mountPoint);

    this.root = createRoot(this.mountPoint);
    this.root.render(<ReactWorkbench />);
  }

  disconnectedCallback(): void {
    this.root?.unmount();
    this.root = undefined;
    this.mountPoint = undefined;
    this.shadowRoot?.replaceChildren();
  }
}

if (!customElements.get(tagName)) {
  customElements.define(tagName, ReactDataWorkbenchElement);
}
