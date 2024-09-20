// import { sql } from '@vercel/postgres';
// import { PostForm, PostPreview, PostsTable, UsersPreview, UsersTable } from './definitions';

// export async function fetchLatestPosts() {
//   try {
//     const data = await sql<PostPreview>`
//       SELECT posts.id, users.username, users.image_url, posts.date, posts.title
//       FROM posts
//       JOIN users ON posts.author_id = users.id
//       ORDER BY posts.date DESC
//       LIMIT 5
//     `;

//     const latestPosts = data.rows.map((post) => ({
//       ...post,
//     }));
//     return latestPosts;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch the latest posts.');
//   }
// }

// export async function fetchCardData() {
//   try {
//     const postCountPromise = sql`SELECT COUNT(*) FROM posts`;
//     const userCountPromise = sql`SELECT COUNT(*) FROM customers`;

//     const data = await Promise.all([
//       postCountPromise,
//       userCountPromise,
//     ]);

//     const numberOfPosts = Number(data[0].rows[0].count ?? '0');
//     const numberOfUsers = Number(data[1].rows[0].count ?? '0');

//     return {
//       numberOfUsers,
//       numberOfPosts,
//     };
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch card data.');
//   }
// }

// const ITEMS_PER_PAGE = 6;
// export async function fetchFilteredPosts(
//   query: string,
//   currentPage: number,
// ) {
//   const offset = (currentPage - 1) * ITEMS_PER_PAGE;

//   try {
//     const posts = await sql<PostsTable>`
//       SELECT
//         posts.id,
//         posts.author_id,
//         posts.title,
//         posts.body,
//         posts.date
//       FROM posts
//       JOIN users ON posts.author_id = users.id
//       WHERE
//         users.username ILIKE ${`%${query}%`} OR
//         users.email ILIKE ${`%${query}%`} OR
//         posts.date::text ILIKE ${`%${query}%`} OR
//         posts.title ILIKE ${`%${query}%`} OR
//         posts.body ILIKE ${`%${query}%`}
        
//       ORDER BY posts.date DESC
//       LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
//     `;

//     return posts.rows;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch posts.');
//   }
// }

// export async function fetchPostsPages(query: string) {
//   try {
//     const count = await sql`SELECT COUNT(*)
//     FROM posts
//     JOIN users ON posts.author_id = users.id
//     WHERE
//       users.username ILIKE ${`%${query}%`} OR
//       users.email ILIKE ${`%${query}%`} OR
//       posts.date::text ILIKE ${`%${query}%`} OR
//       posts.title ILIKE ${`%${query}%`} OR
//       posts.body ILIKE ${`%${query}%`}
//   `;

//     const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
//     return totalPages;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch total number of posts.');
//   }
// }

// export async function fetchPostById(id: string) {
//   //? noStore();
//   try {
//     const data = await sql<PostForm>`
//       SELECT
//         posts.id,
//         posts.author_id,
//         posts.title,
//         posts.body,
//         posts.date
//       FROM posts
//       WHERE posts.id = ${id};
//     `;

//     const post = data.rows;

//     console.log(post);
//     return post[0];
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch post.');
//   }
// }

// export async function fetchUsers() {
//   try {
//     const data = await sql<UsersPreview>`
//       SELECT
//         id,
//         COUNT(post_ids),
//         image_url,
//         username
//       FROM users
//       ORDER BY users ASC
//     `;

//     const users = data.rows;
//     return users;
//   } catch (err) {
//     console.error('Database Error:', err);
//     throw new Error('Failed to fetch all users.');
//   }
// }

// export async function fetchFilteredCustomers(query: string) {
//   try {
//     const data = await sql<UsersTable>`
// 		SELECT
// 		  users.id,
// 		  users.name,
// 		  users.email,
// 		  users.image_url,
// 		  COUNT(posts.id) AS total_posts,
// 		FROM users
// 		LEFT JOIN posts ON users.id = posts.author_id
// 		WHERE
// 		  users.username ILIKE ${`%${query}%`} OR
//       users.email ILIKE ${`%${query}%`}
// 		GROUP BY users.id, users.username, users.email, users.image_url
// 		ORDER BY users.username ASC
// 	  `;

//     const users = data.rows;
//     return users;
//   } catch (err) {
//     console.error('Database Error:', err);
//     throw new Error('Failed to fetch user table.');
//   }
// }
