import { RootState } from '../../../store/store';

export const selectCategories = (state: RootState) => state?.manager.categories;
export const selectCategoryDetail = (state: RootState) =>
    state?.manager.categoryDetail;
export const selectQueryBusiness = (state: RootState) =>
    state?.manager.queryBusiness;
export const selectBusinessDetail = (state: RootState) =>
    state?.manager.businessDetail;
