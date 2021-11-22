import { ApiMethods, ApiRoutes } from '../../../Apis/defineApi';

export const routeAuth: Record<string, ApiRoutes> = {
    login: {
        method: ApiMethods.POST,
        url: 'auth/login',
    },
    getCurrentUser: {
        method: ApiMethods.GET,
        url: 'auth/get-current-user',
    },
    updateProfile: {
        method: ApiMethods.PUT,
        url: 'auth/update-profile',
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
