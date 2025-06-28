import type {Context} from "hono";
import type {ApiResponse} from "@/types/ApiResponse.ts";
import {sendError, sendSuccess} from "@/utils/response.ts";
import type {ContentfulStatusCode} from "hono/utils/http-status";

export async function handleServiceResponse<T>(
    c: Context,
    response: ApiResponse<T>,
    fallbackStatus: ContentfulStatusCode = 500
) {
    if (!response.success) {

        return sendError(c, {
            message: response.error.message,
            detail: response.error.details,
            stack: response.error.stack,
            status: response.statusCode ?? fallbackStatus,
        });
    }
    return sendSuccess(c, {
        message: response.message,
        status: response.statusCode ?? 200,
        data: response.data,
    });
}