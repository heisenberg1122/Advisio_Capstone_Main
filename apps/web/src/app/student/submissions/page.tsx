"use client";

import { useState } from "react";
import { useSubmissions } from "@/hooks/use-student";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { cn } from "@/lib/utils";
import type { SubmissionStatus } from "@/types/student";

type TabFilter = "all" | SubmissionStatus;

const TABS: { id: TabFilter; label: string }[] = [
  { id: "all",      label: "All" },
  { id: "pending",  label: "Pending" },
  { id: "approved", label: "Approved" },
  { id: "revision", label: "Needs revision" },
];

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

const iconMap: Record<SubmissionStatus, { icon: string; bg: string; color: string }> = {
  approved: { icon: "ti-check",   bg: "var(--color-background-success)", color: "var(--color-text-success)" },
  pending:  { icon: "ti-clock",   bg: "var(--color-background-warning)", color: "var(--color-text-warning)" },
  revision: { icon: "ti-refresh", bg: "var(--color-background-danger)",  color: "var(--color-text-danger)"  },
};

export default function SubmissionsPage() {
  const [activeTab, setActiveTab] = useState<TabFilter>("all");
  const { data: submissions, isPending } = useSubmissions();

  const filtered = submissions?.filter(
    (s) => activeTab === "all" || s.status === activeTab
  );

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-[18px] font-medium mb-0.5">Submissions</h1>
        <p className="text-[13px] text-[var(--color-text-secondary)]">
          Document submission and version history
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[var(--color-border-tertiary)] mb-4">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-3.5 py-2 text-[13px] border-b-2 -mb-px transition-colors duration-100",
              activeTab === tab.id
                ? "text-[var(--color-text-info)] border-[var(--color-border-info)]"
                : "text-[var(--color-text-secondary)] border-transparent hover:text-[var(--color-text-primary)]"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isPending ? (
        <Card>
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-[var(--color-background-secondary)] rounded" />
            ))}
          </div>
        </Card>
      ) : (
        <Card>
          {filtered?.length === 0 ? (
            <div className="empty">No submissions match this filter.</div>
          ) : (
            filtered?.map((sub, i) => {
              const { icon, bg, color } = iconMap[sub.status];
              return (
                <div
                  key={sub.id}
                  className={cn(
                    "flex items-center gap-[10px] py-2",
                    i < (filtered?.length ?? 0) - 1 &&
                      "border-b border-[var(--color-border-tertiary)]"
                  )}
                >
                  <div
                    className="w-[30px] h-[30px] rounded-[var(--border-radius-md)] flex items-center justify-center flex-shrink-0 text-sm"
                    style={{ background: bg }}
                    aria-hidden="true"
                  >
                    <i className={`ti ${icon}`} style={{ color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[13px] truncate">{sub.name}</div>
                    <div className="text-[11px] text-[var(--color-text-tertiary)] mt-px">
                      Submitted {sub.submittedAt}
                      {sub.reviewer && ` · ${sub.reviewer}`}
                    </div>
                  </div>
                  <Tag variant={statusVariant[sub.status]} size="sm">
                    {statusLabel[sub.status]}
                  </Tag>
                </div>
              );
            })
          )}
        </Card>
      )}

      <div className="flex justify-end mt-4">
        <button className="btn btn-primary">
          <i className="ti ti-upload" aria-hidden="true" />
          Upload new document
        </button>
      </div>
    </div>
  );
}
