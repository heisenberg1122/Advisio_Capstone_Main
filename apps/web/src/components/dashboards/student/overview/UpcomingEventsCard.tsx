import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import type { UpcomingEvent } from "@/types/student";

const dotColor: Record<UpcomingEvent["color"], string> = {
  info:    "bg-[var(--color-background-info)]",
  success: "bg-[var(--color-background-success)]",
  warning: "bg-[var(--color-background-warning)]",
  danger:  "bg-[var(--color-background-danger)]",
};

const dotSolid: Record<UpcomingEvent["color"], string> = {
  info:    "bg-[var(--color-text-info)]",
  success: "bg-[var(--color-text-success)]",
  warning: "bg-[var(--color-text-warning)]",
  danger:  "bg-[var(--color-text-danger)]",
};

interface UpcomingEventsCardProps {
  events: UpcomingEvent[];
}

export function UpcomingEventsCard({ events }: UpcomingEventsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle icon="ti-calendar-event">Upcoming events</CardTitle>
      </CardHeader>

      <div>
        {events.map((event, i) => (
          <div
            key={event.id}
            className={cn(
              "flex items-center gap-[10px] py-2",
              i < events.length - 1 && "border-b border-[var(--color-border-tertiary)]"
            )}
          >
            <div
              className={cn("w-2 h-2 rounded-full flex-shrink-0", dotSolid[event.color])}
              aria-hidden="true"
            />
            <div className="flex-1">
              <div className="text-[13px]">{event.name}</div>
              <div className="text-[11px] text-[var(--color-text-tertiary)] mt-px">
                {event.from}
              </div>
            </div>
            <div className="text-[11px] text-[var(--color-text-secondary)] whitespace-nowrap">
              {event.date}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
