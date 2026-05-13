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
      <SheetTrigger className="p-1.5 rounded-md hover:bg-gray-100 transition-colors" aria-label="Open menu">
        <div className="w-4 h-0.5 bg-gray-900 mb-1" />
        <div className="w-4 h-0.5 bg-gray-900 mb-1" />
        <div className="w-4 h-0.5 bg-gray-900" />
      </SheetTrigger>
      <SheetContent side="left" className="w-[232px] p-0 bg-gray-0 border-r border-gray-200">
        <div className="px-3 pt-3 pb-2.5 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center">
              <div className="w-2.5 h-2.5 bg-gray-0 rounded-full" />
            </div>
            <div>
              <div className="font-semibold text-[12px] text-gray-900">World Dev Dashboard</div>
              <div className="text-[10px] text-gray-500">Mini Apps Ecosystem</div>
            </div>
          </div>
        </div>
        <nav className="py-1.5">
          {['Platform', 'SDK Reference'].map((section) => (
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
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center justify-between mx-1.5 px-2 py-1.5 rounded-md text-[12px] font-medium transition-colors',
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
