## 2024-05-22 - Input Component Accessibility
**Learning:** `pointer-events-none` on parent containers of icons in Input components prevents interactivity for functional icons (like password visibility toggles or clear buttons).
**Action:** Avoid `pointer-events-none` on icon wrappers in shared components unless you are certain the icons are purely decorative.

## 2025-05-18 - Icon-Only Button Accessibility
**Learning:** Icon-only buttons (`size="icon"`) were consistently missing `aria-label` attributes across multiple features (Services, Commerce, Events, News, Profile), making them inaccessible to screen readers.
**Action:** Always verify that `Button` components with `size="icon"` include a descriptive `aria-label`.
