import 'src/drizzle/envConfig';
import { drizzle } from 'drizzle-orm/vercel-postgres';
import * as schema from './schema';
import { eq, ilike, count, or, desc, asc } from 'drizzle-orm';
import { sql } from '@vercel/postgres';
import { CardData, PostForm, PostPreview, UsersPreview } from 'src/lib/definitions';

export const db = drizzle(sql, { schema });

export async function fetchLatestPosts(): Promise<PostPreview[]> {
  try {
    const data = await db.select({
      id: schema.PostsTable.id,
      username: schema.UsersTable.username,
      image_url: schema.UsersTable.image_url,
      date: schema.PostsTable.created_at,
      title: schema.PostsTable.title,
    })
    .from(schema.PostsTable)
    .innerJoin(schema.UsersTable, eq(schema.PostsTable.author_id, schema.UsersTable.id))
    .orderBy(desc(schema.PostsTable.created_at))
    .limit(5)
    .execute();

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest posts.');
  }
}

export async function fetchCardData(): Promise<CardData> {
  try {
    const postCountPromise = db.select({ value: count(schema.PostsTable.id) }).from(schema.PostsTable).execute();
    const userCountPromise = db.select({ value: count(schema.UsersTable.id) }).from(schema.UsersTable).execute();

    const [postCount, userCount] = await Promise.all([postCountPromise, userCountPromise]);

    const numberOfPosts = Number(postCount[0].value ?? '0');
    const numberOfUsers = Number(userCount[0].value ?? '0');

    return {
      numberOfUsers,
      numberOfPosts,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredPosts(query: string, currentPage: number): Promise<PostForm[]> {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const data = await db.select({
      id: schema.PostsTable.id,
      author_id: schema.PostsTable.author_id,
      title: schema.PostsTable.title,
      body: schema.PostsTable.body,
      date: schema.PostsTable.created_at,
    })
    .from(schema.PostsTable)
    .innerJoin(schema.UsersTable, eq(schema.PostsTable.author_id, schema.UsersTable.id))
    .where(
      or(
        ilike(schema.UsersTable.username, `%${query}%`),
        ilike(schema.UsersTable.email, `%${query}%`),
        ilike(schema.PostsTable.created_at, `%${query}%`),
        ilike(schema.PostsTable.title, `%${query}%`),
        ilike(schema.PostsTable.body, `%${query}%`)
      )
    )
    .orderBy(desc(schema.PostsTable.created_at))
    .limit(ITEMS_PER_PAGE)
    .offset(offset)
    .execute();

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch posts.');
  }
}

export async function fetchPostsPages(query: string): Promise<number> {
  try {
    const countData = await db.select({ value: count(schema.PostsTable.id) })
    .from(schema.PostsTable)
    .innerJoin(schema.UsersTable, eq(schema.PostsTable.author_id, schema.UsersTable.id))
    .where(
      or(
        ilike(schema.UsersTable.username, `%${query}%`),
        ilike(schema.UsersTable.email, `%${query}%`),
        ilike(schema.PostsTable.created_at, `%${query}%`),
        ilike(schema.PostsTable.title, `%${query}%`),
        ilike(schema.PostsTable.body, `%${query}%`)
      )
    )
    .execute();

    const totalPages = Math.ceil(Number(countData[0].value) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of posts.');
  }
}

export async function fetchPostById(id: string): Promise<PostForm | undefined> {
  try {
    const data = await db.select({
      id: schema.PostsTable.id,
      author_id: schema.PostsTable.author_id,
      title: schema.PostsTable.title,
      body: schema.PostsTable.body,
      date: schema.PostsTable.created_at,
    })
    .from(schema.PostsTable)
    .where(eq(schema.PostsTable.id, id))
    .execute();

    return data[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch post.');
  }
}

export async function fetchUsers(): Promise<UsersPreview[]> {
  try {
    const data = await db.select({
      id: schema.UsersTable.id,
      image_url: schema.UsersTable.image_url,
      username: schema.UsersTable.username,
      total_posts: count(schema.PostsTable.id),
    })
    .from(schema.UsersTable)
    .leftJoin(schema.PostsTable, eq(schema.UsersTable.id, schema.PostsTable.author_id))
    .groupBy(schema.UsersTable.id)
    .orderBy(asc(schema.UsersTable.username))
    .execute();

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch all users.');
  }
}

export async function fetchFilteredCustomers(query: string): Promise<UsersPreview[]> {
  try {
    const data = await db.select({
      id: schema.UsersTable.id,
      username: schema.UsersTable.username,
      email: schema.UsersTable.email,
      image_url: schema.UsersTable.image_url,
      total_posts: count(schema.PostsTable.id),
    })
    .from(schema.UsersTable)
    .leftJoin(schema.PostsTable, eq(schema.UsersTable.id, schema.PostsTable.author_id))
    .where(
      or(
        ilike(schema.UsersTable.username, `%${query}%`),
        ilike(schema.UsersTable.email, `%${query}%`)
      )
    )
    .groupBy(schema.UsersTable.id)
    .orderBy(asc(schema.UsersTable.username))
    .execute();

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch user table.');
  }
}
