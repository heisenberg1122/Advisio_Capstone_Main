"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Tag } from "@/components/ui/Tag";

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

      {/* TOPBAR */}
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between select-none">
        <div>
          <h1 className="text-[16px] font-extrabold text-[#1b4264]">Student Portal</h1>
          <p className="text-[11px] text-slate-400 font-bold">Research Group Access · College of Computer Studies</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative cursor-pointer w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-[#1b4264] border border-slate-200 hover:bg-slate-100 transition">
            <i className="ti ti-bell text-base" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#ffa400] rounded-full border border-white" />
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#1b4264] flex items-center justify-center text-[12px] font-extrabold text-white">
              JR
            </div>
            <div>
              <div className="text-[12px] font-extrabold text-[#1b4264]">Juan Reyes</div>
              <div className="text-[9px] text-slate-400 font-bold">Student Representative</div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === "overview" && (
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
                  <span className="text-[15px] font-extrabold text-[#1b4264]">{submissions.length} Uploads</span>
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

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#1b4264] flex items-center justify-center text-lg">
                  <i className="ti ti-target" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">Milestone Progress</span>
                  <span className="text-[15px] font-extrabold text-[#1b4264]">20% Complete</span>
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
                <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#1b4264] flex items-center justify-center text-lg">
                  <i className="ti ti-bell" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">Notifications</span>
                  <span className="text-[15px] font-extrabold text-[#1b4264]">{notifications.length} Alerts</span>
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
        )}

        {/* TAB 2: PROFILE MANAGEMENT */}
        {activeTab === "profile" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
            <h3 className="font-extrabold text-[#1b4264] text-[16px]">Profile Management</h3>
            <p className="text-[11px] text-slate-400 font-bold">Configure student identification records and institutional routing configurations.</p>
            <div className="grid grid-cols-2 gap-4 text-[12px] mt-2">
              <div className="flex flex-col gap-1">
                <span className="font-bold text-slate-500">Student Name</span>
                <input type="text" readOnly value="Juan Reyes" className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-slate-500">Institutional ID Number</span>
                <input type="text" readOnly value="2023-10045" className="bg-slate-50 border border-slate-200 p-2.5 rounded-lg focus:outline-none" />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: GROUP MANAGEMENT */}
        {activeTab === "group" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
            <h3 className="font-extrabold text-[#1b4264] text-[16px]">Research Group Management</h3>
            <p className="text-[11px] text-slate-400 font-bold">Organize peer study divisions, invitation codes, and collaborative assignments.</p>
            <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl text-[12.5px] mt-2 flex flex-col gap-2 shadow-sm">
              <div className="font-bold text-[#1b4264]">Group Identifier: {group.name}</div>
              <div><strong>Active Title:</strong> {group.projectTitle}</div>
              <div><strong>Group Members:</strong> {group.members.join(", ")}</div>
            </div>
          </div>
        )}

        {/* TAB 4: ADVISER CREDENTIALS */}
        {activeTab === "adviser-credentials" && (
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
        )}

        {/* TAB 5: AI RECOMMENDATION */}
        {activeTab === "ai-recommendation" && (
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
                  Match
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {aiMatches.map(rec => (
                  <div key={rec.name} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex justify-between items-center shadow-sm">
                    <div>
                      <span className="font-bold text-[#1b4264] block">{rec.name}</span>
                      <span className="text-[11px] text-slate-400">{rec.expertise}</span>
                    </div>
                    <span className="font-extrabold text-[#ffa400] text-[13.5px]">{rec.match}% Match</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: GROUP CONFERENCING */}
        {activeTab === "conferencing" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
            <h3 className="font-extrabold text-[#1b4264] text-[16px]">In-App Voice and Video Group Conferencing</h3>
            <p className="text-[11px] text-slate-400 font-bold">Initiate peer study room conferences or sync appointments with advisers.</p>
            <div className="p-6 border border-dashed border-[#1b4264]/20 bg-slate-50 rounded-2xl text-center flex flex-col gap-3 mt-2 shadow-inner">
              <i className="ti ti-video text-4xl text-[#1b4264]" />
              <div className="font-extrabold text-[14px] text-[#1b4264]">No active conference calls in progress</div>
              <p className="text-[11.5px] text-slate-400 max-w-sm mx-auto font-medium">
                Create a dynamic meeting room or click join to connect with your group members and assigned adviser.
              </p>
              <button 
                onClick={() => setModalJoinConferencing(true)}
                className="mt-2 px-5 py-2.5 bg-[#ffa400] hover:bg-[#e09000] text-[#1b4264] font-extrabold rounded-xl border border-[#ffa400] shadow mx-auto transition-transform active:scale-[0.98]"
              >
                Join Study Room Channel
              </button>
            </div>
          </div>
        )}

        {/* TAB 7: DOCUMENT SUBMISSION */}
        {activeTab === "submission" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
            <h3 className="font-extrabold text-[#1b4264] text-[16px]">Research Document Submission</h3>
            <p className="text-[11px] text-slate-400 font-bold">Upload project milestone documents and chapter outlines.</p>
            <form onSubmit={handleUploadDoc} className="flex flex-col gap-3 text-[12px] mt-2">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-600">Select Target Milestone</label>
                <select value={uploadMilestone} onChange={(e)=>setUploadMilestone(e.target.value)} className="bg-white border border-slate-350 rounded-lg p-2 focus:outline-none">
                  <option value="Proposal Outline">Proposal Outline</option>
                  <option value="Draft Submission">Draft Submission (Chapter 1-3)</option>
                  <option value="Ethics Application">Ethics Application Forms</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-600">Document File Name</label>
                <input required type="text" value={uploadFileName} onChange={(e)=>setUploadFileName(e.target.value)} placeholder="e.g. AI Crop Yield Prediction Draft v2" className="bg-white border border-slate-350 rounded-lg p-2 focus:outline-none" />
              </div>
              <button type="submit" className="px-4 py-2 bg-[#ffa400] text-[#1b4264] hover:bg-[#e09000] font-extrabold rounded-lg shadow-sm border border-[#ffa400] self-start mt-2">
                Submit Research Document
              </button>
            </form>
          </div>
        )}

        {/* TAB 8: DOCUMENT VERSION CONTROL */}
        {activeTab === "version-control" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
            <h3 className="font-extrabold text-[#1b4264] text-[16px]">Document Version Control & Tracking</h3>
            <p className="text-[11px] text-slate-400 font-bold">Track approval milestones and download past research file iterations.</p>
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left border-collapse text-[12px]">
                <thead>
                  <tr className="border-b border-slate-200 text-[#1b4264] font-extrabold uppercase text-[10px] tracking-wider">
                    <th className="py-2.5">File Name</th>
                    <th className="py-2.5">Milestone</th>
                    <th className="py-2.5">Version</th>
                    <th className="py-2.5">Upload Date</th>
                    <th className="py-2.5">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map(doc => (
                    <tr key={doc.id} className="border-b border-slate-100 text-slate-650 hover:bg-slate-50 transition-colors">
                      <td className="py-3 font-bold text-[#1b4264]">{doc.docName}</td>
                      <td className="py-3">{doc.milestone}</td>
                      <td className="py-3 font-mono">{doc.version}</td>
                      <td className="py-3">{doc.date}</td>
                      <td className="py-3">
                        <Tag variant={doc.status==='approved'?'success':'warn'}>{doc.status}</Tag>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 9: PROJECT MILESTONES */}
        {activeTab === "milestones" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
            <h3 className="font-extrabold text-[#1b4264] text-[16px]">Project Milestone Monitoring</h3>
            <p className="text-[11px] text-slate-400 font-bold">Monitor progression and target due dates for Outline, Pre-Defense, and Final Oral Defense.</p>
            <div className="flex flex-col gap-3 mt-2">
              {milestones.map(m => (
                <div key={m.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex justify-between items-center text-[12.5px] shadow-sm">
                  <div>
                    <span className="font-bold text-[#1b4264] block">{m.title}</span>
                    <span className="text-[10px] text-slate-450 block">Target: {m.date}</span>
                  </div>
                  <Tag variant={m.status==='completed'?'success':m.status==='in-progress'?'warn':'info'}>{m.status}</Tag>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 10: CONSULTATION REQUESTS */}
        {activeTab === "consultation-requests" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
            <h3 className="font-extrabold text-[#1b4264] text-[16px]">Consultation Scheduling Requests</h3>
            <p className="text-[11px] text-slate-400 font-bold">Schedule advisory reviews and face-to-face appointments.</p>
            <form onSubmit={handleRequestConsult} className="flex flex-col gap-3 text-[12px] mt-2">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-655">Consultation Topic</label>
                <input required type="text" value={consultTopic} onChange={(e)=>setConsultTopic(e.target.value)} placeholder="e.g. Chapter 4 Data Analysis" className="bg-white border border-slate-350 rounded-lg p-2 focus:outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-655">Date</label>
                  <input required type="date" value={consultDate} onChange={(e)=>setConsultDate(e.target.value)} className="bg-white border border-slate-350 rounded-lg p-2 focus:outline-none" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="font-bold text-slate-655">Time</label>
                  <input required type="text" value={consultTime} onChange={(e)=>setConsultTime(e.target.value)} placeholder="e.g. 10:00 AM" className="bg-white border border-slate-350 rounded-lg p-2 focus:outline-none" />
                </div>
              </div>
              <button type="submit" className="px-4 py-2 bg-[#ffa400] text-[#1b4264] hover:bg-[#e09000] font-extrabold rounded-lg shadow-sm border border-[#ffa400] self-start mt-2">
                Request Appointment
              </button>
            </form>
          </div>
        )}

        {/* TAB 11: CONSULTATION REPOSITORY */}
        {activeTab === "consultation-repo" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
            <h3 className="font-extrabold text-[#1b4264] text-[16px]">Consultation Documentation Repository</h3>
            <p className="text-[11px] text-slate-400 font-bold">Oversight archives of consultation meeting notes and verified signature logs.</p>
            <div className="flex flex-col gap-3.5 mt-2 text-[12px]">
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
        )}

        {/* TAB 12: PROGRESS TRACKING */}
        {activeTab === "progress" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
            <h3 className="font-extrabold text-[#1b4264] text-[16px]">Progress Tracking Dashboard</h3>
            <p className="text-[11px] text-slate-400 font-bold">Visual status indicators showing project workflow completion.</p>
            <div className="bg-slate-50 p-4 border border-slate-200 rounded-xl mt-2 shadow-sm">
              <div className="flex justify-between items-center mb-2 text-[12.5px] font-bold text-[#1b4264]">
                <span>Overall Study Progression</span>
                <span>20%</span>
              </div>
              <div className="progress-bar-track">
                <div className="progress-bar-fill animate-pulse" style={{ width: "20%" }} />
              </div>
            </div>
          </div>
        )}

        {/* TAB 13: DEFENSE SCHEDULE */}
        {activeTab === "defense" && (
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
        )}

        {/* TAB 14: NOTIFICATIONS */}
        {activeTab === "notifications" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-4">
            <h3 className="font-extrabold text-[#1b4264] text-[16px]">Notifications & Announcements</h3>
            <p className="text-[11px] text-slate-400 font-bold">Real-time alerts, chapter approvals, and institutional announcements.</p>
            <div className="flex flex-col gap-3 mt-2">
              {notifications.map(n => (
                <div key={n.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex justify-between items-center text-[12px] shadow-sm">
                  <div>
                    <span className="font-bold text-[#1b4264] block">{n.msg}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#1b4264]/5 font-extrabold text-[#1b4264] uppercase inline-block mt-0.5">{n.type}</span>
                  </div>
                  <span className="text-slate-400 font-bold text-[10.5px]">{n.date}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 15: CERTIFICATES OF COMPLETION */}
        {activeTab === "certificates" && (
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
        )}

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
