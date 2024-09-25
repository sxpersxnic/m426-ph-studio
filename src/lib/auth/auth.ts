'use server'

import { sql } from "@vercel/postgres";
import { defaultPfp, SignInFormSchema, SignInFormState, SignUpFormSchema, SignUpFormState, UserRecord } from "../definitions";
import bcrypt from 'bcrypt';
import { createSession, deleteSession } from "./session";
import { redirect } from "next/navigation";

export async function signup(state: SignUpFormState, formData: FormData) {
  const validatedFields = SignUpFormSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { username, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  await sql`
    INSERT INTO users (username, email, image_url, password)
    VALUES (${username}, ${email}, ${defaultPfp}, ${hashedPassword});
  `;

  const data = await sql`
    SELECT id, username, email, image_url 
    FROM users
    WHERE username = ${username} AND email = ${email}
  `;

  const user = data.rows[0];

  if (!user) {
    return {
      message: 'An error occured while creating your account.',
    }
  }

  await createSession(user.id)

  redirect('/blog/profile')
}

export async function signin(state: SignInFormState, formData: FormData) {
  const validatedFields = SignInFormSchema.safeParse({
    principal: formData.get('principal'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { principal, password } = validatedFields.data;
  
  const data = await sql`
  SELECT * 
  FROM users
  WHERE username = ${principal} OR email = ${principal}
  `;
  
  const user = data.rows[0];
  
  if (!user) {
    return {
      message: 'An error occured while creating your account.',
    }
  }

  const passwordsMatch = await bcrypt.compare(password, user.password);
  if (!passwordsMatch) {
    return {
      message: 'Invalid credentials!'
    }
  }

  await createSession(user.id)

  redirect('/blog/profile')
}

export async function signout() {
  deleteSession()
  redirect('/')
}