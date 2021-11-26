import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    getBranchesByServiceApi,
    getBusinessDetailApi,
    getServiceDetailApi,
    queryBusinessApi,
} from '../Apis/common.api';
import { IQueryBusinessApi } from '../type';

export const getServiceDetailAsync = createAsyncThunk(
    'Common/fetchServiceDetail',
    async (params: any): Promise<any> => {
        const response: any = await getServiceDetailApi(params);
        return response.data;
    }
);

export const queryBusinessAsync = createAsyncThunk(
    'Common/queryBusiness',
    async (query: IQueryBusinessApi): Promise<any> => {
        const response: any = await queryBusinessApi(query);
        return response.data;
    }
);

export const getBranchesByServiceAsync = createAsyncThunk(
    'Common/getBranchesByService',
    async (serviceId: any): Promise<any> => {
        const response: any = await getBranchesByServiceApi(serviceId);
        return response.data;
    }
);

export const getBusinessDetailAsync = createAsyncThunk(
    'Common/fetchBusinessDetail',
    async (params: any): Promise<any> => {
        const response: any = await getBusinessDetailApi(params);
        return response.data;
    }
);
