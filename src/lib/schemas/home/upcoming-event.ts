import { z } from "zod";

export const upcomingEventSchema = z.object({
  id: z.string(),
  month: z.string(),
  day: z.number(),
  title: z.string(),
  time: z.string(),
});

export type UpcomingEvent = z.infer<typeof upcomingEventSchema>;
