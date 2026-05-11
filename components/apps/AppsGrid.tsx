'use client'

import { useState, useMemo } from 'react'
import { AppCard } from './AppCard'
import { AppDetailDrawer } from './AppDetailDrawer'
import { APP_CATEGORIES } from '@/lib/config'
import type { WorldApp, AppMetrics } from '@/types'

const SORTS = [
  { key: 'users', label: 'Users' },
  { key: 'rating', label: 'Rating' },
  { key: 'impressions', label: 'Impressions' },
] as const

const CSV_COLUMNS = [
  'name',
  'team_name',
  'category',
  'unique_users',
  'app_rating',
  'impressions',
  'verification_status',
  'supported_countries_count',
] as const

function escapeCsv(value: string | number): string {
  const text = String(value)
  if (/[",\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`
  return text
}

interface Props { apps: WorldApp[]; metricsMap?: Map<string, AppMetrics> }

export function AppsGrid({ apps, metricsMap }: Props) {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')
  const [humansOnly, setHumansOnly] = useState(false)
  const [sort, setSort] = useState<'users' | 'rating' | 'impressions'>('users')
  const [selectedApp, setSelectedApp] = useState<WorldApp | null>(null)

  const filtered = useMemo(() => {
    let list = apps
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (a) => a.name.toLowerCase().includes(q) || a.team_name.toLowerCase().includes(q)
      )
    }
    if (cat !== 'All') list = list.filter((a) => a.category?.name === cat)
    if (humansOnly) list = list.filter((a) => a.is_for_humans_only)
    return [...list].sort((a, b) => {
      if (sort === 'users') return b.unique_users - a.unique_users
      if (sort === 'rating') return b.app_rating - a.app_rating
      return b.impressions - a.impressions
    })
  }, [apps, search, cat, humansOnly, sort])

  function downloadCsv() {
    const lines = [
      CSV_COLUMNS.join(','),
      ...filtered.map((app) =>
        [
          app.name,
          app.team_name,
          app.category?.name ?? 'Other',
          app.unique_users,
          app.app_rating,
          app.impressions,
          app.verification_status,
          app.supported_countries?.length ?? 0,
        ].map(escapeCsv).join(',')
      ),
    ]
    const csv = `${lines.join('\n')}\n`
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    const stamp = new Date().toISOString().slice(0, 10)

    link.href = url
    link.download = `apps-export-${stamp}.csv`
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#9D9B96] text-xs">⌕</span>
          <input
            type="text"
            placeholder="Search apps or teams..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-7 pr-3 py-1.5 text-[13px] border border-[#CECDCA] rounded-md bg-white focus:outline-none focus:border-[#121212] focus:ring-1 focus:ring-[#121212]/10"
          />
        </div>

        {/* Humans only toggle */}
        <label className="flex items-center gap-2 cursor-pointer text-[13px] font-medium text-[#373635]">
          <button
            type="button"
            onClick={() => setHumansOnly(!humansOnly)}
            className="relative w-9 h-5 rounded-full transition-colors shrink-0"
            style={{ background: humansOnly ? '#121212' : '#CECDCA' }}
          >
            <span
              className="absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform"
              style={{ left: humansOnly ? '17px' : '2px' }}
            />
          </button>
          Humans only
        </label>

        {/* Sort */}
        <div className="flex items-center gap-1.5 text-[12px]">
          <span className="text-[#9D9B96]">Sort:</span>
          {SORTS.map((s) => (
            <button
              key={s.key}
              onClick={() => setSort(s.key)}
              className={`px-2.5 py-1 rounded text-[12px] font-medium transition-colors ${
                sort === s.key
                  ? 'bg-[#121212] text-white'
                  : 'bg-[#e1dfda] text-[#373635] hover:bg-[#CECDCA]'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={downloadCsv}
          disabled={filtered.length === 0}
          className="ml-auto px-3 py-1.5 rounded-md text-[12px] font-semibold bg-[#EBF5FF] text-[#005BC4] border border-[#9DD4FD] hover:bg-[#D6EAFF] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Download CSV
        </button>
      </div>

      {/* Category tabs */}
      <div className="flex gap-1 flex-wrap mb-4">
        {APP_CATEGORIES.map((c) => {
          const count = c === 'All' ? apps.length : apps.filter((a) => a.category?.name === c).length
          return (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-3 py-1 rounded text-[12.5px] font-medium transition-colors whitespace-nowrap ${
                cat === c
                  ? 'bg-[#121212] text-white'
                  : 'bg-[#e1dfda] text-[#373635] hover:bg-[#CECDCA]'
              }`}
            >
              {c}
              <span className="ml-1 opacity-60 text-[11px]">{count}</span>
            </button>
          )
        })}
      </div>

      {/* Results count */}
      <div className="text-[11.5px] text-[#9D9B96] mb-3">
        {filtered.length} app{filtered.length !== 1 ? 's' : ''}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16 text-[#9D9B96]">No apps match your filters.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((app) => (
            <AppCard key={app.app_id} app={app} metrics={metricsMap?.get(app.app_id)} onClick={() => setSelectedApp(app)} />
          ))}
        </div>
      )}

      <AppDetailDrawer app={selectedApp} metrics={selectedApp ? metricsMap?.get(selectedApp.app_id) : undefined} onClose={() => setSelectedApp(null)} />
    </div>
  )
}
