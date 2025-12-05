import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { patentQueries } from "@/hooks/patent/query-options";
import * as api from "@/lib/api/patent";
import { type Patent } from "@/lib/schemas/patent/patent";
import { type PatentCreateFormData } from "@/lib/schemas/patent/patent-create-form-data";
import { type PatentPreview } from "@/lib/schemas/patent/patent-preview";
import { type PatentUpdateFormData } from "@/lib/schemas/patent/patent-update-form-data";

export const useCreatePatent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: PatentCreateFormData) => api.createPatent(formData),
    onSuccess: () => {
      toast.success("특허가 성공적으로 생성되었습니다.");
      return queryClient.invalidateQueries({ queryKey: patentQueries.lists() });
    },
    onError: (error) => {
      toast.error("특허 생성에 실패했습니다.", {
        description: error.message,
      });
    },
  });
};

export const useUpdatePatent = (id: Patent["id"]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: PatentUpdateFormData) => api.updatePatent(id, formData),
    onSuccess: () => {
      toast.success("특허가 성공적으로 수정되었습니다.");
      return Promise.all([
        queryClient.invalidateQueries({ queryKey: patentQueries.lists() }),
        queryClient.invalidateQueries({ queryKey: patentQueries.detail(id) }),
      ]);
    },
    onError: (error) => {
      toast.error("특허 수정에 실패했습니다.", {
        description: error.message,
      });
    },
  });
};

export const useDeletePatent = (patentId: PatentPreview["id"]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => api.deletePatent(patentId),
    onSuccess: () => {
      toast.success("특허가 성공적으로 삭제되었습니다.");
      return queryClient.invalidateQueries({ queryKey: patentQueries.lists() });
    },
    onError: (error) => {
      toast.error("특허 삭제에 실패했습니다.", {
        description: error.message,
      });
    },
  });
};
