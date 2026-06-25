"use client";

import { cn } from "@/lib/utils";
import type { Notification, NotificationType } from "@/types/student";

const iconMap: Record<NotificationType, { icon: string; bg: string; color: string }> = {
  success: { icon: "ti-check",          bg: "var(--color-background-success)", color: "var(--color-text-success)" },
  info:    { icon: "ti-user-check",     bg: "var(--color-background-info)",    color: "var(--color-text-info)"    },
  warning: { icon: "ti-alert-triangle", bg: "var(--color-background-warning)", color: "var(--color-text-warning)" },
  danger:  { icon: "ti-alert-circle",   bg: "var(--color-background-danger)",  color: "var(--color-text-danger)"  },
};

interface NotificationListProps {
  notifications: Notification[];
}

export function NotificationList({ notifications }: NotificationListProps) {
  if (notifications.length === 0) {
    return (
      <div className="empty">
        <i className="ti ti-bell-off text-2xl block mb-2" aria-hidden="true" />
        No notifications yet
      </div>
    );
  }

  return (
    <>
      {notifications.map((n, i) => {
        const { icon, bg, color } = iconMap[n.type];
        return (
          <div
            key={n.id}
            className={cn(
              "flex items-start gap-[10px] py-2",
              i < notifications.length - 1 &&
                "border-b border-[var(--color-border-tertiary)]"
            )}
          >
            <div
              className="w-[30px] h-[30px] rounded-full flex items-center justify-center flex-shrink-0 text-sm"
              style={{ background: bg }}
              aria-hidden="true"
            >
              <i className={`ti ${icon}`} style={{ color }} />
            </div>
            <div className="flex-1">
              <div className="text-[13px] leading-snug">{n.text}</div>
              <div className="text-[11px] text-[var(--color-text-tertiary)] mt-0.5">
                {n.time}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
