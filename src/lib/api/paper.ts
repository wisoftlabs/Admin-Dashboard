import { apiClient } from "@/lib/api-client";
import type { Paper } from "@/lib/schemas/paper/paper";
import type { PaperCreateFormData } from "@/lib/schemas/paper/paper-create-form-data";
import {ImageTypeSchema} from "@/lib/schemas/common/image-type";
import type {PaperPreview} from "@/lib/schemas/paper/paper-preview";

export async function getPapers(): Promise<PaperPreview[]> {
  return await apiClient<PaperPreview[]>("papers");
}

export async function createPaper(data: PaperCreateFormData): Promise<Paper> {
  const image_type = ImageTypeSchema.parse(
    data.image_file.type.split("/")[1],
  );

  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else {
      formData.append(key, String(value));
    }
  });
  formData.append("image_type", image_type);

  return apiClient<Paper>("papers", { method: "POST", body: formData });
}

export function deletePaper(id: string): Promise<void> {
  return apiClient<void>(`papers/${id}`, { method: "DELETE" });
}
