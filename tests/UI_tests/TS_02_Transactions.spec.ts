import { test, expect } from "@playwright/test";
import { TEST_USERS } from "../../resources/testData";

test.describe("Module1: SecureBank-loginflow", () =>{

    test.beforeEach(async ({page}) =>{
        await page.goto(TEST_USERS.URLS.login_url);
        await page.waitForLoadState('load');
         //Enter username and password
        await page.getByPlaceholder('Enter username').fill(TEST_USERS.STANDARD.username);
        await page.getByPlaceholder('Enter password').fill(TEST_USERS.STANDARD.password);
        //click login and verify the URL navigated
        await page.getByRole('button', {name: 'Sign In'}).click();
        await expect(page).toHaveURL(TEST_USERS.URLS.dashboard_url);
    } )

    test.afterEach(async ({page}) =>{
        await page.close();
    })

    test("TC-06: Verify Transactions in Dashboard page", async ({page})=>{
        //verify Transaction table exists
        const Transaction_table = page.locator('table');
        await expect(Transaction_table).toBeVisible;
        //get the table row count
        const tableRows = Transaction_table.locator('tbody tr');
        const rowCount = await tableRows.count();
        console.log("Visible Row count: " + rowCount);
        //verify minimun one transation exists
        expect(rowCount).toBeGreaterThan(0);

        //filter the description and match my expense
        const cityElectric_row = tableRows.filter({hasText: 'City Electric Co.'});
        //verify the specific row and validate the row data
        await expect(cityElectric_row).toBeVisible();
        await expect(cityElectric_row).toContainText('Utilities');
        await expect(cityElectric_row).toContainText('-$124.50');  
        

    })

})    