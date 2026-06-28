"use client";

import { Card } from "@/components/ui/Card";
import { NotificationList } from "@/components/notifications/NotificationList";

export default function SystemAdminNotificationsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-[18px] font-medium mb-0.5">Notifications</h1>
        <p className="text-[13px] text-[var(--color-text-secondary)]">
          Database health status reports, security audit reminders, and platform maintenance system alerts
        </p>
      </div>

      <Card>
        <NotificationList />
      </Card>
    </div>
  );
}
