import { z } from 'zod'

export const createCategorySchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  image: z.string().optional(),
  productIds: z.array(z.string()).optional(),
})

export const updateCategorySchema = createCategorySchema.partial()

export type CreateCategoryDto = z.infer<typeof createCategorySchema>
export type UpdateCategoryDto = z.infer<typeof updateCategorySchema>
