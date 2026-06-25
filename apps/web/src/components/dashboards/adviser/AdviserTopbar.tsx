"use client";

import { usePathname } from "next/navigation";

const PAGE_TITLES: Record<string, string> = {
  "/adviser/dashboard":     "Adviser Dashboard",
  "/adviser/advisees":      "Assigned Advisees",
  "/adviser/requests":      "Milestone Requests",
  "/adviser/consultations": "Consultations",
  "/adviser/reviews":       "Document Reviews",
  "/adviser/tasks":         "Tasks Management",
  "/adviser/announcements": "Announcements",
};

export function AdviserTopbar() {
  const pathname = usePathname();
  const title = PAGE_TITLES[pathname] ?? "Adviser Dashboard";

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
          className="icon-btn badge-dot"
          aria-label="Notifications — you have unread notifications"
        >
          <i className="ti ti-bell text-base" aria-hidden="true" />
        </button>
        <button className="icon-btn" aria-label="Search">
          <i className="ti ti-search text-base" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
