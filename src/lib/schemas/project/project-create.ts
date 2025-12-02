import {z} from "zod";
import {ProjectSchema} from "@/lib/schemas/project/project";
import {ThumbnailFileSchema} from "@/lib/schemas/common/thumbnail";

export const ProjectCreateFormDataSchema = ProjectSchema
  .omit({
    id: true,
  })
  .extend({
    thumbnail: ThumbnailFileSchema,
  })

export type ProjectCreateFormData = z.infer<typeof ProjectCreateFormDataSchema>;