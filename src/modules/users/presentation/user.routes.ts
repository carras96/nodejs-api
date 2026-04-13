import { Router } from 'express';
import { UserController } from './user.controller.js';
import { RegisterUserUseCase } from '../application/use-cases/register-user.use-case.js';
import { UserRepositoryImpl } from '../infrastructure/user.repository.impl.js';

const router = Router();

// Dependency Injection (Manual for this example, could use a container)
const userRepository = new UserRepositoryImpl();
const registerUserUseCase = new RegisterUserUseCase(userRepository);
const userController = new UserController(registerUserUseCase);

router.post('/register', userController.register);

export { router as userRoutes };
