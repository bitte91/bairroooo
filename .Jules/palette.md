## 2024-05-22 - Filter Button State Accessibility
**Learning:** Using both dynamic text labels (e.g., "Show All") and `aria-pressed` on a toggle button creates a confusing "double negative" or conflicting state for screen readers.
**Action:** Use a static, descriptive label (e.g., "Filter by Open") and rely on `aria-pressed` to convey the active/inactive state.
