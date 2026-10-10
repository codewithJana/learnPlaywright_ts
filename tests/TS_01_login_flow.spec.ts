import { test, expect } from "@playwright/test";
import { TEST_USERS } from "../resources/testData";

test.describe("Module1: SecureBank-loginflow", () =>{

    test.beforeEach(async ({page}) =>{
        await page.goto("https://qaplayground.com/bank/login");
        await page.waitForLoadState('load');
    } )

    test.afterEach(async ({page}) =>{
        await page.close();
    })

    test("TC-01: Successful Login with standard users", async ({page})=>{
        //Enter username and password
        await page.getByPlaceholder('Enter username').fill(TEST_USERS.STANDARD.username);
        const passwordField = page.getByPlaceholder('Enter password');
        passwordField.fill(TEST_USERS.STANDARD.username);

        //verify username & password entered 
        await expect(page.getByPlaceholder('Enter username')).toHaveValue(TEST_USERS.STANDARD.username);
        await expect(passwordField).toHaveValue(TEST_USERS.STANDARD.username);

        //click login and verify the URL navigated
        await page.getByRole('button', {name: 'Sign In'}).click();
        await expect(page).toHaveURL("https://qaplayground.com/bank/dashboard");

        //verify welcome header is visible on the dashboard page : /i--> make the regex case-insensitive
        const welcomeHeader = page.getByText(/Welcome back/i);
        await expect(welcomeHeader).toBeVisible();
    })

     test('TC-02: Login Form Validation with Invalid Credentials', async ({ page }) => {
    // 1. Fill invalid username and password
    await page.getByPlaceholder('Enter username').fill("invalid_user");
    await page.getByPlaceholder('Enter password').fill("wrong_password");

    // 2. Click Sign In
    await page.getByRole('button', { name: 'Sign In' }).click();

    // 3. Assert error message is displayed using role="alert" or text locator
    const errorMessage = page.locator('[role="alert"], .text-red-500, .bg-red-50').first();
    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(/invalid|incorrect|failed/i);

    // 4. Assert page remains on the login page
    await expect(page).toHaveURL(/.*\/bank\/login/);
  });


  test('TC-03: Login using XPath and CSS Selectors', async ({ page }) => {
    // 1. Fill Username using XPath locator: //input[@id="login-username"]
    const usernameXpath = page.locator('//input[@id="login-username"]');
    await usernameXpath.fill("standard_user");
    await expect(usernameXpath).toHaveValue("standard_user");

    // 2. Fill Password using CSS locator: input#login-password
    const passwordCss = page.locator('input#login-password');
    await passwordCss.fill("bank_sauce");
    await expect(passwordCss).toHaveValue("bank_sauce");

    // 3. Click Submit Button using getByTestId locator: login-submit-btn
    await page.getByTestId('login-submit-btn').click();

    // 4. Assert Login Success
    await expect(page).toHaveURL(/.*\/bank\/dashboard/);
  });


  test('TC-04: Locked Account Login Validation', async ({ page }) => {
    // 1. Fill credentials for locked user
    await page.getByPlaceholder('Enter username').fill("locked_user");
    await page.getByPlaceholder('Enter password').fill("bank_sauce");
    await page.getByRole('button', { name: 'Sign In' }).click();

    // 2. Assert error alert container displays locked account notification
    const lockError = page.locator('div, p').filter({ hasText: /locked|disabled|contact support/i }).first();
    await expect(lockError).toBeVisible();
  });


})