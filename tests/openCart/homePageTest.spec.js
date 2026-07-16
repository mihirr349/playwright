import {test} from "playwright/test";
import {HomePagePOM} from "../../POM/openCart/homePagePOM";

test('click on shopping cart', async ({page}) => {

    // Navigate to URL
    await page.goto('https://naveenautomationlabs.com/opencart/');

    // Initiate POM
    const homePage = new HomePagePOM(page);

    // Action
    await homePage.selectCurrency('Euro');
})