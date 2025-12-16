import { apiClient } from "@/lib/api-client";
import { type Project } from "@/lib/schemas/project/project";
import { type ProjectCreateFormData } from "@/lib/schemas/project/project-create";
import type { ProjectPreview } from "@/lib/schemas/project/project-preview";
import { type ProjectUpdateFormData } from "@/lib/schemas/project/project-update";
import type { ProjectGetAllResponse } from "@/types/responses/project";

export async function getProjects(): Promise<ProjectPreview[]> {
  const response = await apiClient<ProjectGetAllResponse>("admin/projects");

  return response.projects;
}

export function getProject(id: string): Promise<Project> {
  return apiClient<Project>(`admin/projects/${id}`);
}

export function createProject(data: ProjectCreateFormData): Promise<Project> {
  const formData = new FormData();

  formData.append("status", data.status);
  formData.append("year", String(data.year));
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("link", data.link);
  formData.append("members", JSON.stringify(data.members));

  // thumbnail: File
  if (data.thumbnail instanceof File) {
    formData.append("thumbnail", data.thumbnail);
  }

  return apiClient<Project>("admin/projects", {
    method: "POST",
    data: formData,
  });
}

export function updateProject(
  id: string,
  data: ProjectUpdateFormData,
): Promise<Project> {
  const formData = new FormData();

  formData.append("status", data.status);
  formData.append("year", String(data.year));
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("link", data.link);
  formData.append("members", JSON.stringify(data.members));

  if (data.thumbnail instanceof File) {
    formData.append("thumbnail", data.thumbnail);
  }

  return apiClient<Project>(`admin/projects/${id}`, { method: "PATCH", data: formData });
}

export function deleteProject(id: string): Promise<void> {
  return apiClient<void>(`admin/projects/${id}`, { method: "DELETE" });
}
