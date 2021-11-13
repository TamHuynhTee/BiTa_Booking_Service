import Repository from '../../../Apis/repositoryApi';
import { ReturnResponse } from '../../../Apis/response';
import {
    IForgotPassword,
    ILoginApi,
    IRegisterBusinessApi,
    IRegisterCustomerApi,
    IResetPassword,
    IVerifyEmail,
} from '../type';
import { routeAuth } from './auth.route';

export const loginApi = async (
    login: ILoginApi
): Promise<ReturnResponse<any>> => {
    return await Repository(routeAuth['login'], login);
};

export const registerCustomerApi = async (
    register: IRegisterCustomerApi
): Promise<ReturnResponse<any>> => {
    return await Repository(routeAuth['registerCustomer'], register);
};

export const registerBusinessApi = async (
    register: IRegisterBusinessApi
): Promise<ReturnResponse<any>> => {
    return await Repository(routeAuth['registerBusiness'], register);
};

export const verifyEmailApi = async (
    token: IVerifyEmail
): Promise<ReturnResponse<any>> => {
    return await Repository(routeAuth['verifyEmail'], token);
};

export const resetPasswordApi = async (
    payload: IResetPassword
): Promise<ReturnResponse<any>> => {
    return await Repository(routeAuth['resetPassword'], payload);
};

export const getCurrentUserApi = async (): Promise<ReturnResponse<any>> => {
    return await Repository(routeAuth['getCurrentUser']);
};

export const forgotPasswordApi = async (
    payload: IForgotPassword
): Promise<ReturnResponse<any>> => {
    return await Repository(routeAuth['forgotPassword'], payload);
};
