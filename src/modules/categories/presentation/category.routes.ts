import { Router } from 'express'

import { AddProductsToCategoryUseCase } from '@/modules/categories/application/use-cases/add-products-to-category.use-case'
import { CreateCategoryUseCase } from '@/modules/categories/application/use-cases/create-category.use-case'
import { DeleteCategoryUseCase } from '@/modules/categories/application/use-cases/delete-category.use-case'
import { GetCategoryUseCase } from '@/modules/categories/application/use-cases/get-category.use-case'
import { ListCategoriesUseCase } from '@/modules/categories/application/use-cases/list-categories.use-case'
import { RemoveProductsFromCategoryUseCase } from '@/modules/categories/application/use-cases/remove-products-from-category.use-case'
import { UpdateCategoryUseCase } from '@/modules/categories/application/use-cases/update-category.use-case'
import { PrismaCategoryRepository } from '@/modules/categories/infrastructure/category.repository.impl'
import { PrismaProductRepository } from '@/modules/products/infrastructure/product.repository.impl'

import { CategoryController } from './category.controller'

const router = Router()

// Dependency Injection
const categoryRepository = new PrismaCategoryRepository()
const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository)
const listCategoriesUseCase = new ListCategoriesUseCase(categoryRepository)
const getCategoryUseCase = new GetCategoryUseCase(categoryRepository)

const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository)
const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository)

const productRepository = new PrismaProductRepository()
const addProductsToCategoryUseCase = new AddProductsToCategoryUseCase(
  categoryRepository,
  productRepository,
)
const removeProductsFromCategoryUseCase = new RemoveProductsFromCategoryUseCase(
  categoryRepository,
  productRepository,
)

const categoryController = new CategoryController(
  createCategoryUseCase,
  listCategoriesUseCase,
  getCategoryUseCase,
  updateCategoryUseCase,
  deleteCategoryUseCase,
  addProductsToCategoryUseCase,
  removeProductsFromCategoryUseCase,
)

router.get('/', categoryController.list)
router.get('/:slug', categoryController.getBySlug)
router.post('/create', categoryController.create)
router.put('/:id/update', categoryController.update)
router.delete('/:id/delete', categoryController.delete)
router.post('/:categoryId/add-products', categoryController.addProducts)
router.delete('/:categoryId/remove-products', categoryController.removeProducts)

export { router as categoryRoutes }
