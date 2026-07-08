import { loginPageDataObject } from "../DataObject/loginPageDataObject.type";

export const invalidUserData = (): loginPageDataObject[] => {
    return [
        {
            userName: "invalid user",
            password: "invalid user",
            errorMsg: "Epic sadface: Username and password do not match any user in this service",
        }
    ]
}

export const userNameMissing = (): loginPageDataObject[] => {
    return [
        {
            userName: "",
            password: "invalid user",
            errorMsg: "Epic sadface: Username is required",
        }
    ]
}

export const passwordMissing = (): loginPageDataObject[] => {
    return [
        {
            userName: "standard_user",
            password: "",
            errorMsg: "Epic sadface: Password is required",
        }
    ]
}

export const loginWithValidUser = (): loginPageDataObject[] => {
    return [
        {
            userName: "standard_user",
            password: "secret_sauce",
            errorMsg: ""
        }
    ]
}