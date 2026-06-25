"use client";

import { useNotifications } from "@/hooks/use-student";
import { Card } from "@/components/ui/Card";
import { NotificationList } from "@/components/notifications/NotificationList";
import { NotificationSkeleton } from "@/components/notifications/NotificationSkeleton";

export default function NotificationsPage() {
  const { data: notifications, isPending } = useNotifications();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-[18px] font-medium mb-0.5">Notifications</h1>
        <p className="text-[13px] text-[var(--color-text-secondary)]">
          All alerts and updates
        </p>
      </div>

      <Card>
        {isPending ? (
          <NotificationSkeleton />
        ) : (
          <NotificationList notifications={notifications ?? []} />
        )}
      </Card>
    </div>
  );
}
