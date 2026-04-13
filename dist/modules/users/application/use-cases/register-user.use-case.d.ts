import { User } from '../../domain/user.entity.js';
import { UserRepository } from '../../domain/user.repository.js';
import { RegisterUserDto } from '../dtos/register-user.dto.js';
export declare class RegisterUserUseCase {
    private userRepository;
    constructor(userRepository: UserRepository);
    execute(dto: RegisterUserDto): Promise<User>;
}
