import { Request, Response, NextFunction } from 'express';
import { RegisterUserUseCase } from '../application/use-cases/register-user.use-case.js';
import { registerUserSchema } from '../application/dtos/register-user.dto.js';

export class UserController {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dto = registerUserSchema.parse(req.body);
      const user = await this.registerUserUseCase.execute(dto);

      res.status(201).json({
        success: true,
        data: user.toJSON(),
      });
    } catch (error) {
      next(error);
    }
  };
}
