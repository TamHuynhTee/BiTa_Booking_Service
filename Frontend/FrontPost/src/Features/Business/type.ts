import { IQueryApi, IQueryResult } from '../common/type';

export interface BusinessStateTypes {
    services?: IQueryResult;
    branches?: IQueryResult;
    businessBranches?: Array<any>;
    businessServiceDetail?: any;
    businessBranchDetail?: any;
    servicesForSelect?: any;
    status?: string;
}

export interface IQueryBranchApi extends IQueryApi {
    keyword?: string;
    filter?: string;
    isActive?: boolean;
    business?: string;
}
