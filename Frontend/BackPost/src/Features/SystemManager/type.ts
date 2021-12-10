import { IQueryResult } from '../Common/type';

export interface ManagerStateTypes {
    categories?: Array<any>;
    categoryDetail?: any;
    businessDetail?: any;
    queryBusiness?: IQueryResult;
    managerStats?: IManagerStatsApi;
    managerRevenue?: any;
    status?: string;
}

export interface ICreateCategoryApi {
    name?: string;
    code?: string;
}

export interface IUpdateCategoryApi {
    categoryId?: string;
    name?: string;
    code?: string;
}

export interface IQueryBusinessApi {
    keyword?: string;
    filter?: string;
    isActive?: boolean;
    isConfirmed?: boolean;
    sortBy?: string;
    limit?: number;
    page?: number;
}

export interface IManagerStatsApi {
    serviceNumber?: number;
    businessNumber?: number;
    appointmentNumber?: number;
    categoryNumber?: number;
    services?: Array<any>;
    businesses?: Array<any>;
    appointments?: Array<any>;
}
