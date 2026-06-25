/**
 * Mock data layer — mirrors the student_dashboard.html reference.
 * Replace these with tRPC/Hono API calls when the backend is ready.
 * Each export matches the shape of the domain types in src/types/student.ts
 */

import type { StudentDashboardData } from "@/types/student";

export const studentMockData: StudentDashboardData = {
  overview: {
    profile: {
      id: "student-001",
      name: "Juan Reyes",
      initials: "JR",
      role: "student",
      academicYear: "AY 2025–2026",
      program: "Capstone",
      college: "BSCS",
    },
    progress: {
      currentPhase: "chapter_3",
      currentChapterTitle: "Chapter 3 — Methodology",
      completionPercent: 42,
      phases: [
        { phase: "proposal",  label: "Proposal",  status: "done" },
        { phase: "chapter_1", label: "Chapter 1", status: "done" },
        { phase: "chapter_2", label: "Chapter 2", status: "done" },
        { phase: "chapter_3", label: "Chapter 3", status: "current" },
        { phase: "chapter_4", label: "Chapter 4", status: "upcoming" },
        { phase: "chapter_5", label: "Chapter 5", status: "upcoming" },
        { phase: "defense",   label: "Defense",   status: "upcoming" },
      ],
    },
    stats: {
      submissions: 7,
      submissionsPendingReview: 2,
      consultations: 4,
      consultationsUpcoming: 1,
      tasksLeft: 3,
      tasksDueThisWeek: 3,
      defenseEligibility: "not_eligible",
    },
    pendingTasks: [
      { id: "t1", name: "Submit Chapter 3 draft",          dueDate: "Jun 25", status: "pending", urgency: "danger" },
      { id: "t2", name: "Upload signed endorsement letter", dueDate: "Jun 28", status: "pending", urgency: "warn" },
      { id: "t3", name: "Submit proposal draft",            dueDate: "Done",   status: "done",    urgency: "success" },
    ],
    upcomingEvents: [
      { id: "e1", name: "Chapter 3 submission deadline",  from: "Set by Prof. Santos", date: "Jun 25",      color: "danger" },
      { id: "e2", name: "Consultation with Dr. Lim",      from: "Adviser",            date: "Jun 27, 2pm", color: "info" },
      { id: "e3", name: "Pre-defense document check",     from: "Set by Dean",        date: "Jul 10",      color: "warning" },
    ],
    recentNotifications: [
      { id: "n1", text: "Adviser Dr. Lim approved your Chapter 2", time: "2 hours ago", type: "success" },
      { id: "n2", text: "Consultation confirmed for Jun 27 at 2pm", time: "Yesterday",  type: "info" },
      { id: "n3", text: "New task assigned: upload endorsement letter", time: "Jun 21", type: "warning" },
    ],
    recentSubmissions: [
      { id: "s1", name: "Chapter 2 — Literature Review v3", submittedAt: "Jun 20", status: "approved", reviewer: "Dr. Lim" },
      { id: "s2", name: "Endorsement letter",               submittedAt: "Jun 18", status: "pending"  },
      { id: "s3", name: "Chapter 1 — Introduction v2",      submittedAt: "Jun 10", status: "approved", reviewer: "Dr. Lim" },
    ],
  },

  group: {
    id: "grp-001",
    name: "Group Alpha — Capstone 2025",
    researchTitle: "AI-based Crop Yield Prediction System Using Machine Learning",
    status: "active",
    members: [
      { id: "m1", name: "Juan Reyes",  initials: "JR", role: "leader", colorVariant: "info",    isYou: true },
      { id: "m2", name: "Maria Cruz",  initials: "MC", role: "member", colorVariant: "success" },
      { id: "m3", name: "Angelo Lim",  initials: "AL", role: "member", colorVariant: "warning" },
    ],
  },

  assignedAdviser: {
    id: "adv-001",
    name: "Dr. Rachel Lim",
    initials: "DL",
    college: "College of Computer Studies",
    adviseeCount: 5,
    adviseeMax: 8,
    avgResponseDays: 1.2,
    isAssigned: true,
    isFull: false,
    colorVariant: "info",
  },

  availableAdvisers: [
    {
      id: "adv-002",
      name: "Prof. Carlo Santos",
      initials: "PS",
      college: "Computer Science",
      adviseeCount: 8,
      adviseeMax: 8,
      avgResponseDays: 2.1,
      isAssigned: false,
      isFull: true,
      colorVariant: "warning",
    },
    {
      id: "adv-003",
      name: "Dr. Maya Aquino",
      initials: "MA",
      college: "Information Technology",
      adviseeCount: 3,
      adviseeMax: 8,
      avgResponseDays: 0.8,
      isAssigned: false,
      isFull: false,
      colorVariant: "success",
    },
  ],

  submissions: [
    { id: "s1", name: "Chapter 2 — Literature Review v3", submittedAt: "Jun 20", status: "approved", reviewer: "Dr. Lim" },
    { id: "s2", name: "Endorsement letter",               submittedAt: "Jun 18", status: "pending"  },
    { id: "s3", name: "Chapter 1 — Introduction v2",      submittedAt: "Jun 10", status: "approved", reviewer: "Dr. Lim" },
    { id: "s4", name: "Chapter 1 — Introduction v1",      submittedAt: "May 28", status: "revision"  },
  ],

  consultations: [
    { id: "c1", title: "Chapter 2 review session",      date: "Jun 15", timeRange: "10:00 AM – 11:00 AM", adviser: "Dr. Lim", duration: "1 hr",  status: "done" },
    { id: "c2", title: "Chapter 1 revision walkthrough", date: "May 30", timeRange: "2:00 PM – 2:45 PM",   adviser: "Dr. Lim", duration: "45 min", status: "done" },
    { id: "c3", title: "Chapter 3 progress check",      date: "Jun 27", timeRange: "2:00 PM – 3:00 PM",   adviser: "Dr. Lim", duration: "1 hr",  status: "confirmed" },
  ],

  nextConsultation: {
    id: "c3",
    title: "Chapter 3 progress check",
    date: "Jun 27, 2025",
    timeRange: "2:00 PM — 3:00 PM",
    adviser: "Dr. Lim",
    duration: "1 hr",
    status: "confirmed",
  },

  defenseRequirements: [
    { id: "dr1", label: "Chapter 1 approved",             status: "done" },
    { id: "dr2", label: "Chapter 2 approved",             status: "done" },
    { id: "dr3", label: "Chapter 3 approved",             status: "in_progress" },
    { id: "dr4", label: "Endorsement letter signed",      status: "pending" },
    { id: "dr5", label: "Adviser defense recommendation", status: "pending" },
    { id: "dr6", label: "Plagiarism check passed",        status: "pending" },
  ],

  defenseEligibility: "not_eligible",

  grades: {
    finalGrade: null,
    gpa: null,
    status: "pending",
    panelistScores: [],
  },

  notifications: [
    { id: "n1", text: "Dr. Lim approved your Chapter 2 submission",            time: "2 hours ago", type: "success" },
    { id: "n2", text: "Consultation confirmed for Jun 27 at 2pm",              time: "Yesterday",   type: "info" },
    { id: "n3", text: "New task: upload signed endorsement letter (due Jun 28)", time: "Jun 21",    type: "warning" },
    { id: "n4", text: "Dr. Lim accepted your advising application",             time: "Jun 15",    type: "info" },
  ],
};
