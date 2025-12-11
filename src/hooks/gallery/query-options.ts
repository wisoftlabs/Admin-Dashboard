import { queryOptions } from "@tanstack/react-query";

import { getGalleryImages, getGallerySlides } from "@/lib/api/gallery";
import type { GalleryImage } from "@/lib/schemas/gallery/gallery-image";
import type { GallerySlide } from "@/lib/schemas/gallery/gallery-slide";

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === "true";

const mockImages: GalleryImage[] = [
  {
    id: "f_001",
    title: "연구실 단체 사진",
    file_url: "https://picsum.photos/seed/lab1/800/600",
    type: "img",
    created_at: "2024-03-15T10:30:00Z",
  },
  {
    id: "f_002",
    title: "AI 학회 발표",
    file_url: "https://picsum.photos/seed/conf1/800/600",
    type: "img",
    created_at: "2024-05-20T14:20:00Z",
  },
  {
    id: "f_003",
    title: "프로젝트 시연",
    file_url: "https://picsum.photos/seed/demo1/800/600",
    type: "img",
    created_at: "2024-06-10T09:15:00Z",
  },
  {
    id: "f_004",
    title: "워크샵",
    file_url: "https://picsum.photos/seed/workshop1/800/600",
    type: "img",
    created_at: "2024-07-05T16:45:00Z",
  },
  {
    id: "f_005",
    title: "여름 MT",
    file_url: "https://picsum.photos/seed/summer1/800/600",
    type: "img",
    created_at: "2024-08-12T11:00:00Z",
  },
  {
    id: "f_006",
    title: "논문 게재 축하",
    file_url: "https://picsum.photos/seed/paper1/800/600",
    type: "img",
    created_at: "2024-09-22T15:30:00Z",
  },
  {
    id: "f_007",
    file_url: "https://picsum.photos/seed/lab2/800/600",
    type: "img",
    created_at: "2023-11-10T10:00:00Z",
  },
  {
    id: "f_008",
    title: "신입생 환영회",
    file_url: "https://picsum.photos/seed/welcome1/800/600",
    type: "img",
    created_at: "2023-03-05T14:00:00Z",
  },
];

const mockSlides: GallerySlide[] = [
  {
    id: "s_001",
    image_id: "f_001",
    title: "연구실 단체 사진",
    file_url: "https://picsum.photos/seed/lab1/800/600",
    type: "img",
    order: 1,
    created_at: "2024-03-15T10:30:00Z",
  },
  {
    id: "s_002",
    image_id: "f_003",
    title: "프로젝트 시연",
    file_url: "https://picsum.photos/seed/demo1/800/600",
    type: "img",
    order: 2,
    created_at: "2024-06-10T09:15:00Z",
  },
  {
    id: "s_003",
    image_id: "f_005",
    title: "여름 MT",
    file_url: "https://picsum.photos/seed/summer1/800/600",
    type: "img",
    order: 3,
    created_at: "2024-08-12T11:00:00Z",
  },
];

export const galleryQueryOptions = {
  all: () => ["gallery"] as const,

  imagesKey: () => [...galleryQueryOptions.all(), "images"] as const,
  images: () =>
    queryOptions({
      queryKey: [...galleryQueryOptions.imagesKey()],
      queryFn: async () => {
        if (USE_MOCK_DATA) {
          await new Promise(resolve => setTimeout(resolve, 100));
          return mockImages;
        }
        const response = await getGalleryImages();
        return response.images;
      },
    }),

  slidesKey: () => [...galleryQueryOptions.all(), "slides"] as const,
  slides: () =>
    queryOptions({
      queryKey: [...galleryQueryOptions.slidesKey()],
      queryFn: async () => {
        if (USE_MOCK_DATA) {
          await new Promise(resolve => setTimeout(resolve, 100));
          return mockSlides;
        }
        const response = await getGallerySlides();
        return response.slides;
      },
    }),
};
