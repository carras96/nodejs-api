import { NextFunction,Request, Response } from 'express'

import {
  createCategorySchema,
  updateCategorySchema,
} from '@/modules/categories/application/dtos/category.dto'
import { AddProductsToCategoryUseCase } from '@/modules/categories/application/use-cases/add-products-to-category.use-case'
import { CreateCategoryUseCase } from '@/modules/categories/application/use-cases/create-category.use-case'
import { DeleteCategoryUseCase } from '@/modules/categories/application/use-cases/delete-category.use-case'
import { GetCategoryUseCase } from '@/modules/categories/application/use-cases/get-category.use-case'
import { ListCategoriesUseCase } from '@/modules/categories/application/use-cases/list-categories.use-case'
import { RemoveProductsFromCategoryUseCase } from '@/modules/categories/application/use-cases/remove-products-from-category.use-case'
import { UpdateCategoryUseCase } from '@/modules/categories/application/use-cases/update-category.use-case'

export class CategoryController {
  constructor(
    private createCategoryUseCase: CreateCategoryUseCase,
    private listCategoriesUseCase: ListCategoriesUseCase,
    private getCategoryUseCase: GetCategoryUseCase,
    private updateCategoryUseCase: UpdateCategoryUseCase,
    private deleteCategoryUseCase: DeleteCategoryUseCase,
    private addProductsToCategoryUseCase: AddProductsToCategoryUseCase,
    private removeProductsFromCategoryUseCase: RemoveProductsFromCategoryUseCase,
  ) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = createCategorySchema.parse(req.body)
      const category = await this.createCategoryUseCase.execute(dto)
      res.status(201).json({ success: true, data: category.toJSON() })
    } catch (error) {
      next(error)
    }
  }

  list = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const categories = await this.listCategoriesUseCase.execute()
      res.json({ success: true, data: categories.map((c) => c.toJSON()) })
    } catch (error) {
      next(error)
    }
  }

  getBySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category = await this.getCategoryUseCase.execute(req.params.slug as string)
      res.json({ success: true, data: category.toJSON() })
    } catch (error) {
      next(error)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = updateCategorySchema.parse(req.body)
      const category = await this.updateCategoryUseCase.execute(req.params.id as string, dto)
      res.json({ success: true, data: category.toJSON() })
    } catch (error) {
      next(error)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.deleteCategoryUseCase.execute(req.params.id as string)
      res.json({ success: true, message: 'Category deleted successfully' })
    } catch (error) {
      next(error)
    }
  }

  addProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { categoryId } = req.params
      const { productIds } = req.body
      await this.addProductsToCategoryUseCase.execute(categoryId as string, productIds)
      res.json({ success: true, message: 'Products added to category successfully' })
    } catch (error) {
      next(error)
    }
  }

  removeProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { categoryId } = req.params
      const { productIds } = req.body
      await this.removeProductsFromCategoryUseCase.execute(categoryId as string, productIds)
      res.json({ success: true, message: 'Products removed from category successfully' })
    } catch (error) {
      next(error)
    }
  }
}
