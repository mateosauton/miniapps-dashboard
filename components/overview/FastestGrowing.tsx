import { appCategoryColors, fmtNum } from '@/lib/utils'
import { AppLogo } from '@/components/ui/AppLogo'
import type { WorldApp, AppMetrics } from '@/types'

interface Props {
  apps: WorldApp[]
  metrics: Map<string, AppMetrics>
}

export function FastestGrowing({ apps, metrics }: Props) {
  const ranked = [...apps]
    .map((a) => ({ app: a, newUsers7d: metrics.get(a.app_id)?.newUsers7d ?? 0 }))
    .filter((x) => x.newUsers7d > 0)
    .sort((a, b) => b.newUsers7d - a.newUsers7d)
    .slice(0, 5)

  const maxUsers7d = ranked[0]?.newUsers7d ?? 1

  return (
    <div className="bg-white border border-[#CECDCA] rounded-lg p-4">
      <div className="text-[10.5px] font-semibold text-[#9D9B96] uppercase tracking-wider mb-1">
        Fastest Growing
      </div>
      <div className="text-[11px] text-[#9D9B96] mb-4">Ranked by new users in last 7 days</div>

      {ranked.length === 0 ? (
        <div className="text-[12px] text-[#9D9B96] py-4 text-center">No growth data available</div>
      ) : (
        <div className="space-y-3">
          {ranked.map(({ app, newUsers7d }, i) => {
            const pct = (newUsers7d / maxUsers7d) * 100
            const catColor = appCategoryColors[app.category?.name ?? ''] ?? 'bg-[#f9f9f8] text-[#373635]'
            return (
              <div key={app.app_id} className="flex items-center gap-2.5">
                <span className="text-[11px] font-semibold text-[#9D9B96] w-4 shrink-0 text-right">
                  {i + 1}
                </span>
                <AppLogo src={app.logo_img_url} name={app.name} size={28} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="text-[12px] font-medium text-[#121212] truncate">{app.name}</span>
                      <span className={`text-[9.5px] px-1 py-0.5 rounded-full font-medium shrink-0 ${catColor}`}>
                        {app.category?.name ?? 'Other'}
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#007CFB] shrink-0 ml-2">
                      +{fmtNum(newUsers7d)}
                    </span>
                  </div>
                  <div className="h-1 bg-[#e1dfda] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#007CFB] transition-all duration-500"
                      style={{ width: `${pct}%`, opacity: 0.5 + (pct / 100) * 0.5 }}
                    />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
