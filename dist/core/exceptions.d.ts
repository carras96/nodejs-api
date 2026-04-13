export declare class AppError extends Error {
    message: string;
    statusCode: number;
    errorCode?: string | undefined;
    constructor(message: string, statusCode?: number, errorCode?: string | undefined);
}
export declare class BadRequestError extends AppError {
    constructor(message?: string, errorCode?: string);
}
export declare class UnauthorizedError extends AppError {
    constructor(message?: string, errorCode?: string);
}
export declare class ForbiddenError extends AppError {
    constructor(message?: string, errorCode?: string);
}
export declare class NotFoundError extends AppError {
    constructor(message?: string, errorCode?: string);
}
export declare class ConflictError extends AppError {
    constructor(message?: string, errorCode?: string);
}
export declare class InternalServerError extends AppError {
    constructor(message?: string, errorCode?: string);
}
