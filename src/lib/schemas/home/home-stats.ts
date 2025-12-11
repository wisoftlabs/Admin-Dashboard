import { z } from "zod";

export const homeStatsSchema = z.object({
  gallery_count: z.number(),
  project_count: z.number(),
  paper_count: z.number(),
  award_count: z.number(),
});

export type HomeStats = z.infer<typeof homeStatsSchema>;
