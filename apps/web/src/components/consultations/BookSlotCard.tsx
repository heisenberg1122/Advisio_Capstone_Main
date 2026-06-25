import { Card, CardTitle } from "@/components/ui/Card";

export function BookSlotCard() {
  return (
    <Card>
      <CardTitle icon="ti-calendar-plus" className="mb-3">
        Request a consultation
      </CardTitle>
      <p className="text-[13px] text-[var(--color-text-secondary)] mb-4">
        Your adviser has open slots available.
      </p>
      <button className="btn btn-primary btn-sm">
        <i className="ti ti-plus" aria-hidden="true" />
        Book a slot
      </button>
    </Card>
  );
}
