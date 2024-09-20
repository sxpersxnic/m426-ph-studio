import { PostsTable, UsersTable } from "./definitions";

// Dummy records: 6
const users: UsersTable[] = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    username: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/user/evil-rabbit.png',
    password: '123456',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    username: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/user/delba-de-oliveira.png',
    password: '123456',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    username: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/user/lee-robinson.png',
    password: '123456',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    username: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/user/michael-novotny.png',
    password: '123456',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    username: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/user/amy-burns.png',
    password: '123456',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    username: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/user/balazs-orban.png',
    password: '123456',
  },
];

// Dummy records: 12
const posts: PostsTable[] = [
  {
    id: '0518fe58-061a-47fb-a949-549ab6f604d8',
    author_id: users[0].id,
    title: 'Post 1',
    body: 'This dummy post nr. 1',
    date: '2024-06-12',
  },
  {
    id: '69e5b6b9-fc56-4fd6-a7d7-0cb4a1bcd23a',
    author_id: users[0].id,
    title: 'Post 2',
    body: 'This dummy post nr. 2',
    date: '2024-08-10',
  },
  {
    id: 'a2999c95-513d-48ca-84bf-bef7e96a4435',
    author_id: users[1].id,
    title: 'Post 3',
    body: 'This dummy post nr. 3',
    date: '2024-05-12',
  },
  {
    id: '7be09d5d-c122-42a4-b9bd-6fa4037434ff',
    author_id: users[1].id,
    title: 'Post 4',
    body: 'This dummy post nr. 4',
    date: '2024-06-01',
  },
  {
    id: 'f4c3ed93-a92c-419d-bd5c-f631a7981cb4',
    author_id: users[2].id,
    title: 'Post 5',
    body: 'This dummy post nr. 5',
    date: '2023-12-10',
  },
  {
    id: '7d646c62-612b-4a3d-b915-a5eb251d7c2d',
    author_id: users[2].id,
    title: 'Post 6',
    body: 'This dummy post nr. 6',
    date: '2023-04-12',
  },
  {
    id: '885e9b60-cd3b-4527-9190-3dc253775930',
    author_id: users[3].id,
    title: 'Post 7',
    body: 'This dummy post nr. 7',
    date: '2024-06-02',
  },
  {
    id: '524ed2cc-7887-49af-88f7-92a84c5c187d',
    author_id: users[3].id,
    title: 'Post 8',
    body: 'This dummy post nr. 8',
    date: '2024-06-03',
  },
  {
    id: '6fff99f7-c60e-4ec8-b216-b7465317fa3b',
    author_id: users[4].id,
    title: 'Post 9',
    body: 'This dummy post nr. 9',
    date: '2024-06-11',
  },
  {
    id: '4fc669c6-7631-4930-aefb-5403893a9119',
    author_id: users[4].id,
    title: 'Post 10',
    body: 'This dummy post nr. 10',
    date: '2024-08-12',
  },
  {
    id: 'd9d2e8ff-9821-40df-9c59-403223fa478d',
    author_id: users[5].id,
    title: 'Post 11',
    body: 'This dummy post nr. 11',
    date: '2024-07-12',
  },
  {
    id: '9934c81c-3c65-405f-8a29-aad3fa947dd4',
    author_id: users[5].id,
    title: 'Post 12',
    body: 'This dummy post nr. 12',
    date: '2024-06-06',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

export { users, posts, revenue };
