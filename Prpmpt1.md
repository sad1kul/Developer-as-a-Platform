You are acting as a senior Angular frontend architect, UI engineer, and product-minded software developer.

Your task is to build the first production-quality version of my developer portfolio website based on the supplied UI preview image.

This is not a generic portfolio.

This is a Dev-First, Multi-Knowledge Portfolio called:

**Sadikul Islam — Developer-as-a-Platform**

The website must look and feel like a premium developer platform, API documentation portal, engineering dashboard, and IDE/workbench interface.

The default and primary framework is **Angular**.

Do not build this first version in React or Svelte.

React and Svelte are only shown as future/secondary framework engines inside the interface.

---

## 1. Main Objective

Build a polished Angular portfolio landing page that closely follows the supplied UI preview.

The page should communicate within the first 3–5 seconds:

**Name:**
Sadikul Islam

**Identity:**
Software Developer

**Stack:**
TypeScript · Angular · Node.js · React · Svelte

**Positioning:**
Developer-as-a-Platform

**Core message:**
I build clean, maintainable, scalable web applications with a developer-first mindset. I care about code quality, frontend architecture, backend APIs, debugging, user experience, maintainability, and real-world problem solving.

Important:

* This first version must focus on my developer profile only.
* Do not lead with fintech yet.
* Do not overstate unfinished projects.
* Do not invent completed projects.
* Do not add fake experience.
* Do not add fake metrics.
* Do not create generic portfolio sections that feel copied from templates.

---

## 2. Framework and Tech Configuration

**Primary framework:**
Angular

**Main stack:**
Angular + TypeScript + Tailwind CSS + minimal SCSS/CSS + local mock data

Use:

* Angular standalone components
* TypeScript
* Tailwind CSS as the primary styling system
* Minimal SCSS/CSS only for custom effects that Tailwind cannot express cleanly
* Angular Router only if needed or already configured
* Responsive CSS Grid/Flexbox using Tailwind utilities
* CSS variables only where useful for theme consistency
* Lightweight CSS animations only
* Local mock data for the first version
* Strongly typed interfaces/models

Do not use:

* React as the main app framework
* Svelte as the main app framework
* Bootstrap
* Angular Material
* Generic template UI libraries
* Heavy animation libraries
* 3D libraries
* Unnecessary dependencies
* Fake backend APIs
* Real database integration for MVP

If this is a new Angular project:

* Use the latest Angular version available in the environment.
* Use standalone component architecture.
* Enable strict TypeScript where possible.
* Configure Tailwind CSS properly for Angular.
* Use SCSS only if needed for custom polish.
* Keep the app simple, fast, and maintainable.

If this is an existing Angular project:

* Inspect the project first.
* Read `package.json`.
* Check the existing Angular version.
* Check whether standalone components are already used.
* Check whether Tailwind is already installed.
* If Tailwind is not installed, install and configure it correctly.
* Follow the existing folder structure and style conventions where reasonable.
* Do not break existing routes.
* Do not delete existing files unless clearly obsolete and safe.
* Do not install unnecessary dependencies.

Tailwind setup requirements:

* Install and configure Tailwind CSS for Angular if it is not already installed.
* Configure `tailwind.config.js` or the current Tailwind config file correctly.
* Ensure Angular template files are included in Tailwind content scanning.
* Add Tailwind base, components, and utilities to the global stylesheet.
* Use Tailwind utility classes for layout, spacing, cards, badges, responsive grids, hover states, dark theme styling, and typography.
* Keep Tailwind classes readable and organized.
* Extract repeated UI patterns into reusable Angular components.
* Do not create a messy mix of large SCSS files and Tailwind classes.
* The final UI must not look like a default Tailwind template.

Use minimal SCSS/CSS only for:

* custom scrollbar styling
* subtle glow effects
* code panel polish
* reduced-motion overrides
* small animation refinements
* theme-specific details that are awkward in Tailwind

Icons:

* If an icon package already exists, use it.
* If no icon package exists, use simple inline SVG icons or lightweight custom icons.
* Do not install a heavy icon library just for this page.

Syntax highlighting:

* For the first version, create a styled static code block manually.
* Do not install Prism.js or Highlight.js unless already present.
* Later we may add real syntax highlighting.

---

## 3. Visual Direction

Follow the supplied UI preview closely.

The visual style should be:

