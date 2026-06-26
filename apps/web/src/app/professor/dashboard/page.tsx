"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardLink } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import { Avatar } from "@/components/ui/Avatar";
import { cn } from "@/lib/utils";

// ─── TYPES & INTERFACES ──────────────────────────────────────────
interface TaskItem {
  id: string;
  title: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  completed: boolean;
}

interface Milestone {
  id: string;
  title: string;
  tasks: TaskItem[];
  isCustom?: boolean;
}

interface GroupData {
  id: string;
  name: string;
  title: string;
  members: string[];
  initials: string[];
  progress: number;
  phaseIndex: number; // 0 to 6 index mapping to research phases
  status: "active" | "delayed" | "completed";
  lastActive: string;
  similarity: number;
  milestones: Milestone[];
}

// Phases of the Research Workflow
const RESEARCH_PHASES = [
  { name: "Proposal Draft", label: "Proposal", icon: "ti-file-pencil" },
  { name: "Proposal Defense", label: "Defense 1", icon: "ti-presentation" },
  { name: "Chapter 1-3 Submission", label: "Chapters 1-3", icon: "ti-book" },
  { name: "Pre-Defense Evaluation", label: "Pre-Defense", icon: "ti-shield" },
  { name: "Chapters 4-5 Submission", label: "Chapters 4-5", icon: "ti-file-text" },
  { name: "Final Plagiarism Check", label: "Similarity", icon: "ti-fingerprint" },
  { name: "Final Defense & Upload", label: "Final Upload", icon: "ti-circle-check" },
];

