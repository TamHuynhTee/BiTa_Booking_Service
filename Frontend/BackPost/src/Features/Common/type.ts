export interface AuthStateTypes {
    user?: any;
    status?: string;
}

export interface ILoginApi {
    email?: string;
    password?: string;
}

export interface IUpdateProfileApi {
    username?: string;
    firstName?: string;
    surName?: string;
    phoneNumber?: string;
    dayOfBirth?: any;
    email?: string;
    gender?: string;
}

export interface IUpdateAvatarApi {
    avatar?: string;
}
export interface IChangePasswordApi {
    oldPassword?: string;
    newPassword?: string;
}

export interface IQueryResult {
    limit?: number;
    page?: number;
    results?: Array<any>;
    totalPages?: number;
    totalResults?: number;
}
