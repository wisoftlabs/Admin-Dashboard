import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { createAward, deleteAward, updateAward } from "@/lib/api/award";
import { type Award } from "@/lib/schemas/award/award";
import type { AwardCreateFormData } from "@/lib/schemas/award/award-create-form-data";
import { type AwardUpdateFormData } from "@/lib/schemas/award/award-update-form-data";

import { awardQueryOptions } from "./query-options";

export function useCreateAward() {
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

export function useUpdateAward(id: Award["id"]) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (award: AwardUpdateFormData) => updateAward(id, award),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: awardQueryOptions.listKey(),
        }),
        queryClient.invalidateQueries({
          queryKey: awardQueryOptions.detailKey(id),
        }),
      ]);
      toast.success("수상 정보가 성공적으로 수정되었습니다.");
    },
  });
}

export function useDeleteAward(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteAward(id),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: awardQueryOptions.listKey(),
        }),
        queryClient.invalidateQueries({
          queryKey: awardQueryOptions.detailKey(id),
        }),
      ]);
      toast.success("수상 정보가 성공적으로 삭제되었습니다.");
    },
  });
}
