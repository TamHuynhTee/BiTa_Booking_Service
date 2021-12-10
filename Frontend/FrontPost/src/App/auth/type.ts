export interface AuthStateTypes {
    user?: any;
    needAuth?: boolean;
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

export interface IRegisterBusinessApi {
    businessName?: string;
    displayName?: string;
    ownerName?: string;
    businessCertificate?: string;
    shortDescription?: string;
    username?: string;
    email?: string;
    phoneNumber?: string;
    password?: string;
}

export interface IVerifyEmail {
    token: string;
}
export interface IForgotPassword {
    email: string;
}

export interface IResetPassword {
    token: string;
    password: string;
}

export interface IUpdateProfileApi {
    username?: string;
    firstName?: string;
    surName?: string;
    phoneNumber?: string;
    dayOfBirth?: any;
    email?: string;
    gender?: string;
}

export interface IUpdateBusinessApi {
    businessName?: string;
    displayName?: string;
    ownerName?: string;
    shortDescription?: string;
}

export interface IUpdateAvatarApi {
    avatar?: string;
}

export interface IChangePasswordApi {
    oldPassword?: string;
    newPassword?: string;
}
