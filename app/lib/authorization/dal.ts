import 'server-only'

import { cookies } from 'next/headers'
import { decrypt } from '@/lib/authentication/session';
import { redirect } from 'next/navigation';
import { sql } from '@vercel/postgres';
import { cache } from 'react';

export const verifySession = cache(async () => {
  const cookie = cookies().get('session')?.value
  const session = await decrypt(cookie)

  if (!session?.userId) {
    redirect('/login')
  }

  const id: string = session.userId;

  return { isAuth: true, userId: id }
})

export const getUser = cache(async () => {
  const session = await verifySession()
  if (!session) return null

  try {
    const data = await sql`
      SELECT id, username, email
      FROM users
      WHERE id = ${session.userId}
    `;
  } catch (error) {
    console.error("Failed to fetch usersession", error);
  }
})