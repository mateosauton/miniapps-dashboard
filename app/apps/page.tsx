import type { Metadata } from 'next'
import { fetchApps } from '@/lib/api'
import { AppsGrid } from '@/components/apps/AppsGrid'

export const metadata: Metadata = {
  title: 'App Catalog — World Dev Dashboard',
  description: '50 verified World App mini-apps with real-time stats, categories, and filters.',
}

export default async function AppsPage() {
  const apps = await fetchApps()
  return (
    <div className="max-w-[1400px]">
      <AppsGrid apps={apps} />
    </div>
  )
}
