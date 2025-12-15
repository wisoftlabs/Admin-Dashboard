import { apiClient } from "@/lib/api-client";
import type { HomeStats } from "@/lib/schemas/home/home-stats";
import type { UpcomingEvent } from "@/lib/schemas/home/upcoming-event";

export async function getHomeStats(): Promise<HomeStats> {
  const [projects, papers, awards, patents] = await Promise.all([
    apiClient<unknown[]>("projects"),
    apiClient<unknown[]>("papers"),
    apiClient<unknown[]>("awards"),
    apiClient<unknown[]>("patents"),
  ]);

  return {
    project_count: projects.length,
    paper_count: papers.length,
    award_count: awards.length,
    patent_count: patents.length,
  };
}

export function getUpcomingEvents(): Promise<UpcomingEvent[]> {
  return apiClient<UpcomingEvent[]>("upcoming_events");
}
