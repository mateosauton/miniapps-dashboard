import { test, expect } from '@playwright/test'

test.describe('Overview page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/overview')
  })

  test('renders 6 stat cards', async ({ page }) => {
    const grid = page.getByTestId('stats-grid')
    await expect(grid).toBeVisible()
    await expect(grid.locator('[class*="rounded-lg"]')).toHaveCount(6)
  })

  test('stat card labels are present', async ({ page }) => {
    const grid = page.getByTestId('stats-grid')
    for (const label of ['Total Apps', 'Mini App Opens', 'Impressions', 'Avg Rating', '7-day New Users', 'Countries']) {
      await expect(grid.getByText(label)).toBeVisible()
    }
  })

  test('Total Apps stat reflects mock data (4 apps)', async ({ page }) => {
    const grid = page.getByTestId('stats-grid')
    // First card is "Total Apps" — mock data has 4 apps
    await expect(grid.getByText('4').first()).toBeVisible()
  })

  test('Countries stat shows max countries across apps (5)', async ({ page }) => {
    // Gamma Tokens has 5 supported countries — the highest in mock data
    await expect(page.getByTestId('stats-grid').getByText('5').first()).toBeVisible()
  })

  test('spotlight row renders 3 sections', async ({ page }) => {
    // NewAppsBox + 2× AppSpotlight
    const spotlightRow = page.locator('.grid.grid-cols-1').nth(0)
    await expect(spotlightRow.locator('> *')).toHaveCount(3)
  })

  test('Top Apps table renders with correct header', async ({ page }) => {
    await expect(page.getByText('Top Apps by Users')).toBeVisible()
    await expect(page.locator('table')).toBeVisible()
  })

  test('Top Apps table shows mock apps in user-count order', async ({ page }) => {
    const rows = page.locator('table tbody tr')
    // Sorted by unique_users: Alpha (10k) > Gamma (8k) > Beta (5k) > Delta (3k)
    await expect(rows.first().getByText('Alpha Finance')).toBeVisible()
  })

  test('no error banner on successful API response', async ({ page }) => {
    await expect(page.getByTestId('error-banner')).not.toBeVisible()
  })

  test('category breakdown section renders', async ({ page }) => {
    await expect(page.getByText('Category Breakdown').or(page.getByText('Categories'))).toBeVisible()
  })
})
