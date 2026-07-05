const STATUS_MAP = {
  completed: { label: "Completed", color: "var(--status-good)", icon: "✓" },
  pending: { label: "Pending", color: "var(--status-warning)", icon: "…" },
  failed: { label: "Failed", color: "var(--status-critical)", icon: "✕" },
  vip: { label: "VIP", color: "var(--gold-bright)", icon: "★" },
  active: { label: "Active", color: "var(--status-good)", icon: "●" },
  suspended: { label: "Suspended", color: "var(--status-critical)", icon: "■" },
} as const;

export type StatusKey = keyof typeof STATUS_MAP;

export function StatusBadge({ status }: { status: StatusKey }) {
  const { label, color, icon } = STATUS_MAP[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium"
      style={{ color, borderColor: `color-mix(in srgb, ${color} 40%, transparent)`, background: `color-mix(in srgb, ${color} 12%, transparent)` }}
    >
      <span aria-hidden>{icon}</span>
      {label}
    </span>
  );
}
