import { Request, Response, NextFunction } from 'express'
import { RegisterUserUseCase } from '@/modules/users/application/use-cases/register-user.use-case'
import { registerUserSchema } from '@/modules/users/application/dtos/register-user.dto'

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
