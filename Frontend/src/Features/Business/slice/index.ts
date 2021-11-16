import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notifyError, notifySuccess } from '../../../utils/notify';
import { BusinessStateTypes } from '../type';
import { queryServiceAsync } from './thunk';

const initialState: Partial<BusinessStateTypes> = {
    services: null,
    status: 'idle',
};

export const businessSlice = createSlice({
    name: 'Business',
    initialState,
    reducers: {},
    extraReducers: {
        [queryServiceAsync.pending.toString()]: (state) => {
            state.status = 'loading';
        },
        [queryServiceAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.status = 'idle';
            console.log(action.payload);
            state.services = action.payload;
        },
        [queryServiceAsync.rejected.toString()]: (state, action) => {
            state.status = 'loading';
            state.services = action.payload;
        },
    },
});

export const {} = businessSlice.actions;
export default businessSlice.reducer;
