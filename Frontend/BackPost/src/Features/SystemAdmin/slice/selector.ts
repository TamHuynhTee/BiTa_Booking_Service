import { RootState } from '../../../store/store';

export const selectQueryUser = (state: RootState) => state?.admin.queryUser;
export const selectDetailUser = (state: RootState) => state?.admin.userDetail;
