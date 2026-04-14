export interface CategoryProps {
  id?: string
  slug: string
  name: string
  description?: string
  image?: string
  productIds?: string[]
  createdAt?: Date
  updatedAt?: Date
}

export class Category {
  id?: string
  slug: string
  name: string
  description?: string
  image?: string
  productIds: string[]
  createdAt?: Date
  updatedAt?: Date

  constructor(props: CategoryProps) {
    this.id = props.id
    this.slug = props.slug
    this.name = props.name
    this.description = props.description
    this.image = props.image
    this.productIds = props.productIds || []
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }

  toJSON() {
    return {
      id: this.id,
      slug: this.slug,
      name: this.name,
      description: this.description,
      image: this.image,
      productIds: this.productIds,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
