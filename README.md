# Sadikul Islam — Developer-as-a-Platform

**Live Demo:** https://sadikul.me  
**CV:** https://sadikul.me/assets/Sadikul-Islam-CV.pdf  
**Contact:** sadik@sadikul.me

## Why I Built This

This is not a normal static portfolio. I built it as a developer platform-style profile to show how I think about frontend architecture, framework boundaries, business workflows, and cross-framework implementation.

## What Makes It Different

- Angular shell with React and Svelte workbench engines
- Cross-framework component comparison
- Typed data and model structure
- Local demo data with honest labels
- Case studies based on practical business workflows
- Recruiter-friendly source links and CV access

## Tech Stack

| Area | Tools |
|---|---|
| Frontend | Angular, TypeScript, RxJS, Tailwind |
| Engines | React, Svelte, Custom Elements, Shadow DOM |
| State | Angular Signals, React Hooks, Svelte Reactivity |
| Build | Vite, Angular CLI |
| Quality | GitHub Actions build check, tests planned |

## Architecture

### Shell Layer
Angular layout, navigation, status bar, and section flow.

### Workbench Layer
Interactive module table with filtering, sorting, selection, and detail context.

### Engine Layer
React and Svelte engines loaded as custom elements.

### Data Layer
Typed portfolio and workbench data stored separately from UI components.

## Case Studies

- Cross-Framework Workbench
- Travel CRM / Booking Workflow
- Fintech Transaction Support Workflow
- AI Browser Debug Bridge

## Run Locally

```bash
git clone https://github.com/sad1kul/developer-as-a-platform
cd developer-as-a-platform
npm install
npm run build
npm start
```
