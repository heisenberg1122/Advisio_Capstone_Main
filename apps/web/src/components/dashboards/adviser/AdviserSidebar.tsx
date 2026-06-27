"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { UserChip } from "@/components/shared/UserChip";

const MENU_ITEMS = [
  { label: "Dashboard", href: "/adviser/dashboard", tabName: "overview", icon: "ti-layout-dashboard" },
  { label: "Assigned Advisees", href: "/adviser/dashboard?tab=advisees", tabName: "advisees", icon: "ti-users" },
  { label: "Group Conferencing", href: "/adviser/dashboard?tab=conferencing", tabName: "conferencing", icon: "ti-video" },
  { label: "Document Review & Commenting", href: "/adviser/dashboard?tab=reviews", tabName: "reviews", icon: "ti-file-text" },
  { label: "Consultation Schedule", href: "/adviser/dashboard?tab=consultations", tabName: "consultations", icon: "ti-calendar-event" },
  { label: "Research Group Progress", href: "/adviser/dashboard?tab=progress", tabName: "progress", icon: "ti-chart-line" },
  { label: "Milestone Approval & Recommendation", href: "/adviser/dashboard?tab=approvals", tabName: "approvals", icon: "ti-circle-check" },
  { label: "Consultation History", href: "/adviser/dashboard?tab=history", tabName: "history", icon: "ti-history" },
  { label: "Notification Management", href: "/adviser/dashboard?tab=notifications", tabName: "notifications", icon: "ti-bell" },
  { label: "Settings", href: "/adviser/dashboard?tab=settings", tabName: "settings", icon: "ti-settings" },
];

export function AdviserSidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentTab = searchParams.get("tab") || "overview";

  const profile = {
    id: "adviser-001",
    name: "Dr. Rachel Lim",
    initials: "RL",
    role: "adviser",
    academicYear: "AY 2025–2026",
    program: "Capstone",
    college: "CCS",
  };

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <aside className="bg-[#1b4264] border-r border-[#ffa400]/10 flex flex-col justify-between select-none h-full w-[240px] text-slate-350">
      <div>
        {/* Logo */}
        <div className="px-5 py-5 border-b border-white/10 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
            <i className="ti ti-school text-base text-[#ffa400]" />
          </div>
          <div>
            <span className="font-extrabold text-[15px] tracking-tight block leading-none text-white">ADVISIO</span>
            <span className="text-[8px] uppercase tracking-wider text-[#ffa400] font-semibold mt-0.5 block">Adviser Panel</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3 flex flex-col gap-0.5 overflow-y-auto">
          {MENU_ITEMS.map((item) => {
            const isActive = currentTab === item.tabName;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[12px] transition-all ${
                  isActive
                    ? "bg-[#ffa400] text-[#1b4264] font-bold shadow-md shadow-[#ffa400]/10"
                    : "hover:bg-white/5 hover:text-white"
                }`}
              >
                <i className={`ti ${item.icon} text-base`} />
                <span className="font-medium truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User chip */}
      <div className="p-3 border-t border-white/10 flex flex-col gap-2">
        <UserChip profile={profile as any} />
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-all font-semibold cursor-pointer"
        >
          <i className="ti ti-logout text-base" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
