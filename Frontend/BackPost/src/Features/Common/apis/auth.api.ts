import Repository from '../../../Apis/repositoryApi';
import { ReturnResponse } from '../../../Apis/response';
import {
    IChangePasswordApi,
    ILoginApi,
    IUpdateAvatarApi,
    IUpdateProfileApi,
} from '../type';
import { routeAuth } from './auth.route';

export const loginApi = async (
    login: ILoginApi
): Promise<ReturnResponse<any>> => {
    return await Repository(routeAuth['login'], login);
};

export const getCurrentUserApi = async (): Promise<ReturnResponse<any>> => {
    return await Repository(routeAuth['getCurrentUser']);
};

export const updateProfileApi = async (
    payload: IUpdateProfileApi
): Promise<ReturnResponse<any>> => {
    return await Repository(routeAuth['updateProfile'], payload);
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