export default function ProfessorDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "workflow" | "builder" | "locking" | "deadlines">("overview");

  // ─── LOCAL STATE FOR MOCK DATA ─────────────────────────────────
  const [groups, setGroups] = useState<GroupData[]>([
    {
      id: "g1",
      name: "Group Alpha",
      title: "AI-based Crop Yield Prediction System Using ML",
      members: ["Juan Reyes", "Maria Cruz", "Angelo Lim"],
      initials: ["JR", "MC", "AL"],
      progress: 68,
      phaseIndex: 3, // Pre-Defense Evaluation
      status: "active",
      lastActive: "15 mins ago",
      similarity: 12,
      milestones: [
        {
          id: "m1-g1",
          title: "Proposal and Outline",
          tasks: [
            { id: "t1-g1", title: "Submit Outline draft", dueDate: "2026-06-10", priority: "medium", completed: true },
            { id: "t2-g1", title: "Resolve defense panel comments", dueDate: "2026-06-15", priority: "high", completed: true }
          ]
        },
        {
          id: "m2-g1",
          title: "Chapters 1-3",
          tasks: [
            { id: "t3-g1", title: "Write Methodology section", dueDate: "2026-06-25", priority: "high", completed: true },
            { id: "t4-g1", title: "Ethical Board clearance letter", dueDate: "2026-07-02", priority: "low", completed: false }
          ]
        }
      ]
    },
    {
      id: "g2",
      name: "Group Beta",
      title: "Smart Traffic Management System using IoT & Edge Computing",
      members: ["Lando Vance", "Kaye Diaz"],
      initials: ["LV", "KD"],
      progress: 92,
      phaseIndex: 5, // Final Similarity Check
      status: "active",
      lastActive: "2 hours ago",
      similarity: 8,
      milestones: [
        {
          id: "m1-g2",
          title: "Pre-Defense Requirements",
          tasks: [
            { id: "t1-g2", title: "Deploy prototype build", dueDate: "2026-06-08", priority: "high", completed: true },
            { id: "t2-g2", title: "Complete pre-defense document reviews", dueDate: "2026-06-18", priority: "medium", completed: true }
          ]
        }
      ]
    },
    {
      id: "g3",
      name: "Group Gamma",
      title: "Blockchain-based Academic Credentials Verification System",
      members: ["Santi Perez", "Gwen Robredo", "Mark Lim"],
      initials: ["SP", "GR", "ML"],
      progress: 25,
      phaseIndex: 1, // Proposal Defense
      status: "delayed",
      lastActive: "4 days ago",
      similarity: 28, // High similarity
      milestones: [
        {
          id: "m1-g3",
          title: "Proposal Preparation",
          tasks: [
            { id: "t1-g3", title: "Draft literature review outline", dueDate: "2026-06-20", priority: "medium", completed: false },
            { id: "t2-g3", title: "Setup github repository & architecture flow", dueDate: "2026-06-24", priority: "high", completed: false }
          ]
        }
      ]
    },
    {
      id: "g4",
      name: "Group Delta",
      title: "Automated Waste Sorting System using Computer Vision & Robotics",
      members: ["Clara Gomez", "David Sy"],
      initials: ["CG", "DS"],
      progress: 48,
      phaseIndex: 2, // Chapters 1-3 Submission
      status: "active",
      lastActive: "Just now",
      similarity: 14,
      milestones: [
        {
          id: "m1-g4",
          title: "Initial Drafts",
          tasks: [
            { id: "t1-g4", title: "Draft Intro & Background", dueDate: "2026-06-14", priority: "medium", completed: true },
            { id: "t2-g4", title: "Complete dataset selection", dueDate: "2026-06-20", priority: "high", completed: true }
          ]
        }
      ]
    }
  ]);

  // Selected Group State for specific tabs (Workflow / Builder)
  const [selectedGroupId, setSelectedGroupId] = useState<string>("g1");
  const activeGroup = groups.find(g => g.id === selectedGroupId) || groups[0];

  // ─── LOCKING RULES STATE (Master Progression Deployment) ────────
  const [lockingRules, setLockingRules] = useState({
    lockLitReview: true,
    lockPreDefense: true,
    lockFinalDefense: false,
    maxSimilarityLimit: true,
    blockDelayedSubmissions: false,
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // ─── TASK BUILDER STATE (Blank-Canvas Task Builder) ─────────────
  const [newMilestoneTitle, setNewMilestoneTitle] = useState("");
  const [builderTasks, setBuilderTasks] = useState<{ title: string; dueDate: string; priority: "high" | "medium" | "low" }[]>([]);
  const [currTaskTitle, setCurrTaskTitle] = useState("");
  const [currTaskDueDate, setCurrTaskDueDate] = useState("");
  const [currTaskPriority, setCurrTaskPriority] = useState<"high" | "medium" | "low">("medium");

  const addBuilderTask = () => {
    if (!currTaskTitle.trim() || !currTaskDueDate) {
      showToast("Please enter a task title and select a due date.");
      return;
    }
    setBuilderTasks(prev => [
      ...prev,
      { title: currTaskTitle, dueDate: currTaskDueDate, priority: currTaskPriority }
    ]);
    setCurrTaskTitle("");
    setCurrTaskDueDate("");
    setCurrTaskPriority("medium");
  };

  const removeBuilderTask = (index: number) => {
    setBuilderTasks(prev => prev.filter((_, i) => i !== index));
  };

  const deployCustomMilestone = () => {
    if (!newMilestoneTitle.trim()) {
      showToast("Please provide a milestone title.");
      return;
    }
    if (builderTasks.length === 0) {
      showToast("Please add at least one task to the milestone.");
      return;
    }

    const newMilestone: Milestone = {
      id: "custom-" + Date.now(),
      title: newMilestoneTitle,
      isCustom: true,
      tasks: builderTasks.map((t, index) => ({
        id: `custom-task-${index}-${Date.now()}`,
        title: t.title,
        dueDate: t.dueDate,
        priority: t.priority,
        completed: false
      }))
    };

    setGroups(prevGroups =>
      prevGroups.map(g => {
        if (g.id === selectedGroupId) {
          // Calculate new progress based on total tasks
          const updatedMilestones = [...g.milestones, newMilestone];
          return {
            ...g,
            milestones: updatedMilestones,
          };
        }
        return g;
      })
    );

    showToast(`Successfully deployed custom milestone "${newMilestoneTitle}" to ${activeGroup.name}!`);
    setNewMilestoneTitle("");
    setBuilderTasks([]);
  };

  // ─── WORKFLOW PROMOTION ACTIONS ─────────────────────────────────
  const promoteGroup = (groupId: string) => {
    setGroups(prev =>
      prev.map(g => {
        if (g.id === groupId) {
          if (g.phaseIndex >= RESEARCH_PHASES.length - 1) return g;
          const nextIndex = g.phaseIndex + 1;
          const progressPercent = Math.min(100, Math.round((nextIndex / (RESEARCH_PHASES.length - 1)) * 100));
          showToast(`${g.name} promoted to "${RESEARCH_PHASES[nextIndex].name}"`);
          return {
            ...g,
            phaseIndex: nextIndex,
            progress: progressPercent,
            lastActive: "Just now"
          };
        }
        return g;
      })
    );
  };

  const demoteGroup = (groupId: string) => {
    setGroups(prev =>
      prev.map(g => {
        if (g.id === groupId) {
          if (g.phaseIndex <= 0) return g;
          const prevIndex = g.phaseIndex - 1;
          const progressPercent = Math.min(100, Math.round((prevIndex / (RESEARCH_PHASES.length - 1)) * 100));
          showToast(`${g.name} demoted to "${RESEARCH_PHASES[prevIndex].name}"`);
          return {
            ...g,
            phaseIndex: prevIndex,
            progress: progressPercent,
            lastActive: "Just now"
          };
        }
        return g;
      })
    );
  };

  // ─── DEADLINE ENFORCEMENT CONFIG STATE ─────────────────────────
  const [penaltyPercent, setPenaltyPercent] = useState<number>(5);
  const [gracePeriodHours, setGracePeriodHours] = useState<number>(24);
  const [hardLockout, setHardLockout] = useState<boolean>(false);
  const [autoPlagiarismCheck, setAutoPlagiarismCheck] = useState<boolean>(true);

  // Stats computation
  const totalGroups = groups.length;
  const delayedGroups = groups.filter(g => g.status === "delayed").length;
  const avgProgress = Math.round(groups.reduce((acc, g) => acc + g.progress, 0) / totalGroups);
  const highRiskGroups = groups.filter(g => g.similarity > 20).length;

  return (
    <div className="flex flex-col gap-6 relative">
      
      {/* Toast Alert Banner */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 bg-[var(--color-background-info)] border border-[var(--color-border-info)] text-[var(--color-text-info)] px-4 py-3 rounded-[var(--border-radius-md)] flex items-center gap-3 shadow-lg animate-fade-in text-[13px]">
          <i className="ti ti-info-circle text-base" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ─── PAGE HEADER ─── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-[var(--color-background-secondary)] p-5 rounded-[var(--border-radius-lg)] border border-[var(--color-border-tertiary)] gap-4">
        <div>
          <h1 className="text-[20px] font-semibold text-[var(--color-text-primary)]">Welcome back, Dr. Pendelton!</h1>
          <p className="text-[13px] text-[var(--color-text-secondary)] mt-1">
            Program Coordinator · CCS Capstone Panel · Monitoring 4 Research Groups
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              // Deploy Template
              showToast("Standard Capstone Milestone Template deployed to all active groups.");
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-medium bg-[var(--color-background-info)] border border-[var(--color-border-info)] text-[var(--color-text-info)] rounded-[var(--border-radius-md)] hover:bg-opacity-80 transition cursor-pointer"
          >
            <i className="ti ti-file-import text-sm" /> Deploy Std Template
          </button>
        </div>
      </div>

      {/* ─── METRIC CARDS ROW ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card accentColor="info" className="flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[11px] text-[var(--color-text-secondary)] uppercase tracking-[0.06em]">Total Groups</span>
              <h3 className="text-2xl font-semibold text-[var(--color-text-primary)] mt-1">{totalGroups}</h3>
            </div>
            <div className="p-2 rounded-[var(--border-radius-md)] bg-[var(--color-background-info)]">
              <i className="ti ti-users text-lg text-[var(--color-text-info)]" />
            </div>
          </div>
          <span className="text-[11px] text-[var(--color-text-success)] mt-2 flex items-center gap-1">
            <i className="ti ti-circle-check" /> 3 Groups actively writing
          </span>
        </Card>

        <Card accentColor="warning" className="flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[11px] text-[var(--color-text-secondary)] uppercase tracking-[0.06em]">Delayed Progress</span>
              <h3 className="text-2xl font-semibold text-[var(--color-text-warning)] mt-1">{delayedGroups}</h3>
            </div>
            <div className="p-2 rounded-[var(--border-radius-md)] bg-[var(--color-background-warning)]">
              <i className="ti ti-clock-pause text-lg text-[var(--color-text-warning)]" />
            </div>
          </div>
          <span className="text-[11px] text-red-400 mt-2 flex items-center gap-1">
            <i className="ti ti-alert-triangle" /> Group Gamma needs attention
          </span>
        </Card>

        <Card accentColor="success" className="flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[11px] text-[var(--color-text-secondary)] uppercase tracking-[0.06em]">Average Progress</span>
              <h3 className="text-2xl font-semibold text-[var(--color-text-success)] mt-1">{avgProgress}%</h3>
            </div>
            <div className="p-2 rounded-[var(--border-radius-md)] bg-[var(--color-background-success)]">
              <i className="ti ti-trending-up text-lg text-[var(--color-text-success)]" />
            </div>
          </div>
          <div className="progress-bar-track mt-3 w-full">
            <div className="progress-bar-fill" style={{ width: `${avgProgress}%` }}></div>
          </div>
        </Card>

        <Card accentColor="danger" className="flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-[11px] text-[var(--color-text-secondary)] uppercase tracking-[0.06em]">High Plagiarism Risk</span>
              <h3 className="text-2xl font-semibold text-[var(--color-text-danger)] mt-1">{highRiskGroups}</h3>
            </div>
            <div className="p-2 rounded-[var(--border-radius-md)] bg-[var(--color-background-danger)]">
              <i className="ti ti-shield-alert text-lg text-[var(--color-text-danger)]" />
            </div>
          </div>
          <span className="text-[11px] text-[var(--color-text-secondary)] mt-2 flex items-center gap-1">
            <i className="ti ti-fingerprint text-[var(--color-text-danger)]" /> Standard threshold is &lt; 15%
          </span>
        </Card>
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
          <i className="ti ti-layout-dashboard" /> Monitoring & Overview
        </button>
        <button
          onClick={() => setActiveTab("workflow")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2 px-3 text-[12px] font-medium rounded-[var(--border-radius-md)] transition cursor-pointer",
            activeTab === "workflow"
              ? "bg-[var(--color-background-secondary)] text-[var(--color-text-primary)] border-b border-[var(--color-border-info)]"
              : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          )}
        >
          <i className="ti ti-git-fork" /> Research Workflow
        </button>
        <button
          onClick={() => setActiveTab("builder")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2 px-3 text-[12px] font-medium rounded-[var(--border-radius-md)] transition cursor-pointer",
            activeTab === "builder"
              ? "bg-[var(--color-background-secondary)] text-[var(--color-text-primary)] border-b border-[var(--color-border-info)]"
              : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          )}
        >
          <i className="ti ti-plus" /> Task Builder
        </button>
        <button
          onClick={() => setActiveTab("locking")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2 px-3 text-[12px] font-medium rounded-[var(--border-radius-md)] transition cursor-pointer",
            activeTab === "locking"
              ? "bg-[var(--color-background-secondary)] text-[var(--color-text-primary)] border-b border-[var(--color-border-info)]"
              : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          )}
        >
          <i className="ti ti-lock" /> Task Locking
        </button>
        <button
          onClick={() => setActiveTab("deadlines")}
          className={cn(
            "flex-1 flex items-center justify-center gap-2 py-2 px-3 text-[12px] font-medium rounded-[var(--border-radius-md)] transition cursor-pointer",
            activeTab === "deadlines"
              ? "bg-[var(--color-background-secondary)] text-[var(--color-text-primary)] border-b border-[var(--color-border-info)]"
              : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          )}
        >
          <i className="ti ti-alarm-clock" /> Deadline Enforcement
        </button>
      </div>

      {/* ─── TAB CONTENT PANELS ─── */}
      <div className="min-h-[400px]">

        {/* ─── TAB 1: OVERVIEW & MONITORING ─── */}
        {activeTab === "overview" && (
          <div className="flex flex-col gap-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle icon="ti-list-check">Student & Project Progress Monitor</CardTitle>
                <span className="text-xs text-[var(--color-text-secondary)]">Showing active capstone groups</span>
              </CardHeader>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-[13px]">
                  <thead>
                    <tr className="border-b border-[var(--color-border-tertiary)] text-[var(--color-text-tertiary)] uppercase tracking-wider text-[10px]">
                      <th className="pb-3 font-semibold">Group & Project Title</th>
                      <th className="pb-3 font-semibold">Members</th>
                      <th className="pb-3 font-semibold">Current Phase</th>
                      <th className="pb-3 font-semibold">Similarity</th>
                      <th className="pb-3 font-semibold w-1/4">Progress</th>
                      <th className="pb-3 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--color-border-tertiary)]">
                    {groups.map((group) => {
                      const phase = RESEARCH_PHASES[group.phaseIndex];
                      const isHighSimilarity = group.similarity > 20;
                      return (
                        <tr key={group.id} className="hover:bg-[var(--color-background-secondary)] transition-colors">
                          <td className="py-4 pr-3">
                            <div className="font-medium text-[var(--color-text-primary)]">{group.name}</div>
                            <div className="text-xs text-[var(--color-text-secondary)] mt-0.5 truncate max-w-[300px]">
                              {group.title}
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center gap-1">
                              {group.initials.map((init, i) => (
                                <Avatar
                                  key={i}
                                  initials={init}
                                  size="sm"
                                  colorVariant={group.status === "delayed" ? "warning" : "info"}
                                  className="-mr-1.5 border border-[var(--color-background-primary)]"
                                />
                              ))}
                              <span className="text-[11px] text-[var(--color-text-secondary)] ml-2">
                                ({group.members.length})
                              </span>
                            </div>
                          </td>
                          <td className="py-4">
                            <span className="flex items-center gap-1.5">
                              <i className={cn("ti", phase.icon, "text-[var(--color-text-info)]")} />
                              {phase.name}
                            </span>
                          </td>
                          <td className="py-4">
                            <Tag variant={isHighSimilarity ? "danger" : "success"}>
                              <i className="ti ti-fingerprint" /> {group.similarity}%
                            </Tag>
                          </td>
                          <td className="py-4 pr-3">
                            <div className="flex items-center gap-3">
                              <div className="progress-bar-track flex-1">
                                <div
                                  className={cn(
                                    "progress-bar-fill",
                                    group.status === "delayed" && "bg-gradient-to-r from-amber-500 to-yellow-400"
                                  )}
                                  style={{ width: `${group.progress}%` }}
                                ></div>
                              </div>
                              <span className="font-semibold text-xs min-w-[28px]">{group.progress}%</span>
                            </div>
                          </td>
                          <td className="py-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  setSelectedGroupId(group.id);
                                  setActiveTab("workflow");
                                }}
                                className="px-2 py-1 text-[11px] font-medium bg-[var(--color-background-secondary)] border border-[var(--color-border-tertiary)] rounded-[var(--border-radius-md)] hover:text-[var(--color-text-primary)] transition cursor-pointer"
                              >
                                View Workflow
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedGroupId(group.id);
                                  setActiveTab("builder");
                                }}
                                className="px-2 py-1 text-[11px] font-medium bg-[var(--color-background-info)] border border-[var(--color-border-info)] text-[var(--color-text-info)] rounded-[var(--border-radius-md)] hover:bg-opacity-80 transition cursor-pointer"
                              >
                                + Custom Task
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Recent Submissions Log & Risk Monitor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle icon="ti-clipboard-list">Active Enforcement Alerts</CardTitle>
                </CardHeader>
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3 p-3 bg-red-950/20 border border-red-900/30 rounded-[var(--border-radius-md)]">
                    <i className="ti ti-alert-triangle text-red-400 text-lg mt-0.5" />
                    <div>
                      <div className="font-medium text-red-200 text-xs">Group Gamma: Plagiarism Threshold Warning</div>
                      <p className="text-[11px] text-red-300 mt-1">
                        Latest submission for Outline draft measured 28% similarity (Limit: &lt; 15%). Task lock applied to Proposal Defense.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-amber-950/20 border border-amber-900/30 rounded-[var(--border-radius-md)]">
                    <i className="ti ti-alert-circle text-amber-400 text-lg mt-0.5" />
                    <div>
                      <div className="font-medium text-amber-200 text-xs">Group Gamma: Milestone Overdue</div>
                      <p className="text-[11px] text-amber-300 mt-1">
                        Proposal Preparation milestone is overdue by 4 days. Progression marked as "Delayed".
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-emerald-950/20 border border-emerald-900/30 rounded-[var(--border-radius-md)]">
                    <i className="ti ti-circle-check text-emerald-400 text-lg mt-0.5" />
                    <div>
                      <div className="font-medium text-emerald-200 text-xs">Group Beta: Progression Lock Cleared</div>
                      <p className="text-[11px] text-emerald-300 mt-1">
                        Similarity Check passed successfully at 8%. Pre-defense milestone has been unlocked.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle icon="ti-history">Recent Submissions Log</CardTitle>
                </CardHeader>
                <div className="flex flex-col gap-3.5">
                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span className="font-medium">Group Alpha</span>
                      <span className="text-[var(--color-text-secondary)]">uploaded Chapter_3_Methodology_v1.pdf</span>
                    </div>
                    <span className="text-[11px] text-[var(--color-text-tertiary)]">15 mins ago</span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span className="font-medium">Group Delta</span>
                      <span className="text-[var(--color-text-secondary)]">submitted Literature Review Chapter 2</span>
                    </div>
                    <span className="text-[11px] text-[var(--color-text-tertiary)]">2 hours ago</span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="font-medium">Group Beta</span>
                      <span className="text-[var(--color-text-secondary)]">completed Similarity Check verification</span>
                    </div>
                    <span className="text-[11px] text-[var(--color-text-tertiary)]">Yesterday</span>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full" />
                      <span className="font-medium">Group Gamma</span>
                      <span className="text-[var(--color-text-secondary)]">failed Similarity Check (Outline v2)</span>
                    </div>
                    <span className="text-[11px] text-[var(--color-text-tertiary)]">3 days ago</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ─── TAB 2: RESEARCH WORKFLOW MANAGEMENT ─── */}
        {activeTab === "workflow" && (
          <div className="flex flex-col gap-6 animate-fade-in">
            <Card>
              <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle icon="ti-git-fork">Research Stage Pipeline</CardTitle>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-1">Select a group to monitor and manage their active phase transitions.</p>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-xs text-[var(--color-text-secondary)] font-medium">Select Group:</label>
                  <select
                    value={selectedGroupId}
                    onChange={(e) => setSelectedGroupId(e.target.value)}
                    className="bg-[var(--color-background-secondary)] border border-[var(--color-border-tertiary)] text-[var(--color-text-primary)] rounded-[var(--border-radius-md)] px-3 py-1.5 text-xs focus:outline-none focus:border-[var(--color-border-info)]"
                  >
                    {groups.map(g => (
                      <option key={g.id} value={g.id}>{g.name}</option>
                    ))}
                  </select>
                </div>
              </CardHeader>

              {/* Group Mini Info */}
              <div className="bg-[var(--color-background-secondary)] p-4 rounded-[var(--border-radius-md)] border border-[var(--color-border-tertiary)] mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="text-xs text-[var(--color-text-secondary)] uppercase tracking-[0.06em]">Project Title</div>
                  <h4 className="text-[13.5px] font-semibold text-[var(--color-text-primary)] mt-0.5">{activeGroup.title}</h4>
                  <div className="text-[11px] text-[var(--color-text-secondary)] mt-1 flex items-center gap-2">
                    <span>Members: {activeGroup.members.join(", ")}</span>
                    <span className="text-[var(--color-text-tertiary)]">•</span>
                    <span>Status: <span className={activeGroup.status === "delayed" ? "text-amber-400" : "text-emerald-400"}>{activeGroup.status}</span></span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => demoteGroup(activeGroup.id)}
                    disabled={activeGroup.phaseIndex === 0}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium bg-[var(--color-background-secondary)] border border-[var(--color-border-tertiary)] rounded-[var(--border-radius-md)] hover:bg-opacity-80 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i className="ti ti-arrow-left" /> Demote Phase
                  </button>
                  <button
                    onClick={() => promoteGroup(activeGroup.id)}
                    disabled={activeGroup.phaseIndex >= RESEARCH_PHASES.length - 1}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-medium bg-[var(--color-background-info)] border border-[var(--color-border-info)] text-[var(--color-text-info)] rounded-[var(--border-radius-md)] hover:bg-opacity-80 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Promote Phase <i className="ti ti-arrow-right" />
                  </button>
                </div>
              </div>

              {/* Workflow Pipeline Visualization */}
              <div className="relative py-6 px-2 overflow-x-auto">
                <div className="flex items-center justify-between min-w-[800px] relative">
                  {/* Pipeline Horizontal Line Background */}
                  <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[var(--color-border-tertiary)] -translate-y-1/2 z-0" />
                  
                  {/* Active Path colored Line */}
                  <div 
                    className="absolute top-1/2 left-0 h-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 -translate-y-1/2 z-0 transition-all duration-300"
                    style={{ width: `${(activeGroup.phaseIndex / (RESEARCH_PHASES.length - 1)) * 100}%` }}
                  />

                  {RESEARCH_PHASES.map((phase, idx) => {
                    const isCompleted = idx < activeGroup.phaseIndex;
                    const isActive = idx === activeGroup.phaseIndex;
                    const isUpcoming = idx > activeGroup.phaseIndex;

                    return (
                      <div key={idx} className="flex flex-col items-center z-10 w-24 text-center">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                            isCompleted && "bg-emerald-950 border-emerald-500 text-emerald-400",
                            isActive && "bg-blue-950 border-blue-500 text-blue-400 ring-4 ring-blue-500/20 scale-110",
                            isUpcoming && "bg-[var(--color-background-primary)] border-[var(--color-border-tertiary)] text-[var(--color-text-tertiary)]"
                          )}
                        >
                          {isCompleted ? (
                            <i className="ti ti-check text-sm font-bold" />
                          ) : (
                            <i className={cn("ti", phase.icon, "text-sm")} />
                          )}
                        </div>
                        <span className="text-[11px] font-medium text-[var(--color-text-primary)] mt-2">
                          {phase.label}
                        </span>
                        <span className="text-[9px] text-[var(--color-text-secondary)] mt-0.5">
                          {isActive ? "Active" : isCompleted ? "Complete" : "Locked"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>

            {/* Active Phase Tasks list */}
            <Card>
              <CardHeader>
                <CardTitle icon="ti-list">
                  {RESEARCH_PHASES[activeGroup.phaseIndex].name} Tasks Checklist ({activeGroup.name})
                </CardTitle>
                <span className="text-xs text-[var(--color-text-secondary)]">Milestones assigned for this specific phase</span>
              </CardHeader>

              <div className="flex flex-col gap-4">
                {activeGroup.milestones.length === 0 ? (
                  <p className="text-xs text-[var(--color-text-secondary)] italic">No milestones assigned to this phase yet.</p>
                ) : (
                  activeGroup.milestones.map((milestone) => (
                    <div key={milestone.id} className="border border-[var(--color-border-tertiary)] rounded-[var(--border-radius-md)] p-4 bg-[var(--color-background-secondary)]">
                      <div className="flex justify-between items-center border-b border-[var(--color-border-tertiary)] pb-2 mb-3">
                        <span className="font-semibold text-xs flex items-center gap-1.5">
                          <i className="ti ti-notebook text-[var(--color-text-info)]" />
                          {milestone.title}
                          {milestone.isCustom && (
                            <span className="text-[9px] bg-indigo-950 text-indigo-300 border border-indigo-900 px-1.5 py-0.5 rounded-full font-normal">
                              Custom Milestone
                            </span>
                          )}
                        </span>
                        <span className="text-[10px] text-[var(--color-text-tertiary)]">
                          {milestone.tasks.filter(t => t.completed).length} of {milestone.tasks.length} Completed
                        </span>
                      </div>

                      <div className="flex flex-col gap-2">
                        {milestone.tasks.map((task) => (
                          <div key={task.id} className="flex items-center justify-between p-2 rounded hover:bg-[var(--color-background-primary)] text-xs">
                            <div className="flex items-center gap-2.5">
                              <input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => {
                                  // Toggle task complete locally
                                  setGroups(prev =>
                                    prev.map(g => {
                                      if (g.id === activeGroup.id) {
                                        return {
                                          ...g,
                                          milestones: g.milestones.map(m => {
                                            if (m.id === milestone.id) {
                                              return {
                                                ...m,
                                                tasks: m.tasks.map(t =>
                                                  t.id === task.id ? { ...t, completed: !t.completed } : t
                                                )
                                              };
                                            }
                                            return m;
                                          })
                                        };
                                      }
                                      return g;
                                    })
                                  );
                                  showToast(`Toggled task: "${task.title}"`);
                                }}
                                className="w-3.5 h-3.5 border-[var(--color-border-secondary)] bg-[var(--color-background-secondary)] rounded cursor-pointer"
                              />
                              <span className={cn(task.completed && "line-through text-[var(--color-text-tertiary)]")}>
                                {task.title}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-[10px] text-[var(--color-text-tertiary)]">Due: {task.dueDate}</span>
                              <Tag variant={task.priority === "high" ? "danger" : task.priority === "medium" ? "warn" : "info"} size="sm">
                                {task.priority}
                              </Tag>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        )}

        {/* ─── TAB 3: BLANK-CANVAS TASK BUILDER ─── */}
        {activeTab === "builder" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
            {/* Form Section */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle icon="ti-plus">Create Custom Milestone</CardTitle>
                  <span className="text-xs text-[var(--color-text-secondary)]">Create custom deliverables and deploy them immediately.</span>
                </CardHeader>

                <div className="flex flex-col gap-4">
                  {/* Select Group & Title */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-[var(--color-text-secondary)] font-medium">Target Research Group</label>
                      <select
                        value={selectedGroupId}
                        onChange={(e) => setSelectedGroupId(e.target.value)}
                        className="bg-[var(--color-background-secondary)] border border-[var(--color-border-tertiary)] text-[var(--color-text-primary)] rounded-[var(--border-radius-md)] px-3 py-2 text-xs focus:outline-none focus:border-[var(--color-border-info)] w-full"
                      >
                        {groups.map(g => (
                          <option key={g.id} value={g.id}>{g.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs text-[var(--color-text-secondary)] font-medium">Milestone Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Ethics Clearance Submission"
                        value={newMilestoneTitle}
                        onChange={(e) => setNewMilestoneTitle(e.target.value)}
                        className="bg-[var(--color-background-secondary)] border border-[var(--color-border-tertiary)] text-[var(--color-text-primary)] rounded-[var(--border-radius-md)] px-3 py-1.5 text-xs focus:outline-none focus:border-[var(--color-border-info)] w-full"
                      />
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-[var(--color-border-tertiary)] my-2" />

                  {/* Add Subtask Area */}
                  <div className="flex flex-col gap-3 bg-[var(--color-background-secondary)] p-4 rounded-[var(--border-radius-md)] border border-[var(--color-border-tertiary)]">
                    <h5 className="font-semibold text-xs text-[var(--color-text-primary)] flex items-center gap-1.5">
                      <i className="ti ti-plus" /> Add Sub-Tasks
                    </h5>

                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] text-[var(--color-text-secondary)]">Task Title / Instruction</label>
                        <input
                          type="text"
                          placeholder="e.g., Secure Ethics form signed from Coordinator"
                          value={currTaskTitle}
                          onChange={(e) => setCurrTaskTitle(e.target.value)}
                          className="bg-[var(--color-background-primary)] border border-[var(--color-border-tertiary)] text-[var(--color-text-primary)] rounded-[var(--border-radius-md)] px-3 py-1.5 text-xs focus:outline-none focus:border-[var(--color-border-info)]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] text-[var(--color-text-secondary)]">Due Date</label>
                          <input
                            type="date"
                            value={currTaskDueDate}
                            onChange={(e) => setCurrTaskDueDate(e.target.value)}
                            className="bg-[var(--color-background-primary)] border border-[var(--color-border-tertiary)] text-[var(--color-text-primary)] rounded-[var(--border-radius-md)] px-3 py-1 text-xs focus:outline-none focus:border-[var(--color-border-info)] w-full"
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] text-[var(--color-text-secondary)]">Priority</label>
                          <select
                            value={currTaskPriority}
                            onChange={(e) => setCurrTaskPriority(e.target.value as any)}
                            className="bg-[var(--color-background-primary)] border border-[var(--color-border-tertiary)] text-[var(--color-text-primary)] rounded-[var(--border-radius-md)] px-3 py-1.5 text-xs focus:outline-none focus:border-[var(--color-border-info)] w-full"
                          >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                          </select>
                        </div>
                      </div>

                      <button
                        onClick={addBuilderTask}
                        className="mt-1 py-1.5 px-3 bg-[var(--color-background-info)] border border-[var(--color-border-info)] text-[var(--color-text-info)] text-xs rounded-[var(--border-radius-md)] hover:bg-opacity-80 transition cursor-pointer flex items-center justify-center gap-1"
                      >
                        <i className="ti ti-plus" /> Add Task to List
                      </button>
                    </div>
                  </div>

                  {/* Deploy Button */}
                  <button
                    onClick={deployCustomMilestone}
                    className="w-full mt-2 py-2 px-4 bg-[var(--color-background-success)] border border-[var(--color-border-success)] text-[var(--color-text-success)] text-xs font-semibold rounded-[var(--border-radius-md)] hover:bg-opacity-80 transition cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <i className="ti ti-send" /> Deploy Custom Milestone to Group
                  </button>
                </div>
              </Card>
            </div>

            {/* Live Preview Panel */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle icon="ti-eye">Live Canvas Preview</CardTitle>
                  <span className="text-xs text-[var(--color-text-secondary)]">Visualizing your custom milestone card</span>
                </CardHeader>

                <div className="flex-1 flex flex-col justify-between border border-dashed border-[var(--color-border-secondary)] rounded-[var(--border-radius-md)] p-4 bg-[var(--color-background-secondary)]/50 min-h-[250px]">
                  <div>
                    {/* Milestone Card Mock */}
                    <div className="border border-[var(--color-border-tertiary)] rounded-[var(--border-radius-md)] p-4 bg-[var(--color-background-primary)] shadow-sm">
                      <div className="flex justify-between items-center border-b border-[var(--color-border-tertiary)] pb-2 mb-3">
                        <span className="font-semibold text-xs text-[var(--color-text-primary)] flex items-center gap-1">
                          <i className="ti ti-notebook text-[var(--color-text-info)]" />
                          {newMilestoneTitle || "Untitled Milestone"}
                        </span>
                        <span className="text-[10px] text-[var(--color-text-secondary)] bg-indigo-950/80 px-2 py-0.5 rounded-full text-indigo-300 border border-indigo-900">
                          Custom
                        </span>
                      </div>

                      {builderTasks.length === 0 ? (
                        <p className="text-[11px] text-[var(--color-text-tertiary)] italic text-center py-6">No tasks added to this milestone yet. Use the left panel to populate tasks.</p>
                      ) : (
                        <div className="flex flex-col gap-2">
                          {builderTasks.map((t, idx) => (
                            <div key={idx} className="flex justify-between items-center p-2 rounded bg-[var(--color-background-secondary)] text-[11.5px]">
                              <span className="text-[var(--color-text-primary)] flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-text-info)]" />
                                {t.title}
                              </span>
                              <div className="flex items-center gap-2">
                                <span className="text-[10px] text-[var(--color-text-secondary)]">{t.dueDate}</span>
                                <Tag variant={t.priority === "high" ? "danger" : t.priority === "medium" ? "warn" : "info"} size="sm">
                                  {t.priority}
                                </Tag>
                                <button
                                  onClick={() => removeBuilderTask(idx)}
                                  className="text-red-400 hover:text-red-300 cursor-pointer ml-1"
                                >
                                  <i className="ti ti-trash" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Target Group Info */}
                  <div className="mt-4 pt-3 border-t border-[var(--color-border-tertiary)] text-[11px] text-[var(--color-text-secondary)]">
                    <span>Deploying to: </span>
                    <span className="font-semibold text-[var(--color-text-primary)]">{activeGroup.name}</span>
                    <p className="mt-0.5">Students will instantly receive a notification and find this custom milestone added to their active checklist.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* ─── TAB 4: MASTER PROGRESSION DEPLOYMENT & TASK-LOCKING ─── */}
        {activeTab === "locking" && (
          <div className="flex flex-col gap-6 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Locking Settings */}
              <div className="md:col-span-2 flex flex-col gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle icon="ti-lock">Master Progression & Task-Locking Rules</CardTitle>
                    <span className="text-xs text-[var(--color-text-secondary)]">Enforce linear sequence workflows and block submissions dynamically.</span>
                  </CardHeader>

                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center p-3.5 bg-[var(--color-background-secondary)] rounded-[var(--border-radius-md)] border border-[var(--color-border-tertiary)]">
                      <div className="max-w-[80%]">
                        <div className="text-xs font-semibold text-[var(--color-text-primary)]">Strict Sequential Chapters</div>
                        <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">
                          Students cannot submit Chapter 2 deliverables until Chapter 1 has been approved by the adviser.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={lockingRules.lockLitReview}
                          onChange={() => setLockingRules(prev => ({ ...prev, lockLitReview: !prev.lockLitReview }))}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600 peer-checked:after:bg-white"></div>
                      </label>
                    </div>

                    <div className="flex justify-between items-center p-3.5 bg-[var(--color-background-secondary)] rounded-[var(--border-radius-md)] border border-[var(--color-border-tertiary)]">
                      <div className="max-w-[80%]">
                        <div className="text-xs font-semibold text-[var(--color-text-primary)]">Lock Pre-Defense Registration</div>
                        <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">
                          Lock Pre-Defense application phase until Chapters 1-3 have been fully finalized and reviewed.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={lockingRules.lockPreDefense}
                          onChange={() => setLockingRules(prev => ({ ...prev, lockPreDefense: !prev.lockPreDefense }))}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600 peer-checked:after:bg-white"></div>
                      </label>
                    </div>

                    <div className="flex justify-between items-center p-3.5 bg-[var(--color-background-secondary)] rounded-[var(--border-radius-md)] border border-[var(--color-border-tertiary)]">
                      <div className="max-w-[80%]">
                        <div className="text-xs font-semibold text-[var(--color-text-primary)]">Enforce Similarity Block on Final Defense</div>
                        <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">
                          Automatically lock final defense application if Similarity Checker index exceeds 15% threshold.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={lockingRules.lockFinalDefense}
                          onChange={() => setLockingRules(prev => ({ ...prev, lockFinalDefense: !prev.lockFinalDefense }))}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600 peer-checked:after:bg-white"></div>
                      </label>
                    </div>

                    <div className="flex justify-between items-center p-3.5 bg-[var(--color-background-secondary)] rounded-[var(--border-radius-md)] border border-[var(--color-border-tertiary)]">
                      <div className="max-w-[80%]">
                        <div className="text-xs font-semibold text-[var(--color-text-primary)]">Strict Similarity checking limitation</div>
                        <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">
                          Reject manuscripts and lock grading inputs when the plagiarism system scans matches higher than 25%.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={lockingRules.maxSimilarityLimit}
                          onChange={() => setLockingRules(prev => ({ ...prev, maxSimilarityLimit: !prev.maxSimilarityLimit }))}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600 peer-checked:after:bg-white"></div>
                      </label>
                    </div>

                    <div className="flex justify-between items-center p-3.5 bg-[var(--color-background-secondary)] rounded-[var(--border-radius-md)] border border-[var(--color-border-tertiary)]">
                      <div className="max-w-[80%]">
                        <div className="text-xs font-semibold text-[var(--color-text-primary)]">Block Delayed Status Groups</div>
                        <p className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">
                          Automatically lock upload actions for groups marked with a "Delayed" progress state until adviser re-approves.
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={lockingRules.blockDelayedSubmissions}
                          onChange={() => setLockingRules(prev => ({ ...prev, blockDelayedSubmissions: !prev.blockDelayedSubmissions }))}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600 peer-checked:after:bg-white"></div>
                      </label>
                    </div>

                    <button
                      onClick={() => showToast("Task-locking rules saved successfully!")}
                      className="w-full mt-3 py-2 bg-[var(--color-background-info)] border border-[var(--color-border-info)] text-[var(--color-text-info)] text-xs font-semibold rounded-[var(--border-radius-md)] hover:bg-opacity-80 transition cursor-pointer"
                    >
                      Save & Apply Locking Rules
                    </button>
                  </div>
                </Card>
              </div>

              {/* Status Summary Column */}
              <div className="md:col-span-1 flex flex-col gap-6">
                <Card className="h-full flex flex-col justify-between">
                  <div>
                    <CardHeader>
                      <CardTitle icon="ti-shield-check">Enforcement Status</CardTitle>
                    </CardHeader>
                    <div className="flex flex-col gap-4">
                      <div className="text-xs text-[var(--color-text-secondary)]">
                        Current active rules applied across all 4 student groups.
                      </div>
                      <div className="flex flex-col gap-2.5">
                        <div className="flex items-center justify-between text-xs p-2 rounded bg-[var(--color-background-secondary)]">
                          <span>Lit Review Sequence</span>
                          <span className={lockingRules.lockLitReview ? "text-emerald-400 font-semibold" : "text-[var(--color-text-tertiary)]"}>
                            {lockingRules.lockLitReview ? "ENFORCED" : "INACTIVE"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs p-2 rounded bg-[var(--color-background-secondary)]">
                          <span>Pre-Defense Sequence</span>
                          <span className={lockingRules.lockPreDefense ? "text-emerald-400 font-semibold" : "text-[var(--color-text-tertiary)]"}>
                            {lockingRules.lockPreDefense ? "ENFORCED" : "INACTIVE"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs p-2 rounded bg-[var(--color-background-secondary)]">
                          <span>Defense Similarity</span>
                          <span className={lockingRules.lockFinalDefense ? "text-emerald-400 font-semibold" : "text-[var(--color-text-tertiary)]"}>
                            {lockingRules.lockFinalDefense ? "ENFORCED" : "INACTIVE"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs p-2 rounded bg-[var(--color-background-secondary)]">
                          <span>Plagiarism Rejection</span>
                          <span className={lockingRules.maxSimilarityLimit ? "text-emerald-400 font-semibold" : "text-[var(--color-text-tertiary)]"}>
                            {lockingRules.maxSimilarityLimit ? "ENFORCED" : "INACTIVE"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs p-2 rounded bg-[var(--color-background-secondary)]">
                          <span>Delayed Lockout</span>
                          <span className={lockingRules.blockDelayedSubmissions ? "text-emerald-400 font-semibold" : "text-[var(--color-text-tertiary)]"}>
                            {lockingRules.blockDelayedSubmissions ? "ENFORCED" : "INACTIVE"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-[var(--color-border-tertiary)] pt-3 text-[11px] text-[var(--color-text-secondary)] italic">
                    <i className="ti ti-info-circle text-[var(--color-text-info)] mr-1" />
                    Locking rules prevent student groups from submitting files out of sequence, guaranteeing academic integrity and advisor evaluation completion.
                  </div>
                </Card>
              </div>

            </div>
          </div>
        )}

        {/* ─── TAB 5: DEADLINE ENFORCEMENT ─── */}
        {activeTab === "deadlines" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fade-in">
            {/* Policy Settings Form */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle icon="ti-settings">Deadline Enforcement Policies</CardTitle>
                  <span className="text-xs text-[var(--color-text-secondary)]">Configure grade penalties, lockout rules, and grace periods.</span>
                </CardHeader>

                <div className="flex flex-col gap-5">
                  {/* Penalty Slider */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-semibold text-[var(--color-text-primary)]">Late Submission Grade Penalty</label>
                      <span className="text-xs font-bold text-[var(--color-text-danger)]">{penaltyPercent}% / Day</span>
                    </div>
                    <p className="text-[11px] text-[var(--color-text-secondary)]">
                      Percentage of the total grade deducted for every 24 hours a task is submitted late.
                    </p>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      step="1"
                      value={penaltyPercent}
                      onChange={(e) => setPenaltyPercent(Number(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  {/* Grace Period Slider */}
                  <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <label className="text-xs font-semibold text-[var(--color-text-primary)]">Grace Period Buffer</label>
                      <span className="text-xs font-bold text-[var(--color-text-info)]">{gracePeriodHours} Hours</span>
                    </div>
                    <p className="text-[11px] text-[var(--color-text-secondary)]">
                      Allowed delay window post-deadline before penalties are calculated or locks are enforced.
                    </p>
                    <input
                      type="range"
                      min="0"
                      max="72"
                      step="6"
                      value={gracePeriodHours}
                      onChange={(e) => setGracePeriodHours(Number(e.target.value))}
                      className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                  </div>

                  <div className="h-px bg-[var(--color-border-tertiary)]" />

                  {/* Hard Lock Toggle */}
                  <div className="flex justify-between items-center text-xs">
                    <div>
                      <div className="font-semibold text-[var(--color-text-primary)]">Hard Deadline Lockout</div>
                      <p className="text-[10px] text-[var(--color-text-secondary)] mt-0.5">
                        Instantly block any upload or submission actions once the grace period passes.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={hardLockout}
                        onChange={() => setHardLockout(!hardLockout)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600 peer-checked:after:bg-white"></div>
                    </label>
                  </div>

                  {/* Auto Similarity Toggle */}
                  <div className="flex justify-between items-center text-xs">
                    <div>
                      <div className="font-semibold text-[var(--color-text-primary)]">Automatic Plagiarism Scanning</div>
                      <p className="text-[10px] text-[var(--color-text-secondary)] mt-0.5">
                        Triggersimilarity check checks in the background upon every submission.
                      </p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={autoPlagiarismCheck}
                        onChange={() => setAutoPlagiarismCheck(!autoPlagiarismCheck)}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-400 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600 peer-checked:after:bg-white"></div>
                    </label>
                  </div>

                  <button
                    onClick={() => showToast("Deadline enforcement policies saved and applied!")}
                    className="w-full mt-2 py-2 bg-[var(--color-background-success)] border border-[var(--color-border-success)] text-[var(--color-text-success)] text-xs font-semibold rounded-[var(--border-radius-md)] hover:bg-opacity-80 transition cursor-pointer"
                  >
                    Save & Deploy Policies
                  </button>
                </div>
              </Card>
            </div>

            {/* Overdue Items Monitoring List */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              <Card className="h-full">
                <CardHeader>
                  <CardTitle icon="ti-alarm-clock">Upcoming & Overdue Milestones</CardTitle>
                  <span className="text-xs text-[var(--color-text-secondary)]">Tracking group delays and submission windows</span>
                </CardHeader>

                <div className="flex flex-col gap-3.5 mt-2">
                  <div className="border border-[var(--color-border-danger)]/30 rounded-[var(--border-radius-md)] p-3 bg-[var(--color-background-danger)]/5">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Tag variant="danger" size="sm">Overdue 4d</Tag>
                        <span className="font-semibold text-xs text-red-400">Group Gamma</span>
                      </div>
                      <span className="text-[10px] text-red-500 font-medium">Penalty Applied: -20%</span>
                    </div>
                    <div className="text-[11.5px] text-[var(--color-text-primary)] mt-1.5 font-medium">
                      Milestone: Proposal Preparation Draft
                    </div>
                    <div className="text-[10.5px] text-[var(--color-text-secondary)] mt-0.5">
                      Deadline: June 22, 2026, 11:59 PM (Standard Rule)
                    </div>
                  </div>

                  <div className="border border-[var(--color-border-warning)]/30 rounded-[var(--border-radius-md)] p-3 bg-[var(--color-background-warning)]/5">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Tag variant="warn" size="sm">Due in 2d</Tag>
                        <span className="font-semibold text-xs text-amber-400">Group Alpha</span>
                      </div>
                      <span className="text-[10px] text-[var(--color-text-secondary)]">Within Buffer</span>
                    </div>
                    <div className="text-[11.5px] text-[var(--color-text-primary)] mt-1.5 font-medium">
                      Milestone: Ethical Board Clearance Upload
                    </div>
                    <div className="text-[10.5px] text-[var(--color-text-secondary)] mt-0.5">
                      Deadline: June 28, 2026, 11:59 PM (Standard Rule)
                    </div>
                  </div>

                  <div className="border border-[var(--color-border-tertiary)] rounded-[var(--border-radius-md)] p-3 bg-[var(--color-background-secondary)]">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-2">
                        <Tag variant="info" size="sm">Due in 6d</Tag>
                        <span className="font-semibold text-xs text-[var(--color-text-secondary)]">Group Delta</span>
                      </div>
                      <span className="text-[10px] text-[var(--color-text-secondary)]">On Schedule</span>
                    </div>
                    <div className="text-[11.5px] text-[var(--color-text-primary)] mt-1.5 font-medium">
                      Milestone: Chapter 3 Methodology Drafting
                    </div>
                    <div className="text-[10.5px] text-[var(--color-text-secondary)] mt-0.5">
                      Deadline: July 2, 2026, 11:59 PM (Standard Rule)
                    </div>
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
