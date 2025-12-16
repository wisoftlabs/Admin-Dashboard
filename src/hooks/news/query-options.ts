import { queryOptions } from "@tanstack/react-query";

import { getNews, getNewsById } from "@/lib/api/news";
import { type News } from "@/lib/schemas/news/news";

export const newsQueryOptions = {
  all: () => ["news"] as const,
  listKey: () => [...newsQueryOptions.all(), "list"] as const,
  detailKey: (id: News["id"]) => [...newsQueryOptions.all(), "detail", id] as const,
  list: () =>
    queryOptions({
      queryKey: [...newsQueryOptions.listKey()],
      queryFn: () => getNews(),
    }),
  detail: (id: News["id"]) =>
    queryOptions({
      queryKey: [...newsQueryOptions.detailKey(id)],
      queryFn: () => getNewsById(id),
    }),
};
