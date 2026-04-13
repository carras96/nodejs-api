import { ProductRepository } from '@/modules/products/domain/product.repository'
import { NotFoundError } from '@/core/exceptions'

export class DeleteProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(id: string): Promise<void> {
    const product = await this.productRepository.findById(id)
    if (!product) {
      throw new NotFoundError('Product not found')
    }

    await this.productRepository.delete(id)
  }
}
