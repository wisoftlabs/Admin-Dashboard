import {z} from "zod";
import {ProjectSchema} from "@/lib/schemas/project/project";

export const ProjectCreateFormDataSchema = ProjectSchema
  .omit({
    id: true,
  })
  .extend({
    thumbnail: z.file(),
  })

export type ProjectCreateFormData = z.infer<typeof ProjectCreateFormDataSchema>;