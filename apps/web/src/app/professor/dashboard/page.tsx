"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Tag } from "@/components/ui/Tag";

function ProfessorDashboardContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "overview";

  // Mock State Data
  const [studentsCount, setStudentsCount] = useState(48);
  const [projects, setProjects] = useState([
    { id: "p1", title: "AI-based Crop Yield Prediction System Using ML", group: "Group AI-CCS-01", progress: 65, status: "ongoing" },
    { id: "p2", title: "Smart Traffic Management System", group: "Group IoT-IT-03", progress: 85, status: "for defense" },
  ]);

  const [milestones, setMilestones] = useState([
    { id: "m1", title: "Ethics Certification Clear", scope: "Compliance", order: 3, locked: false },
    { id: "m2", title: "Chapter 4-5 Submission", scope: "Milestone", order: 4, locked: true },
  ]);

  const [workflowStatus, setWorkflowStatus] = useState("Active Track");
  const [deadlineAlerts, setDeadlineAlerts] = useState(3);

  // Form input controllers
  const [newMilestoneTitle, setNewMilestoneTitle] = useState("");
  const [newMilestoneScope, setNewMilestoneScope] = useState("Milestone");

  const [toast, setToast] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleCreateMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMilestoneTitle.trim()) return;
    const newM = {
      id: Math.random().toString(),
      title: newMilestoneTitle,
      scope: newMilestoneScope,
      order: milestones.length + 1,
      locked: false,
    };
    setMilestones(prev => [...prev, newM]);
    setNewMilestoneTitle("");
    triggerToast(`Custom milestone "${newM.title}" successfully created and appended.`);
  };

  const handleToggleTaskLock = (id: string, currentLock: boolean) => {
    setMilestones(prev => prev.map(m => m.id === id ? { ...m, locked: !currentLock } : m));
    triggerToast(!currentLock ? "Task access locked." : "Task access unlocked.");
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen text-slate-800 bg-slate-50 font-sans">
      
      {toast && (
        <div className="fixed top-5 right-5 z-55 bg-[#1b4264] border-l-4 border-[#ffa400] text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-3">
          <i className="ti ti-circle-check text-[#ffa400] text-lg" />
          <span className="text-[12px] font-bold">{toast}</span>
        </div>
      )}

      {/* TOPBAR */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between select-none">
        <div>
          <h1 className="text-[16px] font-extrabold text-[#1b4264]">Professor Portal</h1>
          <p className="text-[11px] text-slate-400 font-bold">Research Milestones & Task Builder</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative cursor-pointer w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-[#1b4264] border border-slate-200 hover:bg-slate-100 transition">
            <i className="ti ti-bell text-base" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#ffa400] rounded-full border border-white" />
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#1b4264] flex items-center justify-center text-[12px] font-extrabold text-white">
              AP
            </div>
            <div>
              <div className="text-[12px] font-extrabold text-[#1b4264]">Dr. Arthur Pendelton</div>
              <div className="text-[9px] text-slate-400 font-bold">Faculty Lead Coordinator</div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
        
        {activeTab === "overview" && (
          <>
            {/* EXACT PROFESSOR CARDS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#1b4264] flex items-center justify-center text-lg">
                  <i className="ti ti-users" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">Students Monitored</span>
                  <span className="text-[18px] font-extrabold text-[#1b4264]">{studentsCount} Active</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#1b4264] flex items-center justify-center text-lg">
                  <i className="ti ti-folders" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">Active Projects</span>
                  <span className="text-[18px] font-extrabold text-[#1b4264]">{projects.length} Ongoing</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#ffa400] flex items-center justify-center text-lg">
                  <i className="ti ti-plus" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">Custom Milestones</span>
                  <span className="text-[18px] font-extrabold text-[#1b4264]">{milestones.length} Tasks</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#ffa400] flex items-center justify-center text-lg">
                  <i className="ti ti-lock" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">Locked Tasks</span>
                  <span className="text-[18px] font-extrabold text-[#1b4264]">{milestones.filter(m=>m.locked).length} Locked</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#1b4264] flex items-center justify-center text-lg">
                  <i className="ti ti-adjustments" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">Research Workflow</span>
                  <span className="text-[18px] font-extrabold text-[#1b4264]">{workflowStatus}</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#ffa400] flex items-center justify-center text-lg">
                  <i className="ti ti-presentation" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">Group Progress</span>
                  <span className="text-[18px] font-extrabold text-[#ffa400]">75% Average</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#ffa400] flex items-center justify-center text-lg">
                  <i className="ti ti-circle-check" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">Project Completion</span>
                  <span className="text-[18px] font-extrabold text-[#1b4264]">2 Completed</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#1b4264] flex items-center justify-center text-lg">
                  <i className="ti ti-alarm" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">Deadline Alerts</span>
                  <span className="text-[18px] font-extrabold text-[#1b4264]">{deadlineAlerts} Active</span>
                </div>
              </div>
            </div>

            {/* Quick summaries */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
                <h3 className="font-extrabold text-[#1b4264] text-[14px]">Student Groups Progress Tracking</h3>
                <div className="flex flex-col gap-3.5">
                  {projects.map(p => (
                    <div key={p.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-[12px] shadow-sm">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-bold text-[#1b4264]">{p.group}</span>
                        <span className="font-bold text-[#ffa400]">{p.progress}%</span>
                      </div>
                      <div className="progress-bar-track">
                        <div className="progress-bar-fill" style={{ width: `${p.progress}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
                <h3 className="font-extrabold text-[#1b4264] text-[14px]">Active Blank-Canvas Task Builder</h3>
                <form onSubmit={handleCreateMilestone} className="flex flex-col gap-2.5 text-[12px]">
                  <input 
                    type="text" 
                    value={newMilestoneTitle}
                    onChange={(e)=>setNewMilestoneTitle(e.target.value)}
                    placeholder="E.g., Ethics Certification Clear..." 
                    className="bg-white border border-slate-350 rounded-lg p-2.5 focus:outline-none" 
                  />
                  <button type="submit" className="px-4 py-2 bg-[#ffa400] text-[#1b4264] font-extrabold rounded-lg border border-[#ffa400] self-start cursor-pointer shadow-sm">
                    Deploy Task
                  </button>
                </form>
              </div>
            </div>
          </>
        )}

        {/* TAB 3: BLANK-CANVAS TASK BUILDER */}
        {activeTab === "builder" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
            <h3 className="font-extrabold text-[#1b4264] text-[16px]">Blank-Canvas Task Builder</h3>
            <p className="text-[11px] text-slate-400 font-bold">Build custom research milestones and delegate requirements to selected colleges.</p>
            <form onSubmit={handleCreateMilestone} className="flex flex-col gap-3 text-[12px] mt-2">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-600">Task Title</label>
                <input required type="text" value={newMilestoneTitle} onChange={(e)=>setNewMilestoneTitle(e.target.value)} placeholder="e.g. Chapter 4 Data Visualization Outline" className="bg-white border border-slate-350 rounded-lg p-2 focus:outline-none" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-600">Task Scope</label>
                <select value={newMilestoneScope} onChange={(e)=>setNewMilestoneScope(e.target.value)} className="bg-white border border-slate-350 rounded-lg p-2 focus:outline-none">
                  <option value="Milestone">Core Milestone</option>
                  <option value="Compliance">Compliance Form</option>
                  <option value="Pre-requisite">Pre-requisite Gate</option>
                </select>
              </div>
              <button type="submit" className="px-4 py-2 bg-[#ffa400] text-[#1b4264] hover:bg-[#e09000] font-extrabold rounded-lg shadow border border-[#ffa400] self-start mt-2">
                Deploy Task
              </button>
            </form>
          </div>
        )}

        {/* TAB 5: TASK-LOCKING */}
        {activeTab === "locking" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
            <h3 className="font-extrabold text-[#1b4264] text-[16px]">Task-Locking & Milestone Constraints</h3>
            <p className="text-[11px] text-slate-400 font-bold">Enforce strict research sequence constraints by locking tasks until pre-requisite indicators are met.</p>
            <div className="flex flex-col gap-3 mt-2">
              {milestones.map(m => (
                <div key={m.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex justify-between items-center text-[12.5px] shadow-sm">
                  <div>
                    <span className="font-bold text-[#1b4264] block">{m.title}</span>
                    <span className="text-[10px] text-slate-400">Status: {m.locked ? "Locked" : "Unlocked"}</span>
                  </div>
                  <button 
                    onClick={() => handleToggleTaskLock(m.id, m.locked)}
                    className={`px-3 py-1 font-bold text-[11px] rounded border cursor-pointer ${m.locked ? 'bg-[#ffa400] text-[#1b4264] border-[#ffa400]' : 'bg-white border-slate-300 text-[#1b4264] hover:bg-slate-50'}`}
                  >
                    {m.locked ? "Unlock Task" : "Lock Task"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

    </div>
  );
}

export default function ProfessorDashboardPage() {
  return (
    <Suspense fallback={<div className="p-6 text-[#1b4264]">Loading Professor Dashboard...</div>}>
      <ProfessorDashboardContent />
    </Suspense>
  );
}
