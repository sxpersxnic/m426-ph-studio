import { sql } from "@vercel/postgres";
import { SignUpFormSchema, SignUpFormState, UserRecord } from "../definitions";
import bcrypt from 'bcrypt';
const defaultPfp = '/user/default-32x32.png';

export async function signup(state: SignUpFormState, formData: FormData) {
  const validatedFields = SignUpFormSchema.safeParse({
    name: formData.get('username'),
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
}