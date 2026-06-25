"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-800 font-sans">
      <div className="w-full max-w-[420px] bg-white rounded-2xl border border-slate-200 p-8 shadow-lg flex flex-col gap-6 animate-fade-in-up">
        
        {/* Brand Header */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-md">
            <i className="ti ti-school text-sm text-white" />
          </div>
          <span className="font-extrabold text-[16px] tracking-tight text-slate-900">ADVISIO</span>
        </div>

        {!submitted ? (
          <>
            <div>
              <h1 className="text-[22px] font-bold text-slate-900">Reset Password</h1>
              <p className="mt-1 text-[13px] text-slate-500 leading-relaxed">
                Enter your university email address below. If your account is registered, we'll send a secure password reset link to your inbox.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  University Email Address
                </label>
                <input 
                  id="email"
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. username@university.edu.ph"
                  className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2.5 text-[13.5px] text-slate-900 focus:outline-none focus:border-blue-600 transition placeholder:text-slate-400"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-[13.5px] font-bold shadow-md shadow-blue-600/10 active:scale-[0.98] transition cursor-pointer"
              >
                Send Reset Link
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col gap-4 text-center py-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
              <i className="ti ti-mail-check text-xl" />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-slate-900">Reset Link Dispatched</h3>
              <p className="text-[13px] text-slate-500 mt-2 px-2 leading-relaxed">
                A password reset notification has been sent to <strong>{email}</strong>. Please check your inbox or spam folder.
              </p>
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="border-t border-slate-100 pt-4 text-center">
          <Link 
            href="/login" 
            className="text-[13px] font-semibold text-blue-600 hover:underline transition flex items-center justify-center gap-1.5"
          >
            <i className="ti ti-arrow-left" /> Back to Sign In
          </Link>
        </div>

      </div>
    </div>
  );
}
