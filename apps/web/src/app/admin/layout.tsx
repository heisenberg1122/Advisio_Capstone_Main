"use client";

import React, { Suspense } from "react";
import { Providers } from "@/providers";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

const MENU_ITEMS = [
  { label: "Dashboard", href: "/admin/dashboard", tabName: "overview", icon: "ti-layout-dashboard" },
  { label: "User Account Management", href: "/admin/dashboard?tab=users", tabName: "users", icon: "ti-users" },
  { label: "Defense Scheduling", href: "/admin/dashboard?tab=defense", tabName: "defense", icon: "ti-calendar-event" },
  { label: "Research Project Monitoring", href: "/admin/dashboard?tab=projects", tabName: "projects", icon: "ti-chart-line" },
  { label: "Deadlines & Calendar", href: "/admin/dashboard?tab=deadlines", tabName: "deadlines", icon: "ti-alarm" },
  { label: "Certificate of Completion", href: "/admin/dashboard?tab=certificates", tabName: "certificates", icon: "ti-certificate" },
  { label: "Reports", href: "/admin/dashboard?tab=reports", tabName: "reports", icon: "ti-file-text" },
  { label: "Analytics", href: "/admin/dashboard?tab=analytics", tabName: "analytics", icon: "ti-presentation" },
  { label: "Repository Management", href: "/admin/dashboard?tab=repository", tabName: "repository", icon: "ti-archive" },
  { label: "Notifications", href: "/admin/dashboard?tab=notifications", tabName: "notifications", icon: "ti-bell" },
  { label: "Settings", href: "/admin/dashboard?tab=settings", tabName: "settings", icon: "ti-settings" },
];

function AdminSidebar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentTab = searchParams.get("tab") || "overview";

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <aside className="bg-[#1b4264] border-r border-[#ffa400]/10 flex flex-col justify-between select-none h-full">
      <div>
        {/* Logo area */}
        <div className="px-5 py-5 border-b border-white/10 flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center">
            <i className="ti ti-school text-base text-[#ffa400]" />
          </div>
          <div>
            <span className="font-extrabold text-[15px] tracking-tight block leading-none text-white">ADVISIO</span>
            <span className="text-[9px] uppercase tracking-wider text-[#ffa400] font-semibold">Admin Panel</span>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="p-3 flex flex-col gap-1 overflow-y-auto">
          {MENU_ITEMS.map((item) => {
            const isActive = currentTab === item.tabName;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[12.5px] transition-all ${
                  isActive
                    ? "bg-[#ffa400] text-[#1b4264] font-bold shadow-md shadow-[#ffa400]/10"
                    : "hover:bg-white/5 hover:text-white text-slate-300"
                }`}
              >
                <i className={`ti ${item.icon} text-base`} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom user action */}
      <div className="p-3 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[12.5px] text-red-300 hover:bg-red-500/10 hover:text-red-200 transition-all font-semibold cursor-pointer"
        >
          <i className="ti ti-logout text-base" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="grid h-full min-h-screen text-slate-100" style={{ gridTemplateColumns: "240px 1fr" }}>
        
        {/* SIDEBAR WRAPPED IN SUSPENSE */}
        <Suspense fallback={<div className="bg-[#1b4264] w-[240px] h-full" />}>
          <AdminSidebar />
        </Suspense>

        {/* MAIN BODY AREA */}
        <div className="flex flex-col bg-slate-50 overflow-hidden text-slate-800">
          {children}
        </div>

      </div>
    </Providers>
  );
}
