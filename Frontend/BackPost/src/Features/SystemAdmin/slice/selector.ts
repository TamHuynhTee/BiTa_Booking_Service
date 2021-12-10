import { RootState } from '../../../store/store';

export const selectQueryUser = (state: RootState) => state?.admin.queryUser;
export const selectAdminLoading = (state: RootState) => state?.admin.status;
export const selectDetailUser = (state: RootState) => state?.admin.userDetail;
export const selectUserStats = (state: RootState) => state?.admin.userStats;
export const selectAdminStats = (state: RootState) => state?.admin.adminStats;
