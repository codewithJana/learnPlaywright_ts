import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { DashboardPage } from '../../pages/DashboardPage';



test('verify Login', async ({ page }) => {
  // await page.goto('https://qaplayground.com/bank/login');
  // await page.getByTestId('login-username-input').click();
  // await page.getByTestId('login-username-input').fill('standard_user');
  // await page.getByTestId('login-username-input').press('Tab');
  // await page.getByTestId('login-password-input').fill('bank_sauce');
  // await page.getByTestId('login-submit-btn').click();
  // await expect(page.getByTestId('sidebar-user-info')).toContainText('standard_user');
  // await page.getByTestId('topbar-logout-btn').click();
  // await expect(page.getByTestId('login-submit-btn')).toBeVisible();

  //create login object
  const loginpage = new LoginPage(page);
  const dashboardpage = new DashboardPage(page);

  await loginpage.navigate();
  await loginpage.loginApplication("standard_user","bank_sauce");
  // const resut =await dashboardpage.isUserTextVisible();
  // expect(resut).toBe(true);
  await expect(dashboardpage.userText).toBeVisible();

});