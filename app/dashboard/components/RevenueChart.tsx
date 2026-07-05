"use client";

import { useRef, useState } from "react";

type Point = { label: string; value: number };

const WIDTH = 640;
const HEIGHT = 220;
const PAD_LEFT = 44;
const PAD_RIGHT = 12;
const PAD_TOP = 16;
const PAD_BOTTOM = 28;

export function RevenueChart({ data }: { data: Point[] }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [renderedWidth, setRenderedWidth] = useState(WIDTH);

  const plotWidth = WIDTH - PAD_LEFT - PAD_RIGHT;
  const plotHeight = HEIGHT - PAD_TOP - PAD_BOTTOM;

  const max = Math.max(...data.map((d) => d.value));
  const niceMax = Math.ceil(max / 5000) * 5000;

  const xFor = (i: number) => PAD_LEFT + (i / (data.length - 1)) * plotWidth;
  const yFor = (v: number) => PAD_TOP + plotHeight - (v / niceMax) * plotHeight;

  const linePoints = data.map((d, i) => `${xFor(i)},${yFor(d.value)}`).join(" ");
  const areaPoints = `${xFor(0)},${PAD_TOP + plotHeight} ${linePoints} ${xFor(
    data.length - 1
  )},${PAD_TOP + plotHeight}`;

  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => Math.round(niceMax * t));

  function handleMove(e: React.PointerEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    setRenderedWidth(rect.width);
    const relX = ((e.clientX - rect.left) / rect.width) * WIDTH;
    let closest = 0;
    let bestDist = Infinity;
    data.forEach((_, i) => {
      const dist = Math.abs(xFor(i) - relX);
      if (dist < bestDist) {
        bestDist = dist;
        closest = i;
      }
    });
    setActiveIndex(closest);
  }

  const active = activeIndex !== null ? data[activeIndex] : null;

  return (
    <div className="relative overflow-x-auto">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full touch-none"
        style={{ minWidth: 480 }}
        onPointerMove={handleMove}
        onPointerLeave={() => setActiveIndex(null)}
      >
        {ticks.map((t) => (
          <g key={t}>
            <line
              x1={PAD_LEFT}
              x2={WIDTH - PAD_RIGHT}
              y1={yFor(t)}
              y2={yFor(t)}
              stroke="var(--border-hairline)"
              strokeWidth="1"
            />
            <text x={PAD_LEFT - 8} y={yFor(t) + 3} textAnchor="end" fontSize="10" fill="var(--text-muted)">
              {t >= 1000 ? `${t / 1000}K` : t}
            </text>
          </g>
        ))}

        {data.map((d, i) => (
          <text
            key={d.label}
            x={xFor(i)}
            y={HEIGHT - 8}
            textAnchor="middle"
            fontSize="10"
            fill="var(--text-muted)"
          >
            {d.label}
          </text>
        ))}

        <polygon points={areaPoints} fill="var(--series-1)" fillOpacity="0.1" />
        <polyline
          points={linePoints}
          fill="none"
          stroke="var(--series-1)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {activeIndex !== null && (
          <line
            x1={xFor(activeIndex)}
            x2={xFor(activeIndex)}
            y1={PAD_TOP}
            y2={PAD_TOP + plotHeight}
            stroke="var(--text-muted)"
            strokeWidth="1"
          />
        )}

        {data.map((d, i) => (
          <circle
            key={d.label}
            cx={xFor(i)}
            cy={yFor(d.value)}
            r={activeIndex === i ? 5 : 4}
            fill="var(--series-1)"
            stroke="var(--surface-1)"
            strokeWidth="2"
          />
        ))}
      </svg>

      {active && activeIndex !== null && (
        <div
          className="pointer-events-none absolute top-2 -translate-x-1/2 rounded-lg border border-border-hairline bg-surface-2 px-3 py-2 text-xs shadow-lg"
          style={{ left: `${(xFor(activeIndex) / WIDTH) * renderedWidth}px` }}
        >
          <p className="font-semibold text-text-primary">${active.value.toLocaleString()}</p>
          <p className="text-text-muted">{active.label}</p>
        </div>
      )}
    </div>
  );
}
