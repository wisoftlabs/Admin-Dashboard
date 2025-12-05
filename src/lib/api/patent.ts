import { apiClient } from "@/lib/api-client";
import { type Patent } from "@/lib/schemas/patent/patent";
import { type PatentCreateFormData } from "@/lib/schemas/patent/patent-create-form-data";
import { type PatentPreview } from "@/lib/schemas/patent/patent-preview";
import { type PatentUpdateFormData } from "@/lib/schemas/patent/patent-update-form-data";

export const getPatents = async (): Promise<PatentPreview[]> => {
  return apiClient<PatentPreview[]>("patents");
};

export const getPatent = async (id: string): Promise<Patent> => {
  return apiClient<Patent>(`patents/${id}`);
};

export const createPatent = async (formData: PatentCreateFormData) => {
  const body = new FormData();
  body.append("name", formData.name);
  body.append("year", formData.year.toString());
  body.append("invention_date", formData.invention_date.toISOString().split("T")[0]);
  body.append("pdf_file", formData.pdf_file);
  body.append("link", formData.link);
  await apiClient("patents", { method: "POST", body });
};

export const updatePatent = async (id: string, data: PatentUpdateFormData) => {
  const body = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value === null) {
      continue;
    }

    if (value instanceof File) {
      body.append(key, value);
    }
    else if (key === "invention_date" && value instanceof Date) {
      body.append(key, value.toISOString().split("T")[0]);
    }
    else {
      body.append(key, String(value));
    }
  }

  return apiClient<Patent>(`patents/${id}`, { method: "PATCH", body });
};

export const deletePatent = async (patentId: string) => {
  await apiClient(`patents/${patentId}`, { method: "DELETE" });
};
