export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Đang tải...</p>
        <p className="text-gray-500 text-sm mt-2">Vui lòng chờ trong giây lát</p>
      </div>
    </div>
  )
} 