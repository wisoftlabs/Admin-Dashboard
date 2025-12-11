import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  addImagesToSlides,
  deleteGalleryImage,
  deleteGalleryImages,
  deleteSlide,
  deleteSlides,
  reorderSlides,
  updateGalleryImage,
  uploadGalleryImages,
} from "@/lib/api/gallery";

import { galleryQueryOptions } from "./query-options";

export function useUploadGalleryImagesMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (files: Array<{ file: File; title?: string }>) =>
      uploadGalleryImages(files),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: galleryQueryOptions.imagesKey(),
      });
      toast.success("이미지가 성공적으로 업로드되었습니다.");
    },
    onError: (error: Error) => {
      toast.error(error.message || "이미지 업로드에 실패했습니다.");
    },
  });
}

export function useDeleteGalleryImageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (imageId: string) => deleteGalleryImage(imageId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: galleryQueryOptions.imagesKey(),
      });
      await queryClient.invalidateQueries({
        queryKey: galleryQueryOptions.slidesKey(),
      });
      toast.success("이미지가 성공적으로 삭제되었습니다.");
    },
    onError: (error: Error) => {
      toast.error(error.message || "이미지 삭제에 실패했습니다.");
    },
  });
}

export function useDeleteGalleryImagesMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (imageIds: string[]) => deleteGalleryImages(imageIds),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: galleryQueryOptions.imagesKey(),
      });
      await queryClient.invalidateQueries({
        queryKey: galleryQueryOptions.slidesKey(),
      });
      toast.success(`${data.deleted_count}개의 이미지가 삭제되었습니다.`);
    },
    onError: (error: Error) => {
      toast.error(error.message || "이미지 삭제에 실패했습니다.");
    },
  });
}

export function useUpdateGalleryImageMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ imageId, title }: { imageId: string; title: string }) =>
      updateGalleryImage(imageId, title),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: galleryQueryOptions.imagesKey(),
      });
      await queryClient.invalidateQueries({
        queryKey: galleryQueryOptions.slidesKey(),
      });
      toast.success("이미지 제목이 수정되었습니다.");
    },
    onError: (error: Error) => {
      toast.error(error.message || "이미지 수정에 실패했습니다.");
    },
  });
}

// ============ Slide Mutations ============

export function useAddImagesToSlidesMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (imageIds: string[]) => addImagesToSlides(imageIds),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: galleryQueryOptions.slidesKey(),
      });
      toast.success("Photo Slides에 추가되었습니다.");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Photo Slides에 추가하지 못했습니다.");
    },
  });
}

export function useReorderSlidesMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (slides: Array<{ id: string; order: number }>) =>
      reorderSlides(slides),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: galleryQueryOptions.slidesKey(),
      });
      toast.success("순서가 변경되었습니다.");
    },
    onError: (error: Error) => {
      toast.error(error.message || "순서 변경에 실패했습니다.");
    },
  });
}

export function useDeleteSlideMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (slideId: string) => deleteSlide(slideId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: galleryQueryOptions.slidesKey(),
      });
      toast.success("Photo Slides에서 제거되었습니다.");
    },
    onError: (error: Error) => {
      toast.error(error.message || "제거에 실패했습니다.");
    },
  });
}

export function useDeleteSlidesMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (slideIds: string[]) => deleteSlides(slideIds),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({
        queryKey: galleryQueryOptions.slidesKey(),
      });
      toast.success(`${data.deleted_count}개가 Photo Slides에서 제거되었습니다.`);
    },
    onError: (error: Error) => {
      toast.error(error.message || "제거에 실패했습니다.");
    },
  });
}
