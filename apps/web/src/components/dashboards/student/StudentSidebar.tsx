import { NavItem } from "@/components/shared/NavItem";
import { UserChip } from "@/components/shared/UserChip";
import { studentMockData } from "@/lib/mock-data/student";

const NAV_SECTIONS = [
  {
    label: "Main",
    items: [
      { href: "/dashboard",    icon: "ti-layout-dashboard", label: "Dashboard" },
      { href: "/groups",       icon: "ti-users",            label: "My group" },
      { href: "/adviser-pool", icon: "ti-user-check",       label: "Adviser pool" },
    ],
  },
  {
    label: "Work",
    items: [
      { href: "/submissions",   icon: "ti-upload",   label: "Submissions" },
      { href: "/consultations", icon: "ti-messages", label: "Consultations" },
    ],
  },
  {
    label: "Progress",
    items: [
      { href: "/defense",       icon: "ti-shield-check", label: "Defense center" },
      { href: "/grades",        icon: "ti-star",         label: "Grades" },
      { href: "/notifications", icon: "ti-bell",         label: "Notifications" },
    ],
  },
  {
    label: "Account",
    items: [
      { href: "/settings", icon: "ti-settings", label: "Settings" },
    ],
  },
];

export function StudentSidebar() {
  const { profile } = studentMockData.overview;

  return (
    <aside
      className="flex flex-col border-r border-[var(--color-border-tertiary)]"
      style={{ background: "var(--color-background-primary)" }}
      aria-label="Student navigation"
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
        <UserChip profile={profile} />
      </div>
    </aside>
  );
}
