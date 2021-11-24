import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserByIdApi, queryUserApi } from '../apis/systemadmin.api';
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
