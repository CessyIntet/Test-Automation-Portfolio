import { expect, Locator, Page } from '@playwright/test';
import { before } from 'node:test';

export class InventoryPage {

    //locators 
    //we're saying that these are locators that we will use in the tests 
    public readonly usernameInput: Locator;
    public readonly passwordInput: Locator;
    public readonly loginButton: Locator;
    public readonly swaglabsHeader: Locator;
    public readonly errorMessage: Locator;
    public readonly loginContainer: Locator;
    public readonly SauceLabsBackpackButton: Locator;
    public readonly shoppingCartLink: Locator;
    public readonly checkoutButton: Locator;
    public readonly firstNameInput: Locator;
    public readonly lastNameInput: Locator;
    public readonly postalCodeInput: Locator;
    public readonly finishButton: Locator;



    constructor(public readonly page: Page) {
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.swaglabsHeader = page.getByText('Swag Labs');
        this.errorMessage = page.locator('[data-test="error"]');
        this.loginContainer = page.getByText('Swag Labs');
        this.SauceLabsBackpackButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
        this.checkoutButton= page.locator('[data-test="checkout"]');
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.finishButton = page.locator('[data-test="finish"]');
    }
    //Method 1

    // Navigates to the login page
    async navigateTo(): Promise<void> {


        await this.page.goto('https://www.saucedemo.com/');
        await this.page.waitForLoadState('networkidle');
    }

    //Method 2
    /**
    * Performs login with given username and password
    * 
    * @param username - The username to log in with
    * @param password - The password to log in with
    */

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    /**
     * Verifies that the login was successful by checking the visibility of the Swag Labs header.
     */

    async verifyLoginSuccess(): Promise<void> {
        await this.page.addStyleTag({
            content: `
            *, *::before, *::after {
                transition: none !important;
                animation: none !important;
            }
        `
        });

        await expect(this.swaglabsHeader).toBeVisible();
        await expect(this.swaglabsHeader).toHaveText('Swag Labs');
    }
    
    /**
     * Verifies that the login error message is displayed and matches the expected text.
     * @param expectedErrorMessage - The expected error message text.
     */

    async verifyLoginError(expectedErrorMessage: string): Promise<void> {
        await expect(this.errorMessage).toBeVisible();
        await expect(this.errorMessage).toHaveText(expectedErrorMessage);
    }

    // Verifies that the login container is visible. NEW

    async verifyLogout(): Promise<void> {
        await this.page.addStyleTag({
            content: `
            *, *::before, *::after {
                transition: none !important;
                animation: none !important;
            }
        `
        });

        await expect(this.loginContainer).toBeVisible();
        await expect(this.loginContainer).toHaveText('Swag Labs');
    }


    /* Modular Package Object Model */
    async InputUsername(username: string): Promise<void> {
        await this.usernameInput.fill(username);
    }
    async InputPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    }
    async ClickLoginButton(): Promise<void> {
        await this.loginButton.click();
    }

    async AddtoCartSauceLabsBackpack(): Promise<void> {
        await this.SauceLabsBackpackButton.click();
    }

    async ClickShoppingCart(): Promise<void> {
        await this.shoppingCartLink.click();
    }

    async ClickCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }

    async inputCustomerDetails(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async ClickFinish(): Promise<void> {
        await this.finishButton.click();
    }


    
}