import { Card, CardTitle } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/utils";
import type { Consultation } from "@/types/student";

interface ConsultationHistoryListProps {
  history: Consultation[];
}

export function ConsultationHistoryList({ history }: ConsultationHistoryListProps) {
  return (
    <Card>
      <CardTitle icon="ti-history" className="mb-4">
        Consultation history
      </CardTitle>

      {history.length === 0 ? (
        <div className="empty">No past consultations yet.</div>
      ) : (
        history.map((c, i) => (
          <div
            key={c.id}
            className={cn(
              "flex items-center gap-[10px] py-2",
              i < history.length - 1 && "border-b border-[var(--color-border-tertiary)]"
            )}
          >
            <div
              className="w-[30px] h-[30px] rounded-[var(--border-radius-md)] flex items-center justify-center flex-shrink-0"
              style={{
                background: "var(--color-background-secondary)",
                color: "var(--color-text-success)",
              }}
              aria-hidden="true"
            >
              <i className="ti ti-check text-sm" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] truncate">{c.title}</div>
              <div className="text-[11px] text-[var(--color-text-tertiary)] mt-px">
                {c.date} · {c.duration} · {c.adviser}
              </div>
            </div>
            <Tag variant="success">Done</Tag>
          </div>
        ))
      )}
    </Card>
  );
}
