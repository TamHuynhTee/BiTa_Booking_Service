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
    registerBusiness: {
        method: ApiMethods.POST,
        url: 'auth/registerBusiness',
    },
    verifyEmail: {
        method: ApiMethods.GET,
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
    updateProfile: {
        method: ApiMethods.PUT,
        url: 'auth/update-profile',
    },
    updateBusiness: {
        method: ApiMethods.PUT,
        url: 'business/update-business-info',
    },
    updateAvatar: {
        method: ApiMethods.PUT,
        url: 'auth/update-avatar',
    },
    changePassword: {
        method: ApiMethods.PUT,
        url: 'auth/change-password',
    },
};
