import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createPaper, deletePaper } from "@/lib/api/paper";
import type { PaperCreateFormData } from "@/lib/schemas/paper/paper-create-form-data";

import { paperQueryOptions } from "./query-options";

export function useCreatePaperMutation() {
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

export function useDeletePaperMutation(id: string) {
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
