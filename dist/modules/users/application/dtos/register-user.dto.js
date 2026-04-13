import { z } from 'zod';
export const registerUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    firstName: z.string().max(100).optional(),
    lastName: z.string().max(100).optional(),
});
//# sourceMappingURL=register-user.dto.js.map