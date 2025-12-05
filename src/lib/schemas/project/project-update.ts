import { z } from "zod";

import { ThumbnailFileSchema } from "@/lib/schemas/shared/thumbnail";

import { ProjectCreateFormDataSchema } from "./project-create";

export const ProjectUpdateFormDataSchema = ProjectCreateFormDataSchema.extend({
  thumbnail: ThumbnailFileSchema.optional(),
});

export type ProjectUpdateFormData = z.infer<typeof ProjectUpdateFormDataSchema>;
