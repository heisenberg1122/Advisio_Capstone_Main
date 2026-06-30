"use client";

import React, { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Tag } from "@/components/ui/Tag";
import { StudentGroupChats } from "@/components/dashboards/student/StudentGroupChats";
import { StudentWorkspace } from "@/components/dashboards/student/StudentWorkspace";
import { getChatStore } from "@/lib/chat-store";

function StudentDashboardContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "overview";

  // Mock State Data
  const [group, setGroup] = useState({
    name: "Group AI-CCS-01",
    projectTitle: "AI-based Crop Yield Prediction System Using ML",
    members: ["Juan Reyes", "Marc Santos", "Sarah Garcia"],
    status: "active",
  });

  const [aiMatches, setAiMatches] = useState([
    { name: "Dr. Rachel Lim", match: 98, expertise: "Machine Learning, Neural Networks", status: "Available" },
    { name: "Dr. Lisa Wong", match: 85, expertise: "Computer Vision, Data Analytics", status: "Available" },
    { name: "Prof. Arthur Pendleton", match: 72, expertise: "Big Data Systems, Cloud Tech", status: "Busy" },
  ]);

  const [submissions, setSubmissions] = useState([
    { id: "s1", docName: "Proposal Draft Outline v1", milestone: "Proposal Outline", date: "2026-06-25", version: "v1.0", status: "approved" },
    { id: "s2", docName: "Chapter 1-3 Review Draft v2", milestone: "Draft Submission", date: "2026-06-27", version: "v2.1", status: "pending" },
  ]);

  const [workspaceSubmissions, setWorkspaceSubmissions] = useState<any[]>([]);

  useEffect(() => {
    const syncSubmissions = () => {
      const stored = localStorage.getItem("advisio_student_submissions");
      if (stored) {
        try {
          setWorkspaceSubmissions(JSON.parse(stored));
        } catch (e) {}
      }
    };
    syncSubmissions();
    window.addEventListener("storage", syncSubmissions);
    return () => window.removeEventListener("storage", syncSubmissions);
  }, []);

  const combinedSubmissions = [...workspaceSubmissions, ...submissions];

  const [consultations, setConsultations] = useState([
    { id: "c1", topic: "Methodology & Neural Network Architecture", date: "2026-07-03", time: "10:00 AM", mode: "Video Call", status: "pending" },
    { id: "c2", topic: "Introduction Outline Review", date: "2026-06-24", time: "02:00 PM", mode: "In-Person (CL3)", status: "completed" },
  ]);

  const [milestones, setMilestones] = useState([
    { id: "m1", title: "Proposal Outline Selection", status: "completed", date: "2026-06-20" },
    { id: "m2", title: "Chapter 1-3 Submission", status: "in-progress", date: "2026-07-15" },
    { id: "m3", title: "Ethics Clearance Review", status: "upcoming", date: "2026-07-30" },
    { id: "m4", title: "Pre-Defense Presentation", status: "upcoming", date: "2026-08-15" },
    { id: "m5", title: "Final Oral Defense", status: "upcoming", date: "2026-09-10" },
  ]);

  const [defenses, setDefenses] = useState([
    { id: "d1", title: "AI Crop Yield Prediction System", type: "Proposal Defense", date: "2026-07-10", time: "10:00 AM", venue: "CCS Seminar Hall", panelists: ["Dr. Lisa Wong", "Prof. A. Pendleton"] },
  ]);

  const [notifications, setNotifications] = useState([
    { id: "n1", msg: "Dr. Rachel Lim approved your outline version v1.0", date: "June 25, 2026", type: "system" },
    { id: "n2", msg: "Institutional Ethics Deadline scheduled for July 30", date: "June 24, 2026", type: "announcement" },
  ]);

  const [chatStoreNotifications, setChatStoreNotifications] = useState<any[]>([]);

  useEffect(() => {
    const syncNotifs = () => {
      const store = getChatStore();
      const userNotifs = store.notifications.filter(
        n => n.userId === "juan.reyes@university.edu.ph"
      );
      setChatStoreNotifications(userNotifs);
    };
    syncNotifs();
    window.addEventListener("storage", syncNotifs);
    return () => window.removeEventListener("storage", syncNotifs);
  }, []);

  const combinedNotifications = [
    ...chatStoreNotifications.map(n => ({ id: n.id, msg: n.msg, date: n.date || "Just now", type: "system" })),
    ...notifications
  ];

  // Form input controllers
  const [topicInput, setTopicInput] = useState("");
  const [uploadMilestone, setUploadMilestone] = useState("Draft Submission");
  const [uploadFileName, setUploadFileName] = useState("");
  const [consultTopic, setConsultTopic] = useState("");
  const [consultDate, setConsultDate] = useState("");
  const [consultTime, setConsultTime] = useState("");
  const [consultMode, setConsultMode] = useState("Video Call");

  // Modals state
  const [modalCert, setModalCert] = useState(false);
  const [modalJoinConferencing, setModalJoinConferencing] = useState(false);

  const [toast, setToast] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleUploadDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFileName) return;
    const newDoc = {
      id: Math.random().toString(),
      docName: uploadFileName,
      milestone: uploadMilestone,
      date: new Date().toISOString().split("T")[0],
      version: `v${(submissions.length + 1).toFixed(1)}`,
      status: "pending",
    };
    setSubmissions(prev => [newDoc, ...prev]);
    setUploadFileName("");
    triggerToast(`Submitted ${newDoc.docName} for verification.`);
  };

  const handleRequestConsult = (e: React.FormEvent) => {
    e.preventDefault();
    const newConsult = {
      id: Math.random().toString(),
      topic: consultTopic,
      date: consultDate,
      time: consultTime,
      mode: consultMode,
      status: "pending",
    };
    setConsultations(prev => [newConsult, ...prev]);
    setConsultTopic("");
    setConsultDate("");
    setConsultTime("");
    triggerToast("Sent consultation appointment request to Dr. Rachel Lim.");
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
          const tabTitles: Record<string, string> = {
            overview: "Student Dashboard",
            group: "Research Group Management",
            milestones: "Project Milestones",
            progress: "Progress Tracking",
            submission: "Research Document Submission",
            "version-control": "Document Version Control",
            "adviser-credentials": "Adviser Credentials Hub",
            "ai-recommendation": "AI Adviser Recommendation",
            "consultation-requests": "Consultation Requests",
            "consultation-repo": "Consultation Repository",
            conferencing: "Group Conferencing",
            defense: "Defense Schedule",
            certificates: "Certificates of Completion",
            settings: "Settings",
            profile: "My Profile",
            notifications: "Notifications",
          };

          const tabContent: Record<string, React.ReactNode> = {
            overview: (
              <>
                {/* EXACT STUDENT CARDS */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#1b4264] flex items-center justify-center text-lg">
                      <i className="ti ti-users" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">Research Group Status</span>
                      <span className="text-[15px] font-extrabold text-[#1b4264]">{group.name} ({group.status})</span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#ffa400] flex items-center justify-center text-lg">
                      <i className="ti ti-brain" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">Adviser Recs</span>
                      <span className="text-[15px] font-extrabold text-[#1b4264]">{aiMatches[0].name} (98%)</span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#1b4264] flex items-center justify-center text-lg">
                      <i className="ti ti-file-text" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">Submitted Documents</span>
                      <span className="text-[15px] font-extrabold text-[#1b4264]">{combinedSubmissions.length} Uploads</span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#ffa400] flex items-center justify-center text-lg">
                      <i className="ti ti-calendar-event" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">Pending Consults</span>
                      <span className="text-[15px] font-extrabold text-[#1b4264]">{consultations.filter(c=>c.status==='pending').length} Requested</span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-2.5 justify-center min-h-[72px]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#1b4264] flex items-center justify-center text-lg flex-shrink-0">
                        <i className="ti ti-target" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold leading-none">Milestone Progress</span>
                        <span className="text-[14.5px] font-extrabold text-[#1b4264] mt-1.5 block leading-none">20% Complete</span>
                      </div>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200/50">
                      <div 
                        className="bg-gradient-to-r from-[#1b4264] to-[#ffa400] h-full rounded-full transition-all duration-500 ease-out animate-pulse" 
                        style={{ width: "20%" }} 
                      />
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#ffa400] flex items-center justify-center text-lg">
                      <i className="ti ti-calendar" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">Defense Schedule</span>
                      <span className="text-[15px] font-extrabold text-[#1b4264]">July 10, 2026</span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#ffa400] flex items-center justify-center text-lg">
                      <i className="ti ti-certificate" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">Certificate Status</span>
                      <span className="text-[15px] font-extrabold text-[#1b4264]">Locked (Pending Oral)</span>
                    </div>
                  </div>
                </div>

                {/* Quick Summary View */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
                    <h3 className="font-extrabold text-[#1b4264] text-[14px]">Active Study Information</h3>
                    <div className="text-[12px] text-slate-650 flex flex-col gap-2">
                      <div><strong>Title:</strong> {group.projectTitle}</div>
                      <div><strong>Represented Group:</strong> {group.members.join(", ")}</div>
                      <div><strong>Official Adviser:</strong> Dr. Rachel Lim</div>
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-3">
                    <h3 className="font-extrabold text-[#1b4264] text-[14px]">Upcoming Milestones</h3>
                    <div className="flex flex-col gap-2.5">
                      {milestones.slice(0, 3).map(m => (
                        <div key={m.id} className="flex justify-between items-center text-[12.5px] p-2 bg-slate-50 border border-slate-200 rounded">
                          <span className="font-bold text-[#1b4264]">{m.title}</span>
                          <Tag variant={m.status==='completed'?'success':m.status==='in-progress'?'warn':'info'}>{m.status}</Tag>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            ),
            profile: (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
                <h3 className="font-extrabold text-[#1b4264] text-[16px]">Student profile Info</h3>
                <p className="text-[11px] text-slate-400 font-bold">Edit your student representative details, institutional identity cards, and department classifications.</p>
                <div className="flex flex-col gap-3 mt-2 text-[12px]">
                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-slate-600">Student Name</label>
                    <input type="text" readOnly value="Juan Reyes" className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-slate-600">Represented Department</label>
                    <input type="text" readOnly value="College of Computer Studies" className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-slate-600">Student ID Number</label>
                    <input type="text" readOnly value="2023-10045" className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none" />
                  </div>
                </div>
              </div>
            ),
            group: (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
                <h3 className="font-extrabold text-[#1b4264] text-[16px]">Research Group Management</h3>
                <p className="text-[11px] text-slate-400 font-bold">Organize peer study divisions, invitation codes, and collaborative assignments.</p>
                <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl text-[12.5px] mt-2 flex flex-col gap-2 shadow-sm">
                  <div className="font-bold text-[#1b4264]">Group Identifier: {group.name}</div>
                  <div><strong>Active Title:</strong> {group.projectTitle}</div>
                  <div><strong>Group Members:</strong> {group.members.join(", ")}</div>
                </div>
              </div>
            ),
            "adviser-credentials": (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
                <h3 className="font-extrabold text-[#1b4264] text-[16px]">Adviser Credentials Hub</h3>
                <p className="text-[11px] text-slate-400 font-bold">View faculty profiles, research expertise indices, and verified publication records.</p>
                <div className="flex flex-col gap-3.5 mt-2">
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center text-[12.5px] shadow-sm">
                    <div>
                      <span className="font-extrabold text-[#1b4264] block">Dr. Rachel Lim</span>
                      <span className="text-[11px] text-slate-500">Expertise: Machine Learning, Computer Vision, Neural Nets</span>
                    </div>
                    <Tag variant="success">Available</Tag>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center text-[12.5px] shadow-sm">
                    <div>
                      <span className="font-extrabold text-[#1b4264] block">Dr. Lisa Wong</span>
                      <span className="text-[11px] text-slate-500">Expertise: Data Infrastructures, Cryptographic Security Systems</span>
                    </div>
                    <Tag variant="success">Available</Tag>
                  </div>
                </div>
              </div>
            ),
            "ai-recommendation": (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
                <h3 className="font-extrabold text-[#1b4264] text-[16px]">AI Adviser Recommendation</h3>
                <p className="text-[11px] text-slate-400 font-bold">Generate optimized matches based on topic alignment algorithms.</p>
                <div className="flex flex-col gap-3.5 mt-2 text-[12px]">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={topicInput}
                      onChange={(e)=>setTopicInput(e.target.value)}
                      placeholder="Enter your research keywords (e.g., Computer Vision, CNN)..." 
                      className="bg-white border border-slate-350 rounded-lg p-2.5 flex-1 focus:outline-none focus:border-[#ffa400]" 
                    />
                    <button 
                      onClick={() => triggerToast("Generated matches successfully.")} 
                      className="px-4 py-2 bg-[#ffa400] text-[#1b4264] hover:bg-[#e09000] font-extrabold rounded-lg shadow-md border border-[#ffa400]"
                    >
                      Find Match
                    </button>
                  </div>
                  <div className="flex flex-col gap-2 mt-2">
                    {aiMatches.map(m => (
                      <div key={m.name} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex justify-between items-center shadow-sm">
                        <div>
                          <span className="font-bold text-[#1b4264]">{m.name}</span>
                        </div>
                        <span className="font-mono text-[#ffa400] font-extrabold text-[12px]">{m.match} match</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ),
            conferencing: (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
                <h3 className="font-extrabold text-[#1b4264] text-[16px]">In-App Voice and Video Group Conferencing</h3>
                <p className="text-[11px] text-slate-400 font-bold">Coordinate with peers and advisers using localized sandbox stream channels.</p>
                <div className="bg-slate-50 p-6 border border-slate-200 rounded-xl text-center flex flex-col gap-4 shadow-sm">
                  <div className="w-16 h-16 bg-[#1b4264]/10 rounded-full flex items-center justify-center mx-auto text-[#1b4264]">
                    <i className="ti ti-video text-3xl animate-pulse" />
                  </div>
                  <div>
                    <span className="font-bold text-[#1b4264] text-[14px] block">Live Stream Channel Available</span>
                    <span className="text-[10.5px] text-slate-400">Current Room ID: <strong>Group AI-CCS-01</strong></span>
                  </div>
                  <button 
                    onClick={() => setModalJoinConferencing(true)} 
                    className="px-4 py-2 bg-[#ffa400] text-[#1b4264] hover:bg-[#e09000] font-extrabold rounded-lg shadow border border-[#ffa400] self-center cursor-pointer transition-colors"
                  >
                    Join Channel Stream
                  </button>
                </div>
              </div>
            ),
            submission: (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
                <h3 className="font-extrabold text-[#1b4264] text-[16px]">Research Document Submission</h3>
                <p className="text-[11px] text-slate-400 font-bold">Upload draft files and outline scopes directly to assigned reviewers.</p>
                <form onSubmit={handleUploadDoc} className="flex flex-col gap-3 mt-2 text-[12px]">
                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-slate-600">Select Document Type</label>
                    <select value={uploadMilestone} onChange={(e)=>setUploadMilestone(e.target.value)} className="bg-white border border-slate-350 rounded-lg p-2.5 focus:outline-none">
                      <option value="Proposal Outline">Proposal Outline</option>
                      <option value="Draft Submission">Chapter 1-3 Review Draft</option>
                      <option value="Ethics Application">Ethics Application Forms</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-slate-600">Document Name</label>
                    <input required type="text" value={uploadFileName} onChange={(e)=>setUploadFileName(e.target.value)} className="bg-white border border-slate-350 rounded-lg p-2.5 focus:outline-none" />
                  </div>
                  <button type="submit" className="px-4 py-2 bg-[#ffa400] text-[#1b4264] hover:bg-[#e09000] font-extrabold rounded-lg shadow border border-[#ffa400] self-start mt-2">
                    Submit Draft
                  </button>
                </form>
              </div>
            ),
            "version-control": (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
                <h3 className="font-extrabold text-[#1b4264] text-[16px]">Document Version Control</h3>
                <p className="text-[11px] text-slate-400 font-bold">Monitor historical draft changes, track comments, and compare version indexes.</p>
                <div className="flex flex-col gap-3.5 mt-2">
                  {combinedSubmissions.map(sub => (
                    <div key={sub.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex justify-between items-center text-[12.5px] shadow-sm">
                      <div>
                        <span className="font-bold text-[#1b4264] block">{sub.docName}</span>
                        <span className="text-[10px] text-slate-400">Version: {sub.version} · Date: {sub.date}</span>
                      </div>
                      <Tag variant={sub.status === "approved" ? "success" : "warn"}>{sub.status}</Tag>
                    </div>
                  ))}
                </div>
              </div>
            ),
            milestones: (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
                <h3 className="font-extrabold text-[#1b4264] text-[16px]">Project Milestones</h3>
                <p className="text-[11px] text-slate-400 font-bold">View sequence boundaries, check tasks list, and monitor lock states.</p>
                <div className="flex flex-col gap-2.5 mt-2">
                  {milestones.map(m => (
                    <div key={m.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex justify-between items-center text-[12.5px] shadow-sm">
                      <div>
                        <span className="font-bold text-[#1b4264] block">{m.title}</span>
                      </div>
                      <Tag variant={m.status === 'completed' ? 'success' : m.status === 'in-progress' ? 'warn' : 'info'}>{m.status}</Tag>
                    </div>
                  ))}
                </div>
              </div>
            ),
            "consultation-requests": (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
                <h3 className="font-extrabold text-[#1b4264] text-[16px]">Consultation Requests</h3>
                <p className="text-[11px] text-slate-400 font-bold">Book voice or messaging slots with designated coordinators and advisers.</p>
                <form onSubmit={handleRequestConsult} className="flex flex-col gap-3.5 mt-2 text-[12.5px]">
                  <div className="flex flex-col gap-1">
                    <label className="font-bold text-slate-600">Consultation Topic</label>
                    <input required type="text" value={consultTopic} onChange={(e)=>setConsultTopic(e.target.value)} placeholder="Methodology neural network details..." className="bg-white border border-slate-350 rounded-lg p-2.5 focus:outline-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="font-bold text-slate-600">Preferred Date</label>
                      <input required type="date" value={consultDate} onChange={(e)=>setConsultDate(e.target.value)} className="bg-white border border-slate-350 rounded-lg p-2.5 focus:outline-none" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-bold text-slate-600">Preferred Time</label>
                      <input required type="text" value={consultTime} onChange={(e)=>setConsultTime(e.target.value)} placeholder="10:00 AM" className="bg-white border border-slate-350 rounded-lg p-2.5 focus:outline-none" />
                    </div>
                  </div>
                  <button type="submit" className="px-4 py-2 bg-[#ffa400] text-[#1b4264] hover:bg-[#e09000] font-extrabold rounded-lg shadow border border-[#ffa400] self-start mt-2">
                    Request Consultation
                  </button>
                </form>
              </div>
            ),
            "consultation-repo": (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
                <h3 className="font-extrabold text-[#1b4264] text-[16px]">Consultation Repository</h3>
                <p className="text-[11px] text-slate-400 font-bold">Access historical transcripts, advisory notes, and recorded session indexes.</p>
                <div className="flex flex-col gap-3 mt-2 text-[12px]">
                  {consultations.map(c => (
                    <div key={c.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex justify-between items-center shadow-sm">
                      <div>
                        <span className="font-bold text-[#1b4264] block">{c.topic}</span>
                        <span className="text-[10px] text-slate-400">{c.date} · {c.time} ({c.mode})</span>
                      </div>
                      <Tag variant={c.status==='completed'?'success':'warn'}>{c.status}</Tag>
                    </div>
                  ))}
                </div>
              </div>
            ),
            progress: (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
                <h3 className="font-extrabold text-[#1b4264] text-[16px]">Progress Tracking Dashboard</h3>
                <p className="text-[11px] text-slate-400 font-bold">Visual status indicators showing project workflow completion.</p>
                <div className="bg-slate-50 p-6 border border-slate-200 rounded-2xl mt-2 shadow-sm flex flex-col gap-4">
                  <div className="flex justify-between items-center text-[13px] font-extrabold text-[#1b4264]">
                    <span>Overall Study Progression</span>
                    <span className="bg-[#1b4264]/10 text-[#1b4264] px-2.5 py-0.5 rounded text-[11px] font-extrabold font-mono">20% COMPLETE</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-4 p-1 overflow-hidden border border-slate-300/40 shadow-inner flex items-center">
                    <div 
                      className="bg-gradient-to-r from-[#1b4264] to-[#ffa400] h-2.5 rounded-full transition-all duration-500 ease-out animate-pulse shadow-sm" 
                      style={{ width: "20%" }} 
                    />
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium leading-relaxed mt-1 flex items-center gap-1.5">
                    <i className="ti ti-info-circle text-[#1b4264]" />
                    <span>Next Milestone: <strong>Chapter 1-3 Submission</strong>. Target deadline is July 15, 2026.</span>
                  </div>
                </div>
              </div>
            ),
            defense: (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
                <h3 className="font-extrabold text-[#1b4264] text-[16px]">Defense Schedule Viewing</h3>
                <p className="text-[11px] text-slate-400 font-bold">Review defense panel timings, assignees, and digital venues.</p>
                {defenses.map(d => (
                  <div key={d.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-[12.5px] flex flex-col gap-2 mt-2 shadow-sm">
                    <div className="flex justify-between items-center">
                      <span className="font-extrabold text-[#1b4264] text-[14px]">{d.title}</span>
                      <Tag variant="warn">{d.type}</Tag>
                    </div>
                    <div className="text-slate-500 font-medium">
                      <div><strong>Date / Time:</strong> {d.date} at {d.time}</div>
                      <div><strong>Venue:</strong> {d.venue}</div>
                      <div><strong>Panelists:</strong> {d.panelists.join(", ")}</div>
                    </div>
                  </div>
                ))}
              </div>
            ),
            notifications: (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
                <h3 className="font-extrabold text-[#1b4264] text-[16px]">Notifications & Announcements</h3>
                <p className="text-[11px] text-slate-400 font-bold">Real-time alerts, chapter approvals, and institutional announcements.</p>
                <div className="flex flex-col gap-3 mt-2">
                  {combinedNotifications.map(n => (
                    <div key={n.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex justify-between items-center text-[12px] shadow-sm">
                      <div>
                        <span className="font-bold text-[#1b4264] block">{n.msg}</span>
                      </div>
                      <span className="text-slate-400 font-bold text-[10.5px]">{n.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            ),
            certificates: (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
                <h3 className="font-extrabold text-[#1b4264] text-[16px]">Certificates of Completion</h3>
                <p className="text-[11px] text-slate-400 font-bold">Access and download QR-verified Certificates of Completion.</p>
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-[12.5px] flex items-center justify-between mt-2 shadow-sm">
                  <div>
                    <span className="font-bold text-[#1b4264] block">Certificate of Completion (Pending)</span>
                    <span className="text-[10px] text-slate-400">Available once final oral grading has been submitted.</span>
                  </div>
                  <button 
                    onClick={() => setModalCert(true)} 
                    className="px-3.5 py-2 bg-[#ffa400] hover:bg-[#e09000] text-[#1b4264] font-extrabold rounded-lg border border-[#ffa400] shadow cursor-pointer transition-colors"
                  >
                    View Status
                  </button>
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
            "group-chats": (
              <StudentGroupChats triggerToast={triggerToast} />
            ),
            workspace: (
              <StudentWorkspace triggerToast={triggerToast} />
            ),
          };

          return tabContent[activeTab] || tabContent.overview;
        })()}

      </main>

      {/* ─── MODALS ─── */}
      {modalCert && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border-t-4 border-[#1b4264] max-w-md w-full p-6 shadow-2xl animate-fade-in-up flex flex-col gap-4">
            <h3 className="font-extrabold text-[#1b4264] text-[16px] flex items-center gap-2">
              <i className="ti ti-certificate text-[#ffa400] text-xl" />
              Certificate Completion Verification
            </h3>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl text-center flex flex-col gap-3 shadow-inner">
              <div className="font-extrabold text-[#1b4264] text-[14px]">Verification: In Progress</div>
              <div className="w-24 h-24 bg-white border border-slate-200 rounded-lg flex items-center justify-center mx-auto shadow-sm relative">
                <i className="ti ti-qrcode text-5xl text-slate-350" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#ffa400] rounded-full border border-white" />
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-bold">
                Lock status: Locked. Oral evaluation sheet verification signature must be processed by the administrative panel.
              </p>
            </div>
            <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
              <button onClick={()=>setModalCert(false)} className="px-4 py-2 border border-slate-350 hover:bg-slate-50 rounded-lg text-[12px] font-bold text-slate-700 cursor-pointer">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {modalJoinConferencing && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border-t-4 border-[#1b4264] max-w-md w-full p-6 shadow-2xl animate-fade-in-up flex flex-col gap-4">
            <h3 className="font-extrabold text-[#1b4264] text-[16px] flex items-center gap-2">
              <i className="ti ti-video text-[#ffa400] text-xl" />
              Join Voice & Video Channel
            </h3>
            <p className="text-[12.5px] text-slate-500 leading-relaxed">
              You are joining study channel <strong className="text-slate-800">Group AI-CCS-01</strong>. This will activate your simulated microphone and web camera.
            </p>
            <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
              <button onClick={()=>setModalJoinConferencing(false)} className="px-4 py-2 border border-slate-350 hover:bg-slate-50 rounded-lg text-[12px] font-bold text-slate-700 cursor-pointer">Cancel</button>
              <button onClick={()=>{setModalJoinConferencing(false); triggerToast("Connected to group call stream.");}} className="px-4 py-2 bg-[#ffa400] hover:bg-[#e09000] text-[#1b4264] font-extrabold rounded-lg text-[12px] cursor-pointer">Join Stream</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function StudentDashboardPage() {
  return (
    <Suspense fallback={<div className="p-6 text-[#1b4264]">Loading Student Portal...</div>}>
      <StudentDashboardContent />
    </Suspense>
  );
}
