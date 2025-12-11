import { Link } from "react-router";

import { ChevronRight } from "lucide-react";

import { Card } from "@/components/ui/card";

type EventItem = {
  id: string;
  month: string;
  day: number;
  title: string;
  time: string;
};

type UpcomingEventsProps = {
  events: EventItem[];
};

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  return (
    <Card className="p-6 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">다가오는 일정</h3>
        <Link
          to="/calendar"
          className="text-sm font-semibold text-primary hover:text-primary/80 inline-flex items-center gap-1"
        >
          캘린더
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="flex-1 space-y-3">
        {events.length === 0
          ? (
              <div className="text-center py-10 text-muted-foreground">
                <p>예정된 일정이 없습니다</p>
              </div>
            )
          : (
              events.map(event => (
                <div
                  key={event.id}
                  className="flex items-center gap-4 p-4 bg-muted rounded-lg"
                >
                  <div
                    className="w-14 h-14 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-lg flex flex-col items-center justify-center text-white flex-shrink-0"
                  >
                    <div className="text-xs font-semibold uppercase">{event.month}</div>
                    <div className="text-2xl font-bold">{event.day}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-foreground truncate">
                      {event.title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {event.time}
                    </div>
                  </div>
                </div>
              ))
            )}
      </div>
    </Card>
  );
}
