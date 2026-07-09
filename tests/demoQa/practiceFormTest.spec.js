import { test } from "@playwright/test";
import { PracticeFormPOM } from "../../POM/demoQa/PracticeFormPOM.spec";

test('fill the form', async ({ page }) => {

    // Navigate to site
    await page.goto('https://demoqa.com/automation-practice-form');

    // Initialize POM
    const practiceForm = new PracticeFormPOM(page);

    // Actions
    await practiceForm.enterFirstName('John');
    await practiceForm.enterLastName('Doe');
    await practiceForm.enterEmail('johndoe@example.com');
    await practiceForm.selectGender('Male');
    await practiceForm.enterMobileNumber('1234567890');
    await practiceForm.enterDOB('20 Nov 2000');
    await practiceForm.enterSubject('Maths');
    await practiceForm.selectHobbies('Sports');
    await practiceForm.enterCurrentAddress('123 Main St, Anytown, USA');
    await practiceForm.selectState('NCR');
    await practiceForm.selectCity('Delhi');
    await practiceForm.clickOnSubmitBtn();

    await page.pause();
});