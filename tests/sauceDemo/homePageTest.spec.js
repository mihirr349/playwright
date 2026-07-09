import {test, expect} from '@playwright/test';
import {LoginPagePOM} from '../../POM/sauceDemo/LoginPOM.spec';
import HomePagePOM from '../../POM/sauceDemo/HomePOM.spec';
import {loginWithValidUser} from '../../DataFactory/sauceDemo/loginData.factory';

async function loginToApplication(page) {

    // Initialize POM
    const loginPage = new LoginPagePOM(page);
    const homePage = new HomePagePOM(page);

    const formData = loginWithValidUser()[0];

    await page.goto('https://www.saucedemo.com/');

    await loginPage.enterUserName(formData.userName);
    await loginPage.enterPassword(formData.password);

    await loginPage.clickLoginButton();

    await expect(homePage.productTitle).toBeVisible();
}

test('add to cart product', async ({page}) => {

    await loginToApplication(page);

    // Initialize POM
    const homePage = new HomePagePOM(page);

    // Products to add
    const products = [
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt'
    ];

    for (const product of products) {
        await homePage.clickOnAddToCartBtn(product);
    }
})

test('Filter products by price low to high', async ({page}) => {

    await loginToApplication(page);

    // Initialize POM
    const homePage = new HomePagePOM(page);

    await homePage.filterProductsByValue('lohi');
})

test('logout user', async ({page}) => {

    await loginToApplication(page);

    // Initialize POM
    const homePage = new HomePagePOM(page);

    await homePage.clickOnMenuIcon();
    await homePage.clickOnLogoutLink();
})