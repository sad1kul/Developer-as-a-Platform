# Developer-as-a-Platform

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

## Cross-framework workbench engines

Angular remains the primary app shell. The React and Svelte workbench engines are isolated custom elements that are built into static browser scripts:

- `public/engines/react-workbench.js`
- `public/engines/svelte-workbench.js`

Build only the external engines:

```bash
npm run build:engines
```

Build the full portfolio, including the React and Svelte engine scripts:

```bash
npm run build
```

## Development server

To start a local development server, run:

```bash
npm run start
```

`npm run start` builds the React/Svelte engine scripts first, then starts Angular. Once the server is running, open your browser and navigate to `http://localhost:4200/`.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
npm run build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
