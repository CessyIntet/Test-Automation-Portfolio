import { test, expect } from '../../shared/base';
import { attachScreenshot } from '../../shared/helpers.ts';

const LOGIN_PAGE_SCREENSHOT = 'login-page-screenshot.png';
const ERROR_MESSAGE_SCREENSHOT = 'error-message-screenshot.png';
const CHECKOUTURL_ERROR_SCREENSHOT = 'checkouturl-error-screenshot.png';


test.describe('Login Page UI-Level Tests', { tag: [ "@HappyPath"] }, () => {


    test('Login form fields should be visible', {tag: "@Smoke"}, async ({ LoginPage, page  },testInfo) => {

        await test.step('Go to login page', async () => {   
            await page.goto('https://www.saucedemo.com/');
        });

        await test.step('Check if login form fields are visible', async () => {   
            await expect(page.locator('[data-test="username"]')).toBeVisible();
        });
        
        await test.step('Check if password field is visible', async () => {
            await expect(page.locator('[data-test="password"]')).toBeVisible();
        });

        await test.step('Check if login button is visible', async () => {
            await expect(page.locator('[data-test="login-button"]')).toBeVisible();
        });

        await test.step('Check if "Swag Labs" is visible', async () => {
            await expect(page.getByText('Swag Labs')).toBeVisible();
        });

        await test.step('Attach screenshot of successful login', async () => {
                await attachScreenshot(
                  LoginPage.page,testInfo,LOGIN_PAGE_SCREENSHOT);
        });

    });


    test('Area Snapshot Should be consistent', {tag: "@Smoke"}, async ({ LoginPage, page  },testInfo) => {
    await test.step('Go to login page', async () => {   
            await page.goto('https://www.saucedemo.com/');
        });
    
    await test.step('Verify area snapshot of login container', async () => {
        await expect(page.locator('#login_button_container')).toMatchAriaSnapshot(`
            - textbox "Username"
            - textbox "Password"
            - button "Login"
            `);
        });
    });

});



