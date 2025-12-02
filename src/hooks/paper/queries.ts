import { useQuery } from "@tanstack/react-query";
import { paperQueryOptions } from "./query-options";

export function usePapers() {
  return useQuery(paperQueryOptions.list());
}
