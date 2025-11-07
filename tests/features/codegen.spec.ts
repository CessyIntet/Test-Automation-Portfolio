import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="login-password"]').click();
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="username"]').press('Tab');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.getByRole('button', { name: 'Open Menu' })).toBeVisible();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await expect(page.locator('[data-test="about-sidebar-link"]')).toBeVisible();
  await expect(page.locator('[data-test="inventory-sidebar-link"]')).toBeVisible();
  await expect(page.locator('[data-test="logout-sidebar-link"]')).toBeVisible();
  await expect(page.locator('[data-test="reset-sidebar-link"]')).toBeVisible();
  await page.locator('[data-test="inventory-sidebar-link"]').click();
  await page.locator('[data-test="inventory-sidebar-link"]').click();
  await page.getByRole('button', { name: 'Close Menu' }).click();
  await expect(page.locator('[data-test="footer-copy"]')).toBeVisible();
  await expect(page.locator('[data-test="social-twitter"]')).toBeVisible();
  await expect(page.locator('[data-test="social-facebook"]')).toBeVisible();
  await expect(page.locator('[data-test="social-linkedin"]')).toBeVisible();
  await expect(page.getByText('Swag Labs')).toBeVisible();
  await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();
  await expect(page.locator('[data-test="product-sort-container"]')).toBeVisible();
  await expect(page.locator('[data-test="title"]')).toBeVisible();
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
  await expect(page.locator('[data-test="footer"]')).toMatchAriaSnapshot(`
    - contentinfo:
      - list:
        - listitem:
          - link "Twitter":
            - /url: https://twitter.com/saucelabs
        - listitem:
          - link "Facebook":
            - /url: https://www.facebook.com/saucelabs
        - listitem:
          - link "LinkedIn":
            - /url: https://www.linkedin.com/company/sauce-labs/
      - text: /© \\d+ Sauce Labs\\. All Rights Reserved\\. Terms of Service \\| Privacy Policy/
    `);
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