import { createAsyncThunk } from '@reduxjs/toolkit';
import { getServiceDetailApi } from '../Apis/common.api';

export const getServiceDetailAsync = createAsyncThunk(
    'Common/fetchServiceDetail',
    async (params: any): Promise<any> => {
        const response: any = await getServiceDetailApi(params);
        return response.data;
    }
);
