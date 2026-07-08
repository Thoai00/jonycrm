"use client";

import { useState } from "react";
import { StatusBadge, type StatusKey } from "@/app/dashboard/components/StatusBadge";

export type Transaction = {
  id: string;
  player: string;
  paymentMethod: string;
  accountNumber?: string;
  amount: string;
  status: StatusKey;
  date: string;
  agent?: string;
};

type TransactionsTableProps = {
  transactions: Transaction[];
  variant: "cash-in" | "cash-out";
  canResolve: boolean;
};

export function TransactionsTable({ transactions, variant, canResolve }: TransactionsTableProps) {
  const [rows, setRows] = useState(transactions);

  function resolve(id: string, status: "completed" | "failed") {
    setRows((prev) => prev.map((tx) => (tx.id === id ? { ...tx, status } : tx)));
  }

  const refLabel = variant === "cash-in" ? "Transaction ID" : "Account number";
  const refValue = (tx: Transaction) => (variant === "cash-in" ? tx.id : tx.accountNumber);

  if (rows.length === 0) {
    return <p className="py-6 text-center text-sm text-text-muted">No transactions yet.</p>;
  }

  return (
    <>
      {/* Mobile: stacked cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {rows.map((tx) => (
          <div key={tx.id} className="rounded-xl border border-border-hairline bg-surface-2 p-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="font-medium text-text-primary">{tx.player}</p>
              <StatusBadge status={tx.status} />
            </div>

            <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm">
              <div>
                <dt className="text-xs text-text-muted">{refLabel}</dt>
                <dd className="tabular-nums text-text-secondary">{refValue(tx)}</dd>
              </div>
              <div>
                <dt className="text-xs text-text-muted">Payment method</dt>
                <dd className="text-text-secondary">{tx.paymentMethod}</dd>
              </div>
              <div>
                <dt className="text-xs text-text-muted">Amount</dt>
                <dd className="tabular-nums font-medium text-text-primary">{tx.amount}</dd>
              </div>
              <div>
                <dt className="text-xs text-text-muted">Date</dt>
                <dd className="tabular-nums text-text-secondary">{tx.date}</dd>
              </div>
            </dl>

            {tx.status === "pending" && (
              <div className="mt-3">
                {canResolve ? (
                  <ResolveActions onConfirm={() => resolve(tx.id, "completed")} onReject={() => resolve(tx.id, "failed")} />
                ) : (
                  <span className="text-xs text-text-muted">Awaiting admin approval</span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Desktop / tablet: table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wider text-text-muted">
              <th className="pb-2 font-medium">{refLabel}</th>
              <th className="pb-2 font-medium">Player</th>
              <th className="pb-2 font-medium">Payment method</th>
              <th className="pb-2 font-medium">Amount</th>
              <th className="pb-2 font-medium">Status</th>
              <th className="pb-2 font-medium">Date</th>
              <th className="pb-2 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((tx) => (
              <tr key={tx.id} className="border-t border-border-hairline">
                <td className="py-2.5 tabular-nums text-text-secondary">{refValue(tx)}</td>
                <td className="py-2.5 font-medium text-text-primary">{tx.player}</td>
                <td className="py-2.5 text-text-secondary">{tx.paymentMethod}</td>
                <td className="py-2.5 tabular-nums text-text-primary">{tx.amount}</td>
                <td className="py-2.5">
                  <StatusBadge status={tx.status} />
                </td>
                <td className="py-2.5 tabular-nums text-text-muted">{tx.date}</td>
                <td className="py-2.5">
                  {tx.status === "pending" ? (
                    canResolve ? (
                      <ResolveActions onConfirm={() => resolve(tx.id, "completed")} onReject={() => resolve(tx.id, "failed")} />
                    ) : (
                      <span className="text-xs text-text-muted">Awaiting admin approval</span>
                    )
                  ) : (
                    <span className="text-xs text-text-muted">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

function ResolveActions({ onConfirm, onReject }: { onConfirm: () => void; onReject: () => void }) {
  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={onConfirm}
        className="rounded-md border border-status-good/40 bg-status-good/10 px-2.5 py-1 text-xs font-medium text-status-good transition-colors hover:bg-status-good/20"
      >
        Confirm
      </button>
      <button
        type="button"
        onClick={onReject}
        className="rounded-md border border-status-critical/40 bg-status-critical/10 px-2.5 py-1 text-xs font-medium text-status-critical transition-colors hover:bg-status-critical/20"
      >
        Reject
      </button>
    </div>
  );
}
