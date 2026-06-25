import { Avatar } from "@/components/ui/Avatar";
import type { StudentProfile } from "@/types/student";

interface UserChipProps {
  profile: StudentProfile;
}

export function UserChip({ profile }: UserChipProps) {
  return (
    <div className="flex items-center gap-[10px]">
      <Avatar initials={profile.initials} colorVariant="info" size="md" />
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-medium truncate text-[var(--color-text-primary)]">
          {profile.name}
        </div>
        <div className="text-[11px] text-[var(--color-text-tertiary)] capitalize">
          {profile.role}
        </div>
      </div>
      <button
        aria-label="Sign out"
        className="text-[var(--color-text-tertiary)] hover:text-[var(--color-text-secondary)] transition-colors cursor-pointer"
      >
        <i className="ti ti-logout text-[15px]" aria-hidden="true" />
      </button>
    </div>
  );
}
