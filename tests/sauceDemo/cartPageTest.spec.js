import {test} from "playwright/test";
import {CartPagePOM} from "../../POM/sauceDemo/CartPOM";
import {HomePagePOM} from "../../POM/sauceDemo/HomePOM";
import {validProduct} from "../../DataFactory/sauceDemo/productData.factory";
import {CheckoutPOM} from "../../POM/sauceDemo/CheckoutPOM";

async function addProductsIntoCart(page) {

    // Initialize POM
    const homePage = new HomePagePOM(page);

    await page.goto('https://www.saucedemo.com/inventory.html');

    // Add products to cart
    const products = validProduct().addToCartProducts;

    // verify Product title
    await homePage.verifyProductTitle();

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

test('verify cart items', async ({page}) => {

    // Initialize POM
    const cartPages = new CartPagePOM(page);

    // login to application
    await addProductsIntoCart(page);

    // get product data from data factory
    const addedProducts = validProduct().addToCartProducts;
    const removedItems = validProduct().removedProducts;

    // verify cart items
    for (const product of addedProducts) {
        await cartPages.verifyCartItems(product);
    }

    // remove items
    for (const product of removedItems) {
        await cartPages.clickOnRemoveItemBtn(product);
    }

    // verify remove cart item
    for (const product of removedItems) {
        await cartPages.verifyRemovedItems(product);
    }
})

test('verify to click on continue shopping button', async ({page}) => {

    // Initialize POM
    const homePage = new HomePagePOM(page);
    const cartPages = new CartPagePOM(page);

    // login to application
    await addProductsIntoCart(page);

    await cartPages.verifyCartTitle();

    // get product data from data factory
    const products = validProduct().addToCartProducts;

    // verify cart items
    for (const product of products) {
        await cartPages.verifyCartItems(product);
    }

    await cartPages.clickOnContinueShoppingBtn();

    await homePage.verifyProductTitle();
})

test('click On Checkout button', async ({page}) => {

    // Initialize POM
    const cartPages = new CartPagePOM(page);
    const checkoutPage = new CheckoutPOM(page);

    // login and add to cart product
    await addProductsIntoCart(page);

    await cartPages.verifyCartTitle();

    // get product data from data factory
    const products = validProduct().addToCartProducts;

    for (const product of products) {
        await cartPages.verifyCartItems(product);
    }

    await cartPages.clickOnCheckoutBtn();

    await checkoutPage.verifyCheckoutTitle();
})