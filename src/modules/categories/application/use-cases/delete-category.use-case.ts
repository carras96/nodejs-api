import { NotFoundError } from '@/core/exceptions'
import { CategoryRepository } from '@/modules/categories/domain/category.repository'

export class DeleteCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(id: string): Promise<void> {
    const category = await this.categoryRepository.findById(id)
    if (!category) {
      throw new NotFoundError('Category not found')
    }

    await this.categoryRepository.delete(id)
  }
}
