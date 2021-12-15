import { IQueryApi, IQueryResult } from '../common/type';

export interface CustomerStateTypes {
    queryAppointments?: IQueryResult;
    appointment?: any;
    branchesForSelect?: any;
    newReviews?: number;
    queryReviews?: IQueryResult;
    status?: string;
}

export interface ICreateAppointment {
    customerName?: string;
    customerPhoneNumber?: string;
    business?: string;
    service?: string;
    branch?: string;
    price?: number;
    hasDeposit?: boolean;
    depositPrice?: number;
    notify?: string;
    payNow?: boolean;
    duration?: number;
    startTime?: Date;
}
export interface IQueryAppointment extends IQueryApi {
    keyword?: string;
    filter?: string;
    startTime?: Date;
    endTime?: Date;
    payment?: 'NotPaid' | 'PartialPaid' | 'FullyPaid';
    hasDeposit?: boolean;
    state?: 'Pending' | 'Done' | 'Canceled';
    notify?: 'AsScheduled' | 'MaybeSoon' | 'MaybeLate';
    customer?: string;
    business?: string;
    service?: string;
    branch?: string;
}

export interface IQueryReview extends IQueryApi {
    appointment?: string;
    customer?: string;
    service?: string;
    state?: 'Pending' | 'Reviewed';
}

export interface ICancelAppointmentApi {
    appointmentId?: string;
}
export interface IUpdateAppointmentCustomerApi {
    appointmentId?: string;
    notify?: 'AsScheduled' | 'MaybeSoon' | 'MaybeLate';
}
export interface IGetAppointmentByIdApi {
    appointmentId?: string;
}

export interface ICustomerReviewApi {
    reviewId?: string;
    rating?: number;
    comment?: string;
    review?: boolean;
}
