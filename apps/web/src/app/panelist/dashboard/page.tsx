"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Tag } from "@/components/ui/Tag";

function PanelistDashboardContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "overview";

  // Mock State Data
  const [schedules, setSchedules] = useState([
    { id: "d1", title: "AI Crop Yield Prediction System Using ML", type: "Proposal Defense", date: "2026-07-10", time: "10:00 AM", venue: "CCS Seminar Hall" },
    { id: "d2", title: "Smart Traffic Management System", type: "Final Defense", date: "2026-07-12", time: "02:00 PM", venue: "CCS Webex B" },
  ]);

  const [documents, setDocuments] = useState([
    { id: "doc1", title: "AI Crop Yield Prediction Chapter 1-3 v2.1", group: "Group AI-CCS-01", status: "Ready for scoring" },
    { id: "doc2", title: "Smart Traffic Management Final Review v1", group: "Group IoT-IT-03", status: "Needs review" },
  ]);

  const [evaluations, setEvaluations] = useState([
    { id: "e1", title: "AI Crop Yield Prediction (Proposal)", status: "pending", score: 0, recommendations: "" },
    { id: "e2", title: "Smart Traffic Management (Final)", status: "pending", score: 0, recommendations: "" },
  ]);

  const [gradesSubmitted, setGradesSubmitted] = useState([
    { id: "g1", title: "Blockchain Credential Verification", score: 92, status: "submitted" },
  ]);

  const [notifications, setNotifications] = useState([
    { id: "n1", msg: "New defense panel assigned for Group IoT-IT-03 on July 12", date: "1 day ago" },
  ]);

  const [activeScore, setActiveScore] = useState<number>(85);
  const [activeRecs, setActiveRecs] = useState<string>("");
  const [toast, setToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSubmitEvaluation = (id: string, title: string) => {
    setEvaluations(prev => prev.filter(e => e.id !== id));
    setGradesSubmitted(prev => [...prev, { id, title, score: activeScore, status: "submitted" }]);
    triggerToast(`Scoring and grades submitted for ${title}`);
    setActiveRecs("");
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
          <h1 className="text-[16px] font-extrabold text-[#1b4264]">Panelist Portal</h1>
          <p className="text-[11px] text-slate-400 font-bold">Research Evaluation Panel</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative cursor-pointer w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-[#1b4264] border border-slate-200 hover:bg-slate-100 transition">
            <i className="ti ti-bell text-base" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#ffa400] rounded-full border border-white" />
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#1b4264] flex items-center justify-center text-[12px] font-extrabold text-white">
              LW
            </div>
            <div>
              <div className="text-[12px] font-extrabold text-[#1b4264]">Dr. Lisa Wong</div>
              <div className="text-[9px] text-slate-400 font-bold">Research Panelist</div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
        
        {activeTab === "overview" && (
          <>
            {/* EXACT PANELIST CARDS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#1b4264] flex items-center justify-center text-lg">
                  <i className="ti ti-calendar" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">Assigned Defense Schedules</span>
                  <span className="text-[18px] font-extrabold text-[#1b4264]">{schedules.length} Panels</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#ffa400] flex items-center justify-center text-lg">
                  <i className="ti ti-file-text" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">Submitted Research Docs</span>
                  <span className="text-[18px] font-extrabold text-[#1b4264]">{documents.length} Files</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#ffa400] flex items-center justify-center text-lg">
                  <i className="ti ti-stars" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">Pending Evaluation Sheets</span>
                  <span className="text-[18px] font-extrabold text-[#1b4264]">{evaluations.length} Pending</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#1b4264] flex items-center justify-center text-lg">
                  <i className="ti ti-circle-check" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">Grades Submitted</span>
                  <span className="text-[18px] font-extrabold text-[#1b4264]">{gradesSubmitted.length} Grades</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#ffa400] flex items-center justify-center text-lg">
                  <i className="ti ti-thumb-up" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">Recommendations Submitted</span>
                  <span className="text-[18px] font-extrabold text-[#1b4264]">{gradesSubmitted.length} Recs</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#ffa400] flex items-center justify-center text-lg">
                  <i className="ti ti-history" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">Historical Records</span>
                  <span className="text-[18px] font-extrabold text-[#ffa400]">12 Past</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#1b4264] flex items-center justify-center text-lg">
                  <i className="ti ti-bell" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">Notifications</span>
                  <span className="text-[18px] font-extrabold text-[#1b4264]">{notifications.length} Alerts</span>
                </div>
              </div>
            </div>

            {/* Quick summaries */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
                <h3 className="font-extrabold text-[#1b4264] text-[14px]">Assigned Defense Schedules</h3>
                <div className="flex flex-col gap-2.5">
                  {schedules.map(s => (
                    <div key={s.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded text-[12px] flex justify-between items-center shadow-sm">
                      <div>
                        <span className="font-bold text-[#1b4264] block">{s.title}</span>
                        <span className="text-[10px] text-slate-450">{s.date} · {s.time} ({s.venue})</span>
                      </div>
                      <Tag variant="warn">{s.type}</Tag>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
                <h3 className="font-extrabold text-[#1b4264] text-[14px]">Pending Digital Evaluations</h3>
                <div className="flex flex-col gap-2.5">
                  {evaluations.map(e => (
                    <div key={e.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded text-[12px] flex justify-between items-center shadow-sm">
                      <span>{e.title}</span>
                      <button onClick={()=>triggerToast("Opening evaluation rubric sheet.")} className="px-2.5 py-1 bg-[#ffa400] text-[#1b4264] font-extrabold text-[10px] rounded border border-[#ffa400] cursor-pointer">
                        Evaluate
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* TAB 4: DIGITAL EVALUATIONS */}
        {activeTab === "evaluation" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
            <h3 className="font-extrabold text-[#1b4264] text-[16px]">Digital Evaluation & Scoring Sheets</h3>
            <p className="text-[11px] text-slate-400 font-bold">Input institutional rubric scores, grade points, and panel recommendations.</p>
            {evaluations.map(e => (
              <div key={e.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col gap-3 text-[12.5px] shadow-sm">
                <div className="font-bold text-[#1b4264] text-[13.5px] border-b border-slate-150 pb-2">{e.title}</div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-slate-600">Overall Grade / Score (1-100)</label>
                    <input 
                      type="number" 
                      value={activeScore}
                      onChange={(e)=>setActiveScore(Number(e.target.value))}
                      placeholder="e.g. 90" 
                      className="bg-white border border-slate-350 rounded-lg p-2 focus:outline-none" 
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-slate-600">Recommendations</label>
                    <input 
                      type="text" 
                      value={activeRecs}
                      onChange={(e)=>setActiveRecs(e.target.value)}
                      placeholder="e.g. Recommended for final clearance with revisions" 
                      className="bg-white border border-slate-350 rounded-lg p-2 focus:outline-none" 
                    />
                  </div>
                </div>
                <button 
                  onClick={() => handleSubmitEvaluation(e.id, e.title)}
                  className="px-4 py-2 bg-[#ffa400] text-[#1b4264] font-extrabold rounded-lg border border-[#ffa400] self-start mt-2"
                >
                  Submit Scores & Grades
                </button>
              </div>
            ))}
          </div>
        )}

      </main>

    </div>
  );
}

export default function PanelistDashboardPage() {
  return (
    <Suspense fallback={<div className="p-6 text-[#1b4264]">Loading Panelist Dashboard...</div>}>
      <PanelistDashboardContent />
    </Suspense>
  );
}
