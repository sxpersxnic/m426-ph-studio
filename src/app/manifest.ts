import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PH-Studio Blog',
    short_name: 'Blog',
    description: 'PH-Studio Blog for M426',
    start_url: '/seed',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
    ],
  }
}