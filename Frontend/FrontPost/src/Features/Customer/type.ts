import { IQueryApi, IQueryResult } from '../common/type';

export interface CustomerStateTypes {
    queryAppointments?: IQueryResult;
    appointment?: any;
    branchesForSelect?: any;
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
