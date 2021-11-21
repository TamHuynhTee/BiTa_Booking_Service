import { ApiMethods, ApiRoutes } from '../../../Apis/defineApi';

export const routeCategory: Record<string, ApiRoutes> = {
    getListCategories: {
        method: ApiMethods.GET,
        url: 'category/get-all-categories',
    },
};
