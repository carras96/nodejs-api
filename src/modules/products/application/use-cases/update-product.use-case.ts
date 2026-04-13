import { Product } from '@/modules/products/domain/product.entity'
import { ProductRepository } from '@/modules/products/domain/product.repository'
import { UpdateProductDto } from '@/modules/products/application/dtos/product.dto'
import { NotFoundError } from '@/core/exceptions'

export class UpdateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: string, dto: UpdateProductDto): Promise<Product> {
    const product = await this.productRepository.findById(id)
    if (!product) {
      throw new NotFoundError('Product not found')
    }

    return await this.productRepository.update(id, dto)
  }
}
