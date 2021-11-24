import { RootState } from '../../../store/store';

export const selectCommonLoading = (state: RootState) => state?.common.status;
export const selectServiceDetail = (state: RootState) =>
    state?.common.serviceDetail;
export const selectBusinessDetail = (state: RootState) =>
    state?.common.businessDetail;
export const selectQueryBusiness = (state: RootState) =>
    state?.common.businesses;
