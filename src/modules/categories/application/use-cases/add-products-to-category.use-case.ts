import { CategoryRepository } from '@/modules/categories/domain/category.repository'
import { ProductRepository } from '@/modules/products/domain/product.repository'
import { NotFoundError } from '@/core/exceptions'

export class AddProductsToCategoryUseCase {
  constructor(
    private categoryRepository: CategoryRepository,
    private productRepository: ProductRepository,
  ) {}

  async execute(categoryId: string, productIds: string[]): Promise<void> {
    const category = await this.categoryRepository.findById(categoryId)
    if (!category) {
      throw new NotFoundError('Category not found')
    }

    await this.productRepository.updateCategoryBulk(productIds, categoryId, 'connect')
  }
}
