
import { test, expect } from '../../shared/base';
import { attachScreenshot } from '../../shared/helpers.ts';
// import users from '../../test-data/users.json';
import customer from '../../test-data/customers.json';
import products from '../../test-data/products.json';


const INVENTORY_PAGE_SCREENSHOT = 'inventory-page-screenshot.png';
const CHECKOUT_SUCCESSFUL_SCREENSHOT = 'checkout-successful-screenshot.png';
const CART_PAGE_SCREENSHOT = 'cart-page-screenshot.png';
const ABOUT_PAGE_SCREENSHOT = 'about-page-screenshot.png';
const EMPTY_CART_CHECKOUT_BEHAVIOR = 'empty-cart-checkout-behavior.png';
const ERROR_MESSAGE_SCREENSHOT = 'error-message-screenshot.png';

 test.describe('Inventory Page Functional Tests', { tag: [ "@HappyPath"] }, () => {
  test.beforeEach(async ({ InventoryPage }) => {
    await InventoryPage.navigateTo();});

    
      test('User can add item to cart and checkout the item', { tag: '@Cart'}, async ({ InventoryPage, page }, testInfo) => {

        const user = customer[1]; // select a user from the customers.json file

          await test.step("Login with invalid credentials", async () => {
            await InventoryPage.login(process.env.SAUCEDEMO_USERNAME!, process.env.SAUCEDEMO_PASSWORD!);
          });

        await test.step("Verify URL and visibility of 'Swag Labs'", async () => {
          
          await expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
          await expect(page.getByText('Swag Labs')).toBeVisible();

        });

          await test.step('Add to cart Sauce Labs Backpack', async () => {
            await InventoryPage.AddtoCartSauceLabsBackpack();
          });

          await test.step('Click shopping cart', async () => {
            await InventoryPage.ClickShoppingCart();
          });

          
          await test.step('Verify cart page has successfully loaded', async () => {
            await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
          });

          await test.step('Verify Sauce Labs Backpack is in the cart and the price is $29.99', async () => {
            await expect(page.locator('[data-test="item-4-title-link"]')).toContainText('Sauce Labs Backpack');
            await expect(page.locator('[data-test="inventory-item-price"]')).toContainText('$29.99');
          });


          await test.step('Click Checkout', async () => {
            await InventoryPage.ClickCheckout();
          });



          await test.step('Verify Checkout Information page is displayed', async () => {
            await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
            await expect(page.locator('[data-test="firstName"]')).toBeVisible();
            await expect(page.locator('[data-test="lastName"]')).toBeVisible();
            await expect(page.locator('[data-test="postalCode"]')).toBeVisible();
          });


          await test.step('Fill customer details', async () => {
            await InventoryPage.inputCustomerDetails(user.firstName, user.lastName, user.postalCode);
          });

          await test.step('Click Continue', async () => {
            await page.locator('[data-test="continue"]').click();
          }); 

          await test.step('Verify Checkout Step Two page is displayed with the correct item and price', async () => {
            await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
            await expect(page.locator('[data-test="cart-list"]')).toBeVisible();
            await expect(page.locator('[data-test="item-4-title-link"]')).toContainText('Sauce Labs Backpack');
            await expect(page.locator('[data-test="inventory-item-price"]')).toContainText('$29.99');
          });

          await test.step('Click finish', async () => {
            await InventoryPage.ClickFinish();
          });

          await test.step('Verify Thank you for your order!', async () => {
            await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
            await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
          });

          await test.step("Take and attach screenshot of thank you page", async () => {
            await attachScreenshot(page,testInfo,CHECKOUT_SUCCESSFUL_SCREENSHOT);
          });

      });


      test('User can successfully remove a previously added item from the cart', { tag: '@Cart'}, async ({ InventoryPage, page }, testInfo) => {

          await test.step("Login with invalid credentials", async () => {
            await InventoryPage.login(process.env.SAUCEDEMO_USERNAME!, process.env.SAUCEDEMO_PASSWORD!);
            await InventoryPage.verifyLoginSuccess();
          });

          await test.step('Add to cart Sauce Labs Backpack', async () => {
            await InventoryPage.AddtoCartSauceLabsBackpack();
          });

          await test.step('Remove item', async () => {
            await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
          });
              
          await test.step('Click shopping cart', async () => {
            await page.locator('[data-test="shopping-cart-link"]').click();
          });

          await test.step('Verify Sauce Labs Backpack is not in the cart', async () => {
            await expect(page.locator('[data-test="inventory-item"]')).not.toBeVisible();

          });

           await test.step("Take and attach screenshot of cart page", async () => {
          await attachScreenshot(page,testInfo,CART_PAGE_SCREENSHOT);
        });

      });

      test('User should successfully visit About Page', { tag: '@Navigation-UI'}, async ({ InventoryPage, page }, testInfo) => {

          await test.step("Login with invalid credentials", async () => {
            await InventoryPage.login(process.env.SAUCEDEMO_USERNAME!, process.env.SAUCEDEMO_PASSWORD!);
            await InventoryPage.verifyLoginSuccess();
          });

        await test.step('Open side bar', async () => {
          await page.getByRole('button', { name: 'Open Menu' }).click();
        });

        await test.step('Click about', async () => {
          await page.locator('[data-test="about-sidebar-link"]').click();
        });

        await test.step('Verify URL', async () => {
          await expect(page).toHaveURL('https://saucelabs.com/');
          await expect(page.getByRole('heading', { name: 'Build apps users love with AI' })).toBeVisible();
        });

         await test.step("Take and attach screenshot of about page", async () => {
          await attachScreenshot(page,testInfo,ABOUT_PAGE_SCREENSHOT);
        });

      });
      
      test('User can can successfully sort products - Alphabetically (Z - A)', { tag: '@Navigation-UI'}, async ({ InventoryPage, page }, testInfo) => {
        // const cartItems = page.locator('[data-test="inventory-list"]');

          await test.step("Login with invalid credentials", async () => {
            await InventoryPage.login(process.env.SAUCEDEMO_USERNAME!, process.env.SAUCEDEMO_PASSWORD!);
            await InventoryPage.verifyLoginSuccess();
          });

            // Sort Z → A
          await page.locator('[data-test="product-sort-container"]').selectOption('za');

          // Locate all inventory items
           const items = page.locator('[data-test="inventory-item"]');

          // Verify first item after sort (Z → A)
            await expect(items.nth(0).locator('[data-test="inventory-item-name"]')).toHaveText('Test.allTheThings() T-Shirt (Red)');

            // Verify last item after sort (A → Z)
            await expect(items.nth(5).locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');

            
            await test.step("Take and attach screenshot of inventory page", async () => {
              await attachScreenshot(page,testInfo,INVENTORY_PAGE_SCREENSHOT);
            });

      });

      test('User can can successfully sort products - Alphabetically (A - Z)', { tag: '@Navigation-UI'}, async ({ InventoryPage, page }, testInfo) => {
        // const cartItems = page.locator('[data-test="inventory-list"]');

          await test.step("Login with invalid credentials", async () => {
            await InventoryPage.login(process.env.SAUCEDEMO_USERNAME!, process.env.SAUCEDEMO_PASSWORD!);
            await InventoryPage.verifyLoginSuccess();
          });

            // Sort A → Z
          await page.locator('[data-test="product-sort-container"]').selectOption('az');

          // Locate all inventory items
           const items = page.locator('[data-test="inventory-item"]');

          // Verify first item after sort (Z → A)
            await expect(items.nth(0).locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');

            // Verify last item after sort (A → Z)
            await expect(items.nth(5).locator('[data-test="inventory-item-name"]')).toHaveText('Test.allTheThings() T-Shirt (Red)');

            await test.step("Take and attach screenshot of inventory page", async () => {
              await attachScreenshot(page,testInfo,INVENTORY_PAGE_SCREENSHOT);
            });

      });


       test('Sort button is working - Price (low to high)', { tag: '@Navigation-UI'}, async ({ InventoryPage, page }, testInfo) => {
        // const cartItems = page.locator('[data-test="inventory-list"]');

          await test.step("Login with invalid credentials", async () => {
            await InventoryPage.login(process.env.SAUCEDEMO_USERNAME!, process.env.SAUCEDEMO_PASSWORD!);
            await InventoryPage.verifyLoginSuccess();
          });

            // Sort price low to high
          await test.step("Click product sort (low to high)", async () => {
            await page.locator('[data-test="product-sort-container"]').selectOption('lohi');
          });

          // Locate all inventory items
           const items = page.locator('[data-test="inventory-item"]');

          // Verify first item after sort (Z → A)
          await test.step("Verify first item after sorting", async () => {
            await expect(items.nth(0).locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Onesie');
          });


            // Verify last item after sort (A → Z)

          await test.step("Verify last item after sorting", async () => {
            await expect(items.nth(5).locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Fleece Jacket');
            });


            await test.step("Take and attach screenshot of inventory page", async () => {
              await attachScreenshot(page,testInfo,INVENTORY_PAGE_SCREENSHOT);
            });

      });

      
       test('Sort button is working - Price (high to low)', { tag: '@Navigation-UI'}, async ({ InventoryPage, page }, testInfo) => {
        // const cartItems = page.locator('[data-test="inventory-list"]');

          await test.step("Login with invalid credentials", async () => {
            await InventoryPage.login(process.env.SAUCEDEMO_USERNAME!, process.env.SAUCEDEMO_PASSWORD!);
            await InventoryPage.verifyLoginSuccess();
          });

          
            // Sort price high to low
            await test.step("Click product sort (high to low)", async () => {
              await page.locator('[data-test="product-sort-container"]').selectOption('hilo');
               });


          // Locate all inventory items
           const items = page.locator('[data-test="inventory-item"]');

          // Verify first item after sort (Z → A)
          await test.step("Verify first item after sorting", async () => {
            await expect(items.nth(0).locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Fleece Jacket');
            });

            // Verify last item after sort (A → Z)
            await test.step("Verify last item after sorting", async () => {
              await expect(items.nth(5).locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Onesie');
            });



            await test.step("Take and attach screenshot of inventory page", async () => {
              await attachScreenshot(page,testInfo,INVENTORY_PAGE_SCREENSHOT);
            });

      });
        

});


test.describe('Add to Cart Functionality - Data Driven', () => {
  test.beforeEach(async ({ InventoryPage }) => {
    await InventoryPage.navigateTo();
});

  test.afterEach(async ({ page }) => {

    // Cleanup to ensure a fresh cart for the next test
    const removeButtons = await page.locator('[data-test^="remove-"]').all();
    if (removeButtons.length > 0) {for (const btn of removeButtons) {await btn.click();}}
  });

  // Loop through all products in products.json
  for (const product of products) {
    test(`Should successfully add ${product.name} to the cart`, { tag: '@Regression' }, async ({ page, InventoryPage }, testInfo) => {
      
      await test.step("Login with invalid credentials", async () => {
        await InventoryPage.login(process.env.SAUCEDEMO_USERNAME!, process.env.SAUCEDEMO_PASSWORD!);
        await InventoryPage.verifyLoginSuccess();
      });

      // Add product to cart
      await test.step(`Add ${product.name} to cart`, async () => {
        await page.locator(product.selector).click();
      });

      // Go to cart
      await test.step("Go to cart", async () => {
        await page.locator('[data-test="shopping-cart-link"]').click();
      });

      // Assert product visibility in cart
      await test.step(`Verify ${product.name} in cart`, async () => {
        await expect(page.locator('[data-test="inventory-item-name"]')).toContainText(product.name);
      });

      await test.step("Take and attach screenshot of cart page", async () => {
          await attachScreenshot(page,testInfo,CART_PAGE_SCREENSHOT);
      });


    });
     

  }
});



test.describe('Negative Test Cases - Logged In State', () => {
  test.beforeEach(async ({ InventoryPage }) => {
    await InventoryPage.navigateTo();
});
      test('User should not be able to proceed to checkout with an empty cart', { tag: ['@Negative'] }, async ({ InventoryPage, page }, testInfo) => {

        testInfo.annotations.push({type: 'issue',description: 'Checkout proceeds even with an empty cart — expected validation missing.'});

        const user = customer[1];
        
        await test.step("Login with valid credentials", async () => {
          await InventoryPage.login(process.env.SAUCEDEMO_USERNAME!, process.env.SAUCEDEMO_PASSWORD!);
          await InventoryPage.ClickShoppingCart();
        });

        // Confirm cart is empty
        await test.step("Confirm cart is empty", async () => {
          await expect(page.locator('.cart_item')).toHaveCount(0);
        });

        await test.step("Confirm cart is empty", async () => {
          await InventoryPage.ClickCheckout();
        });

        await test.step("Confirm user is not redirected to checkout", async () => {
          await expect(page).not.toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
        });
        
        await test.step("Take and attach screenshot of cart page", async () => {
          await attachScreenshot(page, testInfo, EMPTY_CART_CHECKOUT_BEHAVIOR);
        });
      });



});


          // await expect(page.locator('[data-test="social-twitter"]')).toBeVisible();
          // await expect(page.locator('[data-test="social-facebook"]')).toBeVisible();
          // await expect(page.locator('[data-test="social-linkedin"]')).toBeVisible();