* dark developer dashboard
* premium API docs
* engineering workbench
* VS Code / One Dark inspired
* mature and clean
* technical but not childish
* high contrast but not neon-heavy
* subtle glow only on key active states
* soft borders
* clean spacing
* readable typography
* professional card layout

Avoid:

* fake hacker terminal look
* gaming UI
* long boot animation
* LAN cable/router animation
* childish neon effects
* random floating particles
* slow typing animation
* fake loading screens
* excessive motion
* copied template feel

Color direction:

* background: deep charcoal / near black
* panels: dark slate
* borders: subtle slate/green tinted borders
* accent: emerald green
* secondary accent: muted cyan or blue
* warning: amber
* error: red/orange
* text: off-white
* muted text: slate gray

Use Tailwind theme configuration and/or CSS variables for these tokens where helpful:

* background main
* panel background
* soft panel background
* subtle border
* active border
* main text
* muted text
* emerald accent
* cyan accent
* purple accent
* warning
* danger

---

## 4. Layout Requirements

Build a three-panel desktop layout.

Desktop layout:

1. Left Sidebar
2. Center Canvas
3. Right Context Panel

The page should resemble the preview image.

### Left Sidebar

The left sidebar should include:

* sticky vertical sidebar
* brand/profile area at the top
* navigation links
* system status block
* quick social/CV buttons
* footer text

### Center Canvas

The center content area should include:

* top status bar
* hero section
* terminal-style profile card
* Cross-Framework Workbench section
* engineering principle cards
* technical profile
* systems in progress
* about/contact sections

### Right Context Panel

The right panel should include:

* sticky or fixed-width context panel
* tabs:

  * Source Code
  * State
  * Architecture
  * Trade-offs
* code preview
* explanation cards
* compared frameworks area

### Mobile Layout

On mobile:

* collapse sidebar into top/header navigation or mobile drawer
* center content becomes full width
* right panel becomes collapsible or moves below main content
* avoid horizontal scrolling
* keep buttons accessible
* keep the workbench table usable
* stack cards cleanly

Responsive behavior:

* desktop: three-column layout
* tablet: sidebar + content, with right panel below or collapsible
* mobile: single-column stacked layout

---

## 5. Page Structure

Build one landing page with these major sections:

1. App Shell
2. Sidebar Navigation
3. Top Status Bar
4. Hero Section
5. Profile Terminal Card
6. Cross-Framework Workbench
7. Engineering Principles
8. Technical Snapshot
9. Systems in Progress
10. About Section
11. Contact / CTA Footer
12. Right Context Panel

For the first implementation, all sections can exist on one page with anchor navigation.

If routing already exists, use routes only if it fits the current project structure.

---

## 6. Sidebar Content

Top brand area:

**Name:**
Sadikul Islam

**Subtitle:**
Developer-as-a-Platform

Use a small geometric logo/avatar placeholder.
It should look like a developer platform mark, not a cartoon avatar.

Navigation:

* Overview
* Workbench
* Tech Profile
* Architecture
* Systems (Soon)
* About Me
* Contact

The active item should have:

* emerald tinted background
* clear active indicator
* icon
* readable text

System status block:

**Title:**
SYSTEM STATUS

**Status:**
All systems operational

**Last deployed:**
Use a neutral placeholder date or build placeholder. Do not invent real deployment history.

**Version:**
v1.0.0

Footer quick links:

* GitHub
* LinkedIn
* CV

Footer text:

© 2026 Sadikul Islam
Built with Angular

Use my real links:

GitHub: `https://github.com/sad1kul`
LinkedIn: `https://www.linkedin.com/in/sadikul-islam-553a2669/`
CV: `/assets/Sadikul-Islam-CV.pdf`

If the CV file does not exist, still create the link but make it easy to replace later.

---

## 7. Top Status Bar

At the top of the center canvas, create a slim status bar.

Left side:

**Developer Mode**

Right side:

**Available for opportunities**

Use a small green dot next to the availability status.

Do not make this flashy.
It should look like a professional app status indicator.

---

## 8. Hero Section

The hero must communicate who I am within 3–5 seconds.

Use this content:

**Hi, I’m**

**Sadikul Islam**

**Software Developer | TypeScript · Angular · Node.js · React · Svelte**

I build clean, maintainable and scalable web applications with a developer-first mindset. I care about code quality, user experience and solving real-world problems.

