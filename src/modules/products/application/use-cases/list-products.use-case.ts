import { Product } from '@/modules/products/domain/product.entity'
import { ProductRepository } from '@/modules/products/domain/product.repository'

export class ListProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(productIds?: string[]): Promise<Product[]> {
    if (productIds && productIds.length > 0) {
      return await this.productRepository.findByIds(productIds)
    }
    return await this.productRepository.findAll()
  }
}
