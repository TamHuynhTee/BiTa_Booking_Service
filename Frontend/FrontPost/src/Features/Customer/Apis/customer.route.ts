import { ApiMethods, ApiRoutes } from '../../../Apis/defineApi';

export const routeCustomer: Record<string, ApiRoutes> = {
    createAppointment: {
        method: ApiMethods.POST,
        url: 'appointment/create-appointment',
    },
};
