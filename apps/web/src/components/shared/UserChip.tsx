"use client";

import { Avatar } from "@/components/ui/Avatar";
import type { StudentProfile } from "@/types/student";
import { useProfile } from "@/hooks/use-profile";

interface UserChipProps {
  profile: StudentProfile;
  collapsed?: boolean;
}

export function UserChip({ profile: initialProfile, collapsed = false }: UserChipProps) {
  const { profile } = useProfile();
  const activeProfile = profile || initialProfile;

  return (
    <div className={`flex items-center gap-[10px] text-white ${collapsed ? "justify-center" : ""}`}>
      <div title={collapsed ? activeProfile.name : undefined}>
        <Avatar
          initials={activeProfile.initials}
          colorVariant="info"
          size="md"
        />
      </div>
      {!collapsed && (
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-bold truncate text-white">
            {activeProfile.name}
          </div>
          <div className="text-[10px] text-slate-350 capitalize font-medium">
            {activeProfile.role?.replace("_", " ")}
          </div>
        </div>
      )}
    </div>
  );
}
