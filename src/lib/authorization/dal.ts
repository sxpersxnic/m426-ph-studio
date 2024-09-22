// import 'server-only'

// import { cookies } from 'next/headers'
// import { decrypt } from 'src/lib/authentication/session';
// import { redirect } from 'next/navigation';
// import { cache } from 'react';
// import { db } from 'src/drizzle/db';
// import { eq } from 'drizzle-orm';
// import { UsersTable } from 'src/drizzle/schema';

// export const verifySession = cache(async () => {
//   const cookie = cookies().get('session')?.value
//   const session = await decrypt(cookie)

//   if (!session?.userId) {
//     redirect('/auth/login')
//   }

//   const userId = session.userId as string;
//   console.log(userId);

//   return { isAuth: true, userId }
// })

// export const getUser = cache(async () => {
//   const session = await verifySession()
//   if (!session) return null

//   try {
//     const data = await db.query.UsersTable.findMany({
//       where: eq(UsersTable.id, session.userId),
//       columns: {
//         id: true,
//         username: true,
//         email: true,
//       },
//     })

//     const user = data[0]

//     return user
//   } catch (error) {
//     console.error('Failed to fetch user')
//     return null
//   }
// })