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

  return apiClient<{ images: GalleryImage[] }>("gallery/images", {
    method: "POST",
    body: formData,
  });
}

export function getGalleryImages(): Promise<GalleryImage[]> {
  return apiClient<GalleryImage[]>("gallery/images");
}

export function deleteGalleryImage(imageId: string): Promise<void> {
  return apiClient<void>(`gallery/images/${imageId}`, {
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
  return apiClient<GalleryImage>(`gallery/images/${imageId}`, {
    method: "PATCH",
    body: { title },
  });
}

export async function getGallerySlides(): Promise<GallerySlide[]> {
  const slides = await apiClient<GallerySlide[]>("gallery/slides");
  return slides.sort((a, b) => a.order - b.order);
}

export async function addImagesToSlides(
  imageIds: string[],
): Promise<GallerySlide[]> {
  const images = await getGalleryImages();
  const existingSlides = await getGallerySlides();
  const maxOrder = existingSlides.reduce((max, slide) => Math.max(max, slide.order), 0);

  const newSlides = await Promise.all(
    imageIds.map(async (imageId, index) => {
      const image = images.find(img => img.id === imageId);
      if (!image) throw new Error(`Image ${imageId} not found`);

      const newSlide: GallerySlide = {
        id: `s_${Date.now()}_${index}`,
        image_id: imageId,
        title: image.title,
        file_url: image.file_url,
        type: image.type,
        order: maxOrder + index + 1,
        created_at: new Date().toISOString(),
      };

      return apiClient<GallerySlide>("gallery/slides", {
        method: "POST",
        body: newSlide,
      });
    }),
  );

  return newSlides;
}

export function reorderSlides(
  slides: Array<{ id: string; order: number }>,
): Promise<GallerySlide[]> {
  const updatedSlides = Promise.all(
    slides.map(slide =>
      apiClient<GallerySlide>(`gallery/slides/${slide.id}`, {
        method: "PATCH",
        body: { order: slide.order },
      }),
    ),
  );

  return updatedSlides;
}

export function deleteSlide(slideId: string): Promise<void> {
  return apiClient<void>(`gallery/slides/${slideId}`, {
    method: "DELETE",
  });
}

export async function deleteSlides(
  slideIds: string[],
): Promise<{ deleted_count: number }> {
  await Promise.all(slideIds.map(id => deleteSlide(id)));
  return { deleted_count: slideIds.length };
}
