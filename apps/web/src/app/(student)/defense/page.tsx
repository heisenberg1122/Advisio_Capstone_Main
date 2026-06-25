"use client";

import { useDefense } from "@/hooks/use-student";
import { EligibilityBanner } from "@/components/defense/EligibilityBanner";
import { DefenseChecklist } from "@/components/defense/DefenseChecklist";
import { DefenseSkeleton } from "@/components/defense/DefenseSkeleton";

export default function DefensePage() {
  const { data, isPending } = useDefense();

  if (isPending) return <DefenseSkeleton />;
  if (!data) return null;

  const { requirements, eligibility } = data;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-[18px] font-medium mb-0.5">Defense center</h1>
        <p className="text-[13px] text-[var(--color-text-secondary)]">
          Track eligibility and defense schedule
        </p>
      </div>

      <EligibilityBanner eligibility={eligibility} />
      <DefenseChecklist requirements={requirements} />
    </div>
  );
}
