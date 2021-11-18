import { RootState } from '../../../store/store';

export const selectServices = (state: RootState) => state?.business.services;
export const selectServiceDetail = (state: RootState) =>
    state?.business.businessServiceDetail;
