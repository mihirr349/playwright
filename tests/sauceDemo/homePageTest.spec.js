import { test } from '@playwright/test';
import { HomePagePOM } from '../../POM/sauceDemo/HomePOM';

test('add to cart product', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/inventory.html');

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

test('Filter products by price low to high', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/inventory.html');

    // Initialize POM
    const homePage = new HomePagePOM(page);

    await homePage.filterProductsByValue('lohi');
})

test('logout user', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/inventory.html');

    // Initialize POM
    const homePage = new HomePagePOM(page);

    await homePage.clickOnMenuIcon();
    await homePage.clickOnLogoutLink();
})