import { z } from "zod";

export const gallerySlideSchema = z.object({
  id: z.string(),
  image_id: z.string(),
  title: z.string().optional(),
  file_url: z.string(),
  type: z.literal("img"),
  order: z.number(),
  created_at: z.string(),
});

export type GallerySlide = z.infer<typeof gallerySlideSchema>;
