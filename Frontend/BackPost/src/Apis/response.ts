interface ResponseInstant {
    message: string;
    code: number;
}
export interface ReturnResponse<T> extends ResponseInstant {
    data: T;
}

export interface ReturnListResponse<T> extends ResponseInstant {
    data: Array<T>;
}
