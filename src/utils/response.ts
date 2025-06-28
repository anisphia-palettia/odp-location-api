import type {Context} from "hono";
import {appConfig} from "@/config/app-config.ts";
import type {ContentfulStatusCode} from "hono/utils/http-status";

type ApiResponseSuccess<T = any> = {
    success: boolean;
    data?: T;
    message: string;
    token?: string;
};

type ApiResponseError = {
    success: boolean;
    error: {
        message: string;
        details?: any;
        stack?: string;
    };
};

export function sendSuccess<T = any>(
    c: Context,
    {
        message,
        status = 200,
        data,
        token,
    }: {
        message: string;
        status?: ContentfulStatusCode;
        data?: T;
        token?: string;
    }
) {
    return c.json<ApiResponseSuccess>(
        {
            success: true,
            message: message,
            data: data,
            token: token,
        },
        status
    );
}

export function sendError(
    c: Context,
    {
        message,
        detail,
        stack,
        status,
    }: {
        message: string;
        detail?: any;
        stack?: string;
        status: ContentfulStatusCode;
    }
) {
    return c.json<ApiResponseError>(
        {
            success: false,
            error: {
                message: message,
                details: detail,
                ...(appConfig.nodeEnv !== "production" ? {stack} : {}),
            },
        },
        status
    );
}