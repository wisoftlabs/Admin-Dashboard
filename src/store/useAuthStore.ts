import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  isAuthenticated: boolean;
  expiresAt: number | null;
  login: () => void;
  logout: () => void;
};

export const useAuthStore = create(
  persist<AuthStore>(
    set => ({
      isAuthenticated: false,
      expiresAt: null,
      login: () =>
        set({
          isAuthenticated: true,
          expiresAt: Date.now() + 30 * 60 * 1000,
        }),
      logout: () => set({ isAuthenticated: false, expiresAt: null }),
    }),
    {
      name: "auth-store",
    },
  ),
);
