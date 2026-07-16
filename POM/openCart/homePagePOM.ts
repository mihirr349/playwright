import {Locator, Page} from "@playwright/test";

export class HomePagePOM {
    readonly searchInput: Locator;
    readonly searchBtn: Locator;
    readonly currencyDropdown: Locator;
    readonly myAccountDropdown: Locator;
    readonly registerLink: Locator;
    readonly loginLink: Locator;
    readonly wishListLink: Locator;
    readonly shoppingCartLink: Locator;
    readonly checkoutLink: Locator;
    readonly cartBtn: Locator;

    // Locators
    constructor(private page: Page) {
        this.searchInput = page.getByRole('textbox', {name: 'Search'});
        this.searchBtn = page.locator(`//div[@id = 'search']//button`);
        this.currencyDropdown = page.locator(`//div[@class = 'btn-group']/button`)
        this.myAccountDropdown = page.getByText('My Account');
        this.registerLink = page.getByRole('link', {name: 'Register'});
        this.loginLink = page.getByRole('link', {name: 'Login'});
        this.wishListLink = page.locator(`//a[@id = 'wishlist-total']`);
        this.shoppingCartLink = page.getByRole('link', {name: 'Shopping Cart'});
        this.checkoutLink = page.getByRole('link', {name: 'Checkout'});
        this.cartBtn = page.locator(`//div[@id = 'cart']/button`);
    }

    // Dynamic Locators
    readonly currencyOption = (currency: string) => this.page.locator(`//button[contains(text(), '${currency}')]`);

    // Action methods
    async searchProduct(product: string) {
        await this.searchInput.fill(product);
        await this.searchBtn.click();
    }

    async selectCurrency(currency: string) {
        await this.currencyDropdown.click();
        await this.currencyOption(currency).click();
    }

    async clickOnRegisterLink() {
        await this.myAccountDropdown.click();
        await this.registerLink.click();
    }

    async clickOnLoginLink() {
        await this.myAccountDropdown.click();
        await this.loginLink.click();
    }

    clickOnShoppingCartLink = () => this.shoppingCartLink.click();
}