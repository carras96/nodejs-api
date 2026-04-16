import argon2 from 'argon2'

import { ConflictError } from '@/core/exceptions'
import { RegisterUserDto } from '@/modules/users/application/dtos/register-user.dto'
import { User } from '@/modules/users/domain/user.entity'
import { UserRepository } from '@/modules/users/domain/user.repository'

export class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(dto: RegisterUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(dto.email)
    if (existingUser) {
      throw new ConflictError('User with this email already exists')
    }

    const hashedPassword = await argon2.hash(dto.password)

    const user = new User({
      ...dto,
      password: hashedPassword,
    })

    return await this.userRepository.save(user)
  }
}
