export function NotificationSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--color-background-secondary)]" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3 w-3/4 bg-[var(--color-background-secondary)] rounded" />
            <div className="h-2.5 w-1/4 bg-[var(--color-background-secondary)] rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}
