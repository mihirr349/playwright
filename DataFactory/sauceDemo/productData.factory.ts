import {ProductDataObject} from "../../DataObject/sauceDemo/productDataObject.type";

export const validProduct = (): ProductDataObject[] => {
    return [
        {
            addToCartProducts: ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'],
            removedProducts: ['Sauce Labs Backpack']
        }
    ]
}