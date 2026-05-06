// ── API types ──────────────────────────────────────────────────────────────────
export interface AppCategory {
  id: string
  name: string
}

export interface AppDescription {
  overview?: string
  how_it_works?: string
  how_to_connect?: string
}

export interface WorldApp {
  app_id: string
  name: string
  short_name: string
  team_name: string
  category: AppCategory
  category_ranking: number
  unique_users: number
  app_rating: number
  impressions: number
  verification_status: 'verified' | 'unverified' | (string & {})
  is_for_humans_only: boolean
  is_android_only: boolean
  app_mode: 'native' | 'mini-app'
  supported_countries: string[]
  supported_languages: string[]
  avg_notification_open_rate: number | null
  max_notifications_per_day: number
  logo_img_url: string
  world_app_description: string
  description?: AppDescription
  integration_url?: string
  app_website_url?: string
  support_link?: string
  source_code_url?: string
  showcase_img_urls?: string[]
  hero_image_url?: string
  world_app_button_text?: string
  associated_domains?: string[]
  contracts?: string[]
  whitelisted_addresses?: string[]
  permit2_tokens?: string[]
  has_attestation?: boolean
  show_in_app_store?: boolean
}

export interface AppsApiResponse {
  app_rankings: {
    top_apps: WorldApp[]
  }
}

// ── Command types ──────────────────────────────────────────────────────────────
export type CommandCategory =
  | 'auth'
  | 'payments'
  | 'signing'
  | 'messaging'
  | 'permissions'
  | 'notifications'
  | 'ux'

export type CommandSDK = 'minikit' | 'idkit' | 'agentkit'

export interface CommandParam {
  name: string
  type: string
  required: boolean
  description: string
}

export interface CommandReturnField {
  field: string
  type: string
  description: string
}

export interface MiniKitCommand {
  slug: string
  name: string
  sdk: CommandSDK
  category: CommandCategory
  description: string
  longDescription: string
  params: CommandParam[]
  returns: CommandReturnField[]
  codeExample: string
  llmPrompt: string
  errorCodes?: string[]
  relatedCommands: string[]
  backendRequired: boolean
  prereqs?: string[]
}

// ── Guide types ────────────────────────────────────────────────────────────────
export interface GuideStep {
  n: number
  title: string
  text?: string
  code?: string
}

export type SecuritySeverity = 'critical' | 'important' | 'recommended'

export interface SecurityItem {
  title: string
  text: string
  sev: SecuritySeverity
}

export interface MetricItem {
  val: string
  label: string
  note: string
}

export interface GuideSection {
  id: string
  title: string
  steps?: GuideStep[]
  items?: SecurityItem[]
  metrics?: MetricItem[]
}

// ── Metrics endpoint ──────────────────────────────────────────────────────────
export interface AppMetrics {
  app_id: string
  users7d: number       // sum of unique_users_last_7_days[].value
  newUsers7d: number    // sum of new_users_last_7_days[].value
  totalUsers: number
  impressions7d: number
  optInRate: number | null
}

// ── Computed stats ─────────────────────────────────────────────────────────────
export interface EcosystemStats {
  totalApps: number
  totalUsers: number
  totalImpressions: number
  avgRating: number
  verifiedApps: number
  maxCountries: number
  categoryBreakdown: CategoryStat[]
  topApps: WorldApp[]
}

export interface CategoryStat {
  name: string
  appCount: number
  totalUsers: number
  totalImpressions: number
  conversionRate: number
}
