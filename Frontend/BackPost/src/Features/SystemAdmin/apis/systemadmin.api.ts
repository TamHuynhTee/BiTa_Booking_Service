import Repository from '../../../Apis/repositoryApi';
import { ReturnListResponse, ReturnResponse } from '../../../Apis/response';
import { IQueryUserApi } from '../type';
import { routeAdmin } from './systemadmin.route';

export const queryUserApi = async (
    query: IQueryUserApi
): Promise<ReturnResponse<any>> => {
    return await Repository(routeAdmin['queryUser'], query);
};

export const getUserByIdApi = async (
    query: any
): Promise<ReturnResponse<any>> => {
    return await Repository(routeAdmin['getUserById'], query);
};

export const changeUserAccessApi = async (
    query: any
): Promise<ReturnResponse<any>> => {
    return await Repository(routeAdmin['changeUserAccess'], query);
};
// Stats
export const getRegisterStatsApi = async (query: {
    year?: number;
}): Promise<ReturnResponse<any>> => {
    return await Repository(routeAdmin['getRegisterStats'], query);
};

export const getAdminStatsApi = async (query: {
    year?: number;
}): Promise<ReturnResponse<any>> => {
    return await Repository(routeAdmin['getAdminStats'], query);
};
