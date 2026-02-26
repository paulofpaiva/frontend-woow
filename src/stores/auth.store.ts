import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "../types/auth";

const AUTH_STORAGE_KEY = "woow-auth";

interface AuthState {
  token: string | null;
  user: User | null;
  isHydrated: boolean;
  setAuth: (token: string, user: User) => void;
  setUser: (user: User) => void;
  logout: () => void;
  setHydrated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      isHydrated: false,
      setAuth: (token, user) => set({ token, user }),
      setUser: (user) => set((state) => (state.token ? { user } : state)),
      logout: () => set({ token: null, user: null }),
      setHydrated: () => set({ isHydrated: true }),
    }),
    {
      name: AUTH_STORAGE_KEY,
      partialize: (state) => ({ token: state.token, user: state.user }),
      onRehydrateStorage: () => (state) => {
        if (state !== undefined) {
          useAuthStore.getState().setHydrated();
        }
      },
    }
  )
);
