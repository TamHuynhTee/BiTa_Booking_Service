import { ApiMethods, ApiRoutes } from '../../../Apis/defineApi';

export const routeAdmin: Record<string, ApiRoutes> = {
    // Users
    queryUser: {
        method: ApiMethods.GET,
        url: 'users/query-user',
    },
    getUserById: {
        method: ApiMethods.GET,
        url: 'users/get-user-by-id',
    },
    changeUserAccess: {
        method: ApiMethods.PUT,
        url: 'users/change-user-access',
    },
    // Stats
    getRegisterStats: {
        method: ApiMethods.GET,
        url: 'statistic/get-user-register-statistic',
    },
    getAdminStats: {
        method: ApiMethods.GET,
        url: 'statistic/get-admin-statistic',
    },
};
