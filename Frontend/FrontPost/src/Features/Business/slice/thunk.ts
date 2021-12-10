import { createAsyncThunk } from '@reduxjs/toolkit';
import { IQueryServiceApi } from '../../common/type';
import {
    getAllBranchApi,
    getAllServiceApi,
    getBranchByIdApi,
    getBusinessRevenueApi,
    getBusinessStatsApi,
    getServiceByIdApi,
    queryBranchApi,
    queryServiceApi,
} from '../Apis/business.api';

export const queryServiceAsync = createAsyncThunk(
    'Service/queryService',
    async (params: IQueryServiceApi): Promise<any> => {
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

export const getAllServiceAsync = createAsyncThunk(
    'Service/getAllService',
    async (payload: any): Promise<any> => {
        const response = await getAllServiceApi(payload);
        return response.data;
    }
);

// Branch
export const queryBranchAsync = createAsyncThunk(
    'Branch/queryBranch',
    async (params: any): Promise<any> => {
        const response = await queryBranchApi(params);
        return response.data;
    }
);

export const getBranchByIdAsync = createAsyncThunk(
    'Branch/getBranchByIdApi',
    async (payload: any): Promise<any> => {
        const response = await getBranchByIdApi(payload);
        return response.data;
    }
);

export const getAllBranchAsync = createAsyncThunk(
    'Branch/getBranchByIdApi',
    async (payload: any): Promise<any> => {
        const response = await getAllBranchApi(payload);
        return response.data;
    }
);

// Stats
export const getBusinessStatsAsync = createAsyncThunk(
    'Statistic/getBusinessStats',
    async (payload: { businessId?: string; year?: number }): Promise<any> => {
        const response = await getBusinessStatsApi(payload);
        return response.data;
    }
);
export const getBusinessRevenueAsync = createAsyncThunk(
    'Statistic/getBusinessRevenue',
    async (payload: { businessId?: string; year?: number }): Promise<any> => {
        const response = await getBusinessRevenueApi(payload);
        return response.data;
    }
);
