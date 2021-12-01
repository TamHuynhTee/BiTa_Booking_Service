import Repository from '../../../Apis/repositoryApi';
import { ReturnResponse } from '../../../Apis/response';
import {
    IChangePasswordApi,
    IForgotPassword,
    ILoginApi,
    IRegisterBusinessApi,
    IRegisterCustomerApi,
    IResetPassword,
    IUpdateAvatarApi,
    IUpdateBusinessApi,
    IUpdateProfileApi,
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

export const updateProfileApi = async (
    payload: IUpdateProfileApi
): Promise<ReturnResponse<any>> => {
    return await Repository(routeAuth['updateProfile'], payload);
};

export const updateBusinessApi = async (
    payload: IUpdateBusinessApi
): Promise<ReturnResponse<any>> => {
    return await Repository(routeAuth['updateBusiness'], payload);
};

export const updateAvatarApi = async (
    payload: IUpdateAvatarApi
): Promise<ReturnResponse<any>> => {
    return await Repository(routeAuth['updateAvatar'], payload);
};

export const changePasswordApi = async (
    payload: IChangePasswordApi
): Promise<ReturnResponse<any>> => {
    return await Repository(routeAuth['changePassword'], payload);
};
