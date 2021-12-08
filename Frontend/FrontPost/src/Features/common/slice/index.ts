import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommonStateTypes } from '../type';
import {
    getBranchesByServiceAsync,
    getBusinessDetailAsync,
    getServiceDetailAsync,
    queryBusinessAsync,
} from './thunk';

const initialState: Partial<CommonStateTypes> = {
    serviceDetail: null,
    businesses: undefined,
    businessDetail: null,
    serviceBranches: [],
    status: 'idle',
};

export const commonSlice = createSlice({
    name: 'Common',
    initialState,
    reducers: {
        getDetailService: (state, action: PayloadAction<any>) => {
            state.serviceDetail = action.payload;
        },
        getDetailBusiness: (state, action: PayloadAction<any>) => {
            state.businessDetail = action.payload;
        },
    },
    extraReducers: {
        [getServiceDetailAsync.pending.toString()]: (state) => {
            state.status = 'loading';
        },
        [getServiceDetailAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.status = 'idle';
            state.serviceDetail = action.payload;
        },
        [getServiceDetailAsync.rejected.toString()]: (state, action) => {
            state.status = 'idle';
        },
        [getBusinessDetailAsync.pending.toString()]: (state) => {
            state.status = 'loading';
        },
        [getBusinessDetailAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.status = 'idle';
            state.businessDetail = action.payload;
        },
        [getBusinessDetailAsync.rejected.toString()]: (state, action) => {
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
            state.businesses = action.payload;
        },
        [queryBusinessAsync.rejected.toString()]: (state, action) => {
            state.status = 'idle';
        },
        [getBranchesByServiceAsync.pending.toString()]: (state) => {
            state.status = 'loading';
        },
        [getBranchesByServiceAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.status = 'idle';
            state.serviceBranches = action.payload;
        },
        [getBranchesByServiceAsync.rejected.toString()]: (state, action) => {
            state.status = 'idle';
        },
    },
});

export const { getDetailService, getDetailBusiness } = commonSlice.actions;
export default commonSlice.reducer;
