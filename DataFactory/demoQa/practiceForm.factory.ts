import {PracticeFormDataObject} from "../../DataObject/demoQa/practiceFormDataObject.type";

export const validUser = (): PracticeFormDataObject[] => {
    return [
        {
            firstName: "user 1",
            lastName: "Deo",
            email: "testuser@example.com",
            gender: "Male",
            mobileNumber: "1234567890",
            dob: "20 Nov 2000",
            subjects: ["Maths"],
            hobbies: ["Sports"],
            currentAddress: "123 Main St, City, Country",
            state: "NCR",
            city: "Delhi"
        }
    ]
}