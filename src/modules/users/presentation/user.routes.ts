import { Router } from 'express'
import { UserController } from './user.controller'
import { RegisterUserUseCase } from '@/modules/users/application/use-cases/register-user.use-case'
import { UserRepositoryImpl } from '@/modules/users/infrastructure/user.repository.impl'

const router = Router()

// Dependency Injection (Manual for this example, could use a container)
const userRepository = new UserRepositoryImpl()
const registerUserUseCase = new RegisterUserUseCase(userRepository)
const userController = new UserController(registerUserUseCase)

router.post('/register', userController.register)

export { router as userRoutes }
