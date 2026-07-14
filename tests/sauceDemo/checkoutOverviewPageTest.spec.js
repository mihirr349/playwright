import {test} from "@playwright/test";
import {LoginPagePOM} from "../../POM/sauceDemo/LoginPOM";
import {loginWithValidUser} from "../../DataFactory/sauceDemo/loginData.factory";
import {HomePagePOM} from "../../POM/sauceDemo/HomePOM";
import {validProduct} from "../../DataFactory/sauceDemo/productData.factory";
import {CartPagePOM} from "../../POM/sauceDemo/CartPOM";
import {checkoutData} from "../../DataFactory/sauceDemo/checkoutData.factory";
import {CheckoutPOM} from "../../POM/sauceDemo/CheckoutPOM";
import {CheckoutOverviewPOM} from "../../POM/sauceDemo/CheckoutOverviewPOM";

async function loginToApplication(page) {

    // Navigate to URL
    await page.goto('https://www.saucedemo.com/');

    // Initiate POM
    const loginPage = new LoginPagePOM(page);

    // get data from data factory
    const user = loginWithValidUser();

    // login
    await loginPage.enterUserName(user.userName);
    await loginPage.enterPassword(user.password);
    await loginPage.clickLoginButton();
}

async function navigateToCheckoutOverviewPage(page) {

    // Initiate POM
    const homePage = new HomePagePOM(page);
    const cartPage = new CartPagePOM(page);
    const checkoutPage = new CheckoutPOM(page);

    // get product data from data factory
    const products = validProduct().addToCartProducts;

    for (const product of products) {
        await homePage.clickOnAddToCartBtn(product);
    }

    await homePage.clickOnCartLogo();

    await cartPage.verifyCartTitle();

    await cartPage.clickOnCheckoutBtn();

    // get checkout data from data factory
    const user = checkoutData();

    // fill the data
    await checkoutPage.enterFirstName(user.fistName);
    await checkoutPage.enterLastName(user.lastName);
    await checkoutPage.enterZipCode(user.zipCode);

    await checkoutPage.clickOnContinueBtn();
}

test('verify products', async ({page}) => {

    // login to application and navigate to checkout overview page
    await loginToApplication(page);
    await navigateToCheckoutOverviewPage(page);

    // initiate POM
    const checkoutOverviewPage = new CheckoutOverviewPOM(page);

    await checkoutOverviewPage.verifyOverviewTitle();

    // get product data from data factory
    const products = validProduct().addToCartProducts;

    for (const product of products) {
        await checkoutOverviewPage.verifyProduct(product);
    }
})