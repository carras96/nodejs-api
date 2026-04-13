import { ProductRepository } from '@/modules/products/domain/product.repository'
import { Product } from '@/modules/products/domain/product.entity'

export class ListProductsUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(categoryId?: string): Promise<Product[]> {
    if (categoryId) {
      return await this.productRepository.findByCategory(categoryId)
    }
    return await this.productRepository.findAll()
  }
}
