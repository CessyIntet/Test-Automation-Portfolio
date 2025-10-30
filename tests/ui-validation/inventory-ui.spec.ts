//  UI level tests
// 
import { test, expect } from '@playwright/test';

test('Homepage UI Validation Test', async ({ page }) => {
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');
  await expect(page.getByRole('heading', { name: 'Customer Login' })).toBeVisible();
  await expect(page.locator('input[name="username"]')).toBeVisible();
  await expect(page.locator('input[name="password"]')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Log In' })).toBeVisible();
});

test('Should show the add to cart button', { tag: '@Happy-Path'}, async ({ page }) => {
      await page.goto('/inventory.html');
      await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
    });
    
 test('Swag Labs text should be visible', { tag: '@Happy-Path'}, async ({ page }) => {
          await page.goto('/inventory.html');
          await expect(page.locator('text=Swag Labs')).toBeVisible();
        });
