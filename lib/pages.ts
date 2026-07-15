export type PageKey = {
  path: string;
  label: string;
  section: string;
};

// The full set of dashboard routes that a role can be granted access to.
export const PAGE_CATALOG: PageKey[] = [
  { path: "/dashboard", label: "Overview", section: "Menu" },
  { path: "/dashboard/cash-in", label: "Cash In", section: "Menu" },
  { path: "/dashboard/cash-out", label: "Cash Out", section: "Menu" },
  { path: "/dashboard/my-transactions", label: "My Transactions", section: "Menu" },
  { path: "/dashboard/message", label: "Message", section: "Menu" },
  { path: "/dashboard/accounts", label: "Account", section: "Menu" },
  { path: "/dashboard/images", label: "Image", section: "Menu" },
  { path: "/dashboard/kyc", label: "KYC Verification", section: "Compliance" },
];
