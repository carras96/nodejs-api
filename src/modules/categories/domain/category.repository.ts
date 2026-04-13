import { Category } from './category.entity'

export interface CategoryRepository {
  findAll(): Promise<Category[]>
  findById(id: string): Promise<Category | null>
  findBySlug(slug: string): Promise<Category | null>
  save(category: Category): Promise<Category>
  update(id: string, category: Partial<Category>): Promise<Category>
  delete(id: string): Promise<void>
}
