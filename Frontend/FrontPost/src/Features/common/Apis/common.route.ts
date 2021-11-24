import { ApiMethods, ApiRoutes } from '../../../Apis/defineApi';

export const routeCommon: Record<string, ApiRoutes> = {
    // Service
    getServiceDetail: {
        method: ApiMethods.GET,
        url: 'service/get-service-by-id',
    },
    // Business
    queryBusiness: {
        method: ApiMethods.GET,
        url: 'business/query-business',
    },
    // Branches
    getBranchesByService: {
        method: ApiMethods.GET,
        url: 'branch/get-branches-by-service',
    },
};
