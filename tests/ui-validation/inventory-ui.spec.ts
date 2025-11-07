//  UI level tests
// 
import { test, expect } from '../../shared/base';
import products from '../../test-data/products.json';
import { attachScreenshot } from '../../shared/helpers.ts';


const PRODUCT_INVENTORY_SCREENSHOT = 'product-inventory-screenshot.png';
const FOOTER_SCREENSHOT = 'footer-screenshot.png';
const OPEN_MENUITEM_SCREENSHOT = 'open-menuitem-screenshot.png';




test.describe('Inventory Page - UI Verification', () => {
    test.beforeEach(async ({ InventoryPage }) => {
    await InventoryPage.navigateTo();
    await InventoryPage.login(process.env.SAUCEDEMO_USERNAME!, process.env.SAUCEDEMO_PASSWORD!);
    await InventoryPage.verifyLoginSuccess();
  });

  // // Loop through each product in products.json
  // for (const product of products) {
  //   test(`Should display product: ${product.name} with correct price and image`, { tag: '@UI @Regression' }, async ({ page },testInfo) => {

  //     await test.step(`Verify visibility for ${product.name}, and correct price of ${product.price}`, async () => {
  //       const productCard = page.locator('div.inventory_item').filter({ hasText: product.name });

  //       await expect(productCard).toBeVisible();
          
  //     // Price check (scoped within product card)
  //     if (product.price) {await expect(productCard.locator('[data-test="inventory-item-price"]')).toHaveText(product.price);
  //     }

  //     // Add-to-cart button check
  //     await expect(productCard.locator('button[data-test^="add-to-cart"]')).toBeVisible();

  //     // Image check
  //     if (product.imageSelector) {
  //       await expect(page.locator(product.imageSelector)).toBeVisible();
  //     }
  //     });
  //     await test.step("Take and attach screenshot", async () => {
  //       await attachScreenshot(page,testInfo,PRODUCT_INVENTORY_SCREENSHOT);
  //     });
  //   });
  // }

   // Data-driven loop for all products
  for (const product of products) {
    test.only(`Should display "${product.name}" with correct price, image, and Add to Cart button`,{ tag: ['@UI', '@Regression', '@Inventory'] },async ({ page }, testInfo) => {
        
        await test.step(`Locate and verify visibility of ${product.name}`, async () => {
          const productCard = page.locator('div.inventory_item').filter({ hasText: product.name });
          await expect(productCard).toBeVisible();
        });

        await test.step(`Verify correct price displayed for ${product.name}`, async () => {
          if (product.price) {
            const productCard = page.locator('div.inventory_item').filter({ hasText: product.name });
            await expect(productCard.locator('[data-test="inventory-item-price"]')).toHaveText(product.price);
          }
        });

        await test.step(`Verify Add to Cart button for ${product.name}`, async () => {
          const productCard = page.locator('div.inventory_item').filter({ hasText: product.name });
          await expect(productCard.locator(`button${product.selector.replace('add-to-cart', 'add-to-cart')}`)).toBeVisible();
        });

        await test.step(`Verify product image is visible for ${product.name}`, async () => {
          if (product.imageSelector) {
            await expect(page.locator(product.imageSelector)).toBeVisible();
          }
        });

        await test.step(`Navigate to product details page for ${product.name}`, async () => {
          await page.locator(product.imageSelector).click();
          await expect(page).toHaveURL(product.productLink);
        });

        await test.step(`Verify product details: name, description, and price for ${product.name}`, async () => {
          await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(product.name);
          await expect(page.locator('[data-test="inventory-item-desc"]')).toContainText(product.description);
          if (product.price) {
            await expect(page.locator('[data-test="inventory-item-price"]')).toHaveText(product.price);
          }
        });

        await test.step('Navigate back to inventory page', async () => {
          await page.goBack();
          await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
        });

        await test.step('Capture screenshot for reporting', async () => {
          await attachScreenshot(page, testInfo, PRODUCT_INVENTORY_SCREENSHOT);
        });
      }
    );
  }


  

  test('Verify visibility of open menu items - Inventory, About Us, Logout, Reset', async ({ InventoryPage, page },testInfo) => {


    await test.step("After logging in, verify visibility of Open Menu button", async () => {
      await expect(page.getByRole('button', { name: 'Open Menu' })).toBeVisible();
    });

    await test.step("Click Open Menu button", async () => {
      await InventoryPage.ClickOpenMenu();
    });

    await test.step("Verify About link visibility", async () => {
      await expect(page.locator('[data-test="about-sidebar-link"]')).toBeVisible();
    });

    await test.step("Verify Inventory link visibility", async () => {
      await expect(page.locator('[data-test="inventory-sidebar-link"]')).toBeVisible();
    });

    await test.step("Verify Logout link visibility", async () => {
      await expect(page.locator('[data-test="logout-sidebar-link"]')).toBeVisible();
    });

    await test.step("Verify Reset link visibility", async () => {
      await expect(page.locator('[data-test="reset-sidebar-link"]')).toBeVisible();
    });

     await test.step('Attach screenshot of open menu', async () => {
      await attachScreenshot(page,testInfo,OPEN_MENUITEM_SCREENSHOT);
     });


  });


    

  test('Footer and social media links (Twitter, Facebook, LinkedIn) redirect properly.', async ({ InventoryPage, page },testInfo) => {

    await test.step("Verify footer copyright text", async () => {
      await expect(page.locator('[data-test="footer-copy"]')).toContainText('© 2025 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy');
    });

    await test.step("Verify social media link- Twitter", async () => {
      await expect(page.locator('[data-test="social-twitter"]')).toBeVisible();
      await page.locator('[data-test="social-twitter"]').click();
      const page1Promise = page.waitForEvent('popup');
      await expect((await page1Promise).url()).toBe('https://x.com/saucelabs');

    });

    await test.step("Verify social media link- Facebook", async () => {
      await expect(page.locator('[data-test="social-facebook"]')).toBeVisible();
      await page.locator('[data-test="social-facebook"]').click();
      const page2Promise = page.waitForEvent('popup');
      await expect((await page2Promise).url()).toBe('https://www.facebook.com/saucelabs');
    });

    await test.step("Verify social media link- LinkedIn", async () => {
      await expect(page.locator('[data-test="social-linkedin"]')).toBeVisible();
      await page.locator('[data-test="social-linkedin"]').click();
      const page3Promise = page.waitForEvent('popup');
      await expect((await page3Promise).url()).toBe('https://www.linkedin.com/company/sauce-labs/');
    });

    await test.step("Verify Swag Labs title, shopping cart link, and product sort container visibility", async () => {
      await expect(page.getByText('Swag Labs')).toBeVisible();
      await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
      await expect(page.locator('[data-test="product-sort-container"]')).toBeVisible();
      await expect(page.locator('[data-test="title"]')).toBeVisible();

    });

     await test.step('Attach screenshot of footer', async () => {
      await attachScreenshot(page,testInfo,FOOTER_SCREENSHOT);
     });
  });

  
  test('Test area snapshot after login', async ({ page }, testInfo) => {

    await test.step('After login, verify aria snapshot of inventory page', async () => {
      await expect(page.locator('[data-test="secondary-header"]')).toMatchAriaSnapshot(`
        - text: Products Name (A to Z)
        - combobox:
          - option "Name (A to Z)" [selected]
          - option "Name (Z to A)"
          - option "Price (low to high)"
          - option "Price (high to low)"
        `);
      await expect(page.locator('[data-test="inventory-container"]')).toMatchAriaSnapshot(`
        - link "Sauce Labs Backpack":
          - /url: "#"
          - img "Sauce Labs Backpack"
        - link "Sauce Labs Backpack":
          - /url: "#"
        - text: /carry\\.allTheThings\\(\\) with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection\\. \\$\\d+\\.\\d+/
        - button "Add to cart"
        - link "Sauce Labs Bike Light":
          - /url: "#"
          - img "Sauce Labs Bike Light"
        - link "Sauce Labs Bike Light":
          - /url: "#"
        - text: /A red light isn't the desired state in testing but it sure helps when riding your bike at night\\. Water-resistant with 3 lighting modes, 1 AAA battery included\\. \\$\\d+\\.\\d+/
        - button "Add to cart"
        - link "Sauce Labs Bolt T-Shirt":
          - /url: "#"
          - img "Sauce Labs Bolt T-Shirt"
        - link "Sauce Labs Bolt T-Shirt":
          - /url: "#"
        - text: /Get your testing superhero on with the Sauce Labs bolt T-shirt\\. From American Apparel, \\d+% ringspun combed cotton, heather gray with red bolt\\. \\$\\d+\\.\\d+/
        - button "Add to cart"
        - link "Sauce Labs Fleece Jacket":
          - /url: "#"
          - img "Sauce Labs Fleece Jacket"
        - link "Sauce Labs Fleece Jacket":
          - /url: "#"
        - text: /It's not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office\\. \\$\\d+\\.\\d+/
        - button "Add to cart"
        - link "Sauce Labs Onesie":
          - /url: "#"
          - img "Sauce Labs Onesie"
        - link "Sauce Labs Onesie":
          - /url: "#"
        - text: /Rib snap infant onesie for the junior automation engineer in development\\. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won't unravel\\. \\$\\d+\\.\\d+/
        - button "Add to cart"
        - link "Test.allTheThings() T-Shirt (Red)":
          - /url: "#"
          - img "Test.allTheThings() T-Shirt (Red)"
        - link "Test.allTheThings() T-Shirt (Red)":
          - /url: "#"
        - text: /This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests\\. Super-soft and comfy ringspun combed cotton\\. \\$\\d+\\.\\d+/
        - button "Add to cart"
        `);
      });


      
     await test.step('Attach screenshot of Snapshot', async () => {
      await attachScreenshot(page,testInfo,PRODUCT_INVENTORY_SCREENSHOT);
     });

    });





});




