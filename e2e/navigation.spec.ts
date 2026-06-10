import { test, expect } from '@playwright/test';

test('navigates to the About page', async ({ page }) => {
  await page.goto('/about');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page).toHaveURL(/\/about$/);
});

test('serves a localized (Russian) route', async ({ page }) => {
  await page.goto('/ru');
  await expect(page).toHaveURL(/\/ru$/);
  // The header request CTA should be translated.
  await expect(page.getByRole('link', { name: /Запросить персонал/i }).first()).toBeVisible();
});

test('mobile menu opens and exposes navigation', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/');
  await page.getByRole('button', { name: /open menu/i }).click();
  await expect(page.getByRole('link', { name: 'About Us' })).toBeVisible();
});
