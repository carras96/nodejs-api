import { NotFoundError } from '@/core/exceptions'
import { Product } from '@/modules/products/domain/product.entity'
import { ProductRepository } from '@/modules/products/domain/product.repository'

export class GetProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: string): Promise<Product> {
    const product = await this.productRepository.findById(id)
    if (!product) {
      throw new NotFoundError('Product not found')
    }
    return product
  }
}
