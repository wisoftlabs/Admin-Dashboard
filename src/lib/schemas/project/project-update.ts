import { ProjectCreateFormDataSchema } from "./project-create";
import {ThumbnailFileSchema} from "@/lib/schemas/common/thumbnail";
import {z} from "zod";

export const ProjectUpdateFormDataSchema = ProjectCreateFormDataSchema.extend({
  thumbnail: ThumbnailFileSchema.optional(),
});

export type ProjectUpdateFormData = z.infer<typeof ProjectUpdateFormDataSchema>;