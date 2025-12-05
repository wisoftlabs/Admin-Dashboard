import { format } from "date-fns";

import { apiClient } from "@/lib/api-client";
import type { Award } from "@/lib/schemas/award/award";
import type { AwardCreateFormData } from "@/lib/schemas/award/award-create-form-data";
import type { AwardPreview } from "@/lib/schemas/award/award-preview";
import { type AwardUpdateFormData } from "@/lib/schemas/award/award-update-form-data";
import { ImageTypeSchema } from "@/lib/schemas/shared/image-type";
import { type Orientation } from "@/lib/schemas/shared/orientation";
import { getImageOrientation, getImageResolutions } from "@/lib/utils/image";

export async function getAwards(): Promise<AwardPreview[]> {
  return await apiClient<AwardPreview[]>("awards");
}

export async function getAward(id: string): Promise<Award> {
  return apiClient<Award>(`awards/${id}`);
}

export async function createAward(data: AwardCreateFormData): Promise<Award> {
  const size = await getImageResolutions(data.image_file);
  const orientation: Orientation = getImageOrientation(size);
  const image_type = ImageTypeSchema.parse(
    data.image_file.type.split("/")[1],
  );

  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    }
    else if (key === "date" && value instanceof Date) {
      formData.append(key, format(value, "yyyy-MM-dd"));
    }
    else {
      formData.append(key, String(value));
    }
  });
  formData.append("orientation", orientation);
  formData.append("image_type", image_type);

  return apiClient<Award>("awards", { method: "POST", body: formData });
}

export async function updateAward(id: string, data: AwardUpdateFormData): Promise<Award> {
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
    else if (key === "date" && value instanceof Date) {
      formData.append(key, format(value, "yyyy-MM-dd"));
    }
    else {
      formData.append(key, String(value));
    }
  }

  return apiClient<Award>(`awards/${id}`, { method: "PATCH", body: formData });
}

export function deleteAward(id: string): Promise<void> {
  return apiClient<void>(`awards/${id}`, { method: "DELETE" });
}
