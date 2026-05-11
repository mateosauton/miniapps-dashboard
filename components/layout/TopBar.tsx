'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MobileNav } from './MobileNav'

const PAGE_META: Record<string, { title: string; sub: string }> = {
  '/overview': { title: 'Ecosystem Overview', sub: 'Live data · World App Mini-Apps' },
  '/apps': { title: 'App Catalog', sub: '50 verified mini-apps · World App' },
  '/commands': { title: 'SDK Commands', sub: 'MiniKit · IDKit · AgentKit reference' },
  '/guide': { title: 'Implementation Guide', sub: 'Step-by-step developer reference' },
}

export function TopBar() {
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
    <header className="bg-white border-b border-[#CECDCA] px-4 lg:px-6 py-3 shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MobileNav />
          <div>
            <div className="font-semibold text-[15px] text-[#121212]">{meta.title}</div>
            <div className="text-[11.5px] text-[#9D9B96] mt-0.5">{meta.sub}</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[11.5px] font-medium text-[#007CFB] bg-[#EBF5FF] border border-[#9DD4FD] px-2.5 py-1 rounded-full">
          <div className="w-1.5 h-1.5 rounded-full bg-[#007CFB]" />
          Live data
        </div>
      </div>

      <nav className="flex lg:hidden gap-2 mt-3 overflow-x-auto">
        {mobileLinks.map((link) => {
          const active = pathname === link.href || pathname.startsWith(link.href + '/')
          return (
            <Link
              key={link.href}
              href={link.href}
              className={
                active
                  ? 'px-2.5 py-1 rounded-md text-[12px] font-medium bg-[#121212] text-white whitespace-nowrap'
                  : 'px-2.5 py-1 rounded-md text-[12px] font-medium bg-[#f9f9f8] text-[#373635] whitespace-nowrap'
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
