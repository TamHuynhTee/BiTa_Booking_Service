import Repository from '../../../Apis/repositoryApi';
import { ReturnListResponse, ReturnResponse } from '../../../Apis/response';
import { IQueryServiceApi } from '../../common/type';
import { IQueryBranchApi } from '../type';
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
    query: IQueryServiceApi
): Promise<ReturnResponse<any>> => {
    return await Repository(routeBusiness['queryService'], query);
};

export const getServiceByIdApi = async (
    id: any
): Promise<ReturnResponse<any>> => {
    return await Repository(routeBusiness['getServiceById'], id);
};

export const getAllServiceApi = async (
    businessId: any
): Promise<ReturnListResponse<any>> => {
    return await Repository(routeBusiness['getAllService'], businessId);
};

// Branch
export const createBranchApi = async (
    payload: any
): Promise<ReturnResponse<any>> => {
    return await Repository(routeBusiness['createBranch'], payload);
};

export const queryBranchApi = async (
    query: IQueryBranchApi
): Promise<ReturnResponse<any>> => {
    return await Repository(routeBusiness['queryBranch'], query);
};

export const getBranchByIdApi = async (
    id: any
): Promise<ReturnResponse<any>> => {
    return await Repository(routeBusiness['getBranchById'], id);
};

export const updateBranchApi = async (
    payload: any
): Promise<ReturnResponse<any>> => {
    return await Repository(routeBusiness['updateBranch'], payload);
};

export const getAllBranchApi = async (
    businessId: any
): Promise<ReturnListResponse<any>> => {
    return await Repository(routeBusiness['getAllBranch'], businessId);
};
