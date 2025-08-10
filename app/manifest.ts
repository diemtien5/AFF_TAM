import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FinZ.vn - Nền tảng Affiliate Thẻ Tín Dụng & Khoản Vay',
    short_name: 'FinZ.vn',
    description: 'Nền tảng Affiliate giúp bạn tìm kiếm, so sánh và lựa chọn thẻ tín dụng phù hợp',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3B82F6',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
} 