import { User } from '../../domain/user.entity.js';
import { UserRepository } from '../../domain/user.repository.js';
import { RegisterUserDto } from '../dtos/register-user.dto.js';
import { ConflictError } from '../../../../core/exceptions.js';
import argon2 from 'argon2';

export class RegisterUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(dto: RegisterUserDto): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictError('User with this email already exists');
    }

    const hashedPassword = await argon2.hash(dto.password);

    const user = new User({
      ...dto,
      password: hashedPassword,
    });

    return await this.userRepository.save(user);
  }
}
