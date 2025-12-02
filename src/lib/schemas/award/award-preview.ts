import { z } from "zod";

import { AwardSchema } from "@/lib/schemas/award/award";

export const AwardPreviewSchema = AwardSchema;

export type AwardPreview = z.infer<typeof AwardPreviewSchema>;
