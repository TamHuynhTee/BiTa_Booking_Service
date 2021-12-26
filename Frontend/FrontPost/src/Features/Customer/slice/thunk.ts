import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBranchesByServiceApi } from '../../common/Apis/common.api';
import {
    countNewReviewsApi,
    getAppointmentByIdApi,
    queryAppointmentApi,
    queryReviewsApi,
} from '../Apis/customer.api';
import {
    IGetAppointmentByIdApi,
    IQueryAppointment,
    IQueryReview,
} from '../type';

export const getBranchesByServiceForSelectAsync = createAsyncThunk(
    'Customer/getBranchesByServiceForSelect',
    async (serviceId: any): Promise<any> => {
        const response: any = await getBranchesByServiceApi(serviceId);
        return response.data;
    }
);

export const queryAppointmentAsync = createAsyncThunk(
    'Customer/queryAppointment',
    async (query: IQueryAppointment): Promise<any> => {
        const response: any = await queryAppointmentApi(query);
        return response.data;
    }
);

export const getAppointmentByIdAsync = createAsyncThunk(
    'Customer/getAppointmentById',
    async (query: IGetAppointmentByIdApi): Promise<any> => {
        const response: any = await getAppointmentByIdApi(query);
        return response.data;
    }
);
// Review
export const countNewReviewsAsync = createAsyncThunk(
    'Customer/countNewReviews',
    async (): Promise<any> => {
        const response: any = await countNewReviewsApi();
        return response.data;
    }
);

export const queryReviewsAsync = createAsyncThunk(
    'Customer/queryReviews',
    async (query: IQueryReview): Promise<any> => {
        const response: any = await queryReviewsApi(query);
        return response.data;
    }
);
