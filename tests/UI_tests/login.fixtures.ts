import { test as base , expect, type Page } from "@playwright/test";
import { TEST_USERS, ACCOUNTS } from "../../resources/testData";

type BankFixture = {
    loggedInPage: Page;
    InternalTranfer: Page;
};

export const test = base.extend<BankFixture>({
    loggedInPage: async ({ page }, use) => {
        //launch application and enter user credentials
        await page.goto(TEST_USERS.URLS.login_url, { waitUntil: 'load' });
        await page.getByPlaceholder('Enter username').fill(TEST_USERS.STANDARD.username);
        await page.getByPlaceholder('Enter password').fill(TEST_USERS.STANDARD.password);
        //click login and verify the URL navigated
        await page.getByRole('button', { name: 'Sign In' }).click();
        await expect(page).toHaveURL(TEST_USERS.URLS.dashboard_url);
        await use(page); //The page is ready, give it to test now!
    }
});

export { expect }