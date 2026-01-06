## 2024-05-22 - Toggle Buttons Accessibility
**Learning:** For toggle buttons (like interest selection), using `aria-pressed` on a `<button>` is a robust pattern that communicates state to screen readers better than just class changes.
**Action:** Always include `aria-pressed={isActive}` on buttons that toggle a state.
