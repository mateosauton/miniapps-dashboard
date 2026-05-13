'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MobileNav } from './MobileNav'

const PAGE_META: Record<string, { title: string; sub: string }> = {
  '/overview': { title: 'Ecosystem Overview', sub: 'Live data · World App Mini-Apps' },
  '/apps': { title: 'App Catalog', sub: '50 verified mini-apps · World App' },
  '/commands': { title: 'SDK Commands', sub: 'MiniKit · IDKit · AgentKit reference' },
  '/guide': { title: 'Implementation Guide', sub: 'Step-by-step developer reference' },
}

export function TopBar({ paletteTrigger }: { paletteTrigger?: ReactNode }) {
  const pathname = usePathname()
  const base = '/' + (pathname.split('/')[1] ?? '')
  const meta = PAGE_META[base] ?? { title: 'Dashboard', sub: 'World App Mini-Apps' }
  const mobileLinks = [
    { href: '/overview', label: 'Overview' },
    { href: '/apps', label: 'Apps' },
    { href: '/commands', label: 'Commands' },
    { href: '/guide', label: 'Guide' },
  ]

  return (
    <header className="bg-gray-0 border-b border-gray-200 px-3 lg:px-4 py-2 shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <MobileNav />
          <div>
            <div className="font-semibold text-[13px] text-gray-900">{meta.title}</div>
            <div className="text-[10.5px] text-gray-500">{meta.sub}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {paletteTrigger}
          <div className="flex items-center gap-1.5 text-[10.5px] font-medium text-info-600 bg-info-100 border border-info-600/20 px-2 py-0.5 rounded-md">
            <div className="w-1.5 h-1.5 rounded-full bg-info-600" />
            Live data
          </div>
        </div>
      </div>

      <nav className="flex lg:hidden gap-1.5 mt-2 overflow-x-auto">
        {mobileLinks.map((link) => {
          const active = pathname === link.href || pathname.startsWith(link.href + '/')
          return (
            <Link
              key={link.href}
              href={link.href}
              className={
                active
                  ? 'px-2 py-1 rounded-md text-[11.5px] font-medium bg-gray-900 text-gray-0 whitespace-nowrap'
                  : 'px-2 py-1 rounded-md text-[11.5px] font-medium bg-gray-50 text-gray-700 whitespace-nowrap'
              }
            >
              {link.label}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
