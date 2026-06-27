"use client";

import { Avatar } from "@/components/ui/Avatar";
import type { StudentProfile } from "@/types/student";

interface UserChipProps {
  profile: StudentProfile;
}

export function UserChip({ profile }: UserChipProps) {
  const handleLogout = () => {
    window.location.href = "/login";
  };

  return (
    <div className="flex items-center gap-[10px] text-white">
      <Avatar initials={profile.initials} colorVariant="info" size="md" />
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-bold truncate text-white">
          {profile.name}
        </div>
        <div className="text-[10px] text-slate-350 capitalize font-medium">
          {profile.role}
        </div>
      </div>
      <button
        onClick={handleLogout}
        aria-label="Sign out"
        className="text-slate-400 hover:text-[#ffa400] transition-colors cursor-pointer"
      >
        <i className="ti ti-logout text-[15px]" aria-hidden="true" />
      </button>
    </div>
  );
}
