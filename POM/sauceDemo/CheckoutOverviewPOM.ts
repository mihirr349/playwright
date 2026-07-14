import {expect, Locator, Page} from "@playwright/test";

export class CheckoutOverviewPOM {
    readonly overviewTitle: Locator;
    readonly cancelBtn: Locator;
    readonly finishBtn: Locator;

    // Locators
    constructor(private page: Page) {
        this.overviewTitle = page.getByText('Checkout: Overview');
        this.cancelBtn = page.getByRole('button', {name: 'Go back Cancel'});
        this.finishBtn = page.getByRole('button', {name: 'Finish'});
    }

    // Dynamic locators
    readonly product = async (productName: string) => this.page.getByText(productName, {exact: true});

    // Action methods
    verifyOverviewTitle = () => expect(this.overviewTitle).toBeVisible();
    verifyProduct = async (productName: string) => expect(await this.product(productName)).toBeVisible();
    clickOnCancelBtn = () => this.cancelBtn.click();
    clickOnFinishBtn = () => this.finishBtn.click();
}