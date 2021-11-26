import { RootState } from '../../../store/store';

export const selectServices = (state: RootState) => state?.business.services;
export const selectLoading = (state: RootState) => state?.business.status;
export const selectBranches = (state: RootState) => state?.business.branches;
export const selectServicesForSelect = (state: RootState) =>
    state?.business.servicesForSelect;
export const selectServiceDetail = (state: RootState) =>
    state?.business.businessServiceDetail;
export const selectBranchDetail = (state: RootState) =>
    state?.business.businessBranchDetail;
export const selectBusinessBranches = (state: RootState) =>
    state?.business.businessBranches;
