import type { ResearchProgress } from "@/types/student";

interface ProgressBannerProps {
  progress: ResearchProgress;
}

export function ProgressBanner({ progress }: ProgressBannerProps) {
  return (
    <div
      className="flex items-center gap-6 rounded-[var(--border-radius-lg)] border border-[var(--color-border-tertiary)] px-6 py-5 mb-6 animate-fade-in-up"
      style={{ background: "var(--color-background-primary)" }}
    >
      <div className="flex-1">
        <div className="text-[13px] text-[var(--color-text-secondary)] mb-1.5">
          Research progress
        </div>
        <div className="text-[15px] font-medium mb-2.5">
          {progress.currentChapterTitle}
        </div>
        <div className="progress-bar-track">
          <div
            className="progress-bar-fill"
            style={{ width: `${progress.completionPercent}%` }}
            role="progressbar"
            aria-valuenow={progress.completionPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Research ${progress.completionPercent}% complete`}
          />
        </div>
        <div className="flex gap-1.5 mt-2.5 flex-wrap">
          {progress.phases.map((p) => (
            <span key={p.phase} className={`step-pill ${p.status}`}>
              {p.label}
            </span>
          ))}
        </div>
      </div>

      <div className="text-right flex-shrink-0">
        <div
          className="text-2xl font-medium"
          style={{ color: "var(--color-text-success)" }}
        >
          {progress.completionPercent}%
        </div>
        <div className="text-[11px] text-[var(--color-text-tertiary)]">
          overall completion
        </div>
      </div>
    </div>
  );
}
