import { queryOptions } from "@tanstack/react-query";
import { getAwards } from "@/lib/api/award";
import { type Award} from "@/lib/schemas/award/award";

export const awardQueryOptions = {
  all: () => ["awards"] as const,
  listKey: () => [...awardQueryOptions.all(), "list"] as const,
  detailKey: (id: Award["id"]) => [...awardQueryOptions.all(), "detail", id] as const,
  list: () =>
    queryOptions({
      queryKey: [...awardQueryOptions.listKey()],
      queryFn: () => getAwards(),
    }),
};
