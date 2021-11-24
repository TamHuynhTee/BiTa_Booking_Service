import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notifyError, notifySuccess } from '../../../utils/notify';
import { BusinessStateTypes } from '../type';
import {
    getAllServiceAsync,
    getBranchByIdAsync,
    getServiceByIdAsync,
    queryBranchAsync,
    queryServiceAsync,
} from './thunk';

const initialState: Partial<BusinessStateTypes> = {
    services: undefined,
    branches: null,
    businessServiceDetail: null,
    businessBranchDetail: null,
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
            state.businessBranchDetail = action.payload;
        },
    },
});

export const { getDetailService, getDetailBranch } = businessSlice.actions;
export default businessSlice.reducer;
