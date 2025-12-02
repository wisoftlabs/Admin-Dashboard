import { queryOptions } from "@tanstack/react-query";

import { getProject, getProjects } from "@/lib/api/project";

export const projectQueryOptions = {
  all: () => ["projects"] as const,
  listKey: () => [...projectQueryOptions.all(), "list"] as const,
  detailKey: (id: string) => [...projectQueryOptions.all(), "detail", id] as const,
  list: () =>
    queryOptions({
      queryKey: [...projectQueryOptions.listKey()],
      queryFn: () => getProjects(),
    }),
  detail: (id: string) =>
    queryOptions({
      queryKey: [...projectQueryOptions.detailKey(id)],
      queryFn: () => getProject(id),
    }),
};
