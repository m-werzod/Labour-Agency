import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('renders the hero headline and primary CTAs', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/Licensed Workforce/i);
    await expect(page.getByRole('link', { name: /Request Workforce/i }).first()).toBeVisible();
  });

  test('displays the government license number', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('0078').first()).toBeVisible();
  });

  test('has no horizontal overflow on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 720 });
    await page.goto('/');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });
});
