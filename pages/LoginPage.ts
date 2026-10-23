import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.getByTestId('login-username-input');
        this.passwordField = page.getByTestId('login-password-input');
        this.loginButton = page.getByTestId('login-submit-btn');
    }

    async navigate() {
        await this.page.goto('https://qaplayground.com/bank/login');
    }

    async enterUsername(username: string) {
        await this.usernameField.fill(username);
    }

    async enterPassword(password: string) {
        await this.passwordField.fill(password);
    }

    async clickLogin() {
        await this.loginButton.click();
    }

    async loginApplication(username: string, password: string){
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }



}