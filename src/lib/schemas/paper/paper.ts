import { z } from "zod";

import { ImageTypeSchema } from "@/lib/schemas/common/image-type";

export const PaperSchema = z.object({
  id: z.uuid(),
  year: z.number(),
  image_url: z.string(),
  image_type: ImageTypeSchema,
});

export type Paper = z.infer<typeof PaperSchema>;
