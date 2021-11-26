import { RootState } from '../../../store/store';

export const selectCustomerLoading = (state: RootState) =>
    state?.customer.status;
export const selectBranchesForSelect = (state: RootState) =>
    state?.customer.branchesForSelect;
