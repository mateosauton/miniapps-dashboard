'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/overview', label: 'Overview', section: 'Platform' },
  { href: '/apps', label: 'Apps', section: 'Platform' },
  { href: '/commands', label: 'Commands', section: 'SDK Reference' },
  { href: '/guide', label: 'Guide', section: 'SDK Reference' },
]

const SECTIONS = ['Platform', 'SDK Reference']

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex w-[196px] shrink-0 flex-col border-r border-gray-200 bg-gray-0 overflow-y-auto">
      {/* Logo */}
      <div className="px-3 pt-3 pb-2.5 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center shrink-0">
            <div className="w-2.5 h-2.5 bg-gray-0 rounded-full" />
          </div>
          <div>
            <div className="font-semibold text-[12px] text-gray-900 leading-tight">World Dev Dashboard</div>
            <div className="text-[10px] text-gray-500 mt-0.5">Mini Apps Ecosystem</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-1.5">
        {SECTIONS.map((section) => (
          <div key={section}>
            <div className="px-3 pt-2.5 pb-1 text-[9.5px] font-semibold text-gray-500 uppercase tracking-wider">
              {section}
            </div>
            {NAV.filter((n) => n.section === section).map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center mx-1.5 px-2 py-1.5 rounded-md text-[12px] font-medium transition-colors',
                    active
                      ? 'bg-gray-900 text-gray-0'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        ))}

        {/* External links */}
        <div className="px-3 pt-2.5 pb-1 text-[9.5px] font-semibold text-gray-500 uppercase tracking-wider">
          Links
        </div>
        {[
          { href: 'https://docs.world.org', label: 'docs.world.org →' },
          { href: 'https://developer.worldcoin.org', label: 'developer portal →' },
        ].map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center mx-1.5 px-2 py-1.5 rounded-md text-[11px] text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-2.5 border-t border-gray-200">
        <div className="flex items-center gap-1.5 text-[10.5px] text-gray-500">
          <div className="w-1.5 h-1.5 rounded-full bg-info-600 shrink-0" />
          Live · world-id-assets.com
        </div>
        <div className="text-[10.5px] text-gray-500 mt-0.5">Refreshes hourly</div>
      </div>
    </aside>
  )
}
