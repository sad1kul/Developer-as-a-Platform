You are acting as a senior frontend architect.

We already have an Angular portfolio MVP called:

Sadikul Islam — Developer-as-a-Platform

The Angular version currently has a Cross-Framework Workbench with Angular active and React/Svelte showing “coming soon”.

Now implement the React and Svelte engines properly.

IMPORTANT:
Angular remains the primary application shell.
Do not rebuild the whole portfolio in React.
Do not rebuild the whole portfolio in Svelte.
Do not replace Angular routing, layout, sidebar, right panel, or existing Tailwind styling.
React and Svelte must only power the Workbench engine area.

==================================================
1. CURRENT PROBLEM
==================================================

The UI currently shows messages like:

“React engine is not implemented yet.
Coming soon: hooks-based implementation.”

And similar for Svelte.

We now need those engines to be implemented.

When the user selects:

- Angular: render the current Angular Workbench implementation.
- React: render the React version of the same Workbench.
- Svelte: render the Svelte version of the same Workbench.

The interface must no longer say React/Svelte are coming soon.

==================================================
2. REQUIRED ARCHITECTURE
==================================================

Use this architecture:

Angular Shell
  └── Cross-Framework Workbench
        ├── Angular engine: native Angular component
        ├── React engine: Web Component / Custom Element
        └── Svelte engine: Web Component / Custom Element

React and Svelte engines should be isolated and mounted inside the Angular Workbench.

Preferred approach:
- Build React engine as a custom element using React + react-dom/client createRoot.
- Build Svelte engine as a custom element using Svelte custom element support.
- Bundle both engines as small browser scripts.
- Load/mount them from Angular when selected.

Do not use:
- Module Federation
- iframe rendering
- separate full React app pages
- separate full Svelte app pages
- Next.js
- SvelteKit
- heavy microfrontend framework
- backend API
- database

This must remain lightweight.

==================================================
3. CHECK EXISTING PROJECT FIRST
==================================================

Before coding:

1. Inspect package.json.
2. Check Angular version.
3. Check if Tailwind is already configured.
4. Check existing workbench component structure.
5. Check where the framework selector is implemented.
6. Check where the “coming soon” React/Svelte messages are rendered.
7. Preserve existing UI design and layout.
8. Do not break the existing Angular implementation.

If dependencies already exist, reuse them.
If they do not exist, install only what is necessary.

Required dependencies if missing:
- react
- react-dom
- @types/react
- @types/react-dom
- vite
- @vitejs/plugin-react
- svelte
- @sveltejs/vite-plugin-svelte

Do not install unnecessary UI libraries.

==================================================
4. TARGET FILE STRUCTURE
==================================================

Create a clean structure similar to this, adapting to the existing project if needed:

portfolio-root/
  engines/
    react-workbench/
      src/
        ReactWorkbench.tsx
        react-workbench.element.tsx
        styles.css
      vite.config.ts
      package.json or use root package scripts if better

    svelte-workbench/
      src/
        SvelteWorkbench.svelte
        svelte-workbench.entry.ts
        styles.css
      vite.config.ts
      package.json or use root package scripts if better

  public/
    engines/
      react-workbench.js
      svelte-workbench.js

  src/app/
    features/
      workbench/
        workbench.component.ts
        workbench.component.html
        workbench.component.scss or Tailwind template
    core/
      data/
        workbench-items.data.ts
      models/
        workbench-item.model.ts

If the current project uses a different structure, adapt cleanly.

==================================================
5. SHARED WORKBENCH DATA CONTRACT
==================================================

The React and Svelte engines must implement the same visible functionality as the Angular Workbench.

Use the same dataset shape:

WorkbenchItem:
- id
- name
- status
- priority
- updated
- description
- tags

Statuses:
- Active
- Pending
- Warning
- Error
- In Review

Priorities:
- Low
- Medium
- High
- Critical

Example modules:
1. Authentication Service
2. User Profile Module
3. Payment Gateway Adapter
4. Notification Service
5. Analytics Dashboard
6. API Contract Monitor
7. Error Tracking Service
8. Deployment Pipeline

