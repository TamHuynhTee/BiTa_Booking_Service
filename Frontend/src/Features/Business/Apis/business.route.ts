import { ApiMethods, ApiRoutes } from '../../../Apis/defineApi';

export const routeBusiness: Record<string, ApiRoutes> = {
    createService: {
        method: ApiMethods.POST,
        url: 'service/create-service',
    },
};
