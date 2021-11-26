import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBranchesByServiceApi } from '../../common/Apis/common.api';

export const getBranchesByServiceForSelectAsync = createAsyncThunk(
    'Customer/getBranchesByServiceForSelect',
    async (serviceId: any): Promise<any> => {
        const response: any = await getBranchesByServiceApi(serviceId);
        return response.data;
    }
);
