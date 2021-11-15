import Repository from '../../../Apis/repositoryApi';
import { ReturnResponse } from '../../../Apis/response';
import { routeBusiness } from './business.route';

export const createServiceApi = async (
    payload: any
): Promise<ReturnResponse<any>> => {
    return await Repository(routeBusiness['createService'], payload);
};
