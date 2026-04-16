import { CreateProductDto } from '@/modules/products/application/dtos/product.dto'
import { Product } from '@/modules/products/domain/product.entity'
import { ProductRepository } from '@/modules/products/domain/product.repository'

export class CreateProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(dto: CreateProductDto): Promise<Product> {
    const product = new Product(dto)
    return await this.productRepository.save(product)
  }
}
