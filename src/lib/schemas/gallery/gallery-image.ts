import { z } from "zod";

export const galleryImageSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  file_url: z.string(),
  type: z.literal("img"),
  created_at: z.string(),
});

export type GalleryImage = z.infer<typeof galleryImageSchema>;
