import { TransactionsTable } from "@/app/dashboard/components/TransactionsTable";
import { cashOutTransactions } from "@/app/dashboard/data";

export default function CashOutPage() {
  return (
    <div className="rounded-2xl border border-border-hairline bg-surface-1 p-5">
      <h2 className="mb-4 text-sm font-semibold text-text-primary">Cash out requests</h2>
      <TransactionsTable transactions={cashOutTransactions} variant="cash-out" />
    </div>
  );
}
