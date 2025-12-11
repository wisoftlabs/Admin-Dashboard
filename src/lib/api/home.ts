import { apiClient } from "@/lib/api-client";
import type { HomeStats } from "@/lib/schemas/home/home-stats";

export async function getHomeStats(): Promise<HomeStats> {
  return apiClient<HomeStats>("home/stats");
}
