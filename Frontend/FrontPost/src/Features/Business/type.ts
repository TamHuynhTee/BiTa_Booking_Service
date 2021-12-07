import { IQueryApi, IQueryResult } from '../common/type';

export interface BusinessStateTypes {
    services?: IQueryResult;
    branches?: IQueryResult;
    businessBranches?: Array<any>;
    businessServiceDetail?: any;
    businessBranchDetail?: any;
    servicesForSelect?: any;
    stats?: IBusinessStatsApi;
    revenue?: any;
    status?: string;
}

export interface IQueryBranchApi extends IQueryApi {
    keyword?: string;
    filter?: string;
    isActive?: boolean;
    business?: string;
}

export interface IBusinessStatsApi {
    appointmentNumber?: number;
    branchNumber?: number;
    serviceNumber?: number;
    appointments?: Array<number>;
    branches?: Array<number>;
    services?: Array<number>;
}
