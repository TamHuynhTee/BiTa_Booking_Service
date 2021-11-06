import Repository from '../../../apis/repositoryApi';
import {
    ILoginApi,
    IRegisterBusinessApi,
    IRegisterCustomerApi,
    IResetPassword,
    IVerifyEmail,
} from '../type';
import { routeAuth } from './auth.route';

export const loginApi = async (login: ILoginApi) => {
    return await Repository(routeAuth['login'], login);
};

export const registerCustomerApi = async (register: IRegisterCustomerApi) => {
    return await Repository(routeAuth['registerCustomer'], register);
};

export const registerBusinessApi = async (register: IRegisterBusinessApi) => {
    return await Repository(routeAuth['registerBusiness'], register);
};

export const verifyEmailApi = async (token: IVerifyEmail) => {
    return await Repository(routeAuth['verifyEmail'], token);
};

export const resetPasswordApi = async (payload: IResetPassword) => {
    return await Repository(routeAuth['resetPassword'], payload);
};
