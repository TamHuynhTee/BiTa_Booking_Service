export interface CustomerStateTypes {
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
    paid?: boolean;
    duration?: number;
    startTime?: Date;
}
