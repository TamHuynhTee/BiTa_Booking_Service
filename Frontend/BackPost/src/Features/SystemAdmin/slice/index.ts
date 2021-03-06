import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminStateTypes } from '../type';
import {
    getAdminStatsAsync,
    getRegisterStatsAsync,
    getUserByIdAsync,
    queryUserAsync,
} from './thunk';

const initialState: Partial<AdminStateTypes> = {
    queryUser: undefined,
    userDetail: null,
    userStats: null,
    adminStats: undefined,
    status: 'idle',
};

export const adminSlice = createSlice({
    name: 'Admin',
    initialState,
    reducers: {
        getDetailUser: (state, action: PayloadAction<any>) => {
            state.userDetail = action.payload;
        },
    },
    extraReducers: {
        [queryUserAsync.pending.toString()]: (state) => {
            state.status = 'loading';
        },
        [queryUserAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.status = 'idle';
            state.queryUser = action.payload;
        },
        [queryUserAsync.rejected.toString()]: (state) => {
            state.status = 'idle';
        },
        [getUserByIdAsync.pending.toString()]: (state) => {
            state.status = 'loading';
        },
        [getUserByIdAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.status = 'idle';
            state.userDetail = action.payload;
        },
        [getUserByIdAsync.rejected.toString()]: (state) => {
            state.status = 'idle';
        },
        // Stats
        [getRegisterStatsAsync.pending.toString()]: (state) => {
            state.status = 'loading';
        },
        [getRegisterStatsAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.status = 'idle';
            state.userStats = action.payload;
        },
        [getRegisterStatsAsync.rejected.toString()]: (state) => {
            state.status = 'idle';
        },
        [getAdminStatsAsync.pending.toString()]: (state) => {
            state.status = 'loading';
        },
        [getAdminStatsAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.status = 'idle';
            state.adminStats = action.payload;
        },
        [getAdminStatsAsync.rejected.toString()]: (state) => {
            state.status = 'idle';
        },
    },
});

export const { getDetailUser } = adminSlice.actions;
export default adminSlice.reducer;
