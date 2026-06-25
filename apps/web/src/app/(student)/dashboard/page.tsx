"use client";

import { useRouter } from "next/navigation";
import { useStudentOverview } from "@/hooks/use-student";
import { ProgressBanner } from "@/components/dashboards/student/overview/ProgressBanner";
import { StatsRow } from "@/components/dashboards/student/overview/StatsRow";
import { PendingTasksCard } from "@/components/dashboards/student/overview/PendingTasksCard";
import { UpcomingEventsCard } from "@/components/dashboards/student/overview/UpcomingEventsCard";
import { RecentNotificationsCard } from "@/components/dashboards/student/overview/RecentNotificationsCard";
import { RecentSubmissionsCard } from "@/components/dashboards/student/overview/RecentSubmissionsCard";
import { getGreeting } from "@/lib/utils";
import type { Metadata } from "next";

export default function DashboardPage() {
  const router = useRouter();
  const { data, isPending } = useStudentOverview();

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-full min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <div
            className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: "var(--color-border-info)", borderTopColor: "transparent" }}
          />
          <span className="text-[13px] text-[var(--color-text-tertiary)]">Loading dashboard…</span>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const { profile, progress, stats, pendingTasks, upcomingEvents, recentNotifications, recentSubmissions } = data;

  return (
    <div>
      {/* Page header */}
      <div className="mb-6 animate-fade-in-up">
        <h1 className="text-[18px] font-medium mb-0.5">
          {getGreeting(profile.name.split(" ")[0])}
        </h1>
        <p className="text-[13px] text-[var(--color-text-secondary)]">
          {profile.academicYear} · {profile.program} · {profile.college}
        </p>
      </div>

      {/* Progress banner */}
      <ProgressBanner progress={progress} />

      {/* Stats row */}
      <StatsRow stats={stats} />

      {/* Row 1: Tasks + Events */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <PendingTasksCard tasks={pendingTasks} />
        <UpcomingEventsCard events={upcomingEvents} />
      </div>

      {/* Row 2: Notifications + Recent Submissions */}
      <div className="grid grid-cols-2 gap-4">
        <RecentNotificationsCard
          notifications={recentNotifications}
          onSeeAll={() => router.push("/notifications")}
        />
        <RecentSubmissionsCard
          submissions={recentSubmissions}
          onViewAll={() => router.push("/submissions")}
        />
      </div>
    </div>
  );
}
