"use client";

import { useState } from "react";
import Image from "next/image";
import { StatusBadge, type StatusKey } from "@/app/dashboard/components/StatusBadge";

export type KycSubmission = {
  id: string;
  player: string;
  documentType: string;
  submittedDate: string;
  status: StatusKey;
  documentImage: string;
  selfieImage: string;
};

export function KycTable({
  submissions,
  canResolve,
}: {
  submissions: KycSubmission[];
  canResolve: boolean;
}) {
  const [rows, setRows] = useState(submissions);
  const [viewingId, setViewingId] = useState<string | null>(null);

  function resolve(id: string, status: "verified" | "rejected") {
    setRows((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
    setViewingId(null);
  }

  if (rows.length === 0) {
    return <p className="py-6 text-center text-sm text-text-muted">No KYC submissions yet.</p>;
  }

  const viewing = rows.find((s) => s.id === viewingId) ?? null;

  return (
    <>
      {/* Mobile: stacked cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {rows.map((s) => (
          <div key={s.id} className="rounded-xl border border-border-hairline bg-surface-2 p-3">
            <div className="mb-2 flex items-center justify-between gap-2">
              <p className="font-medium text-text-primary">{s.player}</p>
              <StatusBadge status={s.status} />
            </div>

            <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm">
              <div>
                <dt className="text-xs text-text-muted">Submission ID</dt>
                <dd className="tabular-nums text-text-secondary">{s.id}</dd>
              </div>
              <div>
                <dt className="text-xs text-text-muted">Document</dt>
                <dd className="text-text-secondary">{s.documentType}</dd>
              </div>
              <div className="col-span-2">
                <dt className="text-xs text-text-muted">Submitted</dt>
                <dd className="tabular-nums text-text-secondary">{s.submittedDate}</dd>
              </div>
            </dl>

            <div className="mt-3">
              <ViewButton onClick={() => setViewingId(s.id)} />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop / tablet: table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-xs uppercase tracking-wider text-text-muted">
              <th className="pb-2 font-medium">Submission ID</th>
              <th className="pb-2 font-medium">Player</th>
              <th className="pb-2 font-medium">Document</th>
              <th className="pb-2 font-medium">Submitted</th>
              <th className="pb-2 font-medium">Status</th>
              <th className="pb-2 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((s) => (
              <tr key={s.id} className="border-t border-border-hairline">
                <td className="py-2.5 tabular-nums text-text-secondary">{s.id}</td>
                <td className="py-2.5 font-medium text-text-primary">{s.player}</td>
                <td className="py-2.5 text-text-secondary">{s.documentType}</td>
                <td className="py-2.5 tabular-nums text-text-muted">{s.submittedDate}</td>
                <td className="py-2.5">
                  <StatusBadge status={s.status} />
                </td>
                <td className="py-2.5">
                  <ViewButton onClick={() => setViewingId(s.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewing && (
        <KycReviewModal
          submission={viewing}
          canResolve={canResolve}
          onClose={() => setViewingId(null)}
          onConfirm={() => resolve(viewing.id, "verified")}
          onReject={() => resolve(viewing.id, "rejected")}
        />
      )}
    </>
  );
}

function ViewButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-md border border-border-hairline bg-surface-2 px-2.5 py-1 text-xs font-medium text-text-secondary transition-colors hover:bg-surface-3 hover:text-text-primary"
    >
      View
    </button>
  );
}

function KycReviewModal({
  submission,
  canResolve,
  onClose,
  onConfirm,
  onReject,
}: {
  submission: KycSubmission;
  canResolve: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onReject: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} aria-hidden="true" />

      <div className="relative flex w-full max-w-lg flex-col rounded-2xl border border-border-hairline bg-surface-1 p-5 shadow-2xl">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-text-primary">{submission.player}</p>
            <p className="text-xs text-text-muted">
              {submission.id} · {submission.documentType}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge status={submission.status} />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="flex h-7 w-7 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-surface-2 hover:text-text-primary"
            >
              <CloseIcon />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-text-muted">Document</p>
            <div className="flex aspect-4/3 items-center justify-center rounded-lg border border-border-hairline bg-surface-2 p-4">
              <Image src={submission.documentImage} alt={`${submission.player} document`} width={80} height={80} className="opacity-80" />
            </div>
          </div>
          <div>
            <p className="mb-1.5 text-xs font-medium uppercase tracking-wider text-text-muted">Selfie</p>
            <div className="flex aspect-4/3 items-center justify-center rounded-lg border border-border-hairline bg-surface-2 p-4">
              <Image src={submission.selfieImage} alt={`${submission.player} selfie`} width={80} height={80} className="opacity-80" />
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-end gap-2">
          {submission.status === "pending" ? (
            canResolve ? (
              <>
                <button
                  type="button"
                  onClick={onReject}
                  className="rounded-md border border-status-critical/40 bg-status-critical/10 px-3 py-1.5 text-xs font-medium text-status-critical transition-colors hover:bg-status-critical/20"
                >
                  Reject
                </button>
                <button
                  type="button"
                  onClick={onConfirm}
                  className="rounded-md border border-status-good/40 bg-status-good/10 px-3 py-1.5 text-xs font-medium text-status-good transition-colors hover:bg-status-good/20"
                >
                  Verify
                </button>
              </>
            ) : (
              <span className="text-xs text-text-muted">Awaiting admin review</span>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}
