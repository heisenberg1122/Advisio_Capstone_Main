import { Card, CardTitle } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
import type { Consultation, ConsultationStatus } from "@/types/student";

const statusVariant: Record<ConsultationStatus, "success" | "warn" | "info" | "neutral"> = {
  confirmed: "info",
  pending:   "warn",
  done:      "success",
  cancelled: "neutral",
};

interface NextConsultationCardProps {
  consultation: Consultation | null;
}

export function NextConsultationCard({ consultation }: NextConsultationCardProps) {
  return (
    <Card>
      <CardTitle icon="ti-clock" className="mb-3">
        Next consultation
      </CardTitle>
      {consultation ? (
        <>
          <div className="text-[15px] font-medium mb-0.5">{consultation.date}</div>
          <div className="text-[13px] text-[var(--color-text-secondary)]">
            {consultation.timeRange} with {consultation.adviser}
          </div>
          <div className="mt-3">
            <Tag variant={statusVariant[consultation.status]}>
              {consultation.status.charAt(0).toUpperCase() + consultation.status.slice(1)}
            </Tag>
          </div>
        </>
      ) : (
        <p className="text-[13px] text-[var(--color-text-tertiary)]">
          No upcoming consultations.
        </p>
      )}
    </Card>
  );
}
