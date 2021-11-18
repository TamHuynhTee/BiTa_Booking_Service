import { createAsyncThunk } from '@reduxjs/toolkit';
import { getServiceByIdApi, queryServiceApi } from '../Apis/business.api';

export const queryServiceAsync = createAsyncThunk(
    'Service/queryService',
    async (params: any): Promise<any> => {
        const response = await queryServiceApi(params);
        return response.data;
    }
);

export const getServiceByIdAsync = createAsyncThunk(
    'Service/getServiceById',
    async (payload: any): Promise<any> => {
        const response = await getServiceByIdApi(payload);
        return response.data;
    }
);
