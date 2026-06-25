"use client";

import { useConsultations } from "@/hooks/use-student";
import { BookSlotCard } from "@/components/consultations/BookSlotCard";
import { NextConsultationCard } from "@/components/consultations/NextConsultationCard";
import { ConsultationHistoryList } from "@/components/consultations/ConsultationHistoryList";
import { ConsultationSkeleton } from "@/components/consultations/ConsultationSkeleton";

export default function ConsultationsPage() {
  const { data, isPending } = useConsultations();

  if (isPending) return <ConsultationSkeleton />;
  if (!data) return null;

  const { list, next } = data;
  const history = list.filter((c) => c.status === "done");

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-[18px] font-medium mb-0.5">Consultations</h1>
        <p className="text-[13px] text-[var(--color-text-secondary)]">
          Request and track consultations with your adviser
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <BookSlotCard />
        <NextConsultationCard consultation={next} />
      </div>

      <ConsultationHistoryList history={history} />
    </div>
  );
}
