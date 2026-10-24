import { test, expect } from '@playwright/test'

/*

test("SaudeDemo: verify page title", async({page}) => {

    await page.goto("https://www.saucedemo.com/");
    await expect(page).toHaveTitle("Swag Labs");
});

test("SaudeDemo: verify current page URL", async({page}) => {

    await page.goto("https://www.saucedemo.com/");
    await expect(page).toHaveURL("https://www.saucedemo.com/");
});
*/

test.describe("SauceDemo: Login Tests",{tag: '@ui , @login'} ,() => {

    test("SaudeDemo: verify page title", async ({ page }) => {

        await page.goto("https://www.saucedemo.com/");
        await expect(page).toHaveTitle("Swag Labs");
    });

    test("SaudeDemo: verify current page URL", async ({ page }) => {

        await page.goto("https://www.saucedemo.com/");
        await expect(page).toHaveURL("https://www.saucedemo.com/");
    });

    test("SaudeDemo: Login Application using CSS", async ({ page }) => {

        await page.goto("https://www.saucedemo.com/");
        await page.locator("#user-name").fill("standard_user");
        await page.locator("#password").fill("secret_sauce");
        await page.locator("#login-button").click();
        await page.waitForTimeout(5000);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    });

    test("SaudeDemo: Login Application using getByRole", async ({ page }) => {

        await page.goto("https://www.saucedemo.com/");
        await page.getByRole('textbox',{name: 'Username'}).fill('standard_user');
        await page.getByRole('textbox',{name: 'Password'}).fill('secret_sauce');
        await page.getByRole('button', {name: 'Login'}).click();
        await page.waitForTimeout(5000);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");

    });

    test("SaudeDemo: Login Application using getByPlaceholder", async ({ page }) => {

        await page.goto("https://www.saucedemo.com/");
        await page.getByPlaceholder("Username").fill('standard_user');
        await page.getByRole('textbox',{name: 'Password'}).fill('secret_sauce');
        await page.getByRole('button', {name: 'Login'}).click();
        await page.waitForTimeout(5000);
        await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");       

    });

    test("checkbox selection", async({ page })=> {
        await page.goto('https://the-internet.herokuapp.com/login');
        await page.getByLabel('Username').fill('tomsmith');
        await page.getByLabel('Password').fill('SuperSecretPassword!');
        await page.waitForTimeout(3000);
        await page.getByLabel('Password').press('Enter');

    })



})