import { z } from "zod";

export const PROJECT_STATUS = ["progress", "done"] as const;

export const ProjectStatusSchema = z.enum(PROJECT_STATUS);

export type ProjectStatus = z.infer<typeof ProjectStatusSchema>;
