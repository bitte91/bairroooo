## 2024-05-22 - Input Component Accessibility
**Learning:** `pointer-events-none` on parent containers of icons in Input components prevents interactivity for functional icons (like password visibility toggles or clear buttons).
**Action:** Avoid `pointer-events-none` on icon wrappers in shared components unless you are certain the icons are purely decorative.
