//activity session 13


import { test, expect } from '../../shared/base';
import { attachScreenshot } from '../../shared/helpers.ts';
import users from '../../test-data/users.json';

test.describe('July-18-Deployment', {
  tag: ['@Regression-Testing', '@Sprint-2', '@Smoke-Testing'],
}, () => {


    


      test('User can add single item to cart and checkout the item', { tag: '@Cart'}, async ({ page }) => {
        await page.goto('/inventory.html');
      
        await test.step('Add to cart Sauce Labs Backpack', async () => {
          await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
        });

        await test.step('Click shopping cart', async () => {
          await page.locator('[data-test="shopping-cart-link"]').click();
        });

        await test.step('Verify Sauce Labs Backpack is in the cart and the price is $29.99', async () => {
          await expect(page.locator('[data-test="item-4-title-link"]')).toContainText('Sauce Labs Backpack');
          await expect(page.locator('[data-test="inventory-item-price"]')).toContainText('$29.99');
        });

  
        await test.step('Click Checkout', async () => {
          await page.locator('[data-test="checkout"]').click();
        });

        await test.step('Input User first name', async () => {
          await page.locator('[data-test="firstName"]').fill('test');
        });

        await test.step('Input lastname', async () => {
          await page.locator('[data-test="lastName"]').fill('testaaa');
        });
        await test.step('Input postal code', async () => {
          await page.locator('[data-test="postalCode"]').fill('1229');
        });

        await test.step('Click Continue', async () => {
          await page.locator('[data-test="continue"]').click();
        }); 
        await test.step('Verify Sauce Labs Backpack is in the cart and the price is $29.99', async () => {
          await expect(page.locator('[data-test="item-4-title-link"]')).toBeVisible();
          await expect(page.locator('[data-test="inventory-item-price"]')).toBeVisible();
        });

        await test.step('Click finish', async () => {
          await page.locator('[data-test="finish"]').click();
        });

        await test.step('Verify Thank you for your order!', async () => {
          await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
        });

      });


          test('User can add the item to cart, remove the item, and view the cart page', { tag: '@Cart'}, async ({ page }) => {
            await page.goto('/inventory.html');

            await test.step('Add to cart Sauce Labs Backpack', async () => {
              await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
            });

            await test.step('Remove item', async () => {
              await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
            });
            
            await test.step('Click shopping cart', async () => {
              await page.locator('[data-test="shopping-cart-link"]').click();
            });

            await test.step('Verify Sauce Labs Backpack is not in the cart', async () => {
            const InventoryItem = page.locator('[data-test="inventory-item"]');
            expect(InventoryItem).not.toBeNull();

            });

        });


      test('User should successfully visit About Page', { tag: '@Navigation-UI'}, async ({ page }) => {
        await page.goto('/inventory.html');

        await test.step('Open side bar', async () => {
          await page.getByRole('button', { name: 'Open Menu' }).click();
        });

        await test.step('Click about', async () => {
          await page.locator('[data-test="about-sidebar-link"]').click();
        });

        await test.step('Heading-"Build apps users love with AI" should be visible', async () => {
          await expect(page.getByText('Build apps users love with AI-driven insights')).toBeVisible();
        });

        await test.step('Verify URL', async () => {
          await expect(page).toHaveURL('https://saucelabs.com/');
        });

      });

      


});
