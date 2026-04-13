import app from './app'
import { env } from './config/env'
import { logger } from './core/logger'
import { prisma } from './infrastructure/database/connection'

const startServer = async () => {
  try {
    // Check database connection
    logger.info('Connecting to database...')
    await prisma.$connect()
    logger.info('✅ Database connected successfully')

    const server = app.listen(env.PORT, () => {
      logger.info(`🚀 Server running in ${env.NODE_ENV} mode on port ${env.PORT}`)
      logger.info(`📖 API Documentation available at http://localhost:${env.PORT}/api-docs`)
    })

    const gracefulShutdown = async (signal: string) => {
      logger.info(`Received ${signal}. Shutting down gracefully...`)
      server.close(async () => {
        logger.info('HTTP server closed.')
        try {
          await prisma.$disconnect()
          logger.info('Database connection closed.')
          process.exit(0)
        } catch (error) {
          logger.error(error, 'Error during database disconnection:')
          process.exit(1)
        }
      })

      // Force close if it takes too long
      setTimeout(() => {
        logger.error('Could not close connections in time, forcefully shutting down')
        process.exit(1)
      }, 10000)
    }

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
    process.on('SIGINT', () => gracefulShutdown('SIGINT'))
  } catch (error) {
    logger.error(error, 'Error starting server:')
    process.exit(1)
  }
}

startServer()
