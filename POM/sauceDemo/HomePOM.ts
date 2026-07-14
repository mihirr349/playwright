import {expect, Locator, Page} from "@playwright/test";

export class HomePagePOM {

    // Locators
    readonly productTitle: Locator;
    readonly filterProduct: Locator;
    readonly cartLogo: Locator;
    readonly menuIcon: Locator;
    readonly logoutLink: Locator;

    constructor(private page: Page) {
        this.productTitle = this.page.getByText('Products');
        this.filterProduct = this.page.getByRole('combobox');
        this.cartLogo = this.page.locator("//a[@class = 'shopping_cart_link']");
        this.menuIcon = this.page.getByRole('button', {name: 'Open Menu'});
        this.logoutLink = this.page.getByRole('link', {name: 'Logout'});
    }

    // Dynamic Locators
    readonly addToCartBtn = (product: string) => this.page.locator(`//div[text() = '${product}']/ancestor::div[@class = 'inventory_item_description']//button[text() = 'Add to cart']`);

    // Action Methods
    verifyProductTitle = () => expect(this.productTitle).toBeVisible();

    filterProductsByValue = async (value: string) => await this.filterProduct.selectOption(value);

    clickOnMenuIcon = async () => await this.menuIcon.click();

    clickOnLogoutLink = async () => await this.logoutLink.click();

    clickOnAddToCartBtn = async (product: string) => await this.addToCartBtn(product).click();

    clickOnCartLogo = async () => await this.cartLogo.click();
}