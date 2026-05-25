import { createRoot, Root } from 'react-dom/client';

import { ReactWorkbench } from './ReactWorkbench';

const tagName = 'react-data-workbench';

class ReactDataWorkbenchElement extends HTMLElement {
  private root?: Root;
  private mountPoint?: HTMLDivElement;

  connectedCallback(): void {
    this.replaceChildren();

    this.mountPoint = document.createElement('div');
    this.append(this.mountPoint);

    this.root = createRoot(this.mountPoint);
    this.root.render(<ReactWorkbench />);
  }

  disconnectedCallback(): void {
    this.root?.unmount();
    this.root = undefined;
    this.mountPoint = undefined;
    this.replaceChildren();
  }
}

if (!customElements.get(tagName)) {
  customElements.define(tagName, ReactDataWorkbenchElement);
}
