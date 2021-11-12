interface ResponseInstant {
    success: boolean;
    message: string;
    status: number;
}
export interface ReturnResponse<T> extends ResponseInstant {
    data: T;
}

export interface ReturnListResponse<T> extends ResponseInstant {
    data: Array<T>;
}
