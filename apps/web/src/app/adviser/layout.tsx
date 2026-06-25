import { Providers } from "@/providers";
import { AdviserSidebar } from "@/components/dashboards/adviser/AdviserSidebar";
import { AdviserTopbar } from "@/components/dashboards/adviser/AdviserTopbar";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: {
    default: "Adviser Dashboard",
    template: "%s | Advisio RMS",
  },
};

export default function AdviserLayout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <div
        className="grid h-full"
        style={{ gridTemplateColumns: "220px 1fr" }}
      >
        <AdviserSidebar />
        <main className="flex flex-col overflow-hidden" style={{ background: "var(--color-background-tertiary)" }}>
          <AdviserTopbar />
          <div className="flex-1 overflow-y-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </Providers>
  );
}
