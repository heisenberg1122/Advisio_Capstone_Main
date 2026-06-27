"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Tag } from "@/components/ui/Tag";

function AdviserDashboardContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "overview";

  // Mock State Data
  const [advisees, setAdvisees] = useState([
    { id: "g1", groupName: "Group AI-CCS-01", projectTitle: "AI Crop Yield Prediction System Using ML", leader: "Juan Reyes", status: "active" },
    { id: "g2", groupName: "Group IoT-IT-03", projectTitle: "Smart Traffic Management System", leader: "Lando Vance", status: "active" },
  ]);

  const [reviews, setReviews] = useState([
    { id: "r1", groupName: "Group AI-CCS-01", docName: "Chapter 1-3 Review Draft v2.1", milestone: "Draft Submission", date: "2026-06-27", comments: [] },
  ]);

  const [consultations, setConsultations] = useState([
    { id: "c1", groupName: "Group AI-CCS-01", topic: "Methodology & Neural Network Architecture", date: "2026-07-03", time: "10:00 AM", mode: "Video Call", status: "scheduled" },
  ]);

  const [approvals, setApprovals] = useState([
    { id: "a1", groupName: "Group AI-CCS-01", milestone: "Proposal Outline Upload", date: "2026-06-25", status: "pending" },
    { id: "a2", groupName: "Group IoT-IT-03", milestone: "Chapter 1-3 Final Draft", date: "2026-06-28", status: "pending" },
  ]);

  const [notifications, setNotifications] = useState([
    { id: "n1", msg: "Marc Santos uploaded Chapter 1-3 Review Draft v2.1", date: "2 hours ago" },
    { id: "n2", msg: "Lando Vance requested a consultation for July 5", date: "4 hours ago" },
  ]);

  const [commentInput, setCommentInput] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleApproveMilestone = (id: string, groupName: string) => {
    setApprovals(prev => prev.filter(a => a.id !== id));
    triggerToast(`Approved milestone milestone for ${groupName}`);
  };

  const handleReviewComment = (reviewId: string) => {
    if (!commentInput.trim()) return;
    triggerToast("Comment submitted successfully.");
    setCommentInput("");
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
          <h1 className="text-[16px] font-extrabold text-[#1b4264]">Adviser Portal</h1>
          <p className="text-[11px] text-slate-400 font-bold">Research Group Advising Oversight</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative cursor-pointer w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-[#1b4264] border border-slate-200 hover:bg-slate-100 transition">
            <i className="ti ti-bell text-base" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#ffa400] rounded-full border border-white" />
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#1b4264] flex items-center justify-center text-[12px] font-extrabold text-white">
              RL
            </div>
            <div>
              <div className="text-[12px] font-extrabold text-[#1b4264]">Dr. Rachel Lim</div>
              <div className="text-[9px] text-slate-400 font-bold">Faculty Research Adviser</div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
        
        {activeTab === "overview" && (
          <>
            {/* EXACT ADVISER CARDS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#1b4264] flex items-center justify-center text-lg">
                  <i className="ti ti-users" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">Assigned Advisees</span>
                  <span className="text-[18px] font-extrabold text-[#1b4264]">{advisees.length} Groups</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#ffa400] flex items-center justify-center text-lg">
                  <i className="ti ti-file-text" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">Pending Reviews</span>
                  <span className="text-[18px] font-extrabold text-[#1b4264]">{reviews.length} Documents</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#1b4264] flex items-center justify-center text-lg">
                  <i className="ti ti-calendar" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">Scheduled Consults</span>
                  <span className="text-[18px] font-extrabold text-[#1b4264]">{consultations.length} Meetings</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#1b4264] flex items-center justify-center text-lg">
                  <i className="ti ti-presentation" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">Groups Monitored</span>
                  <span className="text-[18px] font-extrabold text-[#1b4264]">{advisees.length} Active</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#ffa400] flex items-center justify-center text-lg">
                  <i className="ti ti-circle-check" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">Milestones for Approval</span>
                  <span className="text-[18px] font-extrabold text-[#1b4264]">{approvals.length} Milestones</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#ffa400] flex items-center justify-center text-lg">
                  <i className="ti ti-history" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">Recent Consultations</span>
                  <span className="text-[18px] font-extrabold text-[#ffa400]">4 Records</span>
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
                <h3 className="font-extrabold text-[#1b4264] text-[14px]">Pending Milestone Approvals</h3>
                <div className="flex flex-col gap-2.5">
                  {approvals.map(a => (
                    <div key={a.id} className="flex justify-between items-center p-2.5 bg-slate-50 border border-slate-200 rounded text-[12px]">
                      <div>
                        <span className="font-bold text-[#1b4264] block">{a.groupName}</span>
                        <span className="text-[10px] text-slate-450">{a.milestone}</span>
                      </div>
                      <button onClick={()=>handleApproveMilestone(a.id, a.groupName)} className="px-2.5 py-1 bg-[#ffa400] text-[#1b4264] font-extrabold text-[10px] rounded border border-[#ffa400] cursor-pointer">
                        Approve
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
                <h3 className="font-extrabold text-[#1b4264] text-[14px]">Upcoming Scheduled Consultations</h3>
                <div className="flex flex-col gap-2.5">
                  {consultations.map(c => (
                    <div key={c.id} className="p-2.5 bg-slate-50 border border-slate-200 rounded text-[12px] flex justify-between items-center">
                      <div>
                        <span className="font-bold text-slate-800 block">{c.topic}</span>
                        <span className="text-[10px] text-slate-400">{c.groupName} · {c.time}</span>
                      </div>
                      <Tag variant="success">{c.mode}</Tag>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* TAB 2: ASSIGNED ADVISEES */}
        {activeTab === "advisees" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
            <h3 className="font-extrabold text-[#1b4264] text-[16px]">Assigned Advisees</h3>
            <p className="text-[11px] text-slate-400 font-bold">List of research student groups under your advisory monitoring panel.</p>
            <div className="flex flex-col gap-3 mt-2">
              {advisees.map(adv => (
                <div key={adv.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center text-[12.5px] shadow-sm">
                  <div>
                    <span className="font-bold text-[#1b4264] block">{adv.groupName}</span>
                    <span className="text-[11px] text-slate-500">{adv.projectTitle} · Representative: {adv.leader}</span>
                  </div>
                  <Tag variant="success">{adv.status}</Tag>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: DOCUMENT REVIEW */}
        {activeTab === "reviews" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
            <h3 className="font-extrabold text-[#1b4264] text-[16px]">Research Document Review & Commenting</h3>
            <p className="text-[11px] text-slate-400 font-bold">Review draft submissions, download version history, and submit comments.</p>
            {reviews.map(rev => (
              <div key={rev.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col gap-3 text-[12.5px] shadow-sm">
                <div className="flex justify-between items-center border-b border-slate-150 pb-2">
                  <div>
                    <span className="font-bold text-[#1b4264] block">{rev.docName}</span>
                    <span className="text-[10px] text-slate-400">{rev.groupName} · {rev.milestone}</span>
                  </div>
                  <button onClick={()=>triggerToast("Downloading draft files.")} className="text-[#ffa400] font-bold hover:underline cursor-pointer">
                    Download File
                  </button>
                </div>
                <div className="flex flex-col gap-1.5 mt-1">
                  <label className="font-bold text-slate-600 text-[11px]">Submit Review Comments</label>
                  <textarea 
                    value={commentInput} 
                    onChange={(e)=>setCommentInput(e.target.value)} 
                    placeholder="Provide detailed feedback comments..." 
                    className="bg-white border border-slate-350 rounded-lg p-2.5 text-[12px] focus:outline-none" 
                  />
                  <button onClick={()=>handleReviewComment(rev.id)} className="px-4 py-2 bg-[#ffa400] text-[#1b4264] font-extrabold rounded-lg border border-[#ffa400] self-start mt-2">
                    Submit Comments
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

    </div>
  );
}

export default function AdviserDashboardPage() {
  return (
    <Suspense fallback={<div className="p-6 text-[#1b4264]">Loading Adviser Dashboard...</div>}>
      <AdviserDashboardContent />
    </Suspense>
  );
}
