'use client'

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

  return (
    <header className="bg-white border-b border-[#CECDCA] px-4 lg:px-6 py-3 flex items-center justify-between shrink-0">
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
    </header>
  )
}
