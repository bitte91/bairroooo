import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * User type definition
 */
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'business' | 'admin';
}

/**
 * Auth Store state and actions
 */
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

/**
 * Zustand Auth Store with localStorage persistence
 * Persists user authentication state across page reloads
 */
export const useAuthStore = create<AuthState>(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      /**
       * Set user and update authentication state
       */
      setUser: (user: User | null) =>
        set({
          user,
          isAuthenticated: !!user,
          error: null,
        }),

      /**
       * Clear user and authentication state
       */
      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        }),

      /**
       * Set loading state
       */
      setLoading: (isLoading: boolean) => set({ isLoading }),

      /**
       * Set error message
       */
      setError: (error: string | null) => set({ error }),
    }),
    {
      name: 'auth-store', // localStorage key
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

/**
 * Helper hooks for common auth operations
 */
export const useUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
export const useAuthLoading = () => useAuthStore((state) => state.isLoading);
export const useAuthError = () => useAuthStore((state) => state.error);
