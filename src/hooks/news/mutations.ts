import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createNews,
  deleteNews,
  toggleNewsPin,
  updateNews,
} from "@/lib/api/news";
import { newsQueryOptions } from "./query-options";
import type { NewsCreateFormData } from "@/lib/schemas/news/news-create-form-data";
import { toast } from "sonner";
import { type NewsUpdateFormData } from "@/lib/schemas/news/news-update-form-data";

export function useCreateNewsMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (news: NewsCreateFormData) => createNews(news),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: newsQueryOptions.listKey(),
      });
      toast.success("공지사항이 성공적으로 등록되었습니다.");
    },
  });
}

export function useUpdateNewsMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (news: NewsUpdateFormData) => updateNews(id, news),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: newsQueryOptions.listKey(),
        }),
        queryClient.invalidateQueries({
          queryKey: newsQueryOptions.detailKey(id),
        }),
      ]);

      toast.success("공지사항이 성공적으로 수정되었습니다.");
    },
  });
}

export function useToggleNewsPinMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (is_pin: boolean) => {
      await toggleNewsPin(id, is_pin);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: newsQueryOptions.listKey(),
      });
      toast.success("공지사항 고정 상태가 변경되었습니다.");
    },
    onError: () => {
      toast.error("공지사항 고정 상태 변경에 실패했습니다.");
    },
  });
}

export function useDeleteNewsMutation(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteNews(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: newsQueryOptions.listKey(),
      });
      toast.success("공지사항이 성공적으로 삭제되었습니다.");
    },
  });
}
