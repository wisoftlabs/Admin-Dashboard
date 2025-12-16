import { apiClient } from "@/lib/api-client";
import { type Patent } from "@/lib/schemas/patent/patent";
import { type PatentCreateFormData } from "@/lib/schemas/patent/patent-create-form-data";
import { type PatentPreview } from "@/lib/schemas/patent/patent-preview";
import { type PatentUpdateFormData } from "@/lib/schemas/patent/patent-update-form-data";
import type { PatentGetAllResponse } from "@/types/responses/patents";

export const getPatents = async (): Promise<PatentPreview[]> => {
  const response = await apiClient<PatentGetAllResponse>("admin/patents");

  return response.patents;
};

export const getPatent = async (id: string): Promise<Patent> => {
  return apiClient<Patent>(`admin/patents/${id}`);
};

export const createPatent = async (formData: PatentCreateFormData) => {
  const data = new FormData();
  data.append("name", formData.name);
  data.append("year", formData.year.toString());
  data.append("invention_date", formData.invention_date.toISOString().split("T")[0]);
  data.append("pdf_file", formData.pdf_file);
  data.append("link", formData.link);
  await apiClient("admin/patents", { method: "POST", data });
};

export const updatePatent = async (id: string, updateDto: PatentUpdateFormData) => {
  const data = new FormData();

  for (const [key, value] of Object.entries(updateDto)) {
    if (value === undefined || value === null) {
      continue;
    }

    if (value instanceof File) {
      data.append(key, value);
    }
    else if (key === "invention_date" && value instanceof Date) {
      data.append(key, value.toISOString().split("T")[0]);
    }
    else {
      data.append(key, String(value));
    }
  }

  return apiClient<Patent>(`admin/patents/${id}`, { method: "PATCH", data });
};

export const deletePatent = async (patentId: string) => {
  await apiClient(`admin/patents/${patentId}`, { method: "DELETE" });
};
