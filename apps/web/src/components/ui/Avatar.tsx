import { cn } from "@/lib/utils";
import type { AvatarVariant } from "@/types/student";

interface AvatarProps {
  initials: string;
  colorVariant?: AvatarVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const variantClass: Record<AvatarVariant, string> = {
  info:    "bg-[var(--color-background-info)]    text-[var(--color-text-info)]",
  success: "bg-[var(--color-background-success)] text-[var(--color-text-success)]",
  warning: "bg-[var(--color-background-warning)] text-[var(--color-text-warning)]",
  danger:  "bg-[var(--color-background-danger)]  text-[var(--color-text-danger)]",
};

const sizeClass = {
  sm: "w-6 h-6 text-[10px]",
  md: "w-8 h-8 text-xs",
  lg: "w-9 h-9 text-sm",
};

export function Avatar({ initials, colorVariant = "info", size = "md", className }: AvatarProps) {
  return (
    <div
      className={cn(
        "avatar flex-shrink-0",
        variantClass[colorVariant],
        sizeClass[size],
        className
      )}
    >
      {initials}
    </div>
  );
}
