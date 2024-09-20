import {
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from 'drizzle-orm/pg-core';

// Users Table
export const UsersTable = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().default(crypto.randomUUID()).notNull(),
    username: text('username').notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
    image_url: text('image_url').notNull(),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex('unique_idx').on(users.email, users.username),
    };
  },
);

// Posts Table
export const PostsTable = pgTable(
  'posts',
  {
    id: uuid('id').primaryKey().default(crypto.randomUUID()).notNull(),
    author_id: uuid('author_id').notNull().references(() => UsersTable.id),
    title: text('title').notNull(),
    body: text('body').notNull(),
    created_at: timestamp('created_at').defaultNow(),
  },
);