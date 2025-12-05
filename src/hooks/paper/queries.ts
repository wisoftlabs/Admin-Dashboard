import { useQuery } from "@tanstack/react-query";

import { paperQueryOptions } from "./query-options";

export function usePapers() {
  return useQuery(paperQueryOptions.list());
}

export function usePaper(id: string) {
  return useQuery({
    ...paperQueryOptions.detail(id),
  });
}
