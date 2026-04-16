import { Category as PrismaCategory, Prisma } from '@prisma/client'

import { prisma } from '@/infrastructure/database/connection'
import { Category } from '@/modules/categories/domain/category.entity'
import { CategoryRepository } from '@/modules/categories/domain/category.repository'

export class PrismaCategoryRepository implements CategoryRepository {
  async findAll(): Promise<Category[]> {
    const categories = await prisma.category.findMany()
    return categories.map((c) => this.toDomain(c))
  }

  async findById(id: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({ where: { id } })
    return category ? this.toDomain(category) : null
  }

  async findBySlug(slug: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({ where: { slug } })
    return category ? this.toDomain(category) : null
  }

  async save(category: Category): Promise<Category> {
    const created = await prisma.category.create({
      data: {
        slug: category.slug,
        name: category.name,
        description: category.description,
        image: category.image,
        productIds: category.productIds,
      },
    })
    return this.toDomain(created)
  }

  async update(id: string, category: Partial<Category>): Promise<Category> {
    const updated = await prisma.category.update({
      where: { id },
      data: {
        slug: category.slug,
        name: category.name,
        description: category.description,
        image: category.image,
        productIds: category.productIds,
      } as Prisma.CategoryUpdateInput,
    })
    return this.toDomain(updated)
  }

  async delete(id: string): Promise<void> {
    await prisma.category.delete({ where: { id } })
  }

  private toDomain(raw: PrismaCategory): Category {
    return new Category({
      id: raw.id,
      slug: raw.slug,
      name: raw.name,
      description: raw.description || undefined,
      image: raw.image || undefined,
      productIds: raw.productIds,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    })
  }
}
