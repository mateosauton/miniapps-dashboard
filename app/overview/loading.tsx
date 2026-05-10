import { Skeleton } from '@/components/ui/skeleton'

export default function OverviewLoading() {
  return (
    <div className="space-y-4 max-w-[1400px]">
      {/* StatsGrid — 6 stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-[84px] rounded-lg" />
        ))}
      </div>

      {/* Spotlight row — NewAppsBox + 2× AppSpotlight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-[220px] rounded-lg" />
        ))}
      </div>

      {/* Category + highlights + growth row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-[300px] rounded-lg" />
        ))}
      </div>

      {/* TopAppsTable */}
      <Skeleton className="h-[400px] rounded-lg" />
    </div>
  )
}
