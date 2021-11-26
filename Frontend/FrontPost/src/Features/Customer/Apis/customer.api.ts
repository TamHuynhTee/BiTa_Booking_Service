import Repository from '../../../Apis/repositoryApi';
import { ReturnListResponse, ReturnResponse } from '../../../Apis/response';
import { ICreateAppointment } from '../type';
import { routeCustomer } from './customer.route';

export const createAppointmentApi = async (
    payload: ICreateAppointment
): Promise<ReturnResponse<any>> => {
    return await Repository(routeCustomer['createAppointment'], payload);
};
