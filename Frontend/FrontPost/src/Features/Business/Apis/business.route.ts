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
    getAllService: {
        method: ApiMethods.GET,
        url: 'service/get-all-services',
    },
    updateServiceActivation: {
        method: ApiMethods.PUT,
        url: 'service/change-service-activation',
    },
    // Branch
    createBranch: {
        method: ApiMethods.POST,
        url: 'branch/create-branch',
    },
    queryBranch: {
        method: ApiMethods.GET,
        url: 'branch/query-branch',
    },
    getBranchById: {
        method: ApiMethods.GET,
        url: 'branch/get-branch-by-id',
    },
    updateBranch: {
        method: ApiMethods.PUT,
        url: 'branch/update-branch',
    },
    getAllBranch: {
        method: ApiMethods.GET,
        url: 'branch/get-all-branches',
    },
    updateBranchActivation: {
        method: ApiMethods.PUT,
        url: 'branch/change-branch-activation',
    },
    // Business
    setHeadquarter: {
        method: ApiMethods.PUT,
        url: 'business/set-headquarter',
    },
    // Appointment
    doneAppointment: {
        method: ApiMethods.PUT,
        url: 'appointment/done-appointment',
    },
    // Statistics
    businessStats: {
        method: ApiMethods.GET,
        url: 'statistic/get-business-statistic',
    },
    businessRevenue: {
        method: ApiMethods.GET,
        url: 'statistic/get-business-revenue',
    },
};
