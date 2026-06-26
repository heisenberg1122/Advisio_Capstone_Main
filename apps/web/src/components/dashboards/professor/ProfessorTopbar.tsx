"use client";

import { usePathname } from "next/navigation";

const PAGE_TITLES: Record<string, string> = {
  "/professor/dashboard":    "Professor Dashboard",
  "/professor/analytics":    "Analytics & Monitoring",
  "/professor/milestones":   "Milestones & Custom Tasks",
  "/professor/rubric":       "Rubrics & Evaluation Criteria",
  "/professor/plagiarism":   "Plagiarism Detection Center",
  "/professor/panelists":    "Panelist Assignment",
};

export function ProfessorTopbar() {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] ?? "Professor Dashboard";

  return (
    <header
      className="h-[52px] flex-shrink-0 flex items-center justify-between px-6 border-b border-[var(--color-border-tertiary)]"
      style={{ background: "var(--color-background-primary)" }}
    >
      <div className="flex items-center gap-3">
        <span
          className="text-[13px] text-[var(--color-text-secondary)]"
          aria-label="Current page"
        >
          <span className="text-[var(--color-text-primary)] font-medium">{title}</span>
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="icon-btn badge-dot relative p-2 rounded-full hover:bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition"
          aria-label="Notifications — you have unread notifications"
        >
          <i className="ti ti-bell text-base" aria-hidden="true" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <button className="icon-btn p-2 rounded-full hover:bg-[var(--color-background-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition" aria-label="Search">
          <i className="ti ti-search text-base" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
