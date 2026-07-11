"use client";

import { usePathname } from "next/navigation";

const TITLES: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/cash-in": "Cash In",
  "/dashboard/cash-out": "Cash Out",
  "/dashboard/my-transactions": "My Transactions",
  "/dashboard/message": "Message",
  "/dashboard/kyc": "KYC Verification",
  "/dashboard/accounts": "Account",
};

export function PageHeading() {
  const pathname = usePathname();
  const title = TITLES[pathname] ?? TITLES["/dashboard"];

  return <h1 className="text-lg font-semibold text-text-primary">{title}</h1>;
}
