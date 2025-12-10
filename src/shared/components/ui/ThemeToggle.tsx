import React from 'react';
import { useTheme } from '../../../presentation/components/ThemeProvider';
import { Moon, Sun } from 'lucide-react';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="relative inline-flex h-6 w-11 items-center rounded-full bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
        aria-label="Alternar tema"
      >
        <span
          className={`
            ${theme === 'dark' ? 'translate-x-6' : 'translate-x-1'}
            inline-block h-4 w-4 transform rounded-full bg-background shadow-lg transition-transform pointer-events-none
            flex items-center justify-center
          `}
        >
            {theme === 'dark' ? (
                <Moon className="h-3 w-3 text-foreground" />
            ) : (
                <Sun className="h-3 w-3 text-foreground" />
            )}
        </span>
      </button>
    </div>
  );
};
