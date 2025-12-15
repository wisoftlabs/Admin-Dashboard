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
    <Card className="p-5 flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-bold">Upcoming Events</h3>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2.5">
        {events.length === 0
          ? (
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-sm">예정된 일정이 없습니다</p>
              </div>
            )
          : (
              events.map(event => (
                <div
                  key={event.id}
                  className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                >
                  <div
                    className="w-12 h-12 bg-white border border-border rounded-lg flex flex-col items-center justify-center text-foreground flex-shrink-0"
                  >
                    <div className="text-[10px] font-semibold uppercase">{event.month}</div>
                    <div className="text-xl font-bold">{event.day}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-xs text-foreground truncate">
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
