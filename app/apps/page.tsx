import type { Metadata } from 'next'
import { fetchAppsSafe } from '@/lib/api'
import { fetchMetricsSafe } from '@/lib/metrics-api'
import { AppsGrid } from '@/components/apps/AppsGrid'
import { ErrorBanner } from '@/components/ui/ErrorBanner'

export const metadata: Metadata = {
  title: 'App Catalog — World Dev Dashboard',
  description: '50 verified World App mini-apps with real-time stats, categories, and filters.',
}

export default async function AppsPage() {
  const [appsResult, metricsResult] = await Promise.all([fetchAppsSafe(), fetchMetricsSafe()])
  return (
    <div className="max-w-[1400px] space-y-4">
      {!appsResult.ok && (
        <ErrorBanner message={`App catalog could not be loaded — ${appsResult.error}. Please try again later.`} />
      )}
      <AppsGrid apps={appsResult.apps} metricsMap={metricsResult.map} />
    </div>
  )
}
