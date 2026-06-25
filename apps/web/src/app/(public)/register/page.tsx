"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AccountActivationPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleActivation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert("Please agree to the Terms and Conditions first.");
      return;
    }
    // Detect role from email prefix or ID prefix
    const role = email.includes("faculty") || email.includes("lim") ? "adviser" : "student";
    // Navigate to First Time Setup
    router.push(`/first-login-setup?role=${role}&email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-800 font-sans">
      
      {/* ─── LEFT SIDE: BRANDING & SECURITY (40% width) ─── */}
      <div 
        className="w-full md:w-[40%] bg-gradient-to-br from-indigo-900 via-indigo-800 to-blue-900 text-white p-8 md:p-12 flex flex-col justify-between border-r border-indigo-950 select-none relative overflow-hidden"
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
            <span className="text-[10px] uppercase tracking-widest text-indigo-200 font-semibold">Account Activation</span>
          </div>
        </div>

        {/* Content & Security Visuals */}
        <div className="relative z-10 my-8 md:my-auto flex flex-col gap-6">
          <div>
            <h2 className="text-[26px] font-bold leading-tight tracking-tight">
              Institutional Gatekeeper
            </h2>
            <p className="text-indigo-150 text-[13px] mt-2.5 leading-relaxed">
              Advisio is a secure campus platform. Accounts are pre-created by the system administrator. Faculty and students must activate their profiles using university-issued credentials.
            </p>
          </div>

          {/* Security Checklist Section */}
          <div className="bg-white bg-opacity-5 rounded-2xl p-5 border border-white border-opacity-10 backdrop-blur-md shadow-inner flex flex-col gap-3.5">
            <h3 className="text-[12px] uppercase tracking-wider text-indigo-200 font-bold mb-1">Security & Policy Notice</h3>
            
            <div className="flex gap-3">
              <i className="ti ti-shield-check text-emerald-400 text-[18px] mt-0.5" />
              <div>
                <h4 className="text-[13px] font-semibold">University Verified Accounts</h4>
                <p className="text-[11px] text-indigo-200">Only emails matching the institutional domains are allowed activation access.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <i className="ti ti-lock text-emerald-400 text-[18px] mt-0.5" />
              <div>
                <h4 className="text-[13px] font-semibold">Secure Authentication</h4>
                <p className="text-[11px] text-indigo-200">Enforces standard password security benchmarks and token sessions.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <i className="ti ti-database text-emerald-400 text-[18px] mt-0.5" />
              <div>
                <h4 className="text-[13px] font-semibold">Protected Academic Records</h4>
                <p className="text-[11px] text-indigo-200">Maintains student grading, panel reviews, and advising scores confidential.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <i className="ti ti-file-text-ai text-emerald-400 text-[18px] mt-0.5" />
              <div>
                <h4 className="text-[13px] font-semibold">Encrypted Research Vault</h4>
                <p className="text-[11px] text-indigo-200">Uploaded capstone documents are stored with active access controls.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="relative z-10 border-t border-white border-opacity-10 pt-4 text-[11px] text-indigo-200 flex justify-between">
          <span>Version 1.0</span>
          <span>University Research Management System</span>
        </div>

      </div>

      {/* ─── RIGHT SIDE: ACTIVATION FORM (60% width) ─── */}
      <div className="w-full md:w-[60%] bg-white p-8 md:p-12 flex items-center justify-center overflow-y-auto">
        <div className="w-full max-w-[440px] flex flex-col gap-6 my-auto animate-fade-in-up">
          
          {/* Header */}
          <div>
            <h2 className="text-[26px] font-bold tracking-tight text-slate-900">Activate Your Account</h2>
            <p className="text-[13.5px] text-slate-500 mt-1">Enter your university credentials to activate your Advisio profile.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleActivation} className="flex flex-col gap-4">
            
            {/* Row 1: Email & ID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">University Email</label>
                <input 
                  id="email"
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. juan.reyes@university"
                  className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-[13px] text-slate-900 focus:outline-none focus:border-blue-600 transition placeholder:text-slate-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="id-number" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Student / Employee ID</label>
                <input 
                  id="id-number"
                  type="text" 
                  required
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  placeholder="e.g. 2022-10025"
                  className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-[13px] text-slate-900 focus:outline-none focus:border-blue-600 transition placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Temporary Password */}
            <div className="flex flex-col gap-1">
              <label htmlFor="temp-password" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Temporary Password</label>
              <input 
                id="temp-password"
                type="password" 
                required
                value={tempPassword}
                onChange={(e) => setTempPassword(e.target.value)}
                placeholder="Temporary password sent by Admin"
                className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-[13px] text-slate-900 focus:outline-none focus:border-blue-600 transition placeholder:text-slate-400"
              />
            </div>

            {/* New Password & Confirm Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="new-password" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">New Password</label>
                <input 
                  id="new-password"
                  type="password" 
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 8 chars"
                  className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-[13px] text-slate-900 focus:outline-none focus:border-blue-600 transition placeholder:text-slate-400"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="confirm-password" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Confirm Password</label>
                <input 
                  id="confirm-password"
                  type="password" 
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="bg-white border border-slate-300 rounded-lg px-3 py-2 text-[13px] text-slate-900 focus:outline-none focus:border-blue-600 transition placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Terms and Conditions Checkbox */}
            <div className="flex items-start gap-2.5 mt-2">
              <input 
                id="terms"
                type="checkbox" 
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 mt-0.5 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
              <label htmlFor="terms" className="text-[12.5px] text-slate-600 select-none leading-snug cursor-pointer">
                I agree to the university's research integrity guidelines, computer usage policies, and the <span className="text-blue-600 hover:underline">Advisio Terms and Conditions</span>.
              </label>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-[13.5px] font-bold shadow-md shadow-blue-600/10 active:scale-[0.98] transition cursor-pointer"
            >
              Activate My Account
            </button>

          </form>

          {/* Divider */}
          <div className="border-t border-slate-200 pt-4 text-center text-[13px] text-slate-600">
            Already activated your account?{" "}
            <Link 
              href="/login" 
              className="font-bold text-blue-600 hover:underline transition"
            >
              Sign In Here
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
