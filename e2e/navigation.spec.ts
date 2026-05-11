import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('root redirects to /overview', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL('/overview')
  })

  test('overview page loads', async ({ page }) => {
    await page.goto('/overview')
    await expect(page.getByTestId('stats-grid')).toBeVisible()
  })

  test('apps page loads', async ({ page }) => {
    await page.goto('/apps')
    await expect(page.getByPlaceholder('Search apps or teams...')).toBeVisible()
  })

  test('commands page loads with MiniKit tab active', async ({ page }) => {
    await page.goto('/commands')
    await expect(page.getByRole('button', { name: 'MiniKit' })).toBeVisible()
  })

  test('guide page loads', async ({ page }) => {
    await page.goto('/guide')
    await expect(page.locator('h1, h2').first()).toBeVisible()
  })

  test('sidebar links navigate correctly', async ({ page }) => {
    await page.goto('/overview')

    await page.getByRole('link', { name: 'Apps' }).first().click()
    await expect(page).toHaveURL('/apps')

    await page.getByRole('link', { name: 'Commands' }).first().click()
    await expect(page).toHaveURL('/commands')

    await page.getByRole('link', { name: 'Guide' }).first().click()
    await expect(page).toHaveURL('/guide')

    await page.getByRole('link', { name: 'Overview' }).first().click()
    await expect(page).toHaveURL('/overview')
  })

  test('mobile: hamburger opens nav drawer', async ({ page }) => {
    await page.goto('/overview')
    // Hamburger is shown at lg breakpoint and below
    const hamburger = page.getByRole('button', { name: 'Open menu' })
    await expect(hamburger).toBeVisible()
    await hamburger.click()
    // Sheet drawer should open with nav links
    await expect(page.getByRole('dialog').getByRole('link', { name: 'Apps' })).toBeVisible()
  })

  test('mobile: nav drawer closes on link click', async ({ page }) => {
    await page.goto('/overview')
    await page.getByRole('button', { name: 'Open menu' }).click()
    await page.getByRole('dialog').getByRole('link', { name: 'Apps' }).click()
    await expect(page).toHaveURL('/apps')
    await expect(page.getByRole('dialog')).not.toBeVisible()
  })
})
