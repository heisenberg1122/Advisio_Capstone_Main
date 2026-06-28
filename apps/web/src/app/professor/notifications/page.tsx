"use client";

import { Card } from "@/components/ui/Card";
import { NotificationList } from "@/components/notifications/NotificationList";

export default function ProfessorNotificationsPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-[18px] font-medium mb-0.5">Notifications</h1>
        <p className="text-[13px] text-[var(--color-text-secondary)]">
          Progression thresholds, student uploads, and academic guidelines alerts
        </p>
      </div>

      <Card>
        <NotificationList />
      </Card>
    </div>
  );
}
