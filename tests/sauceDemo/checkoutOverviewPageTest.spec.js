import {test} from "@playwright/test";
import {HomePagePOM} from "../../POM/sauceDemo/HomePOM";
import {validProduct} from "../../DataFactory/sauceDemo/productData.factory";
import {CartPagePOM} from "../../POM/sauceDemo/CartPOM";
import {checkoutData} from "../../DataFactory/sauceDemo/checkoutData.factory";
import {CheckoutPOM} from "../../POM/sauceDemo/CheckoutPOM";
import {CheckoutOverviewPOM} from "../../POM/sauceDemo/CheckoutOverviewPOM";

async function navigateToCheckoutOverviewPage(page) {

    await page.goto('https://www.saucedemo.com/inventory.html');

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

test('verify to click on Cancel button', async ({page}) => {

    // login to application and navigate to checkout overview page
    await navigateToCheckoutOverviewPage(page);

    // initiate POM
    const homePage = new HomePagePOM(page);
    const checkoutOverviewPage = new CheckoutOverviewPOM(page);

    await checkoutOverviewPage.verifyOverviewTitle();

    // get product data from data factory
    const products = validProduct().addToCartProducts;

    for (const product of products) {
        await checkoutOverviewPage.verifyProduct(product);
    }

    await checkoutOverviewPage.clickOnCancelBtn();
    await homePage.verifyProductTitle();
})

test('verify to click on Finish button', async ({page}) => {

    // login to application and navigate to checkout overview page
    await navigateToCheckoutOverviewPage(page);

    // initiate POM
    const checkoutOverviewPage = new CheckoutOverviewPOM(page);

    await checkoutOverviewPage.verifyOverviewTitle();

    // get product data from data factory
    const products = validProduct().addToCartProducts;

    for (const product of products) {
        await checkoutOverviewPage.verifyProduct(product);
    }

    await checkoutOverviewPage.clickOnFinishBtn();

    await checkoutOverviewPage.verifyCheckoutCompleteTitle();
})

test('verify to click on Back Home button', async ({page}) => {

    // login to application and navigate to checkout overview page
    await navigateToCheckoutOverviewPage(page);

    // initiate POM
    const homePage = new HomePagePOM(page);
    const checkoutOverviewPage = new CheckoutOverviewPOM(page);

    await checkoutOverviewPage.verifyOverviewTitle();

    // get product data from data factory
    const products = validProduct().addToCartProducts;

    for (const product of products) {
        await checkoutOverviewPage.verifyProduct(product);
    }

    await checkoutOverviewPage.clickOnFinishBtn();
    await checkoutOverviewPage.verifyCheckoutCompleteTitle();
    await checkoutOverviewPage.clickOnBackHomeBtn();
    await homePage.verifyProductTitle();
})