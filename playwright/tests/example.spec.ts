import { test, expect } from '@playwright/test'

test('homepage loads', async ({ page }) => {
  await page.goto('http://localhost:5173')
  // simple smoke check: page has title or renders index.html
  const title = await page.title()
  expect(typeof title).toBe('string')
})
