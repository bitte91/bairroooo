## 2024-05-22 - Input Component Accessibility
**Learning:** `pointer-events-none` on parent containers of icons in Input components prevents interactivity for functional icons (like password visibility toggles or clear buttons).
**Action:** Avoid `pointer-events-none` on icon wrappers in shared components unless you are certain the icons are purely decorative.

## 2024-05-23 - Interactive Badge Accessibility
**Learning:** `Badge` components are often used as toggle buttons (filters) but lacked keyboard accessibility.
**Action:** Automatically apply `role="button"`, `tabIndex={0}`, and `onKeyDown` (Enter/Space) when `onClick` is provided to generic UI components like `Badge`.
