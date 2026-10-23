import { test, expect } from './login.fixtures';
import { TEST_USERS, ACCOUNTS } from "../../resources/testData";

test("fixture demo", async({loggedInPage})=>{
    //login application with standard user

    //verify the login by checking the standard user visibility in dashboard page
    await expect(loggedInPage).toHaveURL(TEST_USERS.URLS.dashboard_url);
    await expect(loggedInPage.getByText('standard_user', {exact: true})).toBeVisible();
})