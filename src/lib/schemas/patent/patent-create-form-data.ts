import { z } from "zod";

import { PatentSchema } from "@/lib/schemas/patent/patent";
import { PdfFileSchema } from "@/lib/schemas/shared/pdf-file";

export const PatentCreateFormDataSchema = PatentSchema.omit({
  id: true,
  pdf_url: true,
}).extend({
  pdf_file: PdfFileSchema,
});

export type PatentCreateFormData = z.infer<typeof PatentCreateFormDataSchema>;
