import { z } from "zod";

export const NewsSchema = z.object({
  id: z.uuid(),
  title: z.string(),
  detail: z.string(),
  created_at: z.coerce.date(),
  is_active: z.boolean(),
});

export type News = z.infer<typeof NewsSchema>;
