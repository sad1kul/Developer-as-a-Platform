export const workbenchStyles = `
:host {
  display: block;
}

* {
  box-sizing: border-box;
}

.engine-shell {
  display: grid;
  gap: 1rem;
  color: #e5edf6;
  font-family: "Space Grotesk", system-ui, sans-serif;
}

.engine-status {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 0.5rem;
  border: 1px solid rgba(33, 210, 138, 0.34);
  border-radius: 0.5rem;
  background: rgba(33, 210, 138, 0.1);
  padding: 0.35rem 0.5rem;
  color: #21d28a;
  font-size: 0.75rem;
  font-weight: 600;
}

.engine-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 999px;
  background: #21d28a;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 0.75rem;
}

.kpi-card,
.toolbar,
.table-shell,
.detail-card,
.mobile-row {
  border: 1px solid #1c3149;
  border-radius: 0.75rem;
  background: rgba(15, 32, 54, 0.7);
}

.kpi-card {
  padding: 0.875rem;
}

.kpi-label {
  margin: 0;
  color: #91a5bf;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.kpi-value {
  margin: 0.45rem 0 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.kpi-caption {
  margin: 0.2rem 0 0;
  color: #47bfd9;
  font-size: 0.75rem;
  font-weight: 600;
}

.toolbar {
  display: grid;
  gap: 0.75rem;
  padding: 0.75rem;
}

.controls {
  display: grid;
  gap: 0.5rem;
}

.control {
  min-width: 0;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

input,
select,
button {
  font: inherit;
}

input,
select {
  width: 100%;
  border: 1px solid #1c3149;
  border-radius: 0.5rem;
  background: rgba(4, 10, 20, 0.72);
  color: #e5edf6;
  padding: 0.625rem 0.75rem;
  font-size: 0.875rem;
}

input::placeholder {
  color: #91a5bf;
}

button {
  cursor: pointer;
}

button:focus-visible,
input:focus-visible,
select:focus-visible {
  outline: 2px solid rgba(71, 191, 217, 0.85);
  outline-offset: 2px;
}

.simulate-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: 1px solid #1c3149;
  border-radius: 0.5rem;
  background: rgba(4, 10, 20, 0.72);
  color: #e5edf6;
  padding: 0.625rem 0.75rem;
  font-size: 0.875rem;
  transition: border-color 160ms ease, color 160ms ease;
}

.simulate-button:hover {
  border-color: rgba(71, 191, 217, 0.5);
  color: #47bfd9;
}

.simulate-meta {
  color: #91a5bf;
  font-size: 0.75rem;
}

.engine-grid {
  display: grid;
  gap: 1rem;
}

.mobile-list {
  display: grid;
  gap: 0.75rem;
}

.mobile-row {
  width: 100%;
  padding: 1rem;
  color: inherit;
  text-align: left;
  transition: border-color 160ms ease, background 160ms ease;
}

.mobile-row:hover {
  border-color: rgba(71, 191, 217, 0.4);
}

.mobile-row.selected,
.table-row.selected {
  background: rgba(33, 210, 138, 0.12);
  box-shadow: inset 2px 0 0 rgba(33, 210, 138, 0.85);
}

.mobile-topline {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
}

.module-name {
  display: block;
  color: #e5edf6;
  font-weight: 600;
}

.module-id {
  display: block;
  margin-top: 0.25rem;
  color: #91a5bf;
  font-family: "IBM Plex Mono", SFMono-Regular, Menlo, monospace;
  font-size: 0.75rem;
}

.mobile-meta {
  display: grid;
  gap: 0.4rem;
  margin-top: 0.75rem;
  color: #91a5bf;
  font-size: 0.75rem;
}

.description {
  margin: 0.75rem 0 0;
  color: #91a5bf;
  font-size: 0.875rem;
  line-height: 1.55;
}

.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  margin-top: 0.75rem;
}

.tag {
  border: 1px solid #1c3149;
  border-radius: 0.375rem;
  background: rgba(4, 10, 20, 0.7);
  color: #e5edf6;
  padding: 0.25rem 0.45rem;
  font-size: 0.75rem;
}

.table-shell {
  display: none;
  overflow: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

thead {
  border-bottom: 1px solid rgba(28, 49, 73, 0.8);
  background: rgba(4, 10, 20, 0.5);
}

th {
  color: #91a5bf;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  padding: 0.75rem;
  text-align: left;
  text-transform: uppercase;
}

td {
  border-bottom: 1px solid rgba(28, 49, 73, 0.5);
  color: #91a5bf;
  padding: 0.75rem;
  vertical-align: top;
}

.empty-state-cell {
  color: #91a5bf;
  padding: 2rem 1rem;
  text-align: center;
}

.table-row {
  transition: background 160ms ease;
}

.table-row:hover {
  background: rgba(4, 10, 20, 0.5);
}

.name-button {
  border: 0;
  background: transparent;
  color: #e5edf6;
  padding: 0;
  text-align: left;
  transition: color 160ms ease;
}

.name-button:hover {
  color: #47bfd9;
}

.mono {
  font-family: "IBM Plex Mono", SFMono-Regular, Menlo, monospace;
  font-size: 0.75rem;
}

.badge {
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  border: 1px solid;
  border-radius: 999px;
  padding: 0.125rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
}

.status-active {
  border-color: rgba(33, 210, 138, 0.4);
  background: rgba(33, 210, 138, 0.15);
  color: #21d28a;
}

.status-pending,
.status-warning,
.priority-medium {
  border-color: rgba(231, 184, 90, 0.4);
  background: rgba(231, 184, 90, 0.15);
  color: #e7b85a;
}

.status-error,
.priority-high,
.priority-critical {
  border-color: rgba(244, 111, 111, 0.45);
  background: rgba(244, 111, 111, 0.15);
  color: #f46f6f;
}

.status-in-review,
.priority-low {
  border-color: rgba(71, 191, 217, 0.4);
  background: rgba(71, 191, 217, 0.15);
  color: #47bfd9;
}

.priority-critical {
  background: rgba(244, 111, 111, 0.22);
}

.detail-card {
  padding: 1rem;
}

.detail-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
}

.detail-title {
  margin: 0;
  color: #e5edf6;
  font-size: 1.125rem;
}

.empty-state {
  border: 1px solid #1c3149;
  border-radius: 0.75rem;
  background: rgba(15, 32, 54, 0.7);
  color: #91a5bf;
  padding: 2rem 1rem;
  text-align: center;
}

@media (min-width: 640px) {
  .kpi-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .controls {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 768px) {
  .mobile-list {
    display: none;
  }

  .table-shell {
    display: block;
  }
}

@media (min-width: 1024px) {
  .toolbar {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
  }

  .controls {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1280px) {
  .kpi-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .engine-grid {
    grid-template-columns: minmax(0, 1fr) 280px;
  }
}

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    transition-duration: 0.001ms !important;
  }
}
`;
