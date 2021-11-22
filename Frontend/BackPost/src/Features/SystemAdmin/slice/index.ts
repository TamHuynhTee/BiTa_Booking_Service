import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AdminStateTypes } from '../type';

const initialState: Partial<AdminStateTypes> = {
    status: 'idle',
};

export const adminSlice = createSlice({
    name: 'Admin',
    initialState,
    reducers: {},
    extraReducers: {},
});

export const {} = adminSlice.actions;
export default adminSlice.reducer;
