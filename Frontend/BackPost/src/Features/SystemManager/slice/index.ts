import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { moneyFormatter } from '../../../utils/moneyFormatter';
import { ManagerStateTypes } from '../type';
import {
    getAllCategoriesAsync,
    getBusinessByIdAsync,
    getCategoryByIdAsync,
    getManagerRevenueAsync,
    getManagerStatsAsync,
    queryBusinessAsync,
} from './thunk';

const initialState: Partial<ManagerStateTypes> = {
    categories: [],
    categoryDetail: null,
    businessDetail: null,
    queryBusiness: undefined,
    managerStats: undefined,
    managerRevenue: null,
    status: 'idle',
};

export const managerSlice = createSlice({
    name: 'Manager',
    initialState,
    reducers: {
        getDetailCategory: (state, action: PayloadAction<any>) => {
            state.categoryDetail = action.payload;
        },
        getDetailBusiness: (state, action: PayloadAction<any>) => {
            state.businessDetail = action.payload;
        },
    },
    extraReducers: {
        [getAllCategoriesAsync.pending.toString()]: (state) => {
            state.status = 'loading';
        },
        [getAllCategoriesAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.status = 'idle';
            state.categories = action.payload;
        },
        [getAllCategoriesAsync.rejected.toString()]: (state) => {
            state.status = 'idle';
        },
        [getCategoryByIdAsync.pending.toString()]: (state) => {
            state.status = 'loading';
        },
        [getCategoryByIdAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.status = 'idle';
            state.categoryDetail = action.payload;
        },
        [getCategoryByIdAsync.rejected.toString()]: (state) => {
            state.status = 'idle';
        },
        [queryBusinessAsync.pending.toString()]: (state) => {
            state.status = 'loading';
        },
        [queryBusinessAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.status = 'idle';
            state.queryBusiness = action.payload;
        },
        [queryBusinessAsync.rejected.toString()]: (state) => {
            state.status = 'idle';
        },
        [getBusinessByIdAsync.pending.toString()]: (state) => {
            state.status = 'loading';
        },
        [getBusinessByIdAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.status = 'idle';
            state.businessDetail = action.payload;
        },
        [getBusinessByIdAsync.rejected.toString()]: (state) => {
            state.status = 'idle';
        },
        // Stats
        [getManagerRevenueAsync.pending.toString()]: (state) => {
            state.status = 'loading';
        },
        [getManagerRevenueAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.status = 'idle';
            state.managerRevenue = action.payload;
        },
        [getManagerRevenueAsync.rejected.toString()]: (state) => {
            state.status = 'idle';
        },
        [getManagerStatsAsync.pending.toString()]: (state) => {
            state.status = 'loading';
        },
        [getManagerStatsAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.status = 'idle';
            state.managerStats = action.payload;
        },
        [getManagerStatsAsync.rejected.toString()]: (state) => {
            state.status = 'idle';
        },
    },
});

export const { getDetailCategory, getDetailBusiness } = managerSlice.actions;
export default managerSlice.reducer;
