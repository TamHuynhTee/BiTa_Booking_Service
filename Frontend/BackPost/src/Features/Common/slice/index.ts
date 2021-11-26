import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notifyError, notifySuccess } from '../../../utils/notify';
import { AuthStateTypes } from '../type';
import { getCurrentUserAsync } from './thunk';

const initialState: Partial<AuthStateTypes> = {
    user: null,
    status: 'idle',
};

export const authSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.user = null;
            localStorage.removeItem('token');
            notifySuccess('Đăng xuất thành công');
        },
    },
    extraReducers: {
        [getCurrentUserAsync.pending.toString()]: (state) => {
            state.status = 'loading';
        },
        [getCurrentUserAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.status = 'idle';
            const { user } = action.payload;
            state.user = user;
        },
        [getCurrentUserAsync.rejected.toString()]: (state, action) => {
            state.status = 'loading';
        },
    },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
