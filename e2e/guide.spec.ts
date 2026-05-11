import { test, expect } from '@playwright/test'

test.describe('Guide page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/guide')
  })

  test('page renders without error', async ({ page }) => {
    await expect(page.locator('h1, h2').first()).toBeVisible()
  })

  test('guide has multiple sections', async ({ page }) => {
    const headings = page.locator('h2, h3')
    const count = await headings.count()
    expect(count).toBeGreaterThan(2)
  })

  test('page title references implementation guide', async ({ page }) => {
    await expect(page).toHaveTitle(/Guide/i)
  })

  test('no error banner shown (static content)', async ({ page }) => {
    await expect(page.getByTestId('error-banner')).not.toBeVisible()
  })
})
