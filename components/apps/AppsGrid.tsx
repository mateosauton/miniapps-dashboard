'use client'

import { useState, useMemo } from 'react'
import { AppCard } from './AppCard'
import type { WorldApp } from '@/types'

const CATEGORIES = ['All', 'Tokens', 'Finance', 'Gaming', 'Earn', 'Business', 'Other']
const SORTS = [
  { key: 'users', label: 'Users' },
  { key: 'rating', label: 'Rating' },
  { key: 'impressions', label: 'Impressions' },
] as const

interface Props { apps: WorldApp[] }

export function AppsGrid({ apps }: Props) {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')
  const [humansOnly, setHumansOnly] = useState(false)
  const [sort, setSort] = useState<'users' | 'rating' | 'impressions'>('users')

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
      </div>

      {/* Category tabs */}
      <div className="flex gap-1 flex-wrap mb-4">
        {CATEGORIES.map((c) => {
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
            <AppCard key={app.app_id} app={app} />
          ))}
        </div>
      )}
    </div>
  )
}
