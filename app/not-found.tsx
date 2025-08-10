"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-3xl">404</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Trang không tồn tại
          </h1>

          <p className="text-gray-600 mb-6">
            Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
          </p>

          <div className="space-y-3">
            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Link href="/">
                <Home className="w-4 h-4 mr-2" />
                Về trang chủ
              </Link>
            </Button>

            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
