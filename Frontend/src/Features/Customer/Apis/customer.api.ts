import Repository from '../../../Apis/repositoryApi';
import { ReturnListResponse, ReturnResponse } from '../../../Apis/response';
import { routeCustomer } from './customer.route';

export const getAllCategoriesApi = async (): Promise<
    ReturnListResponse<any>
> => {
    return await Repository(routeCustomer['getListCategories']);
};
