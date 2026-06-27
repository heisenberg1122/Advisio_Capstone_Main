"use client";

import React, { Suspense } from "react";
import { Providers } from "@/providers";
import { PanelistSidebar } from "@/components/dashboards/panelist/PanelistSidebar";
import { PanelistTopbar } from "@/components/dashboards/panelist/PanelistTopbar";

export default function PanelistLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="grid h-full min-h-screen text-slate-100" style={{ gridTemplateColumns: "240px 1fr" }}>
        
        {/* SIDEBAR WRAPPED IN SUSPENSE */}
        <Suspense fallback={<div className="bg-[#1b4264] w-[240px] h-full" />}>
          <PanelistSidebar />
        </Suspense>

        {/* MAIN BODY AREA */}
        <div className="flex flex-col bg-slate-50 overflow-hidden text-slate-800">
          {children}
        </div>

      </div>
    </Providers>
  );
}
