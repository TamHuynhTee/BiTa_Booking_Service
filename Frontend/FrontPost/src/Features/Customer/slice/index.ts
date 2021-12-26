import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notifyError, notifySuccess } from '../../../utils/notify';
import { CustomerStateTypes } from '../type';
import {
    countNewReviewsAsync,
    getAppointmentByIdAsync,
    getBranchesByServiceForSelectAsync,
    queryAppointmentAsync,
    queryReviewsAsync,
} from './thunk';

const initialState: Partial<CustomerStateTypes> = {
    branchesForSelect: null,
    queryAppointments: undefined,
    appointment: null,
    newReviews: 0,
    queryReviews: undefined,
    status: 'idle',
};

export const customerSlice = createSlice({
    name: 'Customer',
    initialState,
    reducers: {
        getDetailAppointment: (state, action: PayloadAction<any>) => {
            state.appointment = action.payload;
        },
    },
    extraReducers: {
        [getBranchesByServiceForSelectAsync.pending.toString()]: (state) => {
            state.status = 'loading';
        },
        [getBranchesByServiceForSelectAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.status = 'idle';
            const data = action.payload?.map((e: any) => {
                return {
                    value: e.id,
                    label: `${e.name}: ${e.address.street}, ${e.address.ward}, ${e.address.district}, ${e.address.province}`,
                };
            });
            state.branchesForSelect = data;
        },
        [getBranchesByServiceForSelectAsync.rejected.toString()]: (
            state,
            action
        ) => {
            state.status = 'idle';
        },
        [queryAppointmentAsync.pending.toString()]: (state) => {
            state.status = 'loading';
        },
        [queryAppointmentAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.status = 'idle';
            state.queryAppointments = action.payload;
        },
        [queryAppointmentAsync.rejected.toString()]: (state) => {
            state.status = 'idle';
        },
        [getAppointmentByIdAsync.pending.toString()]: (state) => {
            state.status = 'loading';
        },
        [getAppointmentByIdAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.status = 'idle';
            state.appointment = action.payload;
        },
        [getAppointmentByIdAsync.rejected.toString()]: (state) => {
            state.status = 'idle';
        },
        // Review
        [countNewReviewsAsync.pending.toString()]: (state) => {
            state.status = 'loading';
        },
        [countNewReviewsAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.status = 'idle';
            state.newReviews = action.payload;
        },
        [countNewReviewsAsync.rejected.toString()]: (state) => {
            state.status = 'idle';
        },
        [queryReviewsAsync.pending.toString()]: (state) => {
            state.status = 'loading';
        },
        [queryReviewsAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.status = 'idle';
            state.queryReviews = action.payload;
        },
        [queryReviewsAsync.rejected.toString()]: (state) => {
            state.status = 'idle';
        },
    },
});

export const { getDetailAppointment } = customerSlice.actions;
export default customerSlice.reducer;
