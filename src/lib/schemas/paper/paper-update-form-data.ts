import { z } from "zod";

import { PaperCreateFormDataSchema } from "@/lib/schemas/paper/paper-create-form-data";

export const PaperUpdateFormDataSchema = PaperCreateFormDataSchema.extend({
  image_file: PaperCreateFormDataSchema.shape.image_file.optional(),
});

export type PaperUpdateFormData = z.infer<typeof PaperUpdateFormDataSchema>;
