import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAward, deleteAward } from "@/lib/api/award";
import { awardQueryOptions } from "./query-options";
import type { AwardCreateFormData } from "@/lib/schemas/award/award-create-form-data";
import { toast } from "sonner";

export function useCreateAwardMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (award: AwardCreateFormData) => createAward(award),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: awardQueryOptions.listKey(),
      });
      toast.success("수상 정보가 성공적으로 등록되었습니다.");
    },
  });
}

export function useDeleteAwardMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteAward(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: awardQueryOptions.listKey(),
      });
      toast.success("수상 정보가 성공적으로 삭제되었습니다.");
    },
  });
}
