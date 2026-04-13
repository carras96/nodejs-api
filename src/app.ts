import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { rateLimit } from 'express-rate-limit'
import { errorHandler } from './core/error-handler'
import { userRoutes } from './modules/users/presentation/user.routes'
import { categoryRoutes } from './modules/categories/presentation/category.routes'
import { productRoutes } from './modules/products/presentation/product.routes'
import { logger } from './core/logger'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import path from 'path'
import { fileURLToPath } from 'url'
import { env } from './config/env'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

// Security Middleware
app.use(helmet())
app.use(cors())
app.use(express.json())

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window`
  standardHeaders: 'draft-7',
  legacyHeaders: false,
})
app.use(limiter)

// Health Check
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    env: env.NODE_ENV,
    version: '1.0.0',
  })
})

// Swagger Documentation
try {
  const swaggerDocument = YAML.load(path.join(__dirname, '../swagger.yaml'))
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
} catch {
  logger.warn('Swagger documentation not found or failed to load')
}

// Routes
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/categories', categoryRoutes)
app.use('/api/v1/products', productRoutes)

// Error Handling
app.use(errorHandler)

export default app
