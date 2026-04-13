import { z } from 'zod';
export declare const registerUserSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type RegisterUserDto = z.infer<typeof registerUserSchema>;
