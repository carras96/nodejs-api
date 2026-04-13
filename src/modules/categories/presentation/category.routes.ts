import { Router } from 'express'
import { CategoryController } from './category.controller'
import { CreateCategoryUseCase } from '@/modules/categories/application/use-cases/create-category.use-case'
import { ListCategoriesUseCase } from '@/modules/categories/application/use-cases/list-categories.use-case'
import { GetCategoryUseCase } from '@/modules/categories/application/use-cases/get-category.use-case'
import { UpdateCategoryUseCase } from '@/modules/categories/application/use-cases/update-category.use-case'
import { DeleteCategoryUseCase } from '@/modules/categories/application/use-cases/delete-category.use-case'
import { PrismaCategoryRepository } from '@/modules/categories/infrastructure/category.repository.impl'

const router = Router()

// Dependency Injection
const categoryRepository = new PrismaCategoryRepository()
const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository)
const listCategoriesUseCase = new ListCategoriesUseCase(categoryRepository)
const getCategoryUseCase = new GetCategoryUseCase(categoryRepository)

const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository)
const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository)

const categoryController = new CategoryController(
  createCategoryUseCase,
  listCategoriesUseCase,
  getCategoryUseCase,
  updateCategoryUseCase,
  deleteCategoryUseCase,
)

router.get('/', categoryController.list)
router.get('/:slug', categoryController.getBySlug)
router.post('/', categoryController.create)
router.put('/:id', categoryController.update)
router.delete('/:id', categoryController.delete)

export { router as categoryRoutes }