For the first implementation, it is acceptable for each engine to contain its own local copy of the mock data, but the data must be identical across Angular, React and Svelte.

If practical, create a shared JSON file that all engines can import.
If that creates too much build complexity, duplicate the mock data carefully and add a comment explaining that shared data will be extracted later.

==================================================
6. REACT ENGINE REQUIREMENTS
==================================================

Create a React implementation of the Workbench.

Component name:
ReactWorkbench

Custom element tag:
react-data-workbench

React implementation must include:
- KPI cards
- search input
- status filter
- sort dropdown
- refresh/simulate update button
- table/list of modules
- selected row highlight
- selected item detail panel
- same dark Tailwind-like styling as Angular version

React state approach:
- useState for selected item, search, filter, sort and data
- useMemo for filtered/sorted data
- useEffect only where genuinely useful
- no external state library

React custom element wrapper:
- define a class extending HTMLElement
- use createRoot from react-dom/client
- render ReactWorkbench inside connectedCallback
- unmount root in disconnectedCallback
- avoid defining the custom element twice
- dispatch CustomEvent if item selection needs to communicate to Angular later

Example behaviour:
When the user selects React from Angular framework selector:
- load react-workbench.js if not already loaded
- mount <react-data-workbench></react-data-workbench>
- update the right context panel to React source/state/architecture/trade-offs

The React engine must look visually consistent with the Angular engine.

==================================================
7. SVELTE ENGINE REQUIREMENTS
==================================================

Create a Svelte implementation of the Workbench.

Component name:
SvelteWorkbench

Custom element tag:
svelte-data-workbench

Svelte implementation must include:
- KPI cards
- search input
- status filter
- sort dropdown
- refresh/simulate update button
- table/list of modules
- selected row highlight
- selected item detail panel
- same dark Tailwind-like styling as Angular version

Svelte state approach:
- use native Svelte reactivity
- use derived/reactive filtering and sorting
- no external state library

Svelte custom element:
- compile as a custom element
- use the official Svelte custom element approach
- ensure the component is registered as <svelte-data-workbench>
- avoid duplicate registration errors

Example behaviour:
When the user selects Svelte from Angular framework selector:
- load svelte-workbench.js if not already loaded
- mount <svelte-data-workbench></svelte-data-workbench>
- update the right context panel to Svelte source/state/architecture/trade-offs

The Svelte engine must look visually consistent with the Angular and React engines.

==================================================
8. ANGULAR WORKBENCH UPDATE
==================================================

Update the Angular Workbench so the framework selector actually changes the rendered engine.

Framework selector:
Angular | React | Svelte

Default:
Angular

When Angular selected:
- show existing Angular Workbench component
- show Angular context panel content

When React selected:
- lazy-load React custom element script
- mount react-data-workbench inside the engine host
- show React context panel content
- no “coming soon” message

When Svelte selected:
- lazy-load Svelte custom element script
- mount svelte-data-workbench inside the engine host
- show Svelte context panel content
- no “coming soon” message

Use a clean engine host area such as:

- Angular template area for Angular engine
- dynamic host container for React/Svelte custom elements

Avoid memory leaks:
- clear host container before mounting a different engine
- unmount/remove custom elements cleanly when switching
- do not repeatedly inject the same script if already loaded

If Angular complains about custom elements in templates, either:
- mount custom elements dynamically using document.createElement, or
- add CUSTOM_ELEMENTS_SCHEMA only where appropriate

Do not add CUSTOM_ELEMENTS_SCHEMA globally unless necessary.

==================================================
9. RIGHT CONTEXT PANEL UPDATE
==================================================

The right context panel must become dynamic.

Tabs remain:
- Source Code
- State
- Architecture
- Trade-offs

When Angular is selected:
- show Angular TypeScript sample
- explain Signals/RxJS or local state approach
- explain Angular strengths/trade-offs

When React is selected:
- show React TSX sample
- explain useState, useMemo, useEffect
- explain React strengths/trade-offs

