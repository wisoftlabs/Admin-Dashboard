import { useQuery } from "@tanstack/react-query";

import { type Award } from "@/lib/schemas/award/award";

import { awardQueryOptions } from "./query-options";

export function useAwards() {
  return useQuery(awardQueryOptions.list());
}

export function useAward(id: Award["id"]) {
  return useQuery({
    ...awardQueryOptions.detail(id),
  });
}
