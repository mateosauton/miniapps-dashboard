'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/overview', label: 'Overview', badge: 'Live', section: 'Platform' },
  { href: '/apps', label: 'Apps', badge: '50', section: 'Platform' },
  { href: '/commands', label: 'Commands', badge: '14', section: 'SDK Reference' },
  { href: '/guide', label: 'Guide', badge: '', section: 'SDK Reference' },
]

const SECTIONS = ['Platform', 'SDK Reference']

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:flex w-[220px] shrink-0 flex-col border-r border-[#CECDCA] bg-white overflow-y-auto">
      {/* Logo */}
      <div className="px-4 pt-4 pb-3 border-b border-[#e1dfda]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#121212] rounded-full flex items-center justify-center shrink-0">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
          <div>
            <div className="font-semibold text-[13px] text-[#121212] leading-tight">World Dev Dashboard</div>
            <div className="text-[11px] text-[#9D9B96] mt-0.5">Mini Apps Ecosystem</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-2">
        {SECTIONS.map((section) => (
          <div key={section}>
            <div className="px-4 pt-3 pb-1 text-[10px] font-semibold text-[#9D9B96] uppercase tracking-wider">
              {section}
            </div>
            {NAV.filter((n) => n.section === section).map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center justify-between mx-1.5 px-2.5 py-1.5 rounded-md text-[13px] font-medium transition-colors',
                    active
                      ? 'bg-[#121212] text-white'
                      : 'text-[#373635] hover:bg-[#f9f9f8] hover:text-[#121212]'
                  )}
                >
                  {item.label}
                  {item.badge && (
                    <span
                      className={cn(
                        'text-[11px] font-semibold px-1.5 py-0.5 rounded-full',
                        active
                          ? 'bg-white/20 text-white'
                          : 'bg-[#e1dfda] text-[#9D9B96]'
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        ))}

        {/* External links */}
        <div className="px-4 pt-3 pb-1 text-[10px] font-semibold text-[#9D9B96] uppercase tracking-wider">
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
            className="flex items-center mx-1.5 px-2.5 py-1.5 rounded-md text-[12px] text-[#9D9B96] hover:text-[#121212] hover:bg-[#f9f9f8] transition-colors"
          >
            {link.label}
          </a>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-[#e1dfda]">
        <div className="flex items-center gap-1.5 text-[11px] text-[#9D9B96]">
          <div className="w-1.5 h-1.5 rounded-full bg-[#007CFB] shrink-0" />
          Live · world-id-assets.com
        </div>
        <div className="text-[11px] text-[#9D9B96] mt-0.5">Refreshes hourly</div>
      </div>
    </aside>
  )
}
