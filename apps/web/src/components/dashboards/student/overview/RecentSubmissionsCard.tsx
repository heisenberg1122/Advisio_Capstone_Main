import { Card, CardHeader, CardTitle, CardLink } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/utils";
import type { Submission, SubmissionStatus } from "@/types/student";

const statusVariant: Record<SubmissionStatus, "success" | "warn" | "danger"> = {
  approved: "success",
  pending:  "warn",
  revision: "danger",
};

const statusLabel: Record<SubmissionStatus, string> = {
  approved: "Approved",
  pending:  "Pending",
  revision: "Revision",
};

interface RecentSubmissionsCardProps {
  submissions: Submission[];
  onViewAll?: () => void;
}

export function RecentSubmissionsCard({ submissions, onViewAll }: RecentSubmissionsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle icon="ti-upload">Recent submissions</CardTitle>
        <CardLink onClick={onViewAll}>View all</CardLink>
      </CardHeader>

      <div>
        {submissions.map((sub, i) => (
          <div
            key={sub.id}
            className={cn(
              "flex items-center gap-[10px] py-2",
              i < submissions.length - 1 && "border-b border-[var(--color-border-tertiary)]"
            )}
          >
            <div
              className="w-[30px] h-[30px] rounded-[var(--border-radius-md)] flex items-center justify-center flex-shrink-0 text-[15px]"
              style={{
                background: "var(--color-background-secondary)",
                color: "var(--color-text-secondary)",
              }}
              aria-hidden="true"
            >
              <i className="ti ti-file-text" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] truncate">{sub.name}</div>
              <div className="text-[11px] text-[var(--color-text-tertiary)] mt-px">
                {sub.submittedAt}
                {sub.reviewer && ` · ${sub.reviewer}`}
              </div>
            </div>
            <Tag variant={statusVariant[sub.status]} size="sm">
              {statusLabel[sub.status]}
            </Tag>
          </div>
        ))}
      </div>
    </Card>
  );
}
