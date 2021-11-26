import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notifyError, notifySuccess } from '../../../utils/notify';
import { CustomerStateTypes } from '../type';
import { getBranchesByServiceForSelectAsync } from './thunk';

const initialState: Partial<CustomerStateTypes> = {
    branchesForSelect: null,
    status: 'idle',
};

export const customerSlice = createSlice({
    name: 'Customer',
    initialState,
    reducers: {},
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
    },
});

export const {} = customerSlice.actions;
export default customerSlice.reducer;
