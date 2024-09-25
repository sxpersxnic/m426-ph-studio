import 'server-only'
import { cookies } from 'next/headers'
import { decrypt } from './session';
import { redirect } from 'next/navigation';
import { cache } from 'react';
import { sql } from '@vercel/postgres';

export const getUser = cache(async () => {
  const session = await verifySession()
  if (!session) return null

  try {
    const data = await sql`
      SELECT 
        users.id, 
        users.username, 
        users.email, 
        users.image_url
      FROM users
      WHERE id = ${session.userId}
    `;

    const user = data.rows[0]

    return user
  } catch (error) {
    console.error('Failed to fetch user')
    return null
  }
})

export const verifySession = cache(async () => {
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect('/login')
  }

  return { isAuth: true, userId: session.userId as string }
})