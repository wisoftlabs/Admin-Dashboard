import {z} from "zod";
import {OrientationSchema} from "@/lib/schemas/common/orientation";
import {ImageTypeSchema} from "@/lib/schemas/common/image-type";

export const AwardSchema = z.object({
  id: z.uuid(),
  year: z.number(),
  image_url: z.string(),
  image_type: ImageTypeSchema,
  orientation: OrientationSchema,
});

export type Award = z.infer<typeof AwardSchema>;