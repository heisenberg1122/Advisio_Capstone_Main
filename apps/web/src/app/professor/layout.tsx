import { Providers } from "@/providers";
import { ProfessorSidebar } from "@/components/dashboards/professor/ProfessorSidebar";
import { ProfessorTopbar } from "@/components/dashboards/professor/ProfessorTopbar";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Professor Dashboard",
    template: "%s | Advisio RMS",
  },
};

export default function ProfessorLayout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <div
        className="grid h-full"
        style={{ gridTemplateColumns: "220px 1fr" }}
      >
        <ProfessorSidebar />
        <main className="flex flex-col overflow-hidden" style={{ background: "var(--color-background-tertiary)" }}>
          <ProfessorTopbar />
          <div className="flex-1 overflow-y-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </Providers>
  );
}
