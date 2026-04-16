import { Category } from '@/modules/categories/domain/category.entity'
import { CategoryRepository } from '@/modules/categories/domain/category.repository'

export class ListCategoriesUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  async execute(): Promise<Category[]> {
    return await this.categoryRepository.findAll()
  }
}
