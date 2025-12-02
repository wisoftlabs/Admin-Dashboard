import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  isAuthenticated: boolean;
  expiresAt: number | null; // 만료 시간 (Timestamp)
  login: () => void;
  logout: () => void;
};

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
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
    }
  )
);