test('test', async ({ page }) => {

  await page.locator('[data-test="item-4-title-link"]').click();
  await expect(page.getByText('Sauce Labs Backpackcarry.')).toBeVisible();
  await expect(page.locator('[data-test="inventory-item-price"]')).toBeVisible();
  await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
  await expect(page.locator('[data-test="item-sauce-labs-backpack-img"]')).toBeVisible();



  await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
  await page.locator('[data-test="back-to-products"]').click();
  await page.locator('[data-test="item-0-title-link"]').click();


  await expect(page.getByText('Sauce Labs Bike LightA red')).toBeVisible();
  await expect(page.locator('[data-test="inventory-item-price"]')).toBeVisible();
  await expect(page.locator('[data-test="add-to-cart"]')).toBeVisible();
  await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
  await page.locator('[data-test="back-to-products"]').click();
  await page.locator('[data-test="item-4-title-link"]').click();
  await expect(page.locator('[data-test="inventory-item-name"]')).toBeVisible();

  
  await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');
  await expect(page.locator('[data-test="inventory-item-desc"]')).toContainText('carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.');
  await expect(page.locator('[data-test="item-sauce-labs-backpack-img"]')).toBeVisible();
  await page.locator('[data-test="back-to-products"]').click();
  await page.getByText('$29.99').click();


  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="item-4-title-link"]').click();
  await expect(page.locator('[data-test="error"]')).toBeVisible();
  await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: You can only access \'/inventory-item.html\' when you are logged in.');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="item-0-title-link"]').click();


  await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Sauce Labs Bike Light');
  await expect(page.locator('[data-test="inventory-item-price"]')).toContainText('$9.99');
  await expect(page.locator('[data-test="inventory-item-desc"]')).toContainText('A red light isn\'t the desired state in testing but it sure helps when riding your bike at night. Water-resistant with 3 lighting modes, 1 AAA battery included.');
  await page.goto('https://www.saucedemo.com/inventory.html');
  await page.locator('[data-test="item-1-title-link"]').click();


  await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Sauce Labs Bolt T-Shirt');
  await expect(page.locator('[data-test="inventory-item-price"]')).toContainText('$15.99');
  await expect(page.locator('[data-test="item-sauce-labs-bolt-t-shirt-img"]')).toBeVisible();
  await page.goto('https://www.saucedemo.com/inventory.html');
  await page.locator('[data-test="item-5-title-link"]').click();


  await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Sauce Labs Fleece Jacket');
  await expect(page.locator('[data-test="inventory-item-desc"]')).toContainText('It\'s not every day that you come across a midweight quarter-zip fleece jacket capable of handling everything from a relaxing day outdoors to a busy day at the office.');
  await expect(page.locator('[data-test="inventory-item-price"]')).toContainText('$49.99');
  await expect(page.locator('[data-test="item-sauce-labs-fleece-jacket-img"]')).toBeVisible();
  await page.goto('https://www.saucedemo.com/inventory.html');
  await page.locator('[data-test="item-2-title-link"]').click();


  await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Sauce Labs Onesie');
  await expect(page.locator('[data-test="inventory-item-desc"]')).toContainText('Rib snap infant onesie for the junior automation engineer in development. Reinforced 3-snap bottom closure, two-needle hemmed sleeved and bottom won\'t unravel.');
  await expect(page.locator('[data-test="inventory-item-price"]')).toContainText('$7.99');
  await expect(page.locator('[data-test="item-sauce-labs-onesie-img"]')).toBeVisible();
  await page.goto('https://www.saucedemo.com/inventory.html');
  await page.locator('[data-test="item-3-title-link"]').click();


  await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Test.allTheThings() T-Shirt (Red)');
  await expect(page.locator('[data-test="inventory-item-desc"]')).toContainText('This classic Sauce Labs t-shirt is perfect to wear when cozying up to your keyboard to automate a few tests. Super-soft and comfy ringspun combed cotton.');
  await expect(page.locator('[data-test="inventory-item-price"]')).toContainText('$15.99');
  await expect(page.locator('[data-test="item-test.allthethings()-t-shirt-(red)-img"]')).toBeVisible();
  await page.goto('https://www.saucedemo.com/inventory.html');
});