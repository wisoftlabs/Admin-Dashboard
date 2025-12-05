import { queryOptions } from "@tanstack/react-query";

import * as api from "@/lib/api/patent";
import { type Patent } from "@/lib/schemas/patent/patent";

export const patentQueries = {
  all: () => ["patents"] as const,
  lists: () => [...patentQueries.all(), "list"] as const,
  list: () =>
    queryOptions({
      queryKey: [...patentQueries.lists()],
      queryFn: api.getPatents,
    }),
  details: () => [...patentQueries.all(), "detail"] as const,
  detail: (id: Patent["id"]) =>
    queryOptions({
      queryKey: [...patentQueries.details(), id],
      queryFn: () => api.getPatent(id),
    }),
};
