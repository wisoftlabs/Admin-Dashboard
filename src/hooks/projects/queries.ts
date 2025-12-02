import { useQuery } from "@tanstack/react-query";

import { projectQueryOptions } from "./query-options";

export function useProjects() {
  return useQuery(projectQueryOptions.list());
}

export function useProject(id: string) {
  return useQuery(projectQueryOptions.detail(id));
}
