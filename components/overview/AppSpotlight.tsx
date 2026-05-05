import { appCategoryColors, fmtNum } from '@/lib/utils'
import { AppLogo } from '@/components/ui/AppLogo'
import type { WorldApp } from '@/types'

interface Props {
  apps: WorldApp[]
  type: 'daily' | 'gold'
}

/** djb2 hash → stable index for any string seed */
function hashSeed(s: string): number {
  let h = 5381
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h) ^ s.charCodeAt(i)
  return Math.abs(h)
}

function pickApp(apps: WorldApp[], type: 'daily' | 'gold'): WorldApp | null {
  if (!apps.length) return null

  if (type === 'daily') {
    const seed = new Date().toISOString().split('T')[0] // YYYY-MM-DD UTC, stable all day
    const idx = hashSeed(seed) % apps.length
    return apps[idx]
  }

  // 'gold': app with highest rating from oldest/overlooked pool
  return [...apps].sort((a, b) => b.app_rating - a.app_rating)[0] ?? null
}

export function AppSpotlight({ apps, type }: Props) {
  const app = pickApp(apps, type)
  const isDaily = type === 'daily'

  const header = isDaily ? 'Try This Today' : 'Old but Gold'
  const subtitle = isDaily
    ? 'Randomly selected from top 100 — changes daily'
    : 'A long-standing app worth revisiting'

  return (
    <div className="bg-white border border-[#CECDCA] rounded-lg p-4">
      <div className="text-[10.5px] font-semibold text-[#9D9B96] uppercase tracking-wider mb-1">
        {header}
      </div>
      <div className="text-[11px] text-[#9D9B96] mb-4">{subtitle}</div>

      {!app ? (
        <div className="text-[12px] text-[#9D9B96] py-4 text-center">No data yet</div>
      ) : (
        <div className="flex gap-3">
          <AppLogo src={app.logo_img_url} name={app.name} size={48} className="rounded-xl" />
          <div className="flex-1 min-w-0">
            <div className="text-[14px] font-semibold text-[#121212] truncate">{app.name}</div>
            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${appCategoryColors[app.category?.name ?? ''] ?? 'bg-[#f9f9f8] text-[#373635]'}`}>
                {app.category?.name ?? 'Other'}
              </span>
              <span className="text-[10.5px] text-[#9D9B96]">{app.team_name}</span>
            </div>
            <div className="text-[11px] text-[#373635] mt-1.5 line-clamp-2 leading-relaxed">
              {app.world_app_description}
            </div>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-[11px] text-[#9D9B96]">
                <span className="font-semibold text-[#121212]">{fmtNum(app.unique_users)}</span> users
              </span>
              <span className="text-[11px] text-[#9D9B96]">
                <span className="font-semibold text-[#121212]">★ {app.app_rating.toFixed(2)}</span>
              </span>
              {app.integration_url && (
                <a
                  href={app.integration_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] text-[#007CFB] font-medium hover:underline"
                >
                  Open →
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
