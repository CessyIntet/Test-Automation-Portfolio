
import { test, expect } from '../../shared/base';
import { attachScreenshot } from '../../shared/helpers.ts';

const LOGIN_SUCCESS_SCREENSHOT = 'login-success-screenshot.png';
const LOGIN_FAILURE_SCREENSHOT = 'login-failure-screenshot.png';
const LOGIN_ERROR_MESSAGE = 
  'Epic sadface: Username and password do not match any user in this service';
const LOGIN_MISSING_PASSWORD = 
  'Epic sadface: Password is required';

 test.describe('Login Test Suite', { tag: [ '@Regression-Testing', '@Smoke-Testing', "@Sprint-1"] }, () => {
  test.beforeEach(async ({ LoginPage }) => {
    await LoginPage.navigateTo();
    });
  


    test('Should Successfully login - POM Modular', async ({ LoginPage, page }, testInfo) => {
      await test.step('Input Username', async () => {
        await LoginPage.InputUsername(process.env.SAUCEDEMO_USERNAME!);
      });
      await test.step('Input Password', async () => {
        await LoginPage.InputPassword(process.env.SAUCEDEMO_PASSWORD!);
      });
      await test.step('Click Login Button', async () => {
        await LoginPage.ClickLoginButton();
      });
      await test.step('Verify visibility & text Swag Labs', async () => {
        await expect(page.getByText('Swag Labs')).toBeVisible();
      });
      await test.step('Attach screenshot of successful login', async () => {
        await attachScreenshot(
          LoginPage.page,testInfo,LOGIN_SUCCESS_SCREENSHOT,
        );    
      });
    });


    test("should unsuccessfully login with invalid credentials", {tag: "@Negative-Testing"}, async ({ page, LoginPage }, testInfo) => {
      await test.step("Login with invalid credentials", async () => {
        await LoginPage.login('invalid_user', 'invalid_password');
      });
      
      await test.step("Verify  visibility of login error message", async () => {
        await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
      });

      await test.step("Take and attach screenshot of error", async () => {
        await attachScreenshot(
          page,
          testInfo,
          LOGIN_FAILURE_SCREENSHOT
          );
      });
    });

      test("Failed login due to missing password-Should show error message", {tag: "@Negative-Testing"}, async ({ page, LoginPage }, testInfo) => {
      
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

    test("Verifies successful logout after a valid login", {tag: "@HappyPath"}, async ({ page, LoginPage }, testInfo) => {
      await test.step("Login with valid credentials", async () => {
        await LoginPage.login(process.env.SAUCEDEMO_USERNAME!, process.env.SAUCEDEMO_PASSWORD!);
      });
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
        await attachScreenshot(page,testInfo,LOGIN_SUCCESS_SCREENSHOT
        );
      });
    });

    
    test("User cannot go back once logged out", {tag: "@HappyPath"}, async ({ page, LoginPage }, testInfo) => {
      await test.step("Login with valid credentials", async () => {
        await LoginPage.login(process.env.SAUCEDEMO_USERNAME!, process.env.SAUCEDEMO_PASSWORD!);
      });
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

      await test.step("Take and attach screenshot", async () => {
        await attachScreenshot(page,testInfo,LOGIN_SUCCESS_SCREENSHOT);
      });
    });
    
});


//  await expect(page.getByText('Swag Labs')).toBeVisible();
//    await expect(page.locator('[data-test="error"]')).toBeVisible();
//    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
//    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: Password is required');

// go back
//    await expect(page.locator('[data-test="error"]')).toContainText('Epic sadface: You can only access \'/inventory.html\' when you are logged in.');
// });

//log out and back

// testInfo.annotations.push({
//           type: 'bug',
//           description: 'URL is http://localhost:5173/dashboard after logout',
//           });