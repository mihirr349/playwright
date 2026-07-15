import {test} from "@playwright/test";
import {LoginPagePOM} from "../../POM/sauceDemo/LoginPOM";
import {loginWithValidUser} from "../../DataFactory/sauceDemo/loginData.factory";
import {HomePagePOM} from "../../POM/sauceDemo/HomePOM";
import {validProduct} from "../../DataFactory/sauceDemo/productData.factory";
import {CartPagePOM} from "../../POM/sauceDemo/CartPOM";
import {CheckoutPOM} from "../../POM/sauceDemo/CheckoutPOM";
import {RandomDataGenerator} from "../../utility/RandomDataGenerator";
import {CheckoutOverviewPOM} from "../../POM/sauceDemo/CheckoutOverviewPOM";

async function loginToApplication(page) {

    // redirect to URL
    await page.goto('https://www.saucedemo.com/');

    // Initiate POM
    const loginPage = new LoginPagePOM(page);

    // Initialize Data Factory
    const loginData = loginWithValidUser();
    await loginPage.enterUserName(loginData.userName);
    await loginPage.enterPassword(loginData.password);
    await loginPage.clickLoginButton();
}

async function navigateToCheckout(page) {

    // Initiate POM
    const homePage = new HomePagePOM(page);
    const cartPage = new CartPagePOM(page);

    // get product data from data factory
    const products = validProduct().addToCartProducts;

    // add to cart products
    for (const product of products) {
        await homePage.clickOnAddToCartBtn(product);
    }

    await homePage.clickOnCartLogo();
    await cartPage.verifyCartTitle();

    // verify cart items
    for (const product of products) {
        await cartPage.verifyCartItems(product);
    }

    await cartPage.clickOnCheckoutBtn();
}

test('verify when all the field is blank', async ({page}) => {

    // login to application and navigate to checkout page
    await loginToApplication(page);
    await navigateToCheckout(page);

    // Initiate POM
    const checkoutPage = new CheckoutPOM(page);

    await checkoutPage.verifyCheckoutTitle();
    await checkoutPage.clickOnContinueBtn();

    await checkoutPage.verifyErrorMsg('Error: First Name is required');
})

test('verify when first name is blank', async ({page}) => {

    // login to application and navigate to checkout page
    await loginToApplication(page);
    await navigateToCheckout(page);

    // Initiate POM
    const checkoutPage = new CheckoutPOM(page);

    await checkoutPage.verifyCheckoutTitle();

    await checkoutPage.enterLastName(RandomDataGenerator.generateRandomLastName());
    await checkoutPage.enterZipCode(RandomDataGenerator.generateRandomNumeric(6));

    await checkoutPage.clickOnContinueBtn();

    await checkoutPage.verifyErrorMsg('Error: First Name is required');
})

test('verify when last name is blank', async ({page}) => {

    // login to application and navigate to checkout page
    await loginToApplication(page);
    await navigateToCheckout(page);

    // Initiate POM
    const checkoutPage = new CheckoutPOM(page);

    await checkoutPage.verifyCheckoutTitle();

    await checkoutPage.enterFirstName(RandomDataGenerator.generateRandomFirstName());
    await checkoutPage.enterZipCode(RandomDataGenerator.generateRandomNumeric(6));

    await checkoutPage.clickOnContinueBtn();

    await checkoutPage.verifyErrorMsg('Error: Last Name is required');
})

test('verify when zipcode is blank', async ({page}) => {

    // login to application and navigate to checkout page
    await loginToApplication(page);
    await navigateToCheckout(page);

    // Initiate POM
    const checkoutPage = new CheckoutPOM(page);

    await checkoutPage.verifyCheckoutTitle();

    await checkoutPage.enterFirstName(RandomDataGenerator.generateRandomFirstName());
    await checkoutPage.enterLastName(RandomDataGenerator.generateRandomLastName());

    await checkoutPage.clickOnContinueBtn();

    await checkoutPage.verifyErrorMsg('Error: Postal Code is required');
})

test('verify to click on Cancel button', async ({page}) => {

    // login to application and navigate to checkout page
    await loginToApplication(page);
    await navigateToCheckout(page);

    // Initiate POM
    const checkoutPage = new CheckoutPOM(page);
    const cartPage = new CartPagePOM(page);

    await checkoutPage.verifyCheckoutTitle();

    await checkoutPage.clickOnCancelBtn();

    await cartPage.verifyCartTitle();
})

test('verify enter all the valid data', async ({page}) => {

    // login to application and navigate to checkout page
    await loginToApplication(page);
    await navigateToCheckout(page);

    // Initiate POM
    const checkoutPage = new CheckoutPOM(page);
    const checkoutOverviewPage = new CheckoutOverviewPOM(page);

    await checkoutPage.verifyCheckoutTitle();

    await checkoutPage.enterFirstName(RandomDataGenerator.generateRandomFirstName());
    await checkoutPage.enterLastName(RandomDataGenerator.generateRandomLastName());
    await checkoutPage.enterZipCode(RandomDataGenerator.generateRandomNumeric(6));

    await checkoutPage.clickOnContinueBtn();

    await checkoutOverviewPage.verifyOverviewTitle();
})