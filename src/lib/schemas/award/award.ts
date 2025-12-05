import { z } from "zod";

import { ImageTypeSchema } from "@/lib/schemas/shared/image-type";
import { OrientationSchema } from "@/lib/schemas/shared/orientation";

export const AwardSchema = z.object({
  id: z.uuid(),
  year: z.number(),
  image_url: z.string(),
  image_type: ImageTypeSchema,
  orientation: OrientationSchema,
});

export type Award = z.infer<typeof AwardSchema>;
