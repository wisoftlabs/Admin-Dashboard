import { useQuery } from "@tanstack/react-query";

import type { News } from "@/lib/schemas/news/news";

import { newsQueryOptions } from "./query-options";

export function useNews() {
  return useQuery(newsQueryOptions.list());
}

export function useNewsById(id: News["id"]) {
  return useQuery(newsQueryOptions.detail(id));
}
