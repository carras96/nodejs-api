import { prisma } from '../../../infrastructure/database/connection.js';
import { User } from '../domain/user.entity.js';
export class UserRepositoryImpl {
    async findByEmail(email) {
        const result = await prisma.user.findUnique({
            where: { email },
        });
        if (!result)
            return null;
        return this.toDomain(result);
    }
    async findById(id) {
        const result = await prisma.user.findUnique({
            where: { id },
        });
        if (!result)
            return null;
        return this.toDomain(result);
    }
    async save(user) {
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
    toDomain(raw) {
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
//# sourceMappingURL=user.repository.impl.js.map