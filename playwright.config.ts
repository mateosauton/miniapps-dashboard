import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI
    ? [['github'], ['html', { open: 'never' }]]
    : [['html', { open: 'never' }]],
  use: {
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:3000' },
      testIgnore: ['**/api-errors.spec.ts'],
    },
    {
      name: 'mobile',
      use: { ...devices['Pixel 5'], baseURL: 'http://localhost:3000' },
      testMatch: ['**/navigation.spec.ts'],
    },
    {
      name: 'error-states',
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:3001' },
      testMatch: ['**/api-errors.spec.ts'],
    },
  ],

  webServer: [
    {
      // Lightweight mock API — serves fixture data and intentional error endpoints
      command: 'node e2e/mock-server.mjs',
      url: 'http://localhost:3333/apps',
      reuseExistingServer: true,
      timeout: 10_000,
    },
    {
      // Production Next.js server using mock data (happy-path tests)
      command:
        'NEXT_PUBLIC_API_URL=http://localhost:3333/apps NEXT_PUBLIC_METRICS_URL=http://localhost:3333/metrics npm run build && NEXT_PUBLIC_API_URL=http://localhost:3333/apps NEXT_PUBLIC_METRICS_URL=http://localhost:3333/metrics npm start',
      url: 'http://localhost:3000',
      reuseExistingServer: false,
      timeout: 180_000,
    },
    {
      // Dev server for error-state tests — no ISR cache, bad API URLs trigger ErrorBanner
      command:
        'PORT=3001 NEXT_PUBLIC_API_URL=http://localhost:3333/apps-error NEXT_PUBLIC_METRICS_URL=http://localhost:3333/metrics-error npm run dev',
      url: 'http://localhost:3001',
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
  ],
})
