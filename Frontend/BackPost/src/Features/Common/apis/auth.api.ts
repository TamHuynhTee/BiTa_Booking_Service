import Repository from '../../../Apis/repositoryApi';
import { ReturnResponse } from '../../../Apis/response';
import { ILoginApi } from '../type';
import { routeAuth } from './auth.route';

export const loginApi = async (
    login: ILoginApi
): Promise<ReturnResponse<any>> => {
    return await Repository(routeAuth['login'], login);
};

export const getCurrentUserApi = async (): Promise<ReturnResponse<any>> => {
    return await Repository(routeAuth['getCurrentUser']);
};
