import {expect, Locator, Page} from "@playwright/test";

export class CheckoutPOM {
    readonly checkoutTitle: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator
    readonly zipCodeInput: Locator;
    readonly cancelBtn: Locator;
    readonly continueBtn: Locator;

    constructor(private page: Page) {
        this.checkoutTitle = page.getByText('Checkout: Your Information');
        this.firstNameInput = page.getByRole('textbox', {name: 'First Name'});
        this.lastNameInput = page.getByRole('textbox', {name: 'Last Name'});
        this.zipCodeInput = page.getByRole('textbox', {name: 'Zip/Postal Code'});
        this.cancelBtn = page.getByRole('button', {name: 'Go back Cancel'});
        this.continueBtn = page.getByRole('button', {name: 'Continue'});
    }

    // Dynamic locators
    readonly errorMsgBox = async (message: string) => this.page.getByRole('heading', {name: message, level: 3})

    // Action methods
    verifyCheckoutTitle = () => expect(this.checkoutTitle).toBeVisible();
    enterFirstName = async (firstName: string) => await this.firstNameInput.fill(firstName);
    enterLastName = async (lastName: string) => await this.lastNameInput.fill(lastName);
    enterZipCode = async (zipCode: string) => await this.zipCodeInput.fill(zipCode);
    verifyErrorMsg = async (message: string) => expect(await this.errorMsgBox(message)).toBeVisible();
    clickOnCancelBtn = () => this.cancelBtn.click();
    clickOnContinueBtn = () => this.continueBtn.click();
}