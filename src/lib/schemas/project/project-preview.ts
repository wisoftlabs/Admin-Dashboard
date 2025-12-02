import { z } from "zod";

import { ProjectSchema } from "@/lib/schemas/project/project";

export const ProjectPreviewSchema = ProjectSchema.omit({
  description: true,
});

export type ProjectPreview = z.infer<typeof ProjectPreviewSchema>;
