import { RootState } from '../../../store/store';

export const selectCustomerLoading = (state: RootState) =>
    state?.customer.status;
export const selectBranchesForSelect = (state: RootState) =>
    state?.customer.branchesForSelect;
export const selectQueryAppointments = (state: RootState) =>
    state?.customer.queryAppointments;
export const selectAppointmentDetail = (state: RootState) =>
    state?.customer.appointment;
export const selectNewReviews = (state: RootState) =>
    state?.customer.newReviews;
export const selectQueryReviews = (state: RootState) =>
    state?.customer.queryReviews;
