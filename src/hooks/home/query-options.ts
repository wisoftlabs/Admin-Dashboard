import { queryOptions } from "@tanstack/react-query";

import { getHomeStats } from "@/lib/api/home";
import type { HomeStats } from "@/lib/schemas/home/home-stats";

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === "true";

const mockStats: HomeStats = {
  gallery_count: 48,
  project_count: 32,
  paper_count: 23,
  award_count: 12,
};

export const homeQueryOptions = {
  all: () => ["home"] as const,

  statsKey: () => [...homeQueryOptions.all(), "stats"] as const,
  stats: () =>
    queryOptions({
      queryKey: [...homeQueryOptions.statsKey()],
      queryFn: async () => {
        if (USE_MOCK_DATA) {
          await new Promise(resolve => setTimeout(resolve, 100));
          return mockStats;
        }
        return getHomeStats();
      },
    }),
};
