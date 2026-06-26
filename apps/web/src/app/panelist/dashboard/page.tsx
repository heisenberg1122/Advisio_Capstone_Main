"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardLink } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";

// ─── TYPES & DATA STRUCTURES ────────────────────────────────────
interface PanelistNotification {
  id: string;
  text: string;
  time: string;
  type: "info" | "success" | "warning";
  read: boolean;
}

interface DefenseSession {
  id: string;
  groupName: string;
  title: string;
  type: "Proposal" | "Pre-Defense" | "Final Defense";
  date: string;
  time: string;
  room: string;
  adviser: string;
  documentName: string;
  similarity: number;
  status: "pending" | "graded";
}

interface GradeRecord {
  id: string;
  groupName: string;
  title: string;
  type: string;
  score: number;
  recommendation: "Passed" | "Passed with Revisions" | "Reexamined";
  gradedOn: string;
}

export default function PanelistDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "schedule" | "documents" | "scoring" | "history">("overview");

  // ─── PANEL SYSTEM STATE ─────────────────────────────────────────
  const [notifications, setNotifications] = useState<PanelistNotification[]>([
    { id: "n1", text: "Group Alpha uploaded Chapter 3 Methodology draft v3", time: "1 hour ago", type: "info", read: false },
    { id: "n2", text: "Coordinator updated scheduling for Group Delta defense session", time: "3 hours ago", type: "warning", read: false },
    { id: "n3", text: "Grade submission receipt confirmed for Group Beta pre-defense", time: "Yesterday", type: "success", read: true },
    { id: "n4", text: "Group Gamma similarity check flagged: 28% matches found", time: "2 days ago", type: "warning", read: true }
  ]);

  const [sessions, setSessions] = useState<DefenseSession[]>([
    { id: "s1", groupName: "Group Alpha", title: "AI-based Crop Yield Prediction System Using ML", type: "Pre-Defense", date: "June 29, 2026", time: "09:00 AM", room: "CS Lab 3 / Zoom", adviser: "Dr. Rachel Lim", documentName: "Group_Alpha_PreDefense_Draft.pdf", similarity: 12, status: "pending" },
    { id: "s2", groupName: "Group Delta", title: "Automated Waste Sorting System using Computer Vision", type: "Proposal", date: "June 30, 2026", time: "01:00 PM", room: "CCS Room 402", adviser: "Prof. Arthur Pendelton", documentName: "Group_Delta_Proposal_Paper.pdf", similarity: 14, status: "pending" },
  ]);

  const [history, setHistory] = useState<GradeRecord[]>([
    { id: "h1", groupName: "Group Beta", title: "Smart Traffic Management System using IoT", type: "Pre-Defense", score: 92, recommendation: "Passed with Revisions", gradedOn: "June 25, 2026" },
    { id: "h2", groupName: "Group Gamma", title: "Blockchain-based Academic Credentials System", type: "Proposal", score: 72, recommendation: "Reexamined", gradedOn: "June 20, 2026" },
  ]);

  // ─── SCORING FORM STATE ─────────────────────────────────────────
  const [selectedSessionId, setSelectedSessionId] = useState<string>("s1");
  const currentSession = sessions.find(s => s.id === selectedSessionId) || sessions[0];

  // Rubric Scores
  const [scoreConcept, setScoreConcept] = useState<number>(85);
  const [scoreMethodology, setScoreMethodology] = useState<number>(80);
  const [scoreSystemDesign, setScoreSystemDesign] = useState<number>(90);
  const [scorePresentation, setScorePresentation] = useState<number>(85);
  const [comments, setComments] = useState<string>("");
  const [recommendation, setRecommendation] = useState<"Passed" | "Passed with Revisions" | "Reexamined">("Passed with Revisions");

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Grade Submission Action
  const submitEvaluation = (e: React.FormEvent) => {
    e.preventDefault();

    // Compute average score
    const avgScore = Math.round((scoreConcept + scoreMethodology + scoreSystemDesign + scorePresentation) / 4);

    const newRecord: GradeRecord = {
      id: "hist-" + Date.now(),
      groupName: currentSession.groupName,
      title: currentSession.title,
      type: currentSession.type,
      score: avgScore,
      recommendation: recommendation,
      gradedOn: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    };

    // Update States
    setHistory(prev => [newRecord, ...prev]);
    setSessions(prev => prev.filter(s => s.id !== currentSession.id));
    triggerToast(`Evaluation submitted successfully! Grade: ${avgScore}% | ${recommendation}`);

    // Reset scoring page entries
    setScoreConcept(85);
    setScoreMethodology(80);
    setScoreSystemDesign(90);
    setScorePresentation(85);
    setComments("");
    setRecommendation("Passed with Revisions");

    // Automatically redirect back to schedule or history
    setActiveTab("history");
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    triggerToast("All notifications marked as read.");
  };

  const toggleReadNotification = (id: string) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: !n.read } : n)));
  };

  return (
    <div className="flex flex-col gap-6 relative">

      {/* Toast Alert banner */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 bg-[var(--color-background-info)] border border-[var(--color-border-info)] text-[var(--color-text-info)] px-4 py-2.5 rounded-[var(--border-radius-md)] flex items-center gap-2 shadow-lg text-xs">
          <i className="ti ti-info-circle" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ─── PAGE HEADER & PANEL PROFILE ─── */}
      <div className="bg-[var(--color-background-secondary)] p-5 rounded-[var(--border-radius-lg)] border border-[var(--color-border-tertiary)] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar initials="LW" size="lg" colorVariant="info" />
          <div>
            <h1 className="text-[20px] font-semibold text-[var(--color-text-primary)]">Dr. Lisa Wong</h1>
            <p className="text-[13px] text-[var(--color-text-secondary)] mt-0.5">
              Senior Panelist · Computer Science Department · 2 Upcoming defense sessions
            </p>
            <div className="flex gap-2 mt-2">
              <span className="text-[10px] bg-slate-800 text-[var(--color-text-secondary)] px-2 py-0.5 rounded-full border border-slate-700">Specialization: Machine Learning</span>
              <span className="text-[10px] bg-slate-800 text-[var(--color-text-secondary)] px-2 py-0.5 rounded-full border border-slate-700">Computer Vision</span>
            </div>
          </div>
        </div>
        <div className="flex bg-[var(--color-background-primary)] border border-[var(--color-border-tertiary)] rounded-[var(--border-radius-md)] p-1 text-xs">
          <div className="px-3 py-1.5 text-center border-r border-[var(--color-border-tertiary)]">
            <div className="font-semibold text-emerald-400">2 Pending</div>
            <span className="text-[10px] text-[var(--color-text-secondary)]">Schedule Slots</span>
          </div>
          <div className="px-3 py-1.5 text-center">
            <div className="font-semibold text-[var(--color-text-info)]">{history.length} Graded</div>
            <span className="text-[10px] text-[var(--color-text-secondary)]">Sessions Archive</span>
          </div>
        </div>
      </div>

      {/* ─── TAB NAVIGATION ─── */}
      <div className="flex border-b border-[var(--color-border-tertiary)] bg-[var(--color-background-primary)] rounded-[var(--border-radius-lg)] p-1">
        <button
          onClick={() => setActiveTab("overview")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2 px-3 text-[12px] font-medium rounded-[var(--border-radius-md)] transition cursor-pointer",
            activeTab === "overview"
              ? "bg-[var(--color-background-secondary)] text-[var(--color-text-primary)] border-b border-[var(--color-border-info)]"
              : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          )}
        >
          <i className="ti ti-layout-dashboard" /> Profile & Overview
        </button>
        <button
          onClick={() => setActiveTab("schedule")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2 px-3 text-[12px] font-medium rounded-[var(--border-radius-md)] transition cursor-pointer",
            activeTab === "schedule"
              ? "bg-[var(--color-background-secondary)] text-[var(--color-text-primary)] border-b border-[var(--color-border-info)]"
              : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          )}
        >
          <i className="ti ti-calendar" /> Defense Schedule
        </button>
        <button
          onClick={() => setActiveTab("documents")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2 px-3 text-[12px] font-medium rounded-[var(--border-radius-md)] transition cursor-pointer",
            activeTab === "documents"
              ? "bg-[var(--color-background-secondary)] text-[var(--color-text-primary)] border-b border-[var(--color-border-info)]"
              : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          )}
        >
          <i className="ti ti-file-text" /> Submitted Documents
        </button>
        <button
          onClick={() => setActiveTab("scoring")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2 px-3 text-[12px] font-medium rounded-[var(--border-radius-md)] transition cursor-pointer",
            activeTab === "scoring"
              ? "bg-[var(--color-background-secondary)] text-[var(--color-text-primary)] border-b border-[var(--color-border-info)]"
              : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          )}
        >
          <i className="ti ti-stars" /> Scoring Sheet
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2 px-3 text-[12px] font-medium rounded-[var(--border-radius-md)] transition cursor-pointer",
            activeTab === "history"
              ? "bg-[var(--color-background-secondary)] text-[var(--color-text-primary)] border-b border-[var(--color-border-info)]"
              : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          )}
        >
          <i className="ti ti-history" /> Grading History
        </button>
      </div>

      {/* ─── TAB CONTENT PANELS ─── */}
      <div className="min-h-[400px]">

        {/* ─── TAB 1: OVERVIEW & PROFILE ─── */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
            {/* Notification Center */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle icon="ti-bell">Panel Notifications</CardTitle>
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-xs text-[var(--color-text-info)] hover:opacity-85 transition cursor-pointer font-medium"
                  >
                    Mark all read
                  </button>
                </CardHeader>

                <div className="flex flex-col gap-3 mt-2">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => toggleReadNotification(n.id)}
                      className={cn(
                        "flex items-start justify-between p-3.5 rounded-[var(--border-radius-md)] border cursor-pointer transition-all",
                        n.read
                          ? "bg-[var(--color-background-secondary)]/50 border-[var(--color-border-tertiary)] opacity-70"
                          : "bg-[var(--color-background-secondary)] border-[var(--color-border-secondary)] hover:brightness-105"
                      )}
                    >
                      <div className="flex gap-3">
                        <i
                          className={cn(
                            "ti mt-0.5 text-base",
                            n.type === "success" && "ti-circle-check text-emerald-400",
                            n.type === "warning" && "ti-alert-triangle text-amber-400",
                            n.type === "info" && "ti-info-circle text-blue-400"
                          )}
                        />
                        <div>
                          <p className="text-xs text-[var(--color-text-primary)]">{n.text}</p>
                          <span className="text-[10px] text-[var(--color-text-tertiary)] mt-1 block">{n.time}</span>
                        </div>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" style={{ display: n.read ? "none" : "block" }} />
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Quick Action Summaries */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <Card className="flex flex-col justify-between">
                <div>
                  <CardHeader>
                    <CardTitle icon="ti-info-circle">Session Metrics</CardTitle>
                  </CardHeader>
                  <div className="flex flex-col gap-4 mt-2">
                    <p className="text-xs text-[var(--color-text-secondary)]">Quick actions dashboard to launch defense reviews.</p>
                    
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center text-xs p-3 bg-[var(--color-background-secondary)] rounded border border-[var(--color-border-tertiary)]">
                        <div>
                          <span className="font-semibold block text-[var(--color-text-primary)]">Group Alpha Defense</span>
                          <span className="text-[10.5px] text-[var(--color-text-secondary)]">June 29, 09:00 AM</span>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedSessionId("s1");
                            setActiveTab("scoring");
                          }}
                          className="px-2 py-1 text-[10.5px] font-medium bg-[var(--color-background-info)] border border-[var(--color-border-info)] text-[var(--color-text-info)] rounded hover:bg-opacity-80 transition cursor-pointer"
                        >
                          Grade Sheet
                        </button>
                      </div>

                      <div className="flex justify-between items-center text-xs p-3 bg-[var(--color-background-secondary)] rounded border border-[var(--color-border-tertiary)]">
                        <div>
                          <span className="font-semibold block text-[var(--color-text-primary)]">Group Delta Defense</span>
                          <span className="text-[10.5px] text-[var(--color-text-secondary)]">June 30, 01:00 PM</span>
                        </div>
                        <button
                          onClick={() => {
                            setSelectedSessionId("s2");
                            setActiveTab("scoring");
                          }}
                          className="px-2 py-1 text-[10.5px] font-medium bg-[var(--color-background-info)] border border-[var(--color-border-info)] text-[var(--color-text-info)] rounded hover:bg-opacity-80 transition cursor-pointer"
                        >
                          Grade Sheet
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-3 border-t border-[var(--color-border-tertiary)] text-[11px] text-[var(--color-text-secondary)] italic">
                  <i className="ti ti-help text-[var(--color-text-info)] mr-1" />
                  Grade sheets are automatically configured based on program coordinator rubrics.
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ─── TAB 2: DEFENSE SCHEDULE MANAGEMENT ─── */}
        {activeTab === "schedule" && (
          <div className="flex flex-col gap-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle icon="ti-calendar-event">Upcoming Defense Slots</CardTitle>
                <span className="text-xs text-[var(--color-text-secondary)]">Defense sessions schedule assigned to you</span>
              </CardHeader>

              <div className="flex flex-col gap-4 mt-4">
                {sessions.length === 0 ? (
                  <p className="text-xs text-[var(--color-text-secondary)] italic py-4 text-center">No upcoming defense sessions scheduled.</p>
                ) : (
                  sessions.map((session) => (
                    <div
                      key={session.id}
                      className="bg-[var(--color-background-secondary)] p-4 rounded-[var(--border-radius-md)] border border-[var(--color-border-tertiary)] flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="flex gap-4">
                        <div className="bg-[var(--color-background-primary)] border border-[var(--color-border-tertiary)] p-3 rounded-[var(--border-radius-md)] flex flex-col justify-center items-center text-center w-24">
                          <span className="text-[10px] uppercase font-semibold text-[var(--color-text-secondary)]">June</span>
                          <span className="text-xl font-bold text-white mt-0.5">
                            {session.date.split(" ")[1].replace(",", "")}
                          </span>
                          <span className="text-[9px] text-[var(--color-text-tertiary)] mt-0.5">{session.time}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <Tag variant="info" size="sm">{session.type}</Tag>
                            <span className="font-semibold text-xs text-[var(--color-text-primary)]">{session.groupName}</span>
                          </div>
                          <h4 className="text-[13.5px] font-semibold text-white mt-1.5">{session.title}</h4>
                          <div className="flex gap-3 text-[10.5px] text-[var(--color-text-secondary)] mt-1">
                            <span>Adviser: {session.adviser}</span>
                            <span>•</span>
                            <span className="text-[var(--color-text-info)] flex items-center gap-0.5"><i className="ti ti-map-pin" /> Room: {session.room}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedSessionId(session.id);
                            setActiveTab("documents");
                          }}
                          className="px-3 py-1.5 text-xs font-semibold bg-[var(--color-background-secondary)] border border-[var(--color-border-tertiary)] text-[var(--color-text-primary)] rounded-[var(--border-radius-md)] hover:brightness-105 transition cursor-pointer flex items-center gap-1"
                        >
                          <i className="ti ti-file-text" /> Read Draft
                        </button>
                        <button
                          onClick={() => {
                            setSelectedSessionId(session.id);
                            setActiveTab("scoring");
                          }}
                          className="px-3 py-1.5 text-xs font-semibold bg-[var(--color-background-success)] border border-[var(--color-border-success)] text-[var(--color-text-success)] rounded-[var(--border-radius-md)] hover:bg-opacity-80 transition cursor-pointer flex items-center gap-1"
                        >
                          <i className="ti ti-stars" /> Scoring Sheet
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        )}

        {/* ─── TAB 3: SUBMITTED DOCUMENTS ─── */}
        {activeTab === "documents" && (
          <div className="flex flex-col gap-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle icon="ti-file-description">Submitted Capstone Artifacts</CardTitle>
                <span className="text-xs text-[var(--color-text-secondary)]">Access research manuscripts and similarity scans.</span>
              </CardHeader>

              <div className="overflow-x-auto mt-2">
                <table className="w-full text-left border-collapse text-[13px]">
                  <thead>
                    <tr className="border-b border-[var(--color-border-tertiary)] text-[var(--color-text-tertiary)] uppercase tracking-wider text-[10px]">
                      <th className="pb-3 font-semibold">Group & Phase</th>
                      <th className="pb-3 font-semibold">Manuscript Draft</th>
                      <th className="pb-3 font-semibold">Similarity Index</th>
                      <th className="pb-3 font-semibold">Defense Slot</th>
                      <th className="pb-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border-tertiary)]">
                    {sessions.map((session) => (
                      <tr key={session.id} className="hover:bg-[var(--color-background-secondary)] transition-colors">
                        <td className="py-4">
                          <span className="font-semibold text-xs text-[var(--color-text-primary)]">{session.groupName}</span>
                          <div className="text-[10px] text-[var(--color-text-secondary)] mt-0.5">{session.type} Phase</div>
                        </td>
                        <td className="py-4">
                          <span className="text-xs text-blue-400 hover:underline cursor-pointer flex items-center gap-1">
                            <i className="ti ti-file-type-pdf text-base" /> {session.documentName}
                          </span>
                        </td>
                        <td className="py-4">
                          <Tag variant={session.similarity > 20 ? "danger" : "success"}>
                            <i className="ti ti-fingerprint" /> {session.similarity}% matches
                          </Tag>
                        </td>
                        <td className="py-4">
                          <span className="font-semibold text-xs text-white">{session.date}</span>
                          <div className="text-[10px] text-[var(--color-text-secondary)] mt-0.5">{session.time}</div>
                        </td>
                        <td className="py-4 text-right">
                          <button
                            onClick={() => {
                              setSelectedSessionId(session.id);
                              setActiveTab("scoring");
                            }}
                            className="px-2.5 py-1 text-[11px] font-medium bg-[var(--color-background-info)] border border-[var(--color-border-info)] text-[var(--color-text-info)] rounded hover:bg-opacity-80 transition cursor-pointer"
                          >
                            Evaluate Draft
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* ─── TAB 4: DIGITAL EVALUATION & SCORING SHEET ─── */}
        {activeTab === "scoring" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
            {/* Scoring Inputs */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              <Card>
                <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <CardTitle icon="ti-stars">Digital Evaluation Sheet</CardTitle>
                    <p className="text-xs text-[var(--color-text-secondary)] mt-1">Score the student group based on program rubric criteria.</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-xs text-[var(--color-text-secondary)]">Active Session:</label>
                    <select
                      value={selectedSessionId}
                      onChange={(e) => setSelectedSessionId(e.target.value)}
                      className="bg-[var(--color-background-secondary)] border border-[var(--color-border-tertiary)] text-[var(--color-text-primary)] rounded px-2.5 py-1.5 text-xs focus:outline-none focus:border-[var(--color-border-info)]"
                    >
                      {sessions.map(s => (
                        <option key={s.id} value={s.id}>{s.groupName} ({s.type})</option>
                      ))}
                    </select>
                  </div>
                </CardHeader>

                {/* Selected group detail card */}
                <div className="bg-[var(--color-background-secondary)] p-4 border border-[var(--color-border-tertiary)] rounded-[var(--border-radius-md)] mb-6">
                  <div className="text-[10px] text-[var(--color-text-secondary)] uppercase tracking-[0.06em]">Research Title</div>
                  <h4 className="text-xs font-semibold text-white mt-1 leading-relaxed">{currentSession.title}</h4>
                  <div className="flex gap-3 text-[10.5px] text-[var(--color-text-secondary)] mt-2">
                    <span>Adviser: {currentSession.adviser}</span>
                    <span>•</span>
                    <span>Similarity: <span className="text-emerald-400 font-semibold">{currentSession.similarity}%</span></span>
                  </div>
                </div>

                <form onSubmit={submitEvaluation} className="flex flex-col gap-5">
                  {/* Slider 1: Concept */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs">
                      <label className="font-semibold text-white">Problem Definition & Literature Review (15%)</label>
                      <span className="font-bold text-[var(--color-text-info)]">{scoreConcept} / 100</span>
                    </div>
                    <input
                      type="range" min="50" max="100" step="1" value={scoreConcept}
                      onChange={(e) => setScoreConcept(Number(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  {/* Slider 2: Methodology */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs">
                      <label className="font-semibold text-white">Methodology & Research Design (20%)</label>
                      <span className="font-bold text-[var(--color-text-info)]">{scoreMethodology} / 100</span>
                    </div>
                    <input
                      type="range" min="50" max="100" step="1" value={scoreMethodology}
                      onChange={(e) => setScoreMethodology(Number(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  {/* Slider 3: Design */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs">
                      <label className="font-semibold text-white">System Architecture & Engineering Quality (25%)</label>
                      <span className="font-bold text-[var(--color-text-info)]">{scoreSystemDesign} / 100</span>
                    </div>
                    <input
                      type="range" min="50" max="100" step="1" value={scoreSystemDesign}
                      onChange={(e) => setScoreSystemDesign(Number(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  {/* Slider 4: Oral */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs">
                      <label className="font-semibold text-white">Oral Presentation & Defense Q&A Response (10%)</label>
                      <span className="font-bold text-[var(--color-text-info)]">{scorePresentation} / 100</span>
                    </div>
                    <input
                      type="range" min="50" max="100" step="1" value={scorePresentation}
                      onChange={(e) => setScorePresentation(Number(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  {/* Remarks input */}
                  <div className="flex flex-col gap-1.5 mt-2">
                    <label className="text-xs font-semibold text-white">Reviewer Remarks / Constructive Comments</label>
                    <textarea
                      rows={4}
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      placeholder="Type details on dataset benchmark expansions, software evaluation layout adjustments, etc..."
                      className="bg-[var(--color-background-secondary)] border border-[var(--color-border-tertiary)] text-[var(--color-text-primary)] rounded-[var(--border-radius-md)] px-3 py-2 text-xs focus:outline-none focus:border-[var(--color-border-info)] w-full resize-y"
                    />
                  </div>

                  {/* Recommendation decision and Submit */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-white">Defense Recommendation</label>
                      <select
                        value={recommendation}
                        onChange={(e) => setRecommendation(e.target.value as any)}
                        className="bg-[var(--color-background-secondary)] border border-[var(--color-border-tertiary)] text-[var(--color-text-primary)] rounded px-3 py-2 text-xs focus:outline-none focus:border-[var(--color-border-info)]"
                      >
                        <option value="Passed">Passed (Approved as-is)</option>
                        <option value="Passed with Revisions">Passed with Revisions</option>
                        <option value="Reexamined">Reexamined (Retake Defense)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="py-2.5 px-4 bg-[var(--color-background-success)] border border-[var(--color-border-success)] text-[var(--color-text-success)] text-xs font-semibold rounded hover:bg-opacity-80 transition cursor-pointer flex items-center justify-center gap-1.5 self-end mt-4 md:mt-0"
                    >
                      <i className="ti ti-send" /> Submit Evaluation & Grade
                    </button>
                  </div>
                </form>
              </Card>
            </div>

            {/* Rubrics weight details card */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <Card className="h-full flex flex-col justify-between">
                <div>
                  <CardHeader>
                    <CardTitle icon="ti-notebook">Digital Grade Calculator</CardTitle>
                  </CardHeader>
                  
                  <div className="flex flex-col gap-4 mt-2">
                    <div className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                      Grade is automatically compiled based on the following relative weighted averages:
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between text-xs p-2 bg-[var(--color-background-secondary)] rounded">
                        <span>Concept & Problem:</span>
                        <span className="font-semibold text-slate-300">15% Weight</span>
                      </div>
                      <div className="flex justify-between text-xs p-2 bg-[var(--color-background-secondary)] rounded">
                        <span>Methodology Design:</span>
                        <span className="font-semibold text-slate-300">20% Weight</span>
                      </div>
                      <div className="flex justify-between text-xs p-2 bg-[var(--color-background-secondary)] rounded">
                        <span>System Quality:</span>
                        <span className="font-semibold text-slate-300">25% Weight</span>
                      </div>
                      <div className="flex justify-between text-xs p-2 bg-[var(--color-background-secondary)] rounded">
                        <span>Q&A Presentation:</span>
                        <span className="font-semibold text-slate-300">10% Weight</span>
                      </div>
                    </div>

                    {/* Calculated Live Grade */}
                    <div className="border border-[var(--color-border-info)]/30 rounded p-4 bg-[var(--color-background-info)] flex flex-col items-center justify-center text-center mt-3">
                      <span className="text-[10px] text-[var(--color-text-info)] uppercase tracking-wider font-semibold">Calculated Live Average</span>
                      <h2 className="text-3xl font-extrabold text-white mt-1">
                        {Math.round((scoreConcept + scoreMethodology + scoreSystemDesign + scorePresentation) / 4)}%
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-[var(--color-border-tertiary)] pt-3 text-[11px] text-[var(--color-text-secondary)] italic">
                  * All panel score submissions represent final records. Any adjustments post-submission must be endorsed by the CCS Dean.
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ─── TAB 5: HISTORICAL GRADING RECORDS ─── */}
        {activeTab === "history" && (
          <div className="flex flex-col gap-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle icon="ti-history">Historical Grading Archive</CardTitle>
                <span className="text-xs text-[var(--color-text-secondary)]">List of research defense evaluations completed by you.</span>
              </CardHeader>

              <div className="overflow-x-auto mt-4">
                <table className="w-full text-left border-collapse text-[13px]">
                  <thead>
                    <tr className="border-b border-[var(--color-border-tertiary)] text-[var(--color-text-tertiary)] uppercase tracking-wider text-[10px]">
                      <th className="pb-3 font-semibold">Capstone Group</th>
                      <th className="pb-3 font-semibold">Milestone Phase</th>
                      <th className="pb-3 font-semibold">Graded On</th>
                      <th className="pb-3 font-semibold">Score Average</th>
                      <th className="pb-3 font-semibold text-right">Recommendation</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border-tertiary)]">
                    {history.map((record) => (
                      <tr key={record.id} className="hover:bg-[var(--color-background-secondary)] transition-colors">
                        <td className="py-4 pr-3">
                          <span className="font-semibold text-xs text-[var(--color-text-primary)]">{record.groupName}</span>
                          <div className="text-[11px] text-[var(--color-text-secondary)] mt-0.5 truncate max-w-[260px]">{record.title}</div>
                        </td>
                        <td className="py-4">{record.type}</td>
                        <td className="py-4 text-[var(--color-text-secondary)]">{record.gradedOn}</td>
                        <td className="py-4 font-bold text-white">{record.score}%</td>
                        <td className="py-4 text-right">
                          <Tag variant={record.recommendation === "Passed" ? "success" : record.recommendation === "Passed with Revisions" ? "info" : "warn"}>
                            {record.recommendation}
                          </Tag>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

      </div>

    </div>
  );
}
