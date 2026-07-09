import {test} from "@playwright/test";
import {PracticeFormPOM} from "../../POM/demoQa/PracticeFormPOM.spec";
import {validUser} from "../../DataFactory/demoQa/practiceForm.factory";

test('fill the form', async ({page}) => {

    // Navigate to site
    await page.goto('https://demoqa.com/automation-practice-form');

    // Initialize POM
    const practiceForm = new PracticeFormPOM(page);

    // Data Factory
    const user = validUser()[0];

    // Actions
    await practiceForm.enterFirstName(user.firstName);
    await practiceForm.enterLastName(user.lastName);
    await practiceForm.enterEmail(user.email);
    await practiceForm.selectGender(user.gender);
    await practiceForm.enterMobileNumber(user.mobileNumber);
    await practiceForm.enterDOB(user.dob);
    await practiceForm.enterSubject(...user.subjects);
    await practiceForm.selectHobbies(...user.hobbies);
    await practiceForm.enterCurrentAddress(user.currentAddress);
    await practiceForm.selectState(user.state);
    await practiceForm.selectCity(user.city);
    await practiceForm.clickOnSubmitBtn();
});