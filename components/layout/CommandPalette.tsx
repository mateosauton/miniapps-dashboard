'use client'

import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { GuideSection, MiniKitCommand, WorldApp } from '@/types'
import { cn, sdkColors } from '@/lib/utils'

type PaletteItem =
  | {
      id: string
      kind: 'app'
      title: string
      subtitle: string
      href: string
      badge: string
      badgeClass: string
    }
  | {
      id: string
      kind: 'command'
      title: string
      subtitle: string
      href: string
      badge: string
      badgeClass: string
    }
  | {
      id: string
      kind: 'guide'
      title: string
      subtitle: string
      href: string
      badge: string
      badgeClass: string
    }

interface Props {
  apps: WorldApp[]
  commands: MiniKitCommand[]
  sections: GuideSection[]
}

function isEditableTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false
  return (
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.tagName === 'SELECT' ||
    target.isContentEditable
  )
}

export function CommandPalette({ apps, commands, sections }: Props) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const deferredQuery = useDeferredValue(query)

  const items = useMemo<PaletteItem[]>(() => [
    ...apps.map((app) => ({
      id: `app:${app.app_id}`,
      kind: 'app' as const,
      title: app.name,
      subtitle: `${app.team_name} · ${app.category?.name ?? 'Other'}`,
      href: `/apps?search=${encodeURIComponent(app.name)}`,
      badge: 'App',
      badgeClass: 'bg-[#EBF5FF] text-[#007CFB]',
    })),
    ...commands.map((command) => ({
      id: `command:${command.slug}`,
      kind: 'command' as const,
      title: command.name,
      subtitle: command.description,
      href: `/commands?command=${encodeURIComponent(command.slug)}`,
      badge: command.sdk,
      badgeClass: sdkColors[command.sdk],
    })),
    ...sections.map((section) => ({
      id: `guide:${section.id}`,
      kind: 'guide' as const,
      title: section.title,
      subtitle: 'Guide section',
      href: `/guide?section=${encodeURIComponent(section.id)}`,
      badge: 'Guide',
      badgeClass: 'bg-[#f9f9f8] text-[#373635]',
    })),
  ], [apps, commands, sections])

  const results = useMemo(() => {
    const trimmed = deferredQuery.trim().toLowerCase()
    const ranked = items.map((item) => {
      const haystack = `${item.title} ${item.subtitle}`.toLowerCase()
      const title = item.title.toLowerCase()
      let score = 0

      if (!trimmed) {
        score = item.kind === 'app' ? 3 : 2
      } else if (title.startsWith(trimmed)) {
        score = 5
      } else if (title.includes(trimmed)) {
        score = 4
      } else if (haystack.includes(trimmed)) {
        score = 3
      }

      return { item, score }
    })

    return ranked
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title))
      .slice(0, 12)
      .map((entry) => entry.item)
  }, [deferredQuery, items])

  useEffect(() => {
    setActiveIndex(0)
  }, [deferredQuery, open])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setOpen((value) => !value)
        return
      }

      if (!open) return

      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        return
      }

      if (isEditableTarget(event.target) && event.key !== 'ArrowDown' && event.key !== 'ArrowUp' && event.key !== 'Enter') {
        return
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        setActiveIndex((index) => (results.length === 0 ? 0 : (index + 1) % results.length))
      } else if (event.key === 'ArrowUp') {
        event.preventDefault()
        setActiveIndex((index) => (results.length === 0 ? 0 : (index - 1 + results.length) % results.length))
      } else if (event.key === 'Enter') {
        const selected = results[activeIndex]
        if (!selected) return
        event.preventDefault()
        router.push(selected.href)
        setOpen(false)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeIndex, open, results, router])

  useEffect(() => {
    if (!open) return
    const id = window.requestAnimationFrame(() => inputRef.current?.focus())
    return () => window.cancelAnimationFrame(id)
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#CECDCA] bg-white text-[12px] text-[#9D9B96] hover:text-[#121212] hover:border-[#9D9B96] transition-colors"
        aria-label="Open command palette"
      >
        <span>Search</span>
        <span className="font-mono text-[11px] text-[#9D9B96]">⌘K</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[60]">
          <div className="absolute inset-0 bg-black/35" onClick={() => setOpen(false)} />
          <div className="absolute left-1/2 top-[12vh] w-[min(680px,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border border-[#CECDCA] bg-white shadow-2xl overflow-hidden">
            <div className="border-b border-[#e1dfda] px-4 py-3">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search apps, commands, and guide sections..."
                className="w-full bg-transparent text-[14px] text-[#121212] outline-none placeholder:text-[#9D9B96]"
                aria-label="Global search"
              />
            </div>

            <div className="max-h-[420px] overflow-y-auto p-2">
              {results.length === 0 ? (
                <div className="px-3 py-10 text-center text-[12.5px] text-[#9D9B96]">
                  No matches found.
                </div>
              ) : (
                results.map((item, index) => (
                  <button
                    key={item.id}
                    type="button"
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => {
                      router.push(item.href)
                      setOpen(false)
                    }}
                    className={cn(
                      'w-full flex items-start gap-3 rounded-xl px-3 py-2.5 text-left transition-colors',
                      index === activeIndex ? 'bg-[#121212] text-white' : 'hover:bg-[#f9f9f8]'
                    )}
                  >
                    <span
                      className={cn(
                        'mt-0.5 rounded px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wide',
                        index === activeIndex ? 'bg-white text-[#121212]' : item.badgeClass
                      )}
                    >
                      {item.badge}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-[13px] font-semibold">{item.title}</span>
                      <span className={cn('block text-[12px] truncate', index === activeIndex ? 'text-white/70' : 'text-[#9D9B96]')}>
                        {item.subtitle}
                      </span>
                    </span>
                  </button>
                ))
              )}
            </div>

            <div className="flex items-center justify-between border-t border-[#e1dfda] px-4 py-2 text-[11px] text-[#9D9B96]">
              <span>Use ↑ ↓ to navigate, Enter to open</span>
              <span>Esc to close</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
