import type { AppMetrics } from '@/types'

const METRICS_URL = 'https://metrics.worldcoin.org/miniapps/stats/data.json'

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

export async function fetchMetrics(): Promise<Map<string, AppMetrics>> {
  try {
    const res = await fetch(METRICS_URL, { next: { revalidate: 3600 } })
    if (!res.ok) throw new Error(`Metrics API error: ${res.status}`)
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
    return map
  } catch (err) {
    console.error('fetchMetrics failed:', err)
    return new Map()
  }
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
