import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentUserApi, loginApi } from '../apis/auth.api';
import { ILoginApi } from '../type';

export const loginAsync = createAsyncThunk(
    'Auth/fetchLogin',
    async (login: ILoginApi): Promise<any> => {
        const response: any = await loginApi(login);
        console.log('thunk loginAsync', response);
        return response;
    }
);

export const getCurrentUserAsync = createAsyncThunk(
    'Auth/getCurrentUser',
    async (): Promise<any> => {
        const response = await getCurrentUserApi();
        console.log('thunk getCurrentUserAsync', response);
        return response.data;
    }
);
