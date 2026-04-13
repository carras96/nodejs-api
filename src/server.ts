import app from './app.js';
import { env } from './config/env.js';
import { logger } from './core/logger.js';
import { prisma } from './infrastructure/database/connection.js';

const startServer = () => {
  try {
    const server = app.listen(env.PORT, () => {
      logger.info(`🚀 Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
      logger.info(`📖 API Documentation available at http://localhost:${env.PORT}/api-docs`);
    });

    const gracefulShutdown = async (signal: string) => {
      logger.info(`Received ${signal}. Shutting down gracefully...`);
      server.close(async () => {
        logger.info('HTTP server closed.');
        try {
          await prisma.$disconnect();
          logger.info('Database connection closed.');
          process.exit(0);
        } catch (error) {
          logger.error(error, 'Error during database disconnection:');
          process.exit(1);
        }
      });

      // Force close if it takes too long
      setTimeout(() => {
        logger.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  } catch (error) {
    logger.error(error, 'Error starting server:');
    process.exit(1);
  }
};

startServer();
