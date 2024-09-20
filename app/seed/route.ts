import { posts, users } from '@/lib/placeholder-data';
import * as schema from '@/drizzle/schema';
import { db } from '@/drizzle/db';

async function seedDatabase() {

  for (const user of users) {

    await db.insert(schema.UsersTable).values({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      image_url: user.image_url || '',
    }).execute();
  }
  
  for (const post of posts) {

    await db.insert(schema.PostsTable).values({
      id: post.id,
      author_id: post.author_id,
      title: post.title,
      body: post.body,
      created_at: new Date(post.date),
    }).execute();
  } 

  console.log('Database seeded successfully');
}

export async function GET() {
  try {
    console.log("Starting database seeding...");
    await seedDatabase().catch((error) => {
      console.error('Error seeding database:', error);
    })
    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}