import { User } from '../../domain/user.entity.js';
import { ConflictError } from '../../../../core/exceptions.js';
import argon2 from 'argon2';
export class RegisterUserUseCase {
    userRepository;
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(dto) {
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
//# sourceMappingURL=register-user.use-case.js.map