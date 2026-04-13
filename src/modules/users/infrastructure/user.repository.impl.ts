import { prisma } from '../../../infrastructure/database/connection.js';
import { User } from '../domain/user.entity.js';
import { UserRepository } from '../domain/user.repository.js';

export class UserRepositoryImpl implements UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const result = await prisma.user.findUnique({
      where: { email },
    });
    if (!result) return null;
    return this.toDomain(result);
  }

  async findById(id: string): Promise<User | null> {
    const result = await prisma.user.findUnique({
      where: { id },
    });
    if (!result) return null;
    return this.toDomain(result);
  }

  async save(user: User): Promise<User> {
    const data = {
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    if (user.id) {
      const updated = await prisma.user.update({
        where: { id: user.id },
        data,
      });
      return this.toDomain(updated);
    }

    const inserted = await prisma.user.create({
      data,
    });
    return this.toDomain(inserted);
  }

  private toDomain(raw: {
    id: string;
    email: string;
    password: string;
    firstName: string | null;
    lastName: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): User {
    return new User({
      id: raw.id,
      email: raw.email,
      password: raw.password,
      firstName: raw.firstName,
      lastName: raw.lastName,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }
}
