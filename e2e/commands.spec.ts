import { test, expect } from '@playwright/test'

test.describe('Commands page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/commands')
  })

  test('page loads with MiniKit as default SDK tab', async ({ page }) => {
    const minikit = page.getByRole('button', { name: 'MiniKit' })
    await expect(minikit).toBeVisible()
    // MiniKit tab should have the active (dark) style
    await expect(minikit).toHaveCSS('color', 'rgb(255, 255, 255)')
  })

  test('all 4 SDK tabs are visible', async ({ page }) => {
    for (const tab of ['MiniKit', 'IDKit', 'AgentKit', 'UI Kit']) {
      await expect(page.getByRole('button', { name: tab })).toBeVisible()
    }
  })

  test('switching to IDKit tab shows IDKit commands', async ({ page }) => {
    await page.getByRole('button', { name: 'IDKit' }).click()
    // Category tabs should still appear (we're on an SDK that has commands)
    await expect(page.getByRole('button', { name: 'All' })).toBeVisible()
  })

  test('switching to AgentKit tab shows commands', async ({ page }) => {
    await page.getByRole('button', { name: 'AgentKit' }).click()
    await expect(page.getByRole('button', { name: 'All' })).toBeVisible()
  })

  test('UI Kit tab renders UIKit content (no category tabs)', async ({ page }) => {
    await page.getByRole('button', { name: 'UI Kit' }).click()
    // Category tabs disappear, UIKitSection renders instead
    await expect(page.getByRole('button', { name: 'All' })).not.toBeVisible()
  })

  test('category tabs are shown for SDK views', async ({ page }) => {
    // MiniKit is active — category tabs should be visible
    await expect(page.getByRole('button', { name: 'All' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'auth' })).toBeVisible()
  })

  test('expanding a command card reveals details', async ({ page }) => {
    const cards = page.locator('[class*="bg-white border rounded-lg"]')
    const firstCard = cards.first()
    await expect(firstCard).toBeVisible()
    // The toggle button is the header button inside the card
    await firstCard.locator('button').first().click()
    // Expanded card shows Parameters section
    await expect(firstCard.getByText('Parameters')).toBeVisible()
  })

  test('collapsing an expanded card hides details', async ({ page }) => {
    const cards = page.locator('[class*="bg-white border rounded-lg"]')
    const firstCard = cards.first()
    await firstCard.locator('button').first().click()
    await expect(firstCard.getByText('Parameters')).toBeVisible()
    // Click again to collapse
    await firstCard.locator('button').first().click()
    await expect(firstCard.getByText('Parameters')).not.toBeVisible()
  })

  test('copy prompt button is visible in expanded card', async ({ page }) => {
    const cards = page.locator('[class*="bg-white border rounded-lg"]')
    await cards.first().locator('button').first().click()
    await expect(page.getByRole('button', { name: 'Copy prompt' })).toBeVisible()
  })

  test('command count summary is shown', async ({ page }) => {
    // e.g. "12 commands" or "3 commands"
    await expect(page.getByText(/\d+ command/)).toBeVisible()
  })
})
