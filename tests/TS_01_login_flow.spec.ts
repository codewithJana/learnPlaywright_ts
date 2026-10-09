import { test, expect } from "@playwright/test";

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
        await page.getByPlaceholder('Enter username').fill("standard_user");
        const passwordField = page.getByPlaceholder('Enter password');
        passwordField.fill('bank_sauce');

        //verify username & password entered 
        await expect(page.getByPlaceholder('Enter username')).toHaveValue("standard_user");
        await expect(passwordField).toHaveValue("bank_sauce");

        //click login and verify the URL navigated
        await page.getByRole('button', {name: 'Sign In'}).click();
        await expect(page).toHaveURL("https://qaplayground.com/bank/dashboard");

        //verify welcome header is visible on the dashboard page : /i--> make the regex case-insensitive
        const welcomeHeader = page.getByText(/Welcome back/i);
        await expect(welcomeHeader).toBeVisible();
    })

    //login with invalid credentials and verify the error message
    //Login with locked account and verify the account restriction
    //try the successful login flow with css or XPATH


})