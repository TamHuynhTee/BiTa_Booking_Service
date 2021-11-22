import { IQueryResult } from '../Common/type';

export interface ManagerStateTypes {
    categories?: Array<any>;
    categoryDetail?: any;
    businessDetail?: any;
    queryBusiness?: IQueryResult;
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
    sortBy?: string;
    limit?: number;
    page?: number;
}
