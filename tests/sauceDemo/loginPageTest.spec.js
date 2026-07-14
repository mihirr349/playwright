import {test, expect} from '@playwright/test';
import {LoginPagePOM} from '../../POM/sauceDemo/LoginPOM';
import {HomePagePOM} from '../../POM/sauceDemo/HomePOM';
import {
    userNameMissing,
    invalidUserData,
    passwordMissing,
    loginWithValidUser
} from '../../DataFactory/sauceDemo/loginData.factory';

test('login with blank user', async ({page}) => {

    // Initialize POM
    const loginPage = new LoginPagePOM(page);

    await page.goto('https://www.saucedemo.com/');

    // Actions
    await loginPage.loginButton.click();

    // Assertions
    await expect(loginPage.errorMsg('Epic sadface: Username is required')).toBeVisible();
})

test('verify when userName is empty', async ({page}) => {

    // Initialize POM
    const loginPage = new LoginPagePOM(page);

    const formData = userNameMissing();

    await page.goto('https://www.saucedemo.com/');

    await loginPage.enterUserName(formData.userName);
    await loginPage.enterPassword(formData.password);

    await loginPage.clickLoginButton();

    await expect(loginPage.errorMsg(formData.errorMsg)).toBeVisible();
})

test('login invalid user', async ({page}) => {

    // Initialize POM
    const loginPage = new LoginPagePOM(page);

    const formData = invalidUserData();

    await page.goto('https://www.saucedemo.com/');

    await loginPage.enterUserName(formData.userName);
    await loginPage.enterPassword(formData.password);

    await loginPage.clickLoginButton();

    await expect(loginPage.errorMsg(formData.errorMsg)).toBeVisible();
})

test('Verify when password is empty', async ({page}) => {

    // Initialize POM
    const loginPage = new LoginPagePOM(page);

    const formData = passwordMissing();

    await page.goto('https://www.saucedemo.com/');

    await loginPage.enterUserName(formData.userName);
    await loginPage.enterPassword(formData.password);

    await loginPage.clickLoginButton();

    await expect(loginPage.errorMsg(formData.errorMsg)).toBeVisible();
})

test('Verify login with valid user', async ({page}) => {

    // Initialize POM
    const loginPage = new LoginPagePOM(page);
    const homePage = new HomePagePOM(page);

    const formData = loginWithValidUser();

    await page.goto('https://www.saucedemo.com/');

    await loginPage.enterUserName(formData.userName);
    await loginPage.enterPassword(formData.password);

    await loginPage.clickLoginButton();

    await expect(homePage.productTitle).toBeVisible();
})