CTA buttons:

* View Workbench
* View Tech Profile
* GitHub icon button
* LinkedIn icon button
* Download CV

Button behavior:

* View Workbench scrolls to the workbench section.
* View Tech Profile scrolls to the tech profile section.
* GitHub opens GitHub link.
* LinkedIn opens LinkedIn link.
* Download CV opens/downloads the CV placeholder.

Important:

* The hero must be readable instantly.
* No slow animation.
* No hidden content.
* No forced interaction.

---

## 9. Profile Terminal Card

Create a small terminal-style profile card on the right side of the hero area inside the center canvas.

It should show:

**~/whoami**

* `name:` Sadikul Islam
* `role:` Software Developer
* `focus:` Frontend Architecture, Backend APIs, Developer Tools
* `experience:` Building & Learning
* `location:` Bangladesh
* `status:` Open to opportunities

Important:

* Do not claim specific years of experience unless this already exists in supplied CV/project data.
* Use “Building & Learning” or “Growing through real projects” if experience years are unknown.
* Do not hallucinate experience numbers.
* The card should look like a clean terminal snippet, not a fake hacker screen.

---

## 10. Cross-Framework Workbench

Section title:

**Cross-Framework Workbench**

Subtitle:

**Same component. Three frameworks. Different approaches.**

This is the main unique feature of the portfolio.

For this first version:

* Angular is active and implemented.
* React and Svelte appear as selectable or disabled options.
* If React/Svelte are not implemented yet, show a polished “coming soon” state.
* Do not make the page look broken.

Framework selector:

**Engine:**
Angular | React | Svelte

Angular should be active by default.

### Workbench Content

Create a developer-focused data grid/table.

Use example modules:

1. Authentication Service
2. User Profile Module
3. Payment Gateway Adapter
4. Notification Service
5. Analytics Dashboard
6. API Contract Monitor
7. Error Tracking Service
8. Deployment Pipeline

Each item should have:

* ID
* Name
* Status
* Priority
* Updated
* Description
* Tech tags

Statuses:

* Active
* Pending
* Warning
* Error
* In Review

Priorities:

* Low
* Medium
* High
* Critical

Workbench features:

* KPI cards
* search input
* status filter
* sort dropdown
* refresh/simulate update button
* data table
* selected row highlight
* selected item detail panel

KPI cards:

* Total Items
* Active
* Pending
* Errors

The selected detail card should show:

* selected module title
* ID
* status badge
* description
* tech tags
* last update

Initial selected item:

**Authentication Service**

Example Authentication Service description:

Handles user authentication, JWT validation and session management.

Do not connect to a backend yet.
Use local mock data.
Keep data strongly typed in TypeScript.

---

## 11. Right Context Panel

The right context panel should visually match the preview.

Tabs:

* Source Code
* State
* Architecture
* Trade-offs

Default active tab:

**Source Code**

### Source Code Tab

Show a styled code block titled:

**Angular (TypeScript)**

Use a realistic but short Angular code sample relevant to the portfolio/workbench.

It does not need to be the full actual component.
Keep it readable.

Include:

* filename label
* copy icon button
* optional line numbers
* syntax-colored tokens using CSS/Tailwind styling or simple styled spans

### State Tab

Explain Angular state approach:

* local component state
* computed filtered items
* selected item
* framework toggle
* future React/Svelte engines

### Architecture Tab

Explain:

* Angular shell as the main platform
* workbench component as the first technical proof
* React/Svelte can later be mounted as Web Components
* right panel provides technical context

### Trade-offs Tab

Explain honestly:

Angular strengths:

* strong structure and conventions
* TypeScript-first
* scalable for larger apps
* robust ecosystem

Angular trade-offs:

* more boilerplate than smaller libraries
* steeper learning curve
* requires discipline in module/component boundaries

Compared Frameworks:

Show small buttons/cards for:

* React
* Svelte

React note:

Coming soon: hooks-based implementation.

Svelte note:

Coming soon: compiler-driven reactivity implementation.

---

## 12. Engineering Principle Cards

Add four to six principle cards under the workbench, similar to the preview.

Cards:

### Clean Code

Readable, maintainable and scalable code.

### Performance

Optimized for speed and smooth user experience.

### Developer Experience

Tools, automation and clear workflows.

### Problem Solver

I enjoy solving real-world technical problems.

### Architecture Mindset

