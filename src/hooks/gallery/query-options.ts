import { queryOptions } from "@tanstack/react-query";

import { getGalleryImages, getGallerySlides } from "@/lib/api/gallery";

export const galleryQueryOptions = {
  all: () => ["gallery"] as const,
  imagesKey: () => [...galleryQueryOptions.all(), "images"] as const,
  slidesKey: () => [...galleryQueryOptions.all(), "slides"] as const,

  images: () =>
    queryOptions({
      queryKey: [...galleryQueryOptions.imagesKey()],
      queryFn: () => getGalleryImages(),
    }),

  slides: () =>
    queryOptions({
      queryKey: [...galleryQueryOptions.slidesKey()],
      queryFn: () => getGallerySlides(),
    }),
};
