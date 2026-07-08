import { KycTable } from "@/app/dashboard/components/KycTable";
import { kycSubmissions } from "@/app/dashboard/data";
import { requirePage } from "@/lib/session";

export default async function KycPage() {
  const session = await requirePage("/dashboard/kyc");

  return (
    <div className="rounded-2xl border border-border-hairline bg-surface-1 p-5">
      <h2 className="mb-4 text-sm font-semibold text-text-primary">KYC submissions</h2>
      <KycTable submissions={kycSubmissions} canResolve={session.canApprove} />
    </div>
  );
}
