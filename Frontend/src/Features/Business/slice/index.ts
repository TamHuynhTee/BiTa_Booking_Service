import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notifyError, notifySuccess } from '../../../utils/notify';
import { BusinessStateTypes } from '../type';
import { getServiceByIdAsync, queryServiceAsync } from './thunk';

const initialState: Partial<BusinessStateTypes> = {
    services: null,
    businessServiceDetail: null,
    status: 'idle',
};

export const businessSlice = createSlice({
    name: 'Business',
    initialState,
    reducers: {
        getDetailService: (state, action: PayloadAction<any>) => {
            state.businessServiceDetail = action.payload;
        },
    },
    extraReducers: {
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
            state.status = 'loading';
            state.services = action.payload;
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
            state.status = 'loading';
            state.businessServiceDetail = action.payload;
        },
    },
});

export const { getDetailService } = businessSlice.actions;
export default businessSlice.reducer;
