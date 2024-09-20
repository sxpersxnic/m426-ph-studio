import { FormState, SignUpFormSchema } from "src/lib/definitions";
import bcrypt from 'bcrypt';
import { createSession, deleteSession } from "./session";
import { redirect } from "next/navigation";
import { db } from "src/drizzle/db";
import { UsersTable as users, PostsTable as posts }from "src/drizzle/schema";

export async function signup(state: FormState, formData: FormData) {
  
  // 1. Validation
  const validatedFields = SignUpFormSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // 2. Prepare data for insertion into database
  const { username, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // 3. Insert user
  const data = await db
  .insert(users)
  .values({
    username: username,
    email: email,
    password: hashedPassword,
    image_url: '/user/default-user-32x32.png'
  })
    .returning({ id: users.id })

    const user = data[0]

    if (!user) {
      return {
        message: 'Database Error: Failed to Sign up.',
      };
    }

  // 4. Create user session
  await createSession(user.id)

  // 5. Redirect to profile
  redirect('/m426/blog/profile');
}

export async function logout() {
  deleteSession();
  redirect('/');
}