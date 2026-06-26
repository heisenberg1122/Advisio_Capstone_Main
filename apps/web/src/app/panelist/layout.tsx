import { Providers } from "@/providers";
import { PanelistSidebar } from "@/components/dashboards/panelist/PanelistSidebar";
import { PanelistTopbar } from "@/components/dashboards/panelist/PanelistTopbar";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Panelist Dashboard",
    template: "%s | Advisio RMS",
  },
};

export default function PanelistLayout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <div
        className="grid h-full"
        style={{ gridTemplateColumns: "220px 1fr" }}
      >
        <PanelistSidebar />
        <main className="flex flex-col overflow-hidden" style={{ background: "var(--color-background-tertiary)" }}>
          <PanelistTopbar />
          <div className="flex-1 overflow-y-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </Providers>
  );
}
