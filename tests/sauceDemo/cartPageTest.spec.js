import {test} from "playwright/test";
import {CartPagePOM} from "../../POM/sauceDemo/CartPOM.spec";
import {LoginPagePOM} from "../../POM/sauceDemo/LoginPOM.spec";
import {HomePagePOM} from "../../POM/sauceDemo/HomePOM.spec";
import {loginWithValidUser} from "../../DataFactory/sauceDemo/loginData.factory";

async function addProductsIntoCart(page) {

    // Initialize POM
    const loginPage = new LoginPagePOM(page);
    const homePage = new HomePagePOM(page);

    // Initialize Data Factory
    const loginData = loginWithValidUser()[0];

    // Redirect to URL
    await page.goto('https://www.saucedemo.com/');

    // login to Application
    await loginPage.enterUserName(loginData.userName);
    await loginPage.enterPassword(loginData.password);
    await loginPage.clickLoginButton();

    // Add products to cart
    const products = [
        'Sauce Labs Backpack',
        'Sauce Labs Bike Light',
        'Sauce Labs Bolt T-Shirt'
    ];

    for (const product of products) {
        await homePage.clickOnAddToCartBtn(product);
    }

    await homePage.clickOnCartLogo();
}

test('verify cart title', async ({page}) => {

    // Initialize POM
    const cartPages = new CartPagePOM(page);

    // login to application
    await addProductsIntoCart(page);

    await cartPages.verifyCartTitle();
});