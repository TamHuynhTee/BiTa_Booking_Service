import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCategoriesApi } from '../apis/category.api';

export const getAllCategoriesAsync = createAsyncThunk(
    'Category/fetchCategories',
    async (): Promise<any> => {
        const response = await getAllCategoriesApi();
        return response.data;
    }
);
