import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    getAdminStatsApi,
    getRegisterStatsApi,
    getUserByIdApi,
    queryUserApi,
} from '../apis/systemadmin.api';
import { IQueryUserApi } from '../type';

export const queryUserAsync = createAsyncThunk(
    'User/queryUser',
    async (query: IQueryUserApi): Promise<any> => {
        const response = await queryUserApi(query);
        return response.data;
    }
);

export const getUserByIdAsync = createAsyncThunk(
    'User/getUserById',
    async (query: any): Promise<any> => {
        const response = await getUserByIdApi(query);
        return response.data;
    }
);
// Stats
export const getRegisterStatsAsync = createAsyncThunk(
    'Stats/getRegisterStats',
    async (query: { year?: number }): Promise<any> => {
        const response = await getRegisterStatsApi(query);
        return response.data;
    }
);

export const getAdminStatsAsync = createAsyncThunk(
    'Stats/getAdminStats',
    async (query: { year?: number }): Promise<any> => {
        const response = await getAdminStatsApi(query);
        return response.data;
    }
);
