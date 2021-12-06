import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notifyError, notifySuccess } from '../../../utils/notify';
import { AuthStateTypes } from '../type';
import { getCurrentUserAsync, loginAsync } from './thunk';

const initialState: Partial<AuthStateTypes> = {
    user: null,
    status: 'idle',
    needAuth: false,
};

export const authSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            notifySuccess('Đăng xuất thành công');
        },
        setNeedAuth: (state, action) => {
            state.needAuth = action.payload;
        },
    },
    extraReducers: {
        [loginAsync.pending.toString()]: (state) => {
            state.status = 'loading';
        },
        [loginAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.status = 'idle';
            const data = action.payload;
            if (data.code === 200) {
                if (data.data.token) {
                    localStorage.setItem('token', data.data.token);
                    localStorage.setItem('userId', data.data.userId);
                    notifySuccess('Đăng nhập thành công');
                }
            } else {
                notifyError(data.message);
            }
        },
        [loginAsync.rejected.toString()]: (state) => {
            state.status = 'idle';
        },
        [getCurrentUserAsync.pending.toString()]: (state) => {
            state.status = 'loading';
        },
        [getCurrentUserAsync.fulfilled.toString()]: (
            state,
            action: PayloadAction<any>
        ) => {
            state.status = 'idle';
            state.user = action.payload;
        },
        [getCurrentUserAsync.rejected.toString()]: (state, action) => {
            state.status = 'loading';
            state.user = action.payload;
        },
    },
});

export const { logoutUser, setNeedAuth } = authSlice.actions;
export default authSlice.reducer;
