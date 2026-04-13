import { Category } from '@/modules/categories/domain/category.entity'
import { CategoryRepository } from '@/modules/categories/domain/category.repository'
import { UpdateCategoryDto } from '@/modules/categories/application/dtos/category.dto'
import { NotFoundError } from '@/core/exceptions'

export class UpdateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(id: string, dto: UpdateCategoryDto): Promise<Category> {
    const category = await this.categoryRepository.findById(id)
    if (!category) {
      throw new NotFoundError('Category not found')
    }

    return await this.categoryRepository.update(id, dto)
  }
}
