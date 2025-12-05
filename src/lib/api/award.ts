import { apiClient } from "@/lib/api-client";
import { getImageOrientation, getImageResolutions } from "@/lib/image";
import type { Award } from "@/lib/schemas/award/award";
import type { AwardCreateFormData } from "@/lib/schemas/award/award-create-form-data";
import type { AwardPreview } from "@/lib/schemas/award/award-preview";
import { ImageTypeSchema } from "@/lib/schemas/shared/image-type";
import { type Orientation } from "@/lib/schemas/shared/orientation";

export async function getAwards(): Promise<AwardPreview[]> {
  return await apiClient<AwardPreview[]>("awards");
}

export async function createAward(data: AwardCreateFormData): Promise<Award> {
  const size = await getImageResolutions(data.image_file);
  const orientation: Orientation = getImageOrientation(size);
  const image_type = ImageTypeSchema.parse(
    data.image_file.type.split("/")[1],
  );

  console.log("createAward", data);

  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    }
    else {
      formData.append(key, String(value));
    }
  });
  formData.append("orientation", orientation);
  formData.append("image_type", image_type);

  return apiClient<Award>("awards", { method: "POST", body: formData });
}

export function deleteAward(id: string): Promise<void> {
  return apiClient<void>(`awards/${id}`, { method: "DELETE" });
}
