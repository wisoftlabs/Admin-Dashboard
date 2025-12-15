import { useQuery } from "@tanstack/react-query";

import { homeQueryOptions } from "./query-options";

export function useHomeStats() {
  return useQuery(homeQueryOptions.stats());
}

export function useUpcomingEvents() {
  return useQuery(homeQueryOptions.events());
}
