import { createServer } from 'http'

const MOCK_APPS = [
  {
    app_id: 'app-alpha-001',
    name: 'Alpha Finance',
    short_name: 'ALF',
    team_name: 'Alpha Team',
    category: { id: 'cat-finance', name: 'Finance' },
    category_ranking: 1,
    unique_users: 10000,
    app_rating: 4.5,
    impressions: 50000,
    verification_status: 'verified',
    is_for_humans_only: false,
    is_android_only: false,
    app_mode: 'mini-app',
    supported_countries: ['US', 'UK', 'DE'],
    supported_languages: ['en'],
    avg_notification_open_rate: 0.35,
    max_notifications_per_day: 3,
    logo_img_url: '',
    world_app_description: 'Alpha Finance is a DeFi platform for World App users with seamless token swaps.',
    description: { overview: 'DeFi platform for the World App ecosystem.', how_it_works: 'Connect and trade.' },
    integration_url: 'https://alphafi.example.com',
    app_website_url: 'https://alphafi.example.com',
    showcase_img_urls: [],
    associated_domains: ['alphafi.example.com'],
    contracts: [],
    whitelisted_addresses: [],
    permit2_tokens: [],
    show_in_app_store: true,
  },
  {
    app_id: 'app-beta-002',
    name: 'Beta Gaming',
    short_name: 'BTG',
    team_name: 'Beta Studios',
    category: { id: 'cat-gaming', name: 'Gaming' },
    category_ranking: 1,
    unique_users: 5000,
    app_rating: 3.8,
    impressions: 30000,
    verification_status: 'verified',
    is_for_humans_only: true,
    is_android_only: false,
    app_mode: 'mini-app',
    supported_countries: ['US'],
    supported_languages: ['en'],
    avg_notification_open_rate: null,
    max_notifications_per_day: 1,
    logo_img_url: '',
    world_app_description: 'Gaming platform exclusively for verified humans.',
    description: { overview: 'Humans-only gaming platform.' },
    integration_url: 'https://beta.example.com',
    app_website_url: 'https://beta.example.com',
    showcase_img_urls: [],
    associated_domains: [],
    contracts: [],
    whitelisted_addresses: [],
    permit2_tokens: [],
    show_in_app_store: true,
  },
  {
    app_id: 'app-gamma-003',
    name: 'Gamma Tokens',
    short_name: 'GMT',
    team_name: 'Gamma Labs',
    category: { id: 'cat-tokens', name: 'Tokens' },
    category_ranking: 1,
    unique_users: 8000,
    app_rating: 4.2,
    impressions: 40000,
    verification_status: 'verified',
    is_for_humans_only: false,
    is_android_only: false,
    app_mode: 'native',
    supported_countries: ['US', 'UK', 'DE', 'FR', 'JP'],
    supported_languages: ['en', 'de', 'fr'],
    avg_notification_open_rate: 0.5,
    max_notifications_per_day: 5,
    logo_img_url: '',
    world_app_description: 'Native token management for the World App ecosystem.',
    description: { overview: 'Token management in native mode.' },
    integration_url: 'https://gamma.example.com',
    app_website_url: 'https://gamma.example.com',
    showcase_img_urls: [],
    associated_domains: ['gamma.example.com'],
    contracts: [],
    whitelisted_addresses: [],
    permit2_tokens: [],
    show_in_app_store: true,
  },
  {
    app_id: 'app-delta-004',
    name: 'Delta Earn',
    short_name: 'DLE',
    team_name: 'Delta Corp',
    category: { id: 'cat-earn', name: 'Earn' },
    category_ranking: 1,
    unique_users: 3000,
    app_rating: 4.8,
    impressions: 20000,
    verification_status: 'verified',
    is_for_humans_only: false,
    is_android_only: false,
    app_mode: 'mini-app',
    supported_countries: ['US', 'UK'],
    supported_languages: ['en'],
    avg_notification_open_rate: 0.2,
    max_notifications_per_day: 2,
    logo_img_url: '',
    world_app_description: 'Earn rewards by completing tasks in the World App ecosystem.',
    description: { overview: 'Task-based earning platform.' },
    integration_url: 'https://delta.example.com',
    app_website_url: 'https://delta.example.com',
    showcase_img_urls: [],
    associated_domains: ['delta.example.com'],
    contracts: [],
    whitelisted_addresses: [],
    permit2_tokens: [],
    show_in_app_store: true,
  },
]

const MOCK_METRICS = [
  {
    app_id: 'app-alpha-001',
    unique_users: 10000,
    unique_users_last_7_days: [{ country: 'US', value: 800 }, { country: 'UK', value: 200 }],
    new_users_last_7_days: [{ country: 'US', value: 150 }, { country: 'UK', value: 50 }],
    total_users: 50000,
    total_impressions: 500000,
    total_impressions_last_7_days: 12000,
    notification_opt_in_rate: 0.45,
  },
  {
    app_id: 'app-beta-002',
    unique_users: 5000,
    unique_users_last_7_days: [{ country: 'US', value: 300 }],
    new_users_last_7_days: [{ country: 'US', value: 80 }],
    total_users: 20000,
    total_impressions: 200000,
    total_impressions_last_7_days: 5000,
    notification_opt_in_rate: null,
  },
  {
    app_id: 'app-gamma-003',
    unique_users: 8000,
    unique_users_last_7_days: [{ country: 'US', value: 500 }, { country: 'DE', value: 200 }],
    new_users_last_7_days: [{ country: 'US', value: 120 }],
    total_users: 35000,
    total_impressions: 350000,
    total_impressions_last_7_days: 8000,
    notification_opt_in_rate: 0.6,
  },
  {
    app_id: 'app-delta-004',
    unique_users: 3000,
    unique_users_last_7_days: [{ country: 'US', value: 200 }],
    new_users_last_7_days: [{ country: 'US', value: 60 }],
    total_users: 12000,
    total_impressions: 100000,
    total_impressions_last_7_days: 3000,
    notification_opt_in_rate: 0.3,
  },
]

const APPS_RESPONSE = { app_rankings: { top_apps: MOCK_APPS } }

createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  const path = req.url?.split('?')[0]

  if (path === '/apps') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(APPS_RESPONSE))
  } else if (path === '/metrics') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(MOCK_METRICS))
  } else if (path === '/apps-error' || path === '/metrics-error') {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Internal Server Error' }))
  } else {
    res.writeHead(404)
    res.end('Not found')
  }
}).listen(3333, () => {
  console.log('Mock API server on http://localhost:3333')
})
