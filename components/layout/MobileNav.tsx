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
      <SheetTrigger className="p-2 rounded-full hover:bg-gray-100 transition-colors" aria-label="Open menu">
        <div className="w-4 h-0.5 bg-gray-900 mb-1" />
        <div className="w-4 h-0.5 bg-gray-900 mb-1" />
        <div className="w-4 h-0.5 bg-gray-900" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[260px] p-0 bg-gray-0 border-r border-gray-200">
        <div className="px-4 pt-5 pb-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gray-900 rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-gray-0 rounded-full" />
            </div>
            <div>
              <div className="font-semibold text-[13px] text-gray-900">World Dev Dashboard</div>
              <div className="text-[11px] text-gray-500">Mini Apps Ecosystem</div>
            </div>
          </div>
        </div>
        <nav className="py-2">
          {['Platform', 'SDK Reference'].map((section) => (
            <div key={section}>
              <div className="px-4 pt-3 pb-1 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
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
                        ? 'bg-gray-900 text-gray-0'
                        : 'text-gray-700 hover:bg-gray-50'
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
