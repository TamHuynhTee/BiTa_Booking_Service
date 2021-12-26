export interface CommonStateTypes {
    serviceDetail?: any;
    businesses?: IQueryResult;
    businessDetail?: any;
    serviceBranches?: Array<any>;
    status?: string;
}

export interface IQueryApi {
    sortBy?: string;
    limit?: number;
    page?: number;
}

export interface IUserInfo {
    surName?: string;
    firstName?: string;
    username?: string;
    email?: string;
    phone?: string;
    gender?: string;
    avatar?: string;
}

export interface IQueryServiceApi extends IQueryApi {
    name?: string;
    rating?: number;
    minPrice?: number;
    maxPrice?: number;
    isActive?: boolean;
    business?: string;
    category?: string;
}

export interface IQueryBusinessApi extends IQueryApi {
    keyword?: string;
    filter?: string;
    isActive?: boolean;
}

export interface IQueryResult {
    limit?: number;
    page?: number;
    results?: Array<any>;
    totalPages?: number;
    totalResults?: number;
}
