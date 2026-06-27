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
        "flex items-center gap-[10px] px-4 py-[7px] text-[13.5px] transition-all duration-[120ms] rounded-lg mx-2 my-0.5",
        "text-slate-300 hover:text-white hover:bg-white/5",
        isActive &&
          "bg-[#ffa400] text-[#1b4264] font-bold shadow-md shadow-[#ffa400]/10 hover:bg-[#ffa400] hover:text-[#1b4264]"
      )}
    >
      <i className={`ti ${icon} text-base w-4 flex-shrink-0`} aria-hidden="true" />
      {label}
    </Link>
  );
}
