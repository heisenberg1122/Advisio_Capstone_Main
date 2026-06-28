"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProfileCard } from "@/components/profile/ProfileCard";

function AdminProfilePageContent() {
  const searchParams = useSearchParams();
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get("saved") === "true") {
      setToast("Profile updated successfully!");
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  return (
    <div>
      {toast && (
        <div className="fixed top-5 right-5 z-55 bg-[#1b4264] border-l-4 border-[#ffa400] text-white px-4 py-3 rounded-lg shadow-xl flex items-center gap-3">
          <i className="ti ti-circle-check text-[#ffa400] text-lg" />
          <span className="text-[12px] font-bold">{toast}</span>
        </div>
      )}

      <div className="mb-6">
        <h1 className="text-[18px] font-medium mb-0.5">My Profile</h1>
        <p className="text-[13px] text-[var(--color-text-secondary)]">
          Manage your office details, employee identification, and administrative profile settings
        </p>
      </div>

      <ProfileCard />
    </div>
  );
}

export default function AdminProfilePage() {
  return (
    <Suspense fallback={<div className="p-6 text-[#1b4264]">Loading Profile...</div>}>
      <AdminProfilePageContent />
    </Suspense>
  );
}
