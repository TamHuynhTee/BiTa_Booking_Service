import { ApiMethods, ApiRoutes } from '../../../Apis/defineApi';

export const routeBusiness: Record<string, ApiRoutes> = {
    // Service
    createService: {
        method: ApiMethods.POST,
        url: 'service/create-service',
    },
    queryService: {
        method: ApiMethods.GET,
        url: 'service/query-service',
    },
    // Branch
    createBranch: {
        method: ApiMethods.POST,
        url: 'branch/create-branch',
    },
};
