import { z } from "zod";

import { PatentCreateFormDataSchema } from "@/lib/schemas/patent/patent-create-form-data";

export const PatentUpdateFormDataSchema = PatentCreateFormDataSchema.extend({
  pdf_file: z.instanceof(File).optional(),
});

export type PatentUpdateFormData = z.infer<typeof PatentUpdateFormDataSchema>;
