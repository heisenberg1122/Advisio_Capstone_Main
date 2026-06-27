"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { UserChip } from "@/components/shared/UserChip";
import { studentMockData } from "@/lib/mock-data/student";

const MENU_ITEMS = [
  { label: "Dashboard", href: "/student/dashboard", tabName: "overview", icon: "ti-layout-dashboard" },
  { label: "Profile Management", href: "/student/dashboard?tab=profile", tabName: "profile", icon: "ti-user" },
  { label: "Research Group Management", href: "/student/dashboard?tab=group", tabName: "group", icon: "ti-users" },
  { label: "Adviser Credentials Hub", href: "/student/dashboard?tab=adviser-credentials", tabName: "adviser-credentials", icon: "ti-id" },
  { label: "AI Adviser Recommendation", href: "/student/dashboard?tab=ai-recommendation", tabName: "ai-recommendation", icon: "ti-brain" },
  { label: "Group Conferencing", href: "/student/dashboard?tab=conferencing", tabName: "conferencing", icon: "ti-video" },
  { label: "Research Document Submission", href: "/student/dashboard?tab=submission", tabName: "submission", icon: "ti-upload" },
  { label: "Document Version Control", href: "/student/dashboard?tab=version-control", tabName: "version-control", icon: "ti-history" },
  { label: "Project Milestones", href: "/student/dashboard?tab=milestones", tabName: "milestones", icon: "ti-target" },
  { label: "Consultation Requests", href: "/student/dashboard?tab=consultation-requests", tabName: "consultation-requests", icon: "ti-calendar-event" },
  { label: "Consultation Repository", href: "/student/dashboard?tab=consultation-repo", tabName: "consultation-repo", icon: "ti-folder" },
  { label: "Progress Tracking", href: "/student/dashboard?tab=progress", tabName: "progress", icon: "ti-chart-line" },
  { label: "Defense Schedule", href: "/student/dashboard?tab=defense", tabName: "defense", icon: "ti-calendar" },
  { label: "Notifications & Announcements", href: "/student/dashboard?tab=notifications", tabName: "notifications", icon: "ti-bell" },
  { label: "Certificates of Completion", href: "/student/dashboard?tab=certificates", tabName: "certificates", icon: "ti-certificate" },
  { label: "Settings", href: "/student/dashboard?tab=settings", tabName: "settings", icon: "ti-settings" },
];

export function StudentSidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentTab = searchParams.get("tab") || "overview";
  const { profile } = studentMockData.overview;

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
            <span className="font-extrabold text-[15px] tracking-tight block leading-none text-white font-sans">ADVISIO</span>
            <span className="text-[8px] uppercase tracking-wider text-[#ffa400] font-semibold mt-0.5 block">Student Panel</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-3 flex flex-col gap-0.5 overflow-y-auto max-h-[70vh]">
          {MENU_ITEMS.map((item) => {
            const isActive = currentTab === item.tabName;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] transition-all ${
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
        <UserChip profile={profile} />
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
