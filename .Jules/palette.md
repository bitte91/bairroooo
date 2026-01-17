## 2024-05-22 - Input Component Accessibility
**Learning:** `pointer-events-none` on parent containers of icons in Input components prevents interactivity for functional icons (like password visibility toggles or clear buttons).
**Action:** Avoid `pointer-events-none` on icon wrappers in shared components unless you are certain the icons are purely decorative.

## 2024-05-23 - Interactive Element Accessibility
**Learning:** Elements like `Badge` or `Card` often get used as buttons via `onClick` but lack semantic `role="button"` and keyboard support. Also, when adding internal event handlers (e.g., `onKeyDown` for accessibility), spreading `...props` *after* the handler will overwrite it if the consumer passes their own handler.
**Action:** Detect `onClick` to automatically add `role="button"`, `tabIndex={0}`, and `onKeyDown`. Always spread `...props` *before* internal overrides to ensure accessibility logic persists.
