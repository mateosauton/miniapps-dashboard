import { test, expect } from '@playwright/test'

test.describe('Apps catalog', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/apps')
    // Wait for cards to render
    await expect(page.getByTestId('app-card').first()).toBeVisible()
  })

  test('renders all 4 mock apps by default', async ({ page }) => {
    await expect(page.getByTestId('app-card')).toHaveCount(4)
  })

  test('search filters apps by name', async ({ page }) => {
    await page.getByPlaceholder('Search apps or teams...').fill('Alpha')
    await expect(page.getByTestId('app-card')).toHaveCount(1)
    await expect(page.getByTestId('app-card').getByText('Alpha Finance')).toBeVisible()
  })

  test('search filters apps by team name', async ({ page }) => {
    await page.getByPlaceholder('Search apps or teams...').fill('Beta Studios')
    await expect(page.getByTestId('app-card')).toHaveCount(1)
  })

  test('search with no matches shows empty state', async ({ page }) => {
    await page.getByPlaceholder('Search apps or teams...').fill('zzznonexistent')
    await expect(page.getByText('No apps match your filters.')).toBeVisible()
    await expect(page.getByTestId('app-card')).toHaveCount(0)
  })

  test('clearing search restores all apps', async ({ page }) => {
    await page.getByPlaceholder('Search apps or teams...').fill('Alpha')
    await expect(page.getByTestId('app-card')).toHaveCount(1)
    await page.getByPlaceholder('Search apps or teams...').clear()
    await expect(page.getByTestId('app-card')).toHaveCount(4)
  })

  test('category tab filters apps', async ({ page }) => {
    await page.getByRole('button', { name: /^Gaming/ }).click()
    await expect(page.getByTestId('app-card')).toHaveCount(1)
    await expect(page.getByTestId('app-card').getByText('Beta Gaming')).toBeVisible()
  })

  test('Finance category shows correct app', async ({ page }) => {
    await page.getByRole('button', { name: /^Finance/ }).click()
    await expect(page.getByTestId('app-card')).toHaveCount(1)
    await expect(page.getByTestId('app-card').getByText('Alpha Finance')).toBeVisible()
  })

  test('All category tab restores full list', async ({ page }) => {
    await page.getByRole('button', { name: /^Gaming/ }).click()
    await expect(page.getByTestId('app-card')).toHaveCount(1)
    await page.getByRole('button', { name: /^All/ }).click()
    await expect(page.getByTestId('app-card')).toHaveCount(4)
  })

  test('humans only toggle filters correctly', async ({ page }) => {
    await page.getByRole('button', { name: '' }).filter({ has: page.locator('[style*="background"]') }).click()
    // Only Beta Gaming has is_for_humans_only: true
    await expect(page.getByTestId('app-card')).toHaveCount(1)
    await expect(page.getByTestId('app-card').getByText('Beta Gaming')).toBeVisible()
  })

  test('sort by Rating puts highest-rated app first', async ({ page }) => {
    await page.getByRole('button', { name: 'Rating' }).click()
    // Delta Earn has highest rating (4.8)
    await expect(page.getByTestId('app-card').first().getByText('Delta Earn')).toBeVisible()
  })

  test('sort by Users puts most-used app first', async ({ page }) => {
    await page.getByRole('button', { name: 'Users' }).click()
    // Alpha Finance has most unique_users (10000)
    await expect(page.getByTestId('app-card').first().getByText('Alpha Finance')).toBeVisible()
  })

  test('clicking app card opens detail drawer', async ({ page }) => {
    await page.getByTestId('app-card').first().click()
    await expect(page.getByRole('dialog')).toBeVisible()
  })

  test('app detail drawer shows app name', async ({ page }) => {
    await page.getByTestId('app-card').filter({ hasText: 'Alpha Finance' }).click()
    await expect(page.getByRole('dialog').getByText('Alpha Finance')).toBeVisible()
  })

  test('pressing ESC closes the drawer', async ({ page }) => {
    await page.getByTestId('app-card').first().click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog')).not.toBeVisible()
  })

  test('native app badge is shown for native apps', async ({ page }) => {
    // Gamma Tokens has app_mode: 'native'
    await expect(page.getByTestId('app-card').filter({ hasText: 'Gamma Tokens' }).getByText('native')).toBeVisible()
  })

  test('humans-only badge is shown on relevant cards', async ({ page }) => {
    // Beta Gaming has is_for_humans_only: true
    await expect(page.getByTestId('app-card').filter({ hasText: 'Beta Gaming' }).getByText('humans only')).toBeVisible()
  })

  test('no error banner on successful API response', async ({ page }) => {
    await expect(page.getByTestId('error-banner')).not.toBeVisible()
  })
})
