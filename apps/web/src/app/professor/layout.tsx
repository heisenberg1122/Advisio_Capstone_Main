"use client";

import React, { Suspense } from "react";
import { Providers } from "@/providers";
import { ProfessorSidebar } from "@/components/dashboards/professor/ProfessorSidebar";
import { ProfessorTopbar } from "@/components/dashboards/professor/ProfessorTopbar";

export default function ProfessorLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="grid h-full min-h-screen text-slate-100" style={{ gridTemplateColumns: "240px 1fr" }}>
        
        {/* SIDEBAR WRAPPED IN SUSPENSE */}
        <Suspense fallback={<div className="bg-[#1b4264] w-[240px] h-full" />}>
          <ProfessorSidebar />
        </Suspense>

        {/* MAIN BODY AREA */}
        <div className="flex flex-col bg-slate-50 overflow-hidden text-slate-800">
          {children}
        </div>

      </div>
    </Providers>
  );
}