When Svelte is selected:
- show Svelte sample
- explain native Svelte reactivity
- explain Svelte strengths/trade-offs

Remove:
- “React engine coming soon”
- “Svelte engine coming soon”
- any placeholder text that suggests engines are not implemented

Replace with:
- “React engine active”
- “Svelte engine active”
- accurate explanation of the implementation

==================================================
10. SOURCE CODE PANEL SAMPLE CONTENT
==================================================

Use short realistic snippets, not huge full files.

Angular source tab should show:
- computed filtered items or equivalent state logic
- selected item logic

React source tab should show:
- useState
- useMemo
- filtered items
- selected item

Svelte source tab should show:
- reactive variables
- derived filtered/sorted items
- selected item

Keep snippets readable.
Do not paste entire component files into the right panel.

==================================================
11. UI REQUIREMENTS
==================================================

Preserve the existing UI preview/design direction:
- dark developer dashboard
- left sidebar
- center canvas
- right context/code panel
- green active navigation/selection
- rounded dark panels
- subtle borders
- Tailwind-based styling
- mature developer-platform look

React and Svelte engines must not look like separate apps.
They must visually match the Angular Workbench.

Do not introduce:
- white default React styling
- Svelte default styling
- default browser buttons
- inconsistent fonts
- different spacing system
- different colours

Use matching classes/styles.

==================================================
12. BUILD SCRIPT REQUIREMENTS
==================================================

Add scripts to package.json if needed.

Suggested scripts:

build:react-engine
build:svelte-engine
build:engines
start
build

The final setup should allow:

npm run build:engines
npm run start

or

npm run build

to produce/serve the Angular app with the React and Svelte engine scripts available under:

/engines/react-workbench.js
/engines/svelte-workbench.js

If Angular public assets folder is different in this project, adapt accordingly.

Document the commands clearly in README or comments.

==================================================
13. ERROR HANDLING
==================================================

If React engine script fails to load:
- show a polished inline error card
- do not crash the Angular app

If Svelte engine script fails to load:
- show a polished inline error card
- do not crash the Angular app

If a custom element is already defined:
- do not throw duplicate registration errors
- check customElements.get before defining

If selected engine is unavailable:
- show an honest error message, not “coming soon”

==================================================
14. ACCESSIBILITY
==================================================

All three engines must be usable and accessible.

Requirements:
- framework selector is keyboard accessible
- search input has label or aria-label
- filter/select controls have labels
- table/list is readable by screen readers
- selected state is visible and not only color-based
- buttons have clear labels
- focus states remain visible
- no critical content on hover only

==================================================
15. PERFORMANCE
==================================================

Lazy-load React/Svelte engine scripts only when selected.

Do not include React/Svelte engines in the initial Angular bundle unless unavoidable.

Angular first load should remain fast.

Avoid:
- loading all engines immediately
- heavy libraries
- duplicate styling frameworks
- large image assets
- unnecessary dependencies

==================================================
16. ACCEPTANCE CRITERIA
==================================================

This task is complete when:

1. Angular remains the main app shell.
2. Angular Workbench still works.
3. React engine renders a real interactive Workbench.
4. Svelte engine renders a real interactive Workbench.
5. Framework selector switches between all three engines.
6. Right context panel updates for Angular, React and Svelte.
7. No “coming soon” messages remain for React/Svelte.
8. All three engines share the same visual design language.
9. All three engines have search, filter, sort, KPI cards and selected details.
10. React/Svelte are loaded safely without crashing Angular.
11. There are no duplicate custom element registration errors.
12. There are no console errors.
13. The layout remains responsive.
14. Tailwind/dark developer-platform UI is preserved.
15. Code is clean, typed and maintainable.
16. README or package scripts explain how to build/run the engines.

==================================================
17. FINAL INSTRUCTION
==================================================

Think like a senior developer.

Do not over-engineer.
Do not rebuild the entire app.
Do not introduce heavy microfrontend complexity.

Implement React and Svelte engines as clean, isolated custom elements mounted inside the Angular Workbench.

Make the feature impressive, but keep the architecture understandable and maintainable.