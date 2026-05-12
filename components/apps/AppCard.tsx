'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn, fmtNum, appCategoryColors } from '@/lib/utils'
import type { WorldApp, AppMetrics } from '@/types'

interface Props { app: WorldApp; metrics?: AppMetrics; onClick?: () => void }

export function AppCard({ app, metrics, onClick }: Props) {
  const badgeClass = appCategoryColors[app.category?.name ?? 'Other'] ?? appCategoryColors.Other
  const initials = app.short_name?.slice(0, 3).toUpperCase() ?? app.name.slice(0, 2).toUpperCase()
  const [imgFailed, setImgFailed] = useState(false)
  const cardDescription = app.world_app_description
    ?.replace(new RegExp(`^${app.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b[:,-]?\\s*`, 'i'), '')
    .replace(/^native\s+/i, '')

  return (
    <div
      data-testid="app-card"
      className="bg-gray-0 border border-gray-200 rounded-2xl p-4 hover:border-gray-900 hover:shadow-sm transition-all cursor-pointer"
      onClick={onClick}
      role="article"
      aria-label={`Open details for ${app.name}`}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick?.()}
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="relative w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-gray-100 flex items-center justify-center">
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
            <span className="text-[11px] font-bold text-gray-500">{initials}</span>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-[13px] text-gray-900 truncate">{app.name}</div>
          <div className="text-[11.5px] text-gray-500 truncate">{app.team_name}</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-3">
        <span className={cn('text-[11px] font-semibold px-2 py-0.5 rounded', badgeClass)}>
          {app.category?.name}
        </span>
        {app.app_mode === 'native' && (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-gray-900 text-gray-0">
            native
          </span>
        )}
        {app.is_for_humans_only && (
          <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-info-100 text-info-600">
            humans only
          </span>
        )}
      </div>

      {cardDescription && (
        <p className="text-[11.5px] text-gray-500 leading-relaxed mb-3 line-clamp-2">
          {cardDescription}
        </p>
      )}

      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-50">
        <div className="text-center">
          <div className="text-[13px] font-semibold text-gray-900">{fmtNum(app.unique_users)}</div>
          <div className="text-[10px] text-gray-500">users</div>
        </div>
        <div className="text-center">
          <div className="text-[13px] font-semibold text-info-600">{app.app_rating.toFixed(2)}</div>
          <div className="text-[10px] text-gray-500">rating</div>
        </div>
        <div className="text-center">
          <div className="text-[13px] font-semibold text-gray-900">
            {app.supported_countries?.length ?? 0}
          </div>
          <div className="text-[10px] text-gray-500">countries</div>
        </div>
        <div className="text-center">
          <div className="text-[13px] font-semibold text-gray-900">
            {metrics ? fmtNum(metrics.impressions7d) : '—'}
          </div>
          <div className="text-[10px] text-gray-500">7d impr.</div>
        </div>
      </div>
    </div>
  )
}
