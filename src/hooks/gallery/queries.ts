import { useQuery } from "@tanstack/react-query";

import { galleryQueryOptions } from "./query-options";

export function useGalleryImages() {
  return useQuery(galleryQueryOptions.images());
}

export function useGallerySlides() {
  return useQuery(galleryQueryOptions.slides());
}
