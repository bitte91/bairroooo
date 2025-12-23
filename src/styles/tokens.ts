export const tokens = {
  colors: {
    primary: {
      DEFAULT: '#0d9488', // teal-600
      50: '#f0fdfa',
      100: '#ccfbf1',
      200: '#99f6e4',
      300: '#5eead4',
      400: '#2dd4bf',
      500: '#14b8a6',
      600: '#0d9488',
      700: '#0f766e',
      800: '#115e59',
      900: '#134e4a',
    },
    neutral: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
    background: {
      light: '#ffffff',
      dark: '#0f172a',
    },
    surface: {
      light: '#f8f9fa',
      dark: '#1e293b',
    },
    text: {
      light: {
        primary: '#1a1a1a',
        secondary: '#6b7280',
      },
      dark: {
        primary: '#f1f5f9',
        secondary: '#94a3b8',
      }
    }
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
  },
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem', // Updated for softer look
    lg: '1rem',    // Updated for softer look
    full: '9999px',
  },
} as const;
