import { AuthState, AuthUser } from '@/features/auth/domain/types/auth.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthActions {
  setAuth: (user: AuthUser) => void;
  logout: () => void;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      setAuth: (user) => set({ user, isAuthenticated: true }),
      logout: () => {
        set(initialState);

        window.location.reload();
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        // hanya persist data penting
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Selectors — hindari re-render tidak perlu
export const useAuthUser = () => useAuthStore((s) => s.user);
export const useIsAuthenticated = () => useAuthStore((s) => s.isAuthenticated);
