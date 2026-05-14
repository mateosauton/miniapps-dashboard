import { fmtNum } from '@/lib/utils'
import type { AppMetrics, WorldApp } from '@/types'

interface Props {
  apps: WorldApp[]
  metrics: Map<string, AppMetrics>
  newAppsCount: number
}

function pct(value: number, total: number): string {
  if (total === 0) return '0%'
  return `${Math.round((value / total) * 100)}%`
}

function avg(values: number[]): number {
  if (!values.length) return 0
  return values.reduce((sum, value) => sum + value, 0) / values.length
}

export function EcosystemPulse({ apps, metrics, newAppsCount }: Props) {
  const totalApps = apps.length
  const verifiedApps = apps.filter((app) => app.verification_status === 'verified').length
  const storeVisibleApps = apps.filter((app) => app.show_in_app_store !== false).length
  const humansOnlyApps = apps.filter((app) => app.is_for_humans_only).length
  const nativeApps = apps.filter((app) => app.app_mode === 'native').length
  const androidOnlyApps = apps.filter((app) => app.is_android_only).length
  const withDomains = apps.filter((app) => (app.associated_domains?.length ?? 0) > 0).length
  const withContracts = apps.filter((app) => (app.contracts?.length ?? 0) > 0).length

  const metricValues = Array.from(metrics.values())
  const active7d = metricValues.filter((metric) => metric.users7d > 0).length
  const growing7d = metricValues.filter((metric) => metric.newUsers7d > 0).length
  const impressions7d = metricValues.reduce((sum, metric) => sum + metric.impressions7d, 0)
  const optInRates = metricValues
    .map((metric) => metric.optInRate)
    .filter((rate): rate is number => typeof rate === 'number')

  const panels = [
    {
      title: 'Store Health',
      rows: [
        ['Verified apps', `${verifiedApps} / ${totalApps}`, pct(verifiedApps, totalApps)],
        ['Visible in store', `${storeVisibleApps} / ${totalApps}`, pct(storeVisibleApps, totalApps)],
        ['New since snapshot', newAppsCount.toString(), 'change'],
      ],
    },
    {
      title: 'Growth Activity',
      rows: [
        ['Active in 7d', `${active7d} apps`, pct(active7d, totalApps)],
        ['Added users in 7d', `${growing7d} apps`, pct(growing7d, totalApps)],
        ['7d impressions', fmtNum(impressions7d), 'demand'],
      ],
    },
    {
      title: 'Distribution',
      rows: [
        ['Humans only', `${humansOnlyApps} apps`, pct(humansOnlyApps, totalApps)],
        ['Native mode', `${nativeApps} apps`, pct(nativeApps, totalApps)],
        ['Android only', `${androidOnlyApps} apps`, pct(androidOnlyApps, totalApps)],
      ],
    },
    {
      title: 'Integration Surface',
      rows: [
        ['Associated domains', `${withDomains} apps`, pct(withDomains, totalApps)],
        ['Onchain contracts', `${withContracts} apps`, pct(withContracts, totalApps)],
        ['Avg opt-in rate', optInRates.length ? `${avg(optInRates).toFixed(1)}%` : 'n/a', 'notifications'],
      ],
    },
  ]

  return (
    <div data-testid="ecosystem-pulse" className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2.5">
      {panels.map((panel) => (
        <section
          key={panel.title}
          data-testid="ecosystem-pulse-panel"
          className="bg-gray-0 border border-gray-200 rounded-lg p-3"
        >
          <div className="text-[9.5px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
            {panel.title}
          </div>
          <div className="space-y-2">
            {panel.rows.map(([label, value, note]) => (
              <div key={label} className="flex items-baseline justify-between gap-3">
                <span className="text-[11.5px] text-gray-500">{label}</span>
                <span className="text-[12px] font-semibold text-gray-900">{value}</span>
                <span className="w-16 text-right text-[10.5px] text-gray-400">{note}</span>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
