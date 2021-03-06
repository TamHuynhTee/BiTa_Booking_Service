import axios from 'axios';
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

export const updateServiceActivationApi = async (payload: {
    serviceId?: string;
}): Promise<ReturnResponse<any>> => {
    return await Repository(routeBusiness['updateServiceActivation'], payload);
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

export const updateBranchActivationApi = async (payload: {
    branchId?: string;
}): Promise<ReturnResponse<any>> => {
    return await Repository(routeBusiness['updateBranchActivation'], payload);
};
// Branch get Vietnam address Api
export const getVietNamProvincesApi = async (): Promise<
    ReturnResponse<any>
> => {
    return (await axios.get('https://vapi.vnappmob.com/api/province')).data
        .results;
};
export const getVietNamDistrictsApi = async (payload: {
    provinceId: string;
}): Promise<ReturnResponse<any>> => {
    return (
        await axios.get(
            `https://vapi.vnappmob.com/api/province/district/${payload.provinceId}`
        )
    ).data.results;
};
export const getVietNamWardApi = async (payload: {
    districtId: string;
}): Promise<ReturnResponse<any>> => {
    return (
        await axios.get(
            `https://vapi.vnappmob.com/api/province/ward/${payload.districtId}`
        )
    ).data.results;
};

// Business
export const setHeadquarterApi = async (payload: {
    businessId?: string;
    branchId?: string;
}): Promise<ReturnResponse<any>> => {
    return await Repository(routeBusiness['setHeadquarter'], payload);
};

// Appointment
export const doneAppointmentApi = async (payload: {
    appointmentId?: string;
}): Promise<ReturnResponse<any>> => {
    return await Repository(routeBusiness['doneAppointment'], payload);
};
// Statistic
export const getBusinessStatsApi = async (payload: {
    businessId?: string;
    year?: number;
}): Promise<ReturnResponse<any>> => {
    return await Repository(routeBusiness['businessStats'], payload);
};
export const getBusinessRevenueApi = async (payload: {
    businessId?: string;
    year?: number;
}): Promise<ReturnResponse<any>> => {
    return await Repository(routeBusiness['businessRevenue'], payload);
};
