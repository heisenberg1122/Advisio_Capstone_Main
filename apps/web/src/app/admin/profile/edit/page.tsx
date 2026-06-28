"use client";

import { ProfileEditForm } from "@/components/profile/ProfileEditForm";

export default function AdminEditProfilePage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-[18px] font-medium mb-0.5">Edit Profile</h1>
        <p className="text-[13px] text-[var(--color-text-secondary)]">
          Modify your profile details, department info, and position settings
        </p>
      </div>

      <ProfileEditForm />
    </div>
  );
}
