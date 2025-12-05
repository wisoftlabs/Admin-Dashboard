import { format } from "date-fns";

import { apiClient } from "@/lib/api-client";
import type { Paper } from "@/lib/schemas/paper/paper";
import type { PaperCreateFormData } from "@/lib/schemas/paper/paper-create-form-data";
import type { PaperPreview } from "@/lib/schemas/paper/paper-preview";
import { type PaperUpdateFormData } from "@/lib/schemas/paper/paper-update-form-data";
import { ImageTypeSchema } from "@/lib/schemas/shared/image-type";

export async function getPapers(): Promise<PaperPreview[]> {
  return await apiClient<PaperPreview[]>("papers");
}

export async function getPaper(id: string): Promise<Paper> {
  return apiClient<Paper>(`papers/${id}`);
}

export async function createPaper(data: PaperCreateFormData): Promise<Paper> {
  const image_type = ImageTypeSchema.parse(
    data.image_file.type.split("/")[1],
  );

  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    }
    else if (key === "publication_date" && value instanceof Date) {
      formData.append(key, format(value, "yyyy-MM-dd"));
    }
    else {
      formData.append(key, String(value));
    }
  });
  formData.append("image_type", image_type);

  return apiClient<Paper>("papers", { method: "POST", body: formData });
}

export async function updatePaper(id: string, data: PaperUpdateFormData): Promise<Paper> {
  const formData = new FormData();

  if (data.image_file) {
    const image_type = ImageTypeSchema.parse(
      data.image_file.type.split("/")[1],
    );
    formData.append("image_type", image_type);
  }

  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === null) {
      continue;
    }

    if (value instanceof File) {
      formData.append(key, value);
    }
    else if (key === "publication_date" && value instanceof Date) {
      formData.append(key, format(value, "yyyy-MM-dd"));
    }
    else {
      formData.append(key, String(value));
    }
  }

  return apiClient<Paper>(`papers/${id}`, { method: "PATCH", body: formData });
}

export function deletePaper(id: string): Promise<void> {
  return apiClient<void>(`papers/${id}`, { method: "DELETE" });
}
