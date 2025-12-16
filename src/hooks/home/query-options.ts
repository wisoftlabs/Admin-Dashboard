import { queryOptions } from "@tanstack/react-query";

import { getActiveNews, getHomeStats, getUpcomingEvents } from "@/lib/api/home";

export const homeQueryOptions = {
  all: () => ["home"] as const,
  statsKey: () => [...homeQueryOptions.all(), "stats"] as const,
  eventsKey: () => [...homeQueryOptions.all(), "events"] as const,
  activeNewsKey: () => [...homeQueryOptions.all(), "activeNews"] as const,

  stats: () =>
    queryOptions({
      queryKey: [...homeQueryOptions.statsKey()],
      queryFn: () => getHomeStats(),
    }),

  events: () =>
    queryOptions({
      queryKey: [...homeQueryOptions.eventsKey()],
      queryFn: () => getUpcomingEvents(),
    }),

  activeNews: () =>
    queryOptions({
      queryKey: [...homeQueryOptions.activeNewsKey()],
      queryFn: () => getActiveNews(),
    }),
};
