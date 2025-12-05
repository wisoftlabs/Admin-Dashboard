import { useQuery } from "@tanstack/react-query";

import { patentQueries } from "@/hooks/patent/query-options";
import { type Patent } from "@/lib/schemas/patent/patent";

export const usePatents = () => {
  return useQuery(patentQueries.list());
};

export const usePatent = (id: Patent["id"]) => {
  return useQuery(patentQueries.detail(id));
};
