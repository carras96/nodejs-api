import { CategoryRepository } from '@/modules/categories/domain/category.repository'
import { Category } from '@/modules/categories/domain/category.entity'

export class ListCategoriesUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(): Promise<Category[]> {
    return await this.categoryRepository.findAll()
  }
}
