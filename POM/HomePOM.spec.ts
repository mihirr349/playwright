import { Locator, Page } from "@playwright/test";

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
        this.menuIcon = this.page.getByRole('button', { name: 'Open Menu' });
        this.logoutLink = this.page.getByRole('link', { name: 'Logout' });
    }

    // Dynamic Locators
    readonly addToCartBtn = (product: String) => this.page.locator(`//div[text() = '${product}']/ancestor::div[@class = 'inventory_item_description']//button[text() = 'Add to cart']`);

}