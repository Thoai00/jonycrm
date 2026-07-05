type StatTileProps = {
  label: string;
  value: string;
  delta?: { value: string; direction: "up" | "down"; isGood: boolean };
  sparkline?: number[];
};

export function StatTile({ label, value, delta, sparkline }: StatTileProps) {
  const deltaColor = delta
    ? delta.isGood
      ? "text-status-good"
      : "text-status-critical"
    : "";

  return (
    <div className="rounded-2xl border border-border-hairline bg-surface-1 p-5">
      <p className="text-xs font-medium uppercase tracking-wider text-text-muted">{label}</p>
      <div className="mt-2 flex items-end justify-between gap-3">
        <p className="text-3xl font-semibold text-text-primary">{value}</p>
        {sparkline && <Sparkline values={sparkline} />}
      </div>
      {delta && (
        <p className={`mt-1 text-sm font-medium ${deltaColor}`}>
          {delta.direction === "up" ? "↑" : "↓"} {delta.value}
          <span className="ml-1 font-normal text-text-muted">vs last week</span>
        </p>
      )}
    </div>
  );
}

function Sparkline({ values }: { values: number[] }) {
  const width = 72;
  const height = 28;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;

  const points = values
    .map((v, i) => {
      const x = (i / (values.length - 1)) * width;
      const y = height - ((v - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="shrink-0">
      <polyline
        points={points}
        fill="none"
        stroke="var(--gold)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
