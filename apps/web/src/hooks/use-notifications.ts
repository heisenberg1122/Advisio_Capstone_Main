"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "success" | "info" | "warning" | "danger";
  module?: "Documents" | "Consultation" | "Defense" | "Milestones" | "Announcements";
  link?: string;
}

const DEFAULT_NOTIFICATIONS: Record<string, AppNotification[]> = {
  student: [
    {
      id: "stud-n1",
      title: "Outline Approved",
      message: "Dr. Rachel Lim approved your Capstone Outline draft version v1.0.",
      time: "2 hours ago",
      read: false,
      type: "success",
      module: "Documents",
      link: "/student/submissions",
    },
    {
      id: "stud-n2",
      title: "Consultation Confirmed",
      message: "Your consultation request with Dr. Rachel Lim for July 3 at 10:00 AM has been accepted.",
      time: "Yesterday",
      read: false,
      type: "info",
      module: "Consultation",
      link: "/student/consultations",
    },
    {
      id: "stud-n3",
      title: "Pending Milestone Upload",
      message: "Reminder: Upload your signed endorsement letter draft before the June 28 deadline.",
      time: "June 24, 2026",
      read: true,
      type: "warning",
      module: "Milestones",
      link: "/student/dashboard?tab=milestones",
    },
    {
      id: "stud-n4",
      title: "Ethics Review Scheduled",
      message: "Dean's Office has scheduled the Institutional Ethics Clearance Reviews starting July 15.",
      time: "June 22, 2026",
      read: true,
      type: "info",
      module: "Announcements",
      link: "/student/dashboard",
    },
  ],
  adviser: [
    {
      id: "adv-n1",
      title: "New Draft Submission",
      message: "Juan Reyes uploaded Chapter 1-3 Review Draft v2.1 for Group AI-CCS-01.",
      time: "1 hour ago",
      read: false,
      type: "info",
      module: "Documents",
      link: "/adviser/dashboard?tab=reviews",
    },
    {
      id: "adv-n2",
      title: "Consultation Request",
      message: "Lando Vance requested a video consultation appointment for July 5 at 2:00 PM.",
      time: "4 hours ago",
      read: false,
      type: "info",
      module: "Consultation",
      link: "/adviser/dashboard?tab=consultations",
    },
    {
      id: "adv-n3",
      title: "Defense Recommendation Needed",
      message: "System request: Submit defense readiness recommendation sheet for Group IoT-IT-03.",
      time: "Yesterday",
      read: true,
      type: "warning",
      module: "Defense",
      link: "/adviser/dashboard?tab=approvals",
    },
  ],
  professor: [
    {
      id: "prof-n1",
      title: "Milestone Progression Update",
      message: "Group AI Crop Yield ML has reached 40% overall capstone milestone progress.",
      time: "3 hours ago",
      read: false,
      type: "info",
      module: "Milestones",
      link: "/professor/dashboard?tab=monitoring",
    },
    {
      id: "prof-n2",
      title: "Pending Draft Review",
      message: "Student Marc Santos uploaded Chapter 1-3 outline for research methodology validation.",
      time: "June 27, 2026",
      read: false,
      type: "info",
      module: "Documents",
      link: "/professor/dashboard?tab=monitoring",
    },
    {
      id: "prof-n3",
      title: "Faculty Board Assembly",
      message: "CCS Department Board meeting scheduled for research guidelines updates on June 30.",
      time: "June 25, 2026",
      read: true,
      type: "info",
      module: "Announcements",
      link: "/professor/dashboard",
    },
  ],
  panelist: [
    {
      id: "pan-n1",
      title: "Defense Invitation",
      message: "You have been assigned as Panel Chair for Group Smart Traffic System Proposal Defense.",
      time: "Yesterday",
      read: false,
      type: "warning",
      module: "Defense",
      link: "/panelist/dashboard?tab=schedule",
    },
    {
      id: "pan-n2",
      title: "Thesis Available for Review",
      message: "Submitted capstone thesis draft for group Crop Yield ML has been released for panel scoring.",
      time: "June 26, 2026",
      read: false,
      type: "info",
      module: "Documents",
      link: "/panelist/dashboard?tab=documents",
    },
    {
      id: "pan-n3",
      title: "Grading Template Verified",
      message: "System confirmation: Panel evaluation rubric verified by Administrative Dean.",
      time: "June 24, 2026",
      read: true,
      type: "success",
      module: "Defense",
      link: "/panelist/dashboard?tab=evaluation",
    },
  ],
  admin: [
    {
      id: "adm-n1",
      title: "Pending Account Registration",
      message: "New student account registration requested for account 'pending@university.edu.ph'.",
      time: "2 hours ago",
      read: false,
      type: "warning",
      module: "Announcements",
      link: "/admin/dashboard?tab=users",
    },
    {
      id: "adm-n2",
      title: "Outline Logs Validated",
      message: "Dean's office successfully approved outline submission verification logs for AY 2025-2026.",
      time: "June 26, 2026",
      read: true,
      type: "success",
      module: "Documents",
      link: "/admin/dashboard?tab=repository",
    },
    {
      id: "adm-n3",
      title: "Defense Calendar Conflict Resolved",
      message: "Automated schedule validation checks finished with zero system resource allocation collisions.",
      time: "June 25, 2026",
      read: true,
      type: "success",
      module: "Defense",
      link: "/admin/dashboard?tab=defense",
    },
  ],
  system_admin: [
    {
      id: "sys-n1",
      title: "Database Backup Success",
      message: "Database transaction logs backup and validation process completed successfully in backup vault.",
      time: "1 hour ago",
      read: false,
      type: "success",
      module: "Announcements",
      link: "/system-admin/dashboard?tab=maintenance",
    },
    {
      id: "sys-n2",
      title: "Replication Threshold Reached",
      message: "Warning: Platform storage replication threshold exceeded 75% capacity limit in Sector D.",
      time: "Yesterday",
      read: false,
      type: "warning",
      module: "Announcements",
      link: "/system-admin/dashboard?tab=maintenance",
    },
    {
      id: "sys-n3",
      title: "Role Security Audit Complete",
      message: "Bi-weekly system security roles and permission matrix inspection logs archived successfully.",
      time: "June 24, 2026",
      read: true,
      type: "info",
      module: "Announcements",
      link: "/system-admin/dashboard?tab=roles",
    },
  ],
};

