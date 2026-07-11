"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PAGE_CATALOG } from "@/lib/pages";

type IconProps = { className?: string };

const ICONS: Record<string, (props: IconProps) => React.ReactElement> = {
  "/dashboard": OverviewIcon,
  "/dashboard/cash-in": CashInIcon,
  "/dashboard/cash-out": CashOutIcon,
  "/dashboard/my-transactions": MyTransactionsIcon,
  "/dashboard/message": MessageIcon,
  "/dashboard/kyc": KycIcon,
  "/dashboard/accounts": AccountIcon,
};

export const NAV_ITEMS = PAGE_CATALOG.map((page) => ({
  label: page.label,
  href: page.path,
  section: page.section,
  icon: ICONS[page.path],
}));

export function SidebarNav({ pages }: { pages: string[] }) {
  const pathname = usePathname();
  const items = NAV_ITEMS.filter((item) => pages.includes(item.href));
  const sections = groupBySection(items);

  return (
    <nav className="flex flex-1 flex-col gap-4">
      {sections.map(([section, sectionItems]) => (
        <div key={section} className="flex flex-col gap-1">
          <p className="mb-1 px-3 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
            {section}
          </p>
          {sectionItems.map((item) => {
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
        </div>
      ))}
    </nav>
  );
}

export function groupBySection<T extends { section: string }>(items: T[]): [string, T[]][] {
  const sections: [string, T[]][] = [];
  for (const item of items) {
    const group = sections.find(([section]) => section === item.section);
    if (group) {
      group[1].push(item);
    } else {
      sections.push([item.section, [item]]);
    }
  }
  return sections;
}

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

function MyTransactionsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <path d="M8 14l3 3 5-6" />
    </svg>
  );
}

function MessageIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 5h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H8l-4 4V6a1 1 0 0 1 1-1Z" />
      <path d="M8 10h8" />
      <path d="M8 14h5" />
    </svg>
  );
}

function KycIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <circle cx="12" cy="9.5" r="2.25" />
      <path d="M8 17c0-2 1.8-3.5 4-3.5s4 1.5 4 3.5" />
    </svg>
  );
}

function AccountIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M18 8v6" />
      <path d="M15 11h6" />
    </svg>
  );
}
