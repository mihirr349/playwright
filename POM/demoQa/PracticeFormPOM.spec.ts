import { Locator, Page } from "@playwright/test";

export class PracticeFormPOM {
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly emailInput: Locator;
    readonly mobileNumber: Locator;
    readonly dobInput: Locator;
    readonly subjectsInput: Locator;
    readonly picture: Locator;
    readonly currentAddressInput: Locator;
    readonly stateDropdown: Locator;
    readonly cityDropdown: Locator;
    readonly submitBtn: Locator;

    // Locators
    constructor(private page: Page) {
        this.firstName = page.getByRole('textbox', { name: 'First Name' });
        this.lastName = page.getByRole('textbox', { name: 'Last Name' });
        this.emailInput = page.getByRole('textbox', { name: 'name@example.com' });
        this.mobileNumber = page.getByRole('textbox', { name: 'Mobile Number' });
        this.dobInput = page.locator('#dateOfBirthInput');
        this.subjectsInput = page.locator('#subjectsInput');
        this.picture = page.getByRole('button', { name: 'Choose File' });
        this.currentAddressInput = page.getByRole('textbox', { name: 'Current Address' });
        this.stateDropdown = page.locator("//div[@id = 'state']//input[@id = 'react-select-3-input']/parent::div");
        this.cityDropdown = page.locator("//div[@id = 'city']//input[@id = 'react-select-4-input']/parent::div");
        this.submitBtn = page.getByRole('button', { name: 'Submit' });
    }

    // Dynamic Locators
    readonly genderRadioBtn = (gender: string) => this.page.getByRole('radio', { name: gender, exact: true });
    readonly hobbiesCheckbox = (hobby: string) => this.page.getByRole('checkbox', { name: hobby });
    readonly stateOption = (state: string) => this.page.getByRole('option', { name: state });
    readonly cityOption = (city: string) => this.page.getByRole('option', { name: city });

    // Actions
    enterFirstName = async (firstName: string) => await this.firstName.fill(firstName);
    enterLastName = async (lastName: string) => await this.lastName.fill(lastName);
    enterEmail = async (email: string) => await this.emailInput.fill(email);
    selectGender = async (gender: string) => await this.genderRadioBtn(gender).check();
    enterMobileNumber = async (number: string) => await this.mobileNumber.fill(number);
    enterDOB = async (dob: string) => {
        await this.dobInput.evaluate((el: HTMLInputElement, val) => {
            el.value = val;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
        }, dob);
    };

    enterSubject = async (subject: string) => {
        await this.subjectsInput.fill(subject);
        await this.subjectsInput.press('Enter');
    };
    selectHobbies = async (hobby: string) => await this.hobbiesCheckbox(hobby).click();
    uploadPicture = async (filePath: string) => await this.picture.setInputFiles(filePath);
    enterCurrentAddress = async (address: string) => await this.currentAddressInput.fill(address);

    selectState = async (state: string) => {
        await this.stateDropdown.click();
        await this.stateOption(state).click();
    };

    selectCity = async (city: string) => {
        await this.cityDropdown.click();
        await this.cityOption(city).click();
    };

    clickOnSubmitBtn = async () => await this.submitBtn.click();
}