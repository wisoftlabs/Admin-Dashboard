import { queryOptions } from "@tanstack/react-query";

import { getHomeStats, getUpcomingEvents } from "@/lib/api/home";

export const homeQueryOptions = {
  all: () => ["home"] as const,
  statsKey: () => [...homeQueryOptions.all(), "stats"] as const,
  eventsKey: () => [...homeQueryOptions.all(), "events"] as const,

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
};
