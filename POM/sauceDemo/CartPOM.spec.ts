import {expect, Locator, Page} from "@playwright/test";

export class CartPagePOM {
    readonly cartTitle: Locator;
    readonly continueShoppingBtn: Locator;
    readonly checkoutBtn: Locator;

    // Locators
    constructor(private page: Page) {
        this.cartTitle = page.getByText('Your Cart');
        this.continueShoppingBtn = page.getByRole('button', {name: 'Go back Continue Shopping'});
        this.checkoutBtn = page.getByRole('button', {name: 'Checkout'});
    }

    // Dynamic Locators
    readonly cartItem = async (itemName: string) => this.page.getByText(itemName, {exact: true});
    readonly removeItemBtn = async (itemName: string) => this.page.locator(`//div[text() = '${itemName}']/ancestor::div[@class = 'cart_item_label']//button[text() = 'Remove']`);

    // Action Methods
    verifyCartTitle = async () => expect(this.cartTitle).toBeVisible();
    clickOnContinueShoppingBtn = async () => await this.continueShoppingBtn.click();
    clickOnCheckoutBtn = async () => await this.checkoutBtn.click();
    clickOnRemoveItemBtn = async (itemName: string) => (await this.removeItemBtn(itemName)).click();
    verifyCartItems = async (itemName: string) => expect(await this.cartItem(itemName)).toBeVisible();
    verifyRemovedItems = async (itemName: string) => expect(await this.cartItem(itemName)).not.toBeVisible();
}