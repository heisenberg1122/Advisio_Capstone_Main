import type { StudentStats, DefenseEligibility } from "@/types/student";

interface StatsRowProps {
  stats: StudentStats;
}

function StatCard({
  label,
  value,
  meta,
}: {
  label: string;
  value: string | number;
  meta?: string;
}) {
  return (
    <div
      className="rounded-[var(--border-radius-md)] px-4 py-3.5"
      style={{ background: "var(--color-background-secondary)" }}
    >
      <div className="text-[11px] text-[var(--color-text-tertiary)] mb-1 uppercase tracking-[0.04em]">
        {label}
      </div>
      <div className="text-[22px] font-medium leading-none">{value}</div>
      {meta && (
        <div className="text-[11px] text-[var(--color-text-secondary)] mt-0.5">
          {meta}
        </div>
      )}
    </div>
  );
}

function defenseLabel(eligibility: DefenseEligibility): string {
  if (eligibility === "eligible") return "Eligible";
  if (eligibility === "pending") return "Pending";
  return "Not yet\neligible";
}

export function StatsRow({ stats }: StatsRowProps) {
  return (
    <div className="grid grid-cols-4 gap-[10px] mb-6 animate-stagger">
      <StatCard
        label="Submissions"
        value={stats.submissions}
        meta={`${stats.submissionsPendingReview} pending review`}
      />
      <StatCard
        label="Consultations"
        value={stats.consultations}
        meta={`${stats.consultationsUpcoming} upcoming`}
      />
      <StatCard
        label="Tasks left"
        value={stats.tasksLeft}
        meta="due this week"
      />
      <div
        className="rounded-[var(--border-radius-md)] px-4 py-3.5"
        style={{ background: "var(--color-background-secondary)" }}
      >
        <div className="text-[11px] text-[var(--color-text-tertiary)] mb-1 uppercase tracking-[0.04em]">
          Defense
        </div>
        <div className="text-[15px] font-medium pt-1 leading-snug whitespace-pre-line">
          {defenseLabel(stats.defenseEligibility)}
        </div>
      </div>
    </div>
  );
}
