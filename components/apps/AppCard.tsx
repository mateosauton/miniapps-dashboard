'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn, fmtNum, appCategoryColors } from '@/lib/utils'
import type { WorldApp, AppMetrics } from '@/types'

interface Props { app: WorldApp; metrics?: AppMetrics; onClick?: () => void }

export function AppCard({ app, metrics, onClick }: Props) {
  const badgeClass = appCategoryColors[app.category?.name ?? 'Other']
  const initials = app.short_name?.slice(0, 3).toUpperCase() ?? app.name.slice(0, 2).toUpperCase()
  const [imgFailed, setImgFailed] = useState(false)

  return (
    <div
      data-testid="app-card"
      className="bg-white border border-[#CECDCA] rounded-lg p-4 hover:border-[#121212] hover:shadow-sm transition-all cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-[#e1dfda] flex items-center justify-center">
          {app.logo_img_url && !imgFailed ? (
            <Image
              src={app.logo_img_url}
              alt={app.name}
              fill
              className="object-cover"
              unoptimized
              onError={() => setImgFailed(true)}
            />
          ) : (
            <span className="text-[11px] font-bold text-[#9D9B96]">{initials}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-[13px] text-[#121212] truncate">{app.name}</div>
          <div className="text-[11.5px] text-[#9D9B96] truncate">{app.team_name}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className={cn('text-[11px] font-semibold px-2 py-0.5 rounded', badgeClass)}>
          {app.category?.name}
        </span>
        {app.app_mode === 'native' && (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#121212] text-white">
            native
          </span>
        )}
        {app.is_for_humans_only && (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded bg-[#EBF5FF] text-[#007CFB]">
            humans only
          </span>
        )}
      </div>

      {app.world_app_description && (
        <p className="text-[11.5px] text-[#9D9B96] leading-relaxed mb-3 line-clamp-2">
          {app.world_app_description}
        </p>
      )}

      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#f9f9f8]">
        <div className="text-center">
          <div className="text-[13px] font-semibold text-[#121212]">{fmtNum(app.unique_users)}</div>
          <div className="text-[10px] text-[#9D9B96]">users</div>
        </div>
        <div className="text-center">
          <div className="text-[13px] font-semibold text-[#007CFB]">{app.app_rating.toFixed(2)}</div>
          <div className="text-[10px] text-[#9D9B96]">rating</div>
        </div>
        <div className="text-center">
          <div className="text-[13px] font-semibold text-[#121212]">
            {app.supported_countries?.length ?? 0}
          </div>
          <div className="text-[10px] text-[#9D9B96]">countries</div>
        </div>
        <div className="text-center">
          <div className="text-[13px] font-semibold text-[#121212]">
            {metrics ? fmtNum(metrics.impressions7d) : '—'}
          </div>
          <div className="text-[10px] text-[#9D9B96]">7d impr.</div>
        </div>
      </div>
    </div>
  )
}
