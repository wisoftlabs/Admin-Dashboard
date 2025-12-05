import { z } from "zod";

import { AwardCreateFormDataSchema } from "@/lib/schemas/award/award-create-form-data";

export const AwardUpdateFormDataSchema = AwardCreateFormDataSchema.extend({
  image_file: AwardCreateFormDataSchema.shape.image_file.optional(),
});

export type AwardUpdateFormData = z.infer<typeof AwardUpdateFormDataSchema>;
