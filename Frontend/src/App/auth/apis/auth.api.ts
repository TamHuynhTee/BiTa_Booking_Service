import Repository from '../../../Apis/repositoryApi';
import { ILoginApi } from '../type';
import { routeAuth } from './auth.route';

export const loginApi = async (login: ILoginApi) => {
    return await Repository(routeAuth['login'], login);
};
