import { z } from 'zod';

export type User = {
  id:         string;
  username:   string;
  email:      string;
  password:   string;
  image_url:  string;
};


export type Post = {
  id:         string;
  author_id:  string;
  title:      string;
  body:       string;
  date:       string;
}

export type SessionPayload = {
  sessionId:     string,
  expiresAt:  Date,
}

export type UsersPosts = {
  user_id:    string;
  post_id:    string;
  session_id: string;
  username:   string;
  email:      string;
  image_url:  string;
  title:      string;
  body:       string;
  date:        string;
}

export type UserRecord = {
  id: string;
  username: string;
  email: string;
  image_url: string;
}

export type PostPreview = {
  id:         string;
  author_id:  string;
  username:   string;
  image_url:  string;
  date:       Date | null;
  title:      string;
}

export type UserPreview = {
  id:           string;
  image_url:    string;
  username:     string;
  total_posts:  number;
}

export type PostView = {
  id: string;
  author_id: string;
  username: string;
  image_url: string;
  title: string;
  body: string;
  date: Date | null;
}

export type UsersTable = {
  id:         string;
  image_url?: string;
  username:   string;
  email:      string;
  password:   string;
}

export type PostsTable = {
  id:         string;
  author_id:  string;
  username: string;
  email: string;
  image_url: string;
  title:      string;
  body:       string;
  date:       string;
}

export type SessionsTable = {
  id:       string;
  userId:   string;
  expires:  Date;
  created:  Date;
}

export type PostForm = {
  id:     string;
  title:  string;
  body:   string;
}

export type CardData = {
  numberOfUsers: number;
  numberOfPosts: number;
}

export type Revenue = {
  month:      string;
  author_id:  string;
  revenue:    number;
}

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

export const SignInFormSchema = z.object({
  principal: z.string().trim(),
  password: z.string().trim(),
})

export const PostFormSchema = z.object({
  id: z.string(),
  authorId: z.string(),
  title: z.string({
    invalid_type_error: 'Please enter a title.',
  }),
  body: z.string({
    invalid_type_error: 'Please enter a body.',
  }),
  date: z.string(),
});

export type SignUpFormState =
  | {
      errors?: {
        username?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export type SignInFormState =
  | {
      errors?: {
        principal?: string[]    
        password?: string[]
      }
      message?: string
    }
  | undefined


  export type PostFormState = {
  errors?: {
    title?: string[];
    body?: string[];
  };
  message?: string | null;
};

export const defaultPfp = '/user/default-32x32.png';

export const postPath = (id: string) => {
  return `/blog/${id}/post`;
}

export const profilePath = (id: string) => {
  return `/profile/${id}`;
}