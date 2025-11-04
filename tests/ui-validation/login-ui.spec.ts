import { test, expect } from '../../shared/base';
import { attachScreenshot } from '../../shared/helpers.ts';

const LOGIN_PAGE_SCREENSHOT = 'login-page-screenshot.png';


test.describe('Login Page UI-Level Tests', { tag: [ "@HappyPath"] }, () => {


    //    test('Should successfully log in with valid credentials', {tag: "@Smoke"}, async ({ LoginPage, page }, testInfo) => {

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