"use client";

import { Card, CardHeader, CardTitle, CardLink } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { useToggleTask } from "@/hooks/use-student";
import { cn } from "@/lib/utils";
import type { Task } from "@/types/student";
import { useRouter } from "next/navigation";

interface PendingTasksCardProps {
  tasks: Task[];
}

export function PendingTasksCard({ tasks }: PendingTasksCardProps) {
  const router = useRouter();
  const toggleTask = useToggleTask();

  return (
    <Card>
      <CardHeader>
        <CardTitle icon="ti-checkbox">Pending tasks</CardTitle>
        <CardLink onClick={() => router.push("/submissions")}>View all</CardLink>
      </CardHeader>

      <div>
        {tasks.map((task, i) => (
          <div
            key={task.id}
            className={cn(
              "flex items-start gap-[10px] py-2",
              i < tasks.length - 1 && "border-b border-[var(--color-border-tertiary)]"
            )}
          >
            <button
              onClick={() =>
                toggleTask.mutate({
                  taskId: task.id,
                  status: task.status === "done" ? "pending" : "done",
                })
              }
              aria-label={task.status === "done" ? "Mark as pending" : "Mark as done"}
              className={cn("task-check mt-px", task.status === "done" && "done")}
            >
              {task.status === "done" && (
                <i
                  className="ti ti-check text-[11px] text-[var(--color-text-success)]"
                  aria-hidden="true"
                />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <div
                className={cn(
                  "text-[13px] leading-snug",
                  task.status === "done" &&
                    "text-[var(--color-text-tertiary)] line-through"
                )}
              >
                {task.name}
              </div>
              <div className="mt-0.5">
                <Tag variant={task.urgency} size="sm">
                  {task.dueDate}
                </Tag>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
