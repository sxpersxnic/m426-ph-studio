import { FormState, SignUpFormSchema } from "@/lib/definitions";
import bcrypt from 'bcrypt';
import { createSession, deleteSession } from "./session";
import { redirect } from "next/navigation";
import { db } from "@/drizzle/db";
import * as schema from "@/drizzle/schema";

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
  const data = await db.insert(schema.UsersTable).values({
    username,
    email,
    hashedPassword
  })
    .returning({ id: schema.UsersTable.id })

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