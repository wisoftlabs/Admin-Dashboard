import { z } from "zod";

import { NewsSchema } from "@/lib/schemas/news/news";

export const NewsCreateFormDataSchema = NewsSchema.omit({
  id: true,
  created_at: true,
}).extend({
  title: z.string().min(1, "공지사항의 제목은 1글자 이상이어야 합니다."),
  content: z.string().min(1, "공지사항의 내용은 1글자 이상이어야 합니다."),
  is_pin: z.boolean(),
});

export type NewsCreateFormData = z.infer<typeof NewsCreateFormDataSchema>;
