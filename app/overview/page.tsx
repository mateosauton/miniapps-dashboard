import type { Metadata } from 'next'
import { fetchAppsSafe, computeStats } from '@/lib/api'
import { fetchMetricsSafe, sumNewUsers7d, sumTotalOpens } from '@/lib/metrics-api'
import { saveSnapshot, getNewApps, getOldestApps } from '@/lib/snapshot'
import { StatsGrid } from '@/components/overview/StatsGrid'
import { CategoryBreakdown } from '@/components/overview/CategoryBreakdown'
import { TopAppsTable } from '@/components/overview/TopAppsTable'
import { EcosystemHighlights } from '@/components/overview/EcosystemHighlights'
import { NewAppsBox } from '@/components/overview/NewAppsBox'
import { AppSpotlight } from '@/components/overview/AppSpotlight'
import { FastestGrowing } from '@/components/overview/FastestGrowing'
import { ErrorBanner } from '@/components/ui/ErrorBanner'

export const metadata: Metadata = {
  title: 'Ecosystem Overview — World Dev Dashboard',
  description: 'Live metrics for World App Mini-Apps: users, impressions, ratings by category.',
}

export default async function OverviewPage() {
  const [appsResult, metricsResult] = await Promise.all([fetchAppsSafe(), fetchMetricsSafe()])
  const apps = appsResult.apps
  const metricsMap = metricsResult.map

  // Persist snapshot for new-app detection (runs server-side)
  const newApps = getNewApps(apps)
  void saveSnapshot(apps)

  const stats = computeStats(apps)
  const newUsers7d = sumNewUsers7d(metricsMap)
  const totalOpens = sumTotalOpens(metricsMap)
  const oldestApps = getOldestApps(apps, 20)

  return (
    <div className="space-y-4 max-w-[1400px]">
      {!appsResult.ok && (
        <ErrorBanner message={`App data could not be loaded — ${appsResult.error}. Stats may be incomplete.`} />
      )}
      {!metricsResult.ok && (
        <ErrorBanner message="Growth and usage metrics are temporarily unavailable." />
      )}
      <StatsGrid stats={stats} newUsers7d={newUsers7d} totalOpens={totalOpens} />

      {/* Spotlight row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NewAppsBox apps={newApps} />
        <AppSpotlight apps={apps.slice(0, 100)} type="daily" />
        <AppSpotlight apps={oldestApps} type="gold" />
      </div>

      {/* Category + conversion + growth */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <CategoryBreakdown categories={stats.categoryBreakdown} />
        <EcosystemHighlights categories={stats.categoryBreakdown} />
        <FastestGrowing apps={apps} metrics={metricsMap} />
      </div>

      <TopAppsTable apps={stats.topApps} />
    </div>
  )
}
