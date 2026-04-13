import { Product as PrismaProduct } from '@prisma/client'
import { prisma } from '@/infrastructure/database/connection'
import { Product } from '@/modules/products/domain/product.entity'
import { ProductRepository } from '@/modules/products/domain/product.repository'

export class PrismaProductRepository implements ProductRepository {
  async findAll(): Promise<Product[]> {
    const products = await prisma.product.findMany({
      include: { category: true },
    })
    return products.map((p) => this.toDomain(p))
  }

  async findById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    })
    return product ? this.toDomain(product) : null
  }

  async findByCategory(categoryId: string): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: { categoryId },
      include: { category: true },
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
        categoryId: product.categoryId,
      },
      include: { category: true },
    })
    return this.toDomain(created)
  }

  async update(id: string, product: Partial<Product>): Promise<Product> {
    const updated = await prisma.product.update({
      where: { id },
      data: {
        ...product,
        benefits: product.benefits,
      },
      include: { category: true },
    })
    return this.toDomain(updated)
  }

  async delete(id: string): Promise<void> {
    await prisma.product.delete({ where: { id } })
  }

  private toDomain(raw: PrismaProduct): Product {
    return new Product({
      id: raw.id,
      name: raw.name,
      tag: raw.tag ?? undefined,
      price: raw.price,
      image: raw.image ?? undefined,
      description: raw.description ?? undefined,
      benefits: raw.benefits,
      features: raw.features,
      categoryId: raw.categoryId,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    })
  }
}
