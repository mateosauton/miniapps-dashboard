// ── API config ────────────────────────────────────────────────────────────────
// Override endpoints via env vars for staging/testing:
//   NEXT_PUBLIC_API_URL=https://... npm run dev
//   NEXT_PUBLIC_METRICS_URL=https://... npm run dev

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  'https://world-id-assets.com/api/v2/public/apps'

export const METRICS_URL =
  process.env.NEXT_PUBLIC_METRICS_URL ??
  'https://metrics.worldcoin.org/miniapps/stats/data.json'

export const UIKIT_URL =
  process.env.NEXT_PUBLIC_UIKIT_URL ??
  'https://mini-apps-ui-kit.world.org/'

/** ISR revalidation period in seconds (1 hour) */
export const REVALIDATE_SECONDS = 3_600

// ── App categories ────────────────────────────────────────────────────────────
/** Canonical list of World App categories, sourced from the API schema.
 *  Used by AppsGrid and any other filter UI — add here if the API gains a new category. */
export const APP_CATEGORIES = ['All', 'Tokens', 'Finance', 'Gaming', 'Earn', 'Business', 'Other'] as const
export type AppCategoryFilter = (typeof APP_CATEGORIES)[number]

// ── Command categories ────────────────────────────────────────────────────────
/** All CommandCategory values plus 'All' sentinel, used by CommandGrid filter tabs. */
export const COMMAND_CATEGORIES = [
  'All',
  'auth',
  'payments',
  'signing',
  'messaging',
  'permissions',
  'notifications',
  'ux',
] as const
export type CommandCategoryFilter = (typeof COMMAND_CATEGORIES)[number]
