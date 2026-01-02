## 2024-05-22 - Badge Interactivity
**Learning:** Common pattern: `div` based badges used as filter buttons are inaccessible.
**Action:** Upgraded `Badge.tsx` to detect `onClick` and automatically add `role="button"`, `tabIndex={0}`, and `onKeyDown` (Enter/Space support). Consumers must still add `aria-pressed` for selection state.
