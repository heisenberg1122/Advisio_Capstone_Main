"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Avatar } from "@/components/ui/Avatar";

// ─── TYPES & INTERFACES ──────────────────────────────────────────
interface AdviseeGroup {
  id: string;
  name: string;
  title: string;
  members: string[];
  currentChapter: string;
  progress: number;
  lastActive: string;
  status: "active" | "completed" | "delayed";
}

interface DocumentReview {
  id: string;
  groupName: string;
  fileName: string;
  submittedAt: string;
  status: "pending" | "reviewed" | "approved";
  commentsCount: number;
}

interface ConsultationSlot {
  id: string;
  date: string;
  timeRange: string;
  groupName?: string;
  status: "open" | "booked" | "completed";
}

interface ConsultationHistory {
  id: string;
  date: string;
  groupName: string;
  topic: string;
  duration: string;
  notes: string;
}

interface MilestoneRequest {
  id: string;
  groupName: string;
  milestone: string;
  submittedAt: string;
  status: "pending" | "approved" | "rejected";
}

interface NotificationItem {
  id: string;
  message: string;
  time: string;
  type: "info" | "success" | "warning" | "danger";
  read: boolean;
}

// ─── MOCK DATA ──────────────────────────────────────────────────
const initialGroups: AdviseeGroup[] = [
  { id: "g1", name: "Group Alpha", title: "AI-based Crop Yield Prediction System Using ML", members: ["Juan Reyes", "Maria Cruz", "Angelo Lim"], currentChapter: "Chapter 3 - Methodology", progress: 42, lastActive: "2 hours ago", status: "active" },
  { id: "g2", name: "Group Beta", title: "Smart Traffic Management System using IoT", members: ["Lando Vance", "Kaye Diaz"], currentChapter: "Chapter 5 - Conclusion", progress: 85, lastActive: "1 day ago", status: "active" },
  { id: "g3", name: "Group Gamma", title: "Blockchain-based Academic Credentials System", members: ["Santi Perez", "Gwen Robredo", "Mark Lim"], currentChapter: "Proposal Stage", progress: 15, lastActive: "3 days ago", status: "delayed" },
  { id: "g4", name: "Group Delta", title: "Automated Waste Sorting System using Computer Vision", members: ["Clara Gomez", "David Sy"], currentChapter: "Chapter 4 - Design", progress: 60, lastActive: "Just now", status: "active" },
];

const initialReviews: DocumentReview[] = [
  { id: "d1", groupName: "Group Alpha", fileName: "Chapter_3_Methodology_v2.pdf", submittedAt: "Jun 24, 2026", status: "pending", commentsCount: 5 },
  { id: "d2", groupName: "Group Delta", fileName: "Chapter_4_System_Architecture_v1.pdf", submittedAt: "Jun 23, 2026", status: "pending", commentsCount: 2 },
  { id: "d3", groupName: "Group Beta", fileName: "Full_Draft_Final_Revision.pdf", submittedAt: "Jun 20, 2026", status: "reviewed", commentsCount: 18 },
];

const initialSlots: ConsultationSlot[] = [
  { id: "s1", date: "June 26", timeRange: "10:00 AM – 11:30 AM", groupName: "Group Alpha", status: "booked" },
  { id: "s2", date: "June 26", timeRange: "02:00 PM – 03:30 PM", status: "open" },
  { id: "s3", date: "June 27", timeRange: "09:00 AM – 10:30 AM", groupName: "Group Delta", status: "booked" },
  { id: "s4", date: "June 27", timeRange: "11:00 AM – 12:30 PM", status: "open" },
];

const initialHistory: ConsultationHistory[] = [
  { id: "h1", date: "Jun 18, 2026", groupName: "Group Alpha", topic: "Chapter 3 Draft & Data Models", duration: "1 hr 15 min", notes: "Reviewed their crop dataset. Advised to focus on Random Forest and XGBoost benchmarks instead of standard SVM only." },
  { id: "h2", date: "Jun 15, 2026", groupName: "Group Beta", topic: "Chapter 4 Implementation Review", duration: "45 min", notes: "Discussed IoT dashboard mocks. Advised using SSE/WebSockets for live traffic updates instead of standard REST polling." },
  { id: "h3", date: "Jun 10, 2026", groupName: "Group Gamma", topic: "Proposal Revision Feedback", duration: "1 hr", notes: "Went over proposal presentation slides. Group needs to clarify their validation setup and smart contract gas usage limits." },
];

const initialMilestones: MilestoneRequest[] = [
  { id: "m1", groupName: "Group Alpha", milestone: "Chapter 2 - Literature Review Approval", submittedAt: "2 hours ago", status: "pending" },
  { id: "m2", groupName: "Group Delta", milestone: "Chapter 3 - Methodology Endorsement", submittedAt: "Yesterday", status: "pending" },
  { id: "m3", groupName: "Group Beta", milestone: "Pre-Defense Eligibility Recommendation", submittedAt: "3 days ago", status: "pending" },
];

const initialNotifications: NotificationItem[] = [
  { id: "n1", message: "Group Alpha uploaded a new file: Chapter_3_Methodology_v2.pdf", time: "2 hours ago", type: "info", read: false },
  { id: "n2", message: "Group Alpha requested a Milestone Approval for Chapter 2", time: "2 hours ago", type: "warning", read: false },
  { id: "n3", message: "Consultation booked by Group Delta for Jun 27, 9am", time: "Yesterday", type: "success", read: true },
  { id: "n4", message: "Group Gamma's progress marked Delayed: No active submissions for 14 days", time: "3 days ago", type: "danger", read: true },
];

