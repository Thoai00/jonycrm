import { TransactionsTable } from "@/app/dashboard/components/TransactionsTable";
import { cashInTransactions } from "@/app/dashboard/data";
import { requirePage } from "@/lib/session";

export default async function CashInPage() {
  const session = await requirePage("/dashboard/cash-in");

  return (
    <div className="rounded-2xl border border-border-hairline bg-surface-1 p-5">
      <h2 className="mb-4 text-sm font-semibold text-text-primary">Cash in requests</h2>
      <TransactionsTable transactions={cashInTransactions} variant="cash-in" canResolve={session.canApprove} />
    </div>
  );
}
