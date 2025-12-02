import { useEffect, useState } from "react";

import { useAuthStore } from "@/store/useAuthStore";

export function LoginTimer() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const expiresAt = useAuthStore(state => state.expiresAt);
  const logout = useAuthStore(state => state.logout);
  const [timeLeft, setTimeLeft] = useState<string>("");

  useEffect(() => {
    if (!isAuthenticated || !expiresAt) return;

    const updateTimer = () => {
      const now = Date.now();
      const diff = expiresAt - now;

      if (diff <= 0) {
        logout();
        setTimeLeft("00:00");
        return;
      }

      const minutes = Math.floor((diff / 1000) / 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(
        `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
      );
    };

    updateTimer();
    const intervalId = setInterval(updateTimer, 1000);

    return () => clearInterval(intervalId);
  }, [expiresAt, isAuthenticated, logout]);

  if (!isAuthenticated || !expiresAt || !timeLeft) {
    return null;
  }

  return (
    <p className="text-xs font-medium text-gray-500 group-hover:text-gray-700 tabular-nums">
      {timeLeft}
    </p>
  );
}
