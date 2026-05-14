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

  test('ecosystem pulse renders aggregate panels', async ({ page }) => {
    const pulse = page.getByTestId('ecosystem-pulse')
    await expect(pulse).toBeVisible()
    await expect(page.getByTestId('ecosystem-pulse-panel')).toHaveCount(4)

    for (const heading of ['Store Health', 'Growth Activity', 'Distribution', 'Integration Surface']) {
      await expect(pulse.getByText(heading)).toBeVisible()
    }
  })

  test('ecosystem pulse shows store health summary', async ({ page }) => {
    const pulse = page.getByTestId('ecosystem-pulse')
    await expect(pulse.getByText('Verified apps')).toBeVisible()
    await expect(pulse.getByText('4 / 4').first()).toBeVisible()
    await expect(pulse.getByText('Visible in store')).toBeVisible()
  })

  test('overview avoids app-list presentation', async ({ page }) => {
    await expect(page.getByText('Top Apps by Users')).not.toBeVisible()
    await expect(page.locator('table')).not.toBeVisible()
  })

  test('no error banner on successful API response', async ({ page }) => {
    await expect(page.getByTestId('error-banner')).not.toBeVisible()
  })

  test('category breakdown section renders', async ({ page }) => {
    await expect(page.getByText('Category Breakdown').or(page.getByText('Categories'))).toBeVisible()
  })
})
