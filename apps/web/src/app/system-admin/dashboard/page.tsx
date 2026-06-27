"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Tag } from "@/components/ui/Tag";

// Mock colleges, departments, configurations, audit logs
const INITIAL_COLLEGES = [
  { id: "c1", name: "College of Computer Studies", code: "CCS", status: "active", deptsCount: 4, adminName: "Admin Officer" },
  { id: "c2", name: "College of Engineering", code: "COE", status: "active", deptsCount: 6, adminName: "Engr. Clara Santos" },
  { id: "c3", name: "College of Business Administration", code: "CBA", status: "active", deptsCount: 5, adminName: "Prof. Leo Gomez" },
  { id: "c4", name: "College of Science", code: "COS", status: "pending setup", deptsCount: 3, adminName: "None" },
];

const INITIAL_DEPARTMENTS = [
  { id: "d1", collegeId: "c1", name: "Computer Science", code: "CS", status: "active" },
  { id: "d2", collegeId: "c1", name: "Information Technology", code: "IT", status: "active" },
  { id: "d3", collegeId: "c1", name: "Software Engineering", code: "SE", status: "active" },
  { id: "d4", collegeId: "c2", name: "Civil Engineering", code: "CE", status: "active" },
];

function SystemAdminDashboardContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab") || "overview";

  const [colleges, setColleges] = useState(INITIAL_COLLEGES);
  const [departments, setDepartments] = useState(INITIAL_DEPARTMENTS);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [configStatus, setConfigStatus] = useState("Optimal");
  const [uptime, setUptime] = useState("99.98%");
  const [roleCount, setRoleCount] = useState(6);
  const [alertsCount, setAlertsCount] = useState(0);

  // Modals state
  const [modalCol, setModalCol] = useState(false);
  const [modalDept, setModalDept] = useState(false);
  const [modalMaint, setModalMaint] = useState(false);
  const [modalConfig, setModalConfig] = useState(false);
  const [modalAssignRole, setModalAssignRole] = useState(false);

  // Form states
  const [colName, setColName] = useState("");
  const [colCode, setColCode] = useState("");
  const [deptCollege, setDeptCollege] = useState("");
  const [deptName, setDeptName] = useState("");
  const [deptCode, setDeptCode] = useState("");
  const [newConfigName, setNewConfigName] = useState("");
  const [newConfigVal, setNewConfigVal] = useState("");

  const [toast, setToast] = useState<string | null>(null);
  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddCollege = (e: React.FormEvent) => {
    e.preventDefault();
    setColleges(prev => [...prev, { id: Math.random().toString(), name: colName, code: colCode.toUpperCase(), status: "active", deptsCount: 0, adminName: "None" }]);
    setModalCol(false);
    setColName("");
    setColCode("");
    triggerToast(`Successfully onboarded college ${colCode.toUpperCase()}`);
  };

  const handleAddDept = (e: React.FormEvent) => {
    e.preventDefault();
    setDepartments(prev => [...prev, { id: Math.random().toString(), collegeId: deptCollege, name: deptName, code: deptCode.toUpperCase(), status: "active" }]);
    setColleges(prev => prev.map(c => c.id === deptCollege ? { ...c, deptsCount: c.deptsCount + 1 } : c));
    setModalDept(false);
    setDeptName("");
    setDeptCode("");
    triggerToast(`Added department ${deptCode.toUpperCase()}`);
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
          <h1 className="text-[16px] font-extrabold text-[#1b4264]">System Administration</h1>
          <p className="text-[11px] text-slate-400 font-bold">Platform Configuration Oversight</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative cursor-pointer w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-[#1b4264] border border-slate-200 hover:bg-slate-100 transition">
            <i className="ti ti-bell text-base" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#ffa400] rounded-full border border-white" />
          </div>
          <div className="h-8 w-px bg-slate-200" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#ffa400] flex items-center justify-center text-[12px] font-extrabold text-[#1b4264]">
              SA
            </div>
            <div>
              <div className="text-[12px] font-extrabold text-[#1b4264]">System Administrator</div>
              <div className="text-[9px] text-slate-400 font-bold">Global Root Settings</div>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN MAIN CONTAINER */}
      <main className="flex-1 p-6 flex flex-col gap-6 overflow-y-auto">
        
        {activeTab === "overview" && (
          <>
            {/* EXACT SYSTEM ADMIN CARDS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#1b4264] flex items-center justify-center text-lg">
                  <i className="ti ti-building" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">Colleges Onboarded</span>
                  <span className="text-[18px] font-extrabold text-[#1b4264]">{colleges.length} Units</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#1b4264] flex items-center justify-center text-lg">
                  <i className="ti ti-building-community" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">Departments Onboarded</span>
                  <span className="text-[18px] font-extrabold text-[#1b4264]">{departments.length} Depts</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#ffa400] flex items-center justify-center text-lg">
                  <i className="ti ti-adjustments" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">Platform Config</span>
                  <span className="text-[18px] font-extrabold text-[#1b4264]">{configStatus}</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#ffa400] flex items-center justify-center text-lg">
                  <i className="ti ti-tool" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">Maintenance Status</span>
                  <span className="text-[18px] font-extrabold text-[#1b4264]">{maintenanceMode ? "Active" : "Live"}</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#1b4264] flex items-center justify-center text-lg">
                  <i className="ti ti-file-text" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">System-Wide Reports</span>
                  <span className="text-[18px] font-extrabold text-[#1b4264]">24 Active</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#1b4264] flex items-center justify-center text-lg">
                  <i className="ti ti-presentation" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">System-Wide Analytics</span>
                  <span className="text-[18px] font-extrabold text-[#1b4264]">{uptime} Uptime</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#ffa400] flex items-center justify-center text-lg">
                  <i className="ti ti-shield" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">User Roles</span>
                  <span className="text-[18px] font-extrabold text-[#1b4264]">{roleCount} Types</span>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-[#1b4264]/10 text-[#ffa400] flex items-center justify-center text-lg">
                  <i className="ti ti-alert-triangle" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-extrabold">Oversight Alerts</span>
                  <span className="text-[18px] font-extrabold text-[#1b4264]">{alertsCount} Issues</span>
                </div>
              </div>
            </div>

            {/* Quick overview of colleges and onboarding */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
                <h3 className="font-extrabold text-[#1b4264] text-[14px]">Onboarded Colleges</h3>
                <div className="flex flex-col gap-3">
                  {colleges.map(c => (
                    <div key={c.id} className="p-3 border border-slate-200 rounded-lg flex justify-between items-center text-[12px] bg-slate-50 hover:border-[#ffa400] transition shadow-sm">
                      <div>
                        <span className="font-bold text-[#1b4264] block">{c.name} ({c.code})</span>
                        <span className="text-[10px] text-slate-400">Admin: {c.adminName}</span>
                      </div>
                      <Tag variant={c.status === 'active' ? 'success' : 'warn'}>{c.status}</Tag>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
                <h3 className="font-extrabold text-[#1b4264] text-[14px]">System Audit Action Logs</h3>
                <div className="flex flex-col gap-3 text-[11px] text-slate-500">
                  <div className="p-2 border-b border-slate-100 flex justify-between">
                    <span>Onboarded College Unit (Science)</span>
                    <span className="font-bold text-slate-450">Just now</span>
                  </div>
                  <div className="p-2 border-b border-slate-100 flex justify-between">
                    <span>Assigned CCS Admin Officer to layout portal</span>
                    <span className="font-bold text-slate-450">1 hour ago</span>
                  </div>
                  <div className="p-2 border-b border-slate-100 flex justify-between">
                    <span>Modified Database Maintenance Configuration</span>
                    <span className="font-bold text-slate-450">3 hours ago</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* TAB 2: COLLEGE & DEPT ONBOARDING */}
        {activeTab === "onboarding" && (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col gap-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h3 className="font-extrabold text-[#1b4264] text-[16px]">College & Department Onboarding</h3>
                <p className="text-[11px] text-slate-400 font-bold">Manage divisions, departments, and map university academic profiles.</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setModalCol(true)} className="px-3.5 py-2 bg-[#ffa400] hover:bg-[#e09000] text-[#1b4264] font-extrabold text-[12px] rounded-lg shadow cursor-pointer border border-[#ffa400]">
                  Onboard College
                </button>
                <button onClick={() => setModalDept(true)} className="px-3.5 py-2 bg-white text-[#1b4264] hover:bg-slate-50 font-bold text-[12px] rounded-lg shadow cursor-pointer border border-slate-300">
                  Add Department
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-slate-200 rounded-xl p-4 flex flex-col gap-3 bg-white">
                <h4 className="font-bold text-[13px] text-[#1b4264] border-b border-slate-100 pb-2">Colleges</h4>
                {colleges.map(c => (
                  <div key={c.id} className="p-2 bg-slate-50 rounded border border-slate-200 flex justify-between items-center text-[12px]">
                    <span className="font-bold text-[#1b4264]">{c.name}</span>
                    <span className="font-mono text-[10px] bg-[#1b4264]/10 text-[#1b4264] px-1.5 py-0.5 rounded font-extrabold">{c.code}</span>
                  </div>
                ))}
              </div>

              <div className="border border-slate-200 rounded-xl p-4 flex flex-col gap-3 bg-white">
                <h4 className="font-bold text-[13px] text-[#1b4264] border-b border-slate-100 pb-2">Departments</h4>
                {departments.map(d => (
                  <div key={d.id} className="p-2 bg-slate-50 rounded border border-slate-200 flex justify-between items-center text-[12px]">
                    <span className="font-bold text-slate-800">{d.name}</span>
                    <span className="text-[10px] text-slate-450 uppercase font-mono font-extrabold text-[#ffa400]">{d.code}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>

      {/* MODALS */}
      {modalCol && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border-t-4 border-[#1b4264] max-w-md w-full p-6 shadow-2xl animate-fade-in-up flex flex-col gap-4 text-slate-800">
            <h3 className="font-extrabold text-[#1b4264] text-[16px] flex items-center gap-2">
              <i className="ti ti-building-plus text-[#ffa400] text-xl" />
              Onboard College Unit
            </h3>
            <form onSubmit={handleAddCollege} className="flex flex-col gap-3 text-[12px]">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-650">College Name</label>
                <input required type="text" value={colName} onChange={(e)=>setColName(e.target.value)} placeholder="e.g. College of Science" className="bg-white border border-slate-350 rounded-lg p-2 focus:outline-none focus:border-[#ffa400]" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-650">College Code</label>
                <input required type="text" value={colCode} onChange={(e)=>setColCode(e.target.value)} placeholder="e.g. COS" className="bg-white border border-slate-350 rounded-lg p-2 focus:outline-none focus:border-[#ffa400]" />
              </div>
              <div className="flex justify-end gap-3 border-t border-slate-100 pt-4 mt-2">
                <button type="button" onClick={()=>setModalCol(false)} className="px-4 py-2 border border-slate-350 hover:bg-slate-50 rounded-lg font-bold text-slate-700 cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#ffa400] hover:bg-[#e09000] text-[#1b4264] font-extrabold rounded-lg cursor-pointer">Onboard</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalDept && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border-t-4 border-[#1b4264] max-w-md w-full p-6 shadow-2xl animate-fade-in-up flex flex-col gap-4 text-slate-800">
            <h3 className="font-extrabold text-[#1b4264] text-[16px] flex items-center gap-2">
              <i className="ti ti-plus text-[#ffa400] text-xl" />
              Add Department
            </h3>
            <form onSubmit={handleAddDept} className="flex flex-col gap-3 text-[12px]">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-650">Affiliated College</label>
                <select required value={deptCollege} onChange={(e)=>setDeptCollege(e.target.value)} className="bg-white border border-slate-350 rounded-lg p-2 focus:outline-none">
                  <option value="">Select College</option>
                  {colleges.map(c=>(
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-650">Department Name</label>
                <input required type="text" value={deptName} onChange={(e)=>setDeptName(e.target.value)} placeholder="e.g. Physics Department" className="bg-white border border-slate-350 rounded-lg p-2 focus:outline-none" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-bold text-slate-650">Department Code</label>
                <input required type="text" value={deptCode} onChange={(e)=>setDeptCode(e.target.value)} placeholder="e.g. PHYS" className="bg-white border border-slate-350 rounded-lg p-2 focus:outline-none" />
              </div>
              <div className="flex justify-end gap-3 border-t border-slate-100 pt-4 mt-2">
                <button type="button" onClick={()=>setModalDept(false)} className="px-4 py-2 border border-slate-350 hover:bg-slate-50 rounded-lg font-bold text-slate-700 cursor-pointer">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-[#ffa400] hover:bg-[#e09000] text-[#1b4264] font-extrabold rounded-lg cursor-pointer">Add Dept</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default function SystemAdminDashboardPage() {
  return (
    <Suspense fallback={<div className="p-6 text-[#1b4264]">Loading System Admin Dashboard...</div>}>
      <SystemAdminDashboardContent />
    </Suspense>
  );
}
