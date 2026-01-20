import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Moneta',
    short_name: 'Moneta',
    description: 'Keep track of your expenses',
    lang: 'en',
    categories: ['finance', 'expenses', 'business'],
    prefer_related_applications: false,
    icons: [
      {
        src: '/favicon/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/favicon/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    orientation: 'portrait',
    theme_color: '#ffffff',
    background_color: '#ffffff',
    display: 'standalone',
  }
}