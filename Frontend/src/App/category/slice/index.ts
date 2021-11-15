import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notifyError, notifySuccess } from '../../../utils/notify';
import { CategoriesStateTypes } from '../type';
import { getAllCategoriesAsync } from './thunk';

const initialState: Partial<CategoriesStateTypes> = {
    categories: null,
    status: 'idle',
};

export const categorySlice = createSlice({
    name: 'Category',
    initialState,
    reducers: {},
    extraReducers: {
        [getAllCategoriesAsync.pending.toString()]: (state) => {
            state.status = 'loading';
        },
        [getAllCategoriesAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.status = 'idle';
            const data = action.payload.map((e: any) => {
                return { value: e.id, label: e.name };
            });
            state.categories = data;
        },
        [getAllCategoriesAsync.rejected.toString()]: (state, action) => {
            state.status = 'loading';
        },
    },
});

export const {} = categorySlice.actions;
export default categorySlice.reducer;
