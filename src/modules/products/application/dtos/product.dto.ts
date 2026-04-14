import { z } from 'zod'

const benefitSchema = z.object({
  icon: z.string(),
  title: z.string(),
  text: z.string(),
})

export const createProductSchema = z.object({
  name: z.string().min(1),
  tag: z.string().optional(),
  price: z.number().positive(),
  image: z.string().optional(),
  description: z.string().optional(),
  benefits: z.array(benefitSchema).optional(),
  features: z.array(z.string()).optional(),
  categoryIds: z.array(z.string()).optional(), // Array of ObjectId strings
})

export const updateProductSchema = createProductSchema.partial()

export type CreateProductDto = z.infer<typeof createProductSchema>
export type UpdateProductDto = z.infer<typeof updateProductSchema>
