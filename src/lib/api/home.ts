import { apiClient } from "@/lib/api-client";
import type { HomeStats } from "@/lib/schemas/home/home-stats";
import type { UpcomingEvent } from "@/lib/schemas/home/upcoming-event";

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

function formatTimeRange(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours < 12 ? "오전" : "오후";
    const displayHours = hours % 12 || 12;
    return `${period} ${displayHours}:${minutes.toString().padStart(2, "0")}`;
  };

  return `${formatTime(startDate)} - ${formatTime(endDate)}`;
}

function calculateDayDifference(start: string, end: string): number {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const startDay = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
  const endDay = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());

  const diffMs = endDay.getTime() - startDay.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return diffDays;
}

export async function getUpcomingEvents(): Promise<UpcomingEvent[]> {
  const events = await apiClient<CalendarEvent[]>("admin/home/calendar");

  return events.map((event) => {
    const startDate = new Date(event.start);
    const dayDiff = calculateDayDifference(event.start, event.end);

    let timeText: string;

    if (event.allDay) {
      if (dayDiff === 0) {
        timeText = "종일";
      }
      else {
        timeText = `${dayDiff + 1}일`;
      }
    }
    else {
      if (dayDiff === 0) {
        timeText = formatTimeRange(event.start, event.end);
      }
      else {
        timeText = `${dayDiff + 1}일`;
      }
    }

    return {
      id: event.id,
      month: startDate.toLocaleString("en-US", { month: "short" }).toUpperCase(),
      day: startDate.getDate(),
      title: event.title,
      time: timeText,
    };
  });
}
