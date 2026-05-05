'use client'

import { useState } from 'react'
import { appCategoryColors } from '@/lib/utils'
import { AppLogo } from '@/components/ui/AppLogo'
import type { WorldApp } from '@/types'

interface Props { apps: WorldApp[] }

const COLLAPSED_LIMIT = 3

export function NewAppsBox({ apps }: Props) {
  const [expanded, setExpanded] = useState(false)
  const hasOverflow = apps.length > COLLAPSED_LIMIT
  const visible = expanded || !hasOverflow ? apps : apps.slice(0, COLLAPSED_LIMIT)
  const hiddenCount = apps.length - COLLAPSED_LIMIT

  return (
    <div className="bg-white border border-[#CECDCA] rounded-lg p-4">
      <div className="flex items-center justify-between mb-1">
        <div className="text-[10.5px] font-semibold text-[#9D9B96] uppercase tracking-wider">
          New Approved Apps
        </div>
        {apps.length > 0 && (
          <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-[#EBF5FF] text-[#007CFB] font-semibold">
            {apps.length} new
          </span>
        )}
      </div>
      <div className="text-[11px] text-[#9D9B96] mb-4">Apps added since last snapshot</div>

      {apps.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-6 text-center">
          <div className="w-8 h-8 rounded-full bg-[#f9f9f8] border border-[#e1dfda] flex items-center justify-center mb-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9D9B96" strokeWidth="2">
              <path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" />
            </svg>
          </div>
          <div className="text-[12px] font-medium text-[#373635]">No new apps detected</div>
          <div className="text-[11px] text-[#9D9B96] mt-0.5">Snapshot updates every hour</div>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            {visible.map((app) => {
              const catColor = appCategoryColors[app.category?.name ?? ''] ?? 'bg-[#f9f9f8] text-[#373635]'
              return (
                <div key={app.app_id} className="flex items-center gap-2.5 py-1.5">
                  <AppLogo src={app.logo_img_url} name={app.name} size={32} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[12px] font-medium text-[#121212] truncate">{app.name}</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${catColor}`}>
                        {app.category?.name ?? 'Other'}
                      </span>
                      <span className="text-[10.5px] text-[#9D9B96]">
                        {app.unique_users?.toLocaleString()} users
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {hasOverflow && (
            <button
              onClick={() => setExpanded((v) => !v)}
              className="mt-3 w-full text-[11.5px] font-semibold text-[#007CFB] bg-[#EBF5FF] hover:bg-[#D6EAFF] border border-[#9DD4FD] rounded-md py-1.5 transition-colors flex items-center justify-center gap-1"
            >
              {expanded ? (
                <>Collapse <span className="text-[10px]">▲</span></>
              ) : (
                <>Show {hiddenCount} more <span className="text-[10px]">▼</span></>
              )}
            </button>
          )}
        </>
      )}
    </div>
  )
}
