import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notifyError, notifySuccess } from '../../../utils/notify';
import { CommonStateTypes } from '../type';
import { getServiceDetailAsync } from './thunk';

const initialState: Partial<CommonStateTypes> = {
    serviceDetail: null,
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
            console.log(action.payload);
            state.status = 'idle';
            state.serviceDetail = action.payload;
        },
        [getServiceDetailAsync.rejected.toString()]: (state, action) => {
            state.status = 'loading';
            state.serviceDetail = action.payload;
        },
    },
});

export const {} = commonSlice.actions;
export default commonSlice.reducer;
