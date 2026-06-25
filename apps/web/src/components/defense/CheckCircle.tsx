import type { DefenseRequirementStatus } from "@/types/student";

interface CheckCircleProps {
  status: DefenseRequirementStatus;
}

export function CheckCircle({ status }: CheckCircleProps) {
  if (status === "done") {
    return (
      <div className="check-circle done" aria-label="Completed">
        <i className="ti ti-check text-[11px]" aria-hidden="true" />
      </div>
    );
  }
  if (status === "in_progress") {
    return (
      <div className="check-circle pending" aria-label="In progress">
        <i className="ti ti-minus text-[11px]" aria-hidden="true" />
      </div>
    );
  }
  return <div className="check-circle" aria-label="Not started" />;
}
