import { ApiMethods, ApiRoutes } from '../../../Apis/defineApi';

export const routeManager: Record<string, ApiRoutes> = {
    createCategory: {
        method: ApiMethods.POST,
        url: 'category/create-category',
    },
    updateCategory: {
        method: ApiMethods.PUT,
        url: 'category/update-category',
    },
    getAllCategories: {
        method: ApiMethods.GET,
        url: 'category/get-all-categories',
    },
    getCategoryById: {
        method: ApiMethods.GET,
        url: 'category/get-category-by-id',
    },
    // Business
    queryBusiness: {
        method: ApiMethods.GET,
        url: 'business/query-business',
    },
    getBusinessById: {
        method: ApiMethods.GET,
        url: 'business/get-business-by-id',
    },
};
