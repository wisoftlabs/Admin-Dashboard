import { apiClient } from "@/lib/api-client";
import type { GalleryImage } from "@/lib/schemas/gallery/gallery-image";
import type { GallerySlide } from "@/lib/schemas/gallery/gallery-slide";

export async function uploadGalleryImages(
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

  return apiClient<{ images: GalleryImage[] }>("gallery/images", {
    method: "POST",
    body: formData,
  });
}

export async function getGalleryImages(): Promise<{ images: GalleryImage[] }> {
  return apiClient<{ images: GalleryImage[] }>("gallery/images");
}

export async function deleteGalleryImage(imageId: string): Promise<void> {
  return apiClient<void>(`gallery/images/${imageId}`, {
    method: "DELETE",
  });
}

export async function deleteGalleryImages(
  imageIds: string[],
): Promise<{ deleted_count: number }> {
  return apiClient<{ deleted_count: number }>("gallery/images", {
    method: "DELETE",
    body: JSON.stringify({ imageIds }),
  });
}

export async function updateGalleryImage(
  imageId: string,
  title: string,
): Promise<GalleryImage> {
  return apiClient<GalleryImage>(`gallery/images/${imageId}`, {
    method: "PATCH",
    body: JSON.stringify({ title }),
  });
}

// ============ Slides API ============

/**
 * Get all slides (ordered)
 * GET /gallery/slides
 */
export async function getGallerySlides(): Promise<{ slides: GallerySlide[] }> {
  return apiClient<{ slides: GallerySlide[] }>("gallery/slides");
}

/**
 * Add images to slides
 * POST /gallery/slides
 */
export async function addImagesToSlides(
  imageIds: string[],
): Promise<{ slides: GallerySlide[] }> {
  return apiClient<{ slides: GallerySlide[] }>("gallery/slides", {
    method: "POST",
    body: JSON.stringify({ imageIds }),
  });
}

/**
 * Reorder slides
 * PATCH /gallery/slides
 */
export async function reorderSlides(
  slides: Array<{ id: string; order: number }>,
): Promise<{ slides: GallerySlide[] }> {
  return apiClient<{ slides: GallerySlide[] }>("gallery/slides", {
    method: "PATCH",
    body: JSON.stringify({ slides }),
  });
}

/**
 * Remove a single slide
 * DELETE /gallery/slides/{slideId}
 */
export async function deleteSlide(slideId: string): Promise<void> {
  return apiClient<void>(`gallery/slides/${slideId}`, {
    method: "DELETE",
  });
}

/**
 * Remove multiple slides (batch)
 * DELETE /gallery/slides
 */
export async function deleteSlides(
  slideIds: string[],
): Promise<{ deleted_count: number }> {
  return apiClient<{ deleted_count: number }>("gallery/slides", {
    method: "DELETE",
    body: JSON.stringify({ slideIds }),
  });
}
