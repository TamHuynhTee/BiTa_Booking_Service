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
export const selectBusinessStats = (state: RootState) => state?.business.stats;
export const selectBusinessRevenue = (state: RootState) =>
    state?.business.revenue;
export const selectProvinces = (state: RootState) => state?.business.provinces;
export const selectDistricts = (state: RootState) => state?.business.districts;
export const selectWards = (state: RootState) => state?.business.wards;
