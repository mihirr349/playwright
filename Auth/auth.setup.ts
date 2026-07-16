import { test as setup, expect } from '@playwright/test';
import { LoginPagePOM } from '../POM/sauceDemo/LoginPOM';
import { HomePagePOM } from '../POM/sauceDemo/HomePOM';
import { loginWithValidUser } from '../DataFactory/sauceDemo/loginData.factory';
import { getAuthFilePath } from "../utility/FilePathHelper";

setup('authenticate', async ({ page }) => {
    // Initialize POM
    const loginPage = new LoginPagePOM(page);
    const homePage = new HomePagePOM(page);

    const formData = loginWithValidUser();

    await page.goto('https://www.saucedemo.com/');

    await loginPage.enterUserName(formData.userName);
    await loginPage.enterPassword(formData.password);

    await loginPage.clickLoginButton();

    await expect(homePage.productTitle).toBeVisible();

    await page.context().storageState({
        path: getAuthFilePath('user')
    });
});