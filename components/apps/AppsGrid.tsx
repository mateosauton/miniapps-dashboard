'use client'

import { useState, useMemo } from 'react'
import { Download, Search } from '@worldcoin/mini-apps-ui-kit-react/icons'
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

interface Props { apps: WorldApp[]; metricsByAppId?: Record<string, AppMetrics> }

export function AppsGrid({ apps, metricsByAppId }: Props) {
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
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px] max-w-[280px]">
          <Search className="absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search apps or teams..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 w-full rounded-md border border-gray-200 bg-gray-0 pl-8 pr-2.5 text-[12.5px] text-gray-900 placeholder:text-gray-400 focus:border-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900/10"
          />
        </div>

        {/* Humans only toggle */}
        <label className="flex items-center gap-1.5 cursor-pointer text-[12px] font-medium text-gray-700">
          <button
            type="button"
            onClick={() => setHumansOnly(!humansOnly)}
            aria-label="Humans only"
            className="relative w-8 h-4 rounded-full transition-colors shrink-0"
            style={{ background: humansOnly ? 'rgb(var(--gray-900))' : 'rgb(var(--gray-200))' }}
          >
            <span
              className="absolute top-0.5 w-3 h-3 bg-gray-0 rounded-full shadow transition-transform"
              style={{ left: humansOnly ? '17px' : '2px' }}
            />
          </button>
          Humans only
        </label>

        {/* Sort */}
        <div className="flex items-center gap-1 text-[12px]">
          <span className="text-gray-500">Sort:</span>
          {SORTS.map((s) => (
            <button
              key={s.key}
              onClick={() => setSort(s.key)}
              aria-label={s.label}
              className={`h-7 rounded-md px-2 text-[11.5px] font-medium transition-colors ${
                sort === s.key
                  ? 'bg-gray-900 text-gray-0'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
          className="ml-auto inline-flex h-7 items-center gap-1 rounded-md bg-gray-100 px-2.5 text-[11.5px] font-semibold text-gray-900 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Download className="size-3" />
          CSV
        </button>
      </div>

      {/* Category tabs */}
      <div className="flex gap-1 flex-wrap mb-3">
        {APP_CATEGORIES.map((c) => {
          const count = c === 'All' ? apps.length : apps.filter((a) => a.category?.name === c).length
          return (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`h-7 rounded-md px-2 text-[11.5px] font-medium transition-colors ${
                cat === c
                  ? 'bg-gray-900 text-gray-0'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {c}
              <span className="ml-1 opacity-60 text-[10.5px]">{count}</span>
            </button>
          )
        })}
      </div>

      {/* Results count */}
      <div className="text-[11px] text-gray-500 mb-2.5">
        {filtered.length} app{filtered.length !== 1 ? 's' : ''}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-500">No apps match your filters.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2.5">
          {filtered.map((app) => (
            <AppCard key={app.app_id} app={app} metrics={metricsByAppId?.[app.app_id]} onClick={() => setSelectedApp(app)} />
          ))}
        </div>
      )}

      <AppDetailDrawer app={selectedApp} metrics={selectedApp ? metricsByAppId?.[selectedApp.app_id] : undefined} onClose={() => setSelectedApp(null)} />
    </div>
  )
}
