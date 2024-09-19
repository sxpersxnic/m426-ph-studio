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
  date: string;
  title: string;
}

export type UsersPreview = {
  id: string;
  post_ids: string[];
  image_url: string;
  username: string;
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
  post_ids: string[];
  image_url: string;
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

// export type Revenue = {
//   month: string;
//   revenue: number;
// };