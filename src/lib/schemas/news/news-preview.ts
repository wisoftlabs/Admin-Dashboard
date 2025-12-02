import {NewsSchema} from "@/lib/schemas/news/news";
import {z} from "zod";

export const NewsPreviewSchema = NewsSchema.omit({
  content: true,
})

export type NewsPreview = z.infer<typeof NewsPreviewSchema>;