import { type z } from "zod";

import { PatentSchema } from "@/lib/schemas/patent/patent";

export const PatentPreviewSchema = PatentSchema.pick({
  id: true,
  name: true,
  year: true,
});

export type PatentPreview = z.infer<typeof PatentPreviewSchema>;
