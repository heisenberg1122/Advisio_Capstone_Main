"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleSelect, setRoleSelect] = useState<"student" | "adviser">("student");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    // In this prototype, we simulate redirection to the first-time profile setup
    // but pass the role as a query param or state so they can experience the flow
    router.push(`/first-login-setup?role=${roleSelect}&email=${encodeURIComponent(email || "juan.reyes@university.edu.ph")}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-800 font-sans">
      
      {/* ─── LEFT SIDE: UNIVERSITY BRANDING & ILLUSTRATION (40% width) ─── */}
      <div 
        className="w-full md:w-[40%] bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 text-white p-8 md:p-12 flex flex-col justify-between border-r border-blue-800 select-none relative overflow-hidden"
      >
        {/* Background decorative grids */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Logo and Brand */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white bg-opacity-15 flex items-center justify-center border border-white border-opacity-20 shadow-md">
            <i className="ti ti-school text-xl text-white" />
          </div>
          <div>
            <span className="font-extrabold text-[22px] tracking-tight block leading-none">ADVISIO</span>
            <span className="text-[10px] uppercase tracking-widest text-blue-200 font-semibold">Research Portal</span>
          </div>
        </div>

        {/* Content & Interactive Illustration */}
        <div className="relative z-10 my-8 md:my-auto flex flex-col gap-6">
          <div>
            <h2 className="text-[26px] font-bold leading-tight tracking-tight">
              Capstone, Thesis, and Research Advising Management
            </h2>
            <p className="text-blue-100 text-[13px] mt-2.5 leading-relaxed">
              Streamlining the entire academic research journey from proposal selection to final defense and grading.
            </p>
          </div>

          {/* Interactive CSS Academic Illustration */}
          <div className="bg-white bg-opacity-5 rounded-2xl p-4 border border-white border-opacity-10 backdrop-blur-md shadow-inner">
            <div className="text-[11px] uppercase tracking-wider text-blue-200 font-semibold mb-3">Workflow Nodes</div>
            <div className="grid grid-cols-3 gap-2 text-center text-[10px]">
              
              {/* Node 1 */}
              <div className="bg-white bg-opacity-10 p-2.5 rounded-xl border border-white border-opacity-15 flex flex-col items-center gap-1 shadow-sm">
                <i className="ti ti-users text-lg text-blue-200" />
                <span className="font-semibold text-white">Students</span>
                <span className="text-[8px] text-blue-200 opacity-80">Research Groups</span>
              </div>

              {/* Dotted Flow Connector 1 (Implicitly styled by visual grid) */}
              <div className="bg-white bg-opacity-10 p-2.5 rounded-xl border border-white border-opacity-15 flex flex-col items-center gap-1 shadow-sm">
                <i className="ti ti-user-check text-lg text-emerald-300" />
                <span className="font-semibold text-white">Advisers</span>
                <span className="text-[8px] text-emerald-200 opacity-80">Direct Mentoring</span>
              </div>

              {/* Node 2 */}
              <div className="bg-white bg-opacity-10 p-2.5 rounded-xl border border-white border-opacity-15 flex flex-col items-center gap-1 shadow-sm">
                <i className="ti ti-shield text-lg text-amber-300" />
                <span className="font-semibold text-white">Panelists</span>
                <span className="text-[8px] text-amber-200 opacity-80">Defense Committee</span>
              </div>

            </div>

            {/* Workflow Dotted Line */}
            <div className="flex justify-between items-center px-6 my-2 text-blue-300 text-[13px] font-semibold">
              <span>Proposal</span>
              <span className="border-t-2 border-dashed border-white border-opacity-20 flex-1 mx-3" />
              <span>Submission</span>
              <span className="border-t-2 border-dashed border-white border-opacity-20 flex-1 mx-3" />
              <span>Defense</span>
            </div>
          </div>

          {/* Feature Highlights Checklist */}
          <div className="flex flex-col gap-2 text-[12px] font-medium text-blue-50">
            <div className="flex items-center gap-2">
              <i className="ti ti-checkbox text-emerald-300 text-[14px]" />
              <span>Research Progress Tracking & Milestones</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="ti ti-checkbox text-emerald-300 text-[14px]" />
              <span>In-App Voice, Video, & Group Consultations</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="ti ti-checkbox text-emerald-300 text-[14px]" />
              <span>Smart Automated Defense Scheduling</span>
            </div>
            <div className="flex items-center gap-2">
              <i className="ti ti-checkbox text-emerald-300 text-[14px]" />
              <span>Digital Evaluations & Rubric grading</span>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 border-t border-white border-opacity-10 pt-4 text-[11px] text-blue-200 flex justify-between">
          <span>Version 1.0</span>
          <span>University Research Management System</span>
        </div>

      </div>

      {/* ─── RIGHT SIDE: AUTHENTICATION FORM CARD (60% width) ─── */}
      <div className="w-full md:w-[60%] bg-white p-8 md:p-16 flex items-center justify-center">
        <div className="w-full max-w-[420px] flex flex-col gap-8 animate-fade-in-up">
          
          {/* Form Header */}
          <div>
            <h2 className="text-[28px] font-bold tracking-tight text-slate-900">Welcome Back</h2>
            <p className="text-[14px] text-slate-500 mt-1">Sign in to continue to Advisio.</p>
          </div>

          {/* Form Container */}
          <form onSubmit={handleSignIn} className="flex flex-col gap-4">
            
            {/* Demo Role Selector Toggle */}
            <div className="p-1.5 bg-slate-100 rounded-xl flex gap-1 border border-slate-200">
              <button 
                type="button"
                onClick={() => {
                  setRoleSelect("student");
                  setEmail("juan.reyes@university.edu.ph");
                }}
                className={`flex-1 py-1.5 text-center text-[12px] font-bold rounded-lg transition-all ${
                  roleSelect === "student" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Sign in as Student
              </button>
              <button 
                type="button"
                onClick={() => {
                  setRoleSelect("adviser");
                  setEmail("rachel.lim@university.edu.ph");
                }}
                className={`flex-1 py-1.5 text-center text-[12px] font-bold rounded-lg transition-all ${
                  roleSelect === "adviser" ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Sign in as Faculty/Adviser
              </button>
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-[12px] font-bold text-slate-600 uppercase tracking-wider">
                University Email Address
              </label>
              <input 
                id="email"
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="username@university.edu.ph"
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-[14px] text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors placeholder:text-slate-400"
              />
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="text-[12px] font-bold text-slate-600 uppercase tracking-wider">
                  Password
                </label>
                <Link 
                  href="/forgot-password" 
                  className="text-[12px] font-semibold text-blue-600 hover:underline transition"
                >
                  Forgot Password?
                </Link>
              </div>
              <input 
                id="password"
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-[14px] text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors placeholder:text-slate-400"
              />
            </div>

            {/* Keep me signed in */}
            <div className="flex items-center gap-2 mt-1">
              <input 
                id="keep-signed-in"
                type="checkbox" 
                className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
              <label htmlFor="keep-signed-in" className="text-[13px] text-slate-600 select-none cursor-pointer">
                Keep me signed in on this device
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-[13.5px] font-bold shadow-md shadow-blue-600/10 hover:shadow-blue-600/20 active:scale-[0.98] transition cursor-pointer"
            >
              Sign In to Dashboard
            </button>

          </form>

          {/* Divider */}
          <div className="relative flex py-1 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-4 text-slate-400 text-[11px] uppercase tracking-wider font-semibold">
              Or Sign In with
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Social Sign-In Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button 
              onClick={() => {
                setEmail(roleSelect === "student" ? "juan.reyes@university.edu.ph" : "rachel.lim@university.edu.ph");
                router.push(`/first-login-setup?role=${roleSelect}&email=${roleSelect === "student" ? "juan.reyes" : "rachel.lim"}`);
              }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-300 rounded-lg text-[13px] font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer bg-white"
            >
              <i className="ti ti-brand-google text-slate-500 text-base" />
              Google Workspace
            </button>
            <button 
              onClick={() => {
                setEmail(roleSelect === "student" ? "juan.reyes@university.edu.ph" : "rachel.lim@university.edu.ph");
                router.push(`/first-login-setup?role=${roleSelect}&email=${roleSelect === "student" ? "juan.reyes" : "rachel.lim"}`);
              }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-300 rounded-lg text-[13px] font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer bg-white"
            >
              <i className="ti ti-brand-windows text-slate-500 text-base" />
              Microsoft Teams
            </button>
          </div>

          {/* Bottom Activation Hint */}
          <div className="text-center text-[13px] text-slate-600 mt-2">
            Don't have access yet?{" "}
            <Link 
              href="/register" 
              className="font-bold text-blue-600 hover:underline transition"
            >
              Activate Account
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
