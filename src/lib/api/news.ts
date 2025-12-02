import { apiClient } from "@/lib/api-client";
import type { News } from "@/lib/schemas/news/news";
import type { NewsCreateFormData } from "@/lib/schemas/news/news-create-form-data";
import type { NewsPreview } from "@/lib/schemas/news/news-preview";
import { type NewsUpdateFormData } from "@/lib/schemas/news/news-update-form-data";

export async function getNews(): Promise<NewsPreview[]> {
  return apiClient<NewsPreview[]>("news");
}

export async function createNews(data: NewsCreateFormData): Promise<News> {
  return apiClient<News>("news", { method: "POST", body: data });
}

export async function updateNews(id: string, data: NewsUpdateFormData) {
  return apiClient<News>(`news/${id}`, { method: "PATCH", body: data });
}

export async function toggleNewsPin(id: string, is_pin: boolean) {
  return apiClient<void>(`news/${id}`, {
    method: "PATCH",
    body: { is_pin: !is_pin },
  });
}

export async function getNewsById(id: string): Promise<News> {
  return apiClient<News>(`news/${id}`);
}

export async function deleteNews(id: string): Promise<void> {
  return apiClient<void>(`news/${id}`, { method: "DELETE" });
}
