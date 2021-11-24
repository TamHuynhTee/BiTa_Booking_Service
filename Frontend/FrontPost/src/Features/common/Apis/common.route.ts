import { ApiMethods, ApiRoutes } from '../../../Apis/defineApi';

export const routeCommon: Record<string, ApiRoutes> = {
    // Service
    getServiceDetail: {
        method: ApiMethods.GET,
        url: 'service/get-service-by-id',
    },
    queryBusiness: {
        method: ApiMethods.GET,
        url: 'business/query-business',
    },
};
