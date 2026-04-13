import { User } from '../domain/user.entity.js';
import { UserRepository } from '../domain/user.repository.js';
export declare class UserRepositoryImpl implements UserRepository {
    findByEmail(email: string): Promise<User | null>;
    findById(id: string): Promise<User | null>;
    save(user: User): Promise<User>;
    private toDomain;
}
