## 2024-05-22 - Input Component Accessibility
**Learning:** `pointer-events-none` on parent containers of icons in Input components prevents interactivity for functional icons (like password visibility toggles or clear buttons).
**Action:** Avoid `pointer-events-none` on icon wrappers in shared components unless you are certain the icons are purely decorative.

## 2024-05-24 - Accessible Onboarding Patterns
**Learning:** For multi-step wizards, a single container with `role="progressbar"` provides better context than individual accessible dots. `aria-pressed` on toggle buttons communicates state efficiently without extra labels.
**Action:** Apply `role="progressbar"` to step containers and `aria-pressed` to selection grids.
