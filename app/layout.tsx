import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import AdminButton from "@/components/admin-button"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tư vấn tài chính - Thẻ Tín Dụng & Khoản Vay",
  description: "Giúp bạn tìm kiếm, so sánh và lựa chọn thẻ tín dụng phù hợp. Nơi bạn an tâm sở hữu thẻ tín dụng với nhu cầu mua sắm online, thanh toán quốc tế.",
  keywords: ["thẻ tín dụng", "vay tiêu dùng", "affiliate", "tài chính", "ngân hàng"],
  authors: [{ name: "Đội ngũ tư vấn" }],
  creator: "Trang tư vấn tài chính",
  publisher: "Trang tư vấn tài chính",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://finz.vn"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Tư vấn tài chính - Thẻ Tín Dụng & Khoản Vay",
    description: "Giúp bạn tìm kiếm, so sánh và lựa chọn thẻ tín dụng phù hợp",
    url: "https://finz.vn",
    siteName: "Trang tư vấn tài chính",
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tư vấn tài chính - Thẻ Tín Dụng & Khoản Vay",
    description: "Giúp bạn tìm kiếm, so sánh và lựa chọn thẻ tín dụng phù hợp",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#3B82F6" />
      </head>
      <body className={inter.className}>
        {children}
        <AdminButton />
        <Toaster />
      </body>
    </html>
  )
}
