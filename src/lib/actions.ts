'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';
import { PostFormSchema, PostFormState, UsersTable } from './definitions';
import { fetchUserById } from './data';

//TODO: Remove when auth is implemented

const CreatePost = PostFormSchema.omit({ id: true, authorId: true, date: true });
const UpdatePost = PostFormSchema.omit({ id: true, authorId: true, date: true });

export async function createPost(prevState: PostFormState, formData: FormData) {
  
  // const session = await verifySession();
  // const id = session?.userId;
  const dummyId: string = '11111111-1111-4111-b111-111111111111'
  const user = await fetchUserById(dummyId);

  if (!user) {
    return {
      message: 'Author could not be found!'
    }
  }

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
    
    await sql`
      INSERT INTO posts (author_id, title, body, date)
      VALUES (${user.id}, ${title}, ${body}, ${date})
    `
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Post.',
    };
  }

  const data = await sql`
      SELECT *
      FROM posts
      WHERE 
        author_id = ${user.id} AND
        title = ${title} AND
        body = ${body} AND 
        date = ${date};
  `;

  const post = data.rows;

  revalidatePath(`/blog/${post[0].id}/post`);
  redirect(`/blog/${post[0].id}/post`);
}

export async function updatePost(
  id: string,
  prevState: PostFormState,
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

  revalidatePath('/blog');
  redirect('/blog');
}

export async function deletePost(id: string) {
  try {
    await sql`DELETE FROM posts WHERE id = ${id}`;
    revalidatePath('/blog');
    return { message: 'Deleted Post.' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Post.' };
  }
}

// export async function authenticate(
//   prevState: string | undefined,
//   formData: FormData
// ) {
//   try {
//     await signIn('credentials', formData);
//   } catch (error) {
//     if (error instanceof AuthError) {
//       switch (error.type) {
//         case 'CredentialsSignin':
//           return 'Invalid credentials.';
//         default:
//           return 'Something went wrong.';
//       }
//     }
//     throw error;
//   }
// }