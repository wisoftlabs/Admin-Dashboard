import { z } from "zod";

import { NewsSchema } from "@/lib/schemas/news/news";

export const NewsPreviewSchema = NewsSchema.omit({
  content: true,
});

export type NewsPreview = z.infer<typeof NewsPreviewSchema>;
