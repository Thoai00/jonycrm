"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard", icon: OverviewIcon },
  { label: "Cash In", href: "/dashboard/cash-in", icon: CashInIcon },
  { label: "Cash Out", href: "/dashboard/cash-out", icon: CashOutIcon },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-1">
      <p className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
        Menu
      </p>
      {NAV_ITEMS.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`group flex items-center gap-2.5 rounded-lg border-l-2 px-2.5 py-2 text-sm font-medium transition-colors ${
              active
                ? "border-gold bg-linear-to-r from-gold/12 to-transparent text-gold-bright"
                : "border-transparent text-text-secondary hover:bg-surface-2 hover:text-text-primary"
            }`}
          >
            <Icon
              className={`h-[18px] w-[18px] shrink-0 transition-colors ${
                active ? "text-gold-bright" : "text-text-muted group-hover:text-text-primary"
              }`}
            />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

type IconProps = { className?: string };

function OverviewIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  );
}

function CashInIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18" />
      <path d="M12 19v-5" />
      <path d="M9 16.5l3-3 3 3" />
    </svg>
  );
}

function CashOutIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="6" width="18" height="13" rx="2" />
      <path d="M3 10h18" />
      <path d="M12 14v5" />
      <path d="M9 16.5l3 3 3-3" />
    </svg>
  );
}
