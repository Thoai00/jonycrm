import { TransactionsTable } from "@/app/dashboard/components/TransactionsTable";
import { cashOutTransactions } from "@/app/dashboard/data";
import { requirePage } from "@/lib/session";

export default async function CashOutPage() {
  const session = await requirePage("/dashboard/cash-out");

  return (
    <div className="rounded-2xl border border-border-hairline bg-surface-1 p-5">
      <h2 className="mb-4 text-sm font-semibold text-text-primary">Cash out requests</h2>
      <TransactionsTable transactions={cashOutTransactions} variant="cash-out" canResolve={session.canApprove} />
    </div>
  );
}