export function useNotifications() {
  const pathname = usePathname() || "";
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [loading, setLoading] = useState(true);

  // Determine active role from pathname
  let role = "student";
  if (pathname.includes("/system-admin")) {
    role = "system_admin";
  } else if (pathname.includes("/admin")) {
    role = "admin";
  } else if (pathname.includes("/adviser")) {
    role = "adviser";
  } else if (pathname.includes("/professor")) {
    role = "professor";
  } else if (pathname.includes("/panelist")) {
    role = "panelist";
  }

  // Load notifications helper
  const loadNotifications = () => {
    const key = `advisio_notifications_${role}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        setNotifications(JSON.parse(saved));
      } catch {
        setNotifications(DEFAULT_NOTIFICATIONS[role] || []);
      }
    } else {
      const defaults = DEFAULT_NOTIFICATIONS[role] || [];
      localStorage.setItem(key, JSON.stringify(defaults));
      setNotifications(defaults);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      loadNotifications();
      setLoading(false);

      // Listen for notifications-updated events
      const handleUpdate = () => {
        loadNotifications();
      };
      window.addEventListener("notifications-updated", handleUpdate);
      return () => {
        window.removeEventListener("notifications-updated", handleUpdate);
      };
    }
  }, [role]);

  const saveNotifications = (updatedList: AppNotification[]) => {
    const key = `advisio_notifications_${role}`;
    localStorage.setItem(key, JSON.stringify(updatedList));
    setNotifications(updatedList);
    // Notify other hook instances (like topbars)
    window.dispatchEvent(new Event("notifications-updated"));
  };

  const markAsRead = (id: string) => {
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    saveNotifications(updated);
  };

  const markAllAsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    saveNotifications(updated);
  };

  const deleteNotification = (id: string) => {
    const updated = notifications.filter((n) => n.id !== id);
    saveNotifications(updated);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return {
    notifications,
    unreadCount,
    loading,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  };
}
