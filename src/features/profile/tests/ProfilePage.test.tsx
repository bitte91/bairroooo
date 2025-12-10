import { render, screen, fireEvent } from '@testing-library/react';
import { ProfilePage } from '../ProfilePage';
import { ThemeProvider } from '../../../presentation/components/ThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';

// Mock localStorage
const localStorageMock = (function () {
  let store: Record<string, string> = {};
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value;
    },
    clear() {
      store = {};
    },
    removeItem(key: string) {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('ProfilePage', () => {
  it('renders the theme toggle', () => {
    render(
      <BrowserRouter>
        <ThemeProvider>
            <ProfilePage />
        </ThemeProvider>
      </BrowserRouter>
    );

    expect(screen.getByText('Modo Escuro')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /alternar tema/i })).toBeInTheDocument();
  });

  it('toggles theme when clicked', () => {
    render(
      <BrowserRouter>
        <ThemeProvider defaultTheme="light">
            <ProfilePage />
        </ThemeProvider>
      </BrowserRouter>
    );

    const toggleButton = screen.getByRole('button', { name: /alternar tema/i });

    // Initial state (light)
    expect(window.document.documentElement.classList.contains('light')).toBe(true);

    // Click to toggle
    fireEvent.click(toggleButton);

    // Should be dark now
    expect(window.document.documentElement.classList.contains('dark')).toBe(true);

    // Click to toggle back
    fireEvent.click(toggleButton);

    // Should be light again
    expect(window.document.documentElement.classList.contains('light')).toBe(true);
  });
});
