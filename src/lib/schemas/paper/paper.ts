import { z } from "zod";

import { ImageTypeSchema } from "@/lib/schemas/shared/image-type";

export const PaperSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  authors: z.string(),
  abstract: z.string(),
  conference: z.string(),
  journal: z.string(),
  publication_date: z.coerce.date<Date>(),
  link: z.string(),
  year: z.number(),
  image_url: z.string(),
  image_type: ImageTypeSchema,
});

export type Paper = z.infer<typeof PaperSchema>;
