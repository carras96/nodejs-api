import { pgTable, uuid, varchar, timestamp, text } from 'drizzle-orm/pg-core';
export const users = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    password: text('password').notNull(),
    firstName: varchar('firstName', { length: 100 }),
    lastName: varchar('lastName', { length: 100 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
//# sourceMappingURL=schema.js.map