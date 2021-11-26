import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    getAllCategoriesApi,
    getBusinessByIdApi,
    getCategoryByIdApi,
    queryBusinessApi,
} from '../apis/systemmanager.api';
import { IQueryBusinessApi } from '../type';

export const getAllCategoriesAsync = createAsyncThunk(
    'Category/getAllCategories',
    async (): Promise<any> => {
        const response = await getAllCategoriesApi();
        return response.data;
    }
);

export const getCategoryByIdAsync = createAsyncThunk(
    'Category/getCategoryById',
    async (payload: any): Promise<any> => {
        const response = await getCategoryByIdApi(payload);
        return response.data;
    }
);

export const queryBusinessAsync = createAsyncThunk(
    'Business/queryBusiness',
    async (query: IQueryBusinessApi): Promise<any> => {
        const response = await queryBusinessApi(query);
        return response.data;
    }
);

export const getBusinessByIdAsync = createAsyncThunk(
    'Business/getBusinessById',
    async (payload: any): Promise<any> => {
        const response = await getBusinessByIdApi(payload);
        return response.data;
    }
);
