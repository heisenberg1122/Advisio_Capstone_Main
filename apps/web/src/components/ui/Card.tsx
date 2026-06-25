import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  accentColor?: "success" | "warning" | "danger" | "info";
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

interface CardTitleProps {
  icon?: string;
  children: ReactNode;
  className?: string;
}

const accentClass = {
  success: "border-l-[3px] border-l-[var(--color-border-success)]",
  warning: "border-l-[3px] border-l-[var(--color-border-warning)]",
  danger:  "border-l-[3px] border-l-[var(--color-border-danger)]",
  info:    "border-l-[3px] border-l-[var(--color-border-info)]",
};

export function Card({ children, className, accentColor }: CardProps) {
  return (
    <div
      className={cn(
        "bg-[var(--color-background-primary)] border border-[var(--color-border-tertiary)] rounded-[var(--border-radius-lg)] p-5",
        accentColor && accentClass[accentColor],
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between mb-4", className)}>
      {children}
    </div>
  );
}

export function CardTitle({ icon, children, className }: CardTitleProps) {
  return (
    <div className={cn("flex items-center gap-[7px] text-sm font-medium", className)}>
      {icon && (
        <i
          className={`ti ${icon} text-base text-[var(--color-text-secondary)]`}
          aria-hidden="true"
        />
      )}
      {children}
    </div>
  );
}

export function CardLink({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="text-xs text-[var(--color-text-info)] cursor-pointer flex items-center gap-1 hover:opacity-80 transition-opacity"
    >
      {children}
      <i className="ti ti-arrow-right text-xs" aria-hidden="true" />
    </button>
  );
}
