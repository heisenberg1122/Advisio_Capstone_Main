"use client";

import { useProfile } from "@/hooks/use-profile";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Tag } from "@/components/ui/Tag";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function ProfileCard() {
  const { profile, loading } = useProfile();
  const pathname = usePathname() || "";

  // Get edit URL based on current role path
  let editUrl = "/student/profile/edit";
  if (pathname.includes("/system-admin")) {
    editUrl = "/system-admin/profile/edit";
  } else if (pathname.includes("/admin")) {
    editUrl = "/admin/profile/edit";
  } else if (pathname.includes("/adviser")) {
    editUrl = "/adviser/profile/edit";
  } else if (pathname.includes("/professor")) {
    editUrl = "/professor/profile/edit";
  } else if (pathname.includes("/panelist")) {
    editUrl = "/panelist/profile/edit";
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-6 w-full">
        <Card>
          <div className="animate-pulse flex items-center gap-4">
            <div className="w-16 h-16 bg-slate-200 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-slate-200 rounded w-1/3" />
              <div className="h-3 bg-slate-200 rounded w-1/4" />
            </div>
          </div>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <div className="animate-pulse space-y-3">
                <div className="h-4 bg-slate-200 rounded w-1/2 mb-4" />
                <div className="h-3 bg-slate-200 rounded w-3/4" />
                <div className="h-3 bg-slate-200 rounded w-5/6" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // Format roles for display
  const roleLabels: Record<string, string> = {
    student: "Student",
    adviser: "Faculty Research Adviser",
    professor: "Professor / Research Supervisor",
    panelist: "Defense Panelist",
    admin: "Portal Administrator",
    system_admin: "System Administrator",
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Dynamic Profile Header Banner */}
      <Card className="flex flex-col sm:flex-row items-center justify-between gap-5 p-6 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden border border-slate-200 shadow-sm">
        
        {/* Decorative corner accent */}
        <div className="absolute right-0 top-0 w-24 h-24 bg-[#1b4264]/5 rounded-bl-full pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center gap-5 z-10">
          <Avatar 
            initials={profile.initials} 
            colorVariant={profile.role === "student" ? "info" : "success"} 
            size="lg" 
            className="w-16 h-16 text-xl rounded-full flex items-center justify-center font-extrabold shadow-md border-2 border-white"
          />
          <div className="text-center sm:text-left">
            <h2 className="text-[20px] font-extrabold text-[#1b4264]">{profile.name}</h2>
            <div className="text-[12.5px] font-bold text-[#ffa400] mt-0.5">
              {roleLabels[profile.role] || profile.role}
            </div>
            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
              <Tag variant="success">Account Active</Tag>
              {profile.college && <Tag variant="neutral">{profile.college}</Tag>}
              {profile.academicYear && <Tag variant="neutral">{profile.academicYear}</Tag>}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="z-10 flex-shrink-0">
          <Link 
            href={editUrl}
            className="px-4.5 py-2.5 bg-[#ffa400] text-[#1b4264] hover:bg-[#e09000] font-extrabold rounded-xl border border-[#ffa400] shadow-sm flex items-center gap-2 transition-transform active:scale-[0.98] cursor-pointer"
          >
            <i className="ti ti-edit text-base" />
            <span>Edit Profile Details</span>
          </Link>
        </div>
      </Card>

      {/* 3-Column Profile Dashboard Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[12.5px]">
        
        {/* Column 1: Account Contact Details */}
        <Card className="flex flex-col gap-4 border border-slate-200 shadow-sm h-full">
          <h4 className="font-extrabold text-[#1b4264] text-[13px] border-b border-slate-100 pb-2 flex items-center gap-2">
            <i className="ti ti-mail text-[#ffa400] text-[15px]" />
            Account Contact Info
          </h4>
          
          <div className="flex flex-col gap-1">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Email Address</span>
            <span className="font-semibold text-slate-800 break-all">{profile.email}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Contact Number</span>
            <span className="font-semibold text-slate-800">{profile.contactNumber || "Not specified"}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Portal Status</span>
            <span className="font-semibold text-emerald-600 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block" />
              Verified Active Account
            </span>
          </div>
        </Card>

        {/* Column 2: Institutional Records */}
        <Card className="flex flex-col gap-4 border border-slate-200 shadow-sm h-full">
          <h4 className="font-extrabold text-[#1b4264] text-[13px] border-b border-slate-100 pb-2 flex items-center gap-2">
            <i className="ti ti-building text-[#ffa400] text-[15px]" />
            Institutional Records
          </h4>

          {profile.role === "student" ? (
            <>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Student ID Number</span>
                <span className="font-semibold text-slate-800">{profile.studentId || "N/A"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Program / Course</span>
                <span className="font-semibold text-slate-800">{profile.program || "N/A"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Year Level & Section</span>
                <span className="font-semibold text-slate-800">
                  {profile.yearLevel || "N/A"} {profile.section ? ` - Section ${profile.section}` : ""}
                </span>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Faculty Employee ID</span>
                <span className="font-semibold text-slate-800">{profile.employeeId || "N/A"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Department / Office</span>
                <span className="font-semibold text-slate-800">{profile.department || "N/A"}</span>
              </div>
              {profile.academicYear && (
                <div className="flex flex-col gap-1">
                  <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Academic Year Scope</span>
                  <span className="font-semibold text-slate-800">{profile.academicYear}</span>
                </div>
              )}
            </>
          )}
        </Card>

        {/* Column 3: Specialized Supervision Details */}
        <Card className="flex flex-col gap-4 border border-slate-200 shadow-sm h-full">
          <h4 className="font-extrabold text-[#1b4264] text-[13px] border-b border-slate-100 pb-2 flex items-center gap-2">
            <i className="ti ti-award text-[#ffa400] text-[15px]" />
            Specialized Details
          </h4>

          {/* Student details */}
          {profile.role === "student" && (
            <div className="flex flex-col gap-1 h-full">
              <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Research Interests</span>
              <p className="font-semibold text-slate-800 leading-relaxed bg-slate-50/50 p-2.5 rounded-lg border border-slate-100 mt-0.5">
                {profile.researchInterests || "Not specified yet."}
              </p>
            </div>
          )}

          {/* Adviser details */}
          {profile.role === "adviser" && (
            <div className="flex flex-col gap-3.5 h-full">
              <div className="flex flex-col gap-1">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Areas of Expertise</span>
                <span className="font-semibold text-slate-800">{profile.expertise || "Not specified"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Research Specialization</span>
                <span className="font-semibold text-slate-800">{profile.specialization || "Not specified"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Availability Hours</span>
                <span className="font-semibold text-slate-800">{profile.availability || "Not specified"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Academic Credentials</span>
                <span className="font-semibold text-slate-700 italic block truncate" title={profile.credentials}>
                  {profile.credentials || "Not specified"}
                </span>
              </div>
            </div>
          )}

          {/* Professor details */}
          {profile.role === "professor" && (
            <div className="flex flex-col gap-3 h-full">
              <div className="flex flex-col gap-1">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Research Specialization</span>
                <span className="font-semibold text-slate-800">{profile.specialization || "Not specified"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Handled Course Sections</span>
                <span className="font-semibold text-slate-800">{profile.subjects || "Not specified"}</span>
              </div>
            </div>
          )}

          {/* Panelist details */}
          {profile.role === "panelist" && (
            <div className="flex flex-col gap-3 h-full">
              <div className="flex flex-col gap-1">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Research Specialization</span>
                <span className="font-semibold text-slate-800">{profile.specialization || "Not specified"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Panel Assignment Details</span>
                <span className="font-semibold text-slate-800">{profile.panelDetails || "Not specified"}</span>
              </div>
            </div>
          )}

          {/* Admin / System Admin details */}
          {(profile.role === "admin" || profile.role === "system_admin") && (
            <div className="flex flex-col gap-3 h-full">
              <div className="flex flex-col gap-1">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Position Title</span>
                <span className="font-semibold text-slate-800">{profile.position || "N/A"}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-bold text-slate-400 uppercase tracking-wider text-[9px]">Access Scope</span>
                <span className="font-semibold text-slate-800 capitalize">
                  {profile.role.replace("_", " ")} Authorization
                </span>
              </div>
            </div>
          )}
        </Card>

      </div>
    </div>
  );
}
