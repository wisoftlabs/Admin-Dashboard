import { z } from "zod";

import { ThumbnailFileSchema } from "@/lib/schemas/common/thumbnail";
import { ProjectSchema } from "@/lib/schemas/project/project";

export const ProjectCreateFormDataSchema = ProjectSchema
  .omit({
    id: true,
  })
  .extend({
    thumbnail: ThumbnailFileSchema,
  });

export type ProjectCreateFormData = z.infer<typeof ProjectCreateFormDataSchema>;
