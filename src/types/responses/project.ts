import type { Project } from "@/lib/schemas/project/project";
import type { ProjectPreview } from "@/lib/schemas/project/project-preview";

export type ProjectGetAllResponse = {
  projects: Array<ProjectPreview>;
};

export type ProjectGetResponse = Project;
