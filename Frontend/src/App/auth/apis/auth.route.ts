import { ApiMethods, ApiRoutes } from '../../../apis/defineApi';

export const routeAuth: Record<string, ApiRoutes> = {
    login: {
        method: ApiMethods.POST,
        url: 'auth/login',
    },
    registerCustomer: {
        method: ApiMethods.POST,
        url: 'auth/registerCustomer',
    },
    registerBusiness: {
        method: ApiMethods.POST,
        url: 'auth/registerBusiness',
    },
    verifyEmail: {
        method: ApiMethods.POST,
        url: 'auth/verify-email',
    },
    resetPassword: {
        method: ApiMethods.POST,
        url: 'auth/reset-password',
    },
    getCurrentUser: {
        method: ApiMethods.GET,
        url: 'auth/get-current-user',
    },
    forgotPassword: {
        method: ApiMethods.POST,
        url: 'auth/forgot-password',
    },
};
