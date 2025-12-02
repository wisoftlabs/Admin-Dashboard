import { useQuery } from "@tanstack/react-query";

import { awardQueryOptions } from "./query-options";

export function useAwards() {
  return useQuery(awardQueryOptions.list());
}
