import { ApiMethods, ApiRoutes } from '../../../Apis/defineApi';

export const routeAuth: Record<string, ApiRoutes> = {
    login: {
        method: ApiMethods.POST,
        url: 'auth/login',
    },
    registerCustomer: {
        method: ApiMethods.POST,
        url: 'auth/registerCustomer',
    },
};
