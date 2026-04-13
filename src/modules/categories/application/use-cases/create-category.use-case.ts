import { Category } from '@/modules/categories/domain/category.entity'
import { CategoryRepository } from '@/modules/categories/domain/category.repository'
import { CreateCategoryDto } from '@/modules/categories/application/dtos/category.dto'
import { ConflictError } from '@/core/exceptions'

export class CreateCategoryUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(dto: CreateCategoryDto): Promise<Category> {
    const existing = await this.categoryRepository.findBySlug(dto.slug)
    if (existing) {
      throw new ConflictError('Category with this slug already exists')
    }

    const category = new Category(dto)
    return await this.categoryRepository.save(category)
  }
}
