import {Locator, Page} from "@playwright/test";

export class LoginPagePOM {
    readonly userName: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;

    // Locators
    constructor(private page: Page) {
        this.userName = page.getByRole('textbox', {name: 'Username'});
        this.password = page.getByRole('textbox', {name: 'Password'});
        this.loginButton = page.getByRole('button', {name: 'Login'});
    }

    // Dynamic Locators
    readonly errorMsg = (message: string) => this.page.getByText(message);

    // Action method
    enterUserName = async (name: string) => await this.userName.fill(name);
    enterPassword = async (password: string) => await this.password.fill(password);
    clickLoginButton = async () => await this.loginButton.click();

}