import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminStateTypes } from '../type';
import { getUserByIdAsync, queryUserAsync } from './thunk';

const initialState: Partial<AdminStateTypes> = {
    queryUser: undefined,
    userDetail: null,
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
            state.status = 'loading';
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
            state.status = 'loading';
        },
    },
});

export const { getDetailUser } = adminSlice.actions;
export default adminSlice.reducer;
