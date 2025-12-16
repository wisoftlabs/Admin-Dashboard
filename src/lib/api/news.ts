import { apiClient } from "@/lib/api-client";
import type { News } from "@/lib/schemas/news/news";
import type { NewsCreateFormData } from "@/lib/schemas/news/news-create-form-data";
import type { NewsPreview } from "@/lib/schemas/news/news-preview";
import { type NewsUpdateFormData } from "@/lib/schemas/news/news-update-form-data";

export async function getNews(): Promise<NewsPreview[]> {
  return apiClient<NewsPreview[]>("admin/home/news");
}

export async function getPinnedNews(): Promise<NewsPreview[]> {
  const allNews = await apiClient<NewsPreview[]>("news");
  return allNews.filter(news => news.is_pin);
}

export async function createNews(data: NewsCreateFormData): Promise<News> {
  return apiClient<News>("admin/home/news", { method: "POST", data });
}

export async function updateNews(id: string, data: NewsUpdateFormData) {
  return apiClient<News>(`admin/home/news/${id}`, { method: "PATCH", data });
}

export async function toggleNewsActive(id: string, is_active: boolean) {
  return apiClient<void>(`admin/home/news/${id}`, {
    method: "PATCH",
    data: { is_active: !is_active },
  });
}

export async function getNewsById(id: string): Promise<News> {
  return apiClient<News>(`admin/home/news/${id}`);
}

export async function deleteNews(id: string): Promise<void> {
  return apiClient<void>(`admin/home/news/${id}`, { method: "DELETE" });
}
