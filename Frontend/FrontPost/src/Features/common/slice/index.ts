import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommonStateTypes } from '../type';
import { getServiceDetailAsync, queryBusinessAsync } from './thunk';

const initialState: Partial<CommonStateTypes> = {
    serviceDetail: null,
    businesses: undefined,
    businessDetail: null,
    status: 'idle',
};

export const commonSlice = createSlice({
    name: 'Business',
    initialState,
    reducers: {},
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
    },
});

export const {} = commonSlice.actions;
export default commonSlice.reducer;
