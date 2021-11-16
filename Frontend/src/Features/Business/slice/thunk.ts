import { createAsyncThunk } from '@reduxjs/toolkit';
import { queryServiceApi } from '../Apis/business.api';

export const queryServiceAsync = createAsyncThunk(
    'Service/queryService',
    async (params: any): Promise<any> => {
        const response = await queryServiceApi(params);
        return response.data;
    }
);
