import { StatTile } from "@/app/dashboard/components/StatTile";
import { RevenueChart } from "@/app/dashboard/components/RevenueChart";
import { VolumeChart } from "@/app/dashboard/components/VolumeChart";
import { StatusBadge } from "@/app/dashboard/components/StatusBadge";
import { revenueData, volumeData, topPlayers } from "@/app/dashboard/data";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label="Total agents"
          value="284"
          delta={{ value: "3.1%", direction: "up", isGood: true }}
          sparkline={[6, 7, 7, 8, 8, 9, 10]}
        />
        <StatTile
          label="Total players"
          value="12,842"
          delta={{ value: "4.2%", direction: "up", isGood: true }}
          sparkline={[10, 12, 11, 14, 16, 15, 18]}
        />
        <StatTile
          label="Total cash in"
          value="$1,284,600"
          delta={{ value: "6.4%", direction: "up", isGood: true }}
          sparkline={[42, 38, 45, 51, 58, 67, 61]}
        />
        <StatTile
          label="Total revenue"
          value="$487,300"
          delta={{ value: "2.1%", direction: "down", isGood: false }}
          sparkline={[18, 21, 20, 25, 28, 34, 30]}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="rounded-2xl border border-border-hairline bg-surface-1 p-5">
          <h2 className="mb-4 text-sm font-semibold text-text-primary">Revenue — last 7 days</h2>
          <RevenueChart data={revenueData} />
        </div>
        <div className="rounded-2xl border border-border-hairline bg-surface-1 p-5">
          <h2 className="mb-4 text-sm font-semibold text-text-primary">Cash in vs cash out</h2>
          <VolumeChart data={volumeData} />
        </div>
      </div>

      <div className="rounded-2xl border border-border-hairline bg-surface-1 p-5">
        <h2 className="mb-4 text-sm font-semibold text-text-primary">Top players</h2>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {topPlayers.map((player) => (
            <li
              key={player.name}
              className="flex flex-col gap-2 rounded-xl border border-border-hairline bg-surface-2 p-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-text-primary">{player.name}</p>
                <p className="truncate text-xs text-text-muted">{player.email}</p>
              </div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold tabular-nums text-gold-bright">
                  {player.lifetimeValue}
                </span>
                <StatusBadge status={player.status} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
