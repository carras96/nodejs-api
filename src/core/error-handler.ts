import { Request, Response, NextFunction } from 'express'
import { AppError } from '@/core/exceptions'
import { logger } from '@/core/logger'
import { env } from '@/config/env'
import { ZodError } from 'zod'

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  logger.error(err)

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errorCode: err.errorCode,
    })
    return
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: err.issues.map((e) => ({
        path: e.path.join('.'),
        message: e.message,
      })),
    })
    return
  }

  // Fallback for unknown errors
  const isProd = env.NODE_ENV === 'production'
  res.status(500).json({
    success: false,
    message: isProd ? 'Internal Server Error' : err.message,
    stack: isProd ? undefined : err.stack,
  })
}
