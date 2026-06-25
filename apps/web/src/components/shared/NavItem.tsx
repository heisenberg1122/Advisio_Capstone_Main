"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  icon: string;
  label: string;
}

export function NavItem({ href, icon, label }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/dashboard" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-[10px] px-4 py-[7px] text-[13.5px] transition-all duration-[120ms] border-l-2 border-transparent",
        "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-background-secondary)]",
        isActive &&
          "text-[var(--color-text-info)] bg-[var(--color-background-info)] border-l-[var(--color-border-info)]"
      )}
    >
      <i className={`ti ${icon} text-base w-4 flex-shrink-0`} aria-hidden="true" />
      {label}
    </Link>
  );
}
