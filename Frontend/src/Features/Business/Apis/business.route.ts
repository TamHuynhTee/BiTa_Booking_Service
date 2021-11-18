import { ApiMethods, ApiRoutes } from '../../../Apis/defineApi';

export const routeBusiness: Record<string, ApiRoutes> = {
    // Service
    createService: {
        method: ApiMethods.POST,
        url: 'service/create-service',
    },
    updateService: {
        method: ApiMethods.PUT,
        url: 'service/update-service',
    },
    queryService: {
        method: ApiMethods.GET,
        url: 'service/query-service',
    },
    getServiceById: {
        method: ApiMethods.GET,
        url: 'service/get-service-by-id',
    },
    // Branch
    createBranch: {
        method: ApiMethods.POST,
        url: 'branch/create-branch',
    },
};
