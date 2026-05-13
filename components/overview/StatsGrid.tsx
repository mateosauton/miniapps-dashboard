import { fmtNum } from '@/lib/utils'
import type { EcosystemStats } from '@/types'

interface Props { stats: EcosystemStats; newUsers7d: number; totalOpens: number }

const cards = (stats: EcosystemStats, newUsers7d: number, totalOpens: number) => [
  { label: 'Total Apps',        value: stats.totalApps.toString(),      meta: '6 segments' },
  { label: 'Mini App Opens',    value: fmtNum(totalOpens),              meta: 'all-time cumulative' },
  { label: 'Impressions',       value: fmtNum(stats.totalImpressions),  meta: 'app store views' },
  { label: 'Avg Rating',        value: stats.avgRating.toFixed(2),      meta: 'across all apps' },
  { label: '7-day New Users',   value: fmtNum(newUsers7d),              meta: 'ecosystem growth' },
  { label: 'Countries',         value: stats.maxCountries.toString(),   meta: 'global reach' },
]

export function StatsGrid({ stats, newUsers7d, totalOpens }: Props) {
  return (
    <div data-testid="stats-grid" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-4">
      {cards(stats, newUsers7d, totalOpens).map((c) => (
        <div key={c.label} className="bg-gray-0 border border-gray-200 rounded-lg p-3">
          <div className="text-[9.5px] font-semibold text-gray-500 uppercase tracking-wider mb-1">
            {c.label}
          </div>
          <div className="text-[18px] font-semibold text-gray-900 leading-none">{c.value}</div>
          <div className="text-[10.5px] text-gray-500 mt-1">{c.meta}</div>
        </div>
      ))}
    </div>
  )
}
