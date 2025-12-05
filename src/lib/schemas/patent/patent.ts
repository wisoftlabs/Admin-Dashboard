import { z } from "zod";

export const PatentSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  year: z.number(),
  invention_date: z.coerce.date<Date>(),
  pdf_url: z.string(),
  link: z.string(),
});

export type Patent = z.infer<typeof PatentSchema>;
