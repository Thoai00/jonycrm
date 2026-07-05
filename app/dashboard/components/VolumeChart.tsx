"use client";

import { useState } from "react";

type Day = { label: string; deposits: number; withdrawals: number };

const WIDTH = 640;
const HEIGHT = 220;
const PAD_LEFT = 44;
const PAD_RIGHT = 12;
const PAD_TOP = 16;
const PAD_BOTTOM = 28;
const BAR_WIDTH = 14;
const BAR_GAP = 2;

export function VolumeChart({ data }: { data: Day[] }) {
  const [hover, setHover] = useState<{ day: Day; series: "deposits" | "withdrawals" } | null>(null);

  const plotWidth = WIDTH - PAD_LEFT - PAD_RIGHT;
  const plotHeight = HEIGHT - PAD_TOP - PAD_BOTTOM;
  const groupWidth = plotWidth / data.length;

  const max = Math.max(...data.flatMap((d) => [d.deposits, d.withdrawals]));
  const niceMax = Math.ceil(max / 5000) * 5000;

  const yFor = (v: number) => (v / niceMax) * plotHeight;
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => Math.round(niceMax * t));

  return (
    <div className="relative">
      <div className="mb-3 flex items-center gap-4 text-xs text-text-secondary">
        <span className="flex items-center gap-1.5">
          <span className="h-0.5 w-3 rounded-full" style={{ background: "var(--series-1)" }} />
          Cash in
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-0.5 w-3 rounded-full" style={{ background: "var(--series-2)" }} />
          Cash out
        </span>
      </div>

      <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} className="w-full" style={{ minWidth: 480 }}>
        {ticks.map((t) => (
          <g key={t}>
            <line
              x1={PAD_LEFT}
              x2={WIDTH - PAD_RIGHT}
              y1={PAD_TOP + plotHeight - yFor(t)}
              y2={PAD_TOP + plotHeight - yFor(t)}
              stroke="var(--border-hairline)"
              strokeWidth="1"
            />
            <text
              x={PAD_LEFT - 8}
              y={PAD_TOP + plotHeight - yFor(t) + 3}
              textAnchor="end"
              fontSize="10"
              fill="var(--text-muted)"
            >
              {t >= 1000 ? `${t / 1000}K` : t}
            </text>
          </g>
        ))}

        {data.map((d, i) => {
          const groupX = PAD_LEFT + i * groupWidth + groupWidth / 2;
          const depX = groupX - BAR_WIDTH - BAR_GAP / 2;
          const witX = groupX + BAR_GAP / 2;
          const depH = yFor(d.deposits);
          const witH = yFor(d.withdrawals);
          const baseY = PAD_TOP + plotHeight;

          return (
            <g key={d.label}>
              <rect
                x={depX}
                y={baseY - depH}
                width={BAR_WIDTH}
                height={depH}
                rx={4}
                fill="var(--series-1)"
                opacity={hover && hover.day === d && hover.series !== "deposits" ? 0.5 : 1}
                onPointerEnter={() => setHover({ day: d, series: "deposits" })}
                onPointerLeave={() => setHover(null)}
              />
              <rect
                x={witX}
                y={baseY - witH}
                width={BAR_WIDTH}
                height={witH}
                rx={4}
                fill="var(--series-2)"
                opacity={hover && hover.day === d && hover.series !== "withdrawals" ? 0.5 : 1}
                onPointerEnter={() => setHover({ day: d, series: "withdrawals" })}
                onPointerLeave={() => setHover(null)}
              />
              <text x={groupX} y={HEIGHT - 8} textAnchor="middle" fontSize="10" fill="var(--text-muted)">
                {d.label}
              </text>
            </g>
          );
        })}
      </svg>
      </div>

      {hover && (
        <div className="pointer-events-none absolute right-2 top-0 rounded-lg border border-border-hairline bg-surface-2 px-3 py-2 text-xs shadow-lg">
          <p className="font-semibold text-text-primary">
            ${hover.series === "deposits" ? hover.day.deposits.toLocaleString() : hover.day.withdrawals.toLocaleString()}
          </p>
          <p className="text-text-muted">
            {hover.series === "deposits" ? "Cash in" : "Cash out"} · {hover.day.label}
          </p>
        </div>
      )}
    </div>
  );
}
