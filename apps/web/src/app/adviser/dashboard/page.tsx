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

      {/* MAIN CONTAINER */}
      <main className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
        
        {(() => {
          const tabContent: Record<string, React.ReactNode> = {
            overview: (
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
            ),
            advisees: (
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
            ),
            reviews: (
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
            ),
            consultations: (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
                <h3 className="font-extrabold text-[#1b4264] text-[16px]">Consultation Schedule Management</h3>
                <p className="text-[11px] text-slate-400 font-bold">Monitor appointments, schedule zoom calls, and review advisor requests.</p>
                <div className="flex flex-col gap-3.5 mt-2">
                  {consultations.map(c => (
                    <div key={c.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center text-[12.5px] shadow-sm">
                      <div>
                        <span className="font-bold text-[#1b4264] block">{c.topic}</span>
                        <span className="text-[10.5px] text-slate-450">{c.groupName} · {c.date} at {c.time}</span>
                      </div>
                      <Tag variant="success">{c.mode}</Tag>
                    </div>
                  ))}
                </div>
              </div>
            ),
            progress: (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
                <h3 className="font-extrabold text-[#1b4264] text-[16px]">Research Group Progress Monitoring</h3>
                <p className="text-[11px] text-slate-400 font-bold">Oversight indicators showing project progression across all assigned advisees.</p>
                <div className="flex flex-col gap-4 mt-2">
                  {advisees.map(adv => (
                    <div key={adv.id} className="bg-slate-50 p-4 border border-slate-200 rounded-xl shadow-sm flex flex-col gap-3">
                      <div className="flex justify-between items-center text-[12px] font-extrabold text-[#1b4264]">
                        <span>{adv.groupName} · {adv.projectTitle}</span>
                        <span className="font-mono text-[#ffa400]">40% COMPLETE</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                        <div className="bg-gradient-to-r from-[#1b4264] to-[#ffa400] h-full rounded-full" style={{ width: "40%" }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ),
            approvals: (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
                <h3 className="font-extrabold text-[#1b4264] text-[16px]">Milestone Approval & Recommendation</h3>
                <p className="text-[11px] text-slate-400 font-bold">Approve core outline thresholds and issue recommendations for oral review panels.</p>
                <div className="flex flex-col gap-3 mt-2">
                  {approvals.map(a => (
                    <div key={a.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center text-[12.5px] shadow-sm">
                      <div>
                        <span className="font-bold text-[#1b4264] block">{a.groupName}</span>
                        <span className="text-[10px] text-slate-450">Target Milestone: {a.milestone}</span>
                      </div>
                      <button onClick={()=>handleApproveMilestone(a.id, a.groupName)} className="px-3.5 py-1.5 bg-[#ffa400] text-[#1b4264] font-extrabold text-[11px] rounded border border-[#ffa400] cursor-pointer">
                        Approve Milestone
                      </button>
                    </div>
                  ))}
                  {approvals.length === 0 && (
                    <div className="text-[12px] text-slate-400 font-medium text-center py-4">No pending milestone approval requests.</div>
                  )}
                </div>
              </div>
            ),
            history: (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
                <h3 className="font-extrabold text-[#1b4264] text-[16px]">Consultation History Records</h3>
                <p className="text-[11px] text-slate-400 font-bold">Access historical meeting schedules, notes, and log registries.</p>
                <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl text-[12.5px] mt-2 flex flex-col gap-2.5 shadow-sm text-slate-550">
                  <div><strong>Total Consultations Logged:</strong> 4 Sessions</div>
                  <div><strong>Average Duration:</strong> 45 minutes</div>
                  <div className="h-px bg-slate-200 my-2" />
                  <div className="text-[11.5px] font-medium flex flex-col gap-2">
                    <div>1. July 03, 2026 — Topic: Neural Network Layers (Scheduled)</div>
                    <div>2. June 20, 2026 — Topic: Dataset Cleaning & Preparation (Completed)</div>
                    <div>3. June 15, 2026 — Topic: Literature Review Framework (Completed)</div>
                  </div>
                </div>
              </div>
            ),
            conferencing: (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
                <h3 className="font-extrabold text-[#1b4264] text-[16px]">In-App Voice and Video Group Conferencing</h3>
                <p className="text-[11px] text-slate-400 font-bold">Initiate peer study room conferences or sync appointments with advisees.</p>
                <div className="bg-slate-50 p-6 border border-slate-200 rounded-xl text-center flex flex-col gap-4 shadow-sm">
                  <div className="w-16 h-16 bg-[#1b4264]/10 rounded-full flex items-center justify-center mx-auto text-[#1b4264]">
                    <i className="ti ti-video text-3xl animate-pulse" />
                  </div>
                  <div>
                    <span className="font-bold text-[#1b4264] text-[14px] block">Live Stream Channels Ready</span>
                    <span className="text-[10.5px] text-slate-400">Join call for Group AI-CCS-01 or Group IoT-IT-03</span>
                  </div>
                  <button onClick={() => triggerToast("Initializing live voice & video stream...")} className="px-4 py-2 bg-[#ffa400] text-[#1b4264] hover:bg-[#e09000] font-extrabold rounded-lg shadow border border-[#ffa400] self-center cursor-pointer transition-colors">
                    Start Stream Conference
                  </button>
                </div>
              </div>
            ),
            defense: (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
                <h3 className="font-extrabold text-[#1b4264] text-[16px]">Defense Schedule Viewing</h3>
                <p className="text-[11px] text-slate-400 font-bold">Review defense panel timings, assignees, and digital venues.</p>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-[12.5px] flex flex-col gap-2 mt-2 shadow-sm">
                  <div className="flex justify-between items-center">
                    <span className="font-extrabold text-[#1b4264] text-[14px]">AI Crop Yield Prediction System ML</span>
                    <Tag variant="warn">Proposal Defense</Tag>
                  </div>
                  <div className="text-slate-500 font-medium">
                    <div><strong>Date / Time:</strong> 2026-07-10 at 10:00 AM</div>
                    <div><strong>Venue:</strong> CCS Seminar Hall</div>
                  </div>
                </div>
              </div>
            ),
            settings: (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
                <h3 className="font-extrabold text-[#1b4264] text-[16px]">Portal Settings</h3>
                <p className="text-[11px] text-slate-400 font-bold">Manage your notification channels, authentication credentials, and user preferences.</p>
                <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl text-[12.5px] mt-2 flex flex-col gap-4 shadow-sm">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                    <div>
                      <span className="font-bold text-[#1b4264] block">Email Notifications</span>
                      <span className="text-[10px] text-slate-400">Receive system notifications via email address.</span>
                    </div>
                    <input type="checkbox" defaultChecked className="accent-[#ffa400] w-4 h-4 cursor-pointer" />
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-bold text-[#1b4264] block">Dark Mode</span>
                      <span className="text-[10px] text-slate-400">Switch platform styling theme to night vision.</span>
                    </div>
                    <input type="checkbox" className="accent-[#ffa400] w-4 h-4 cursor-pointer" />
                  </div>
                </div>
              </div>
            ),
          };

          return tabContent[activeTab] || tabContent.overview;
        })()}

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
