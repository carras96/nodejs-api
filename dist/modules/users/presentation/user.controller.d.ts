import { Request, Response, NextFunction } from 'express';
import { RegisterUserUseCase } from '../application/use-cases/register-user.use-case.js';
export declare class UserController {
    private registerUserUseCase;
    constructor(registerUserUseCase: RegisterUserUseCase);
    register: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
