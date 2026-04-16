import { Router } from 'express'

import { CreateProductUseCase } from '@/modules/products/application/use-cases/create-product.use-case'
import { DeleteProductUseCase } from '@/modules/products/application/use-cases/delete-product.use-case'
import { GetProductUseCase } from '@/modules/products/application/use-cases/get-product.use-case'
import { ListProductsUseCase } from '@/modules/products/application/use-cases/list-products.use-case'
import { UpdateProductUseCase } from '@/modules/products/application/use-cases/update-product.use-case'
import { PrismaProductRepository } from '@/modules/products/infrastructure/product.repository.impl'

import { ProductController } from './product.controller'

const router = Router()

const productRepository = new PrismaProductRepository()
const createProductUseCase = new CreateProductUseCase(productRepository)
const listProductsUseCase = new ListProductsUseCase(productRepository)
const getProductUseCase = new GetProductUseCase(productRepository)
const updateProductUseCase = new UpdateProductUseCase(productRepository)
const deleteProductUseCase = new DeleteProductUseCase(productRepository)

const productController = new ProductController(
  createProductUseCase,
  listProductsUseCase,
  getProductUseCase,
  updateProductUseCase,
  deleteProductUseCase,
)

router.get('/', productController.list)
router.get('/:id', productController.getById)
router.post('/create', productController.create)
router.put('/:id/update', productController.update)
router.delete('/:id/delete', productController.delete)

export { router as productRoutes }
