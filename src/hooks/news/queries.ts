import { useQuery } from "@tanstack/react-query";
import { newsQueryOptions } from "./query-options";
import type {News} from "@/lib/schemas/news/news";

export function useNews() {
  return useQuery(newsQueryOptions.list());
}

export function useNewsById(id: News["id"]) {
  return useQuery(newsQueryOptions.detail(id));
}

