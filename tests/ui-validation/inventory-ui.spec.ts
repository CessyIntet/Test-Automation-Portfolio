//  UI level tests
// 
import { test, expect } from '../../shared/base';
import products from '../../test-data/products.json';

test.describe('Inventory Page - UI Verification', () => {
    test.beforeEach(async ({ InventoryPage }) => {
    await InventoryPage.navigateTo();
    await InventoryPage.login(process.env.SAUCEDEMO_USERNAME!, process.env.SAUCEDEMO_PASSWORD!);
    await InventoryPage.verifyLoginSuccess();
  });

  // Loop through each product in products.json
  for (const product of products) {
    test(`Should display product: ${product.name} with correct price and image`, { tag: '@UI @Regression' }, async ({ page }) => {

      await test.step(`Verify visibility for ${product.name}`, async () => {
        const productCard = page.locator('div.inventory_item').filter({ hasText: product.name });

        await expect(productCard).toBeVisible();
          
      // Price check (scoped within product card)
      if (product.price) {await expect(productCard.locator('[data-test="inventory-item-price"]')).toHaveText(product.price);
      }

      // Add-to-cart button check
      await expect(productCard.locator('button[data-test^="add-to-cart"]')).toBeVisible();

      // Image check
      if (product.imageSelector) {
        await expect(page.locator(product.imageSelector)).toBeVisible();
      }
      });
    });
  }
});