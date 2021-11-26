import { RootState } from '../../../store/store';

export const selectCategories = (state: RootState) =>
    state?.category?.categories;
