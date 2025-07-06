import type {ContentfulStatusCode} from "hono/utils/http-status";

export type ApiResponseSuccess<T = any> = {
    success: true;
    origin: string
    message: string;
    data?: T;
    statusCode?: ContentfulStatusCode;
    token?: string;
};

export type ApiResponseError = {
    success: false;
    origin: string
    statusCode?: ContentfulStatusCode;
    error: {
        message: string;
        details?: any;
        stack?: string;
    };
};

export type ApiResponse<T = any> = ApiResponseSuccess<T> | ApiResponseError;