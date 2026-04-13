export class AppError extends Error {
    message;
    statusCode;
    errorCode;
    constructor(message, statusCode = 500, errorCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
export class BadRequestError extends AppError {
    constructor(message = 'Bad Request', errorCode = 'BAD_REQUEST') {
        super(message, 400, errorCode);
    }
}
export class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized', errorCode = 'UNAUTHORIZED') {
        super(message, 401, errorCode);
    }
}
export class ForbiddenError extends AppError {
    constructor(message = 'Forbidden', errorCode = 'FORBIDDEN') {
        super(message, 403, errorCode);
    }
}
export class NotFoundError extends AppError {
    constructor(message = 'Not Found', errorCode = 'NOT_FOUND') {
        super(message, 404, errorCode);
    }
}
export class ConflictError extends AppError {
    constructor(message = 'Conflict', errorCode = 'CONFLICT') {
        super(message, 409, errorCode);
    }
}
export class InternalServerError extends AppError {
    constructor(message = 'Internal Server Error', errorCode = 'INTERNAL_SERVER_ERROR') {
        super(message, 500, errorCode);
    }
}
//# sourceMappingURL=exceptions.js.map