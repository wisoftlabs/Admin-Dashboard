import type {ProjectPreview} from "@/lib/schemas/project/project-preview";
import type {Project} from "@/lib/schemas/project/project";

export type ProjectGetAllResponse = {
  projects: Array<ProjectPreview>;
};

export type ProjectGetResponse = Project;