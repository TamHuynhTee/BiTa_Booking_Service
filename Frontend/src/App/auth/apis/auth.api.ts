import Repository from '../../../apis/repositoryApi';
import { ILoginApi, IRegisterCustomerApi } from '../type';
import { routeAuth } from './auth.route';

export const loginApi = async (login: ILoginApi) => {
    return await Repository(routeAuth['login'], login);
};

export const registerCustomerApi = async (register: IRegisterCustomerApi) => {
    return await Repository(routeAuth['registerCustomer'], register);
};
