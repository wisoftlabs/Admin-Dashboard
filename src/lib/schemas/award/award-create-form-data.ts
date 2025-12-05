import { z } from "zod";

import { AwardSchema } from "@/lib/schemas/award/award";
import { ImageFileSchema } from "@/lib/schemas/shared/image-file";

export const AwardCreateFormDataSchema = AwardSchema.omit({
  id: true,
  image_url: true,
  orientation: true,
  image_type: true,
}).extend({
  image_file: ImageFileSchema,
});

export type AwardCreateFormData = z.infer<typeof AwardCreateFormDataSchema>;
