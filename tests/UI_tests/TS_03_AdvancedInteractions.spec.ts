import { test, expect, Page } from '@playwright/test'
import { TEST_USERS,ACCOUNTS } from "../../resources/testData";


async function loginStandardUser(page: Page, rememberMe: boolean = false): Promise<void> {
    await page.goto(TEST_USERS.URLS.login_url, { waitUntil: 'load' });
    //if already logged-in
    if (page.url().includes('/bank/dashboard')) {
        return;
    }
    //handle the remember me checkbox
    if (rememberMe) {
        const rememberMeCheckBox = page.getByTestId('login-remember-me-checkbox');
        await rememberMeCheckBox.click();
        await expect(rememberMeCheckBox).toHaveAttribute('aria-checked', 'true');
        await page.waitForTimeout(2000);
    }
    //Enter username and password
    await page.getByPlaceholder('Enter username').fill(TEST_USERS.STANDARD.username);
    await page.getByPlaceholder('Enter password').fill(TEST_USERS.STANDARD.password);
    //click login and verify the URL navigated
    await page.getByRole('button', { name: 'Sign In' }).click();
    
}

test("TC:07 Verify Account Transfer", async ({ page }) => {
    //login and Navigate to transfer page
    await loginStandardUser(page, true);
    await page.waitForTimeout(3000);
    await page.getByRole('link', { name: 'Transfer', exact: true }).click();
    await expect(page).toHaveURL(/.*\/bank\/transfer/) 
    //select from account
    const fromDropdown = page.getByTestId('transfer-from-select');
    await expect(fromDropdown).toBeVisible();
    await fromDropdown.click();
    const checkingOption = page.getByTestId('transfer-from-option').filter({hasText: ACCOUNTS.CHECKING}).first();
    await expect(checkingOption).toBeVisible();
    await checkingOption.click()
    //verify checking is selected
    await expect(fromDropdown).toContainText(/checking/i);
    await page.waitForTimeout(5000)

})


/*
    "https://qaplayground.com/bank/transfer"
    /.*\/bank\/transfer/
*/