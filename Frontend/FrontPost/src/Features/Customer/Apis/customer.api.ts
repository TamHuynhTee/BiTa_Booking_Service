import Repository from '../../../Apis/repositoryApi';
import { ReturnListResponse, ReturnResponse } from '../../../Apis/response';
import {
    ICancelAppointmentApi,
    ICreateAppointment,
    IGetAppointmentByIdApi,
    IQueryAppointment,
    IUpdateAppointmentCustomerApi,
} from '../type';
import { routeCustomer } from './customer.route';

export const createAppointmentApi = async (
    payload: ICreateAppointment
): Promise<ReturnResponse<any>> => {
    return await Repository(routeCustomer['createAppointment'], payload);
};

export const queryAppointmentApi = async (
    query: IQueryAppointment
): Promise<ReturnResponse<any>> => {
    return await Repository(routeCustomer['queryAppointment'], query);
};
export const getAppointmentByIdApi = async (
    query: IGetAppointmentByIdApi
): Promise<ReturnResponse<any>> => {
    return await Repository(routeCustomer['getAppointmentById'], query);
};
export const updateAppointmentApi = async (
    query: IUpdateAppointmentCustomerApi
): Promise<ReturnResponse<any>> => {
    return await Repository(routeCustomer['updateAppointment'], query);
};
export const cancelAppointmentApi = async (
    query: ICancelAppointmentApi
): Promise<ReturnResponse<any>> => {
    return await Repository(routeCustomer['cancelAppointment'], query);
};
