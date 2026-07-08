import { TransactionsTable } from "@/app/dashboard/components/TransactionsTable";
import { cashInTransactions, cashOutTransactions } from "@/app/dashboard/data";
import { requirePage } from "@/lib/session";

export default async function MyTransactionsPage() {
  const session = await requirePage("/dashboard/my-transactions");

  const myCashIn = cashInTransactions.filter((tx) => tx.agent === session.user);
  const myCashOut = cashOutTransactions.filter((tx) => tx.agent === session.user);

  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-2xl border border-border-hairline bg-surface-1 p-5">
        <p className="text-xs uppercase tracking-wider text-text-muted">Your commission rate</p>
        <p className="mt-1 text-2xl font-semibold text-gold-bright">{session.percentage ?? 0}%</p>
      </div>

      <div className="rounded-2xl border border-border-hairline bg-surface-1 p-5">
        <h2 className="mb-4 text-sm font-semibold text-text-primary">Cash in</h2>
        <TransactionsTable transactions={myCashIn} variant="cash-in" canResolve={false} />
      </div>

      <div className="rounded-2xl border border-border-hairline bg-surface-1 p-5">
        <h2 className="mb-4 text-sm font-semibold text-text-primary">Cash out</h2>
        <TransactionsTable transactions={myCashOut} variant="cash-out" canResolve={false} />
      </div>
    </div>
  );
}
