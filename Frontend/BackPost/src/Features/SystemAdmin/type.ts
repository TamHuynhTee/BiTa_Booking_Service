import { IQueryResult } from '../Common/type';

export interface AdminStateTypes {
    queryUser?: IQueryResult;
    userDetail?: any;
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
