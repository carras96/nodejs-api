import { Product as PrismaProduct } from '@prisma/client'

import { prisma } from '@/infrastructure/database/connection'
import { Benefit,Product } from '@/modules/products/domain/product.entity'
import { ProductRepository } from '@/modules/products/domain/product.repository'

export class PrismaProductRepository implements ProductRepository {
  async findAll(): Promise<Product[]> {
    const products = await prisma.product.findMany({
      include: { categories: true },
    })
    return products.map((p) => this.toDomain(p))
  }

  async findById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { categories: true },
    })
    return product ? this.toDomain(product) : null
  }

  async findByIds(ids: string[]): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: {
        id: { in: ids },
      },
      include: { categories: true },
    })
    return products.map((p) => this.toDomain(p))
  }

  async findByCategory(categoryId: string): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: {
        categoryIds: { has: categoryId },
      },
      include: { categories: true },
    })
    return products.map((p) => this.toDomain(p))
  }

  async save(product: Product): Promise<Product> {
    const created = await prisma.product.create({
      data: {
        name: product.name,
        tag: product.tag,
        price: product.price,
        image: product.image,
        description: product.description,
        benefits: product.benefits,
        features: product.features,
        categoryIds: product.categoryIds,
      },
      include: { categories: true },
    })
    return this.toDomain(created)
  }

  async update(id: string, product: Partial<Product>): Promise<Product> {
    const updated = await prisma.product.update({
      where: { id },
      data: {
        ...product,
        benefits: product.benefits,
        categoryIds: product.categoryIds,
      },
      include: { categories: true },
    })
    return this.toDomain(updated)
  }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({ where: { id } })
  }

  async updateCategoryBulk(
    productIds: string[],
    categoryId: string,
    action: 'connect' | 'disconnect',
  ): Promise<void> {
    await prisma.category.update({
      where: { id: categoryId },
      data: {
        products: {
          [action]: productIds.map((id) => ({ id })),
        },
      },
    })
  }

  private toDomain(raw: PrismaProduct): Product {
    return new Product({
      id: raw.id,
      name: raw.name,
      tag: raw.tag ?? undefined,
      price: raw.price,
      image: raw.image ?? undefined,
      description: raw.description ?? undefined,
      benefits: raw.benefits as unknown as Benefit[],
      features: raw.features,
      categoryIds: raw.categoryIds,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    })
  }
}
