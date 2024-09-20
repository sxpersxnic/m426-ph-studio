import '@/drizzle/envConfig'
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/drizzle/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL || 'postgres://default:9cUF2eiNPndl@ep-flat-tooth-a4irack6-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require'
  },
});