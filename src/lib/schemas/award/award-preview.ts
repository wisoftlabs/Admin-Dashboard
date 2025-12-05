import { z } from "zod";

import { AwardSchema } from "@/lib/schemas/award/award";

export const AwardPreviewSchema = AwardSchema.pick({
  id: true,
  year: true,
  image_url: true,
  orientation: true,
  title: true,
});

export type AwardPreview = z.infer<typeof AwardPreviewSchema>;