export default function AdviserDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "advisees" | "milestones" | "reviews" | "consultations" | "conferencing">("overview");

  // State Management for Interactive Mock features
  const [groups, setGroups] = useState<AdviseeGroup[]>(initialGroups);
  const [reviews, setReviews] = useState<DocumentReview[]>(initialReviews);
  const [slots, setSlots] = useState<ConsultationSlot[]>(initialSlots);
  const [milestones, setMilestones] = useState<MilestoneRequest[]>(initialMilestones);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  
  // Custom states for interactive panels
  const [newSlotTime, setNewSlotTime] = useState("");
  const [newSlotDate, setNewSlotDate] = useState("");
  const [activeVideoGroup, setActiveVideoGroup] = useState<string>("Group Alpha");
  const [selectedReviewId, setSelectedReviewId] = useState<string>("d1");
  const [comments, setComments] = useState<{ id: string; user: string; text: string; time: string }[]>([
    { id: "c1", user: "Juan Reyes", text: "Dr. Lim, we adjusted the dataset sizing on Page 12 according to your notes.", time: "4 hours ago" },
    { id: "c2", user: "Dr. Rachel Lim", text: "Looks much better. What is the total test-split ratio?", time: "3 hours ago" },
    { id: "c3", user: "Juan Reyes", text: "We used an 80/20 train/test split. Added detail on Page 13.", time: "2 hours ago" },
  ]);
  const [newComment, setNewComment] = useState("");

  // Handler helpers for buttons (UI state changes only)
  const handleMilestoneAction = (id: string, newStatus: "approved" | "rejected") => {
    setMilestones(prev => prev.map(m => m.id === id ? { ...m, status: newStatus } : m));
    setNotifications(prev => [
      {
        id: Math.random().toString(),
        message: `You ${newStatus} the milestone request for ${milestones.find(m => m.id === id)?.groupName}`,
        time: "Just now",
        type: newStatus === "approved" ? "success" : "danger",
        read: false,
      },
      ...prev,
    ]);
  };

  const handleAddSlot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlotDate || !newSlotTime) return;
    const newSlot: ConsultationSlot = {
      id: Math.random().toString(),
      date: newSlotDate,
      timeRange: newSlotTime,
      status: "open",
    };
    setSlots(prev => [...prev, newSlot]);
    setNewSlotDate("");
    setNewSlotTime("");
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        user: "Dr. Rachel Lim (You)",
        text: newComment,
        time: "Just now",
      },
    ]);
    setNewComment("");
  };

  const handleClearNotifications = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  // Compute stats counters
  const activeAdviseesCount = groups.filter(g => g.status === "active").length;
  const pendingReviewsCount = reviews.filter(r => r.status === "pending").length;
  const bookedConsultationsCount = slots.filter(s => s.status === "booked").length;
  const pendingMilestonesCount = milestones.filter(m => m.status === "pending").length;

  return (
    <div className="flex flex-col gap-6">
      
      {/* ─── PAGE HEADER ─── */}
      <div className="flex justify-between items-center bg-[var(--color-background-secondary)] p-5 rounded-[var(--border-radius-lg)] border border-[var(--color-border-tertiary)] animate-fade-in-up">
        <div>
          <h1 className="text-[20px] font-semibold text-[var(--color-text-primary)]">Welcome back, Dr. Rachel Lim!</h1>
          <p className="text-[13px] text-[var(--color-text-secondary)] mt-1">
            Academic Adviser · College of Computer Studies · 4 Active Research Groups
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab("conferencing")} 
            className="flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium bg-[var(--color-background-info)] border border-[var(--color-border-info)] text-[var(--color-text-info)] rounded-[var(--border-radius-md)] hover:bg-opacity-80 transition cursor-pointer"
          >
            <i className="ti ti-video" /> Start Video Conf
          </button>
          <button 
            onClick={() => setActiveTab("consultations")} 
            className="flex items-center gap-2 px-3 py-1.5 text-[12px] font-medium bg-[var(--color-background-success)] border border-[var(--color-border-success)] text-[var(--color-text-success)] rounded-[var(--border-radius-md)] hover:bg-opacity-80 transition cursor-pointer"
          >
            <i className="ti ti-calendar" /> Manage Schedule
          </button>
        </div>
      </div>

      {/* ─── STATS CARDS ROW ─── */}
      <div className="grid grid-cols-4 gap-4">
        <div 
          onClick={() => setActiveTab("advisees")} 
          className="cursor-pointer transition-transform hover:-translate-y-0.5 bg-[var(--color-background-secondary)] p-4 rounded-[var(--border-radius-md)] border border-[var(--color-border-tertiary)]"
        >
          <div className="text-[11px] text-[var(--color-text-tertiary)] uppercase tracking-wider mb-1 font-semibold">Active Advisees</div>
          <div className="text-[24px] font-bold text-[var(--color-text-primary)]">{activeAdviseesCount} Groups</div>
          <div className="text-[11px] text-[var(--color-text-danger)] mt-1">1 group requires attention</div>
        </div>

        <div 
          onClick={() => setActiveTab("reviews")} 
          className="cursor-pointer transition-transform hover:-translate-y-0.5 bg-[var(--color-background-secondary)] p-4 rounded-[var(--border-radius-md)] border border-[var(--color-border-tertiary)]"
        >
          <div className="text-[11px] text-[var(--color-text-tertiary)] uppercase tracking-wider mb-1 font-semibold">Pending Reviews</div>
          <div className="text-[24px] font-bold text-[var(--color-text-primary)]">{pendingReviewsCount} Documents</div>
          <div className="text-[11px] text-[var(--color-text-info)] mt-1">Submitted in the last 48h</div>
        </div>

        <div 
          onClick={() => setActiveTab("consultations")} 
          className="cursor-pointer transition-transform hover:-translate-y-0.5 bg-[var(--color-background-secondary)] p-4 rounded-[var(--border-radius-md)] border border-[var(--color-border-tertiary)]"
        >
          <div className="text-[11px] text-[var(--color-text-tertiary)] uppercase tracking-wider mb-1 font-semibold">Today's Consultations</div>
          <div className="text-[24px] font-bold text-[var(--color-text-primary)]">{bookedConsultationsCount} Meetings</div>
          <div className="text-[11px] text-[var(--color-text-success)] mt-1">Next session starts in 1 hour</div>
        </div>

        <div 
          onClick={() => setActiveTab("milestones")} 
          className="cursor-pointer transition-transform hover:-translate-y-0.5 bg-[var(--color-background-secondary)] p-4 rounded-[var(--border-radius-md)] border border-[var(--color-border-tertiary)]"
        >
          <div className="text-[11px] text-[var(--color-text-tertiary)] uppercase tracking-wider mb-1 font-semibold">Milestone Actions</div>
          <div className="text-[24px] font-bold text-[var(--color-text-primary)]">{pendingMilestonesCount} Pending</div>
          <div className="text-[11px] text-[var(--color-text-warning)] mt-1">Requiring endorsement</div>
        </div>
      </div>

      {/* ─── TAB NAVIGATION ─── */}
      <div className="flex border-b border-[var(--color-border-tertiary)]">
        {(["overview", "advisees", "milestones", "reviews", "consultations", "conferencing"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-[13px] font-medium border-b-2 transition-colors capitalize cursor-pointer ${
              activeTab === tab
                ? "border-[var(--color-border-info)] text-[var(--color-text-info)]"
                : "border-transparent text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            }`}
          >
            {tab === "overview" && <i className="ti ti-chart-pie mr-1.5" />}
            {tab === "advisees" && <i className="ti ti-users mr-1.5" />}
            {tab === "milestones" && <i className="ti ti-git-pull-request mr-1.5" />}
            {tab === "reviews" && <i className="ti ti-file-text mr-1.5" />}
            {tab === "consultations" && <i className="ti ti-calendar-event mr-1.5" />}
            {tab === "conferencing" && <i className="ti ti-video mr-1.5" />}
            {tab === "conferencing" ? "Conferencing (Voice & Video)" : tab}
          </button>
        ))}
      </div>

      {/* ─── TAB CONTENT ─── */}
      <div className="animate-fade-in-up">
        
        {/* 1. OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-3 gap-6">
            {/* Left Col (2/3 width): Advisees Progress Overview & Pending Milestones */}
            <div className="col-span-2 flex flex-col gap-6">
              
              {/* Progress Monitoring */}
              <Card>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[14px] font-medium text-[var(--color-text-primary)]">Group Progress Monitoring</h3>
                  <button onClick={() => setActiveTab("advisees")} className="text-[11px] text-[var(--color-text-info)] hover:underline">
                    View All Advisees
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  {groups.map((g) => (
                    <div key={g.id} className="p-3 bg-[var(--color-background-tertiary)] rounded-[var(--border-radius-md)] border border-[var(--color-border-tertiary)]">
                      <div className="flex justify-between items-center mb-1.5">
                        <div>
                          <span className="font-semibold text-[13px]">{g.name}</span>
                          <span className="text-[11px] text-[var(--color-text-secondary)] ml-2 truncate max-w-[250px] inline-block align-bottom">
                            ({g.title})
                          </span>
                        </div>
                        <Tag variant={g.status === "delayed" ? "danger" : "info"}>
                          {g.currentChapter}
                        </Tag>
                      </div>
                      
                      {/* Progress Line */}
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-2 bg-[var(--color-border-tertiary)] rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all"
                            style={{ 
                              width: `${g.progress}%`,
                              background: g.status === "delayed" 
                                ? "linear-gradient(90deg, #ef4444, #f87171)" 
                                : "linear-gradient(90deg, #3b82f6, #4ade80)" 
                            }}
                          />
                        </div>
                        <span className="text-[11px] font-semibold w-8 text-right">{g.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Milestone Endorsements Panel */}
              <Card>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[14px] font-medium text-[var(--color-text-primary)]">Pending Milestones Approval</h3>
                  <button onClick={() => setActiveTab("milestones")} className="text-[11px] text-[var(--color-text-info)] hover:underline">
                    Manage Milestones
                  </button>
                </div>
                <div className="flex flex-col gap-3">
                  {milestones.filter(m => m.status === "pending").map((m) => (
                    <div key={m.id} className="flex justify-between items-center p-3 bg-[var(--color-background-tertiary)] rounded-[var(--border-radius-md)] border border-[var(--color-border-tertiary)]">
                      <div>
                        <div className="font-medium text-[13px]">{m.groupName}</div>
                        <div className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">{m.milestone}</div>
                        <div className="text-[10px] text-[var(--color-text-tertiary)] mt-0.5">Submitted {m.submittedAt}</div>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleMilestoneAction(m.id, "approved")}
                          className="px-2.5 py-1 text-[11px] font-medium bg-[var(--color-background-success)] text-[var(--color-text-success)] border border-[var(--color-border-success)] rounded-[var(--border-radius-md)] hover:bg-opacity-80 transition cursor-pointer"
                        >
                          <i className="ti ti-check mr-1" /> Endorse
                        </button>
                        <button 
                          onClick={() => handleMilestoneAction(m.id, "rejected")}
                          className="px-2.5 py-1 text-[11px] font-medium bg-[var(--color-background-danger)] text-[var(--color-text-danger)] border border-[var(--color-border-danger)] rounded-[var(--border-radius-md)] hover:bg-opacity-80 transition cursor-pointer"
                        >
                          <i className="ti ti-x mr-1" /> Request Changes
                        </button>
                      </div>
                    </div>
                  ))}
                  {milestones.filter(m => m.status === "pending").length === 0 && (
                    <div className="text-[12px] text-[var(--color-text-tertiary)] py-4 text-center">
                      No pending milestone approval requests.
                    </div>
                  )}
                </div>
              </Card>

            </div>

            {/* Right Col (1/3 width): Notification management & Recent Document Submissions */}
            <div className="flex flex-col gap-6">
              
              {/* Notification Management Panel */}
              <Card>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-[14px] font-medium text-[var(--color-text-primary)]">Notifications Panel</h3>
                  <button onClick={handleClearNotifications} className="text-[11px] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]">
                    Mark all read
                  </button>
                </div>
                <div className="flex flex-col gap-2.5 max-h-[300px] overflow-y-auto pr-1">
                  {notifications.map((n) => (
                    <div 
                      key={n.id} 
                      className={`p-2.5 rounded-[var(--border-radius-md)] border text-[12px] relative transition-opacity ${
                        n.read ? "opacity-60 bg-[var(--color-background-tertiary)] border-[var(--color-border-tertiary)]" : "bg-[var(--color-background-secondary)] border-l-[3px]"
                      }`}
                      style={{
                        borderLeftColor: !n.read 
                          ? n.type === "success" ? "var(--color-text-success)" 
                            : n.type === "danger" ? "var(--color-text-danger)"
                            : n.type === "warning" ? "var(--color-text-warning)" 
                            : "var(--color-text-info)" 
                          : undefined
                      }}
                    >
                      <div className="pr-4">{n.message}</div>
                      <div className="text-[10px] text-[var(--color-text-tertiary)] mt-1">{n.time}</div>
                      {!n.read && (
                        <div className="w-1.5 h-1.5 bg-[var(--color-text-info)] rounded-full absolute top-3 right-3" />
                      )}
                    </div>
                  ))}
                </div>
              </Card>

              {/* Consultation Schedules Mini-card */}
              <Card>
                <h3 className="text-[14px] font-medium text-[var(--color-text-primary)] mb-3">Today's Scheduled Meetings</h3>
                <div className="flex flex-col gap-2">
                  {slots.filter(s => s.status === "booked").slice(0, 2).map((s) => (
                    <div key={s.id} className="p-2.5 bg-[var(--color-background-tertiary)] rounded-[var(--border-radius-md)] border border-[var(--color-border-tertiary)] flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-[12px]">{s.groupName}</div>
                        <div className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">{s.timeRange}</div>
                      </div>
                      <button 
                        onClick={() => { setActiveVideoGroup(s.groupName || ""); setActiveTab("conferencing"); }}
                        className="px-2 py-1 text-[11px] font-medium bg-[var(--color-background-info)] border border-[var(--color-border-info)] text-[var(--color-text-info)] rounded-[var(--border-radius-md)] hover:bg-opacity-80 transition cursor-pointer"
                      >
                        Start Call
                      </button>
                    </div>
                  ))}
                </div>
              </Card>

            </div>
          </div>
        )}

        {/* 2. ADVISEES & PROGRESS TAB */}
        {activeTab === "advisees" && (
          <div className="flex flex-col gap-6">
            <Card>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-[15px] font-medium">Assigned Advisees Management</h3>
                  <p className="text-[12px] text-[var(--color-text-secondary)] mt-0.5">Monitor progress, view titles, and manage research milestones.</p>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium bg-[var(--color-background-secondary)] border border-[var(--color-border-secondary)] text-[var(--color-text-primary)] rounded-[var(--border-radius-md)] cursor-pointer">
                  <i className="ti ti-plus" /> Assign New Group
                </button>
              </div>

              {/* Advisees Table Grid */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-[13px]">
                  <thead>
                    <tr className="border-b border-[var(--color-border-tertiary)] text-[var(--color-text-tertiary)] uppercase tracking-wider text-[10px] font-semibold">
                      <th className="py-2.5 px-3">Group Name</th>
                      <th className="py-2.5 px-3">Research Title</th>
                      <th className="py-2.5 px-3">Members</th>
                      <th className="py-2.5 px-3">Current Milestone</th>
                      <th className="py-2.5 px-3">Progress</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groups.map((g) => (
                      <tr key={g.id} className="border-b border-[var(--color-border-tertiary)] hover:bg-[var(--color-background-secondary)] transition-colors">
                        <td className="py-3 px-3 font-semibold text-[var(--color-text-primary)]">{g.name}</td>
                        <td className="py-3 px-3 max-w-[240px] truncate text-[var(--color-text-secondary)]">{g.title}</td>
                        <td className="py-3 px-3">
                          <div className="flex gap-1.5">
                            {g.members.map((m, idx) => (
                              <div key={idx} className="group relative">
                                <Avatar initials={m.split(" ").map(w=>w[0]).join("")} colorVariant={g.status === "delayed" ? "danger" : "info"} size="sm" />
                                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 hidden group-hover:block bg-black text-white text-[10px] py-0.5 px-1.5 rounded whitespace-nowrap z-10">
                                  {m}
                                </span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <Tag variant={g.status === "delayed" ? "danger" : "info"}>{g.currentChapter}</Tag>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            <div className="w-20 h-1.5 bg-[var(--color-border-tertiary)] rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-blue-500 to-green-400" style={{ width: `${g.progress}%` }} />
                            </div>
                            <span className="font-semibold text-[11px]">{g.progress}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <div className="flex justify-end gap-1.5">
                            <button 
                              onClick={() => { setSelectedReviewId(g.id === "g1" ? "d1" : "d2"); setActiveTab("reviews"); }}
                              className="px-2 py-1 text-[11px] bg-[var(--color-background-secondary)] hover:bg-[var(--color-background-tertiary)] border border-[var(--color-border-secondary)] rounded cursor-pointer"
                            >
                              Docs
                            </button>
                            <button 
                              onClick={() => { setActiveVideoGroup(g.name); setActiveTab("conferencing"); }}
                              className="px-2 py-1 text-[11px] bg-[var(--color-background-info)] border border-[var(--color-border-info)] text-[var(--color-text-info)] rounded cursor-pointer"
                            >
                              Call
                            </button>
                            <button 
                              onClick={() => { setActiveTab("milestones"); }}
                              className="px-2 py-1 text-[11px] bg-[var(--color-background-warning)] border border-[var(--color-border-warning)] text-[var(--color-text-warning)] rounded cursor-pointer"
                            >
                              Milestones
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Quick Progress Monitoring Chart */}
            <div className="grid grid-cols-2 gap-6">
              <Card>
                <h4 className="text-[13px] font-medium mb-3">Milestone Progression Timeline (Average Completion)</h4>
                <div className="flex flex-col gap-3">
                  {[
                    { phase: "Proposal Stage", count: 1, percent: 25, color: "var(--color-text-danger)" },
                    { phase: "Chapter 1-3 Writing", count: 2, percent: 50, color: "var(--color-text-warning)" },
                    { phase: "Chapter 4-5 Review", count: 1, percent: 25, color: "var(--color-text-info)" },
                    { phase: "Ready for Defense", count: 0, percent: 0, color: "var(--color-text-success)" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                      <div className="flex justify-between text-[11px] text-[var(--color-text-secondary)]">
                        <span>{item.phase} ({item.count} groups)</span>
                        <span>{item.percent}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[var(--color-border-tertiary)] rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${item.percent}%`, backgroundColor: item.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h4 className="text-[13px] font-medium mb-3">Adviser Response Benchmarks</h4>
                <div className="flex flex-col gap-3 justify-center h-[120px] text-center">
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <div className="text-[20px] font-bold text-[var(--color-text-success)]">1.2 Days</div>
                      <div className="text-[10px] text-[var(--color-text-tertiary)] uppercase mt-0.5">Average Review Speed</div>
                    </div>
                    <div>
                      <div className="text-[20px] font-bold text-[var(--color-text-info)]">92%</div>
                      <div className="text-[10px] text-[var(--color-text-tertiary)] uppercase mt-0.5">Milestone Endorsed Rate</div>
                    </div>
                    <div>
                      <div className="text-[20px] font-bold text-[var(--color-text-warning)]">4.5 Hrs</div>
                      <div className="text-[10px] text-[var(--color-text-tertiary)] uppercase mt-0.5">Weekly Consulting Hours</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* 3. MILESTONES TAB */}
        {activeTab === "milestones" && (
          <div className="flex flex-col gap-6">
            <Card>
              <div className="mb-4">
                <h3 className="text-[15px] font-medium">Milestone Approval & Endorsements</h3>
                <p className="text-[12px] text-[var(--color-text-secondary)] mt-0.5">
                  Approve chapters or recommend groups for official defense panels.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {milestones.map((m) => (
                  <div key={m.id} className="p-4 bg-[var(--color-background-secondary)] rounded-[var(--border-radius-lg)] border border-[var(--color-border-tertiary)] flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-[var(--border-radius-md)] bg-[var(--color-background-info)] flex items-center justify-center text-[var(--color-text-info)]">
                        <i className="ti ti-git-pull-request text-lg" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-[14px] text-[var(--color-text-primary)]">{m.groupName}</span>
                          <span className="text-[11px] text-[var(--color-text-secondary)]">• Submitted {m.submittedAt}</span>
                        </div>
                        <div className="text-[13px] text-[var(--color-text-secondary)] mt-0.5">
                          Requesting approval for: <strong className="text-[var(--color-text-primary)]">{m.milestone}</strong>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {m.status === "pending" ? (
                        <>
                          <button 
                            onClick={() => handleMilestoneAction(m.id, "approved")}
                            className="px-3.5 py-1.5 text-[12px] font-medium bg-[var(--color-background-success)] text-[var(--color-text-success)] border border-[var(--color-border-success)] rounded-[var(--border-radius-md)] hover:bg-opacity-80 transition cursor-pointer"
                          >
                            <i className="ti ti-check mr-1" /> Approve & Endorse
                          </button>
                          <button 
                            onClick={() => handleMilestoneAction(m.id, "rejected")}
                            className="px-3.5 py-1.5 text-[12px] font-medium bg-[var(--color-background-danger)] text-[var(--color-text-danger)] border border-[var(--color-border-danger)] rounded-[var(--border-radius-md)] hover:bg-opacity-80 transition cursor-pointer"
                          >
                            <i className="ti ti-x mr-1" /> Send Revisions Request
                          </button>
                        </>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <i className={`ti ${m.status === "approved" ? "ti-circle-check-filled text-[var(--color-text-success)]" : "ti-circle-x-filled text-[var(--color-text-danger)]"}`} />
                          <span className={`text-[12px] font-semibold capitalize ${m.status === "approved" ? "text-[var(--color-text-success)]" : "text-[var(--color-text-danger)]"}`}>
                            {m.status === "approved" ? "Endorsed" : "Changes Requested"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* 4. DOCUMENT REVIEWS & COMMENTING */}
        {activeTab === "reviews" && (
          <div className="grid grid-cols-3 gap-6">
            
            {/* Left Col (1/3): Document submissions lists */}
            <div className="flex flex-col gap-4">
              <Card>
                <h4 className="text-[13px] font-semibold mb-3">Submitted Research Documents</h4>
                <div className="flex flex-col gap-2">
                  {reviews.map((r) => (
                    <div 
                      key={r.id} 
                      onClick={() => setSelectedReviewId(r.id)}
                      className={`p-3 rounded-[var(--border-radius-md)] border transition-all cursor-pointer ${
                        selectedReviewId === r.id 
                          ? "bg-[var(--color-background-info)] border-[var(--color-border-info)] text-[var(--color-text-primary)]" 
                          : "bg-[var(--color-background-tertiary)] border-[var(--color-border-tertiary)] hover:bg-[var(--color-background-secondary)]"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-semibold text-[12px]">{r.groupName}</span>
                        <Tag variant={r.status === "pending" ? "warn" : "success"}>
                          {r.status}
                        </Tag>
                      </div>
                      <div className="text-[11px] truncate text-[var(--color-text-secondary)]">{r.fileName}</div>
                      <div className="flex justify-between text-[10px] text-[var(--color-text-tertiary)] mt-2">
                        <span>{r.submittedAt}</span>
                        <span><i className="ti ti-messages" /> {r.commentsCount} Comments</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right Col (2/3): Document Viewer & Comment Thread Mock */}
            <div className="col-span-2 flex flex-col gap-4">
              <Card className="flex-1 flex flex-col p-0 overflow-hidden min-h-[480px]">
                {/* PDF Header bar */}
                <div className="flex justify-between items-center px-4 py-2.5 bg-[var(--color-background-secondary)] border-b border-[var(--color-border-tertiary)]">
                  <div>
                    <span className="font-semibold text-[13px] text-[var(--color-text-primary)]">
                      {reviews.find(r => r.id === selectedReviewId)?.fileName}
                    </span>
                    <span className="text-[11px] text-[var(--color-text-tertiary)] ml-2">
                      ({reviews.find(r => r.id === selectedReviewId)?.groupName})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="icon-btn" title="Zoom In"><i className="ti ti-zoom-in text-xs" /></button>
                    <button className="icon-btn" title="Zoom Out"><i className="ti ti-zoom-out text-xs" /></button>
                    <button className="icon-btn" title="Download"><i className="ti ti-download text-xs" /></button>
                  </div>
                </div>

                {/* PDF Split Screen content */}
                <div className="flex flex-1 overflow-hidden" style={{ height: "420px" }}>
                  
                  {/* Mock PDF Canvas Area */}
                  <div className="flex-1 bg-neutral-800 p-6 overflow-y-auto flex flex-col items-center justify-start gap-4">
                    
                    {/* Mock Page 1 */}
                    <div className="w-[320px] min-h-[380px] bg-white text-black p-6 rounded shadow relative text-[9px] leading-relaxed">
                      <div className="text-[12px] font-bold border-b pb-1 mb-2 text-center uppercase">Chapter 3 — Research Methodology</div>
                      <p className="mb-2">
                        <strong>3.1 Research Design</strong>
                        <br />
                        This study proposes a machine learning approach to crop yield forecasting. By integrating historical soil properties, local atmospheric data, and crop metrics, we evaluate predictive efficacy across multiple validation structures. 
                      </p>
                      
                      {/* Annotation Dot 1 */}
                      <div className="absolute top-[120px] left-[150px] w-5 h-5 rounded-full bg-red-500 bg-opacity-80 flex items-center justify-center text-[10px] text-white font-bold cursor-pointer hover:scale-115 transition-transform" title="Page Annotation #1">
                        1
                      </div>

                      <p className="mb-2">
                        <strong>3.2 Model Evaluation</strong>
                        <br />
                        We formulate predictions utilizing Extreme Gradient Boosting (XGBoost) and Random Forest configurations. Data splitting incorporates an 80/20 train-test ratio, with parameter tuning completed via grid search validation structures.
                      </p>

                      {/* Annotation Dot 2 */}
                      <div className="absolute top-[220px] left-[70px] w-5 h-5 rounded-full bg-red-500 bg-opacity-80 flex items-center justify-center text-[10px] text-white font-bold cursor-pointer hover:scale-115 transition-transform" title="Page Annotation #2">
                        2
                      </div>

                      <div className="border-t pt-2 mt-4 text-[7px] text-neutral-400 text-center">Page 12 of 24 · Advisio Secure Document Vault</div>
                    </div>
                  </div>

                  {/* Comments Side-Panel */}
                  <div className="w-[240px] border-l border-[var(--color-border-tertiary)] flex flex-col bg-[var(--color-background-primary)]">
                    <div className="p-3 border-b border-[var(--color-border-tertiary)] text-[12px] font-semibold">
                      Review Annotation Threads
                    </div>
                    
                    {/* Comments list */}
                    <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
                      {comments.map((c) => (
                        <div key={c.id} className="text-[11px] bg-[var(--color-background-secondary)] p-2.5 rounded-[var(--border-radius-md)] border border-[var(--color-border-tertiary)]">
                          <div className="flex justify-between items-center mb-1 text-[var(--color-text-secondary)]">
                            <span className="font-semibold text-[10px] truncate max-w-[120px]">{c.user}</span>
                            <span className="text-[9px] opacity-75">{c.time}</span>
                          </div>
                          <p className="text-[11.5px] leading-snug">{c.text}</p>
                        </div>
                      ))}
                    </div>

                    {/* New Comment Input box */}
                    <form onSubmit={handleAddComment} className="p-2 border-t border-[var(--color-border-tertiary)] bg-[var(--color-background-secondary)] flex gap-1">
                      <input 
                        type="text" 
                        value={newComment} 
                        onChange={(e) => setNewComment(e.target.value)} 
                        placeholder="Add review note..." 
                        className="flex-1 bg-[var(--color-background-tertiary)] border border-[var(--color-border-tertiary)] rounded px-2 py-1 text-[11px] text-[var(--color-text-primary)] focus:outline-none"
                      />
                      <button 
                        type="submit" 
                        className="px-2 py-1 bg-[var(--color-background-info)] border border-[var(--color-border-info)] text-[var(--color-text-info)] rounded hover:bg-opacity-80 transition cursor-pointer"
                      >
                        Send
                      </button>
                    </form>

                  </div>
                </div>

                {/* PDF Footer actions */}
                <div className="p-3 bg-[var(--color-background-secondary)] border-t border-[var(--color-border-tertiary)] flex justify-between">
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] bg-[var(--color-background-success)] text-[var(--color-text-success)] border border-[var(--color-border-success)] rounded hover:bg-opacity-80 transition cursor-pointer">
                      <i className="ti ti-circle-check" /> Approve Document
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] bg-[var(--color-background-danger)] text-[var(--color-text-danger)] border border-[var(--color-border-danger)] rounded hover:bg-opacity-80 transition cursor-pointer">
                      <i className="ti ti-circle-x" /> Request Changes
                    </button>
                  </div>
                  <button className="px-3 py-1.5 text-[11px] bg-[var(--color-background-tertiary)] border border-[var(--color-border-secondary)] rounded hover:bg-[var(--color-background-secondary)] cursor-pointer">
                    Export Annotations PDF
                  </button>
                </div>
              </Card>
            </div>

          </div>
        )}

        {/* 5. CONSULTATIONS (SCHEDULE & HISTORY) */}
        {activeTab === "consultations" && (
          <div className="grid grid-cols-3 gap-6">
            
            {/* Left Col (1/3): Schedule/Slot Management */}
            <div className="flex flex-col gap-6">
              
              {/* Add Consultation Slot */}
              <Card>
                <h4 className="text-[13px] font-semibold mb-3">Add Available Slot</h4>
                <form onSubmit={handleAddSlot} className="flex flex-col gap-3">
                  <div>
                    <label className="block text-[10px] text-[var(--color-text-tertiary)] uppercase font-semibold mb-1">Date</label>
                    <input 
                      type="text" 
                      placeholder="e.g. June 28" 
                      value={newSlotDate}
                      onChange={(e) => setNewSlotDate(e.target.value)}
                      className="w-full bg-[var(--color-background-tertiary)] border border-[var(--color-border-tertiary)] rounded p-2 text-[12px] text-[var(--color-text-primary)] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[var(--color-text-tertiary)] uppercase font-semibold mb-1">Time Range</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 01:00 PM – 02:30 PM" 
                      value={newSlotTime}
                      onChange={(e) => setNewSlotTime(e.target.value)}
                      className="w-full bg-[var(--color-background-tertiary)] border border-[var(--color-border-tertiary)] rounded p-2 text-[12px] text-[var(--color-text-primary)] focus:outline-none"
                    />
                  </div>
                  <button 
                    type="submit" 
                    className="w-full mt-2 py-2 text-[12px] font-semibold bg-[var(--color-background-info)] border border-[var(--color-border-info)] text-[var(--color-text-info)] rounded-[var(--border-radius-md)] hover:bg-opacity-80 transition cursor-pointer"
                  >
                    Publish Slot
                  </button>
                </form>
              </Card>

              {/* Consultation Slots List */}
              <Card>
                <h4 className="text-[13px] font-semibold mb-3">Consultation Schedule Slots</h4>
                <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto pr-1">
                  {slots.map((s) => (
                    <div key={s.id} className="p-2.5 bg-[var(--color-background-tertiary)] rounded-[var(--border-radius-md)] border border-[var(--color-border-tertiary)] flex justify-between items-center text-[12px]">
                      <div>
                        <div className="font-medium">{s.date}</div>
                        <div className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">{s.timeRange}</div>
                      </div>
                      <div>
                        {s.status === "booked" ? (
                          <div className="text-right">
                            <Tag variant="success">Booked</Tag>
                            <div className="text-[10px] text-[var(--color-text-secondary)] mt-1">{s.groupName}</div>
                          </div>
                        ) : (
                          <Tag variant="info">Available</Tag>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

            </div>

            {/* Right Col (2/3): Consultation History Records */}
            <div className="col-span-2 flex flex-col gap-6">
              <Card>
                <h3 className="text-[14px] font-medium mb-3">Consultation History Records</h3>
                <div className="flex flex-col gap-4">
                  {initialHistory.map((h) => (
                    <div key={h.id} className="p-4 bg-[var(--color-background-tertiary)] rounded-[var(--border-radius-lg)] border border-[var(--color-border-tertiary)]">
                      <div className="flex justify-between items-start border-b border-[var(--color-border-tertiary)] pb-2 mb-2">
                        <div>
                          <span className="font-semibold text-[14px]">{h.groupName}</span>
                          <span className="text-[12px] text-[var(--color-text-secondary)] ml-3">{h.topic}</span>
                        </div>
                        <div className="text-right text-[11px] text-[var(--color-text-tertiary)]">
                          <div>{h.date}</div>
                          <div className="mt-0.5">{h.duration}</div>
                        </div>
                      </div>
                      <p className="text-[12px] text-[var(--color-text-secondary)] italic leading-relaxed">
                        &ldquo;{h.notes}&rdquo;
                      </p>
                      <div className="flex justify-end gap-2 mt-3">
                        <button className="px-2.5 py-1 text-[11px] bg-[var(--color-background-secondary)] border border-[var(--color-border-secondary)] rounded hover:bg-[var(--color-background-tertiary)] cursor-pointer">
                          Edit Notes
                        </button>
                        <button className="px-2.5 py-1 text-[11px] bg-[var(--color-background-secondary)] border border-[var(--color-border-secondary)] rounded hover:bg-[var(--color-background-tertiary)] cursor-pointer">
                          View Documents Attached
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

          </div>
        )}

        {/* 6. CONFERENCING ROOM (VOICE & VIDEO) */}
        {activeTab === "conferencing" && (
          <div className="grid grid-cols-4 gap-6">
            
            {/* Left Col (3/4): Video Grid UI */}
            <div className="col-span-3 flex flex-col gap-4">
              <Card className="p-0 overflow-hidden bg-neutral-900 border-neutral-800 flex flex-col h-[480px]">
                
                {/* Conference Status Bar */}
                <div className="bg-neutral-950 px-4 py-2.5 border-b border-neutral-800 flex justify-between items-center text-[12px]">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                    <span className="font-bold text-neutral-200">LIVE: In-App Consultation Room</span>
                    <span className="text-neutral-500">|</span>
                    <span className="text-[var(--color-text-info)] font-semibold">{activeVideoGroup}</span>
                  </div>
                  <div className="text-neutral-400 font-mono">00:14:32</div>
                </div>

                {/* 2x2 Video Streams Grid Mockup */}
                <div className="flex-1 p-4 grid grid-cols-2 gap-3 bg-neutral-950">
                  
                  {/* Local Stream (Adviser) */}
                  <div className="bg-neutral-800 rounded-[var(--border-radius-lg)] overflow-hidden relative border-2 border-[var(--color-border-info)] flex items-center justify-center">
                    {/* User Avatar Placeholder */}
                    <div className="text-center">
                      <Avatar initials="RL" colorVariant="info" size="lg" />
                      <div className="text-[12px] text-neutral-300 mt-2 font-semibold">Dr. Rachel Lim (You)</div>
                    </div>
                    {/* Micro indicators */}
                    <div className="absolute bottom-2.5 left-2.5 bg-black bg-opacity-65 px-2 py-0.5 rounded text-[10px] text-neutral-200 flex items-center gap-1.5">
                      <i className="ti ti-microphone text-green-400" /> Speaking
                    </div>
                  </div>

                  {/* Advisee Stream 1 */}
                  <div className="bg-neutral-800 rounded-[var(--border-radius-lg)] overflow-hidden relative border border-neutral-700 flex items-center justify-center">
                    <div className="text-center">
                      <Avatar initials="JR" colorVariant="success" size="lg" />
                      <div className="text-[12px] text-neutral-300 mt-2 font-semibold">Juan Reyes</div>
                    </div>
                    <div className="absolute bottom-2.5 left-2.5 bg-black bg-opacity-65 px-2 py-0.5 rounded text-[10px] text-neutral-200 flex items-center gap-1.5">
                      <i className="ti ti-microphone text-green-400" /> Active
                    </div>
                  </div>

                  {/* Advisee Stream 2 */}
                  <div className="bg-neutral-800 rounded-[var(--border-radius-lg)] overflow-hidden relative border border-neutral-700 flex items-center justify-center">
                    <div className="text-center">
                      <Avatar initials="MC" colorVariant="warning" size="lg" />
                      <div className="text-[12px] text-neutral-300 mt-2 font-semibold">Maria Cruz</div>
                    </div>
                    <div className="absolute bottom-2.5 left-2.5 bg-black bg-opacity-65 px-2 py-0.5 rounded text-[10px] text-neutral-200 flex items-center gap-1.5">
                      <i className="ti ti-microphone-off text-red-400" /> Muted
                    </div>
                  </div>

                  {/* Advisee Stream 3 */}
                  <div className="bg-neutral-800 rounded-[var(--border-radius-lg)] overflow-hidden relative border border-neutral-700 flex items-center justify-center">
                    <div className="text-center">
                      <Avatar initials="AL" colorVariant="info" size="lg" />
                      <div className="text-[12px] text-neutral-300 mt-2 font-semibold">Angelo Lim</div>
                    </div>
                    <div className="absolute bottom-2.5 left-2.5 bg-black bg-opacity-65 px-2 py-0.5 rounded text-[10px] text-neutral-200 flex items-center gap-1.5">
                      <i className="ti ti-microphone text-green-400" /> Active
                    </div>
                  </div>

                </div>

                {/* Control Panel Bar */}
                <div className="bg-neutral-950 p-4 border-t border-neutral-800 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <button className="w-10 h-10 rounded-full bg-neutral-800 text-white flex items-center justify-center hover:bg-neutral-700 transition cursor-pointer" title="Toggle Mic">
                      <i className="ti ti-microphone text-base" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-neutral-800 text-white flex items-center justify-center hover:bg-neutral-700 transition cursor-pointer" title="Toggle Camera">
                      <i className="ti ti-video text-base" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-neutral-800 text-white flex items-center justify-center hover:bg-neutral-700 transition cursor-pointer" title="Share Screen">
                      <i className="ti ti-screen-share text-base" />
                    </button>
                    <button className="w-10 h-10 rounded-full bg-neutral-800 text-white flex items-center justify-center hover:bg-neutral-700 transition cursor-pointer" title="Record Session">
                      <i className="ti ti-record-mail text-base" />
                    </button>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 rounded-[var(--border-radius-md)] text-[12px] font-medium cursor-pointer">
                      <i className="ti ti-settings" /> Device Setup
                    </button>
                    <button 
                      onClick={() => setActiveVideoGroup("")}
                      className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-[var(--border-radius-md)] text-[12px] font-bold cursor-pointer"
                    >
                      <i className="ti ti-phone-off" /> Hang Up
                    </button>
                  </div>
                </div>

              </Card>
            </div>

            {/* Right Col (1/4): Group Call Selection & Invite options */}
            <div className="flex flex-col gap-4">
              <Card>
                <h4 className="text-[13px] font-semibold mb-3">Active Consult Call Room</h4>
                <div className="flex flex-col gap-3">
                  <div>
                    <label className="block text-[10px] text-[var(--color-text-tertiary)] uppercase font-semibold mb-1">Select Group to Dial</label>
                    <select 
                      value={activeVideoGroup} 
                      onChange={(e) => setActiveVideoGroup(e.target.value)}
                      className="w-full bg-[var(--color-background-tertiary)] border border-[var(--color-border-tertiary)] rounded p-2 text-[12px] text-[var(--color-text-primary)] focus:outline-none"
                    >
                      <option value="Group Alpha">Group Alpha (Crop Forecast)</option>
                      <option value="Group Beta">Group Beta (Smart Traffic)</option>
                      <option value="Group Gamma">Group Gamma (Blockchain Academics)</option>
                      <option value="Group Delta">Group Delta (Automated Waste)</option>
                    </select>
                  </div>

                  <button className="w-full py-2 text-[12px] font-semibold bg-[var(--color-background-info)] border border-[var(--color-border-info)] text-[var(--color-text-info)] rounded-[var(--border-radius-md)] hover:bg-opacity-80 transition cursor-pointer">
                    <i className="ti ti-bell-ringing mr-1.5" /> Ring Group Members
                  </button>

                  <div className="border-t border-[var(--color-border-tertiary)] pt-3 mt-1">
                    <h5 className="text-[11px] font-semibold text-[var(--color-text-secondary)] mb-2 uppercase">Conferencing Notes</h5>
                    <ul className="text-[11.5px] text-[var(--color-text-secondary)] space-y-1.5 list-disc pl-4">
                      <li>Voice/Video is fully encrypted end-to-end.</li>
                      <li>Consultation automatically logs to history upon hang up.</li>
                      <li>Attaching research document drafts is supported during call.</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
