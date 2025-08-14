import { createError } from "h3";

export type AppErrorCode =
    | "BAD_REQUEST"
    | "UNAUTHORIZED"
    | "FORBIDDEN"
    | "NOT_FOUND"
    | "CONFLICT"
    | "VALIDATION_ERROR"
    | "INTERNAL_SERVER_ERROR"
    | (string & {});

export interface AppErrorPayload {
    statusCode: number;
    code?: AppErrorCode;
    message: string;
    details?: unknown;
}

export function createAppError({ statusCode, code, message, details }: AppErrorPayload) {
    const defaultCode = mapStatusCodeToCode(statusCode);
    return createError({
        statusCode,
        statusMessage: message,
        data: {
            code: code ?? defaultCode,
            details,
        },
    });
}

export function mapStatusCodeToCode(statusCode: number): AppErrorCode {
    switch (statusCode) {
        case 400:
            return "BAD_REQUEST";
        case 401:
            return "UNAUTHORIZED";
        case 403:
            return "FORBIDDEN";
        case 404:
            return "NOT_FOUND";
        case 409:
            return "CONFLICT";
        case 422:
            return "VALIDATION_ERROR";
        case 429:
            return "EXCEEDED_RATE_LIMIT";
        default:
            return "INTERNAL_SERVER_ERROR";
    }
}

