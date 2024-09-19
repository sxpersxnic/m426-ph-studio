import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { posts, revenue, users } from '@/lib/placeholder-data';

const client = await db.connect();

async function seedUsers() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await client.sql`
    CREATE TABLE IF NOT EXISTS users (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL
    );
  `;

  const insertedUsers = await Promise.all(
    users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return client.sql`
        INSERT INTO users (id, username, email, image_url, password)
        VALUES (${user.id}, ${user.username}, ${user.email}, ${user.image_url}, ${hashedPassword})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedUsers;
}

async function seedPosts() {
  await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await client.sql`
    CREATE TABLE IF NOT EXISTS posts (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      author_id UUID NOT NULL,
      title TEXT NOT NULL,
      body TEXT NOT NULL,
      date DATE NOT NULL,
      CONSTRAINT fk_author
      FOREIGN KEY (author_id) REFERENCES users(id)
    );
  `;

  const insertedPosts = await Promise.all(
    posts.map(
      (post) => client.sql`
        INSERT INTO posts (id, author_id, title, body, date)
        VALUES (${post.id}, ${post.author_id}, ${post.title}, ${post.body}, ${post.date})
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedPosts;
}

async function seedRevenue() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS revenue (
      month VARCHAR(4) NOT NULL UNIQUE,
      revenue INT NOT NULL
    );
  `;

  const insertedRevenue = await Promise.all(
    revenue.map(
      (rev) => client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `,
    ),
  );

  return insertedRevenue;
}

export async function GET() {
  try {
    console.log("Starting database seeding...");
    await client.sql`BEGIN`;
    console.log("Seeding users...");
    await seedUsers();
    console.log("Seeding posts...");
    await seedPosts();
    console.log("Seeding revenue...");
    await seedRevenue();
    console.log("Seedings completed, commiting...");
    await client.sql`COMMIT`;
    
    console.log("Successfully committed!");
    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
