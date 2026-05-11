/**
 * Error-state tests run against the dev server (port 3001) configured with API
 * URLs that point to the mock server's error endpoints. Dev mode avoids ISR
 * caching so the bad API response is always seen at request time.
 */
import { test, expect } from '@playwright/test'

test.describe('API error states', () => {
  test('overview shows error banner when apps API fails', async ({ page }) => {
    await page.goto('/overview')
    await expect(page.getByTestId('error-banner')).toBeVisible()
  })

  test('overview error banner contains descriptive message', async ({ page }) => {
    await page.goto('/overview')
    const banner = page.getByTestId('error-banner')
    await expect(banner).toBeVisible()
    await expect(banner.getByText('Live data unavailable')).toBeVisible()
  })

  test('overview page still renders even when API fails', async ({ page }) => {
    await page.goto('/overview')
    // Stats grid renders (with zeros/empty state) even when API fails
    await expect(page.getByTestId('stats-grid')).toBeVisible()
  })

  test('apps page shows error banner when API fails', async ({ page }) => {
    await page.goto('/apps')
    await expect(page.getByTestId('error-banner')).toBeVisible()
  })

  test('apps page shows empty grid gracefully when API fails', async ({ page }) => {
    await page.goto('/apps')
    // Page renders the grid controls even with no data
    await expect(page.getByPlaceholder('Search apps or teams...')).toBeVisible()
  })

  test('commands page still works with no API dependency', async ({ page }) => {
    // Commands page uses static data — should be unaffected by API failure
    await page.goto('/commands')
    await expect(page.getByRole('button', { name: 'MiniKit' })).toBeVisible()
    await expect(page.getByTestId('error-banner')).not.toBeVisible()
  })

  test('guide page still works with no API dependency', async ({ page }) => {
    await page.goto('/guide')
    await expect(page.locator('h1, h2').first()).toBeVisible()
    await expect(page.getByTestId('error-banner')).not.toBeVisible()
  })
})
