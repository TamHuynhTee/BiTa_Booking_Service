import { ApiMethods, ApiRoutes } from '../../../Apis/defineApi';

export const routeCustomer: Record<string, ApiRoutes> = {
    createAppointment: {
        method: ApiMethods.POST,
        url: 'appointment/create-appointment',
    },
    queryAppointment: {
        method: ApiMethods.GET,
        url: 'appointment/query-appointment',
    },
    getAppointmentById: {
        method: ApiMethods.GET,
        url: 'appointment/get-appointment-by-id',
    },
    updateAppointment: {
        method: ApiMethods.PUT,
        url: 'appointment/update-appointment-customer',
    },
    // Review
    countNewReviews: {
        method: ApiMethods.GET,
        url: 'review/count-new-reviews',
    },
    queryReviews: {
        method: ApiMethods.GET,
        url: 'review/query-reviews',
    },
    customerReview: {
        method: ApiMethods.PUT,
        url: 'review/customer-review',
    },
};
