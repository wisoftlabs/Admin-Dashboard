import { queryOptions } from "@tanstack/react-query";

import { getPapers } from "@/lib/api/paper";
import { type Paper } from "@/lib/schemas/paper/paper";

export const paperQueryOptions = {
  all: () => ["papers"] as const,
  listKey: () => [...paperQueryOptions.all(), "list"] as const,
  detailKey: (id: Paper["id"]) => [...paperQueryOptions.all(), "detail", id] as const,
  list: () =>
    queryOptions({
      queryKey: [...paperQueryOptions.listKey()],
      queryFn: () => getPapers(),
    }),
};
