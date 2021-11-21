import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentUserApi, loginApi } from '../apis/auth.api';
import { ILoginApi } from '../type';

export const loginAsync = createAsyncThunk(
    'Auth/fetchLogin',
    async (login: ILoginApi): Promise<any> => {
        const response = await loginApi(login);
        return response.data;
    }
);

export const getCurrentUserAsync = createAsyncThunk(
    'Auth/getCurrentUser',
    async (): Promise<any> => {
        const response = await getCurrentUserApi();
        return response.data;
    }
);
