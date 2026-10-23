import { Page, Locator } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    readonly userText: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userText = page.getByTestId('sidebar-user-info');
    }

    async isUserTextVisible() {
        return await this.userText.isVisible();
    }

}