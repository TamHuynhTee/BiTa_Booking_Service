import Repository from '../../../Apis/repositoryApi';
import { ReturnListResponse, ReturnResponse } from '../../../Apis/response';
import { routeBusiness } from './business.route';

export const createServiceApi = async (
    payload: any
): Promise<ReturnResponse<any>> => {
    return await Repository(routeBusiness['createService'], payload);
};

export const updateServiceApi = async (
    payload: any
): Promise<ReturnResponse<any>> => {
    return await Repository(routeBusiness['updateService'], payload);
};

export const queryServiceApi = async (
    query: any
): Promise<ReturnListResponse<any>> => {
    return await Repository(routeBusiness['queryService'], query);
};

export const getServiceByIdApi = async (
    id: any
): Promise<ReturnResponse<any>> => {
    return await Repository(routeBusiness['getServiceById'], id);
};

// Branch
export const createBranchApi = async (
    payload: any
): Promise<ReturnResponse<any>> => {
    return await Repository(routeBusiness['createBranch'], payload);
};
