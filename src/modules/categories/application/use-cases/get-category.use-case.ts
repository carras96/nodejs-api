import { CategoryRepository } from '@/modules/categories/domain/category.repository'
import { Category } from '@/modules/categories/domain/category.entity'
import { NotFoundError } from '@/core/exceptions'

export class GetCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(slug: string): Promise<Category> {
    const category = await this.categoryRepository.findBySlug(slug)
    if (!category) {
      throw new NotFoundError('Category not found')
    }
    return category
  }
}
