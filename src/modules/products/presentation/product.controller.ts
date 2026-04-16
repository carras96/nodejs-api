import { NextFunction,Request, Response } from 'express'

import {
  createProductSchema,
  updateProductSchema,
} from '@/modules/products/application/dtos/product.dto'
import { CreateProductUseCase } from '@/modules/products/application/use-cases/create-product.use-case'
import { DeleteProductUseCase } from '@/modules/products/application/use-cases/delete-product.use-case'
import { GetProductUseCase } from '@/modules/products/application/use-cases/get-product.use-case'
import { ListProductsUseCase } from '@/modules/products/application/use-cases/list-products.use-case'
import { UpdateProductUseCase } from '@/modules/products/application/use-cases/update-product.use-case'

export class ProductController {
  constructor(
    private createProductUseCase: CreateProductUseCase,
    private listProductsUseCase: ListProductsUseCase,
    private getProductUseCase: GetProductUseCase,
    private updateProductUseCase: UpdateProductUseCase,
    private deleteProductUseCase: DeleteProductUseCase,
  ) {}

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = createProductSchema.parse(req.body)
      const product = await this.createProductUseCase.execute(dto)
      res.status(201).json({ success: true, data: product.toJSON() })
    } catch (error) {
      next(error)
    }
  }

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { productIds } = req.query
      let ids: string[] | undefined

      if (typeof productIds === 'string') {
        ids = productIds.split(',').map((id) => id.trim())
      } else if (Array.isArray(productIds)) {
        ids = productIds as string[]
      }

      const products = await this.listProductsUseCase.execute(ids)
      res.json({ success: true, data: products.map((p) => p.toJSON()) })
    } catch (error) {
      next(error)
    }
  }

  getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await this.getProductUseCase.execute(req.params.id as string)
      res.json({ success: true, data: product.toJSON() })
    } catch (error) {
      next(error)
    }
  }

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = updateProductSchema.parse(req.body)
      const product = await this.updateProductUseCase.execute(req.params.id as string, dto)
      res.json({ success: true, data: product.toJSON() })
    } catch (error) {
      next(error)
    }
  }

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.deleteProductUseCase.execute(req.params.id as string)
      res.json({ success: true, message: 'Product deleted successfully' })
    } catch (error) {
      next(error)
    }
  }
}
