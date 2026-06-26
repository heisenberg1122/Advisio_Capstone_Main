"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SetupFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get query params
  const role = searchParams.get("role") || "student";
  const initialEmail = searchParams.get("email") || "";

  // Form states
  const [fullName, setFullName] = useState("");
  const [contact, setContact] = useState("");
  const [department, setDepartment] = useState("");
  const [course, setCourse] = useState("");
  const [interest, setInterest] = useState("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Mock upload preview
    setPhotoPreview("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80");
  };

  const handleCompleteSetup = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to the correct role dashboard based on selected role!
    if (role === "adviser") {
      router.push("/adviser/dashboard");
    } else if (role === "professor") {
      router.push("/professor/dashboard");
    } else if (role === "panelist") {
      router.push("/panelist/dashboard");
    } else {
      router.push("/student/dashboard");
    }
  };

  return (
    <div className="w-full max-w-[540px] bg-white rounded-2xl border border-slate-200 p-8 md:p-10 shadow-lg flex flex-col gap-6 animate-fade-in-up">
      
      {/* Brand Header */}
      <div className="flex justify-between items-center border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-md">
            <i className="ti ti-school text-sm text-white" />
          </div>
          <span className="font-extrabold text-[16px] tracking-tight text-slate-900">ADVISIO</span>
        </div>
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
          Account Setup
        </span>
      </div>

      <div>
        <h1 className="text-[22px] font-bold text-slate-900">Complete Your Profile</h1>
        <p className="mt-1 text-[13px] text-slate-500">
          Finish setting up your credentials to access the research advising dashboard.
        </p>
      </div>

      <form onSubmit={handleCompleteSetup} className="flex flex-col gap-5">
        
        {/* Profile Photo Uploader Row */}
        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 border-dashed">
          <div className="w-16 h-16 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-slate-400 overflow-hidden relative shadow-inner">
            {photoPreview ? (
              <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <i className="ti ti-user text-2xl" />
            )}
          </div>
          <div>
            <div className="text-[12.5px] font-bold text-slate-700">Profile Photo</div>
            <p className="text-[10px] text-slate-400 mt-0.5">Upload a formal university identification photo.</p>
            <input 
              type="file" 
              accept="image/*"
              id="photo-upload" 
              onChange={handlePhotoChange}
              className="hidden"
            />
            <label 
              htmlFor="photo-upload" 
              className="inline-block mt-2 px-3 py-1 bg-white border border-slate-300 rounded text-[11px] font-semibold text-slate-600 hover:bg-slate-50 transition cursor-pointer select-none"
            >
              Upload Photo
            </label>
          </div>
        </div>

        {/* Full Name & Contact Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="full-name" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
            <input 
              id="full-name"
              type="text" 
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="First Last"
              className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-[13px] text-slate-900 focus:outline-none focus:border-blue-600 transition placeholder:text-slate-400"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="contact" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Contact Number</label>
            <input 
              id="contact"
              type="tel" 
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="e.g. +63 917 123 4567"
              className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-[13px] text-slate-900 focus:outline-none focus:border-blue-600 transition placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Department & Course/Program (Dynamic labels/options depending on role) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="dept" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {role === "adviser" ? "Faculty Department" : "Department / College"}
            </label>
            <select 
              id="dept"
              required
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-[13px] text-slate-900 focus:outline-none focus:border-blue-600 transition"
            >
              <option value="">Select Department</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Information Technology">Information Technology</option>
              <option value="Information Systems">Information Systems</option>
              <option value="Software Engineering">Software Engineering</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="course" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {role === "adviser" ? "Designation / Specialization" : "Course / Program"}
            </label>
            <input 
              id="course"
              type="text" 
              required
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder={role === "adviser" ? "e.g. Assoc. Prof / Machine Learning" : "e.g. BSCS - Data Science"}
              className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-[13px] text-slate-900 focus:outline-none focus:border-blue-600 transition placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Research Interest / Specialization Area */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="interest" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            {role === "adviser" ? "Research Advising Interests" : "Research / Thesis Interest Areas"}
          </label>
          <textarea 
            id="interest"
            rows={3}
            required
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
            placeholder={role === "adviser" ? "e.g. Computer Vision, IoT Sensors, Agritech algorithms" : "e.g. Predictive Analytics, Machine Learning in Agriculture"}
            className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-[13px] text-slate-900 focus:outline-none focus:border-blue-600 transition placeholder:text-slate-400 resize-none"
          />
        </div>

        {/* Complete Setup Button */}
        <button 
          type="submit"
          className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-[13.5px] font-bold shadow-md shadow-blue-600/10 active:scale-[0.98] transition cursor-pointer"
        >
          Complete Setup & Enter Dashboard
        </button>

      </form>
      
    </div>
  );
}

export default function FirstTimeSetupPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-800 font-sans">
      <Suspense fallback={
        <div className="flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-t-transparent rounded-full animate-spin border-blue-600" />
        </div>
      }>
        <SetupFormContent />
      </Suspense>
    </div>
  );
}
