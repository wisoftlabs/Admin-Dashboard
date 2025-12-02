import { apiClient } from "@/lib/api-client";
import { type Project } from "@/lib/schemas/project/project";
import { type ProjectCreateFormData } from "@/lib/schemas/project/project-create";
import { type ProjectUpdateFormData } from "@/lib/schemas/project/project-update";

export function getProjects(): Promise<Project[]> {
  return apiClient<Project[]>("projects");
}

export function getProject(id: string): Promise<Project> {
  return apiClient<Project>(`projects/${id}`);
}

export function createProject(data: ProjectCreateFormData): Promise<Project> {
  return apiClient<Project>("projects", { method: "POST", body: data });
}

export function updateProject(
  id: string,
  data: ProjectUpdateFormData,
): Promise<Project> {
  return apiClient<Project>(`projects/${id}`, { method: "PATCH", body: data });
}

export function deleteProject(id: string): Promise<void> {
  return apiClient<void>(`projects/${id}`, { method: "DELETE" });
}
