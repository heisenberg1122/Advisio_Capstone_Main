import { cn } from "@/lib/utils";
import type { TagVariant } from "@/types/student";

interface TagProps {
  variant: TagVariant;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md";
}

const variantClass: Record<TagVariant, string> = {
  info:    "tag-info",
  success: "tag-success",
  warn:    "tag-warn",
  danger:  "tag-danger",
  neutral: "tag-neutral",
};

export function Tag({ variant, children, className, size }: TagProps) {
  return (
    <span
      className={cn(
        "tag",
        variantClass[variant],
        size === "sm" && "px-1.5 py-px",
        className
      )}
    >
      {children}
    </span>
  );
}
