"use client";

import { useAdvisers } from "@/hooks/use-student";
import { Card } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Tag } from "@/components/ui/Tag";

export default function AdviserPoolPage() {
  const { data, isPending } = useAdvisers();

  if (isPending) return <PageSkeleton />;
  if (!data) return null;

  const { assigned, available } = data;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-[18px] font-medium mb-0.5">Adviser pool</h1>
        <p className="text-[13px] text-[var(--color-text-secondary)]">
          Browse and apply for an adviser
        </p>
      </div>

      {/* Assigned adviser */}
      {assigned && (
        <Card accentColor="success" className="mb-4">
          <div className="text-[13px] font-medium text-[var(--color-text-success)] mb-3">
            <i className="ti ti-check mr-1.5" aria-hidden="true" />
            Your group has an assigned adviser
          </div>
          <div className="flex items-center gap-[10px]">
            <Avatar initials={assigned.initials} colorVariant={assigned.colorVariant ?? "info"} size="lg" />
            <div>
              <div className="text-[14px] font-medium">{assigned.name}</div>
              <div className="text-[12px] text-[var(--color-text-tertiary)]">
                {assigned.college} · {assigned.adviseeCount} advisees · Avg. response {assigned.avgResponseDays} days
              </div>
            </div>
          </div>
        </Card>
      )}

      <div className="text-[13px] font-medium mb-3 text-[var(--color-text-secondary)]">
        All available advisers
      </div>

      <div className="space-y-3">
        {available.map((adviser) => (
          <Card key={adviser.id}>
            <div className="flex items-center gap-[10px]">
              <Avatar
                initials={adviser.initials}
                colorVariant={adviser.colorVariant ?? "info"}
                size="lg"
              />
              <div className="flex-1">
                <div className="text-[14px] font-medium">{adviser.name}</div>
                <div className="text-[12px] text-[var(--color-text-tertiary)]">
                  {adviser.college} · {adviser.adviseeCount} advisees · Avg. response {adviser.avgResponseDays} days
                </div>
              </div>
              {adviser.isFull ? (
                <Tag variant="warn">Full</Tag>
              ) : (
                <button className="btn btn-sm">Apply</button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

function PageSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="h-6 w-32 bg-[var(--color-background-secondary)] rounded" />
      <div className="h-24 bg-[var(--color-background-primary)] rounded-[var(--border-radius-lg)]" />
      <div className="h-20 bg-[var(--color-background-primary)] rounded-[var(--border-radius-lg)]" />
    </div>
  );
}