test.describe('Test Suite 1: Negative Test Cases – Logged-Out Users', () => {

    test('Should restrict access to Checkout Step 1 for logged-out users', { tag: '@Negative @AccessControl' }, async ({ page }, testInfo) => {

      // Try to go directly to the checkout page without logging in
      await test.step("Navigate to checkout page", async () => {
        await page.goto('https://www.saucedemo.com/checkout-step-one.html');
      });

      // Verify the error message appears
      await test.step("Verify error message is displayed", async () => {
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toContainText("Epic sadface: You can only access '/checkout-step-one.html' when you are logged in.");
        });

      // Verify that the user stays on or is redirected to the login page
      await test.step("Verify that the user is redirected to the login page ", async () => {
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator('[data-test="username"]')).toBeVisible();
        await expect(page.locator('[data-test="password"]')).toBeVisible();
      });


      await test.step("Take and attach screenshot of error message", async () => {
          await attachScreenshot(page, testInfo, ERROR_MESSAGE_SCREENSHOT);
        });
    });

    
    test('Should restrict access to Checkout Step 2 for logged-out users', { tag: '@Negative @AccessControl' }, async ({ page }, testInfo) => {

      // Try to go directly to the checkout page without logging in
      await test.step("Navigate to checkout page", async () => {
        await page.goto('https://www.saucedemo.com/checkout-step-two.html');
      });

      // Verify the error message appears
      await test.step("Verify error message is displayed", async () => {
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toContainText("Epic sadface: You can only access '/checkout-step-two.html' when you are logged in.");
        });

      // Verify that the user stays on or is redirected to the login page
      await test.step("Verify that the user is redirected to the login page ", async () => {
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator('[data-test="username"]')).toBeVisible();
        await expect(page.locator('[data-test="password"]')).toBeVisible();
      });


      await test.step("Take and attach screenshot of error message", async () => {
          await attachScreenshot(page, testInfo, ERROR_MESSAGE_SCREENSHOT);
        });


    });

    
    test('Should restrict access to Checkout Complete page for logged-out users', { tag: '@Negative @AccessControl' }, async ({ page }, testInfo) => {

      // Try to go directly to the checkout page without logging in
      await test.step("Navigate to checkout page", async () => {
        await page.goto('https://www.saucedemo.com/checkout-complete.html');
      });

      // Verify the error message appears
      await test.step("Verify error message is displayed", async () => {
        await expect(page.locator('[data-test="error"]')).toBeVisible();
        await expect(page.locator('[data-test="error"]')).toContainText("Epic sadface: You can only access '/checkout-complete.html' when you are logged in.");
        });

      // Verify that the user stays on or is redirected to the login page
      await test.step("Verify that the user is redirected to the login page ", async () => {
        await expect(page).toHaveURL('https://www.saucedemo.com/');
        await expect(page.locator('[data-test="username"]')).toBeVisible();
        await expect(page.locator('[data-test="password"]')).toBeVisible();
      });

      await test.step("Take and attach screenshot of error message", async () => {
          await attachScreenshot(page, testInfo, ERROR_MESSAGE_SCREENSHOT);
        });


    });

    
});


 test.describe('Test Suite 2: Negative Test Cases – Session Expired / After Logout', { tag: [ '@Regression-Testing', '@Smoke-Testing', "@Security"] }, () => {
  test.beforeEach(async ({ LoginPage }) => {
    await LoginPage.navigateTo();});

    
    test("should prevent access to Checkout Step 1 after logout via direct URL", {tag: "@accessControl"}, async ({ page, LoginPage }, testInfo) => {
      await test.step("Login with valid credentials", async () => {
        await LoginPage.login(process.env.SAUCEDEMO_USERNAME!, process.env.SAUCEDEMO_PASSWORD!);
      });

      //assertion inside the POM since we just need to bypass the login validation here
      
      await test.step("Verify login success", async () => {
        await LoginPage.verifyLoginSuccess();
      });

      await test.step("Copy URL of checkout-step-one.html", async () => {
        await page.goto('https://www.saucedemo.com/checkout-step-one.html');
      });

      await test.step("Verify visibility of check out form fields ", async () => {
        await page.locator('[data-test="firstName"]').isVisible();
        await page.locator('[data-test="lastName"]').isVisible();
        await page.locator('[data-test="postalCode"]').isVisible();
      });

      await test.step("Click Log Out", async () => {
        await page.getByRole('button', { name: 'Open Menu' }).click();
        await page.locator('[data-test="logout-sidebar-link"]').click();
      });

      await test.step("Copy URL of checkout-step-one.html", async () => {
        await page.goto('https://www.saucedemo.com/checkout-step-one.html');
      });

      await test.step("Verify error message", async () => {
        await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: You can only access \'/checkout-step-one.html\' when you are logged in.');
      });


        await test.step("Take and attach screenshot of goback error", async () => {
          await attachScreenshot(page,testInfo,CHECKOUTURL_ERROR_SCREENSHOT);
         }); 

    });

    
    
    test("Should prevent access to Checkout Step 2 after logout via direct URL", {tag: "@accessControl"}, async ({ page, LoginPage }, testInfo) => {
      await test.step("Login with valid credentials", async () => {
        await LoginPage.login(process.env.SAUCEDEMO_USERNAME!, process.env.SAUCEDEMO_PASSWORD!);
      });

      //assertion inside the POM since we just need to bypass the login validation here
      
      await test.step("Verify login success", async () => {
        await LoginPage.verifyLoginSuccess();
      });

      await test.step("Copy URL of checkout-step-two.html", async () => {
        await page.goto('https://www.saucedemo.com/checkout-step-two.html');
      });

       await test.step('Verify visibility of check out step two page', async () => {
                await expect(page.locator('[data-test="title"]')).toBeVisible();
              });

      await test.step("Click Log Out", async () => {
        await page.getByRole('button', { name: 'Open Menu' }).click();
        await page.locator('[data-test="logout-sidebar-link"]').click();
      });

      await test.step("Copy URL of checkout-step-two.html", async () => {
        await page.goto('https://www.saucedemo.com/checkout-step-two.html');
      });

      await test.step("Verify error message", async () => {
        await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: You can only access \'/checkout-step-two.html\' when you are logged in.');
      });


        await test.step("Take and attach screenshot of goback error", async () => {
          await attachScreenshot(page,testInfo,CHECKOUTURL_ERROR_SCREENSHOT);
         }); 

    });


    
    
    test("Should prevent access to Checkout Complete page after logout via direct URL", {tag: "@accessControl"}, async ({ page, LoginPage }, testInfo) => {
      await test.step("Login with valid credentials", async () => {
        await LoginPage.login(process.env.SAUCEDEMO_USERNAME!, process.env.SAUCEDEMO_PASSWORD!);
      });

      //assertion inside the POM since we just need to bypass the login validation here
      
      await test.step("Verify login success", async () => {
        await LoginPage.verifyLoginSuccess();
      });

      await test.step("Copy URL of checkout complete page", async () => {
        await page.goto('https://www.saucedemo.com/checkout-complete.html');
      });

      await test.step("Verify visibility of check out form fields ", async () => {
        await page.locator('[data-test="firstName"]').isVisible();
        await page.locator('[data-test="lastName"]').isVisible();
        await page.locator('[data-test="postalCode"]').isVisible();
      });

      await test.step("Click Log Out", async () => {
        await page.getByRole('button', { name: 'Open Menu' }).click();
        await page.locator('[data-test="logout-sidebar-link"]').click();
      });

      await test.step("Copy URL of checkout-step-one.html", async () => {
        await page.goto('https://www.saucedemo.com/checkout-step-one.html');
      });

      await test.step("Verify error message", async () => {
        await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: You can only access \'/checkout-step-one.html\' when you are logged in.');
      });


        await test.step("Take and attach screenshot of goback error", async () => {
          await attachScreenshot(page,testInfo,CHECKOUTURL_ERROR_SCREENSHOT);
         }); 

    });

    
    
    test("Should prevent access to cart page after logout via direct URL", {tag: "@accessControl"}, async ({ page, LoginPage }, testInfo) => {
      await test.step("Login with valid credentials", async () => {
        await LoginPage.login(process.env.SAUCEDEMO_USERNAME!, process.env.SAUCEDEMO_PASSWORD!);
      });

      //assertion inside the POM since we just need to bypass the login validation here
      
      await test.step("Verify login success", async () => {
        await LoginPage.verifyLoginSuccess();
      });

      await test.step("Copy URL of checkout-step-two.html", async () => {
        await page.goto('https://www.saucedemo.com/cart.html');
      });

      await test.step("Verify visibility of check out form fields ", async () => {
        await page.locator('[data-test="firstName"]').isVisible();
        await page.locator('[data-test="lastName"]').isVisible();
        await page.locator('[data-test="postalCode"]').isVisible();
      });

      await test.step("Click Log Out", async () => {
        await page.getByRole('button', { name: 'Open Menu' }).click();
        await page.locator('[data-test="logout-sidebar-link"]').click();
      });

      await test.step("Copy URL of checkout-step-one.html", async () => {
        await page.goto('https://www.saucedemo.com/checkout-step-one.html');
      });

      await test.step("Verify error message", async () => {
        await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: You can only access \'/checkout-step-one.html\' when you are logged in.');
      });


        await test.step("Take and attach screenshot of goback error", async () => {
          await attachScreenshot(page,testInfo,CHECKOUTURL_ERROR_SCREENSHOT);
         }); 

    });

});
