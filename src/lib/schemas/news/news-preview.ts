import { z } from "zod";

import { NewsSchema } from "@/lib/schemas/news/news";

export const NewsPreviewSchema = NewsSchema;

export type NewsPreview = z.infer<typeof NewsPreviewSchema>;
