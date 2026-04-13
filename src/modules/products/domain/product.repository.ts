import { Product } from './product.entity'

export interface ProductRepository {
  findAll(): Promise<Product[]>
  findById(id: string): Promise<Product | null>
  findByCategory(categoryId: string): Promise<Product[]>
  save(product: Product): Promise<Product>
  update(id: string, product: Partial<Product>): Promise<Product>
  delete(id: string): Promise<void>
}
