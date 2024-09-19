'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';
import { error } from 'console';

const FormSchema = z.object({
  id: z.string(),
  authorId: z.string(),
  title: z.string({
    invalid_type_error: 'Please enter a title.',
  }),
  body: z.string({
    invalid_type_error: 'Please enter a body.',
  }),
  date: z.string(),
});

const CreatePost = FormSchema.omit({ id: true, authorId: true, date: true });
const UpdatePost = FormSchema.omit({ id: true, authorId: true, date: true });

export type State = {
  errors?: {
    title?: string[];
    body?: string[];
  };
  message?: string | null;
};

export async function createPost(prevState: State, formData: FormData) {
  const validatedFields = CreatePost.safeParse({
    title: formData.get('title'),
    body: formData.get('body'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Post.',
    }
  }

  const { title, body } = validatedFields.data;
  const date = new Date().toISOString().split('T')[0];

  try {

    //TODO! SQL Insertion will fail due to missing author_id, implement when session functionality implemented !
    
    await sql`
      INSERT INTO posts (title, body, date)
      VALUES (${title}, ${body}, ${date})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Post.',
    };
  }

  revalidatePath('/m426/blog');
  redirect('/m426/blog');
}

export async function updatePost(
  id: string,
  prevState: State,
  formData: FormData,
) {
  const validatedFields = UpdatePost.safeParse({
    title: formData.get('title'),
    body: formData.get('body'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Post.',
    };
  }

  const { title, body } = validatedFields.data;

  try {
    await sql`
      UPDATE posts
      SET title = ${title}, body = ${body},
      WHERE id = ${id}
    `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Post.'};
  }

  revalidatePath('/m426/blog');
  redirect('/m426/blog');
}