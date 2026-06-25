export function ConsultationSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-6 w-40 bg-[var(--color-background-secondary)] rounded" />
      <div className="grid grid-cols-2 gap-4">
        <div className="h-32 bg-[var(--color-background-primary)] rounded-[var(--border-radius-lg)]" />
        <div className="h-32 bg-[var(--color-background-primary)] rounded-[var(--border-radius-lg)]" />
      </div>
      <div className="h-32 bg-[var(--color-background-primary)] rounded-[var(--border-radius-lg)]" />
    </div>
  );
}