I care about structure, data flow and maintainability.

### Practical Delivery

I prefer useful working software over unnecessary complexity.

Use subtle icons and professional card styling.

---

## 13. Technical Snapshot Section

Create a section with compact technical categories.

Title:

**Technical Profile**

Groups:

### Frontend

Angular, TypeScript, RxJS, React, Svelte, HTML, SCSS

### Backend

Node.js, Express, REST APIs, JWT, Zod, middleware

### Architecture

component design, routing, service layers, state management, API contracts

### Tooling

Git, GitHub, Postman, browser dev tools, cPanel deployment

### Quality

debugging, error handling, testing basics, clean code, maintainable structure

### Currently improving

advanced testing, CI/CD, system design, cloud deployment, deeper backend architecture

Do not exaggerate.
Do not claim expert-level mastery unless proven.
Use mature wording.

---

## 14. Systems in Progress Section

Create a section:

**Systems in Progress**

Purpose:

Prepare space for future projects without pretending they are complete.

Cards:

### Developer-as-a-Platform

**Status:** Building

This portfolio itself — a developer portal-style profile built to demonstrate technical thinking, frontend architecture and cross-framework understanding.

### Reactive Data Workbench

**Status:** Building

A cross-framework UI experiment comparing Angular, React and Svelte approaches to state, reactivity and component architecture.

### TrustBridge

**Status:** Planned

Fintech complaint and dispute intelligence platform. Will be added later as a full project case study.

### SignalDesk

**Status:** Planned

Proactive user-friction and incident radar. Will be added later as a full project case study.

### AI Browser Debug Bridge

**Status:** Planned

Developer productivity tool connecting browser runtime context with coding assistants.

Important:

* Show planned items honestly.
* Do not add fake live links.
* Use “Coming soon,” “Building,” or “Planned” badges.

---

## 15. About Section

Create an About section written as a developer story.

Use this copy or improve slightly without changing meaning:

I am a software developer focused on building practical, maintainable web systems. My background includes IT support, customer-facing operations and software development, which helps me understand how systems behave in real environments, not only in code.

I am currently strengthening my work around frontend architecture, backend APIs, debugging workflows, developer tooling and business-aware software design. This portfolio starts as a developer-first platform, and will later expand with deeper project case studies, fintech systems, CRM workflows and research-backed business analysis.

Keep it honest, calm and professional.

---

## 16. Contact Section

Create a Contact / Opportunities section.

Copy:

**Open to software developer, frontend developer, Angular developer, junior full-stack, internal tools, CRM and business systems roles.**

Add buttons:

* GitHub
* LinkedIn
* Download CV
* Email Me

Use email placeholder:

`your-email@example.com`

Make the email easy to update.

---

## 17. Accessibility Requirements

Must include:

* semantic HTML
* accessible buttons
* visible focus states
* keyboard navigable controls
* good color contrast
* readable font sizes
* reduced-motion support
* no critical information hidden behind hover only
* aria labels where needed
* no fake buttons using only divs

Use `prefers-reduced-motion` media query.

Keep animations subtle.

---

## 18. Performance Requirements

The site must be fast.

Avoid:

* heavy libraries
* 3D assets
* huge images
* unnecessary dependencies
* slow animation
* fake loading
* large custom CSS files when Tailwind utilities can handle layout cleanly

Use:

* Tailwind utility classes for layout, spacing, cards, badges, responsive grids, hover states, and dark theme styling
* CSS-only animations
* lightweight layout
* optimized asset usage
* local mock data
* lazy loading only if useful

---

## 19. Code Quality Requirements

Use clean, maintainable code.

Requirements:

* strongly typed data models/interfaces
* reusable UI components where sensible
* no large messy component files if avoidable
* clear naming
* no hardcoded repeated values where constants make sense
* no console errors
* no unused imports
* no dead code
* no broken links except intentional placeholders
* no fake data that looks like real private data
* no secrets
* no `.env` exposure
* no `node_modules` committed

Angular-specific:

* use standalone components
* use OnPush change detection if suitable
* use signals if the Angular version supports it
* if signals are not available, use clean component state or RxJS
* keep services separate if data logic grows
* keep mock data in a separate file if practical
* use Angular Router only if already configured or genuinely needed

Tailwind-specific:

