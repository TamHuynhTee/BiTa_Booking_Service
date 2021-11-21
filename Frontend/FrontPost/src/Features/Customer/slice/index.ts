import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notifyError, notifySuccess } from '../../../utils/notify';
import { CustomerStateTypes } from '../type';

const initialState: Partial<CustomerStateTypes> = {
    status: 'idle',
};

export const customerSlice = createSlice({
    name: 'Customer',
    initialState,
    reducers: {},
    extraReducers: {},
});

export const {} = customerSlice.actions;
export default customerSlice.reducer;
