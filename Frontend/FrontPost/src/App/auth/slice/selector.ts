import { RootState } from '../../../store/store';

export const selectUser = (state: RootState) => state?.auth?.user;
export const selectGoBack = (state: RootState) => state?.auth?.needAuth;