* use Tailwind as the main styling approach
* keep class usage readable
* extract repeated UI patterns into reusable Angular components
* use minimal SCSS/CSS only for custom polish that Tailwind cannot express cleanly
* do not create a messy mix of large SCSS files and Tailwind classes
* do not use Angular Material
* do not use Bootstrap
* preserve the custom dark developer-platform look from the preview image
* avoid default Tailwind-template appearance

Suggested Angular structure:

src/app/
app.component.ts
app.component.html
app.component.scss

core/
models/
workbench-item.model.ts
data/
workbench-items.data.ts

layout/
shell/
sidebar/
context-panel/

features/
overview/
workbench/
technical-profile/
systems/
about/
contact/

shared/
components/
section-card/
status-badge/
icon-button/
code-block/

If the project is small, do not over-engineer. It is acceptable to keep fewer components for the MVP, but the structure must remain clean.

---

## 20. Routing Requirements

For the first version, prefer same-page anchor navigation unless routing already exists.

Use section IDs:

* overview
* workbench
* tech-profile
* architecture
* systems
* about
* contact

Sidebar links should scroll to sections.

If Angular Router exists and is already configured, do not break it.

Use `routerLink` only if appropriate.

---

## 21. Content Rules

Do not hallucinate:

* years of experience
* employers
* job titles
* completed projects
* certifications
* degrees beyond what is provided
* live demos
* backend APIs
* production deployments
* metrics
* client names

Known facts:

* Name: Sadikul Islam
* Developer focus: Angular, TypeScript, Node.js, React, Svelte
* Strong interest in developer tools, frontend architecture, backend APIs, debugging, workflow systems
* GitHub: `https://github.com/sad1kul`
* LinkedIn: `https://www.linkedin.com/in/sadikul-islam-553a2669/`
* Portfolio concept: Developer-as-a-Platform
* Default framework: Angular
* Main styling system: Tailwind CSS

If more detail is needed, use placeholders clearly marked as placeholders.

---

## 22. UI Matching Instructions

Use the supplied UI preview as the visual target.

Match these key elements:

* dark full-screen dashboard layout
* left fixed sidebar
* center hero and workbench
* right fixed context/code panel
* green active navigation item
* subtle glass/dark panels
* hero with large name
* terminal-style whoami card
* workbench card with KPI stats, search, filter, table and detail card
* right code panel with tabs
* engineering principle cards at bottom
* professional green/cyan accents
* rounded cards
* thin borders
* clean spacing

Do not copy the preview blindly if implementation requires adjustment, but preserve the overall look and feel.

---

## 23. First MVP Deliverable

Build the first complete MVP with:

1. Angular developer-platform shell
2. Tailwind CSS configuration
3. Left sidebar
4. Center hero
5. Profile terminal card
6. Cross-Framework Workbench
7. Angular data workbench implementation
8. Framework selector with Angular active
9. React/Svelte polished coming-soon states
10. Right context/code panel
11. Engineering principle cards
12. Technical profile section
13. Systems in progress section
14. About section
15. Contact section
16. Responsive mobile layout
17. Accessibility basics
18. Clean dark professional styling built mainly with Tailwind CSS, with minimal SCSS/CSS only where needed
19. GitHub, LinkedIn and CV placeholder links

---

## 24. Acceptance Criteria

The implementation is successful if:

* It looks close to the supplied preview image.
* It feels like a premium developer platform, not a generic portfolio.
* It is clearly Angular-first.
* It uses Tailwind CSS as the primary styling system.
* It does not overclaim experience or projects.
* It communicates my developer identity within 5 seconds.
* The workbench is interactive and useful.
* The right context panel adds technical credibility.
* React/Svelte are shown as planned engines without looking broken.
* The design is mature, not childish.
* The layout works on desktop and mobile.
* The code is clean, maintainable and easy to extend.
* There are no console errors.
* There are no unnecessary dependencies.
* There is no fake loading sequence.
* There are no hallucinated personal claims.
* Future fintech, CRM, research and project case studies can be added later without redesigning the whole website.

---

## 25. Final Instruction

Think like a senior developer.

If any part of the request creates unnecessary complexity, simplify it while preserving the core concept.

Prioritize:

1. recruiter clarity
2. technical credibility
3. maintainable Angular structure
4. professional UI
5. Tailwind-based implementation quality
6. fast delivery
7. future extensibility

Do not ask me unnecessary questions.
Make sensible implementation decisions and proceed.
