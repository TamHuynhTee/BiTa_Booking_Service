import Repository from '../../../Apis/repositoryApi';
import { ReturnListResponse, ReturnResponse } from '../../../Apis/response';
import { routeCategory } from './category.route';

export const getAllCategoriesApi = async (): Promise<
    ReturnListResponse<any>
> => {
    return await Repository(routeCategory['getListCategories']);
};
