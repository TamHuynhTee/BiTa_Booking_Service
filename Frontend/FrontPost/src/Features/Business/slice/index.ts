import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BusinessStateTypes } from '../type';
import {
    getAllBranchAsync,
    getAllServiceAsync,
    getBranchByIdAsync,
    getBusinessRevenueAsync,
    getBusinessStatsAsync,
    getServiceByIdAsync,
    queryBranchAsync,
    queryServiceAsync,
} from './thunk';

const initialState: Partial<BusinessStateTypes> = {
    services: undefined,
    branches: undefined,
    businessBranches: [],
    businessServiceDetail: null,
    businessBranchDetail: null,
    stats: undefined,
    revenue: null,
    status: 'idle',
};

export const businessSlice = createSlice({
    name: 'Business',
    initialState,
    reducers: {
        getDetailService: (state, action: PayloadAction<any>) => {
            state.businessServiceDetail = action.payload;
        },
        getDetailBranch: (state, action: PayloadAction<any>) => {
            state.businessBranchDetail = action.payload;
        },
    },
    extraReducers: {
        // query services
        [queryServiceAsync.pending.toString()]: (state) => {
            state.status = 'loading';
        },
        [queryServiceAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.status = 'idle';
            state.services = action.payload;
        },
        [queryServiceAsync.rejected.toString()]: (state, action) => {
            state.status = 'idle';
        },
        // query branches
        [queryBranchAsync.pending.toString()]: (state) => {
            state.status = 'loading';
        },
        [queryBranchAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.status = 'idle';
            state.branches = action.payload;
        },
        [queryBranchAsync.rejected.toString()]: (state, action) => {
            state.status = 'idle';
        },
        [getAllServiceAsync.pending.toString()]: (state) => {
            state.status = 'loading';
        },
        [getAllServiceAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.status = 'idle';
            const data = action.payload?.map((e: any) => {
                return { value: e.id, label: e.name };
            });
            state.servicesForSelect = data;
        },
        [getAllServiceAsync.rejected.toString()]: (state, action) => {
            state.status = 'idle';
            state.servicesForSelect = action.payload;
        },
        [getServiceByIdAsync.pending.toString()]: (state) => {
            state.status = 'loading';
        },
        [getServiceByIdAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.status = 'idle';
            state.businessServiceDetail = action.payload;
        },
        [getServiceByIdAsync.rejected.toString()]: (state, action) => {
            state.status = 'idle';
            state.businessBranchDetail = action.payload;
        },
        [getBranchByIdAsync.pending.toString()]: (state) => {
            state.status = 'loading';
        },
        [getBranchByIdAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.status = 'idle';
            state.businessBranchDetail = action.payload;
        },
        [getBranchByIdAsync.rejected.toString()]: (state, action) => {
            state.status = 'idle';
        },
        [getAllBranchAsync.pending.toString()]: (state) => {
            state.status = 'loading';
        },
        [getAllBranchAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.status = 'idle';
            state.businessBranches = action.payload;
        },
        [getAllBranchAsync.rejected.toString()]: (state, action) => {
            state.status = 'idle';
        },
        // Stats
        [getBusinessStatsAsync.pending.toString()]: (state) => {
            state.status = 'loading';
        },
        [getBusinessStatsAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.status = 'idle';
            const data = action.payload;
            state.stats = data;
        },
        [getBusinessStatsAsync.rejected.toString()]: (state, action) => {
            state.status = 'idle';
        },
        [getBusinessRevenueAsync.pending.toString()]: (state) => {
            state.status = 'loading';
        },
        [getBusinessRevenueAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.status = 'idle';
            state.revenue = action.payload;
        },
        [getBusinessRevenueAsync.rejected.toString()]: (state, action) => {
            state.status = 'idle';
        },
    },
});

export const { getDetailService, getDetailBranch } = businessSlice.actions;
export default businessSlice.reducer;
