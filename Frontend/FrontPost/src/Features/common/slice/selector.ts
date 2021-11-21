import { RootState } from '../../../store/store';

export const selectServiceDetail = (state: RootState) =>
    state?.common.serviceDetail;
