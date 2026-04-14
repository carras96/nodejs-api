export interface Benefit {
  icon: string
  title: string
  text: string
}

export interface ProductProps {
  id?: string
  name: string
  tag?: string
  price: number
  image?: string
  description?: string
  benefits?: Benefit[]
  features?: string[]
  categoryIds?: string[]
  createdAt?: Date
  updatedAt?: Date
}

export class Product {
  id?: string
  name: string
  tag?: string
  price: number
  image?: string
  description?: string
  benefits: Benefit[]
  features: string[]
  categoryIds: string[]
  createdAt?: Date
  updatedAt?: Date

  constructor(props: ProductProps) {
    this.id = props.id
    this.name = props.name
    this.tag = props.tag
    this.price = props.price
    this.image = props.image
    this.description = props.description
    this.benefits = props.benefits || []
    this.features = props.features || []
    this.categoryIds = props.categoryIds || []
    this.createdAt = props.createdAt
    this.updatedAt = props.updatedAt
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      tag: this.tag,
      price: this.price,
      image: this.image,
      description: this.description,
      benefits: this.benefits,
      features: this.features,
      categoryIds: this.categoryIds,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }
}
