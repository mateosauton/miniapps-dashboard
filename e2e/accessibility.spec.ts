import { test, expect } from '@playwright/test'

test.describe('Accessibility', () => {
  test('app cards are keyboard focusable', async ({ page }) => {
    await page.goto('/apps')
    await expect(page.getByTestId('app-card').first()).toBeVisible()
    // App cards have tabIndex=0 so they appear in tab order
    const card = page.getByTestId('app-card').first()
    await expect(card).toHaveAttribute('tabindex', '0')
  })

  test('app card opens with Enter key', async ({ page }) => {
    await page.goto('/apps')
    await expect(page.getByTestId('app-card').first()).toBeVisible()
    const card = page.getByTestId('app-card').first()
    await card.focus()
    await card.press('Enter')
    await expect(page.getByRole('dialog')).toBeVisible()
  })

  test('drawer closes with Escape key', async ({ page }) => {
    await page.goto('/apps')
    await expect(page.getByTestId('app-card').first()).toBeVisible()
    await page.getByTestId('app-card').first().click()
    await expect(page.getByRole('dialog')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.getByRole('dialog')).not.toBeVisible()
  })

  test('navigation links have accessible text', async ({ page }) => {
    await page.goto('/overview')
    const navLinks = page.locator('aside a, nav a')
    const count = await navLinks.count()
    for (let i = 0; i < count; i++) {
      const text = await navLinks.nth(i).textContent()
      expect(text?.trim().length).toBeGreaterThan(0)
    }
  })

  test('mobile nav trigger has aria-label', async ({ page }) => {
    await page.goto('/overview')
    // On mobile viewport (Pixel 5), hamburger has aria-label="Open menu"
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible()
  })

  test('stats grid cards have readable text', async ({ page }) => {
    await page.goto('/overview')
    const grid = page.getByTestId('stats-grid')
    await expect(grid).toBeVisible()
    // All 6 labels are present and readable
    const labels = ['Total Apps', 'Mini App Opens', 'Impressions', 'Avg Rating', '7-day New Users', 'Countries']
    for (const label of labels) {
      await expect(grid.getByText(label)).toBeVisible()
    }
  })

  test('search input has placeholder text for discoverability', async ({ page }) => {
    await page.goto('/apps')
    await expect(page.getByPlaceholder('Search apps or teams...')).toBeVisible()
  })

  test('command expand toggle buttons are keyboard operable', async ({ page }) => {
    await page.goto('/commands')
    const cards = page.locator('[class*="bg-white border rounded-lg"]')
    await expect(cards.first()).toBeVisible()
    // The toggle button inside the card header is a <button> (natively focusable)
    const toggle = cards.first().locator('button').first()
    await toggle.focus()
    await toggle.press('Enter')
    await expect(cards.first().getByText('Parameters')).toBeVisible()
  })
})
