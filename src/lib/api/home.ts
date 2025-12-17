import { apiClient } from "@/lib/api-client";
import type { HomeStats } from "@/lib/schemas/home/home-stats";
import type { UpcomingEvent } from "@/lib/schemas/home/upcoming-event";
import type { NewsPreview } from "@/lib/schemas/news/news-preview";
import { parseDate } from "@/lib/utils/date";

type CalendarEvent = {
  id: string;
  title: string;
  start: string;
  end: string;
  allDay: boolean;
};

export function getHomeStats(): Promise<HomeStats> {
  return apiClient<HomeStats>("admin/home/stats");
}

export async function getActiveNews(): Promise<NewsPreview[]> {
  const allNews = await apiClient<NewsPreview[]>("admin/home/news");
  return allNews.filter(news => news.is_active);
}

export async function getUpcomingEvents(): Promise<UpcomingEvent[]> {
  const events = await apiClient<CalendarEvent[]>("admin/home/calendar");

  return events.map((event) => {
    const start = parseDate(event.start);
    const end = parseDate(event.end);

    const diffDays = end.startOf("day").diff(start.startOf("day"), "day");

    let timeText: string;

    if (diffDays > 0) {
      timeText = `${diffDays + 1}일`;
    }
    else if (event.allDay) {
      timeText = "종일";
    }
    else {
      timeText = `${start.format("A h:mm")} - ${end.format("A h:mm")}`;
    }

    return {
      id: event.id,
      month: start.locale("en").format("MMM").toUpperCase(),
      day: start.date(),
      title: event.title,
      time: timeText,
    };
  });
}
