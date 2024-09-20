import { z } from 'zod';

export type User = {
  id:         string;
  username:       string;
  email:      string;
  password:   string;
  image_url:  string;
  post_ids:   string[];
};

export type Post = {
  id: string;
  author_id: string;
  title: string;
  body: string;
  date: string;
}

export type PostPreview = {
  id: string;
  username: string;
  image_url: string;
  date: Date | null;
  title: string;
}

export type UsersPreview = {
  id: string;
  image_url: string;
  username: string;
  total_posts: number;
}

export type PostsTable = {
  id: string;
  author_id: string;
  title: string;
  body: string;
  date: string;
}

export type UsersTable = {
  id: string;
  image_url?: string;
  username: string;
  email: string;
  password: string;
}

export type UserField = {
  id: string;
  username: string;
};

export type PostForm = {
  id: string; 
  author_id: string;
  title: string;
  body: string;
}

export type CardData = {
  numberOfUsers: number;
  numberOfPosts: number;
}

// export type Revenue = {
//   month: string;
//   revenue: number;
// };

// Authentication

export const SignUpFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Username must be at least 2 characters long.' })
    .trim(),
  email: z
    .string()
    .email({ message: 'Please enter a valid email.' })
    .trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, {message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
})

export type FormState =
  | {
      errors?: {
        username?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export type SessionPayload = {
  userId: string,
  expiresAt: Date,
}

export type SessionsTable = {
  id: string,
  userId: string,
  expires: Date,
}