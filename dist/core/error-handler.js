import { AppError } from './exceptions.js';
import { logger } from './logger.js';
import { env } from '../config/env.js';
import { ZodError } from 'zod';
export const errorHandler = (err, _req, res, _next) => {
    logger.error(err);
    if (err instanceof AppError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errorCode: err.errorCode,
        });
        return;
    }
    if (err instanceof ZodError) {
        res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: err.issues.map((e) => ({
                path: e.path.join('.'),
                message: e.message,
            })),
        });
        return;
    }
    // Fallback for unknown errors
    const isProd = env.NODE_ENV === 'production';
    res.status(500).json({
        success: false,
        message: isProd ? 'Internal Server Error' : err.message,
        stack: isProd ? undefined : err.stack,
    });
};
//# sourceMappingURL=error-handler.js.map