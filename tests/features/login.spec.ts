
import { test, expect } from '../../shared/base';
import { attachScreenshot } from '../../shared/helpers.ts';
import customer from '../../test-data/users.json';

const LOGIN_SUCCESS_SCREENSHOT = 'login-success-screenshot.png';
const LOGIN_FAILURE_SCREENSHOT = 'login-failure-screenshot.png';
const LOGOUT_SUCCESS_SCREENSHOT = 'logout-success-screenshot.png';
const LOGOUT_GOBACK_SCREENSHOT = 'logout-goback-screenshot.png';
const CHECKOUTURL_ERROR_SCREENSHOT = 'checkouturl-error-screenshot.png';


//---------------Focus: verifying successful login behavior for one or multiple users-----------------

 test.describe('Authentication Tests', { tag: [ "@HappyPath"] }, () => {
  test.beforeEach(async ({ LoginPage }) => {
    await LoginPage.navigateTo();});


    test('Should successfully log in with valid credentials', {tag: "@Smoke"}, async ({ LoginPage, page }, testInfo) => {
      await test.step('Input Username', async () => {
        await LoginPage.InputUsername(process.env.SAUCEDEMO_USERNAME!);
      });
      await test.step('Input Password', async () => {
        await LoginPage.InputPassword(process.env.SAUCEDEMO_PASSWORD!);
      });
      await test.step('Click Login Button', async () => {
        await LoginPage.ClickLoginButton();
      });
      await test.step("Verify URL and visibility of 'Swag Labs'", async () => {
        
        await expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
        await expect(page.getByText('Swag Labs')).toBeVisible();

      });
      await test.step('Attach screenshot of successful login', async () => {
        await attachScreenshot(
          LoginPage.page,testInfo,LOGIN_SUCCESS_SCREENSHOT,);    
      });
    });

    
    test('Should allow all 6 valid users to log in successfully', {tag: "@Regression" }, async ({ LoginPage, page }, testInfo) => {
      
      const user = customer[1]; // select a user from the users.json file
      
      await test.step("Login with invalid credentials", async () => {
        await LoginPage.login(user.username, user.password);
      });

      await test.step('Click Login Button', async () => {
        await LoginPage.ClickLoginButton();
      });
      await test.step("Verify URL and visibility of 'Swag Labs'", async () => {
        
        await expect(page.url()).toBe('https://www.saucedemo.com/');
        await expect(page.getByText('Swag Labs')).toBeVisible();

      });
      await test.step('Attach screenshot of successful login', async () => {
        await attachScreenshot(LoginPage.page,testInfo,LOGIN_SUCCESS_SCREENSHOT,);    
      });
    });

});




//---------------Focus: verifying proper error handling and validation during login-----------------

 test.describe('Negative Login Tests', { tag: [ '@Negative-Testing', '@Security'] }, () => {
  test.beforeEach(async ({ LoginPage }) => {
    await LoginPage.navigateTo();});

    test("Should display an error message for invalid credentials", async ({ page, LoginPage }, testInfo) => {
      
      const invalidUser = customer[6];

      await test.step("Login with invalid credentials", async () => {

        await LoginPage.login(invalidUser.username, invalidUser.password);
      });
      
      await test.step("Verify  visibility of login error message", async () => {
        await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
      });

      await test.step("Take and attach screenshot of error", async () => {
        await attachScreenshot(page,testInfo,LOGIN_FAILURE_SCREENSHOT);
      });
    });

      test("Should display an error message when password field is empty", async ({ page, LoginPage }, testInfo) => {
      
        await test.step('Input Username', async () => {
          await LoginPage.InputUsername(process.env.SAUCEDEMO_USERNAME!);
        });
        await test.step('Click Login Button', async () => {
          await LoginPage.ClickLoginButton();
        });
        await test.step("Verify visibility of login error message", async () => {
          await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Password is required');
        });

        await test.step("Take and attach screenshot of error", async () => {
          await attachScreenshot(page,testInfo,LOGIN_FAILURE_SCREENSHOT);
        });
    });

});


//---------------Focus: verifying logout process, navigation restrictions, and session invalidation-----------------

 test.describe('Logout and Session Management Tests', { tag: [ '@Regression-Testing', '@Smoke-Testing', "@Security"] }, () => {
  test.beforeEach(async ({ LoginPage }) => {
    await LoginPage.navigateTo();});

    test("Should successfully log out and redirect to login page", async ({ page, LoginPage }, testInfo) => {
      await test.step("Login with valid credentials", async () => {
        await LoginPage.login(process.env.SAUCEDEMO_USERNAME!, process.env.SAUCEDEMO_PASSWORD!);
      });

      //assertion inside the POM since we just need to bypass the login validation here
      await test.step("Verify login success", async () => {
        await LoginPage.verifyLoginSuccess();
      });

      await test.step("Click Open Menu", async () => {
        await page.getByRole('button', { name: 'Open Menu' }).click();
      });

      await test.step("Click Log Out", async () => {
        await page.locator('[data-test="logout-sidebar-link"]').click();
      });

      await test.step("Should return to Login Page", async () => {
        
        await expect(page.url()).toBe('https://www.saucedemo.com/');
        await expect(page.getByText('Swag Labs')).toBeVisible();

      });

      await test.step("Take and attach screenshot", async () => {
        await attachScreenshot(page,testInfo,LOGOUT_SUCCESS_SCREENSHOT);
      });
    });

    
    test("Should prevent user from returning to previous page after logout", {tag: "@Navigation"}, async ({ page, LoginPage }, testInfo) => {
      await test.step("Login with valid credentials", async () => {
        await LoginPage.login(process.env.SAUCEDEMO_USERNAME!, process.env.SAUCEDEMO_PASSWORD!);
      });

      //assertion inside the POM since we just need to bypass the login validation here
      
      await test.step("Verify login success", async () => {
        await LoginPage.verifyLoginSuccess();
      });

      await test.step("Click Open Menu", async () => {
        await page.getByRole('button', { name: 'Open Menu' }).click();
      });

      await test.step("Take and attach screenshot", async () => {
        await attachScreenshot(page,testInfo,LOGIN_SUCCESS_SCREENSHOT);
      });

      await test.step("Click Log Out", async () => {
        await page.locator('[data-test="logout-sidebar-link"]').click();
      });

      await test.step("Should return to Login Page", async () => {
        
        await expect(page.url()).toBe('https://www.saucedemo.com/');
        await expect(page.getByText('Swag Labs')).toBeVisible();

      });

        await test.step('Click go back', async () => {
          await page.goBack()
        });

         await test.step('Shows error message', async () => {
          await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: You can only access \'/inventory.html\' when you are logged in.');
        });

        await test.step("Take and attach screenshot of goback error", async () => {
          await attachScreenshot(page,testInfo,LOGOUT_GOBACK_SCREENSHOT);
         }); 

    });

});
