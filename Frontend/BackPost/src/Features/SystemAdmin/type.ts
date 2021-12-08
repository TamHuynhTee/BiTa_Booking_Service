import { IQueryResult } from '../Common/type';

export interface AdminStateTypes {
    queryUser?: IQueryResult;
    userDetail?: any;
    adminStats?: IAdminStatsApi;
    userStats?: any;
    status?: string;
}

export interface IQueryUserApi {
    keyword?: string;
    filter?: string;
    isActive?: boolean;
    role?: string;
    gender?: boolean;
    sortBy?: string;
    limit?: number;
    page?: number;
}

export interface IAdminStatsApi {
    userNumber?: number;
    businessNumber?: number;
    users?: Array<any>;
    businesses?: Array<any>;
}
