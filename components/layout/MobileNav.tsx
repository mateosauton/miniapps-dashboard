'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/overview', label: 'Overview', section: 'Platform' },
  { href: '/apps', label: 'Apps', section: 'Platform' },
  { href: '/commands', label: 'Commands', section: 'SDK Reference' },
  { href: '/guide', label: 'Guide', section: 'SDK Reference' },
]

export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="lg:hidden p-2 rounded-md hover:bg-[#e1dfda] transition-colors" aria-label="Open menu">
        <div className="w-4 h-0.5 bg-[#121212] mb-1" />
        <div className="w-4 h-0.5 bg-[#121212] mb-1" />
        <div className="w-4 h-0.5 bg-[#121212]" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[260px] p-0 bg-white border-r border-[#CECDCA]">
        <div className="px-4 pt-5 pb-3 border-b border-[#e1dfda]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#121212] rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
            <div>
              <div className="font-semibold text-[13px]">World Dev Dashboard</div>
              <div className="text-[11px] text-[#9D9B96]">Mini Apps Ecosystem</div>
            </div>
          </div>
        </div>
        <nav className="py-2">
          {['Platform', 'SDK Reference'].map((section) => (
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
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center justify-between mx-1.5 px-2.5 py-2 rounded-md text-[13px] font-medium transition-colors',
                      active
                        ? 'bg-[#121212] text-white'
                        : 'text-[#373635] hover:bg-[#f9f9f8]'
                    )}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
