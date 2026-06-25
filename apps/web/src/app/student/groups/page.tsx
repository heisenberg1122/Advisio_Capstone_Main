"use client";

import { useStudentGroup } from "@/hooks/use-student";
import { Card, CardHeader, CardTitle } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Tag } from "@/components/ui/Tag";

export default function GroupsPage() {
  const { data: group, isPending } = useStudentGroup();

  if (isPending) return <PageSkeleton />;
  if (!group) return null;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-[18px] font-medium mb-0.5">My group</h1>
        <p className="text-[13px] text-[var(--color-text-secondary)]">
          Group management and workspace
        </p>
      </div>

      {/* Group info card */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle icon="ti-users">{group.name}</CardTitle>
          <Tag variant="info">Active</Tag>
        </CardHeader>
        <p className="text-[13px] text-[var(--color-text-secondary)] mb-4">
          Research title: {group.researchTitle}
        </p>

        <div className="text-[12px] font-medium text-[var(--color-text-tertiary)] mb-2 uppercase tracking-[0.04em]">
          Members
        </div>

        {group.members.map((member, i) => (
          <div
            key={member.id}
            className={`flex items-center gap-3 py-3 ${i < group.members.length - 1 ? "border-b border-[var(--color-border-tertiary)]" : ""}`}
          >
            <Avatar
              initials={member.initials}
              colorVariant={member.colorVariant ?? "info"}
              size="lg"
            />
            <div className="flex-1">
              <div className="text-[13px]">
                {member.name}
                {member.isYou && (
                  <span className="text-[var(--color-text-tertiary)] ml-1">(you)</span>
                )}
              </div>
              <div className="text-[11px] text-[var(--color-text-tertiary)]">
                {member.role === "leader" ? "Group leader" : "Member"}
              </div>
            </div>
            {member.role === "leader" && <Tag variant="info">Leader</Tag>}
          </div>
        ))}
      </Card>

      {/* Workspace thread card */}
      <Card>
        <CardTitle icon="ti-message-circle" className="mb-4">
          Group workspace thread
        </CardTitle>
        <p className="text-[13px] text-[var(--color-text-secondary)] mb-4">
          Created by your adviser — you were added automatically.
        </p>
        <button className="btn btn-primary">
          <i className="ti ti-external-link" aria-hidden="true" />
          Open workspace
        </button>
      </Card>
    </div>
  );
}

function PageSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-6 w-32 bg-[var(--color-background-secondary)] rounded" />
      <div className="h-48 bg-[var(--color-background-primary)] rounded-[var(--border-radius-lg)]" />
    </div>
  );
}
