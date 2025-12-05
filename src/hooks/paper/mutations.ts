import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createPaper, deletePaper, updatePaper } from "@/lib/api/paper";
import type { Paper } from "@/lib/schemas/paper/paper";
import type { PaperCreateFormData } from "@/lib/schemas/paper/paper-create-form-data";
import { type PaperUpdateFormData } from "@/lib/schemas/paper/paper-update-form-data";

import { paperQueryOptions } from "./query-options";

export function useCreatePaper() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (paper: PaperCreateFormData) => createPaper(paper),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: paperQueryOptions.listKey(),
      });
      toast.success("논문 정보가 성공적으로 등록되었습니다.");
    },
  });
}

export function useUpdatePaper(id: Paper["id"]) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (paper: PaperUpdateFormData) => updatePaper(id, paper),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: paperQueryOptions.listKey(),
        }),
        queryClient.invalidateQueries({
          queryKey: paperQueryOptions.detailKey(id),
        }),
      ]);
      toast.success("논문 정보가 성공적으로 수정되었습니다.");
    },
  });
}

export function useDeletePaper(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deletePaper(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: paperQueryOptions.listKey(),
      });
      toast.success("논문 정보가 성공적으로 삭제되었습니다.");
    },
  });
}
