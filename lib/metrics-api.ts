import type { AppMetrics } from '@/types'
import { METRICS_URL, REVALIDATE_SECONDS } from '@/lib/config'

interface RawMetricEntry {
  app_id: string
  unique_users: number
  unique_users_last_7_days: { country: string; value: number }[]
  new_users_last_7_days: { country: string; value: number }[]
  total_users: number
  total_impressions: number
  total_impressions_last_7_days: number
  notification_opt_in_rate: number | null
}

function sumValues(arr: { value: number }[] | null | undefined): number {
  if (!arr) return 0
  return arr.reduce((s, x) => s + (x.value ?? 0), 0)
}

export type FetchMetricsResult =
  | { ok: true; map: Map<string, AppMetrics> }
  | { ok: false; map: Map<string, AppMetrics>; error: string }

export async function fetchMetricsSafe(): Promise<FetchMetricsResult> {
  try {
    const res = await fetch(METRICS_URL, { next: { revalidate: REVALIDATE_SECONDS } })
    if (!res.ok) {
      const msg = `Metrics API returned ${res.status} ${res.statusText}`
      console.warn('[fetchMetrics]', msg, { url: METRICS_URL })
      return { ok: false, map: new Map(), error: msg }
    }
    const data: RawMetricEntry[] = await res.json()
    const map = new Map<string, AppMetrics>()
    for (const entry of data) {
      map.set(entry.app_id, {
        app_id: entry.app_id,
        users7d: sumValues(entry.unique_users_last_7_days),
        newUsers7d: sumValues(entry.new_users_last_7_days),
        totalUsers: entry.total_users ?? 0,
        impressions7d: entry.total_impressions_last_7_days ?? 0,
        optInRate: entry.notification_opt_in_rate ?? null,
      })
    }
    return { ok: true, map }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.warn('[fetchMetrics] fetch failed:', msg, { url: METRICS_URL })
    return { ok: false, map: new Map(), error: msg }
  }
}

export async function fetchMetrics(): Promise<Map<string, AppMetrics>> {
  const result = await fetchMetricsSafe()
  return result.map
}

export function sumNewUsers7d(metrics: Map<string, AppMetrics>): number {
  let total = 0
  for (const m of metrics.values()) total += m.newUsers7d
  return total
}

export function sumTotalOpens(metrics: Map<string, AppMetrics>): number {
  let total = 0
  for (const m of metrics.values()) total += m.totalUsers
  return total
}
