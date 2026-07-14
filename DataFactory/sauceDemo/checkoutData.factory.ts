import {CheckoutDataObject} from "../../DataObject/sauceDemo/checkoutDataObject.type";
import {RandomDataGenerator} from "../../utility/RandomDataGenerator";

export const checkoutData = (): CheckoutDataObject => {
    return {
        fistName: RandomDataGenerator.generateRandomFirstName(),
        lastName: RandomDataGenerator.generateRandomLastName(),
        zipCode: RandomDataGenerator.generateRandomNumeric(6)
    }
}