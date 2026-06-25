import { Providers } from "@/providers";
import { StudentSidebar } from "@/components/dashboards/student/StudentSidebar";
import { StudentTopbar } from "@/components/dashboards/student/StudentTopbar";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Student Dashboard",
    template: "%s | Advisio RMS",
  },
};

export default function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <div
        className="grid h-full"
        style={{ gridTemplateColumns: "220px 1fr" }}
      >
        <StudentSidebar />
        <main className="flex flex-col overflow-hidden" style={{ background: "var(--color-background-tertiary)" }}>
          <StudentTopbar />
          <div className="flex-1 overflow-y-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </Providers>
  );
}
