import { NavItem } from "@/components/shared/NavItem";
import { UserChip } from "@/components/shared/UserChip";

const NAV_SECTIONS = [
  {
    label: "Main",
    items: [
      { href: "/professor/dashboard",    icon: "ti-layout-dashboard", label: "Dashboard" },
      { href: "/professor/analytics",    icon: "ti-chart-bar",        label: "Analytics & Monitoring" },
    ],
  },
  {
    label: "Academics",
    items: [
      { href: "/professor/milestones",   icon: "ti-list-check",       label: "Milestones & Tasks" },
      { href: "/professor/rubric",       icon: "ti-category",         label: "Rubric & Grading" },
    ],
  },
  {
    label: "Integrity & Defense",
    items: [
      { href: "/professor/plagiarism",   icon: "ti-shield-alert",     label: "Plagiarism Check" },
      { href: "/professor/panelists",    icon: "ti-users-group",      label: "Panelists" },
    ],
  },
];

export function ProfessorSidebar() {
  const profile = {
    id: "prof-001",
    name: "Dr. Arthur Pendelton",
    initials: "AP",
    role: "professor",
    academicYear: "AY 2025–2026",
    program: "Capstone",
    college: "CCS",
  };

  return (
    <aside
      className="flex flex-col border-r border-[var(--color-border-tertiary)]"
      style={{ background: "var(--color-background-primary)" }}
      aria-label="Professor navigation"
    >
      {/* Logo */}
      <div className="px-4 py-5 border-b border-[var(--color-border-tertiary)]">
        <div className="flex items-center gap-2 font-medium text-[15px]">
          <div
            className="w-7 h-7 rounded-[var(--border-radius-md)] flex items-center justify-center flex-shrink-0"
            style={{ background: "var(--color-background-info)" }}
          >
            <i
              className="ti ti-school text-base text-[var(--color-text-info)]"
              aria-hidden="true"
            />
          </div>
          <span className="text-[var(--color-text-primary)]">Advisio</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 overflow-y-auto" aria-label="Main navigation">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label}>
            <div className="px-4 pt-2 pb-1 text-[11px] text-[var(--color-text-tertiary)] uppercase tracking-[0.06em]">
              {section.label}
            </div>
            {section.items.map((item) => (
              <NavItem key={item.href} {...item} />
            ))}
          </div>
        ))}
      </nav>

      {/* User chip */}
      <div className="p-4 border-t border-[var(--color-border-tertiary)]">
        <UserChip profile={profile as any} />
      </div>
    </aside>
  );
}
