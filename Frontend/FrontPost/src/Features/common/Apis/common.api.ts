import Repository from '../../../Apis/repositoryApi';
import { ReturnListResponse, ReturnResponse } from '../../../Apis/response';
import { IQueryBusinessApi } from '../type';
import { routeCommon } from './common.route';

export const getServiceDetailApi = async (
    params: any
): Promise<ReturnResponse<any>> => {
    return await Repository(routeCommon['getServiceDetail'], params);
};

export const queryBusinessApi = async (
    query: IQueryBusinessApi
): Promise<ReturnResponse<any>> => {
    return await Repository(routeCommon['queryBusiness'], query);
};
