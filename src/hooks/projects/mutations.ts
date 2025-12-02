import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createProject,
  deleteProject,
  updateProject,
} from "@/lib/api/project";
import type { ProjectCreateFormData } from "@/lib/schemas/project/project-create";
import type { ProjectUpdateFormData } from "@/lib/schemas/project/project-update";

import { projectQueryOptions } from "./query-options";

export function useCreateProjectMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (project: ProjectCreateFormData) => createProject(project),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: projectQueryOptions.listKey(),
      });
      toast.success("프로젝트 정보가 성공적으로 등록되었습니다.");
    },
  });
}

export function useUpdateProjectMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (project: ProjectUpdateFormData) => updateProject(id, project),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: projectQueryOptions.listKey(),
        }),
        queryClient.invalidateQueries({
          queryKey: projectQueryOptions.detailKey(id),
        }),
      ]);
      toast.success("프로젝트 정보가 성공적으로 수정되었습니다.");
    },
  });
}

export function useDeleteProjectMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteProject(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: projectQueryOptions.listKey(),
      });
      toast.success("프로젝트 정보가 성공적으로 삭제되었습니다.");
    },
  });
}
