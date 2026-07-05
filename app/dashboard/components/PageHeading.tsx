"use client";

import { usePathname } from "next/navigation";

const TITLES: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": { title: "Overview", subtitle: "Live snapshot of casino activity" },
  "/dashboard/cash-in": { title: "Cash In", subtitle: "Deposit requests across all payment methods" },
  "/dashboard/cash-out": { title: "Cash Out", subtitle: "Withdrawal requests awaiting payout" },
};

export function PageHeading() {
  const pathname = usePathname();
  const { title, subtitle } = TITLES[pathname] ?? TITLES["/dashboard"];

  return (
    <div>
      <h1 className="text-lg font-semibold text-text-primary">{title}</h1>
      <p className="text-sm text-text-muted">{subtitle}</p>
    </div>
  );
}
