'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';
import { PostsTable as posts} from '@/drizzle/schema';
import { db } from '@/drizzle/db';
import { getUser } from './authorization/dal';
import { PostFormSchema, PostFormState } from './definitions';


const CreatePost = PostFormSchema.omit({ id: true, authorId: true, date: true });
const UpdatePost = PostFormSchema.omit({ id: true, authorId: true, date: true });

export async function createPost(prevState: PostFormState, formData: FormData) {
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

    const user = await getUser();

    if (!user) {
      return {
        message: 'Author could not be found!'
      }
    }

    await db.insert(posts).values({
      title: title, 
      body: body,
      author_id: user.id
    })
    .returning({ id: posts.id })
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Post.',
    };
  }

  revalidatePath('/blog');
  redirect('/blog');
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