import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi } from '../apis/auth.api';
import { ILoginApi } from '../type';

export const loginAsync = createAsyncThunk(
    'Auth/fetchLogin',
    async (login: ILoginApi): Promise<any> => {
        const response: any = await loginApi(login);
        return response.data;
    }
);
