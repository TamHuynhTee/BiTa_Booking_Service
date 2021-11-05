export interface AuthStateTypes {
    user?: any;
    status?: string;
}

export interface ILoginApi {
    email?: string;
    password?: string;
}

export interface IRegisterCustomerApi {
    username?: string;
    firstName?: string;
    surName?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
    gender?: string;
}
