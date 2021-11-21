import Repository from '../../../Apis/repositoryApi';
import { ReturnListResponse, ReturnResponse } from '../../../Apis/response';
import { routeCommon } from './common.route';

export const getServiceDetailApi = async (
    params: any
): Promise<ReturnResponse<any>> => {
    return await Repository(routeCommon['getServiceDetail'], params);
};
