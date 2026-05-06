import type { WorldApp, AppsApiResponse, EcosystemStats, CategoryStat } from '@/types'
import { API_URL, REVALIDATE_SECONDS } from '@/lib/config'

// Slim down each app to only fields we use — keeps the response well under 2MB cache limit
function slimApp(raw: WorldApp): WorldApp {
  return {
    app_id: raw.app_id,
    name: raw.name,
    short_name: raw.short_name,
    team_name: raw.team_name,
    category: raw.category,
    category_ranking: raw.category_ranking,
    unique_users: raw.unique_users,
    app_rating: raw.app_rating,
    impressions: raw.impressions,
    verification_status: raw.verification_status,
    is_for_humans_only: raw.is_for_humans_only,
    is_android_only: raw.is_android_only,
    app_mode: raw.app_mode,
    supported_countries: raw.supported_countries ?? [],
    supported_languages: raw.supported_languages ?? [],
    avg_notification_open_rate: raw.avg_notification_open_rate,
    max_notifications_per_day: raw.max_notifications_per_day,
    logo_img_url: raw.logo_img_url,
    world_app_description: raw.world_app_description,
    description: raw.description,
    integration_url: raw.integration_url,
    app_website_url: raw.app_website_url,
    support_link: raw.support_link,
    source_code_url: raw.source_code_url,
    showcase_img_urls: raw.showcase_img_urls ?? [],
    hero_image_url: raw.hero_image_url,
    world_app_button_text: raw.world_app_button_text,
    associated_domains: raw.associated_domains ?? [],
    contracts: raw.contracts ?? [],
    whitelisted_addresses: raw.whitelisted_addresses ?? [],
    permit2_tokens: raw.permit2_tokens ?? [],
    show_in_app_store: raw.show_in_app_store,
  }
}

export type FetchAppsResult =
  | { ok: true; apps: WorldApp[] }
  | { ok: false; apps: []; error: string }

export async function fetchApps(): Promise<WorldApp[]> {
  const result = await fetchAppsSafe()
  return result.apps
}

export async function fetchAppsSafe(): Promise<FetchAppsResult> {
  try {
    const res = await fetch(API_URL, { next: { revalidate: REVALIDATE_SECONDS } })
    if (!res.ok) {
      const msg = `Apps API returned ${res.status} ${res.statusText}`
      console.warn('[fetchApps]', msg, { url: API_URL })
      return { ok: false, apps: [], error: msg }
    }
    const data: AppsApiResponse = await res.json()
    const raw = data.app_rankings?.top_apps ?? []
    return { ok: true, apps: raw.map((a) => slimApp(a)) }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    console.warn('[fetchApps] fetch failed:', msg, { url: API_URL })
    return { ok: false, apps: [], error: msg }
  }
}

export function computeStats(apps: WorldApp[]): EcosystemStats {
  const totalApps = apps.length
  const totalUsers = apps.reduce((s, a) => s + a.unique_users, 0)
  const totalImpressions = apps.reduce((s, a) => s + a.impressions, 0)
  const avgRating =
    apps.length > 0
      ? apps.reduce((s, a) => s + a.app_rating, 0) / apps.length
      : 0
  const verifiedApps = apps.filter(
    (a) => a.verification_status === 'verified'
  ).length
  const maxCountries = apps.reduce(
    (m, a) => Math.max(m, a.supported_countries?.length ?? 0),
    0
  )

  const catMap = new Map<string, { apps: WorldApp[] }>()
  for (const app of apps) {
    const cat = app.category?.name ?? 'Other'
    if (!catMap.has(cat)) catMap.set(cat, { apps: [] })
    catMap.get(cat)!.apps.push(app)
  }

  const categoryBreakdown: CategoryStat[] = Array.from(catMap.entries()).map(
    ([name, { apps: catApps }]) => {
      const catUsers = catApps.reduce((s, a) => s + a.unique_users, 0)
      const catImpressions = catApps.reduce((s, a) => s + a.impressions, 0)
      return {
        name,
        appCount: catApps.length,
        totalUsers: catUsers,
        totalImpressions: catImpressions,
        conversionRate:
          catImpressions > 0 ? (catUsers / catImpressions) * 100 : 0,
      }
    }
  )
  categoryBreakdown.sort((a, b) => b.totalUsers - a.totalUsers)

  const topApps = [...apps]
    .sort((a, b) => b.unique_users - a.unique_users)
    .slice(0, 10)

  return {
    totalApps,
    totalUsers,
    totalImpressions,
    avgRating,
    verifiedApps,
    maxCountries,
    categoryBreakdown,
    topApps,
  }
}
