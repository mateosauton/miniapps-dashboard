import type { Metadata } from 'next'
import { fetchApps, computeStats } from '@/lib/api'
import { fetchMetrics, sumNewUsers7d, sumTotalOpens } from '@/lib/metrics-api'
import { saveSnapshot, getNewApps, getOldestApps } from '@/lib/snapshot'
import { StatsGrid } from '@/components/overview/StatsGrid'
import { CategoryBreakdown } from '@/components/overview/CategoryBreakdown'
import { TopAppsTable } from '@/components/overview/TopAppsTable'
import { EcosystemHighlights } from '@/components/overview/EcosystemHighlights'
import { NewAppsBox } from '@/components/overview/NewAppsBox'
import { AppSpotlight } from '@/components/overview/AppSpotlight'
import { FastestGrowing } from '@/components/overview/FastestGrowing'

export const metadata: Metadata = {
  title: 'Ecosystem Overview — World Dev Dashboard',
  description: 'Live metrics for World App Mini-Apps: users, impressions, ratings by category.',
}

export default async function OverviewPage() {
  const [apps, metricsMap] = await Promise.all([fetchApps(), fetchMetrics()])

  // Persist snapshot for new-app detection (runs server-side)
  const newApps = getNewApps(apps)
  void saveSnapshot(apps)

  const stats = computeStats(apps)
  const newUsers7d = sumNewUsers7d(metricsMap)
  const totalOpens = sumTotalOpens(metricsMap)
  const oldestApps = getOldestApps(apps, 20)

  return (
    <div className="space-y-4 max-w-[1400px]">
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
