import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { notifyError, notifySuccess } from '../../../utils/notify';
import { AuthStateTypes } from '../type';
import { loginAsync } from './thunk';

const initialState: Partial<AuthStateTypes> = {
    user: null,
    status: 'idle',
};

export const authSlice = createSlice({
    name: 'Auth',
    initialState,
    reducers: {},
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
            if (data) {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    delete data.token;
                    notifySuccess('Đăng nhập thành công');
                }
            } else {
                notifyError('Đăng nhập thất bại');
            }
        },
        [loginAsync.rejected.toString()]: (state) => {
            state.status = 'idle';
        },
    },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
