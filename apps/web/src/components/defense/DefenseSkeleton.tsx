export function DefenseSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-6 w-36 bg-[var(--color-background-secondary)] rounded" />
      <div className="h-20 bg-[var(--color-background-primary)] rounded-[var(--border-radius-lg)]" />
      <div className="h-64 bg-[var(--color-background-primary)] rounded-[var(--border-radius-lg)]" />
    </div>
  );
}
