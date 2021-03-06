import Repository from '../../../Apis/repositoryApi';
import { ReturnListResponse, ReturnResponse } from '../../../Apis/response';
import {
    ICancelAppointmentApi,
    ICreateAppointment,
    ICustomerReviewApi,
    IGetAppointmentByIdApi,
    IQueryAppointment,
    IQueryReview,
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
// Review
export const countNewReviewsApi = async (): Promise<ReturnResponse<any>> => {
    return await Repository(routeCustomer['countNewReviews']);
};

export const queryReviewsApi = async (
    query: IQueryReview
): Promise<ReturnResponse<any>> => {
    return await Repository(routeCustomer['queryReviews'], query);
};

export const customerReviewApi = async (
    payload: ICustomerReviewApi
): Promise<ReturnResponse<any>> => {
    return await Repository(routeCustomer['customerReview'], payload);
};
