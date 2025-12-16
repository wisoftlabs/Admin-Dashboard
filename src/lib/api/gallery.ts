import { apiClient } from "@/lib/api-client";
import type { GalleryImage } from "@/lib/schemas/gallery/gallery-image";
import type { GallerySlide } from "@/lib/schemas/gallery/gallery-slide";

export function uploadGalleryImages(
  files: Array<{ file: File; title?: string }>,
): Promise<{ images: GalleryImage[] }> {
  const formData = new FormData();

  files.forEach(({ file, title }) => {
    formData.append("files", file);
    if (title && title.trim()) {
      formData.append("titles", title);
    }
    else {
      formData.append("titles", "");
    }
  });

  return apiClient<{ images: GalleryImage[] }>("admin/gallery/images", {
    method: "POST",
    data: formData,
  });
}

export function getGalleryImages(): Promise<GalleryImage[]> {
  return apiClient<GalleryImage[]>("admin/gallery/images");
}

export function deleteGalleryImage(imageId: string): Promise<void> {
  return apiClient<void>(`admin/gallery/images/${imageId}`, {
    method: "DELETE",
  });
}

export async function deleteGalleryImages(
  imageIds: string[],
): Promise<{ deleted_count: number }> {
  await Promise.all(imageIds.map(id => deleteGalleryImage(id)));
  return { deleted_count: imageIds.length };
}

export function updateGalleryImage(
  imageId: string,
  title: string,
): Promise<GalleryImage> {
  return apiClient<GalleryImage>(`admin/gallery/images/${imageId}`, {
    method: "PATCH",
    data: { title },
  });
}

export async function getGallerySlides(): Promise<GallerySlide[]> {
  const slides = await apiClient<GallerySlide[]>("admin/gallery/slides");
  return slides.sort((a, b) => a.order - b.order);
}

export async function addImagesToSlides(
  imageIds: string[],
): Promise<void> {
  await apiClient<GallerySlide[]>("admin/gallery/slides", {
    method: "POST",
    data: imageIds,
  });
}

export function reorderSlides(
  slides: Array<{ id: string; order: number }>,
): Promise<GallerySlide[]> {
  const updatedSlides = Promise.all(
    slides.map(slide =>
      apiClient<GallerySlide>(`admin/gallery/slides/${slide.id}`, {
        method: "PATCH",
        data: { order: slide.order },
      }),
    ),
  );

  return updatedSlides;
}

export function deleteSlide(slideId: string): Promise<void> {
  return apiClient<void>(`admin/gallery/slides/${slideId}`, {
    method: "DELETE",
  });
}

export async function deleteSlides(
  slideIds: string[],
): Promise<{ deleted_count: number }> {
  await Promise.all(slideIds.map(id => deleteSlide(id)));
  return { deleted_count: slideIds.length };
}
