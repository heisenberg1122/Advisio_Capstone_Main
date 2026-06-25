import { Card, CardTitle } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { CheckCircle } from "@/components/defense/CheckCircle";
import type { DefenseRequirement } from "@/types/student";

interface DefenseChecklistProps {
  requirements: DefenseRequirement[];
}

export function DefenseChecklist({ requirements }: DefenseChecklistProps) {
  return (
    <Card>
      <CardTitle icon="ti-checklist" className="mb-4">
        Defense requirements checklist
      </CardTitle>
      <div>
        {requirements.map((req, i) => (
          <div
            key={req.id}
            className={cn(
              "flex items-center gap-[10px] py-[7px]",
              i < requirements.length - 1 && "border-b border-[var(--color-border-tertiary)]"
            )}
          >
            <CheckCircle status={req.status} />
            <div
              className={cn(
                "text-[13px] flex items-center gap-2 flex-1",
                req.status === "pending" && "text-[var(--color-text-tertiary)]"
              )}
            >
              {req.label}
              {req.status === "in_progress" && (
                <span className="tag tag-warn">In progress</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
