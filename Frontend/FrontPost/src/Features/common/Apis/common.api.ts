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

export const getBranchesByServiceApi = async (
    serviceId: any
): Promise<ReturnListResponse<any>> => {
    return await Repository(routeCommon['getBranchesByService'], serviceId);
};

export const getBusinessDetailApi = async (
    businessId: any
): Promise<ReturnResponse<any>> => {
    return await Repository(routeCommon['getBusinessDetail'], businessId);
};
// Appointment
export const cancelAppointmentApi = async (payload: {
    appointmentId?: string;
}): Promise<ReturnResponse<any>> => {
    return await Repository(routeCommon['cancelAppointment'], payload);
};
