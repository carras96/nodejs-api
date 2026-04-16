import { NextFunction,Request, Response } from 'express'

import { registerUserSchema } from '@/modules/users/application/dtos/register-user.dto'
import { RegisterUserUseCase } from '@/modules/users/application/use-cases/register-user.use-case'

export class UserController {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = registerUserSchema.parse(req.body)
      const user = await this.registerUserUseCase.execute(dto)

      res.status(201).json({
        success: true,
        data: user.toJSON(),
      })
    } catch (error) {
      next(error)
    }
  }
}
