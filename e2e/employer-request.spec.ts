import { test, expect } from '@playwright/test';

test.describe('Employer request form', () => {
  test('shows accessible validation errors on empty submit', async ({ page }) => {
    await page.goto('/employer-request');
    await page.getByRole('button', { name: /Submit request/i }).click();
    // Zod-driven, translated validation messages should appear.
    await expect(page.getByText('This field is required').first()).toBeVisible();
  });

  test('renders all required workforce fields', async ({ page }) => {
    await page.goto('/employer-request');
    await expect(page.getByLabel(/Company name/i)).toBeVisible();
    await expect(page.getByLabel(/Contact person/i)).toBeVisible();
    await expect(page.getByLabel(/Email address/i)).toBeVisible();
    await expect(page.getByLabel(/Required skills/i)).toBeVisible();
  });
});
