import { z } from "zod";

import { PaperSchema } from "@/lib/schemas/paper/paper";

export const PaperPreviewSchema = PaperSchema.pick({
  id: true,
  year: true,
  title: true,
  image_url: true,
});

export type PaperPreview = z.infer<typeof PaperPreviewSchema>;
