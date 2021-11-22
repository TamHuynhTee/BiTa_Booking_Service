import Repository from '../../../Apis/repositoryApi';
import { ReturnListResponse, ReturnResponse } from '../../../Apis/response';
import {
    ICreateCategoryApi,
    IQueryBusinessApi,
    IUpdateCategoryApi,
} from '../type';
import { routeManager } from './systemmanager.route';

export const createCategoryApi = async (
    payload: ICreateCategoryApi
): Promise<ReturnResponse<any>> => {
    return await Repository(routeManager['createCategory'], payload);
};

export const updateCategoryApi = async (
    payload: IUpdateCategoryApi
): Promise<ReturnResponse<any>> => {
    return await Repository(routeManager['updateCategory'], payload);
};

export const getAllCategoriesApi = async (): Promise<
    ReturnListResponse<any>
> => {
    return await Repository(routeManager['getAllCategories']);
};

export const getCategoryByIdApi = async (
    categoryId: string
): Promise<ReturnListResponse<any>> => {
    return await Repository(routeManager['getCategoryById'], categoryId);
};

// Business
export const queryBusinessApi = async (
    query: IQueryBusinessApi
): Promise<ReturnResponse<any>> => {
    return await Repository(routeManager['queryBusiness'], query);
};

export const getBusinessByIdApi = async (
    businessId: string
): Promise<ReturnListResponse<any>> => {
    return await Repository(routeManager['getBusinessById'], businessId);
};
